---
title: RestoreAppearance
parent: Server Functions
grand_parent: "👔 Clothing"
nav_order: 3
---

## 🔹 RestoreAppearance

Restores a player's previously stored appearance.

**Parameters:**
- `src` (number): Player server ID

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
Bridge.Clothing.RestoreAppearance(src)
```
