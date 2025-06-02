#!/usr/bin/env python3

import os
import sys

print("🐛 Debug Script Starting...")
print(f"Python version: {sys.version}")
print(f"Current working directory: {os.getcwd()}")

base_dir = os.path.dirname(os.path.abspath(__file__))
print(f"Base directory: {base_dir}")

modules_dir = os.path.join(base_dir, 'community_bridge', 'modules')
print(f"Modules directory: {modules_dir}")
print(f"Modules directory exists: {os.path.exists(modules_dir)}")

if os.path.exists(modules_dir):
    modules = [d for d in os.listdir(modules_dir) if os.path.isdir(os.path.join(modules_dir, d))]
    print(f"Found {len(modules)} modules: {modules[:5]}...")

    # Test one module
    test_module = 'framework'
    test_path = os.path.join(modules_dir, test_module, 'client', 'functions.md')
    print(f"Test file: {test_path}")
    print(f"Test file exists: {os.path.exists(test_path)}")

    if os.path.exists(test_path):
        with open(test_path, 'r', encoding='utf-8') as f:
            content = f.read()
        print(f"Test file content length: {len(content)}")
        print(f"First 200 characters: {content[:200]}")

print("🐛 Debug Script Complete")
