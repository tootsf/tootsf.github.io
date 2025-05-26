---
layout: default
title: GetPlayerInventory
parent: Client Functions
grand_parent: "📦 Inventory"
nav_order: 4
---

# GetPlayerInventory

Returns the complete player inventory.

**Returns:**
- `table` – Array of inventory items with format {name, label, count, slot, metadata}

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Inventory.GetPlayerInventory()
for slot, item in pairs(inventory) do
    if item then
        print("Slot " .. slot .. ": " .. item.name .. " x" .. item.count)
    end
end
```
