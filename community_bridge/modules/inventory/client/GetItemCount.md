---
layout: default
title: GetItemCount
parent: Client Functions
grand_parent: "📦 Inventory"
nav_order: 2
---

# GetItemCount

Returns the count of a specific item in the player's inventory.

**Parameters:**
- `item` (string) – Name of the item

**Returns:**
- `number` – Count of the item (0 if not found)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local waterCount = Bridge.Inventory.GetItemCount("water")
print("Player has " .. waterCount .. " water bottles")
```
