# Fix navigation hierarchy to prevent phantom function entries
# by making parent titles unique per module

Write-Host "Fixing navigation hierarchy for all modules..."

$modules = Get-ChildItem "community_bridge\modules\" -Directory
$totalUpdated = 0

foreach ($module in $modules) {
    $moduleName = $module.Name
    Write-Host "`n=== Processing Module: $moduleName ==="
    
    # Get the module's display name from its index.md
    $moduleIndexPath = Join-Path $module.FullName "index.md"
    $moduleDisplayName = $moduleName
    
    if (Test-Path $moduleIndexPath) {
        $indexContent = Get-Content $moduleIndexPath -Raw
        if ($indexContent -match 'great_grand_parent:\s*(.+)') {
            $moduleDisplayName = $matches[1].Trim()
            Write-Host "Found module display name: $moduleDisplayName"
        }
    }
    
    # Process client, server, and shared subdirectories
    $types = @('client', 'server', 'shared')
    
    foreach ($type in $types) {
        $typePath = Join-Path $module.FullName $type
        $functionsPath = Join-Path $typePath "functions.md"
        $functionsDirPath = Join-Path $typePath "functions"
        
        if (Test-Path $functionsPath) {
            Write-Host "  Updating $type functions.md..."
            
            # Update the functions.md file title
            $content = Get-Content $functionsPath -Raw
            $newTitle = "$moduleDisplayName Functions"
            $content = $content -replace 'title:\s*Functions', "title: $newTitle"
            Set-Content $functionsPath -Value $content -NoNewline
            $totalUpdated++
            
            # Update all individual function files in this module/type
            if (Test-Path $functionsDirPath) {
                $functionFiles = Get-ChildItem (Join-Path $functionsDirPath "*.md")
                foreach ($funcFile in $functionFiles) {
                    $funcContent = Get-Content $funcFile.FullName -Raw
                    $funcContent = $funcContent -replace 'parent:\s*Functions', "parent: $newTitle"
                    Set-Content $funcFile.FullName -Value $funcContent -NoNewline
                    Write-Host "    Updated function: $($funcFile.Name)"
                    $totalUpdated++
                }
            }
        }
    }
}

Write-Host "`n=== SUMMARY ==="
Write-Host "Total files updated: $totalUpdated"
Write-Host "`nNavigation hierarchy fixed:"
Write-Host "- Each module now has unique function parent titles"
Write-Host "- Functions will only appear under their correct modules"
Write-Host "- Phantom navigation entries should be eliminated"
