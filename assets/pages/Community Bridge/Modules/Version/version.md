# Version 🔄

<!--META
nav: true
toc: true
description: Automated version checking system that monitors GitHub releases and notifies administrators when updates are available. This module helps keep your Community Bridge installation up-to-date with the latest features and security improvements.
-->

Automated version checking system that monitors GitHub releases and notifies administrators when updates are available. This module helps keep your Community Bridge installation up-to-date with the latest features and security improvements.

## Overview

The Version provides functionality for FiveM resources.

## Server Functions

### VersionChecker

<!--TOC: VersionChecker-->

**Context:** 🖲️ Server

Compares the current resource version with the latest GitHub release and prints an update notification if a newer version is available. The version is extracted from the resource's fxmanifest.lua version field.

**Syntax:** `Bridge.Version.VersionChecker(repoPath, tebex)`

**Parameters:**
- `repoPath` (string) - GitHub repository path in format 'username/reponame'
- `tebex` (boolean|nil) - Optional flag for Tebex resources (shows CFX asset portal link instead of GitHub)

**Returns:**
- (nil) - No description provided

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
-- Check for Community Bridge updates
Bridge.Version.VersionChecker('The-Order-Of-The-Sacred-Framework/community_bridge', false)

-- Check for a Tebex resource
Bridge.Version.VersionChecker('myusername/my-premium-script', true)
```

## Usage Examples

### Basic Version Check

Basic usage for checking GitHub repository updates

```lua
local Bridge = exports['community_bridge']:Bridge()
-- This is automatically called for Community Bridge
Bridge.Version.VersionChecker('The-Order-Of-The-Sacred-Framework/community_bridge')
```

### Custom Resource Version Check

Check for updates on your own GitHub repository

```lua
local Bridge = exports['community_bridge']:Bridge()
-- Check your own resource for updates
Bridge.Version.VersionChecker('yourusername/your-resource-name', false)
```

### Tebex Resource Check

Version checking for Tebex-distributed premium resources

```lua
local Bridge = exports['community_bridge']:Bridge()
-- For paid/premium resources distributed via Tebex
Bridge.Version.VersionChecker('developer/premium-script', true)
```

### Automatic Check on Resource Start

How automatic version checking is implemented

```lua
-- This happens automatically in Community Bridge:
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    local Bridge = exports['community_bridge']:Bridge()
    Bridge.Version.VersionChecker('The-Order-Of-The-Sacred-Framework/community_bridge')
end)
```

