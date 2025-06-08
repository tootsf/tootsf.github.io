---
layout: default
title: "GetImagePath"
parent: Functions
grand_parent: Client
great_grand_parent: "🎒 Inventory"
nav_order: 1
permalink: /community_bridge/modules/inventory/client/functions/GetImagePath/
nav_exclude: true
---

# GetImagePath
{: .no_toc }

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
