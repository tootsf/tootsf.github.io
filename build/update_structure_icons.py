#!/usr/bin/env python3
"""
Script to update pages-structure.json with correct icons from toc.json
"""

import json
from pathlib import Path

def main():
    # Read the main toc.json to get icons
    toc_path = Path("c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/assets/pages/Community Bridge/toc.json")
    structure_path = Path("c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/assets/pages-structure.json")

    # Load toc.json to get icon mappings
    with open(toc_path, 'r', encoding='utf-8') as f:
        toc_data = json.load(f)

    # Create icon mapping
    icon_map = {}
    for item in toc_data:
        if item.get('name'):
            icon_map[item['name']] = item.get('icon', '📄')

    # Load existing structure
    with open(structure_path, 'r', encoding='utf-8') as f:
        structure = json.load(f)

    # Update icons
    if 'Community Bridge' in structure and 'children' in structure['Community Bridge']:
        for module_name, module_config in structure['Community Bridge']['children'].items():
            if module_name in icon_map:
                module_config['icon'] = icon_map[module_name]
                print(f"Updated {module_name} with icon {icon_map[module_name]}")

    # Save updated structure
    with open(structure_path, 'w', encoding='utf-8') as f:
        json.dump(structure, f, indent=2, ensure_ascii=False)

    print("✓ Updated pages-structure.json with correct icons")

if __name__ == "__main__":
    main()
