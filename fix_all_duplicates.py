import os
import glob

def fix_all_duplicate_headings():
    """Fix duplicate headings in all function.md files"""
    
    # Find all function.md files
    pattern = "**/functions.md"
    files = glob.glob(pattern, recursive=True)
    
    fixed_count = 0
    
    for file_path in files:
        try:
            print(f"Processing: {file_path}")
            
            with open(file_path, 'r', encoding='utf-8') as f:
                lines = f.readlines()
            
            # Find and remove duplicate heading blocks
            new_lines = []
            i = 0
            while i < len(lines):
                line = lines[i]
                
                # Check if this is a heading line that matches pattern
                if line.startswith('# ') and 'Functions' in line:
                    # Check if next few lines match the duplicate pattern
                    if (i + 6 < len(lines) and 
                        lines[i + 1].strip() == '{: .no_toc }' and
                        lines[i + 2].strip() == '' and
                        lines[i + 5].strip() == '' and
                        lines[i + 6].startswith('# ') and 
                        'Functions' in lines[i + 6]):
                        
                        # This is a duplicate, skip the second occurrence
                        new_lines.append(line)  # First heading
                        new_lines.append(lines[i + 1])  # {: .no_toc }
                        new_lines.append(lines[i + 2])  # blank line
                        new_lines.append(lines[i + 3])  # description
                        new_lines.append(lines[i + 4])  # blank line
                        new_lines.append('\n---\n')  # separator
                        
                        # Skip to after the duplicate block
                        j = i + 6
                        while j < len(lines) and not lines[j].strip() == '---':
                            j += 1
                        i = j  # Continue from after the duplicate
                        
                        print(f"  Fixed duplicate heading in {file_path}")
                        fixed_count += 1
                    else:
                        new_lines.append(line)
                        i += 1
                else:
                    new_lines.append(line)
                    i += 1
            
            # Write back if changed
            if len(new_lines) != len(lines):
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.writelines(new_lines)
                print(f"  Updated {file_path}")
        
        except Exception as e:
            print(f"Error processing {file_path}: {e}")
    
    print(f"\nFixed {fixed_count} files with duplicate headings")

if __name__ == "__main__":
    fix_all_duplicate_headings()
