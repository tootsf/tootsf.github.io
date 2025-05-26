---
title: SetAppearance
parent: Server Functions
grand_parent: Clothing
nav_order: 3
---

## 🔹 SetAppearance

Set appearance for a player.

**Parameters:**
- `src` (number): Player server ID
- `data` (table): Appearance data

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Clothing.SetAppearance(src, skinData)
```
