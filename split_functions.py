#!/usr/bin/env python3

import os
import re
import yaml

def extract_frontmatter_and_content(content):
    """Extract frontmatter and content from markdown"""
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1].strip()
            content = parts[2].strip()
            return frontmatter, content
    return None, content

def split_consolidated_functions():
    """Split consolidated functions.md files back into individual function files"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')

    print("🔄 Splitting consolidated functions back into individual files...")

    modules = [d for d in os.listdir(modules_dir) if os.path.isdir(os.path.join(modules_dir, d))]

    for module in modules:
        module_path = os.path.join(modules_dir, module)
        print(f"\n📁 Processing module: {module}")

        # Process each side (client, server, shared)
        for side in ['client', 'server', 'shared']:
            functions_file = os.path.join(module_path, side, 'functions.md')

            if not os.path.exists(functions_file):
                print(f"   ⏭️  No {side}/functions.md found")
                continue

            with open(functions_file, 'r', encoding='utf-8') as f:
                content = f.read()

            # Extract frontmatter
            frontmatter, main_content = extract_frontmatter_and_content(content)

            if not frontmatter:
                print(f"   ❌ No frontmatter found in {side}/functions.md")
                continue

            # Parse frontmatter to get module info
            try:
                fm_data = yaml.safe_load(frontmatter)
                grand_parent = fm_data.get('grand_parent', '')
                parent_title = fm_data.get('parent', '')
            except:
                print(f"   ❌ Error parsing frontmatter in {side}/functions.md")
                continue

            # Find all functions in the content
            # Pattern: ## 🔹 FunctionName followed by content until next ## 🔹 or end
            function_pattern = r'## 🔹 ([^\n]+)(.*?)(?=## 🔹 |$)'
            functions = re.findall(function_pattern, main_content, re.DOTALL)

            if not functions:
                print(f"   ⏭️  No functions found in {side}/functions.md")
                continue

            # Create functions subdirectory
            functions_dir = os.path.join(module_path, side, 'functions')
            os.makedirs(functions_dir, exist_ok=True)

            created_files = []

            for func_name, func_content in functions:
                func_name = func_name.strip()
                func_content = func_content.strip()

                # Create individual function file
                func_filename = f"{func_name}.md"
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
permalink: /community_bridge/modules/{module}/{side}/functions/{func_name}/
---

"""

                # Clean up the function content
                # Remove the duplicate header if it exists
                func_content = re.sub(r'^# ' + re.escape(func_name) + r'\n.*?\n\n', '', func_content, flags=re.DOTALL)

                # Add the function header
                func_header = f"# {func_name}\n{{: .no_toc }}\n\n"

                # Complete file content
                full_content = func_frontmatter + func_header + func_content

                # Write the file
                with open(func_filepath, 'w', encoding='utf-8') as f:
                    f.write(full_content)

                created_files.append(func_filename)

            print(f"   ✅ Created {len(created_files)} function files in {side}/functions/")

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
                container_frontmatter += f"- [{func_name}]({func_name})\n"

            # Write updated functions.md
            with open(functions_file, 'w', encoding='utf-8') as f:
                f.write(container_frontmatter)

            print(f"   📝 Updated {side}/functions.md to be a container page")

def split_events_files():
    """Split events.md files if they contain multiple events"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')

    print("\n🔄 Processing events files...")

    # Modules that have events
    event_modules = ['framework', 'inventory', 'phone', 'dispatch', 'shops', 'housing']

    for module in event_modules:
        module_path = os.path.join(modules_dir, module)
        events_file = os.path.join(module_path, 'server', 'events.md')

        if not os.path.exists(events_file):
            continue

        print(f"   📁 Processing {module}/server/events.md")

        with open(events_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Check if there are multiple events to split
        event_pattern = r'## 🔹 ([^\n]+)(.*?)(?=## 🔹 |$)'
        events = re.findall(event_pattern, content, re.DOTALL)

        if len(events) <= 1:
            print(f"   ⏭️  Only one or no events found, keeping as single file")
            continue

        # Extract frontmatter
        frontmatter, main_content = extract_frontmatter_and_content(content)

        if frontmatter:
            try:
                fm_data = yaml.safe_load(frontmatter)
                grand_parent = fm_data.get('grand_parent', '')
                parent_title = fm_data.get('parent', '')
            except:
                continue

            # Create events subdirectory
            events_dir = os.path.join(module_path, 'server', 'events')
            os.makedirs(events_dir, exist_ok=True)

            created_files = []

            for event_name, event_content in events:
                event_name = event_name.strip()
                event_content = event_content.strip()

                # Create individual event file
                event_filename = f"{event_name}.md"
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
permalink: /community_bridge/modules/{module}/server/events/{event_name}/
---

"""

                # Clean up the event content
                event_content = re.sub(r'^# ' + re.escape(event_name) + r'\n.*?\n\n', '', event_content, flags=re.DOTALL)

                # Add the event header
                event_header = f"# {event_name}\n{{: .no_toc }}\n\n"

                # Complete file content
                full_content = event_frontmatter + event_header + event_content

                # Write the file
                with open(event_filepath, 'w', encoding='utf-8') as f:
                    f.write(full_content)

                created_files.append(event_filename)

            print(f"   ✅ Created {len(created_files)} event files in server/events/")

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
                container_frontmatter += f"- [{event_name}]({event_name})\n"

            # Write updated events.md
            with open(events_file, 'w', encoding='utf-8') as f:
                f.write(container_frontmatter)

            print(f"   📝 Updated server/events.md to be a container page")

if __name__ == "__main__":
    print("🚀 Community Bridge Function Splitter")
    print("=" * 50)

    split_consolidated_functions()
    split_events_files()

    print("\n🎉 Done! Each function and event now has its own file.")
    print("💡 Navigation structure: Module → Side → Functions/Events → Individual Function/Event")
