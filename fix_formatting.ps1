# Script to update function formatting in Community Bridge documentation
$rootPath = "c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io"
$markdownFiles = Get-ChildItem -Path "$rootPath\community_bridge\modules" -Filter "*.md" -Recurse

foreach ($file in $markdownFiles) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $changed = $false
    
    # Skip files that already have the new format
    if ($content -match "## 🔹") {
        Write-Host "Skipping $($file.Name) - already updated" -ForegroundColor Yellow
        continue
    }
    
    # Update function headers from ### FunctionName to ## 🔹 FunctionName
    $functionPattern = '### ([A-Z][a-zA-Z_][a-zA-Z0-9_]*(?:\([^)]*\))?)\s*$'
    if ($content -match $functionPattern) {
        Write-Host "Updating function headers in $($file.Name)" -ForegroundColor Cyan
        $content = $content -replace $functionPattern, "---`r`n`r`n## 🔹 `$1"
        $changed = $true
    }
    
    # Update best practice sections
    $bestPracticePattern = '### (Best Practice|Usage|Integration|Examples?|Error Handling|Performance|Security|Rate Limiting|Localization|Configuration)'
    if ($content -match $bestPracticePattern) {
        Write-Host "Updating best practice sections in $($file.Name)" -ForegroundColor Cyan
        $content = $content -replace $bestPracticePattern, "## 📚 `$1"
        $changed = $true
    }
    
    # Save the file if changes were made
    if ($changed) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "✓ Updated $($file.Name)" -ForegroundColor Green
    }
}

Write-Host "`nCompleted updating function formatting!" -ForegroundColor Green
