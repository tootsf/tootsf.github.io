# PowerShell script to create individual function files

$BaseDir = "c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io"
$ModulesDir = Join-Path $BaseDir "community_bridge\modules"

Write-Host "🚀 Creating individual function files for all modules..." -ForegroundColor Green

# Get list of modules
$Modules = Get-ChildItem -Path $ModulesDir -Directory | Where-Object { $_.Name -ne "index.md" }

$TotalFunctionsCreated = 0

foreach ($Module in $Modules) {
    Write-Host ""
    Write-Host "📁 Processing module: $($Module.Name)" -ForegroundColor Cyan

    # Process each side (client, server, shared)
    foreach ($Side in @("client", "server", "shared")) {
        $FunctionsFile = Join-Path $Module.FullName "$Side\functions.md"

        if (-not (Test-Path $FunctionsFile)) {
            continue
        }

        Write-Host "   📖 Processing $Side/functions.md" -ForegroundColor Yellow

        # Read the file content
        $Content = Get-Content -Path $FunctionsFile -Raw -Encoding UTF8

        # Extract frontmatter
        if ($Content -match '^---\s*\n(.*?)\n---\s*\n(.*)$') {
            $Frontmatter = $Matches[1]
            $MainContent = $Matches[2]

            # Parse frontmatter
            $GrandParent = ""
            $ParentTitle = ""

            foreach ($Line in $Frontmatter -split '\n') {
                if ($Line -match '^grand_parent:\s*"?([^"]*)"?$') {
                    $GrandParent = $Matches[1]
                }
                if ($Line -match '^parent:\s*"?([^"]*)"?$') {
                    $ParentTitle = $Matches[1]
                }
            }

            # Find all functions using regex
            $FunctionMatches = [regex]::Matches($MainContent, '## 🔹 ([^\n]+)(.*?)(?=## 🔹 |$)', [System.Text.RegularExpressions.RegexOptions]::Singleline)

            if ($FunctionMatches.Count -eq 0) {
                Write-Host "   ⏭️  No functions found in $Side/functions.md" -ForegroundColor Gray
                continue
            }

            Write-Host "   🔍 Found $($FunctionMatches.Count) functions" -ForegroundColor Green

            # Create functions subdirectory
            $FunctionsDir = Join-Path $Module.FullName "$Side\functions"
            if (-not (Test-Path $FunctionsDir)) {
                New-Item -Path $FunctionsDir -ItemType Directory -Force | Out-Null
            }

            $CreatedFiles = @()

            foreach ($Match in $FunctionMatches) {
                $FuncName = $Match.Groups[1].Value.Trim()
                $FuncContent = $Match.Groups[2].Value.Trim()

                if ([string]::IsNullOrWhiteSpace($FuncContent)) {
                    continue
                }

                # Clean function name for filename
                $SafeFuncName = $FuncName -replace '[<>:"/\\|?*]', ''
                $FuncFilename = "$SafeFuncName.md"
                $FuncFilepath = Join-Path $FunctionsDir $FuncFilename

                # Create frontmatter for individual function
                $FuncFrontmatter = @"
---
layout: default
title: "$FuncName"
parent: Functions
grand_parent: $ParentTitle
great_grand_parent: $GrandParent
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/$($Module.Name)/$Side/functions/$SafeFuncName/
---

"@

                # Clean up the function content - remove duplicate headers
                $CleanedContent = $FuncContent -replace "^# $([regex]::Escape($FuncName))\n.*?\n\n", "", "Singleline"

                # Add the function header
                $FuncHeader = "# $FuncName`n{: .no_toc }`n`n"

                # Complete file content
                $FullContent = $FuncFrontmatter + $FuncHeader + $CleanedContent

                # Write the file
                try {
                    Set-Content -Path $FuncFilepath -Value $FullContent -Encoding UTF8
                    $CreatedFiles += $FuncFilename
                    $TotalFunctionsCreated++
                } catch {
                    Write-Host "   ❌ Error writing $FuncFilename`: $_" -ForegroundColor Red
                }
            }

            Write-Host "   ✅ Created $($CreatedFiles.Count) function files" -ForegroundColor Green

            # Update the main functions.md to be a container page
            $ContainerFrontmatter = @"
---
layout: default
title: Functions
parent: $ParentTitle
grand_parent: $GrandParent
great_grand_parent: Modules
has_children: true
nav_order: 1
permalink: /community_bridge/modules/$($Module.Name)/$Side/functions/
---

# $($Side.Substring(0,1).ToUpper() + $Side.Substring(1)) Functions
{: .no_toc }

$($Side.Substring(0,1).ToUpper() + $Side.Substring(1))-side functions for the $($Module.Name) module.

## Available Functions

"@

            # Add links to all functions
            foreach ($Match in $FunctionMatches) {
                $FuncName = $Match.Groups[1].Value.Trim()
                if (-not [string]::IsNullOrWhiteSpace($FuncName)) {
                    $SafeFuncName = $FuncName -replace '[<>:"/\\|?*]', ''
                    $ContainerFrontmatter += "- [$FuncName]($SafeFuncName)`n"
                }
            }

            # Write updated functions.md
            try {
                Set-Content -Path $FunctionsFile -Value $ContainerFrontmatter -Encoding UTF8
                Write-Host "   📝 Updated $Side/functions.md to be a container page" -ForegroundColor Green
            } catch {
                Write-Host "   ❌ Error updating $Side/functions.md`: $_" -ForegroundColor Red
            }
        }
    }
}

Write-Host ""
Write-Host "🎉 Created $TotalFunctionsCreated individual function files!" -ForegroundColor Green
