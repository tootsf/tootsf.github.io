---
layout: default
title: GetItemCount
parent: Client Functions
grand_parent: "🧩 Framework"
nav_order: 15
---

# GetItemCount
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

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
