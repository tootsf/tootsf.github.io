# Fix navigation hierarchy for all remaining modules
Write-Host "Fixing navigation hierarchy for all remaining modules..."

$modules = @{
    'target' = 'Target'
    'skills' = 'Skills'  
    'dialogue' = 'Dialogue'
    'dispatch' = 'Dispatch'
    'doorlock' = 'Doorlock'
    'framework' = 'Framework'
    'fuel' = 'Fuel'
    'helptext' = 'Helptext'
    'input' = 'Input'
    'inventory' = 'Inventory'
    'managment' = 'Management'
    'menu' = 'Menu'
    'notify' = 'Notify'
    'phone' = 'Phone'
    'progressbar' = 'Progressbar'
    'shops' = 'Shops'
    'vehicleKey' = 'VehicleKey'
}

$totalUpdated = 0

foreach ($moduleKey in $modules.Keys) {
    $moduleName = $modules[$moduleKey]
    Write-Host "`n=== Processing Module: $moduleKey ($moduleName) ==="
    
    $types = @('client', 'server', 'shared')
    foreach ($type in $types) {
        $functionsPath = "community_bridge\modules\$moduleKey\$type\functions.md"
        $functionsDirPath = "community_bridge\modules\$moduleKey\$type\functions"
        
        if (Test-Path $functionsPath) {
            Write-Host "  Updating $type functions.md for $moduleName..."
            
            # Update functions.md title
            $content = Get-Content $functionsPath -Raw
            $content = $content -replace 'title:\s*Functions', "title: $moduleName Functions"
            Set-Content $functionsPath -Value $content -NoNewline
            $totalUpdated++
            
            # Update individual function files
            if (Test-Path $functionsDirPath) {
                $funcFiles = Get-ChildItem "$functionsDirPath\*.md"
                foreach ($file in $funcFiles) {
                    $funcContent = Get-Content $file.FullName -Raw
                    $funcContent = $funcContent -replace 'parent:\s*Functions', "parent: $moduleName Functions"
                    Set-Content $file.FullName -Value $funcContent -NoNewline
                    $totalUpdated++
                }
                Write-Host "    Updated $($funcFiles.Count) function files"
            }
        }
    }
}

Write-Host "`nTotal files updated: $totalUpdated"
Write-Host "Navigation hierarchy fixed for all modules!"
