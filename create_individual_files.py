#!/usr/bin/env python3

import os
import re

def extract_functions_from_consolidated_file(file_path):
    """Extract individual functions from a consolidated functions.md file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Extract frontmatter
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1].strip()
            main_content = parts[2].strip()
        else:
            return []
    else:
        return []

    # Parse frontmatter to get navigation info
    fm_data = {}
    for line in frontmatter.split('\n'):
        line = line.strip()
        if ':' in line and not line.startswith('#'):
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip().strip('"\'')
            fm_data[key] = value

    grand_parent = fm_data.get('grand_parent', '')
    parent_title = fm_data.get('parent', '')

    # Find all functions using the pattern: ## 🔹 FunctionName
    function_pattern = r'## 🔹 ([^\n]+)(.*?)(?=## 🔹 |$)'
    functions = re.findall(function_pattern, main_content, re.DOTALL)

    return functions, grand_parent, parent_title

def create_individual_function_files():
    """Create individual function files for all modules"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')

    print("🚀 Creating individual function files for all modules...")

    if not os.path.exists(modules_dir):
        print(f"❌ Modules directory not found: {modules_dir}")
        return

    modules = [d for d in os.listdir(modules_dir) if os.path.isdir(os.path.join(modules_dir, d))]
    total_functions_created = 0

    for module in modules:
        module_path = os.path.join(modules_dir, module)
        print(f"\n📁 Processing module: {module}")

        # Process each side (client, server, shared)
        for side in ['client', 'server', 'shared']:
            functions_file = os.path.join(module_path, side, 'functions.md')

            if not os.path.exists(functions_file):
                continue

            print(f"   📖 Processing {side}/functions.md")

            # Extract functions
            try:
                functions, grand_parent, parent_title = extract_functions_from_consolidated_file(functions_file)
            except Exception as e:
                print(f"   ❌ Error processing {side}/functions.md: {e}")
                continue

            if not functions:
                print(f"   ⏭️  No functions found in {side}/functions.md")
                continue

            print(f"   🔍 Found {len(functions)} functions")

            # Create functions subdirectory
            functions_dir = os.path.join(module_path, side, 'functions')
            os.makedirs(functions_dir, exist_ok=True)

            created_files = []

            for func_name, func_content in functions:
                func_name = func_name.strip()
                func_content = func_content.strip()

                if not func_content:
                    continue

                # Clean function name for filename
                safe_func_name = re.sub(r'[<>:"/\\|?*]', '', func_name)
                func_filename = f"{safe_func_name}.md"
                func_filepath = os.path.join(functions_dir, func_filename)

                # Create frontmatter for individual function
                func_frontmatter = f"""---
layout: default
title: "{func_name}"
parent: Functions
grand_parent: {parent_title}
great_grand_parent: {grand_parent}
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/{module}/{side}/functions/{safe_func_name}/
---

"""

                # Clean up the function content - remove duplicate headers
                func_content = re.sub(r'^# ' + re.escape(func_name) + r'\n.*?\n\n', '', func_content, flags=re.DOTALL)

                # Add the function header
                func_header = f"# {func_name}\n{{: .no_toc }}\n\n"

                # Complete file content
                full_content = func_frontmatter + func_header + func_content

                # Write the file
                try:
                    with open(func_filepath, 'w', encoding='utf-8') as f:
                        f.write(full_content)
                    created_files.append(func_filename)
                    total_functions_created += 1
                except Exception as e:
                    print(f"   ❌ Error writing {func_filename}: {e}")

            print(f"   ✅ Created {len(created_files)} function files")

            # Update the main functions.md to be a container page
            container_frontmatter = f"""---
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

"""

            # Add links to all functions
            for func_name, _ in functions:
                func_name = func_name.strip()
                if func_name:
                    safe_func_name = re.sub(r'[<>:"/\\|?*]', '', func_name)
                    container_frontmatter += f"- [{func_name}]({safe_func_name})\n"

            # Write updated functions.md
            try:
                with open(functions_file, 'w', encoding='utf-8') as f:
                    f.write(container_frontmatter)
                print(f"   📝 Updated {side}/functions.md to be a container page")
            except Exception as e:
                print(f"   ❌ Error updating {side}/functions.md: {e}")

    print(f"\n🎉 Created {total_functions_created} individual function files!")

