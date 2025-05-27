import os
import re
from pathlib import Path

def consolidate_and_restructure():
    """Complete restructure: consolidate functions then apply hierarchy"""
    base_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
    
    print("Starting complete restructure...")
    print(f"Base path: {base_path}")
    
    if not os.path.exists(base_path):
        print(f"Base path not found: {base_path}")
        return
    
    print("Step 1: Consolidating individual function files...")
    
    # First, consolidate individual function files into main files
    consolidate_all_functions(base_path)
    
    print("Step 2: Applying hierarchical structure...")
    
    # Then apply the hierarchical structure
    apply_hierarchical_structure(base_path)
    
    print("Complete restructure finished!")

def consolidate_all_functions(base_path):
    """Consolidate individual function files into main client.md, server.md, shared.md files"""
    
    if not os.path.exists(base_path):
        print(f"Base path not found: {base_path}")
        return
    
    modules = [d for d in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, d))]
    
    for module in modules:
        module_path = os.path.join(base_path, module)
        print(f"  Consolidating module: {module}")
        consolidate_module_functions(module_path)

def consolidate_module_functions(module_path):
    """Consolidate individual function files into client.md, server.md, and shared.md files"""
    
    module_name = os.path.basename(module_path)
    
    for func_type in ['client', 'server', 'shared']:
        func_dir = os.path.join(module_path, func_type)
        output_file = os.path.join(module_path, f'{func_type}.md')
        
        if not os.path.exists(func_dir):
            # Create empty function page if directory doesn't exist
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(f"""---
layout: default
title: {func_type.title()} Functions
parent: "{get_module_emoji(module_name)} {module_name.title()}"
grand_parent: Modules
nav_order: {get_nav_order(func_type)}
permalink: /community_bridge/modules/{module_name}/{func_type}/
---

# {module_name.title()} {func_type.title()} Functions
{{: .no_toc }}

No {func_type}-side functions available for the {module_name.title()} module.""")
            continue
        
        # Get all .md files in the function directory
        md_files = [f for f in os.listdir(func_dir) if f.endswith('.md') and f not in ['README.md', 'functions.md', 'events.md']]
        
        if not md_files:
            # Create empty function page if no functions exist
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(f"""---
layout: default
title: {func_type.title()} Functions
parent: "{get_module_emoji(module_name)} {module_name.title()}"
grand_parent: Modules
nav_order: {get_nav_order(func_type)}
permalink: /community_bridge/modules/{module_name}/{func_type}/
---

# {module_name.title()} {func_type.title()} Functions
{{: .no_toc }}

No {func_type}-side functions available for the {module_name.title()} module.""")
            continue
        
        # Read and consolidate all function files
        consolidated_content = f"""---
layout: default
title: {func_type.title()} Functions
parent: "{get_module_emoji(module_name)} {module_name.title()}"
grand_parent: Modules
nav_order: {get_nav_order(func_type)}
permalink: /community_bridge/modules/{module_name}/{func_type}/
---

# {module_name.title()} {func_type.title()} Functions
{{: .no_toc }}

{func_type.title()}-side functions for {get_module_description(module_name)}.

"""
        
        for md_file in sorted(md_files):
            func_path = os.path.join(func_dir, md_file)
            try:
                with open(func_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Extract function content (skip frontmatter)
                if '---' in content:
                    parts = content.split('---', 2)
                    if len(parts) >= 3:
                        func_content = parts[2].strip()
                        
                        # Extract function name from filename
                        func_name = os.path.splitext(md_file)[0]
                        
                        # Clean up the content and add to consolidated
                        if func_content:
                            consolidated_content += f"""---

{extract_function_content(func_content, func_name)}

"""
            except Exception as e:
                print(f"    Error processing {func_path}: {e}")
                continue
        
        # Write consolidated file
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(consolidated_content.strip())
            print(f"    Consolidated {module_name} {func_type} functions")
        except Exception as e:
            print(f"    Error writing {output_file}: {e}")

def extract_function_content(content, func_name):
    """Extract and clean function content"""
    # Add function header if not present
    if not content.startswith('## 🔹'):
        content = f"## 🔹 {func_name}\n\n{content}"
    
    return content.strip()

def apply_hierarchical_structure(base_path):
    """Apply the hierarchical structure transformation"""
    
    # Handle events pages first
    create_events_pages(base_path)
    
    modules = [d for d in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, d))]
    
    for module in modules:
        module_path = os.path.join(base_path, module)
        print(f"  Applying hierarchy to module: {module}")
        fix_module_structure(module_path)

