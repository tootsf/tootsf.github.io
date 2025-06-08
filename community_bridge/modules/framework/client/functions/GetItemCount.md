---
layout: default
title: "GetItemCount"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
nav_order: 4
permalink: /community_bridge/modules/framework/client/functions/GetItemCount/
nav_exclude: true
---

# GetItemCount
{: .no_toc }

Gets the total count of a specific item in player inventory.

## Syntax

```lua
function Framework.GetItemCount(item)
```

## Parameters

**item:** `string`
Item name

## Returns

**number**
Total item count

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local breadCount = Bridge.Framework.GetItemCount("bread")
print("Player has " .. breadCount .. " bread")
```
