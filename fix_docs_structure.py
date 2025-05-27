import os
import re
from pathlib import Path

def fix_module_structure(module_path):
    """Fix the documentation structure to have Server -> Functions instead of direct server functions"""
    
    module_name = os.path.basename(module_path)
    
    for func_type in ['client', 'server', 'shared']:
        current_file = os.path.join(module_path, f'{func_type}.md')
        functions_file = os.path.join(module_path, func_type, 'functions.md')
        
        if not os.path.exists(current_file):
            continue
            
        # Read the current consolidated file
        try:
            with open(current_file, 'r', encoding='utf-8') as f:
                content = f.read()
        except Exception as e:
            print(f"Error reading {current_file}: {e}")
            continue
            
        # Parse the frontmatter and content
        if not content.startswith('---'):
            continue
            
        parts = content.split('---', 2)
        if len(parts) < 3:
            continue
            
        frontmatter = parts[1].strip()
        body_content = parts[2].strip()
        
        # Check if there are actual functions (not just "No X-side functions available")
        has_functions = '## 🔹' in body_content and 'No ' not in body_content
        
        if has_functions:
            # Create the new structure
            create_functions_structure(module_path, module_name, func_type, frontmatter, body_content)
        else:
            # Keep simple structure for modules with no functions
            create_simple_structure(module_path, module_name, func_type, frontmatter, body_content)

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
    
    # Add Events page reference if it exists
    events_file = os.path.join(module_path, f'{func_type}', 'events.md')
    if func_type == 'server' and (os.path.exists(events_file) or should_have_events(module_name)):
        main_content += f"\n- [Events]({func_type}/events.md) - Server-side events"
    
    try:
        with open(main_file, 'w', encoding='utf-8') as f:
            f.write(main_content)
    except Exception as e:
        print(f"Error writing {main_file}: {e}")
        return
    
    # Create the functions page
    functions_file = os.path.join(func_dir, 'functions.md')
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
    
    try:
        with open(functions_file, 'w', encoding='utf-8') as f:
            f.write(functions_content)
        print(f"Created {module_name} {func_type} functions structure")
    except Exception as e:
        print(f"Error writing {functions_file}: {e}")

def create_simple_structure(module_path, module_name, func_type, frontmatter, body_content):
    """Keep simple structure for modules with no functions"""
    
    main_file = os.path.join(module_path, f'{func_type}.md')
    main_content = f"""---
layout: default
title: {func_type.title()}
parent: "{get_module_emoji(module_name)} {module_name.title()}"
grand_parent: Modules
nav_order: {get_nav_order(func_type)}
permalink: /community_bridge/modules/{module_name}/{func_type}/
---

{body_content}"""
    
    try:
        with open(main_file, 'w', encoding='utf-8') as f:
            f.write(main_content)
        print(f"Updated {module_name} {func_type} (no functions)")
    except Exception as e:
        print(f"Error writing {main_file}: {e}")

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

def create_events_pages():
    """Create events pages for modules that need them"""
    base_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
    
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
                    print("Moved housing events to server/events.md")
        except Exception as e:
            print(f"Error moving housing events: {e}")

def main():
    """Main function to process all modules"""
    base_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
    
    print(f"Starting structure fix...")
    print(f"Base path: {base_path}")
    
    if not os.path.exists(base_path):
        print(f"Base path not found: {base_path}")
        return
    
    print(f"Base path exists, proceeding...")
    
    # First, handle any existing events files
    print("Creating events pages...")
    create_events_pages()
    
    modules = [d for d in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, d))]
    print(f"Found {len(modules)} modules: {modules}")
    
    for module in modules:
        module_path = os.path.join(base_path, module)
        print(f"Processing module: {module}")
        fix_module_structure(module_path)
    
    print("Structure fix complete!")

if __name__ == "__main__":
    main()
