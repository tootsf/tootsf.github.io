# PowerShell script to update documentation patterns to use Bridge export syntax

# Function to update module patterns
function Update-ModulePatterns {
    param(
        [string]$FilePath,
        [string]$ModuleName
    )
    
    if (Test-Path $FilePath) {
        Write-Host "Updating $FilePath for module $ModuleName"
        
        # Read file content
        $content = Get-Content $FilePath -Raw
        
        # Replace direct module access patterns with Bridge pattern
        $content = $content -replace "local $ModuleName = exports\['community_bridge'\]:$ModuleName\(\)", "local Bridge = exports['community_bridge']:Bridge()"
        $content = $content -replace "$ModuleName\.", "Bridge.$ModuleName."
        
        # Write back to file
        $content | Set-Content $FilePath -NoNewline
    }
}

# Update specific module documentation files
$ModulesPath = "c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"

# Math module
Update-ModulePatterns "$ModulesPath\math\shared.md" "Math"

# Menu module
Update-ModulePatterns "$ModulesPath\menu\client.md" "Menu"

# VehicleKey module
Update-ModulePatterns "$ModulesPath\vehiclekey\client.md" "VehicleKey" 

# Phone module
Update-ModulePatterns "$ModulesPath\phone\server.md" "Phone"

# Version module  
Update-ModulePatterns "$ModulesPath\version\server.md" "Version"

# Locales module
Update-ModulePatterns "$ModulesPath\locales\shared.md" "Locales"

# Managment module
Update-ModulePatterns "$ModulesPath\managment\server.md" "Managment"

Write-Host "Bridge pattern updates completed!"
