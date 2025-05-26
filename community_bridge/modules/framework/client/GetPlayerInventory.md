---
layout: default
title: GetPlayerInventory
parent: Client Functions
grand_parent: "🧩 Framework"
nav_order: 16
---

# GetPlayerInventory
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's complete inventory.

## Syntax

```lua
function Framework.GetPlayerInventory()
```

## Returns

**table**  
Array of inventory items

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Framework.GetPlayerInventory()
for _, item in pairs(inventory) do
    print("Item: " .. item.label .. " (Count: " .. item.count .. ")")
end
```