def fix_module_structure(module_path):
    """Fix the documentation structure to have Server -> Functions instead of direct server functions"""
    
    module_name = os.path.basename(module_path)
    
    for func_type in ['client', 'server', 'shared']:
        current_file = os.path.join(module_path, f'{func_type}.md')
        
        if not os.path.exists(current_file):
            continue
            
        # Read the current consolidated file
        try:
            with open(current_file, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"    Error reading {current_file}: {e}")
            continue
            
        # Parse the frontmatter and content
        if not content.startswith('---'):
            continue
            
        parts = content.split('---', 2)
        if len(parts) < 3:
            continue
            
        frontmatter = parts[1].strip()
        body_content = parts[2].strip()
        
        # Always create the hierarchical structure for consistency
        create_functions_structure(module_path, module_name, func_type, frontmatter, body_content)

def create_functions_structure(module_path, module_name, func_type, frontmatter, body_content):
    """Create the new structure with Functions as a child page"""
    
    # Create the functions directory if it doesn't exist
    func_dir = os.path.join(module_path, func_type)
    os.makedirs(func_dir, exist_ok=True)
    
    # Update the main page to be a parent with children
    main_file = os.path.join(module_path, f'{func_type}.md')
    main_content = f"""---
layout: default
title: {func_type.title()}
parent: "{get_module_emoji(module_name)} {module_name.title()}"
grand_parent: Modules
nav_order: {get_nav_order(func_type)}
has_children: true
permalink: /community_bridge/modules/{module_name}/{func_type}/
---

# {module_name.title()} {func_type.title()}
{{: .no_toc }}

{func_type.title()}-side functionality for {get_module_description(module_name)}.

## Pages

- [Functions]({func_type}/functions.md) - All {func_type}-side functions"""
    
    # Add Events page reference if it exists or should exist
    events_file = os.path.join(module_path, f'{func_type}', 'events.md')
    if func_type == 'server' and (os.path.exists(events_file) or should_have_events(module_name)):
        main_content += f"\n- [Events]({func_type}/events.md) - Server-side events"
    
    try:
        with open(main_file, 'w', encoding='utf-8') as f:
            f.write(main_content)
    except Exception as e:
        print(f"    Error writing {main_file}: {e}")
        return
    
    # Create the functions page
    functions_file = os.path.join(func_dir, 'functions.md')
    
    # Check if there are actual functions or just "No X-side functions available"
    has_actual_functions = '## 🔹' in body_content
    
    if has_actual_functions:
        functions_content = f"""---
layout: default
title: Functions
parent: {func_type.title()}
grand_parent: "{get_module_emoji(module_name)} {module_name.title()}"
nav_order: 1
permalink: /community_bridge/modules/{module_name}/{func_type}/functions/
---

# {module_name.title()} {func_type.title()} Functions
{{: .no_toc }}

{func_type.title()}-side functions for {get_module_description(module_name)}.

{body_content}"""
    else:
        # No functions available
        functions_content = f"""---
layout: default
title: Functions
parent: {func_type.title()}
grand_parent: "{get_module_emoji(module_name)} {module_name.title()}"
nav_order: 1
permalink: /community_bridge/modules/{module_name}/{func_type}/functions/
---

# {module_name.title()} {func_type.title()} Functions
{{: .no_toc }}

No {func_type}-side functions available for the {module_name.title()} module."""
    
    try:
        with open(functions_file, 'w', encoding='utf-8') as f:
            f.write(functions_content)
        print(f"    Created {module_name} {func_type} functions structure")
    except Exception as e:
        print(f"    Error writing {functions_file}: {e}")

