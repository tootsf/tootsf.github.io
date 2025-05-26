---
layout: default
title: HasItem
parent: Server Functions
grand_parent: "📦 Inventory"
nav_order: 4
---

# HasItem
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Checks if a player has an item.

## Syntax

```lua
function Inventory.HasItem(src, item, count)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

**count:** `number` (optional)  
Minimum amount required (defaults to 1)

## Returns

**boolean**  
True if player has the required amount of the item

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
if Bridge.Inventory.HasItem(playerId, "lockpick", 1) then
    -- Player has at least one lockpick
    TriggerClientEvent('lockpicking:start', playerId)
else
    TriggerClientEvent('notify', playerId, "You need a lockpick!", "error")
end
```
