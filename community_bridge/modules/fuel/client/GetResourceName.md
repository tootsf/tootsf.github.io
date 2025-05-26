---
layout: default
title: GetResourceName
parent: Client Functions
grand_parent: "⛽ Fuel"
nav_order: 1
---

# GetResourceName
{: .no_toc }

Gets the name of the fuel system currently being used.

## Syntax

```lua
function Fuel.GetResourceName()
```

## Returns

**Type:** `string`  

The fuel system name ("default", "ox_fuel", "ps-fuel", etc.)

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local fuelSystem = Bridge.Fuel.GetResourceName()
print("Using fuel system: " .. fuelSystem)
```
