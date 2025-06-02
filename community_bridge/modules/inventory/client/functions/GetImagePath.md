---
layout: default
title: "GetImagePath"
parent: Functions
grand_parent: Client
great_grand_parent: "🎒 Inventory"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/client/functions/GetImagePath/
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
