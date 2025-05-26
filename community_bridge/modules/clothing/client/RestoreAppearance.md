---
title: RestoreAppearance
parent: Client Functions
grand_parent: Clothing
nav_order: 4
---

## 🔹 RestoreAppearance

Restore previously stored appearance.

**Parameters:**
- `entity` (number): Ped entity ID

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Clothing.RestoreAppearance(PlayerPedId())
```
