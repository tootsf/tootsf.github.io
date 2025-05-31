---
layout: default
title: "StripPNG"
parent: Functions
grand_parent: Client
great_grand_parent: "🎒 Inventory"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/client/functions/StripPNG/
---

# StripPNG
{: .no_toc }

Client
{: .label .label-blue }

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
