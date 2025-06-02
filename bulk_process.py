import os
import re
import sys

def process_all_modules():
    """Process all modules and create individual function files"""

    print("🚀 Community Bridge Individual File Creator")
    print("=" * 60)

    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')

    if not os.path.exists(modules_dir):
        print(f"❌ Modules directory not found: {modules_dir}")
        return

    modules = [d for d in os.listdir(modules_dir) if os.path.isdir(os.path.join(modules_dir, d))]
    total_created = 0
    modules_processed = 0

    print(f"📁 Found {len(modules)} modules to process")

    for module in modules:
        module_path = os.path.join(modules_dir, module)
        module_had_functions = False

        for side in ['client', 'server', 'shared']:
            functions_file = os.path.join(module_path, side, 'functions.md')

            if not os.path.exists(functions_file):
                continue

            try:
                with open(functions_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Skip if already processed (has has_children: true)
                if 'has_children: true' in content:
                    continue

                # Extract frontmatter
                if not content.startswith('---'):
                    continue

                parts = content.split('---', 2)
                if len(parts) < 3:
                    continue

                frontmatter = parts[1].strip()
                main_content = parts[2].strip()

                # Parse frontmatter
                grand_parent = ""
                parent_title = ""

                for line in frontmatter.split('\n'):
                    line = line.strip()
                    if line.startswith('grand_parent:'):
                        grand_parent = re.sub(r'^grand_parent:\s*"?([^"]*)"?', r'\1', line)
                    elif line.startswith('parent:'):
                        parent_title = re.sub(r'^parent:\s*"?([^"]*)"?', r'\1', line)

                # Find functions
                function_pattern = r'## 🔹 ([^\n]+)(.*?)(?=## 🔹 |$)'
                functions = re.findall(function_pattern, main_content, re.DOTALL)

                if not functions:
                    continue

                print(f"\n📂 {module}/{side}: Found {len(functions)} functions")
                module_had_functions = True

                # Create functions directory
                functions_dir = os.path.join(module_path, side, 'functions')
                os.makedirs(functions_dir, exist_ok=True)

                # Create individual function files
                created_count = 0
                for func_name, func_content in functions:
                    func_name = func_name.strip()
                    func_content = func_content.strip()

                    if not func_content:
                        continue

                    # Safe filename
                    safe_name = re.sub(r'[<>:"/\\|?*]', '', func_name)
                    func_file = os.path.join(functions_dir, f"{safe_name}.md")

                    # Create frontmatter
                    frontmatter_content = f'''---
layout: default
title: "{func_name}"
parent: Functions
grand_parent: {parent_title}
great_grand_parent: {grand_parent}
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/{module}/{side}/functions/{safe_name}/
---

'''

                    # Clean content (remove duplicate headers)
                    clean_content = re.sub(f'^# {re.escape(func_name)}.*?\\n\\n', '', func_content, flags=re.DOTALL)

                    # Add header
                    header = f"# {func_name}\n{{: .no_toc }}\n\n"

                    # Write file
                    full_content = frontmatter_content + header + clean_content
                    with open(func_file, 'w', encoding='utf-8') as f:
                        f.write(full_content)

                    created_count += 1
                    total_created += 1

                print(f"   ✅ Created {created_count} individual files")

                # Update container page
                container_content = f'''---
layout: default
title: Functions
parent: {parent_title}
grand_parent: {grand_parent}
great_grand_parent: Modules
has_children: true
nav_order: 1
permalink: /community_bridge/modules/{module}/{side}/functions/
---

# {side.title()} Functions
{{: .no_toc }}

{side.title()}-side functions for the {module} module.

## Available Functions

'''

                # Add function links
                for func_name, _ in functions:
                    func_name = func_name.strip()
                    safe_name = re.sub(r'[<>:"/\\|?*]', '', func_name)
                    container_content += f"- [{func_name}]({safe_name})\n"

                # Write container
                with open(functions_file, 'w', encoding='utf-8') as f:
                    f.write(container_content)

                print(f"   📝 Updated container page")

            except Exception as e:
                print(f"   ❌ Error processing {module}/{side}: {str(e)}")

        if module_had_functions:
            modules_processed += 1

    print(f"\n🎉 Completed!")
    print(f"   • Processed {modules_processed} modules")
    print(f"   • Created {total_created} individual function files")
    print(f"   • Navigation: Modules → Module → Side → Functions → Individual Function")

if __name__ == "__main__":
    process_all_modules()
