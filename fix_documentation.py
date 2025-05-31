#!/usr/bin/env python3
"""
Comprehensive Documentation Fix Script
This script will:
1. Update syntax format from current to Bridge.Module.Functionname
2. Add missing functions to appropriate modules  
3. Fix function organization based on actual codebase
"""

import os
import re
import glob
from audit_modules import audit_modules_and_functions, extract_functions_from_lua

def fix_syntax_format():
    """Update all function syntax to Bridge.Module.Functionname format"""
    print("🔧 Fixing syntax format in all documentation files...")
    
    docs_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
    
    # Find all function documentation files
    for root, dirs, files in os.walk(docs_path):
        for file in files:
            if file == "functions.md":
                file_path = os.path.join(root, file)
                fix_file_syntax(file_path)

def fix_file_syntax(file_path):
    """Fix syntax format in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Extract module name from path
        # Path format: .../modules/modulename/client/functions.md
        path_parts = file_path.replace('\\', '/').split('/')
        module_idx = path_parts.index('modules')
        module_name = path_parts[module_idx + 1]
        
        # Capitalize module name properly
        module_name = module_name.title()
        
        print(f"  📝 Fixing syntax in {module_name} functions...")
        
        # Pattern to match current function syntax examples
        # Look for patterns like: function Module.FunctionName or Module.FunctionName
        patterns_to_fix = [
            # Pattern: function Module.FunctionName
            (rf'function\s+{module_name}\.(\w+)', rf'Bridge.{module_name}.\1'),
            # Pattern: Module.FunctionName (standalone)
            (rf'(?<!Bridge\.){module_name}\.(\w+)', rf'Bridge.{module_name}.\1'),
            # Pattern: exports['community_bridge']:Bridge().Module.Function
            (rf"exports\['community_bridge'\]:Bridge\(\)\.{module_name}\.(\w+)", rf'Bridge.{module_name}.\1'),
        ]
        
        original_content = content
        for pattern, replacement in patterns_to_fix:
            content = re.sub(pattern, replacement, content)
        
        # Only write if changes were made
        if content != original_content:
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"    ✅ Updated {file_path}")
        else:
            print(f"    ℹ️  No changes needed in {file_path}")
            
    except Exception as e:
        print(f"    ❌ Error fixing {file_path}: {e}")

def add_missing_functions():
    """Add missing functions to documentation based on audit results"""
    print("\n📝 Adding missing functions to documentation...")
    
    # Get audit results
    audit_results, actual_modules, documented_modules = audit_modules_and_functions()
    
    # Map of functions that need to be added
    missing_functions = {
        'accessibility': {
            'client': ['adjustColourForColourblindness', 'getAdjustedColour', 'hexToRgb', 'hslToRgb', 'hue2rgb', 'rgbToHex', 'rgbToHsl', 'updatecolourblindness']
        },
        'clothing': {
            'client': ['RestoreAppearance', 'ToggleDebugging', 'UpdateAppearanceBackup'],
            'server': ['RestoreAppearance', 'SetAppearance']
        },
        'doorlock': {
            'client': ['GetClosestDoor'],
            'server': ['ToggleDoorLock']
        },
        'fuel': {
            'client': ['GetFuel', 'GetResourceName', 'SetFuel']
        },
        'helptext': {
            'client': ['HideHelpText', 'ShowHelpText'],
            'server': ['HideHelpText', 'ShowHelpText']
        },
        'managment': {
            'server': ['AddAccountMoney', 'GetAccountMoney', 'RemoveAccountMoney']
        },
        'notify': {
            'client': ['GetResourceName', 'HideHelpText', 'SendNotify', 'ShowHelpText'],
            'server': ['HideHelpText', 'SendNotify', 'ShowHelpText']
        },
        'phone': {
            'client': ['SendEmail'],
            'server': ['GetPlayerPhone', 'SendEmail']
        },
        'shops': {
            'client': ['AmountSelect', 'FinalizeCheckOut', 'OpenShop'],
            'server': ['CompleteCheckout', 'CreateShop', 'OpenShop']
        },
        'skills': {
            'client': ['GetResourceName', 'GetSkillLevel', 'warnUser'],
            'server': ['AddXp', 'GetResourceName', 'GetSkillLevel', 'RemoveXp', 'warnUser']
        },
        'target': {
            'client': ['AddBoxZone', 'AddGlobalPlayer', 'AddGlobalVehicle', 'AddLocalEntity', 'AddModel', 'FixOptions', 'RemoveGlobalPlayer', 'RemoveGlobalVehicle', 'RemoveLocalEntity', 'RemoveModel', 'RemoveZone', 'warnUser']
        },
        'weather': {
            'client': ['ToggleSync']
        }
    }
    
    docs_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
    
    for module, sides in missing_functions.items():
        for side, functions in sides.items():
            if functions:
                add_functions_to_module(docs_path, module, side, functions)

def add_functions_to_module(docs_path, module, side, functions):
    """Add missing functions to a specific module/side"""
    functions_file = os.path.join(docs_path, module, side, "functions.md")
    
    if not os.path.exists(functions_file):
        print(f"    ⚠️  Functions file not found: {functions_file}")
        return
    
    print(f"  📝 Adding {len(functions)} {side} functions to {module}...")
    
    try:
        with open(functions_file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Check if functions already exist
        existing_functions = []
        for func in functions:
            if f"# {func}" in content or f"## {func}" in content:
                existing_functions.append(func)
        
        new_functions = [f for f in functions if f not in existing_functions]
        
        if not new_functions:
            print(f"    ℹ️  All functions already documented in {module} {side}")
            return
        
        # Add new functions to the end of the file
        module_title = module.title()
        
        for func in new_functions:
            function_template = f"""

