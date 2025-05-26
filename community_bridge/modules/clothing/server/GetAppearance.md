---
title: GetAppearance
parent: Server Functions
grand_parent: Clothing
nav_order: 2
---

## 🔹 GetAppearance

Get appearance data for a player.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `table`: Appearance data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local appearance = Bridge.Clothing.GetAppearance(src)
```
