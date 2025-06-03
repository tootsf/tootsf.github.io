---
layout: default
title: "GetFrameworkName"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 2
permalink: /community_bridge/modules/framework/client/functions/GetFrameworkName/
---

# GetFrameworkName
{: .no_toc }

Returns the name of the currently active framework.

## Description

This function returns a string identifying which framework is currently running on the server (e.g., "qb-core", "es_extended", etc.).

## Usage

```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
```

## Returns

| Type | Description |
|------|-------------|
| `string` | The framework name ("qb-core", "es_extended", etc.) |

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print("Using framework: " .. frameworkName)
```

## Related Functions

- [IsFrameworkLoaded](../shared/IsFrameworkLoaded.md)
- [GetFrameworkType](../shared/GetFrameworkType.md)
