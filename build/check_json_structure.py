#!/usr/bin/env python3
"""
Script to check JSON parameter structures in Community Bridge documentation
"""

import json
import os
from pathlib import Path

def check_function_structure(func, func_type, module_name):
    """Check if a function has correct parameter structure"""
    issues = []

    # Check parameters
    if 'parameters' in func and isinstance(func['parameters'], list):
        for i, param in enumerate(func['parameters']):
            if isinstance(param, str):
                issues.append(f"  Parameter {i} is string: {param}")
            elif isinstance(param, dict):
                if 'name' not in param or 'type' not in param:
                    issues.append(f"  Parameter {i} missing name/type: {param}")

    # Check returns
    if 'returns' in func:
        if isinstance(func['returns'], str):
            issues.append(f"  Returns is string: {func['returns']}")
        elif isinstance(func['returns'], list) and len(func['returns']) > 0:
            if isinstance(func['returns'][0], str):
                issues.append(f"  Returns[0] is string: {func['returns'][0]}")

    if issues:
        print(f"  {func_type} function '{func.get('name', 'unknown')}' has issues:")
        for issue in issues:
            print(issue)
        return False
    return True

def check_json_file(file_path):
    """Check a JSON file's structure"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)

        module_name = data.get('name', 'Unknown')
        print(f"\nChecking {module_name}...")

        has_issues = False

        # Check client functions
        if 'clientFunctions' in data and isinstance(data['clientFunctions'], list):
            for func in data['clientFunctions']:
                if not check_function_structure(func, 'Client', module_name):
                    has_issues = True

        # Check server functions
        if 'serverFunctions' in data and isinstance(data['serverFunctions'], list):
            for func in data['serverFunctions']:
                if not check_function_structure(func, 'Server', module_name):
                    has_issues = True

        # Check shared functions
        if 'sharedFunctions' in data and isinstance(data['sharedFunctions'], list):
            for func in data['sharedFunctions']:
                if not check_function_structure(func, 'Shared', module_name):
                    has_issues = True

        if not has_issues:
            print("  ✓ All structures correct")

        return not has_issues

    except Exception as e:
        print(f"  ✗ Error processing {file_path}: {e}")
        return False

def main():
    """Main function to check all JSON files"""
    base_path = Path("c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/assets/pages/Community Bridge")

    # List of all modules
    modules = [
        "Notify", "HelpText", "ProgressBar", "Target", "Input", "Menu",
        "Dispatch", "Phone", "Skills", "Shops", "Managment", "Housing",
        "Weather", "VehicleKey", "Fuel", "Doorlock", "Dialogue", "Clothing",
        "Framework", "Version", "Math", "Locales"
    ]

    correct_count = 0
    total_count = 0

    for module in modules:
        module_dir = base_path / module
        json_file = module_dir / f"{module.lower()}.json"

        if json_file.exists():
            total_count += 1
            if check_json_file(json_file):
                correct_count += 1
        else:
            print(f"✗ JSON file not found: {json_file}")

    print(f"\n✓ Summary: {correct_count} out of {total_count} files have correct structure.")

if __name__ == "__main__":
    main()
