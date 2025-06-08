# PowerShell script to update all remaining functions.md files with module-specific titles
# This fixes the navigation hierarchy by giving each module's functions a unique parent title

Write-Host "Starting to update functions.md files with module-specific titles..." -ForegroundColor Green

# Define module mappings: module_folder -> display_name
$moduleMap = @{
    "weather" = "Weather Functions"
    "version" = "Version Functions" 
    "vehiclekey" = "Vehiclekey Functions"
    "vehicleKey" = "Vehiclekey Functions"
    "shops" = "Shops Functions"
    "progressbar" = "Progressbar Functions"
    "phone" = "Phone Functions"
    "notify" = "Notify Functions"
    "math" = "Math Functions"
    "managment" = "Managment Functions"
    "locales" = "Locales Functions"
    "inventory" = "Inventory Functions"
    "input" = "Input Functions"
    "housing" = "Housing Functions"
    "helptext" = "Helptext Functions"
    "fuel" = "Fuel Functions"
    "doorlock" = "Doorlock Functions"
    "dispatch" = "Dispatch Functions"
    "dialogue" = "Dialogue Functions"
}

# Get all functions.md files that still have "title: Functions"
$functionsFiles = Get-ChildItem -Path "community_bridge\modules" -Recurse -Name "functions.md" | Where-Object {
    $content = Get-Content "community_bridge\modules\$_" -Raw
    $content -match "title:\s*Functions\s*\n"
}

Write-Host "Found $($functionsFiles.Count) functions.md files to update" -ForegroundColor Yellow

foreach ($file in $functionsFiles) {
    try {
        $fullPath = "community_bridge\modules\$file"
        $content = Get-Content $fullPath -Raw
        
        # Extract module name from path (e.g., "weather\client\functions.md" -> "weather")
        $moduleName = ($file -split '\\')[0]
        
        # Get the display name for this module
        $moduleDisplayName = $moduleMap[$moduleName]
        
        if (-not $moduleDisplayName) {
            Write-Host "Warning: No mapping found for module '$moduleName', skipping $file" -ForegroundColor Yellow
            continue
        }
        
        # Replace "title: Functions" with "title: [Module] Functions"
        $newContent = $content -replace "title:\s*Functions\s*\n", "title: $moduleDisplayName`n"
        
        if ($newContent -ne $content) {
            Set-Content -Path $fullPath -Value $newContent -NoNewline
            Write-Host "✓ Updated: $file -> '$moduleDisplayName'" -ForegroundColor Green
        } else {
            Write-Host "- No change needed: $file" -ForegroundColor Gray
        }
    }
    catch {
        Write-Host "✗ Error updating $file : $_" -ForegroundColor Red
    }
}

Write-Host "`nCompleted updating functions.md files!" -ForegroundColor Green
Write-Host "Next step: Update individual function files to use the new parent names" -ForegroundColor Cyan
