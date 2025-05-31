#!/usr/bin/env python3
"""
Script to create documentation for functions that exist in actual code but aren't documented
"""

import os
import re
from pathlib import Path

def extract_function_details_from_lua(file_path):
    """Extract detailed function information from Lua file including comments and parameters"""
    functions = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split content into lines for better parsing
        lines = content.split('\n')
        
        i = 0
        while i < len(lines):
            line = lines[i].strip()
            
            # Look for function definitions with preceding comments
            if line.startswith('function ') or ' = function(' in line:
                # Collect preceding comments (documentation)
                comments = []
                j = i - 1
                while j >= 0 and (lines[j].strip().startswith('---') or lines[j].strip().startswith('--')):
                    comments.insert(0, lines[j].strip())
                    j -= 1
                  # Extract function name and parameters
                func_match = re.search(r'function\s+(\w+)\.(\w+)\s*\((.*?)\)', line)
                if not func_match:
                    func_match = re.search(r'(\w+)\.(\w+)\s*=\s*function\s*\((.*?)\)', line)
                
                if func_match:
                    module_name_match = func_match.group(1)
                    func_name = func_match.group(2) 
                    params = func_match.group(3)
                else:
                    # Try simpler function pattern
                    func_match = re.search(r'function\s+(\w+)\s*\((.*?)\)', line)
                    if func_match:
                        func_name = func_match.group(1)
                        params = func_match.group(2)
                    else:
                        continue
                    
                    # Parse comments for description, params, and return info
                    description = ""
                    param_docs = []
                    return_doc = ""
                    
                    for comment in comments:
                        comment = comment.replace('---', '').replace('--', '').strip()
                        if comment.startswith('@param'):
                            param_docs.append(comment[6:].strip())
                        elif comment.startswith('@return'):
                            return_doc = comment[7:].strip()
                        elif comment and not comment.startswith('@'):
                            if description:
                                description += " " + comment
                            else:
                                description = comment
                    
                    functions.append({
                        'name': func_name,
                        'params': params,
                        'description': description or f"Function {func_name}",
                        'param_docs': param_docs,
                        'return_doc': return_doc,
                        'line': i + 1
                    })
            
            i += 1
    
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    return functions

def create_function_documentation(module_name, side, func_info, docs_base):
    """Create a markdown file for a function"""
    
    # Create the directory structure
    func_dir = os.path.join(docs_base, module_name, side, 'functions')
    os.makedirs(func_dir, exist_ok=True)
    
    # Create the markdown file
    file_path = os.path.join(func_dir, f"{func_info['name']}.md")
    
    # Generate markdown content
    content = f"""---
title: {func_info['name']}
parent: Functions
grand_parent: {module_name.title()}
nav_order: 1
---

# {func_info['name']}

{func_info['description']}

## Syntax

```lua
{func_info['name']}({func_info['params']})
```

"""
    
    if func_info['param_docs']:
        content += "## Parameters\n\n"
        for param in func_info['param_docs']:
            content += f"- `{param}`\n"
        content += "\n"
    
    if func_info['return_doc']:
        content += f"## Returns\n\n{func_info['return_doc']}\n\n"
    
    content += """## Example

```lua
-- Example usage will be added
```

"""
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return file_path

def scan_and_document_missing_functions():
    """Scan modules and create documentation for functions that exist but aren't documented"""
    
    actual_modules_dir = "c:/Devons_Stuff/Servers/FiveM/COMMISION/[symlink]/community_bridge/modules"
    docs_base = "c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/community_bridge/modules"
    
    print("🔍 SCANNING FOR UNDOCUMENTED FUNCTIONS")
    print("=" * 60)
    print(f"📁 Source directory: {actual_modules_dir}")
    print(f"📁 Documentation directory: {docs_base}")
    
    created_files = []
    
    # Check if directories exist
    if not os.path.exists(actual_modules_dir):
        print(f"❌ Source directory does not exist: {actual_modules_dir}")
        return created_files
    
    if not os.path.exists(docs_base):
        print(f"❌ Documentation directory does not exist: {docs_base}")
        return created_files
    
    # Scan each module
    for module_name in os.listdir(actual_modules_dir):
        module_path = os.path.join(actual_modules_dir, module_name)
        if not os.path.isdir(module_path):
            continue
            
        print(f"\n📁 Processing module: {module_name}")
        
        # Find all Lua files in the module
        for root, dirs, files in os.walk(module_path):
            for file in files:
                if not file.endswith('.lua'):
                    continue
                    
                file_path = os.path.join(root, file)
                rel_path = os.path.relpath(file_path, module_path)
                
                # Determine side (client/server/shared)
                if 'client' in rel_path.lower() or file.lower().endswith('_client.lua'):
                    side = 'client'
                elif 'server' in rel_path.lower() or file.lower().endswith('_server.lua'):
                    side = 'server'
                else:
                    side = 'shared'
                
                # Extract functions
                functions = extract_function_details_from_lua(file_path)
                
                for func_info in functions:
                    # Check if documentation already exists
                    doc_file = os.path.join(docs_base, module_name, side, 'functions', f"{func_info['name']}.md")
                    
                    if not os.path.exists(doc_file):
                        created_file = create_function_documentation(module_name, side, func_info, docs_base)
                        created_files.append(created_file)
                        print(f"  ✅ Created: {side}/{func_info['name']}.md")
                    else:
                        print(f"  ✓ Exists: {side}/{func_info['name']}.md")
    
    print(f"\n📊 SUMMARY: Created {len(created_files)} new function documentation files")
    
    return created_files

def main():
    """Main function"""
    print("📝 CREATING MISSING FUNCTION DOCUMENTATION")
    print("=" * 60)
    
    created_files = scan_and_document_missing_functions()
    
    print("\n✅ DOCUMENTATION CREATION COMPLETE!")
    print("=" * 40)
    print(f"📁 New files created: {len(created_files)}")
    
    if created_files:
        print("\nFiles created:")
        for file_path in created_files[:10]:  # Show first 10
            rel_path = os.path.relpath(file_path, "c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/community_bridge/modules")
            print(f"  - {rel_path}")
        if len(created_files) > 10:
            print(f"  ... and {len(created_files) - 10} more")

if __name__ == "__main__":
    main()
