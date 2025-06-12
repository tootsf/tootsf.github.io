#!/usr/bin/env python3
"""
GitHub Pages Build Script for Community Bridge Documentation
This script scans for modules and updates the static configuration
for GitHub Pages compatibility (no dynamic server needed).
"""

import json
import os
import re
from pathlib import Path
from datetime import datetime

def extract_frontmatter(content):
    """Extract YAML frontmatter from markdown content."""
    if not content.strip().startswith('---'):
        return {}

    try:
        # Find the end of frontmatter
        lines = content.split('\n')
        end_idx = -1
        for i, line in enumerate(lines[1:], 1):
            if line.strip() == '---':
                end_idx = i
                break

        if end_idx == -1:
            return {}

        frontmatter_content = '\n'.join(lines[1:end_idx])

        # Parse YAML-like frontmatter (simple key: value pairs)
        metadata = {}
        for line in frontmatter_content.split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                metadata[key.strip()] = value.strip().strip('"\'')

        return metadata
    except Exception as e:
        print(f"Warning: Could not parse frontmatter: {e}")
        return {}

def scan_modules():
    """Scan for modules and return configuration."""
    base_dir = Path(__file__).parent.parent
    json_dir = base_dir / 'assets' / 'data'
    docs_dir = base_dir / 'community_bridge' / 'modules'

    modules = []
    order = 1

    print(f"Scanning JSON files in: {json_dir}")
    print(f"Scanning docs in: {docs_dir}")

    # Get all JSON files
    json_files = set()
    if json_dir.exists():
        for json_file in json_dir.glob('*.json'):
            if json_file.name != 'config.json':  # Skip config files
                json_files.add(json_file.stem)

    # Get all documentation folders
    docs_folders = set()
    if docs_dir.exists():
        for docs_folder in docs_dir.iterdir():
            if docs_folder.is_dir() and (docs_folder / 'index.md').exists():
                docs_folders.add(docs_folder.name)

    # Combine all module IDs
    all_module_ids = json_files.union(docs_folders)

    for module_id in sorted(all_module_ids):
        has_json = module_id in json_files
        has_docs = module_id in docs_folders

        # Default values
        name = module_id.replace('_', ' ').replace('-', ' ').title()
        icon = '📦'

        # Try to get metadata from JSON file
        if has_json:
            json_path = json_dir / f'{module_id}.json'
            try:
                with open(json_path, 'r', encoding='utf-8') as f:
                    json_data = json.load(f)
                    name = json_data.get('name', name)
                    icon = json_data.get('icon', icon)
            except Exception as e:
                print(f"Warning: Could not read {json_path}: {e}")

        # Try to get metadata from documentation
        if has_docs:
            docs_path = docs_dir / module_id / 'index.md'
            try:
                with open(docs_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    frontmatter = extract_frontmatter(content)
                    name = frontmatter.get('title', frontmatter.get('name', name))
                    icon = frontmatter.get('icon', icon)
            except Exception as e:
                print(f"Warning: Could not read {docs_path}: {e}")

        modules.append({
            'id': module_id,
            'name': name,
            'icon': icon,
            'order': order,
            'hasJson': has_json,
            'hasDocs': has_docs
        })
        order += 1

    return modules

def update_static_config(modules):
    """Update the module-config.js file with discovered modules."""
    config_path = Path(__file__).parent.parent / 'assets' / 'js' / 'module-config.js'

    # Generate the new modules array
    modules_js = "[\n"
    for module in modules:
        modules_js += f"        {{ id: '{module['id']}', name: '{module['name']}', icon: '{module['icon']}', order: {module['order']}, hasJson: {str(module['hasJson']).lower()}, hasDocs: {str(module['hasDocs']).lower()} }},\n"
    modules_js += "    ]"

    # Read the current config file
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except FileNotFoundError:
        print(f"Error: {config_path} not found!")
        return False

    # Replace the modules array using regex
    pattern = r'modules:\s*\[[^\]]*\]'
    replacement = f'modules: {modules_js}'

    new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

    # Add a comment with last updated timestamp
    timestamp = datetime.now().isoformat()
    comment = f"// Auto-generated on {timestamp} by build-static-config.py\n"

    if not new_content.startswith('//'):
        new_content = comment + new_content
    else:
        # Replace existing auto-generated comment
        lines = new_content.split('\n')
        if 'Auto-generated' in lines[0]:
            lines[0] = comment.rstrip()
            new_content = '\n'.join(lines)

    # Write the updated config
    try:
        with open(config_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"✅ Updated {config_path} with {len(modules)} modules")
        return True
    except Exception as e:
        print(f"Error writing {config_path}: {e}")
        return False

def main():
    """Main build function."""
    print("🔧 Building static configuration for GitHub Pages...")
    print("=" * 50)

    modules = scan_modules()
    print(f"📦 Found {len(modules)} modules:")

    for module in modules:
        status = []
        if module['hasJson']:
            status.append('JSON')
        if module['hasDocs']:
            status.append('DOCS')
        print(f"   {module['icon']} {module['name']} ({module['id']}) - {', '.join(status)}")

    print("\n🔄 Updating static configuration...")
    success = update_static_config(modules)

    if success:
        print("✅ Build completed successfully!")
        print("\n📝 Next steps:")
        print("   1. Commit the updated module-config.js file")
        print("   2. Push to GitHub to deploy to GitHub Pages")
        print("   3. Your new modules will appear automatically!")
    else:
        print("❌ Build failed!")
        return 1

    return 0

if __name__ == '__main__':
    exit(main())
