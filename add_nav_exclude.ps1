# PowerShell script to add nav_exclude: true to all function files
# This prevents individual function pages from appearing in the main navigation

$rootPath = "c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\"
$functionFiles = Get-ChildItem -Path $rootPath -Recurse -Filter "*.md" | Where-Object { $_.FullName -match "\\functions\\[^\\]+\.md$" }

$processedCount = 0
$skippedCount = 0
$errorCount = 0

Write-Host "Found $($functionFiles.Count) function files to process..."
Write-Host ""

foreach ($file in $functionFiles) {
    try {
        $content = Get-Content $file.FullName -Raw

        # Check if nav_exclude is already present
        if ($content -match "nav_exclude\s*:") {
            Write-Host "SKIP: $($file.Name) - nav_exclude already present" -ForegroundColor Yellow
            $skippedCount++
            continue
        }

        # Check if this is a valid Jekyll file with front matter
        if ($content -notmatch "^---[\r\n]") {
            Write-Host "SKIP: $($file.Name) - No Jekyll front matter found" -ForegroundColor Yellow
            $skippedCount++
            continue
        }

        # Find the end of the front matter
        $lines = $content -split "`r?`n"
        $frontMatterEnd = -1

        for ($i = 1; $i -lt $lines.Count; $i++) {
            if ($lines[$i] -match "^---\s*$") {
                $frontMatterEnd = $i
                break
            }
        }

        if ($frontMatterEnd -eq -1) {
            Write-Host "ERROR: $($file.Name) - Could not find end of front matter" -ForegroundColor Red
            $errorCount++
            continue
        }

        # Insert nav_exclude: true before the closing ---
        $lines[$frontMatterEnd] = "nav_exclude: true`r`n---"
        $newContent = $lines -join "`r`n"

        # Write the updated content back to the file
        Set-Content -Path $file.FullName -Value $newContent -NoNewline

        Write-Host "UPDATED: $($file.Name)" -ForegroundColor Green
        $processedCount++

    } catch {
        Write-Host "ERROR: $($file.Name) - $($_.Exception.Message)" -ForegroundColor Red
        $errorCount++
    }
}

Write-Host ""
Write-Host "=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Files processed: $processedCount" -ForegroundColor Green
Write-Host "Files skipped: $skippedCount" -ForegroundColor Yellow
Write-Host "Errors: $errorCount" -ForegroundColor Red
Write-Host "Total files checked: $($functionFiles.Count)"

if ($processedCount -gt 0) {
    Write-Host ""
    Write-Host "SUCCESS: Navigation exclusions have been added to function files." -ForegroundColor Green
    Write-Host "The individual function pages will no longer appear in the main navigation," -ForegroundColor Green
    Write-Host "but will remain accessible through their parent module pages." -ForegroundColor Green
}
