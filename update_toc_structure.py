#!/usr/bin/env python3
"""
Script to ensure all documentation pages have proper heading structure for TOC.
This script will:
1. Check all .md files in the community_bridge directory
2. Ensure function pages use the 'docs' layout for TOC functionality
3. Fix heading structure to work well with the right-side TOC
"""

import os
import re
from pathlib import Path

def process_markdown_file(file_path):
    """Process a markdown file to ensure proper TOC structure"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        original_content = content
        
        # Check if this is a functions page
        is_functions_page = 'functions.md' in str(file_path) or '/functions/' in str(file_path)
        
        # Split content into frontmatter and body
        parts = content.split('---', 2)
        if len(parts) >= 3:
            frontmatter = parts[1]
            body = parts[2]
            
            # Check if layout is set correctly for functions pages
            if is_functions_page and 'layout: docs' not in frontmatter:
                # Replace layout: default with layout: docs
                frontmatter = re.sub(r'layout:\s*default', 'layout: docs', frontmatter)
                # If no layout specified, add it
                if 'layout:' not in frontmatter:
                    frontmatter = 'layout: docs\n' + frontmatter
            
            # Process headings in the body to ensure proper structure
            body = fix_heading_structure(body, file_path)
            
            # Reconstruct content
            content = f"---{frontmatter}---{body}"
        
        # Only write if content changed
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated: {file_path}")
            return True
        else:
            print(f"No changes needed: {file_path}")
            return False
            
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return False

def fix_heading_structure(body, file_path):
    """Fix heading structure for better TOC display"""
    
    # For function pages, we want to ensure proper heading hierarchy
    if 'functions.md' in str(file_path):
        # Pattern to find function sections (🔹 Function Name)
        function_pattern = r'^##\s*🔹\s*(.+)$'
        
        # Find all function headers and the subsequent heading
        lines = body.split('\n')
        new_lines = []
        i = 0
        
        while i < len(lines):
            line = lines[i]
            
            # Check if this is a function section header
            match = re.match(function_pattern, line)
            if match:
                function_name = match.group(1).strip()
                new_lines.append(line)  # Keep the 🔹 header
                i += 1
                
                # Look for the next line that should be the function title
                while i < len(lines) and lines[i].strip() == '':
                    new_lines.append(lines[i])
                    i += 1
                
                # Check if the next non-empty line is a heading
                if i < len(lines):
                    next_line = lines[i].strip()
                    if next_line.startswith('# ') and function_name.lower() in next_line.lower():
                        # This is the function title, make it an h2
                        title = next_line[2:].strip()  # Remove '# '
                        new_lines.append(f"## {title}")
                        i += 1
                        
                        # Skip the {: .no_toc } lines
                        while i < len(lines) and ('{:' in lines[i] or lines[i].strip() == ''):
                            if '{: .no_toc }' not in lines[i]:  # Keep other Jekyll attributes
                                new_lines.append(lines[i])
                            i += 1
                    else:
                        new_lines.append(lines[i])
                        i += 1
            else:
                new_lines.append(line)
                i += 1
        
        body = '\n'.join(new_lines)
    
    return body

def main():
    """Main function to process all documentation files"""
    
    # Get the directory where this script is located
    script_dir = Path(__file__).parent
    docs_dir = script_dir / 'community_bridge'
    
    if not docs_dir.exists():
        print(f"Documentation directory not found: {docs_dir}")
        return
    
    print("Processing documentation files for TOC structure...")
    
    total_files = 0
    updated_files = 0
    
    # Process all .md files in the community_bridge directory
    for md_file in docs_dir.rglob('*.md'):
        total_files += 1
        if process_markdown_file(md_file):
            updated_files += 1
    
    print(f"\nProcessing complete!")
    print(f"Total files processed: {total_files}")
    print(f"Files updated: {updated_files}")
    
    if updated_files > 0:
        print("\nNext steps:")
        print("1. Test your documentation site locally with 'bundle exec jekyll serve'")
        print("2. Check that the right-side TOC appears on function pages")
        print("3. Verify that headings are properly structured and clickable")

if __name__ == "__main__":
    main()
