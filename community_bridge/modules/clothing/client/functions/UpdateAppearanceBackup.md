---
layout: default
title: "UpdateAppearanceBackup"
parent: Functions
grand_parent: Client
great_grand_parent: "👔 Clothing"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/clothing/client/functions/UpdateAppearanceBackup/
---

# UpdateAppearanceBackup
{: .no_toc }

Client
{: .label .label-blue }

Updates the stored appearance backup data.

**Parameters:**
- `data` (table): Appearance data to store as backup

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local currentAppearance = Bridge.Clothing.GetAppearance(PlayerPedId())
Bridge.Clothing.UpdateAppearanceBackup(currentAppearance)
```
