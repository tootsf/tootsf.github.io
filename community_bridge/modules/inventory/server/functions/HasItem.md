---
layout: default
title: "HasItem"
parent: Functions
grand_parent: Server
great_grand_parent: "🎒 Inventory"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/HasItem/
---

# HasItem
{: .no_toc }

Server
{: .label .label-blue }

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

---
