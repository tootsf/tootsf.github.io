#!/usr/bin/env python3
"""
Module Creation Utility for Community Bridge Documentation
Creates a new JSON module file with proper structure
"""

import json
import os
import sys
from pathlib import Path

def create_module_template(module_id, module_name, module_icon="📦", description=""):
    """Create a new module JSON template"""

    template = {
        "name": module_name,
        "icon": module_icon,
        "description": description or f"The {module_name} module provides functionality for {module_name.lower()} operations.",
        "clientFunctions": [
            {
                "name": "ExampleClientFunction",
                "description": f"Example client function for {module_name}",
                "syntax": f"Bridge.{module_name}.ExampleClientFunction(param1)",
                "parameters": [
                    {
                        "name": "param1",
                        "type": "string",
                        "description": "Example parameter"
                    }
                ],
                "returns": [
                    {
                        "type": "boolean",
                        "description": "Returns true on success"
                    }
                ],
                "example": f"local result = Bridge.{module_name}.ExampleClientFunction('test')"
            }
        ],
        "serverFunctions": [
            {
                "name": "ExampleServerFunction",
                "description": f"Example server function for {module_name}",
                "syntax": f"Bridge.{module_name}.ExampleServerFunction(playerId, data)",
                "parameters": [
                    {
                        "name": "playerId",
                        "type": "number",
                        "description": "The player ID"
                    },
                    {
                        "name": "data",
                        "type": "table",
                        "description": "Data to process"
                    }
                ],
                "returns": [
                    {
                        "type": "boolean",
                        "description": "Returns true on success"
                    }
                ],
                "example": f"local result = Bridge.{module_name}.ExampleServerFunction(1, {{test = true}})"
            }
        ]
    }

    return template

def main():
    if len(sys.argv) < 3:
        print("Usage: python create-module.py <module_id> <module_name> [icon] [description]")
        print("Example: python create-module.py banking Banking 🏦 'Banking and economy functions'")
        sys.exit(1)

    module_id = sys.argv[1].lower()
    module_name = sys.argv[2]
    module_icon = sys.argv[3] if len(sys.argv) > 3 else "📦"
    description = sys.argv[4] if len(sys.argv) > 4 else ""

    # Path to assets/data directory
    data_dir = Path("assets/data")
    if not data_dir.exists():
        print("Error: assets/data directory not found. Run this script from the documentation root.")
        sys.exit(1)

    # Create module file path
    module_file = data_dir / f"{module_id}.json"

    if module_file.exists():
        response = input(f"Module {module_id}.json already exists. Overwrite? (y/N): ")
        if response.lower() != 'y':
            print("Cancelled.")
            sys.exit(0)

    # Create template
    template = create_module_template(module_id, module_name, module_icon, description)

    # Write to file
    with open(module_file, 'w', encoding='utf-8') as f:
        json.dump(template, f, indent=2, ensure_ascii=False)

    print(f"✅ Created module: {module_file}")
    print(f"📝 Module will be automatically discovered by the documentation system")
    print(f"🔗 View at: http://localhost:8000/module.html?module={module_id}")
    print(f"✏️  Edit the JSON file to add your actual functions and documentation")

if __name__ == "__main__":
    main()
