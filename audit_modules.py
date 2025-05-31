import os
import glob
import re

def audit_modules_and_functions():
    """Audit all modules and their functions to ensure they match the actual codebase"""
    
    # Path to actual community_bridge modules
    actual_modules_path = r"c:\Devons_Stuff\Servers\FiveM\COMMISION\[symlink]\community_bridge\modules"
    # Path to documentation modules
    docs_modules_path = r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"
    
    print("=== COMMUNITY BRIDGE MODULE AUDIT ===\n")
    
    # Get actual modules from codebase
    actual_modules = []
    if os.path.exists(actual_modules_path):
        actual_modules = [d for d in os.listdir(actual_modules_path) 
                         if os.path.isdir(os.path.join(actual_modules_path, d))]
    
    print(f"Actual modules in codebase: {len(actual_modules)}")
    for module in sorted(actual_modules):
        print(f"  ✓ {module}")
    
    # Get documented modules
    documented_modules = []
    if os.path.exists(docs_modules_path):
        documented_modules = [d for d in os.listdir(docs_modules_path) 
                             if os.path.isdir(os.path.join(docs_modules_path, d))]
    
    print(f"\nDocumented modules: {len(documented_modules)}")
    for module in sorted(documented_modules):
        print(f"  📖 {module}")
    
    # Find missing documentation
    missing_docs = set(actual_modules) - set(documented_modules)
    if missing_docs:
        print(f"\n❌ Modules missing documentation: {len(missing_docs)}")
        for module in sorted(missing_docs):
            print(f"  - {module}")
    
    # Find extra documentation
    extra_docs = set(documented_modules) - set(actual_modules)
    if extra_docs:
        print(f"\n⚠️  Documented modules not in codebase: {len(extra_docs)}")
        for module in sorted(extra_docs):
            print(f"  - {module}")
    
    print("\n" + "="*50)
    
    # Now audit functions in each module
    function_audit = {}
    
    for module in actual_modules:
        print(f"\n🔍 Auditing module: {module}")
        module_path = os.path.join(actual_modules_path, module)
        
        # Look for _default directory or direct files
        default_path = os.path.join(module_path, "_default")
        if os.path.exists(default_path):
            audit_path = default_path
        else:
            audit_path = module_path
        
        # Find lua files
        client_functions = []
        server_functions = []
        shared_functions = []
        
        # Check client.lua
        client_file = os.path.join(audit_path, "client.lua")
        if os.path.exists(client_file):
            client_functions = extract_functions_from_lua(client_file, module)
        
        # Check server.lua  
        server_file = os.path.join(audit_path, "server.lua")
        if os.path.exists(server_file):
            server_functions = extract_functions_from_lua(server_file, module)
        
        # Check shared.lua
        shared_file = os.path.join(audit_path, "shared.lua")
        if os.path.exists(shared_file):
            shared_functions = extract_functions_from_lua(shared_file, module)
        
        function_audit[module] = {
            'client': client_functions,
            'server': server_functions, 
            'shared': shared_functions
        }
        
        print(f"  Client: {len(client_functions)} functions")
        print(f"  Server: {len(server_functions)} functions")
        print(f"  Shared: {len(shared_functions)} functions")
    
    return function_audit, actual_modules, documented_modules

def extract_functions_from_lua(file_path, module_name):
    """Extract function definitions from a Lua file"""
    functions = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Look for function patterns like ModuleName.FunctionName = function(...)
        pattern = rf'{module_name}\.(\w+)\s*=\s*function'
        matches = re.findall(pattern, content, re.IGNORECASE)
        
        # Also look for local function patterns
        local_pattern = r'local\s+function\s+(\w+)'
        local_matches = re.findall(local_pattern, content, re.IGNORECASE)
        
        # Combine and clean up
        all_matches = matches + local_matches
        functions = list(set(all_matches))  # Remove duplicates
        
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    return functions

if __name__ == "__main__":
    audit_results, actual_modules, documented_modules = audit_modules_and_functions()
    
    print("\n" + "="*50)
    print("DETAILED FUNCTION AUDIT")
    print("="*50)
    
    for module, functions in audit_results.items():
        if any(functions.values()):  # Only show modules with functions
            print(f"\n📦 {module.upper()}")
            
            if functions['client']:
                print("  Client functions:")
                for func in sorted(functions['client']):
                    print(f"    - Bridge.{module.title()}.{func}")
            
            if functions['server']:
                print("  Server functions:")
                for func in sorted(functions['server']):
                    print(f"    - Bridge.{module.title()}.{func}")
            
            if functions['shared']:
                print("  Shared functions:")
                for func in sorted(functions['shared']):
                    print(f"    - Bridge.{module.title()}.{func}")
