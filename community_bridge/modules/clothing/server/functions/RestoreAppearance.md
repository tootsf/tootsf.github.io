---
layout: default
title: "RestoreAppearance"
parent: Functions
grand_parent: Server
great_grand_parent: 👔 Clothing
nav_order: 1
permalink: /community_bridge/modules/clothing/server/functions/RestoreAppearance/
nav_exclude: true
---

# RestoreAppearance
{: .no_toc }

Restores a player's previously stored appearance.

**Parameters:**
- `src` (number): Player server ID

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
Bridge.Clothing.RestoreAppearance(src)
```

---