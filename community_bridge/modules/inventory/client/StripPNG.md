---
layout: default
title: StripPNG
parent: Client Functions
grand_parent: "📦 Inventory"
nav_order: 7
---

# StripPNG
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Utility function to remove .png extension from item names.

## Syntax

```lua
function Inventory.StripPNG(item)
```

## Parameters

**item:** `string`  
Item name potentially with .png extension

## Returns

**string**  
Item name without .png extension

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local cleanName = Bridge.Inventory.StripPNG("water.png")
-- Returns: "water"
```