---

## 🔹 {func}

# {func}
{{: .no_toc }}
{{: .d-inline-block }}
{side.title()}
{{: .label .label-{'blue' if side == 'client' else 'green' if side == 'server' else 'purple'} }}

[Description needed - function found in actual codebase but not documented]

## Syntax

```lua
Bridge.{module_title}.{func}()
```

## Parameters

[Parameters to be documented]

## Returns

[Return value to be documented]

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Example usage:
Bridge.{module_title}.{func}()
```

## Notes

- This function was automatically added based on codebase analysis
- Full documentation pending review
"""
            content += function_template
        
        with open(functions_file, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"    ✅ Added {len(new_functions)} new functions to {module} {side}")
        
    except Exception as e:
        print(f"    ❌ Error adding functions to {module} {side}: {e}")

def fix_duplicate_headings():
    """Remove any remaining duplicate headings"""
    print("\n🧹 Fixing duplicate headings...")
    
    docs_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
    
    for root, dirs, files in os.walk(docs_path):
        for file in files:
            if file == "functions.md":
                file_path = os.path.join(root, file)
                fix_duplicates_in_file(file_path)

def fix_duplicates_in_file(file_path):
    """Fix duplicate headings in a single file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        # Track headings we've seen
        seen_headings = set()
        new_lines = []
        skip_next_lines = 0
        
        for i, line in enumerate(lines):
            if skip_next_lines > 0:
                skip_next_lines -= 1
                continue
                
            # Check for duplicate main headings
            if line.startswith('# ') and line.strip().endswith('Functions'):
                heading = line.strip()
                if heading in seen_headings:
                    # Skip this duplicate heading and the next few lines
                    skip_next_lines = 2  # Skip the {: .no_toc } and description
                    continue
                else:
                    seen_headings.add(heading)
            
            new_lines.append(line)
        
        # Write back if changes were made
        if len(new_lines) != len(lines):
            with open(file_path, 'w', encoding='utf-8') as f:
                f.writelines(new_lines)
            print(f"    ✅ Fixed duplicates in {file_path}")
        else:
            print(f"    ℹ️  No duplicates found in {file_path}")
            
    except Exception as e:
        print(f"    ❌ Error fixing duplicates in {file_path}: {e}")

def main():
    """Main execution function"""
    print("🚀 Starting comprehensive documentation fix...\n")
    
    # Step 1: Fix syntax format
    fix_syntax_format()
    
    # Step 2: Add missing functions
    add_missing_functions()
    
    # Step 3: Fix duplicate headings
    fix_duplicate_headings()
    
    print(f"\n✅ Documentation fix complete!")
    print("\nSummary of changes:")
    print("  🔧 Updated syntax format to Bridge.Module.Functionname")
    print("  📝 Added missing functions from actual codebase")
    print("  🧹 Cleaned up duplicate headings")
    print("\nNext steps:")
    print("  1. Review auto-generated function documentation")
    print("  2. Add proper descriptions, parameters, and examples")
    print("  3. Test the TOC functionality")

if __name__ == "__main__":
    main()
