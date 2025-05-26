---
title: SetAppearanceExt
parent: Server Functions
grand_parent: "👔 Clothing"
nav_order: 5
---

## 🔹 SetAppearanceExt

Sets a player's appearance using gender-specific data. Automatically selects male or female appearance based on the player's current model.

**Parameters:**
- `src` (number): Player server ID
- `data` (table): Table containing separate male and female appearance data

**Returns:**
- `table|nil`: Updated appearance data or nil if failed

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
local genderSpecificAppearance = {
    male = {
        components = {
            {component_id = 4, drawable = 10, texture = 0}, -- Male pants
            {component_id = 6, drawable = 1, texture = 0}, -- Male shoes
        }
    },
    female = {
        components = {
            {component_id = 4, drawable = 15, texture = 2}, -- Female pants
            {component_id = 6, drawable = 5, texture = 1}, -- Female shoes
        }
    }
}
Bridge.Clothing.SetAppearanceExt(src, genderSpecificAppearance)
```
