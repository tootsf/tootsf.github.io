# PowerShell script to update function formatting for better visual distinction
# This script adds visual separators and consistent formatting to function documentation

$rootPath = "c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io"
$markdownFiles = Get-ChildItem -Path $rootPath -Recurse -Filter "*.md" | Where-Object { $_.Name -ne "README.md" -and $_.FullName -notlike "*examples*" }

Write-Host "Found $($markdownFiles.Count) markdown files to process" -ForegroundColor Green

foreach ($file in $markdownFiles) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Yellow
    $content = Get-Content -Path $file.FullName -Raw -ErrorAction SilentlyContinue
    
    if (-not $content) {
        Write-Host "  - Skipping empty file" -ForegroundColor Gray
        continue
    }
    
    $originalContent = $content
    $changed = $false
    
    # Update function headers from ### to ## with 🔹 emoji for common function names
    $functionNames = @(
        "AddItem", "RemoveItem", "GetItemInfo", "GetItemCount", "GetPlayerInventory", "GetItemBySlot", "SetMetadata", 
        "OpenStash", "RegisterStash", "HasItem", "CanCarryItem", "UpdatePlate", "GetImagePath", "OpenShop", "RegisterShop", "StripPNG",
        "GetMoney", "AddMoney", "RemoveMoney", "GetJob", "SetJob", "GetIdentifier", "GetName", "GetPlayerName", "HasPermission",
        "SendNotify", "SendAlert", "SendSuccess", "SendError", "SendWarning", "SendInfo",
        "Open", "Close", "Create", "Update", "Delete", "Register", "Get", "Set", "Add", "Remove", "Has", "Can", "Is",
        "GiveKeys", "RemoveKeys", "HasKeys", "VersionChecker", "GetVersion",
        "AddContact", "RemoveContact", "GetContacts", "SendMessage",
        "BanPlayer", "KickPlayer", "UnbanPlayer", "GetBanInfo", "IsPlayerBanned",
        "GetLocale", "SetLocale", "GetString", "RegisterLocale",
        "ShowText", "HideText", "UpdateText", "LockDoor", "UnlockDoor", "ToggleLock", "GetDoorState",
        "GetFuel", "SetFuel", "ConsumeFuel", "updatecolourblindness", "hexToRgb", "rgbToHex", "rgbToHsl", "hslToRgb"
    )
    
    foreach ($funcName in $functionNames) {
        $pattern = "(?m)^### ($funcName)"
        if ($content -match $pattern) {
            $content = $content -replace $pattern, "## 🔹 `$1"
            $changed = $true
        }
    }
    
    # Update best practice headers
    $bestPracticeNames = @(
        "Error Handling", "Metadata Usage", "Stash Management", "Permission Checks", 
        "Resource Management", "Event Handling", "Data Validation", "Best Practices", 
        "Usage Examples", "Common Patterns", "Integration Guide"
    )
    
    foreach ($practName in $bestPracticeNames) {
        $pattern = "(?m)^### ($practName)"
        if ($content -match $pattern) {
            $content = $content -replace $pattern, "## 📚 `$1"
            $changed = $true
        }
    }
    
    # Only write if content changed
    if ($changed) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "  ✓ Updated function formatting" -ForegroundColor Green
    } else {
        Write-Host "  - No changes needed" -ForegroundColor Gray
    }
}

Write-Host "`nCompleted updating function formatting!" -ForegroundColor Green
