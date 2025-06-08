# Update nav_order for function files
$files = Get-ChildItem -Path "community_bridge\modules\*\*\functions\*.md" -Recurse

# Group by module and client/server/shared
$grouped = $files | Group-Object {
    $parts = $_.FullName -split '\\'
    $moduleIdx = 0
    for ($i = 0; $i -lt $parts.Length; $i++) {
        if ($parts[$i] -eq 'modules') {
            $moduleIdx = $i + 1
            break
        }
    }
    if ($moduleIdx -lt $parts.Length) {
        $module = $parts[$moduleIdx]
        $type = if ($_.FullName -like '*\client\*') { 'client' }
                elseif ($_.FullName -like '*\server\*') { 'server' }
                else { 'shared' }
        return "$module-$type"
    }
    return 'unknown'
}

$totalProcessed = 0
foreach ($group in $grouped) {
    Write-Host "Processing group: $($group.Name)"
    $navOrder = 1
    $sortedFiles = $group.Group | Sort-Object Name

    foreach ($file in $sortedFiles) {
        $content = Get-Content -Path $file.FullName -Raw
        $content = $content -replace 'nav_order:\s*\d+', "nav_order: $navOrder"
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  $($file.Name) -> nav_order: $navOrder"
        $navOrder++
        $totalProcessed++
    }
    Write-Host ""
}
Write-Host "Total files updated: $totalProcessed"
