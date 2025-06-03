---
layout: default
title: "GetResourceName"
parent: Functions
grand_parent: Client
great_grand_parent: ⛽ Fuel
nav_order: 1
permalink: /community_bridge/modules/fuel/client/functions/GetResourceName/
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

---