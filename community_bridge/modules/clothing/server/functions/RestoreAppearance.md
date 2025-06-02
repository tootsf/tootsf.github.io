---
layout: default
title: "RestoreAppearance"
parent: Functions
grand_parent: Server
great_grand_parent: 👔 Clothing
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/clothing/server/functions/RestoreAppearance/
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