def create_individual_event_files():
    """Create individual event files for modules that have events"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')

    print("\n🔄 Creating individual event files...")

    # Modules that have events
    event_modules = ['framework', 'inventory', 'phone', 'dispatch', 'shops', 'housing']
    total_events_created = 0

    for module in event_modules:
        module_path = os.path.join(modules_dir, module)
        events_file = os.path.join(module_path, 'server', 'events.md')

        if not os.path.exists(events_file):
            continue

        print(f"   📁 Processing {module}/server/events.md")

        try:
            events, grand_parent, parent_title = extract_functions_from_consolidated_file(events_file)
        except Exception as e:
            print(f"   ❌ Error processing {module}/server/events.md: {e}")
            continue

        if len(events) <= 1:
            print(f"   ⏭️  Only one or no events found, keeping as single file")
            continue

        print(f"   🔍 Found {len(events)} events")

        # Create events subdirectory
        events_dir = os.path.join(module_path, 'server', 'events')
        os.makedirs(events_dir, exist_ok=True)

        created_files = []

        for event_name, event_content in events:
            event_name = event_name.strip()
            event_content = event_content.strip()

            if not event_content:
                continue

            # Clean event name for filename
            safe_event_name = re.sub(r'[<>:"/\\|?*]', '', event_name)
            event_filename = f"{safe_event_name}.md"
            event_filepath = os.path.join(events_dir, event_filename)

            # Create frontmatter for individual event
            event_frontmatter = f"""---
layout: default
title: "{event_name}"
parent: Events
grand_parent: {parent_title}
great_grand_parent: {grand_parent}
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/{module}/server/events/{safe_event_name}/
---

"""

            # Clean up the event content
            event_content = re.sub(r'^# ' + re.escape(event_name) + r'\n.*?\n\n', '', event_content, flags=re.DOTALL)

            # Add the event header
            event_header = f"# {event_name}\n{{: .no_toc }}\n\n"

            # Complete file content
            full_content = event_frontmatter + event_header + event_content

            # Write the file
            try:
                with open(event_filepath, 'w', encoding='utf-8') as f:
                    f.write(full_content)
                created_files.append(event_filename)
                total_events_created += 1
            except Exception as e:
                print(f"   ❌ Error writing {event_filename}: {e}")

        print(f"   ✅ Created {len(created_files)} event files")

        # Update the main events.md to be a container page
        container_frontmatter = f"""---
layout: default
title: Events
parent: {parent_title}
grand_parent: {grand_parent}
great_grand_parent: Modules
has_children: true
nav_order: 2
permalink: /community_bridge/modules/{module}/server/events/
---

# Server Events
{{: .no_toc }}

Server-side events for the {module} module.

## Available Events

"""

        # Add links to all events
        for event_name, _ in events:
            event_name = event_name.strip()
            if event_name:
                safe_event_name = re.sub(r'[<>:"/\\|?*]', '', event_name)
                container_frontmatter += f"- [{event_name}]({safe_event_name})\n"

        # Write updated events.md
        try:
            with open(events_file, 'w', encoding='utf-8') as f:
                f.write(container_frontmatter)
            print(f"   📝 Updated server/events.md to be a container page")
        except Exception as e:
            print(f"   ❌ Error updating server/events.md: {e}")

    print(f"\n🎉 Created {total_events_created} individual event files!")

if __name__ == "__main__":
    print("🚀 Community Bridge Individual File Creator")
    print("=" * 60)

    create_individual_function_files()
    create_individual_event_files()

    print("\n🎉 Done! All functions and events now have individual files.")
    print("💡 Navigation structure: Module → Side → Functions/Events → Individual Function/Event")
