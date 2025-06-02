#!/usr/bin/env python3

import os
import re

def fix_duplicate_headers():
    """Fix duplicate headers in functions.md files"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')

    print("🔍 Checking for duplicate headers in functions.md files...")
    print(f"Base dir: {base_dir}")
    print(f"Modules dir: {modules_dir}")

    if not os.path.exists(modules_dir):
        print(f"❌ Modules directory not found: {modules_dir}")
        return

    modules = [d for d in os.listdir(modules_dir) if os.path.isdir(os.path.join(modules_dir, d))]
    print(f"Found {len(modules)} modules: {', '.join(modules[:5])}...")

    fixed_files = []

    for module in os.listdir(modules_dir):
        module_path = os.path.join(modules_dir, module)
        if not os.path.isdir(module_path):
            continue

        # Check each side (client, server, shared)
        for side in ['client', 'server', 'shared']:
            functions_file = os.path.join(module_path, side, 'functions.md')

            if os.path.exists(functions_file):
                with open(functions_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Look for duplicate headers pattern
                # Pattern: # Title\n{: .no_toc }\n\nDescription\n\n# Title\n{: .no_toc }\n\nDescription\n\n---
                pattern = r'(# .+ Functions\n\{: \.no_toc \}\n\n.+?\n\n)(# .+ Functions\n\{: \.no_toc \}\n\n.+?\n\n)(---)'

                if re.search(pattern, content, re.DOTALL):
                    print(f"  Found duplicate headers in {module}/{side}/functions.md")

                    # Remove the duplicate
                    new_content = re.sub(pattern, r'\1\3', content, flags=re.DOTALL)

                    with open(functions_file, 'w', encoding='utf-8') as f:
                        f.write(new_content)

                    fixed_files.append(f"{module}/{side}/functions.md")

    if fixed_files:
        print(f"✅ Fixed duplicate headers in {len(fixed_files)} files:")
        for file in fixed_files:
            print(f"    {file}")
    else:
        print("✅ No duplicate headers found!")

if __name__ == "__main__":
    print("🚀 Community Bridge Header Fixer")
    print("=" * 40)
    fix_duplicate_headers()
    print("🎉 Done!")
