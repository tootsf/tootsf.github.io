#!/usr/bin/env python3

import os
import re
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def create_safe_filename(name):
    """Create a filesystem-safe filename from a function name"""
    # Remove common prefixes and clean up the name
    clean_name = re.sub(r'^(Bridge\.|exports\.)', '', name.strip())
    # Remove characters that aren't safe for filenames
    safe_name = re.sub(r'[<>:"/\\|?*]', '', clean_name)
    return safe_name

def extract_functions_from_content(content):
    """Extract individual functions from consolidated content"""
    # Pattern to match function sections
    pattern = r'## 🔹 ([^\n]+)(.*?)(?=## 🔹 |$)'
    matches = re.findall(pattern, content, re.DOTALL)

    functions = []
    for i, (name, content_block) in enumerate(matches):
        function_name = name.strip()
        # Clean up the content block
        clean_content = content_block.strip()

        functions.append({
            'name': function_name,
            'content': clean_content,
            'order': i + 1
        })

    return functions

def create_individual_function_file(module_path, side, function, base_path):
    """Create an individual function file"""
    # Extract module name from path
    module_name = os.path.basename(module_path)

    # Map module names to their display names with emojis
    module_display_names = {
        'accessibility': '♿ Accessibility',
        'clothing': '👔 Clothing',
        'dialogue': '💬 Dialogue',
        'dispatch': '🚨 Dispatch',
        'doorlock': '🚪 Doorlock',
        'framework': '🧩 Framework',
        'fuel': '⛽ Fuel',
        'helptext': '❓ Helptext',
        'housing': '🏠 Housing',
        'input': '⌨️ Input',
        'inventory': '🎒 Inventory',
        'locales': '🌐 Locales',
        'managment': '📊 Managment',
        'math': '🔢 Math',
        'menu': '📋 Menu',
        'notify': '🔔 Notify',
        'phone': '📱 Phone',
        'progressbar': '⏳ Progressbar',
        'shops': '🛒 Shops',
        'skills': '⭐ Skills',
        'target': '🎯 Target',
        'vehicleKey': '🔑 Vehiclekey',
        'version': '📦 Version',
        'weather': '🌤️ Weather'
    }

    module_display = module_display_names.get(module_name, module_name.title())
    side_title = side.title()

    # Create safe filename
    safe_filename = create_safe_filename(function['name'])
    functions_dir = os.path.join(module_path, side, 'functions')

    # Ensure functions directory exists
    os.makedirs(functions_dir, exist_ok=True)

    # Create function file path
    function_file = os.path.join(functions_dir, f"{safe_filename}.md")

    # Create frontmatter
    frontmatter = f"""---
layout: default
title: "{function['name']}"
parent: Functions
grand_parent: {side_title}
great_grand_parent: {module_display}
great_great_grand_parent: Modules
nav_order: {function['order']}
permalink: /community_bridge/modules/{module_name}/{side}/functions/{safe_filename.lower()}/
---

"""

    # Write the function file
    with open(function_file, 'w', encoding='utf-8') as f:
        f.write(frontmatter)
        f.write(function['content'])

    return safe_filename

def update_container_page(functions_file, functions_list):
    """Update the container functions.md page"""
    # Read the current content
    with open(functions_file, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter and initial content before functions
    parts = content.split('## 🔹', 1)
    if len(parts) > 1:
        base_content = parts[0].strip()
    else:
        base_content = content.strip()

    # Update frontmatter to include has_children
    if 'has_children: true' not in base_content:
        # Add has_children to frontmatter
        if '---' in base_content:
            frontmatter_parts = base_content.split('---', 2)
            if len(frontmatter_parts) >= 3:
                frontmatter = frontmatter_parts[1]
                rest_content = frontmatter_parts[2]

                # Add has_children if not present
                if 'has_children:' not in frontmatter:
                    frontmatter += '\nhas_children: true'

                base_content = f"---{frontmatter}\n---{rest_content}"

    # Create function links section
    function_links = "\n## Available Functions\n\n"
    for func in functions_list:
        safe_name = create_safe_filename(func['name'])
        function_links += f"- [{func['name']}]({safe_name})\n"

    # Write updated content
    with open(functions_file, 'w', encoding='utf-8') as f:
        f.write(base_content + function_links)

def process_consolidated_functions():
    """Process all remaining consolidated function files"""
    base_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"

    processed_count = 0

    # Find all functions.md files with consolidated content
    for root, dirs, files in os.walk(base_path):
        if 'functions.md' in files:
            functions_file = os.path.join(root, 'functions.md')

            # Read the file content
            with open(functions_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Check if it has consolidated functions
            if '## 🔹' in content:
                # Extract module and side information
                relative_path = os.path.relpath(root, base_path)
                path_parts = relative_path.split(os.sep)

                if len(path_parts) >= 2:
                    module_name = path_parts[0]
                    side = path_parts[1]

                    module_path = os.path.join(base_path, module_name)

                    print(f"\n📂 {module_name}/{side}: Processing consolidated functions")

                    # Extract functions
                    functions = extract_functions_from_content(content)

                    if functions:
                        print(f"   ✅ Found {len(functions)} functions")

                        # Create individual files
                        created_files = []
                        for function in functions:
                            safe_name = create_individual_function_file(module_path, side, function, base_path)
                            created_files.append(safe_name)

                        # Update container page
                        update_container_page(functions_file, functions)

                        print(f"   📝 Updated container page")
                        processed_count += 1

    return processed_count

if __name__ == "__main__":
    print("🚀 Processing Remaining Consolidated Functions")
    print("=" * 60)

    count = process_consolidated_functions()

    print(f"\n🎉 Processing Complete!")
    print(f"   • Processed {count} modules with consolidated functions")
    print(f"   📁 All individual function files created")
    print(f"   🔗 Container pages updated")
