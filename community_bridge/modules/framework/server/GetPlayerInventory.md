---
layout: default
title: GetPlayerInventory
parent: Server Functions
grand_parent: "🧩 Framework"
nav_order: 11
---

# GetPlayerInventory
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

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
