---
layout: default
title: GetItemCount
parent: Server Functions
grand_parent: "📦 Inventory"
nav_order: 3
---

# GetItemCount
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets the count of an item in a player's inventory.

## Syntax

```lua
function Inventory.GetItemCount(src, item)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

## Returns

**number**  
Count of the item (0 if not found)

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
local waterCount = Bridge.Inventory.GetItemCount(playerId, "water")

if waterCount >= 5 then
    TriggerClientEvent('notify', playerId, "You have " .. waterCount .. " water bottles")
else
    TriggerClientEvent('notify', playerId, "You need more water bottles")
end
```
