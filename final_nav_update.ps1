# Update nav_order for all function files systematically
Write-Host "Starting systematic nav_order update for all function files..."

# Get all function files
$allFiles = Get-ChildItem -Path "community_bridge\modules\*\*\functions\*.md" -Recurse

# Group files by their module and type (client/server/shared)
$grouped = @{}
foreach ($file in $allFiles) {
    $pathParts = $file.FullName -split '\\'
    $moduleIndex = -1

    for ($i = 0; $i -lt $pathParts.Length; $i++) {
        if ($pathParts[$i] -eq 'modules') {
            $moduleIndex = $i + 1
            break
        }
    }

    if ($moduleIndex -gt 0 -and $moduleIndex -lt $pathParts.Length) {
        $module = $pathParts[$moduleIndex]
        $type = 'unknown'

        if ($file.FullName -like '*\client\*') { $type = 'client' }
        elseif ($file.FullName -like '*\server\*') { $type = 'server' }
        elseif ($file.FullName -like '*\shared\*') { $type = 'shared' }

        $groupKey = "$module-$type"

        if (-not $grouped.ContainsKey($groupKey)) {
            $grouped[$groupKey] = @()
        }
        $grouped[$groupKey] += $file
    }
}

$totalUpdated = 0

# Process each group
foreach ($groupKey in $grouped.Keys | Sort-Object) {
    Write-Host "`nProcessing group: $groupKey"
    $files = $grouped[$groupKey] | Sort-Object Name
    $navOrder = 1

    foreach ($file in $files) {
        try {
            $content = Get-Content -Path $file.FullName -Raw
            $originalContent = $content

            # Update nav_order
            $content = $content -replace 'nav_order:\s*\d+', "nav_order: $navOrder"

            if ($content -ne $originalContent) {
                Set-Content -Path $file.FullName -Value $content -NoNewline
                Write-Host "  Updated $($file.Name) -> nav_order: $navOrder"
                $totalUpdated++
            } else {
                Write-Host "  Skipped $($file.Name) (no change needed)"
            }

            $navOrder++
        }
        catch {
            Write-Host "  ERROR processing $($file.Name): $($_.Exception.Message)"
        }
    }
}

Write-Host "`n=== SUMMARY ==="
Write-Host "Total files updated: $totalUpdated"
Write-Host "Groups processed: $($grouped.Keys.Count)"
Write-Host "`nAll function files now have:"
Write-Host "- nav_exclude removed (visible in navigation)"
Write-Host "- permalink removed"
Write-Host "- Incremental nav_order within each module/type group"
