---
layout: default
title: "UpdateAppearanceBackup"
parent: Functions
grand_parent: Client
great_grand_parent: 👔 Clothing
nav_order: 1
---

# UpdateAppearanceBackup
{: .no_toc }

Updates the stored appearance backup data.

**Parameters:**
- `data` (table): Appearance data to store as backup

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local currentAppearance = Bridge.Clothing.GetAppearance(PlayerPedId())
Bridge.Clothing.UpdateAppearanceBackup(currentAppearance)
```