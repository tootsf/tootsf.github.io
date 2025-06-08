# PowerShell script to add has_toc: true to all functions.md files

Write-Host "🔍 Finding all functions.md files..."

# Find all functions.md files
$functionsFiles = Get-ChildItem -Recurse -Path "community_bridge/modules" -Filter "functions.md"

Write-Host "📝 Found $($functionsFiles.Count) functions.md files"

foreach ($file in $functionsFiles) {
    $relativePath = $file.FullName.Replace((Get-Location).Path + "\", "")

    # Read file content as lines
    $lines = Get-Content $file.FullName

    # Check if already has has_toc
    if ($lines -match 'has_toc: true') {
        Write-Host "⏭️  Skipping $relativePath (already has has_toc: true)"
        continue
    }

    $newLines = @()
    foreach ($line in $lines) {
        $newLines += $line
        if ($line -eq 'has_children: true') {
            $newLines += 'has_toc: true'
        }
    }

    # Write back to file
    Set-Content -Path $file.FullName -Value $newLines

    Write-Host "✅ Added has_toc: true to: $relativePath"
}

Write-Host "🎉 Right-side TOC enabled for all functions.md files!"
