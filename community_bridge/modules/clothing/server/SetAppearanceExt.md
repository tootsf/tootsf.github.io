---
title: SetAppearanceExt
parent: Server Functions
grand_parent: Clothing
nav_order: 4
---

## 🔹 SetAppearanceExt

Set appearance with gender-specific data.

**Parameters:**
- `src` (number): Player server ID
- `data` (table): Appearance data

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Clothing.SetAppearanceExt(src, skinData)
```
