#!/usr/bin/env python3

import os
import re

def test_framework_split():
    """Test splitting just the framework client functions"""
    print("🧪 Testing framework client functions split...")

    functions_file = "community_bridge/modules/framework/client/functions.md"

    if not os.path.exists(functions_file):
        print(f"❌ File not found: {functions_file}")
        return

    print(f"✅ Found file: {functions_file}")

    with open(functions_file, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"📄 File size: {len(content)} characters")

    # Extract frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1].strip()
            main_content = parts[2].strip()
            print(f"✅ Found frontmatter: {len(frontmatter)} chars")
            print(f"✅ Found content: {len(main_content)} chars")
        else:
            print("❌ Invalid frontmatter structure")
            return
    else:
        print("❌ No frontmatter found")
        return

    # Find functions
    function_pattern = r'## 🔹 ([^\n]+)(.*?)(?=## 🔹 |$)'
    functions = re.findall(function_pattern, main_content, re.DOTALL)

    print(f"🔍 Found {len(functions)} functions:")
    for i, (func_name, func_content) in enumerate(functions[:5]):  # Show first 5
        print(f"   {i+1}. {func_name.strip()} ({len(func_content)} chars)")

    if len(functions) > 5:
        print(f"   ... and {len(functions) - 5} more")

    # Test creating one function file
    if functions:
        func_name, func_content = functions[0]
        func_name = func_name.strip()

        print(f"\n📝 Testing creation of: {func_name}")

        # Create functions subdirectory
        functions_dir = "community_bridge/modules/framework/client/functions"
        os.makedirs(functions_dir, exist_ok=True)
        print(f"✅ Created directory: {functions_dir}")

        # Create individual function file
        func_filename = f"{func_name}.md"
        func_filepath = os.path.join(functions_dir, func_filename)

        # Create frontmatter for individual function
        func_frontmatter = f"""---
layout: default
title: "{func_name}"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/{func_name}/
---

"""

        # Clean up the function content
        func_content = func_content.strip()

        # Add the function header
        func_header = f"# {func_name}\n{{: .no_toc }}\n\n"

        # Complete file content
        full_content = func_frontmatter + func_header + func_content

        # Write the file
        with open(func_filepath, 'w', encoding='utf-8') as f:
            f.write(full_content)

        print(f"✅ Created: {func_filepath}")
        print(f"📄 File size: {len(full_content)} characters")

        # Verify the file was created
        if os.path.exists(func_filepath):
            print("✅ File verified on disk")
        else:
            print("❌ File not found on disk")

if __name__ == "__main__":
    test_framework_split()
