#!/usr/bin/env python3
"""
Script to fix JSON parameter structures in Community Bridge documentation
"""

import json
import os
import re
from pathlib import Path

def parse_parameter_string(param_str):
    """Parse a parameter string like 'name (type) - description' into components"""
    # Match patterns like "name (type) - description" or "name (type, optional) - description"
    pattern = r'^([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]+)\)\s*-\s*(.+)$'
    match = re.match(pattern, param_str.strip())

    if match:
        name = match.group(1).strip()
        type_info = match.group(2).strip()
        description = match.group(3).strip()

        # Check if optional
        optional = 'optional' in type_info.lower()

        # Extract the actual type
        type_clean = type_info.replace(', optional', '').replace(',optional', '').strip()

        param_obj = {
            "name": name,
            "type": type_clean,
            "description": description
        }

        if optional:
            param_obj["optional"] = True

        return param_obj
    else:
        # Fallback for malformed strings
        return {
            "name": "unknown",
            "type": "unknown",
            "description": param_str
        }

def parse_return_string(return_str):
    """Parse a return string like 'type - description' into components"""
    if isinstance(return_str, dict):
        return return_str  # Already in correct format

    if isinstance(return_str, list):
        return return_str  # Already in correct format

    # Split on first ' - ' to separate type and description
    parts = return_str.split(' - ', 1)
    if len(parts) == 2:
        return {
            "type": parts[0].strip(),
            "description": parts[1].strip()
        }
    else:
        return {
            "type": return_str.strip(),
            "description": "No description provided"
        }

def fix_function_structure(func):
    """Fix a function's parameter and return structure"""
    # Fix parameters
    if 'parameters' in func and isinstance(func['parameters'], list):
        new_params = []
        for param in func['parameters']:
            if isinstance(param, str):
                new_params.append(parse_parameter_string(param))
            else:
                new_params.append(param)  # Already in correct format
        func['parameters'] = new_params

    # Fix returns
    if 'returns' in func:
        if isinstance(func['returns'], str):
            func['returns'] = [parse_return_string(func['returns'])]
        elif isinstance(func['returns'], list) and len(func['returns']) > 0:
            if isinstance(func['returns'][0], str):
                func['returns'] = [parse_return_string(func['returns'][0])]

    # Add description if missing
    if 'description' not in func:
        func['description'] = f"Function {func.get('name', 'unknown')}"

    return func

def fix_json_file(file_path):
    """Fix a JSON file's structure"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        modified = False

        # Fix client functions
        if 'clientFunctions' in data and isinstance(data['clientFunctions'], list):
            for func in data['clientFunctions']:
                original_func = json.dumps(func, sort_keys=True)
                fix_function_structure(func)
                if json.dumps(func, sort_keys=True) != original_func:
                    modified = True

        # Fix server functions
        if 'serverFunctions' in data and isinstance(data['serverFunctions'], list):
            for func in data['serverFunctions']:
                original_func = json.dumps(func, sort_keys=True)
                fix_function_structure(func)
                if json.dumps(func, sort_keys=True) != original_func:
                    modified = True

        # Fix shared functions (for modules like Math)
        if 'sharedFunctions' in data and isinstance(data['sharedFunctions'], list):
            for func in data['sharedFunctions']:
                original_func = json.dumps(func, sort_keys=True)
                fix_function_structure(func)
                if json.dumps(func, sort_keys=True) != original_func:
                    modified = True

        if modified:
            with open(file_path, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            print(f"  ✓ Fixed {file_path}")
            return True
        else:
            print(f"  ✓ No changes needed for {file_path}")
            return False

    except Exception as e:
        print(f"  ✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to fix all JSON files"""
    base_path = Path("c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/assets/pages/Community Bridge")

    # List of all modules
    modules = [
        "Notify", "HelpText", "ProgressBar", "Target", "Input", "Menu",
        "Dispatch", "Phone", "Skills", "Shops", "Managment", "Housing",
        "Weather", "VehicleKey", "Fuel", "Doorlock", "Dialogue", "Clothing",
        "Framework", "Version", "Math", "Locales"
    ]

    fixed_count = 0
    total_count = 0

    for module in modules:
        module_dir = base_path / module
        json_file = module_dir / f"{module.lower()}.json"

        if json_file.exists():
            print(f"Processing {module}...")
            total_count += 1
            if fix_json_file(json_file):
                fixed_count += 1
        else:
            print(f"  ✗ JSON file not found: {json_file}")

    print(f"\n✓ Completed! Fixed {fixed_count} out of {total_count} files.")

if __name__ == "__main__":
    main()
