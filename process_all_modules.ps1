# Community Bridge Individual File Creator - PowerShell Version
# This script processes all modules and creates individual function files

$ErrorActionPreference = "Continue"

Write-Host "🚀 Community Bridge Individual File Creator" -ForegroundColor Green
Write-Host "=" * 60

$baseDir = $PSScriptRoot
$modulesDir = Join-Path $baseDir "community_bridge\modules"

if (-not (Test-Path $modulesDir)) {
    Write-Host "❌ Modules directory not found: $modulesDir" -ForegroundColor Red
    exit 1
}

function Extract-Functions-From-File {
    param([string]$filePath)

    if (-not (Test-Path $filePath)) {
        return @{
            functions = @()
            grandParent = ""
            parentTitle = ""
        }
    }

    $content = Get-Content $filePath -Raw -Encoding UTF8

    # Extract frontmatter
    if ($content -match '^---\s*\r?\n(.*?)\r?\n---\s*\r?\n(.*)$') {
        $frontmatter = $matches[1]
        $mainContent = $matches[2]
    } else {
        return @{
            functions = @()
            grandParent = ""
            parentTitle = ""
        }
    }

    # Parse frontmatter
    $grandParent = ""
    $parentTitle = ""

    $frontmatter -split "`n" | ForEach-Object {
        $line = $_.Trim()
        if ($line -match '^grand_parent:\s*"?([^"]*)"?$') {
            $grandParent = $matches[1]
        }
        if ($line -match '^parent:\s*"?([^"]*)"?$') {
            $parentTitle = $matches[1]
        }
    }

    # Find all functions using regex
    $functionPattern = '## 🔹 ([^\r\n]+)(.*?)(?=## 🔹 |$)'
    $functionMatches = [regex]::Matches($mainContent, $functionPattern, [System.Text.RegularExpressions.RegexOptions]::Singleline)

    $functions = @()
    foreach ($match in $functionMatches) {
        $functions += @{
            name = $match.Groups[1].Value.Trim()
            content = $match.Groups[2].Value.Trim()
        }
    }

    return @{
        functions = $functions
        grandParent = $grandParent
        parentTitle = $parentTitle
    }
}

function Create-Individual-Function-Files {
    $modules = Get-ChildItem $modulesDir -Directory
    $totalCreated = 0

    Write-Host "`n📁 Processing $($modules.Count) modules..." -ForegroundColor Yellow

    foreach ($module in $modules) {
        Write-Host "`n📂 Processing module: $($module.Name)" -ForegroundColor Cyan

        $sides = @('client', 'server', 'shared')
        foreach ($side in $sides) {
            $functionsFile = Join-Path $module.FullName "$side\functions.md"

            if (-not (Test-Path $functionsFile)) {
                continue
            }

            Write-Host "   📖 Processing $side/functions.md" -ForegroundColor Gray

            try {
                $result = Extract-Functions-From-File -filePath $functionsFile

                if ($result.functions.Count -eq 0) {
                    Write-Host "   ⏭️  No functions found" -ForegroundColor Yellow
                    continue
                }

                Write-Host "   🔍 Found $($result.functions.Count) functions" -ForegroundColor Green

                # Create functions directory
                $functionsDir = Join-Path $module.FullName "$side\functions"
                if (-not (Test-Path $functionsDir)) {
                    New-Item -ItemType Directory -Path $functionsDir -Force | Out-Null
                }

                # Create individual function files
                $createdFiles = @()
                foreach ($func in $result.functions) {
                    $safeName = $func.name -replace '[<>:"/\\|?*]', ''
                    $funcFilePath = Join-Path $functionsDir "$safeName.md"

                    # Create frontmatter
                    $frontmatter = @"
---
layout: default
title: "$($func.name)"
parent: Functions
grand_parent: $($result.parentTitle)
great_grand_parent: $($result.grandParent)
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/$($module.Name)/$side/functions/$safeName/
---

"@

                    # Clean up content - remove duplicate headers
                    $cleanContent = $func.content -replace "^# $([regex]::Escape($func.name))\s*\{.*?\}\s*\r?\n.*?\r?\n\r?\n", ""

                    # Add function header
                    $header = "# $($func.name)`n{: .no_toc }`n`n"

                    # Complete content
                    $fullContent = $frontmatter + $header + $cleanContent

                    # Write file
                    $fullContent | Set-Content -Path $funcFilePath -Encoding UTF8
                    $createdFiles += $safeName
                    $totalCreated++
                }

                Write-Host "   ✅ Created $($createdFiles.Count) function files" -ForegroundColor Green

                # Create container page
                $containerContent = @"
---
layout: default
title: Functions
parent: $($result.parentTitle)
grand_parent: $($result.grandParent)
great_grand_parent: Modules
has_children: true
nav_order: 1
permalink: /community_bridge/modules/$($module.Name)/$side/functions/
---

# $($side.Substring(0,1).ToUpper() + $side.Substring(1)) Functions
{: .no_toc }

$($side.Substring(0,1).ToUpper() + $side.Substring(1))-side functions for the $($module.Name) module.

## Available Functions

"@

                # Add function links
                foreach ($func in $result.functions) {
                    $safeName = $func.name -replace '[<>:"/\\|?*]', ''
                    $containerContent += "- [$($func.name)]($safeName)`n"
                }

                # Write container page
                $containerContent | Set-Content -Path $functionsFile -Encoding UTF8
                Write-Host "   📝 Updated container page" -ForegroundColor Blue

            } catch {
                Write-Host "   ❌ Error processing $side/functions.md: $($_.Exception.Message)" -ForegroundColor Red
            }
        }
    }

    Write-Host "`n🎉 Created $totalCreated individual function files!" -ForegroundColor Green
}

