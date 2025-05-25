# PowerShell script to update API patterns in all Community Bridge modules
# This script converts old API patterns to the correct Bridge.ModuleName.FunctionName() format

$modulesPath = "community_bridge\modules"
$modules = @(
    "Framework", "Inventory", "Menu", "Target", "Vehicle", "Blip", 
    "Callback", "Progressbar", "Input", "Notify", "Skills", "Weather", 
    "Dispatch", "Housing", "Shops", "Phone", "Locales", "Math"
)

# Function to update file content
function Update-APIPattern {
    param(
        [string]$filePath,
        [string]$moduleName
    )
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Replace module function calls like ModuleName.FunctionName with Bridge.ModuleName.FunctionName
        $pattern = "(?<!Bridge\.)$moduleName\.([A-Z][a-zA-Z0-9]*)"
        $replacement = "Bridge.$moduleName.`$1"
        $content = $content -replace $pattern, $replacement
        
        # Replace exports.community_bridge: calls with Bridge.ModuleName
        $exportsPattern = "exports\.community_bridge:([A-Z][a-zA-Z0-9]*)"
        $content = $content -replace $exportsPattern, "Bridge.$moduleName.`$1"
        
        # Add Bridge initialization if not present in examples
        if ($content -notmatch "local Bridge = exports\['community_bridge'\]:Bridge\(\)") {
            # Add Bridge initialization before first Bridge usage
            $bridgeUsagePattern = "(```lua\s*\n)(?=.*Bridge\.)"
            if ($content -match $bridgeUsagePattern) {
                $replacement = "`$1local Bridge = exports['community_bridge']:Bridge()`n`n"
                $content = $content -replace $bridgeUsagePattern, $replacement
            }
        }
        
        Set-Content $filePath $content -NoNewline
        Write-Host "Updated: $filePath" -ForegroundColor Green
    }
}

# Update all module files
foreach ($module in $modules) {
    $moduleDir = Join-Path $modulesPath $module.ToLower()
    
    if (Test-Path $moduleDir) {
        Write-Host "Processing module: $module" -ForegroundColor Yellow
        
        # Update client.md, server.md, shared.md, and index.md files
        $files = @("client.md", "server.md", "shared.md", "index.md")
        
        foreach ($file in $files) {
            $filePath = Join-Path $moduleDir $file
            Update-APIPattern -filePath $filePath -moduleName $module
        }
    }
}

Write-Host "API pattern update complete!" -ForegroundColor Green
