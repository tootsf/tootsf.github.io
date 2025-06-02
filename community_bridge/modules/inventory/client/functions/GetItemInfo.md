---
layout: default
title: "GetItemInfo"
parent: Functions
grand_parent: Client
great_grand_parent: "🎒 Inventory"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/client/functions/GetItemInfo/
---

# GetItemInfo
{: .no_toc }

Returns detailed information about an item.

**Parameters:**
- `item` (string) – Name of the item

**Returns:**
- `table` – Item data containing name, label, stack, weight, description, image

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local itemInfo = Bridge.Inventory.GetItemInfo("water")
if itemInfo then
    print("Item: " .. itemInfo.label .. " - Weight: " .. itemInfo.weight)
    local imageUrl = itemInfo.image or "default_placeholder.png"
end
```
