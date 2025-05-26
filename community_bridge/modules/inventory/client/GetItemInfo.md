---
layout: default
title: GetItemInfo
parent: Client Functions
grand_parent: "📦 Inventory"
nav_order: 1
---

# GetItemInfo

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