def create_events_pages(base_path):
    """Create events pages for modules that need them"""
    
    # Check for existing events.md files in housing module
    housing_events = os.path.join(base_path, 'housing', 'events.md')
    if os.path.exists(housing_events):
        # Move it to server/events.md
        housing_server_dir = os.path.join(base_path, 'housing', 'server')
        os.makedirs(housing_server_dir, exist_ok=True)
        
        new_events_path = os.path.join(housing_server_dir, 'events.md')
        try:
            # Read the existing events file
            with open(housing_events, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Update the frontmatter
            if content.startswith('---'):
                parts = content.split('---', 2)
                if len(parts) >= 3:
                    body = parts[2].strip()
                    new_content = f"""---
layout: default
title: Events
parent: Server
grand_parent: "🏠 Housing"
nav_order: 2
permalink: /community_bridge/modules/housing/server/events/
---

{body}"""
                    
                    with open(new_events_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    # Remove the old file
                    os.remove(housing_events)
                    print("  Moved housing events to server/events.md")
        except Exception as e:
            print(f"  Error moving housing events: {e}")
    
    # Create placeholder events pages for other modules that should have them
    event_modules = ['framework', 'inventory', 'phone', 'dispatch', 'shops']
    
    for module_name in event_modules:
        module_path = os.path.join(base_path, module_name)
        if not os.path.exists(module_path):
            continue
            
        server_dir = os.path.join(module_path, 'server')
        os.makedirs(server_dir, exist_ok=True)
        
        events_file = os.path.join(server_dir, 'events.md')
        
        # Only create if it doesn't already exist
        if not os.path.exists(events_file):
            events_content = f"""---
layout: default
title: Events
parent: Server
grand_parent: "{get_module_emoji(module_name)} {module_name.title()}"
nav_order: 2
permalink: /community_bridge/modules/{module_name}/server/events/
---

# {module_name.title()} Server Events
{{: .no_toc }}

Server-side events for {get_module_description(module_name)}.

*Events documentation coming soon.*
"""
            
            try:
                with open(events_file, 'w', encoding='utf-8') as f:
                    f.write(events_content)
                print(f"  Created {module_name} server events page")
            except Exception as e:
                print(f"  Error creating {events_file}: {e}")

def should_have_events(module_name):
    """Check if a module should have an events page"""
    # Modules that typically have server events
    event_modules = ['framework', 'inventory', 'phone', 'dispatch', 'housing', 'shops']
    return module_name.lower() in event_modules

def get_module_emoji(module_name):
    """Get emoji for module based on name"""
    emojis = {
        'accessibility': '♿',
        'clothing': '👔',
        'dialogue': '💬',
        'dispatch': '🚨',
        'doorlock': '🚪',
        'framework': '🧩',
        'fuel': '⛽',
        'helptext': '❓',
        'housing': '🏠',
        'input': '⌨️',
        'inventory': '🎒',
        'locales': '🌐',
        'managment': '📊',
        'math': '🔢',
        'menu': '📋',
        'notify': '🔔',
        'phone': '📱',
        'progressbar': '⏳',
        'shops': '🛒',
        'skills': '⭐',
        'target': '🎯',
        'vehiclekey': '🔑',
        'version': '📦',
        'weather': '🌤️'
    }
    return emojis.get(module_name, '📁')

def get_nav_order(func_type):
    """Get navigation order for function type"""
    orders = {'client': 1, 'server': 2, 'shared': 3}
    return orders.get(func_type, 4)

def get_module_description(module_name):
    """Get description for module"""
    descriptions = {
        'accessibility': 'accessibility and color adjustments',
        'clothing': 'managing player appearance and clothing',
        'dialogue': 'opening and closing dialogues',
        'dispatch': 'sending alerts and emergency calls',
        'doorlock': 'managing door locks and access',
        'framework': 'framework integration and player data management',
        'fuel': 'vehicle fuel management',
        'helptext': 'displaying help text and instructions',
        'housing': 'housing and property management',
        'input': 'input handling and validation',
        'inventory': 'inventory management',
        'locales': 'localization and translations',
        'managment': 'management functions',
        'math': 'mathematical calculations',
        'menu': 'menu creation and management',
        'notify': 'notifications and alerts',
        'phone': 'phone system integration',
        'progressbar': 'progress bar displays',
        'shops': 'shop and store management',
        'skills': 'skill and progression systems',
        'target': 'targeting and interaction systems',
        'vehiclekey': 'vehicle key management',
        'version': 'version checking and updates',
        'weather': 'weather system control'
    }
    return descriptions.get(module_name, f'{module_name} functionality')

if __name__ == "__main__":
    consolidate_and_restructure()
