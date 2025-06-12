@echo off
echo Updating module registry...

cd /d "%~dp0"

:: Get current directory and navigate to assets/data
cd "assets\data"

:: Create temporary PowerShell script to generate registry
(
echo $modules = @^(^)
echo Get-ChildItem -Name "*.json" ^| Where-Object { $_ -ne "module-registry.json" } ^| ForEach-Object {
echo     $moduleName = $_.Replace^(".json", ""^)
echo     $modules += '"' + $moduleName + '"'
echo }
echo $registry = @{
echo     modules = $modules
echo     lastUpdated = Get-Date -Format "yyyy-MM-dd"
echo }
echo $registry ^| ConvertTo-Json -Depth 2 ^| Out-File -FilePath "module-registry.json" -Encoding UTF8
) > update-registry.ps1

:: Run the PowerShell script
powershell -ExecutionPolicy Bypass -File "update-registry.ps1"

:: Clean up
del "update-registry.ps1"

echo Module registry updated successfully!
echo.
echo Current modules found:
type "module-registry.json"

pause
