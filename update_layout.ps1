# PowerShell script to update all functions.md files to use the functions layout for right-side TOC

Write-Host "🔍 Finding all functions.md files that have has_toc: true..."

# Find all functions.md files that have has_toc: true (these need the new layout)
$functionsFiles = Get-ChildItem -Recurse -Path "community_bridge/modules" -Filter "functions.md" | Where-Object {
    $content = Get-Content $_.FullName -Raw
    $content -match 'has_toc: true'
}

Write-Host "📝 Found $($functionsFiles.Count) functions.md files with TOC enabled"

foreach ($file in $functionsFiles) {
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")

    # Read file content
    $content = Get-Content $file.FullName -Raw

    # Replace layout: default with layout: functions
    if ($content -match 'layout: default') {
        $newContent = $content -replace 'layout: default', 'layout: functions'
        
        # Write back to file
        Set-Content -Path $file.FullName -Value $newContent -NoNewline

        Write-Host "✅ Updated layout to 'functions' in: $relativePath"
    } else {
        Write-Host "⏭️  Skipping $relativePath (no 'layout: default' found)"
    }
}

Write-Host "🎉 Updated all functions.md files to use the new functions layout for right-side TOC!"
