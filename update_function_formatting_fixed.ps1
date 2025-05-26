# PowerShell script to update function formatting in Community Bridge documentation
# Fixes emoji encoding issues from the previous version

# Set encoding to UTF8 with BOM to handle emojis properly
$OutputEncoding = [System.Text.Encoding]::UTF8

# Get all markdown files in the community_bridge/modules directory
$moduleFiles = Get-ChildItem -Path ".\community_bridge\modules" -Filter "*.md" -Recurse

Write-Host "Found $($moduleFiles.Count) module documentation files"

$totalUpdated = 0
$filesUpdated = @()

foreach ($file in $moduleFiles) {
    Write-Host "Processing: $($file.FullName)"
    
    # Read the file content with UTF8 encoding
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $fileUpdated = $false
    
    # Skip files that already have the new formatting
    if ($content -match "## 🔹") {
        Write-Host "  ✓ Already has new formatting, skipping" -ForegroundColor Green
        continue
    }
    
    # Pattern 1: Convert function headers from ### FunctionName() to ## 🔹 FunctionName
    $functionPattern = '### ([A-Z][a-zA-Z0-9_:]*)\(\)'
    if ($content -match $functionPattern) {
        $content = $content -replace $functionPattern, '## 🔹 $1'
        Write-Host "  → Updated function headers" -ForegroundColor Yellow
        $fileUpdated = $true
    }
    
    # Pattern 2: Convert function headers without parentheses
    $functionPatternNoParens = '### ([A-Z][a-zA-Z0-9_:]+)$'
    if ($content -match $functionPatternNoParens) {
        $content = $content -replace $functionPatternNoParens, '## 🔹 $1'
        Write-Host "  → Updated function headers (no parens)" -ForegroundColor Yellow
        $fileUpdated = $true
    }
    
    # Pattern 3: Convert section headers to use 📚 icon for best practices/information sections
    $bestPracticePatterns = @(
        '### (Best Practices?)',
        '### (Usage Tips?)',
        '### (Guidelines?)',
        '### (Notes?)',
        '### (Important)',
        '### (Examples?)',
        '### (Integration)',
        '### (Features?)',
        '### (Error Handling)',
        '### (Performance)',
        '### (Security)',
        '### (Configuration)',
        '### (Setup)',
        '### (Installation)',
        '### (Requirements?)',
        '### (Documentation)',
        '### (API Reference)',
        '### (Troubleshooting)',
        '### (FAQ)',
        '### (Common Issues)',
        '### (Migration)',
        '### (Upgrade)',
        '### (Compatibility)',
        '### (Support)',
        '### (Community)',
        '### (Contributing)',
        '### (License)',
        '### (Changelog)',
        '### (Version)',
        '### (Release Notes)',
        '### (Known Issues)',
        '### (Limitations)',
        '### (Deprecation)',
        '### (Breaking Changes)',
        '### (Backwards Compatibility)'
    )
    
    foreach ($pattern in $bestPracticePatterns) {
        if ($content -match $pattern) {
            $content = $content -replace $pattern, '## 📚 $1'
            Write-Host "  → Updated best practice headers" -ForegroundColor Cyan
            $fileUpdated = $true
        }
    }
    
    # Pattern 4: Add horizontal separators before function sections (but not at the beginning of file)
    # Look for ## 🔹 not preceded by --- or at start of file
    $lines = $content -split "`r?`n"
    $newLines = @()
    
    for ($i = 0; $i -lt $lines.Length; $i++) {
        $line = $lines[$i]
        
        # If this is a function header and not at the beginning of the file
        if ($line -match "^## 🔹" -and $i -gt 0) {
            # Check if the previous line is not already a separator
            $prevLine = if ($i -gt 0) { $lines[$i-1] } else { "" }
            $prevLine2 = if ($i -gt 1) { $lines[$i-2] } else { "" }
            
            # Add separator if not already present
            if ($prevLine -ne "---" -and $prevLine2 -ne "---" -and $prevLine.Trim() -ne "") {
                $newLines += ""
                $newLines += "---"
                $newLines += ""
                Write-Host "  → Added separator before function" -ForegroundColor Blue
                $fileUpdated = $true
            }
        }
        
        $newLines += $line
    }
    
    if ($fileUpdated) {
        $content = $newLines -join "`n"
    }
    
    # Only write if content changed
    if ($content -ne $originalContent) {
        # Write the file with UTF8 encoding (with BOM to ensure emoji support)
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $totalUpdated++
        $filesUpdated += $file.Name
        Write-Host "  ✓ Updated successfully" -ForegroundColor Green
    } else {
        Write-Host "  - No changes needed" -ForegroundColor Gray
    }
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Magenta
Write-Host "Total files processed: $($moduleFiles.Count)"
Write-Host "Files updated: $totalUpdated"
if ($filesUpdated.Count -gt 0) {
    Write-Host "`nUpdated files:"
    $filesUpdated | ForEach-Object { Write-Host "  - $_" -ForegroundColor Green }
}

Write-Host "`nFormatting update complete!" -ForegroundColor Green
