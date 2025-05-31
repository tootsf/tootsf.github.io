#!/usr/bin/env python3
"""
Script to verify that documentation matches actual Community Bridge modules
"""

import os
import re
import glob
from pathlib import Path

def extract_functions_from_lua_file(file_path):
    """Extract function names from a Lua file"""
    functions = []
    events = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Look for function definitions - various patterns
        function_patterns = [
            r'function\s+(\w+)\.(\w+)\s*\(',  # ModuleName.FunctionName
            r'(\w+)\.(\w+)\s*=\s*function\s*\(',  # ModuleName.FunctionName = function
            r'function\s+(\w+)\s*\(',        # FunctionName
            r'(\w+)\s*=\s*function\s*\(',    # FunctionName = function
        ]
        
        for pattern in function_patterns:
            matches = re.findall(pattern, content, re.MULTILINE)
            for match in matches:
                if isinstance(match, tuple):
                    if len(match) == 2 and match[0] and match[1]:  # ModuleName.FunctionName
                        functions.append(f"{match[1]}")  # Just the function name
                    elif len(match) == 1:  # Single function name
                        functions.append(match[0])
                else:
                    functions.append(match)
        
        # Look for event registrations and triggers
        event_patterns = [
            r'RegisterNetEvent\(["\']([^"\']+)["\']\)',
            r'TriggerEvent\(["\']([^"\']+)["\']\)',
            r'TriggerServerEvent\(["\']([^"\']+)["\']\)',
            r'TriggerClientEvent\(["\']([^"\']+)["\']\)',
            r'AddEventHandler\(["\']([^"\']+)["\']\)',
        ]
        
        for pattern in event_patterns:
            matches = re.findall(pattern, content, re.MULTILINE)
            events.extend(matches)
        
        # Remove duplicates and filter out common non-functions
        common_non_functions = ['return', 'end', 'if', 'then', 'else', 'for', 'while', 'do', 'local', 'function']
        functions = [f for f in set(functions) if f and f not in common_non_functions and len(f) > 1]
        events = list(set(events))
        
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    return sorted(functions), sorted(events)

def scan_module_directory(module_path):
    """Scan all Lua files in a module directory"""
    module_name = os.path.basename(module_path)
    module_functions = {'client': [], 'server': [], 'shared': []}
    module_events = {'client': [], 'server': [], 'shared': []}
    
    # Scan all Lua files in the module
    lua_files = glob.glob(os.path.join(module_path, "**", "*.lua"), recursive=True)
    
    for lua_file in lua_files:
        rel_path = os.path.relpath(lua_file, module_path)
        
        # Determine if it's client, server, or shared based on path or filename
        if 'client' in rel_path.lower() or rel_path.lower().endswith('_client.lua'):
            side = 'client'
        elif 'server' in rel_path.lower() or rel_path.lower().endswith('_server.lua'):
            side = 'server'
        else:
            side = 'shared'  # Default to shared if unclear
        
        functions, events = extract_functions_from_lua_file(lua_file)
        module_functions[side].extend(functions)
        module_events[side].extend(events)
    
    # Remove duplicates
    for side in ['client', 'server', 'shared']:
        module_functions[side] = list(set(module_functions[side]))
        module_events[side] = list(set(module_events[side]))
    
    return module_functions, module_events

def get_documented_functions_events():
    """Get all documented functions and events from the documentation"""
    documented = {}
    docs_base = "c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/community_bridge/modules"
    
    # Get all module directories in docs
    if os.path.exists(docs_base):
        for module_dir in os.listdir(docs_base):
            module_path = os.path.join(docs_base, module_dir)
            if os.path.isdir(module_path):
                documented[module_dir] = {'functions': {'client': [], 'server': [], 'shared': []},
                                        'events': {'client': [], 'server': [], 'shared': []}}
                
                # Check for individual function/event files
                for side in ['client', 'server', 'shared']:
                    # Functions
                    func_dir = os.path.join(module_path, side, 'functions')
                    if os.path.exists(func_dir):
                        for func_file in os.listdir(func_dir):
                            if func_file.endswith('.md'):
                                func_name = func_file[:-3]  # Remove .md
                                documented[module_dir]['functions'][side].append(func_name)
                    
                    # Events
                    event_dir = os.path.join(module_path, side, 'events')
                    if os.path.exists(event_dir):
                        for event_file in os.listdir(event_dir):
                            if event_file.endswith('.md'):
                                event_name = event_file[:-3]  # Remove .md
                                documented[module_dir]['events'][side].append(event_name)
    
    return documented

