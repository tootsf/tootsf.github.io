---
layout: default
title: GetImagePath
parent: Client Functions
grand_parent: Inventory
nav_order: 5
---

# GetImagePath

Gets the image path for an item.

**Parameters:**
- `item` (string) – Name of the item

**Returns:**
- `string` – Image path or URL

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local imagePath = Bridge.Inventory.GetImagePath("water")
-- Returns system-specific path like "nui://ox_inventory/web/images/water.png"

SendNUIMessage({
    action = "showItem",
    image = imagePath,
    name = "Water Bottle"
})
```
