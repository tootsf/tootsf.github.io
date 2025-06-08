---
layout: default
title: "Save"
parent: Functions
grand_parent: Server
great_grand_parent: 👔 Clothing
nav_order: 1
permalink: /community_bridge/modules/clothing/server/functions/Save/
nav_exclude: true
---

# Save
{: .no_toc }

Saves a player's current appearance to the database.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `boolean`: True if successful

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
Bridge.Clothing.Save(src)
```

---