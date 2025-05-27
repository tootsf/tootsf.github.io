#!/usr/bin/env python3

import os
import glob
import re

def fix_all_parent_page_links():
    """Fix relative links in all client.md, server.md, and shared.md parent pages"""
    
    base_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
      # Get all module directories
    modules = [d for d in os.listdir(base_path) if os.path.isdir(os.path.join(base_path, d)) and d != "__pycache__"]
    modules = [m for m in modules if not m.endswith('.md')]  # Exclude any .md files
    
    print(f"Found {len(modules)} modules to process: {modules}")
    
    for module in modules:
        if module == "index.md":
            continue
            
        module_path = os.path.join(base_path, module)
        print(f"Processing module: {module}")
        
        # Process client.md, server.md, shared.md
        for side in ['client', 'server', 'shared']:
            side_file = os.path.join(module_path, f"{side}.md")
            
            if not os.path.exists(side_file):
                continue
                
            print(f"  Processing {side}.md")
            
            try:
                with open(side_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Fix relative links to absolute URLs
                # Pattern: - [Functions](side/functions.md) -> - [Functions](/community_bridge/modules/module/side/functions/)
                # Pattern: - [Events](side/events.md) -> - [Events](/community_bridge/modules/module/side/events/)
                
                def replace_link(match):
                    link_text = match.group(1)
                    filename = match.group(2)
                    
                    if filename == "functions.md":
                        return f"- [{link_text}](/community_bridge/modules/{module}/{side}/functions/)"
                    elif filename == "events.md":
                        return f"- [{link_text}](/community_bridge/modules/{module}/{side}/events/)"
                    else:
                        return match.group(0)  # Return original if unknown pattern
                
                # Pattern to match: - [Text](side/file.md)
                pattern = r'- \[([^\]]+)\]\(' + side + r'/([^)]+)\)'
                new_content = re.sub(pattern, replace_link, content)
                
                if new_content != content:
                    with open(side_file, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"    Updated links in {side}.md")
                else:
                    print(f"    No changes needed for {side}.md")
                    
            except Exception as e:
                print(f"    Error processing {side_file}: {e}")

if __name__ == "__main__":
    fix_all_parent_page_links()
    print("Link fixing complete!")
