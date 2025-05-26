---
title: RestoreAppearance
parent: Server Functions
grand_parent: Clothing
nav_order: 5
---

## 🔹 RestoreAppearance

Restore a player's previous appearance.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Clothing.RestoreAppearance(src)
```
