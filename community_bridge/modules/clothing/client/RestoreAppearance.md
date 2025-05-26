---
title: RestoreAppearance
parent: Client Functions
grand_parent: Clothing
nav_order: 4
---

## 🔹 RestoreAppearance

Restores the previously stored appearance for a ped entity.

**Parameters:**
- `entity` (number): The ped entity to restore appearance for

**Returns:**
- `boolean`: True if successful

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local ped = PlayerPedId()
Bridge.Clothing.RestoreAppearance(ped)
```
