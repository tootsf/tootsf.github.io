---
layout: default
title: "RemoveItem"
parent: Functions
grand_parent: Server
great_grand_parent: 🎒 Inventory
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/RemoveItem/
---

# RemoveItem
{: .no_toc }

Removes an item from a player's inventory.

## Syntax

```lua
function Inventory.RemoveItem(src, item, count, slot, metadata)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

**count:** `number`  
Amount to remove

**slot:** `number` (optional)  
Specific inventory slot

**metadata:** `table` (optional)  
Item metadata for matching

## Returns

**boolean**  
Success status

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
if Bridge.Inventory.RemoveItem(playerId, "burger", 1) then
    -- Player consumed burger, restore health
    TriggerClientEvent('hospital:heal', playerId, 25)
else
    TriggerClientEvent('notify', playerId, "You don't have a burger!", "error")
end
```

---