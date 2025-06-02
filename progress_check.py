#!/usr/bin/env python3

import os
import re

def check_reorganization_progress():
    """Check the progress of the reorganization"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')

    print("🔍 Community Bridge Reorganization Progress Report")
    print("=" * 60)

    if not os.path.exists(modules_dir):
        print("❌ Modules directory not found")
        return

    modules = [d for d in os.listdir(modules_dir) if os.path.isdir(os.path.join(modules_dir, d))]

    total_modules = len(modules)
    total_consolidated_files = 0
    total_individual_files = 0
    modules_with_individual_files = 0

    print(f"📊 Found {total_modules} modules")
    print()

    for module in modules:
        module_path = os.path.join(modules_dir, module)
        module_has_individual = False

        for side in ['client', 'server', 'shared']:
            functions_file = os.path.join(module_path, side, 'functions.md')
            functions_dir = os.path.join(module_path, side, 'functions')

            # Check if consolidated file exists
            if os.path.exists(functions_file):
                total_consolidated_files += 1

                # Check if it's been converted to container page
                with open(functions_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                is_container = 'has_children: true' in content
                status = "📦 Container" if is_container else "📄 Consolidated"

            # Check if individual files directory exists
            if os.path.exists(functions_dir):
                individual_files = [f for f in os.listdir(functions_dir) if f.endswith('.md')]
                total_individual_files += len(individual_files)
                if individual_files:
                    module_has_individual = True
                    print(f"   ✅ {module}/{side}: {len(individual_files)} individual function files")

        if module_has_individual:
            modules_with_individual_files += 1

    print()
    print("📈 Summary:")
    print(f"   • Total modules: {total_modules}")
    print(f"   • Modules with individual files: {modules_with_individual_files}")
    print(f"   • Total individual function files created: {total_individual_files}")
    print(f"   • Progress: {(modules_with_individual_files / total_modules * 100):.1f}%")

    print()
    print("🎯 Current Status:")
    if modules_with_individual_files > 0:
        print(f"   ✅ Reorganization has been successfully started!")
        print(f"   📁 Individual function files have been created in:")

        for module in modules:
            module_path = os.path.join(modules_dir, module)
            for side in ['client', 'server', 'shared']:
                functions_dir = os.path.join(module_path, side, 'functions')
                if os.path.exists(functions_dir):
                    individual_files = [f for f in os.listdir(functions_dir) if f.endswith('.md')]
                    if individual_files:
                        print(f"      • community_bridge/modules/{module}/{side}/functions/ ({len(individual_files)} files)")
    else:
        print("   ⏳ Reorganization process ready to start")

    print()
    print("🔗 Navigation Structure:")
    print("   Modules → Module → Side → Functions → Individual Function")
    print("   (5-level Jekyll navigation hierarchy)")

if __name__ == "__main__":
    check_reorganization_progress()
