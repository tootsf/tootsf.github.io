---
layout: default
title: HasItem
parent: Client Functions
grand_parent: "📦 Inventory"
nav_order: 3
---

# HasItem

Checks if the player has a specific item in their inventory.

**Parameters:**
- `item` (string) – Name of the item

**Returns:**
- `boolean` – True if the player has the item

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Inventory.HasItem("driver_license") then
    -- Player can drive
    print("Player has a valid driver's license")
else
    -- Player cannot drive
    TriggerEvent('notify', "You need a driver's license to drive!")
end
```
