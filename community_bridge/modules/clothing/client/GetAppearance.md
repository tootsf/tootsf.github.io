---
title: GetAppearance
parent: Client Functions
grand_parent: Clothing
nav_order: 2
---

## 🔹 GetAppearance

Get appearance data for a ped.

**Parameters:**
- `entity` (number): Ped entity ID

**Returns:**
- `table`: Appearance data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local appearance = Bridge.Clothing.GetAppearance(PlayerPedId())
```
