#!/usr/bin/env python3

import os
import shutil
import subprocess
import sys

def clear_jekyll_cache():
    """Clear Jekyll build cache and artifacts"""
    base_dir = os.path.dirname(os.path.abspath(__file__))

    # Directories and files to remove
    cache_items = [
        '_site',
        '.jekyll-cache',
        '.jekyll-metadata',
        '.sass-cache',
        '__pycache__'
    ]

    print("🧹 Clearing Jekyll cache and build artifacts...")

    for item in cache_items:
        item_path = os.path.join(base_dir, item)
        if os.path.exists(item_path):
            print(f"  Removing {item}...")
            if os.path.isdir(item_path):
                shutil.rmtree(item_path)
            else:
                os.remove(item_path)
        else:
            print(f"  {item} not found (already clean)")

    print("✅ Cache cleared!")

def rebuild_site():
    """Rebuild the Jekyll site"""
    print("🔨 Rebuilding Jekyll site...")

    try:
        # Try bundle exec first
        result = subprocess.run(['bundle', 'exec', 'jekyll', 'build', '--clean'],
                              capture_output=True, text=True)
        if result.returncode != 0:
            print("Bundle exec failed, trying direct jekyll...")
            result = subprocess.run(['jekyll', 'build', '--clean'],
                                  capture_output=True, text=True)

        if result.returncode == 0:
            print("✅ Site rebuilt successfully!")
        else:
            print(f"❌ Build failed: {result.stderr}")

    except FileNotFoundError:
        print("⚠️  Jekyll not found. Install with: gem install jekyll bundler")

def verify_structure():
    """Verify no orphaned function files exist"""
    print("🔍 Verifying documentation structure...")

    base_dir = os.path.dirname(os.path.abspath(__file__))
    modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')

    orphaned_files = []

    for root, dirs, files in os.walk(modules_dir):
        # Skip the main functions.md files we want to keep
        if root.endswith(('client', 'server', 'shared')):
            continue

        # Look for any function files in subdirectories
        if 'functions' in root:
            for file in files:
                if file.endswith('.md'):
                    orphaned_files.append(os.path.join(root, file))

    if orphaned_files:
        print("⚠️  Found potential orphaned function files:")
        for file in orphaned_files:
            print(f"    {file}")

        response = input("Remove these files? (y/N): ")
        if response.lower() == 'y':
            for file in orphaned_files:
                os.remove(file)
                print(f"  Removed {file}")
            print("✅ Orphaned files removed!")
    else:
        print("✅ No orphaned function files found!")

if __name__ == "__main__":
    print("🚀 Community Bridge Documentation Cache Cleaner")
    print("=" * 50)

    clear_jekyll_cache()
    print()
    verify_structure()
    print()

    if len(sys.argv) > 1 and sys.argv[1] == '--rebuild':
        rebuild_site()
    else:
        print("💡 Run with --rebuild to also rebuild the Jekyll site")

    print("\n🎉 Done! Try refreshing your browser and clearing browser cache.")
