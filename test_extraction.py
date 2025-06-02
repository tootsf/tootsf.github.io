#!/usr/bin/env python3

import os
import re

def test_extraction():
    file_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules\framework\client\functions.md"

    print("Testing function extraction...")
    print(f"File: {file_path}")

    if not os.path.exists(file_path):
        print("File does not exist!")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    print(f"File length: {len(content)} characters")

    # Extract frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1].strip()
            main_content = parts[2].strip()
            print("Frontmatter extracted successfully")
        else:
            print("Failed to extract frontmatter")
            return
    else:
        print("No frontmatter found")
        return

    # Find all functions using the pattern: ## 🔹 FunctionName
    function_pattern = r'## 🔹 ([^\n]+)(.*?)(?=## 🔹 |$)'
    functions = re.findall(function_pattern, main_content, re.DOTALL)

    print(f"Found {len(functions)} functions:")
    for i, (name, content) in enumerate(functions):
        print(f"  {i+1}. {name.strip()} ({len(content)} chars)")

    if functions:
        print("\nFirst function content preview:")
        print(functions[0][1][:200] + "..." if len(functions[0][1]) > 200 else functions[0][1])

if __name__ == "__main__":
    test_extraction()
