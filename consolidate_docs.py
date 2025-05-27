import os
import re
from pathlib import Path

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
        md_files = [f for f in os.listdir(func_dir) if f.endswith('.md') and f != 'README.md']
        
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
                print(f"Error processing {func_path}: {e}")
                continue
        
        # Write consolidated file
        try:
            with open(output_file, 'w', encoding='utf-8') as f:
                f.write(consolidated_content.strip())
            print(f"Consolidated {module_name} {func_type} functions")
        except Exception as e:
            print(f"Error writing {output_file}: {e}")

def extract_function_content(content, func_name):
    """Extract and clean function content"""
    # Remove any existing function headers
    content = re.sub(r'^# .*?\n', '', content, flags=re.MULTILINE)
    content = re.sub(r'^## .*?\n', '', content, flags=re.MULTILINE)
    
    # Add new function header
    result = f"## 🔹 {func_name}\n\n"
    
    # Clean up content
    content = content.strip()
    if content:
        result += content
    else:
        result += f"Function documentation for {func_name}."
    
    return result

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

def main():
    """Main function to process all modules"""
    base_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
    
    if not os.path.exists(base_path):
        print(f"Base path not found: {base_path}")
        return
    
    modules = [d for d in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, d))]
    
    for module in modules:
        module_path = os.path.join(base_path, module)
        print(f"Processing module: {module}")
        consolidate_module_functions(module_path)
    
    print("Consolidation complete!")

if __name__ == "__main__":
    main()
