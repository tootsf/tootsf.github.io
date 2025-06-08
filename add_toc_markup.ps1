# PowerShell script to add TOC markup to all functions.md files

# Get all functions.md files
$functionsFiles = Get-ChildItem -Path "." -Recurse -Filter "functions.md"

Write-Host "Found $($functionsFiles.Count) functions.md files"

foreach ($file in $functionsFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read the file content
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Check if the file already has TOC markup
    if ($content -match '\{\:toc\}') {
        Write-Host "  - Already has TOC markup, skipping"
        continue
    }
    
    # Check if file has any function headings (### [FunctionName])
    if ($content -notmatch '###\s*\[.*?\]') {
        Write-Host "  - No function headings found, skipping"
        continue
    }
    
    # Simple pattern matching to add TOC after the main heading
    if ($content -match '(# .+?)\r?\n([^\r\n]*?)\r?\n\r?\n(## Functions)') {
        # Add {: .no_toc } to the main heading
        $newContent = $content -replace '(# .+?)\r?\n', "`$1`n{: .no_toc }`n`n"
        
        # Insert TOC section before "## Functions"
        $tocSection = @"
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

"@
        
        $newContent = $newContent -replace '(## Functions)', "$tocSection`$1"
        
        # Write the updated content back to the file
        $newContent | Set-Content -Path $file.FullName -Encoding UTF8
        Write-Host "  - Added TOC markup"
    } else {
        Write-Host "  - Could not find pattern to insert TOC, skipping"
    }
}

Write-Host "Completed processing all functions.md files"
