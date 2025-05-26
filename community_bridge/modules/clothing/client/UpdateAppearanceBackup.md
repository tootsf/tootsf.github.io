---
title: UpdateAppearanceBackup
parent: Client Functions
grand_parent: Clothing
nav_order: 7
---

## 🔹 UpdateAppearanceBackup

Updates the stored appearance backup data.

**Parameters:**
- `data` (table): Appearance data to store as backup

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local currentAppearance = Bridge.Clothing.GetAppearance(PlayerPedId())
Bridge.Clothing.UpdateAppearanceBackup(currentAppearance)
```
