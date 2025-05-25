$baseDir = "c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io\community_bridge\modules"

# Define all modules
$modules = @(
    "notify", "menu", "input", "dialogue", "helptext", "progressbar",
    "target", "shops", "housing", "vehiclekey", "doorlock", "fuel", "clothing",
    "locales", "math", "weather", "skills", "dispatch", "phone", "version",
    "management", "accessibility"
)

# Create directories for each module
foreach ($module in $modules) {
    $moduleDir = Join-Path $baseDir $module
    if (!(Test-Path $moduleDir)) {
        New-Item -ItemType Directory -Path $moduleDir -Force
        Write-Host "Created directory: $moduleDir"
    }
}

Write-Host "All module directories created successfully!"
