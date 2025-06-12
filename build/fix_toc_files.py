#!/usr/bin/env python3
"""
Script to fix all Community Bridge module TOC files
"""

import json
import os
from pathlib import Path

def load_json_file(file_path):
    """Load and parse a JSON file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {file_path}: {e}")
        return None

def save_json_file(file_path, data):
    """Save data to a JSON file with proper formatting"""
    try:
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True
    except Exception as e:
        print(f"Error saving {file_path}: {e}")
        return False

def generate_toc_structure(module_data, module_name):
    """Generate proper TOC structure from module data"""
    toc = {
        "title": f"{module_name} Module",
        "items": [
            {
                "title": "Overview",
                "anchor": "#overview"
            }
        ]
    }

    # Add client functions section if exists
    if module_data.get('clientFunctions'):
        client_section = {
            "title": "Client Functions",
            "anchor": "#client-functions",
            "children": []
        }

        for func in module_data['clientFunctions']:
            func_name = func.get('name', '')
            if func_name:
                client_section['children'].append({
                    "title": func_name,
                    "anchor": f"#function-{func_name.lower()}"
                })

        if client_section['children']:
            toc['items'].append(client_section)

    # Add server functions section if exists
    if module_data.get('serverFunctions'):
        server_section = {
            "title": "Server Functions",
            "anchor": "#server-functions",
            "children": []
        }

        for i, func in enumerate(module_data['serverFunctions']):
            func_name = func.get('name', '')
            if func_name:
                # Handle duplicate function names between client and server
                anchor_suffix = f"-{i+1}" if any(cf.get('name') == func_name for cf in module_data.get('clientFunctions', [])) else ""
                server_section['children'].append({
                    "title": func_name,
                    "anchor": f"#function-{func_name.lower()}{anchor_suffix}"
                })

        if server_section['children']:
            toc['items'].append(server_section)

    return toc

def main():
    """Main function to process all module TOC files"""
    base_path = Path("c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/assets/pages/Community Bridge")

    # List of all modules (excluding Banking and Inventory which are already correct)
    modules = [
        "Notify", "HelpText", "ProgressBar", "Target", "Input", "Menu",
        "Dispatch", "Phone", "Skills", "Shops", "Managment", "Housing",
        "Weather", "VehicleKey", "Fuel", "Doorlock", "Dialogue", "Clothing",
        "Framework", "Version", "Math", "Locales"
    ]

    for module in modules:
        module_dir = base_path / module
        json_file = module_dir / f"{module.lower()}.json"
        toc_file = module_dir / "toc.json"

        print(f"Processing {module}...")

        # Load module JSON
        module_data = load_json_file(json_file)
        if not module_data:
            print(f"  Failed to load {json_file}")
            continue

        # Generate TOC structure
        toc_structure = generate_toc_structure(module_data, module)

        # Save TOC file
        if save_json_file(toc_file, toc_structure):
            print(f"  ✓ Updated {toc_file}")
        else:
            print(f"  ✗ Failed to update {toc_file}")

if __name__ == "__main__":
    main()
