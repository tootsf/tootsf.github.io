---
layout: default
title: Server
parent: Version
grand_parent: Modules
nav_order: 1
---

# Server Functions
{: .no_toc }

Server-side functions for automatic version checking and update notifications.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Version.VersionChecker

Checks for updates by comparing the current resource version against the latest GitHub release.

### Syntax

```lua
Version.VersionChecker(repoPath, tebex)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `repoPath` | `string` | GitHub repository path in format "username/reponame" |
| `tebex` | `boolean` or `nil` | Optional. `true` for Tebex escrowed resources, `false` or `nil` for regular resources |

### Returns

| Type | Description |
|------|-------------|
| `nil` | Function outputs directly to console |

### Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Check for updates on a regular GitHub repository
Bridge.Version.VersionChecker("YourUsername/your-resource-name", false)

-- Check for updates on a Tebex escrowed resource
Bridge.Version.VersionChecker("YourUsername/your-resource-name", true)

-- Default usage (tebex parameter optional)
Bridge.Version.VersionChecker("The-Order-Of-The-Sacred-Framework/community_bridge")
```

### Function Behavior

1. **Repository Validation**: Parses and validates the repository path format
2. **Version Extraction**: Gets current version from resource metadata using semantic versioning
3. **API Request**: Fetches latest release information from GitHub API
4. **Version Comparison**: Compares current version with latest release
5. **Notification**: Displays update message if newer version is available

### Version Requirements

- Resource must have a `version` field in `fxmanifest.lua`
- Version must follow semantic versioning: `MAJOR.MINOR.PATCH` (e.g., `1.2.3`)
- GitHub repository must have releases with version tags

### Example Manifest

```lua
fx_version 'cerulean'
game 'gta5'

version '1.2.3'

-- ... rest of manifest
```

### Console Output

When an update is available:

```
An update is available for your-resource-name (current version: 1.2.3)
 - Please download the latest version from https://github.com/username/repo/releases/latest
```

For Tebex resources:

```
An update is available for your-resource-name (current version: 1.2.3)
 - Please download the latest version from https://portal.cfx.re/assets/granted-assets
```

### Error Handling

The function handles various error conditions:

- **Invalid Repository Format**: Returns error if repository path is malformed
- **Missing Version**: Silently returns if resource has no version metadata
- **API Failure**: Silently returns if GitHub API request fails
- **Up to Date**: No output if current version is latest or newer

### Example Error Cases

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Invalid format - will show error
Bridge.Version.VersionChecker("invalid-format")

-- Valid format - will check for updates
Bridge.Version.VersionChecker("username/repository-name")
```

## Automatic Integration

The module automatically runs version checking on resource startup:

```lua
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    local Bridge = exports['community_bridge']:Bridge()
    Bridge.Version.VersionChecker("The-Order-Of-The-Sacred-Framework/community_bridge")
end)
```

### Customization

To use automatic version checking in your own resource:

1. Include the version module in your resource
2. Update the repository path in the `onResourceStart` handler
3. Ensure your resource has proper version metadata

### Example Integration

```lua
-- In your resource's version checking file
AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then return end
    Version.VersionChecker("YourUsername/YourResourceName", false)
end)
```

## API Details

### GitHub API Endpoint

The function uses: `https://api.github.com/repos/{username}/{reponame}/releases/latest`

### Rate Limiting

- GitHub API has rate limits for unauthenticated requests
- Function handles failures gracefully without blocking resource startup
- Recommended to check for updates sparingly (startup only)

### Security Notes

- Uses HTTP requests to public GitHub API
- No authentication required for public repositories
- Safe to use in production environments
- Does not modify any files or perform automatic updates
