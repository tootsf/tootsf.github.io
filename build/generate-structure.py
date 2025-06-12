#!/usr/bin/env python3
"""
Build script to automatically generate pages-structure.json from assets/pages folder
"""

import os
import json
import pathlib
from typing import Dict, Any

def scan_pages_folder(pages_path: str) -> Dict[str, Any]:
    """Scan the assets/pages folder and generate structure"""
    structure = {}

    if not os.path.exists(pages_path):
        print(f"Pages folder not found: {pages_path}")
        return structure

    for item in os.listdir(pages_path):
        item_path = os.path.join(pages_path, item)

        if os.path.isdir(item_path):
            folder_config = scan_folder(item_path, item)
            if folder_config:
                structure[item] = folder_config

    return structure

def scan_folder(folder_path: str, folder_name: str) -> Dict[str, Any]:
    """Scan a single folder for content"""
    # Convert to relative path
    rel_path = os.path.relpath(folder_path).replace("\\", "/")

    children = {}

    # Check for index.md
    index_path = os.path.join(folder_path, "index.md")

    # Scan subfolders for additional content
    for item in os.listdir(folder_path):
        item_path = os.path.join(folder_path, item)

        if os.path.isdir(item_path):
            subfolder_config = scan_subfolder(item_path, item)
            if subfolder_config:
                children[item] = subfolder_config

    if children and os.path.exists(index_path):
        # Has both index.md and children - make it a folder with Overview
        overview_config = {
            "type": "markdown",
            "path": os.path.relpath(index_path).replace("\\", "/"),
            "icon": "📖"
        }

        # Check for toc.json for the overview page
        toc_path = os.path.join(folder_path, "toc.json")
        if os.path.exists(toc_path):
            overview_config["tocPath"] = os.path.relpath(toc_path).replace("\\", "/")

        children["Overview"] = overview_config

        return {
            "type": "folder",
            "path": rel_path,
            "icon": get_folder_icon(folder_name),
            "children": children
        }
    elif os.path.exists(index_path):
        # Only has index.md - make it a direct markdown page
        config = {
            "type": "markdown",
            "path": os.path.relpath(index_path).replace("\\", "/"),
            "icon": get_folder_icon(folder_name)
        }

        # Check for toc.json for markdown pages
        toc_path = os.path.join(folder_path, "toc.json")
        if os.path.exists(toc_path):
            config["tocPath"] = os.path.relpath(toc_path).replace("\\", "/")

        return config
    elif children:
        # Only has children - make it a folder
        return {
            "type": "folder",
            "path": rel_path,
            "icon": get_folder_icon(folder_name),
            "children": children
        }

    return None

def scan_subfolder(subfolder_path: str, subfolder_name: str) -> Dict[str, Any]:
    """Scan a subfolder for JSON files or index.md"""

    # Check for index.md first
    index_path = os.path.join(subfolder_path, "index.md")
    if os.path.exists(index_path):
        config = {
            "type": "markdown",
            "path": os.path.relpath(index_path).replace("\\", "/"),
            "icon": get_folder_icon(subfolder_name)
        }

        # Check for toc.json
        toc_path = os.path.join(subfolder_path, "toc.json")
        if os.path.exists(toc_path):
            config["tocPath"] = os.path.relpath(toc_path).replace("\\", "/")

        return config

    # Look for JSON files (excluding toc.json)
    json_files = [f for f in os.listdir(subfolder_path)
                  if f.endswith('.json') and f != 'toc.json']

    if json_files:
        # Use the first JSON file found
        json_file = json_files[0]
        json_path = os.path.join(subfolder_path, json_file)

        config = {
            "type": "json",
            "path": os.path.relpath(json_path).replace("\\", "/"),
            "icon": get_folder_icon(subfolder_name)
        }

        # Check for toc.json
        toc_path = os.path.join(subfolder_path, "toc.json")
        if os.path.exists(toc_path):
            config["tocPath"] = os.path.relpath(toc_path).replace("\\", "/")

        return config

    return None

def get_folder_icon(folder_name: str) -> str:
    """Get appropriate icon for folder based on name"""
    icons = {
        "banking": "🏦",
        "inventory": "📦",
        "management": "⚙️",
        "notify": "🔔",
        "notifications": "🔔",
        "shops": "🛒",
        "target": "🎯",
        "targeting": "🎯",
        "vehicle": "🚗",
        "vehiclekey": "🔑",
        "keys": "🔑",
        "getting started": "🚀",
        "community bridge": "🌉",
        "bridge": "🌉",
        "examples": "💡",
        "api": "🔌",
        "tutorial": "📚",
        "guide": "📖"
    }

    name_lower = folder_name.lower()
    for key, icon in icons.items():
        if key in name_lower:
            return icon

    return "📄"

def main():
    """Main build function"""
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    pages_path = os.path.join(project_root, "assets", "pages")
    output_path = os.path.join(project_root, "assets", "pages-structure.json")

    print("Scanning pages folder...")
    structure = scan_pages_folder(pages_path)

    print(f"Found {len(structure)} top-level sections")

    # Write the structure to JSON
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(structure, f, indent=2, ensure_ascii=False)

    print(f"Generated: {output_path}")

    # Also create a backup in old format for compatibility
    old_format = {}
    for name, config in structure.items():
        if config.get("children"):
            for child_name, child_config in config["children"].items():
                full_name = f"{name} > {child_name}"
                old_format[full_name] = child_config
        else:
            old_format[name] = config

    old_output_path = os.path.join(project_root, "assets", "pages-structure-flat.json")
    with open(old_output_path, 'w', encoding='utf-8') as f:
        json.dump(old_format, f, indent=2, ensure_ascii=False)

    print(f"Generated flat structure: {old_output_path}")

if __name__ == "__main__":
    main()
