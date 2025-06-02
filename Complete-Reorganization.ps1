# Community Bridge Bulk Processor - Self-Executing PowerShell Script
# This script processes remaining modules automatically

Write-Host "🚀 Community Bridge Bulk Individual File Creator" -ForegroundColor Green
Write-Host "=" * 60

# Get script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$modulesDir = Join-Path $scriptDir "community_bridge\modules"

Write-Host "📁 Working in: $scriptDir" -ForegroundColor Yellow

if (-not (Test-Path $modulesDir)) {
    Write-Host "❌ Modules directory not found!" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit
}

# List all modules
$allModules = Get-ChildItem $modulesDir -Directory | Select-Object -ExpandProperty Name
Write-Host "📊 Found modules: $($allModules -join ', ')" -ForegroundColor Cyan

# Check which modules already have individual files
$processedModules = @()
$remainingModules = @()

foreach ($module in $allModules) {
    $hasIndividualFiles = $false
    foreach ($side in @('client', 'server', 'shared')) {
        $functionsFile = Join-Path $modulesDir "$module\$side\functions.md"
        if (Test-Path $functionsFile) {
            $content = Get-Content $functionsFile -Raw
            if ($content -match 'has_children:\s*true') {
                $hasIndividualFiles = $true
                break
            }
        }
    }

    if ($hasIndividualFiles) {
        $processedModules += $module
    } else {
        $remainingModules += $module
    }
}

Write-Host "`n✅ Already processed: $($processedModules -join ', ')" -ForegroundColor Green
Write-Host "⏳ Remaining to process: $($remainingModules -join ', ')" -ForegroundColor Yellow

if ($remainingModules.Count -eq 0) {
    Write-Host "`n🎉 All modules have been processed!" -ForegroundColor Green
    Read-Host "Press Enter to exit"
    exit
}

Write-Host "`n🔄 Processing remaining $($remainingModules.Count) modules..." -ForegroundColor Yellow

$totalCreated = 0

foreach ($module in $remainingModules) {
    Write-Host "`n📂 Processing: $module" -ForegroundColor Cyan
    $moduleDir = Join-Path $modulesDir $module

    foreach ($side in @('client', 'server', 'shared')) {
        $functionsFile = Join-Path $moduleDir "$side\functions.md"

        if (-not (Test-Path $functionsFile)) {
            continue
        }

        Write-Host "   📖 Processing $side/functions.md" -ForegroundColor Gray

        try {
            $content = Get-Content $functionsFile -Raw -Encoding UTF8

            # Skip if already processed
            if ($content -match 'has_children:\s*true') {
                Write-Host "   ⏭️  Already processed" -ForegroundColor Yellow
                continue
            }

            # Extract frontmatter and content
            if ($content -notmatch '^---\s*(.*?)\s*---\s*(.*)$') {
                Write-Host "   ❌ No valid frontmatter found" -ForegroundColor Red
                continue
            }

            $frontmatter = $matches[1]
            $mainContent = $matches[2]

            # Parse navigation info
            $grandParent = ""
            $parentTitle = ""

            $frontmatter -split "`n" | ForEach-Object {
                $line = $_.Trim()
                if ($line -match '^grand_parent:\s*"?([^"]*)"?') {
                    $grandParent = $matches[1]
                }
                if ($line -match '^parent:\s*"?([^"]*)"?') {
                    $parentTitle = $matches[1]
                }
            }

            # Find functions
            $functionMatches = [regex]::Matches($mainContent, '## 🔹 ([^\r\n]+)(.*?)(?=## 🔹 |$)', [System.Text.RegularExpressions.RegexOptions]::Singleline)

            if ($functionMatches.Count -eq 0) {
                Write-Host "   ⏭️  No functions found" -ForegroundColor Yellow
                continue
            }

            Write-Host "   🔍 Found $($functionMatches.Count) functions" -ForegroundColor Green

            # Create functions directory
            $functionsDir = Join-Path $moduleDir "$side\functions"
            New-Item -ItemType Directory -Path $functionsDir -Force | Out-Null

            # Process each function
            $createdCount = 0
            $functionLinks = @()

            foreach ($match in $functionMatches) {
                $funcName = $match.Groups[1].Value.Trim()
                $funcContent = $match.Groups[2].Value.Trim()

                if (-not $funcContent) { continue }

                $safeName = $funcName -replace '[<>:"/\\|?*]', ''
                $funcFile = Join-Path $functionsDir "$safeName.md"

                # Create individual function file
                $individualContent = @"
---
layout: default
title: "$funcName"
parent: Functions
grand_parent: $parentTitle
great_grand_parent: $grandParent
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/$module/$side/functions/$safeName/
---

# $funcName
{: .no_toc }

$($funcContent -replace "^# $([regex]::Escape($funcName)).*?\n\n", "")
"@

                Set-Content -Path $funcFile -Value $individualContent -Encoding UTF8
                $functionLinks += "- [$funcName]($safeName)"
                $createdCount++
                $totalCreated++
            }

            Write-Host "   ✅ Created $createdCount individual files" -ForegroundColor Green

            # Create container page
            $containerContent = @"
---
layout: default
title: Functions
parent: $parentTitle
grand_parent: $grandParent
great_grand_parent: Modules
has_children: true
nav_order: 1
permalink: /community_bridge/modules/$module/$side/functions/
---

# $($side.Substring(0,1).ToUpper() + $side.Substring(1)) Functions
{: .no_toc }

$($side.Substring(0,1).ToUpper() + $side.Substring(1))-side functions for the $module module.

## Available Functions

$($functionLinks -join "`n")
"@

            Set-Content -Path $functionsFile -Value $containerContent -Encoding UTF8
            Write-Host "   📝 Updated container page" -ForegroundColor Blue

        } catch {
            Write-Host "   ❌ Error: $($_.Exception.Message)" -ForegroundColor Red
        }
    }
}

Write-Host "`n🎉 Bulk processing completed!" -ForegroundColor Green
Write-Host "📊 Total individual files created: $totalCreated" -ForegroundColor Cyan
Write-Host "🔗 Navigation: Modules → Module → Side → Functions → Individual Function" -ForegroundColor White

Write-Host "`n✨ All modules have been successfully reorganized!" -ForegroundColor Green
Write-Host "💡 You can now build your Jekyll site to see the new navigation structure." -ForegroundColor White

Read-Host "`nPress Enter to exit"
