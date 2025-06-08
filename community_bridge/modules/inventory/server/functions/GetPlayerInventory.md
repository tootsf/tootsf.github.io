---
layout: default
title: "GetPlayerInventory"
parent: Functions
grand_parent: Server
great_grand_parent: 🎒 Inventory
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/GetPlayerInventory/
nav_exclude: true
---

# GetPlayerInventory
{: .no_toc }

Gets a player's complete inventory.

## Syntax

```lua
function Inventory.GetPlayerInventory(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**table**  
Array of inventory items with format {name, label, count, slot, metadata}

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
local inventory = Bridge.Inventory.GetPlayerInventory(playerId)

for slot, item in pairs(inventory) do
    if item then
        print("Player " .. playerId .. " has " .. item.name .. " x" .. item.count .. " in slot " .. slot)
    end
end
```

---