---
title: GetAppearance
parent: Server Functions
grand_parent: Clothing
nav_order: 1
---

## 🔹 GetAppearance

Gets the complete appearance data for a player.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `table`: Appearance data containing model, components, and props

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
local appearance = Bridge.Clothing.GetAppearance(src)
if appearance then
    print("Got appearance for player " .. src)
end
```
