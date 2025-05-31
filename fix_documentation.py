#!/usr/bin/env python3
"""
Script to fix documentation mismatches by removing functions that don't exist in actual code
"""

import os
import shutil
import sys

# Add current directory to path to import verify_documentation
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
from verify_documentation import main as verify_main

def remove_non_existent_function_files():
    """Remove documentation files for functions that don't exist in actual code"""
    
    # Get the list of issues from verification
    print("🔍 Running verification to get list of issues...")
    issues = verify_main()
    
    docs_base = "c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/community_bridge/modules"
    files_removed = []
    
    print("\n🗑️  REMOVING INCORRECTLY DOCUMENTED FUNCTIONS")
    print("=" * 60)
    
    for issue in issues:
        if "documented but don't exist" in issue:
            # Parse the issue to extract module, side, type, and function names
            parts = issue.split(": ❌ ")
            if len(parts) != 2:
                continue
                
            module_name = parts[0]
            issue_detail = parts[1]
            
            # Extract side (Client/Server) and type (functions/events)
            if "Client functions" in issue_detail:
                side = "client"
                item_type = "functions"
            elif "Server functions" in issue_detail:
                side = "server" 
                item_type = "functions"
            elif "Client events" in issue_detail:
                side = "client"
                item_type = "events"
            elif "Server events" in issue_detail:
                side = "server"
                item_type = "events"
            else:
                continue
            
            # Extract function/event names
            names_part = issue_detail.split(": ")[-1]
            names = [name.strip() for name in names_part.split(", ")]
            
            # Remove the files
            for name in names:
                file_path = os.path.join(docs_base, module_name, side, item_type, f"{name}.md")
                
                if os.path.exists(file_path):
                    try:
                        os.remove(file_path)
                        files_removed.append(file_path)
                        print(f"✅ Removed: {module_name}/{side}/{item_type}/{name}.md")
                    except Exception as e:
                        print(f"❌ Failed to remove {file_path}: {e}")
                else:
                    print(f"⚠️  File not found: {file_path}")
    
    print(f"\n📊 SUMMARY: Removed {len(files_removed)} files")
    
    # Clean up empty directories
    print("\n🧹 CLEANING UP EMPTY DIRECTORIES")
    print("=" * 40)
    
    empty_dirs_removed = []
    
    for module_dir in os.listdir(docs_base):
        module_path = os.path.join(docs_base, module_dir)
        if not os.path.isdir(module_path) or module_dir == "index.md":
            continue
            
        for side in ['client', 'server', 'shared']:
            for item_type in ['functions', 'events']:
                dir_path = os.path.join(module_path, side, item_type)
                
                if os.path.exists(dir_path):
                    # Check if directory is empty
                    if not os.listdir(dir_path):
                        try:
                            os.rmdir(dir_path)
                            empty_dirs_removed.append(dir_path)
                            print(f"✅ Removed empty directory: {module_dir}/{side}/{item_type}/")
                        except Exception as e:
                            print(f"❌ Failed to remove {dir_path}: {e}")
                            
                # Check if side directory is empty after removing item_type directories
                side_path = os.path.join(module_path, side)
                if os.path.exists(side_path) and not os.listdir(side_path):
                    try:
                        os.rmdir(side_path)
                        empty_dirs_removed.append(side_path)
                        print(f"✅ Removed empty directory: {module_dir}/{side}/")
                    except Exception as e:
                        print(f"❌ Failed to remove {side_path}: {e}")
    
    print(f"\n📊 CLEANUP SUMMARY: Removed {len(empty_dirs_removed)} empty directories")
    
    return files_removed, empty_dirs_removed

def main():
    """Main function"""
    print("🛠️  FIXING COMMUNITY BRIDGE DOCUMENTATION")
    print("=" * 60)
    
    # Remove non-existent function files
    files_removed, dirs_removed = remove_non_existent_function_files()
    
    print("\n✅ DOCUMENTATION FIX COMPLETE!")
    print("=" * 40)
    print(f"📁 Files removed: {len(files_removed)}")
    print(f"📂 Empty directories removed: {len(dirs_removed)}")
    
    print("\n🔍 Running verification again to check results...")
    print("=" * 50)
    
    # Run verification again to see if issues were fixed
    remaining_issues = verify_main()
    
    if remaining_issues:
        print(f"\n⚠️  {len(remaining_issues)} issues remain (likely missing documentation)")
    else:
        print("\n🎉 All documentation issues have been resolved!")

if __name__ == "__main__":
    main()
