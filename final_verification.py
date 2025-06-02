#!/usr/bin/env python3

import os
import glob

def final_verification():
    """Final verification of documentation structure"""
    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')

    print("🔎 Final Documentation Structure Verification")
    print("=" * 50)

    # 1. Check for any orphaned function files
    print("1. Checking for orphaned individual function files...")
    orphaned_files = []

    for root, dirs, files in os.walk(modules_dir):
        for file in files:
            if file.endswith('.md') and 'functions' in root and not file == 'functions.md':
                orphaned_files.append(os.path.join(root, file))

    if orphaned_files:
        print(f"   ❌ Found {len(orphaned_files)} orphaned function files:")
        for file in orphaned_files:
            rel_path = os.path.relpath(file, modules_dir)
            print(f"      {rel_path}")
    else:
        print("   ✅ No orphaned function files found")

    # 2. Check for proper navigation structure
    print("\n2. Verifying navigation structure...")
    issues = []

    modules = [d for d in os.listdir(modules_dir) if os.path.isdir(os.path.join(modules_dir, d))]

    for module in modules:
        module_path = os.path.join(modules_dir, module)

        # Check that each side has only the expected files
        for side in ['client', 'server', 'shared']:
            side_path = os.path.join(module_path, side)
            if os.path.exists(side_path):
                expected_files = ['functions.md']
                if side == 'server' and module in ['framework', 'inventory', 'phone', 'dispatch', 'shops', 'housing']:
                    expected_files.append('events.md')

                actual_files = [f for f in os.listdir(side_path) if f.endswith('.md')]

                unexpected = set(actual_files) - set(expected_files)
                if unexpected:
                    issues.append(f"{module}/{side}: unexpected files {unexpected}")

    if issues:
        print(f"   ❌ Found {len(issues)} navigation issues:")
        for issue in issues:
            print(f"      {issue}")
    else:
        print("   ✅ Navigation structure is correct")

    # 3. Check for has_children consistency
    print("\n3. Checking has_children configuration...")
    config_issues = []

    for module in modules:
        module_path = os.path.join(modules_dir, module)

        # Check main side pages (should have has_children: true)
        for side in ['client', 'server', 'shared']:
            side_file = os.path.join(module_path, f"{side}.md")
            if os.path.exists(side_file):
                with open(side_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                if 'has_children: true' not in content:
                    config_issues.append(f"{module}/{side}.md missing 'has_children: true'")

        # Check functions/events pages (should NOT have has_children)
        for side in ['client', 'server', 'shared']:
            functions_file = os.path.join(module_path, side, 'functions.md')
            if os.path.exists(functions_file):
                with open(functions_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                if 'has_children: true' in content:
                    config_issues.append(f"{module}/{side}/functions.md should NOT have 'has_children: true'")

            events_file = os.path.join(module_path, side, 'events.md')
            if os.path.exists(events_file):
                with open(events_file, 'r', encoding='utf-8') as f:
                    content = f.read()
                if 'has_children: true' in content:
                    config_issues.append(f"{module}/{side}/events.md should NOT have 'has_children: true'")

    if config_issues:
        print(f"   ❌ Found {len(config_issues)} configuration issues:")
        for issue in config_issues:
            print(f"      {issue}")
    else:
        print("   ✅ has_children configuration is correct")

    # 4. Summary
    print(f"\n📊 Summary:")
    print(f"   • Modules checked: {len(modules)}")
    print(f"   • Orphaned files: {len(orphaned_files)}")
    print(f"   • Navigation issues: {len(issues)}")
    print(f"   • Configuration issues: {len(config_issues)}")

    if len(orphaned_files) + len(issues) + len(config_issues) == 0:
        print("\n🎉 All checks passed! Documentation structure is clean.")
        print("\n💡 If you're still seeing issues:")
        print("   1. Clear your browser cache (Ctrl+Shift+R)")
        print("   2. If using Jekyll locally, restart with: jekyll serve --incremental")
        print("   3. If using GitHub Pages, wait 5-10 minutes for cache to clear")
    else:
        print("\n⚠️  Issues found that need to be addressed.")

if __name__ == "__main__":
    final_verification()
