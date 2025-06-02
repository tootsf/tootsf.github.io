---
layout: default
title: "GetPlayerInventory"
parent: Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/GetPlayerInventory/
---

# GetPlayerInventory
{: .no_toc }

Returns the entire inventory of the player as a table.

## Syntax

```lua
function Framework.GetPlayerInventory(src)
```

## Parameters

**src:** `number`
Player server ID

## Returns

**table**
Array of inventory items

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local inventory = Bridge.Framework.GetPlayerInventory(source)
for _, item in pairs(inventory) do
    print(item.name .. " x" .. item.count)
end
```

---