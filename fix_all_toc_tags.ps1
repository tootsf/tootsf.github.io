# PowerShell script to remove {: .no_toc } tags from individual function headings in ALL functions.md files

# Get all functions.md files
$functionsFiles = Get-ChildItem -Path "." -Recurse -Filter "functions.md"

Write-Host "Found $($functionsFiles.Count) functions.md files"

$totalFixed = 0

foreach ($file in $functionsFiles) {
    $relativePath = $file.FullName.Replace((Get-Location).Path, "").TrimStart('\')
    Write-Host "Processing: $relativePath"
    
    # Read the file content as an array of lines
    $lines = Get-Content -Path $file.FullName -Encoding UTF8
    $modified = $false
    $fixedCount = 0
    
    # Process each line
    for ($i = 0; $i -lt $lines.Length; $i++) {
        # Check if current line is a function heading (### [FunctionName])
        if ($lines[$i] -match '^###\s*\[.*?\]') {
            # Check if the next line is {: .no_toc }
            if (($i + 1) -lt $lines.Length -and $lines[$i + 1] -match '^\{:\s*\.no_toc\s*\}$') {
                # Remove the {: .no_toc } line
                $lines = $lines[0..$i] + $lines[($i + 2)..($lines.Length - 1)]
                $modified = $true
                $fixedCount++
                Write-Host "  - Fixed function heading at line $($i + 1)"
                # Don't increment $i since we removed a line
            }
        }
    }
    
    # Write back if modified
    if ($modified) {
        $lines | Set-Content -Path $file.FullName -Encoding UTF8
        Write-Host "  ✅ Fixed $fixedCount function headings in $($file.Name)"
        $totalFixed += $fixedCount
    } else {
        Write-Host "  ⏭️  No changes needed"
    }
}

Write-Host ""
Write-Host "🎉 Completed! Fixed $totalFixed function headings across all files."
