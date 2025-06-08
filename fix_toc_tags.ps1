# PowerShell script to remove {: .no_toc } tags from individual function headings

# Get all functions.md files
$functionsFiles = Get-ChildItem -Path "." -Recurse -Filter "functions.md"

Write-Host "Found $($functionsFiles.Count) functions.md files"

foreach ($file in $functionsFiles) {
    $relativePath = $file.FullName.Replace((Get-Location).Path, "").TrimStart('\')
    Write-Host "Processing: $relativePath"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check if file has function headings with {: .no_toc } tags
    if ($content -match '###\s*\[.*?\].*?\r?\n\{:\s*\.no_toc\s*\}') {
        # Remove {: .no_toc } from individual function headings (### [FunctionName])
        # Pattern: ### [FunctionName](Link) followed by newline and {: .no_toc }
        $newContent = $content -replace '(###\s*\[.*?\].*?)\r?\n\{:\s*\.no_toc\s*\}', '$1'
        
        # Count how many were removed
        $matches = [regex]::Matches($content, '###\s*\[.*?\].*?\r?\n\{:\s*\.no_toc\s*\}')
        $count = $matches.Count
        
        # Write the updated content back to the file
        $newContent | Set-Content -Path $file.FullName -Encoding UTF8
        Write-Host "  - Removed {: .no_toc } from $count function headings"
    } else {
        Write-Host "  - No function headings with {: .no_toc } found"
    }
}

Write-Host "🎉 Completed fixing TOC tags for all function headings!"
