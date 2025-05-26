---
layout: default
title: Version
parent: Modules
grand_parent: Community Bridge
nav_order: 22
has_children: true
permalink: /community_bridge/modules/version/
---

# Version Module
{: .no_toc }

The Version module provides automatic version checking functionality for FiveM resources. It compares the current resource version against the latest GitHub release and notifies administrators when updates are available.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## 📚 Overview
---

The Version module offers:

- **Automatic Updates Check**: Compares local version with GitHub releases
- **GitHub API Integration**: Fetches latest release information from GitHub
- **Resource Metadata**: Uses FiveM resource metadata for version detection
- **Console Notifications**: Clear update notifications in server console
- **Tebex Support**: Special handling for escrowed resources
- **Startup Integration**: Automatic version check on resource start

## 📚 Available Functions
---

### Server Functions
- `Bridge.Version.VersionChecker()` - Check for updates against GitHub repository

## 📚 Module Structure
---

```
version/
└── server/
    └── VersionChecker.lua    # Version checking implementation
```

## Automatic Behavior

The module automatically:
1. Runs version check when the resource starts
2. Compares current version with latest GitHub release
3. Displays update notification if newer version is available
4. Handles both regular and Tebex (escrowed) resources

## Usage Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Check for updates on resource start (automatic)
-- Manual version check
Bridge.Version.VersionChecker("YourUsername/your-resource-name", false)

-- For Tebex resources
Bridge.Version.VersionChecker("YourUsername/your-resource-name", true)
```

## Version Format

The module expects semantic versioning format: `MAJOR.MINOR.PATCH` (e.g., `1.2.3`)

## GitHub Integration

- Uses GitHub API to fetch latest release information
- Compares tag_name from releases with local resource version
- Supports both public and private repositories (with appropriate access)
- Handles API rate limiting gracefully
