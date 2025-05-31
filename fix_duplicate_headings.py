import os
import re

def fix_duplicate_headings():
    """Fix duplicate headings in function.md files"""
    
    # Find all function.md files
    root_dir = "."
    fixed_files = []
    
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file == "functions.md":
                file_path = os.path.join(root, file)
                
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Pattern to match duplicate headings
                    pattern = r'(# .* Functions\n{: \.no_toc }\n\n.*?\n\n)# .* Functions\n{: \.no_toc }\n\n.*?\n\n---'
                    
                    # Replace with single heading
                    new_content = re.sub(
                        pattern,
                        r'\1---',
                        content,
                        flags=re.DOTALL
                    )
                    
                    # Only write if content changed
                    if new_content != content:
                        with open(file_path, 'w', encoding='utf-8') as f:
                            f.write(new_content)
                        
                        fixed_files.append(file_path)
                        print(f"Fixed: {file_path}")
                
                except Exception as e:
                    print(f"Error processing {file_path}: {e}")
    
    print(f"\nFixed {len(fixed_files)} files:")
    for file in fixed_files:
        print(f"  - {file}")

if __name__ == "__main__":
    fix_duplicate_headings()
