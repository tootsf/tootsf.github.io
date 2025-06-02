---
layout: default
title: "GetItemCount"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetItemCount/
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
