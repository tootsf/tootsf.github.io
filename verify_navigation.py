#!/usr/bin/env python3

import os
import yaml
import re
from pathlib import Path

def verify_jekyll_navigation():
    """Verify the Jekyll navigation structure is properly configured"""
    base_path = Path(r"c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules")

    print("🔍 Community Bridge Jekyll Navigation Verification")
    print("=" * 60)

    issues = []
    verified_count = 0
    total_functions = 0

    # Check each module
    for module_dir in base_path.iterdir():
        if not module_dir.is_dir():
            continue

        module_name = module_dir.name
        print(f"\n📁 {module_name}/")

        # Check each side (client, server, shared)
        for side in ['client', 'server', 'shared']:
            side_dir = module_dir / side
            if not side_dir.exists():
                continue

            functions_dir = side_dir / 'functions'
            if not functions_dir.exists():
                continue

            # Check container functions.md
            container_file = side_dir / 'functions.md'
            if container_file.exists():
                with open(container_file, 'r', encoding='utf-8') as f:
                    content = f.read()

                # Extract frontmatter
                try:
                    frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', content, re.DOTALL)
                    if frontmatter_match:
                        frontmatter = yaml.safe_load(frontmatter_match.group(1))

                        # Check required frontmatter fields
                        required_fields = ['title', 'parent', 'grand_parent', 'great_grand_parent']
                        missing_fields = [field for field in required_fields if field not in frontmatter]

                        if missing_fields:
                            issues.append(f"❌ {module_name}/{side}/functions.md missing: {', '.join(missing_fields)}")
                        else:
                            # Check if has_children is properly set
                            function_files = list(functions_dir.glob('*.md'))
                            if function_files:
                                if frontmatter.get('has_children') != True:
                                    issues.append(f"⚠️  {module_name}/{side}/functions.md should have 'has_children: true'")
                                else:
                                    print(f"   ✅ {side}/functions.md - Container page OK")
                            else:
                                if frontmatter.get('has_children') != False:
                                    issues.append(f"⚠️  {module_name}/{side}/functions.md should have 'has_children: false' (no functions)")
                                else:
                                    print(f"   ✅ {side}/functions.md - Empty page OK")
                    else:
                        issues.append(f"❌ {module_name}/{side}/functions.md has invalid frontmatter")

                except Exception as e:
                    issues.append(f"❌ {module_name}/{side}/functions.md error reading frontmatter: {e}")

            # Check individual function files
            function_files = list(functions_dir.glob('*.md'))
            if function_files:
                print(f"   📄 {side}/functions/ - {len(function_files)} individual files")
                total_functions += len(function_files)

                # Sample check a few function files
                for func_file in function_files[:2]:  # Check first 2 files
                    with open(func_file, 'r', encoding='utf-8') as f:
                        func_content = f.read()

                    try:
                        func_frontmatter_match = re.match(r'^---\s*\n(.*?)\n---\s*\n', func_content, re.DOTALL)
                        if func_frontmatter_match:
                            func_frontmatter = yaml.safe_load(func_frontmatter_match.group(1))

                            # Check 5-level hierarchy
                            hierarchy_fields = [
                                'title', 'parent', 'grand_parent',
                                'great_grand_parent', 'great_great_grand_parent'
                            ]

                            missing_hierarchy = [field for field in hierarchy_fields if field not in func_frontmatter]
                            if missing_hierarchy:
                                issues.append(f"❌ {func_file.name} missing hierarchy: {', '.join(missing_hierarchy)}")
                            else:
                                verified_count += 1
                    except Exception as e:
                        issues.append(f"❌ {func_file.name} frontmatter error: {e}")

    # Summary
    print(f"\n📊 Verification Summary:")
    print(f"   • Total individual function files: {total_functions}")
    print(f"   • Verified navigation files: {verified_count}")

    if issues:
        print(f"\n⚠️  Issues Found ({len(issues)}):")
        for issue in issues[:10]:  # Show first 10 issues
            print(f"   {issue}")
        if len(issues) > 10:
            print(f"   ... and {len(issues) - 10} more issues")
    else:
        print(f"\n✅ All navigation structures verified!")
        print(f"   🔗 5-level Jekyll hierarchy: Modules → Module → Side → Functions → Individual Function")

    return len(issues) == 0

if __name__ == "__main__":
    success = verify_jekyll_navigation()
    if success:
        print("\n🎉 Jekyll Navigation Verification PASSED!")
    else:
        print("\n⚠️  Jekyll Navigation Verification found issues")