def main():
    """Main function to compare actual vs documented functions/events"""
    actual_modules_dir = "c:/Devons_Stuff/Servers/FiveM/COMMISION/[symlink]/community_bridge/modules"
    
    print("🔍 VERIFYING COMMUNITY BRIDGE DOCUMENTATION")
    print("=" * 60)
    print(f"📁 Actual modules directory: {actual_modules_dir}")
    print(f"📁 Documentation directory: c:/Devons_Stuff/Fivem/business stuff/documentation-site/tootsf.github.io/community_bridge/modules")
    
    # Get documented functions/events
    print("📚 Getting documented functions/events...")
    documented = get_documented_functions_events()
    print(f"Found {len(documented)} documented modules")
    
    # Scan actual modules
    actual_modules = {}
    if os.path.exists(actual_modules_dir):
        module_list = [d for d in os.listdir(actual_modules_dir) if os.path.isdir(os.path.join(actual_modules_dir, d))]
        print(f"📁 Found {len(module_list)} actual modules")
        
        for module_name in module_list:
            module_path = os.path.join(actual_modules_dir, module_name)
            print(f"\n🔍 Scanning module: {module_name}")
            functions, events = scan_module_directory(module_path)
            actual_modules[module_name] = {'functions': functions, 'events': events}
            
            # Print what was found
            for side in ['client', 'server', 'shared']:
                if functions[side]:
                    print(f"  {side.title()} Functions: {', '.join(functions[side][:5])}{'...' if len(functions[side]) > 5 else ''} ({len(functions[side])} total)")
                if events[side]:
                    print(f"  {side.title()} Events: {', '.join(events[side][:3])}{'...' if len(events[side]) > 3 else ''} ({len(events[side])} total)")
    else:
        print(f"❌ Directory {actual_modules_dir} does not exist!")
        return
    
    print("\n" + "=" * 60)
    print("📊 DOCUMENTATION MISMATCH ANALYSIS")
    print("=" * 60)
    
    # Create case-insensitive mapping of documented modules
    documented_lower = {k.lower(): k for k in documented.keys()}
    
    all_issues = []
    
    for module_name, actual_data in actual_modules.items():
        # Check if module exists in documentation (case-insensitive)
        module_name_lower = module_name.lower()
        if module_name_lower not in documented_lower:
            print(f"\n❌ Module '{module_name}' not found in documentation!")
            continue
        
        # Get the actual documented module name with correct case
        actual_doc_name = documented_lower[module_name_lower]
        doc_data = documented[actual_doc_name]
        
        module_issues = []
        
        # Compare functions and events
        for side in ['client', 'server', 'shared']:
            actual_funcs = set(actual_data['functions'][side])
            documented_funcs = set(doc_data['functions'][side])
            
            # Functions that exist in docs but not in actual code
            extra_in_docs = documented_funcs - actual_funcs
            # Functions that exist in actual code but not in docs
            missing_from_docs = actual_funcs - documented_funcs
            
            if extra_in_docs:
                issue = f"❌ {side.title()} functions documented but don't exist: {', '.join(sorted(extra_in_docs))}"
                module_issues.append(issue)
                all_issues.append(f"{module_name}: {issue}")
            
            if missing_from_docs:
                issue = f"⚠️  {side.title()} functions exist but not documented: {', '.join(sorted(missing_from_docs))}"
                module_issues.append(issue)
                all_issues.append(f"{module_name}: {issue}")
            
            # Check events
            actual_events = set(actual_data['events'][side])
            documented_events = set(doc_data['events'][side])
            
            extra_events_in_docs = documented_events - actual_events
            missing_events_from_docs = actual_events - documented_events
            
            if extra_events_in_docs:
                issue = f"❌ {side.title()} events documented but don't exist: {', '.join(sorted(extra_events_in_docs))}"
                module_issues.append(issue)
                all_issues.append(f"{module_name}: {issue}")
            
            if missing_events_from_docs:
                issue = f"⚠️  {side.title()} events exist but not documented: {', '.join(sorted(missing_events_from_docs))}"
                module_issues.append(issue)
                all_issues.append(f"{module_name}: {issue}")
        
        if module_issues:
            print(f"\n🔴 Module: {module_name}")
            for issue in module_issues:
                print(f"  {issue}")
        else:
            print(f"\n✅ Module: {module_name} - Documentation matches code")
    
    print("\n" + "=" * 60)
    print("📋 SUMMARY")
    print("=" * 60)
    
    if all_issues:
        print(f"Found {len(all_issues)} documentation issues that need fixing:")
        print("\nMost critical (functions documented but don't exist):")
        for issue in all_issues:
            if "documented but don't exist" in issue:
                print(f"  {issue}")
        
        print("\nMissing documentation:")
        for issue in all_issues:
            if "exist but not documented" in issue:
                print(f"  {issue}")
    else:
        print("✅ All documentation matches the actual codebase!")
    
    return all_issues

if __name__ == "__main__":
    issues = main()
