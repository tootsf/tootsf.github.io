# JSON to Markdown Conversion Script for Community Bridge Documentation
# PowerShell version

function Convert-JsonToMarkdown {
    param(
        [string]$JsonFilePath,
        [string]$OutputDir,
        [string]$ModuleName
    )

    try {
        Write-Host "📄 Converting: $ModuleName" -ForegroundColor Green

        $jsonContent = Get-Content -Path $JsonFilePath -Raw -Encoding UTF8
        $moduleData = $jsonContent | ConvertFrom-Json

        $markdown = New-MarkdownContent -ModuleData $moduleData -ModuleName $ModuleName
        $outputPath = Join-Path $OutputDir "$($ModuleName.ToLower()).md"

        $markdown | Out-File -FilePath $outputPath -Encoding UTF8
        Write-Host "✅ Created: $outputPath" -ForegroundColor Green

        return $outputPath
    }
    catch {
        Write-Host "❌ Error converting ${ModuleName}: $($_.Exception.Message)" -ForegroundColor Red
        return $null
    }
}

function New-MarkdownContent {
    param(
        [PSCustomObject]$ModuleData,
        [string]$ModuleName
    )

    $icon = if ($ModuleData.icon) { $ModuleData.icon } else { "📦" }
    $description = if ($ModuleData.description) { $ModuleData.description } else { "" }

    $markdown = @"
# $($ModuleData.name ?? $ModuleName) $icon

<!--META
nav: true
toc: true
description: $description
-->

$description

## Overview

The $($ModuleData.name ?? $ModuleName) provides functionality for FiveM resources.

"@

    # Add client functions
    if ($ModuleData.clientFunctions -and $ModuleData.clientFunctions.Count -gt 0) {
        $markdown += "`n## Client Functions`n`n"
        foreach ($func in $ModuleData.clientFunctions) {
            $markdown += New-FunctionMarkdown -Function $func -Context "client"
        }
    }

    # Add server functions
    if ($ModuleData.serverFunctions -and $ModuleData.serverFunctions.Count -gt 0) {
        $markdown += "`n## Server Functions`n`n"
        foreach ($func in $ModuleData.serverFunctions) {
            $markdown += New-FunctionMarkdown -Function $func -Context "server"
        }
    }

    # Add shared functions
    if ($ModuleData.sharedFunctions -and $ModuleData.sharedFunctions.Count -gt 0) {
        $markdown += "`n## Shared Functions`n`n"
        foreach ($func in $ModuleData.sharedFunctions) {
            $markdown += New-FunctionMarkdown -Function $func -Context "shared"
        }
    }

    return $markdown
}

function New-FunctionMarkdown {
    param(
        [PSCustomObject]$Function,
        [string]$Context
    )

    $contextBadge = switch ($Context) {
        "client" { "🖥️ Client" }
        "server" { "🖲️ Server" }
        "shared" { "🔄 Shared" }
        default { "📦 Unknown" }
    }

    $markdown = @"
### $($Function.name)

<!--TOC: $($Function.name)-->

**Context:** $contextBadge

$($Function.description ?? "")

"@

    if ($Function.syntax) {
        $markdown += "**Syntax:** ``$($Function.syntax)```n`n"
    }

    # Add parameters
    if ($Function.parameters -and $Function.parameters.Count -gt 0) {
        $markdown += "**Parameters:**`n"
        foreach ($param in $Function.parameters) {
            $markdown += "- ``$($param.name)`` ($($param.type))"
            if ($param.description) {
                $markdown += " - $($param.description)"
            }
            $markdown += "`n"
        }
        $markdown += "`n"
    } else {
        $markdown += "**Parameters:** None`n`n"
    }

    # Add returns
    if ($Function.returns -and $Function.returns.Count -gt 0) {
        $markdown += "**Returns:**`n"
        foreach ($ret in $Function.returns) {
            $markdown += "- ($($ret.type))"
            if ($ret.description) {
                $markdown += " - $($ret.description)"
            }
            $markdown += "`n"
        }
        $markdown += "`n"
    } else {
        $markdown += "**Returns:** None`n`n"
    }

    # Add example
    if ($Function.example) {
        $markdown += "**Example:**`n``````lua`n$($Function.example)`n```````n`n"
    }

    return $markdown
}

function Convert-AllJsonFiles {
    Write-Host "🚀 Starting JSON to Markdown conversion..." -ForegroundColor Cyan

    $basePath = ".\assets\pages\Community Bridge"
    $processedFiles = @()
    $errors = @()

    # Convert Libraries
    $librariesPath = Join-Path $basePath "Libraries"
    if (Test-Path $librariesPath) {
        Write-Host "`n📁 Processing Libraries..." -ForegroundColor Yellow
        $libraryFolders = Get-ChildItem -Path $librariesPath -Directory

        foreach ($folder in $libraryFolders) {
            $jsonFile = Join-Path $folder.FullName "$($folder.Name.ToLower()).json"
            if (Test-Path $jsonFile) {
                $result = Convert-JsonToMarkdown -JsonFilePath $jsonFile -OutputDir $folder.FullName -ModuleName $folder.Name
                if ($result) {
                    $processedFiles += $result
                } else {
                    $errors += @{ File = $jsonFile; Error = "Conversion failed" }
                }
            }
        }
    }

    # Convert Modules
    $modulesPath = Join-Path $basePath "Modules"
    if (Test-Path $modulesPath) {
        Write-Host "`n📁 Processing Modules..." -ForegroundColor Yellow
        $moduleFolders = Get-ChildItem -Path $modulesPath -Directory

        foreach ($folder in $moduleFolders) {
            $jsonFile = Join-Path $folder.FullName "$($folder.Name.ToLower()).json"
            if (Test-Path $jsonFile) {
                $result = Convert-JsonToMarkdown -JsonFilePath $jsonFile -OutputDir $folder.FullName -ModuleName $folder.Name
                if ($result) {
                    $processedFiles += $result
                } else {
                    $errors += @{ File = $jsonFile; Error = "Conversion failed" }
                }
            }
        }
    }

    # Print summary
    Write-Host "`n📊 Conversion Summary:" -ForegroundColor Cyan
    Write-Host "✅ Successfully converted: $($processedFiles.Count) files" -ForegroundColor Green

    if ($errors.Count -gt 0) {
        Write-Host "❌ Errors encountered: $($errors.Count)" -ForegroundColor Red
        foreach ($conversionError in $errors) {
            Write-Host "   - $($conversionError.File): $($conversionError.Error)" -ForegroundColor Red
        }
    }

    Write-Host "`n📁 Generated files:" -ForegroundColor Cyan
    foreach ($file in $processedFiles) {
        Write-Host "   - $file" -ForegroundColor White
    }

    Write-Host "`n🎉 Conversion complete!" -ForegroundColor Green
}

# Run the conversion
Convert-AllJsonFiles