function Create-Individual-Event-Files {
    Write-Host "`n🔄 Processing events..." -ForegroundColor Yellow

    $eventModules = @('framework', 'inventory', 'phone', 'dispatch', 'shops', 'housing')
    $totalEventsCreated = 0

    foreach ($moduleName in $eventModules) {
        $modulePath = Join-Path $modulesDir $moduleName
        $eventsFile = Join-Path $modulePath "server\events.md"

        if (-not (Test-Path $eventsFile)) {
            continue
        }

        Write-Host "   📁 Processing $moduleName/server/events.md" -ForegroundColor Gray

        try {
            $result = Extract-Functions-From-File -filePath $eventsFile

            if ($result.functions.Count -le 1) {
                Write-Host "   ⏭️  Only one or no events found, keeping as single file" -ForegroundColor Yellow
                continue
            }

            Write-Host "   🔍 Found $($result.functions.Count) events" -ForegroundColor Green

            # Create events directory
            $eventsDir = Join-Path $modulePath "server\events"
            if (-not (Test-Path $eventsDir)) {
                New-Item -ItemType Directory -Path $eventsDir -Force | Out-Null
            }

            # Create individual event files
            $createdFiles = @()
            foreach ($event in $result.functions) {
                $safeName = $event.name -replace '[<>:"/\\|?*]', ''
                $eventFilePath = Join-Path $eventsDir "$safeName.md"

                # Create frontmatter
                $frontmatter = @"
---
layout: default
title: "$($event.name)"
parent: Events
grand_parent: $($result.parentTitle)
great_grand_parent: $($result.grandParent)
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/$moduleName/server/events/$safeName/
---

"@

                # Clean up content
                $cleanContent = $event.content -replace "^# $([regex]::Escape($event.name))\s*\{.*?\}\s*\r?\n.*?\r?\n\r?\n", ""

                # Add event header
                $header = "# $($event.name)`n{: .no_toc }`n`n"

                # Complete content
                $fullContent = $frontmatter + $header + $cleanContent

                # Write file
                $fullContent | Set-Content -Path $eventFilePath -Encoding UTF8
                $createdFiles += $safeName
                $totalEventsCreated++
            }

            Write-Host "   ✅ Created $($createdFiles.Count) event files" -ForegroundColor Green

            # Create container page for events
            $containerContent = @"
---
layout: default
title: Events
parent: $($result.parentTitle)
grand_parent: $($result.grandParent)
great_grand_parent: Modules
has_children: true
nav_order: 2
permalink: /community_bridge/modules/$moduleName/server/events/
---

# Server Events
{: .no_toc }

Server-side events for the $moduleName module.

## Available Events

"@

            # Add event links
            foreach ($event in $result.functions) {
                $safeName = $event.name -replace '[<>:"/\\|?*]', ''
                $containerContent += "- [$($event.name)]($safeName)`n"
            }

            # Write container page
            $containerContent | Set-Content -Path $eventsFile -Encoding UTF8
            Write-Host "   📝 Updated events container page" -ForegroundColor Blue

        } catch {
            Write-Host "   ❌ Error processing $moduleName/server/events.md: $($_.Exception.Message)" -ForegroundColor Red
        }
    }

    Write-Host "`n🎉 Created $totalEventsCreated individual event files!" -ForegroundColor Green
}

# Main execution
Write-Host "Starting individual file creation process..." -ForegroundColor Yellow

Create-Individual-Function-Files
Create-Individual-Event-Files

Write-Host "`n✨ Individual file creation completed!" -ForegroundColor Green
Write-Host "💡 Navigation structure: Module → Side → Functions/Events → Individual Function/Event" -ForegroundColor Cyan
Write-Host "`nYou can now test the Jekyll site to see the new navigation structure." -ForegroundColor White
