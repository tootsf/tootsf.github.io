---
layout: default
title: "Revert"
parent: Functions
grand_parent: Server
great_grand_parent: 👔 Clothing
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/clothing/server/functions/Revert/
---

# Revert
{: .no_toc }

Reverts a player's appearance to their backup appearance.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `boolean|nil`: Returns true if successful or nil if failed

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
Bridge.Clothing.Revert(src)
```

---