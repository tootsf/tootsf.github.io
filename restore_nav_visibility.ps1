# PowerShell script to remove nav_exclude and permalink from function files
# and set incremental nav_order values

Write-Host "Restoring navigation visibility for function files..."

$files = Get-ChildItem -Path "community_bridge\modules\*\*\functions\*.md" -Recurse
$processed = 0
$errors = 0

# Group files by their parent module and function type to ensure consistent ordering
$groupedFiles = $files | Group-Object { 
    $parts = $_.FullName -split '\\'
    $moduleIndex = [array]::IndexOf($parts, 'modules')
    if ($moduleIndex -ge 0 -and $moduleIndex + 1 -lt $parts.Length) {
        $module = $parts[$moduleIndex + 1]
        $type = if ($_.FullName -contains '\client\') { 'client' } 
                elseif ($_.FullName -contains '\server\') { 'server' }
                elseif ($_.FullName -contains '\shared\') { 'shared' }
                else { 'unknown' }
        return "$module-$type"
    }
    return 'unknown'
}

foreach ($group in $groupedFiles) {
    $currentNavOrder = 1
    Write-Host "`nProcessing group: $($group.Name)"
    
    foreach ($file in $group.Group | Sort-Object Name) {
        try {
            $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
            $modified = $false
            
            # Remove nav_exclude line
            if ($content -match 'nav_exclude:\s*true\s*\n') {
                $content = $content -replace 'nav_exclude:\s*true\s*\n', ''
                $modified = $true
            }
            
            # Remove permalink line
            if ($content -match 'permalink:[^\n]*\n') {
                $content = $content -replace 'permalink:[^\n]*\n', ''
                $modified = $true
            }
            
            # Update nav_order to incremental value
            if ($content -match 'nav_order:\s*\d+') {
                $content = $content -replace 'nav_order:\s*\d+', "nav_order: $currentNavOrder"
                $modified = $true
            }
            
            if ($modified) {
                Set-Content -Path $file.FullName -Value $content -Encoding UTF8 -NoNewline
                Write-Host "  UPDATED: $($file.Name) (nav_order: $currentNavOrder)"
                $processed++
            } else {
                Write-Host "  SKIPPED: $($file.Name) (no changes needed)"
            }
            
            $currentNavOrder++
            
        } catch {
            Write-Host "  ERROR: $($file.Name) - $($_.Exception.Message)"
            $errors++
        }
    }
}

Write-Host "`n=== SUMMARY ==="
Write-Host "Files processed: $processed"
Write-Host "Errors: $errors"
Write-Host "Total files checked: $($files.Count)"

if ($errors -eq 0) {
    Write-Host "SUCCESS: All function files now have navigation visibility restored."
    Write-Host "Functions will appear in the main navigation with incremental nav_order values."
} else {
    Write-Host "COMPLETED WITH ERRORS: Check the error messages above."
}
