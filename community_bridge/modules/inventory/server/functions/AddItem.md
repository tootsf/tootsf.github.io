---
layout: default
title: "AddItem"
parent: Inventory Functions
grand_parent: Server
great_grand_parent: 🎒 Inventory
nav_order: 1
---

# AddItem
Adds an item to a player's inventory.

## Syntax

```lua
function Inventory.AddItem(src, item, count, slot, metadata)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

**count:** `number`  
Amount to add

**slot:** `number` (optional)  
Specific inventory slot

**metadata:** `table` (optional)  
Item metadata

## Returns

**boolean**  
Success status

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
local success = Bridge.Inventory.AddItem(playerId, "water", 5)
if success then
    TriggerClientEvent('notify', playerId, "Added 5 water bottles")
else
    TriggerClientEvent('notify', playerId, "Inventory full!", "error")
end
```

---