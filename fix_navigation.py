#!/usr/bin/env python3

import os
import glob
import re

def fix_child_page_navigation():
    """Fix navigation in child pages by adding great_grand_parent: Modules"""
    
    base_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
    print(f"Base path: {base_path}")
    print(f"Path exists: {os.path.exists(base_path)}")
    
    # Find all functions.md and events.md files in subdirectories
    pattern = os.path.join(base_path, "**", "**", "*.md")
    print(f"Pattern: {pattern}")
    child_files = glob.glob(pattern, recursive=True)
    
    print(f"All files found: {len(child_files)}")
    for f in child_files[:5]:  # Show first 5
        print(f"  - {f}")
    
    # Filter to only get functions.md and events.md files
    child_files = [f for f in child_files if os.path.basename(f) in ['functions.md', 'events.md']]
    
    print(f"Found {len(child_files)} child files to fix")
    
    for file_path in child_files:
        print(f"Processing: {file_path}")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Check if great_grand_parent is already present
            if 'great_grand_parent:' in content:
                print(f"  - Already has great_grand_parent, skipping")
                continue
            
            # Find the frontmatter and add great_grand_parent
            # Pattern to match the frontmatter section
            frontmatter_pattern = r'(---\n.*?grand_parent: [^\n]+\n)(.*?\n---)'
            
            def add_great_grand_parent(match):
                front_part = match.group(1)
                rest_part = match.group(2)
                return f"{front_part}great_grand_parent: Modules\n{rest_part}"
            
            new_content = re.sub(frontmatter_pattern, add_great_grand_parent, content, flags=re.DOTALL)
            
            if new_content != content:
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(new_content)
                print(f"  - Updated frontmatter")
            else:
                print(f"  - No changes needed")
                
        except Exception as e:
            print(f"  - Error processing {file_path}: {e}")

if __name__ == "__main__":
    fix_child_page_navigation()
    print("Navigation fix complete!")
