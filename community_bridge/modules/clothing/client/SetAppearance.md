---
title: SetAppearance
parent: Client Functions
grand_parent: Clothing
nav_order: 3
---

## 🔹 SetAppearance

Apply appearance data to a ped.

**Parameters:**
- `entity` (number): Ped entity ID
- `skinData` (table): Appearance data

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Clothing.SetAppearance(PlayerPedId(), skinData)
```
