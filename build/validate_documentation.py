#!/usr/bin/env python3
"""
Final validation script for Community Bridge documentation
"""

import json
import requests
from pathlib import Path

def test_json_loading(base_url):
    """Test that all JSON modules can be loaded"""
    modules = [
        "Notify", "HelpText", "ProgressBar", "Target", "Input", "Menu",
        "Dispatch", "Phone", "Skills", "Shops", "Managment", "Housing",
        "Weather", "VehicleKey", "Fuel", "Doorlock", "Dialogue", "Clothing",
        "Framework", "Version", "Math", "Locales"
    ]

    success_count = 0

    for module in modules:
        url = f"{base_url}/assets/pages/Community%20Bridge/{module}/{module.lower()}.json"
        try:
            response = requests.get(url, timeout=5)
            if response.status_code == 200:
                data = response.json()
                # Validate structure
                if 'name' in data and 'clientFunctions' in data:
                    print(f"✓ {module}: OK (HTTP {response.status_code})")
                    success_count += 1
                else:
                    print(f"✗ {module}: Invalid structure")
            else:
                print(f"✗ {module}: HTTP {response.status_code}")
        except Exception as e:
            print(f"✗ {module}: Error - {e}")

    print(f"\n✓ Summary: {success_count}/{len(modules)} modules loaded successfully")
    return success_count == len(modules)

def test_structure_file(base_url):
    """Test that the pages-structure.json file loads correctly"""
    try:
        response = requests.get(f"{base_url}/assets/pages-structure.json", timeout=5)
        if response.status_code == 200:
            data = response.json()
            bridge_modules = data.get("Community Bridge", {}).get("children", {})
            module_count = len(bridge_modules)
            print(f"✓ pages-structure.json: OK ({module_count} modules found)")
            return True
        else:
            print(f"✗ pages-structure.json: HTTP {response.status_code}")
            return False
    except Exception as e:
        print(f"✗ pages-structure.json: Error - {e}")
        return False

def main():
    base_url = "http://localhost:8080"

    print("=== Community Bridge Documentation Validation ===\n")

    print("1. Testing structure file...")
    structure_ok = test_structure_file(base_url)

    print("\n2. Testing module JSON files...")
    modules_ok = test_json_loading(base_url)

    print(f"\n=== Results ===")
    print(f"Structure file: {'✓ PASS' if structure_ok else '✗ FAIL'}")
    print(f"Module files: {'✓ PASS' if modules_ok else '✗ FAIL'}")
    print(f"Overall: {'✓ ALL TESTS PASSED' if structure_ok and modules_ok else '✗ SOME TESTS FAILED'}")

if __name__ == "__main__":
    main()
