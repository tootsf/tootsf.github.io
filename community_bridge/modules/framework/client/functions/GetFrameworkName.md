---
layout: default
title: "GetFrameworkName"
parent: Framework Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
nav_order: 2
---

# GetFrameworkName
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
