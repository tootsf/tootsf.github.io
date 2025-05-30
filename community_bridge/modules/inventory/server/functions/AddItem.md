---
layout: default
title: "AddItem"
parent: Functions
grand_parent: Server
great_grand_parent: "🎒 Inventory"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/AddItem/
---

# AddItem
{: .no_toc }

Server
{: .label .label-blue }

# AddItem
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

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
