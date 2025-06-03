---
layout: default
title: "SetAppearance"
parent: Functions
grand_parent: Server
great_grand_parent: 👔 Clothing
nav_order: 1
permalink: /community_bridge/modules/clothing/server/functions/SetAppearance/
---

# SetAppearance
{: .no_toc }

Sets a player's appearance and stores their previous appearance as backup.

**Parameters:**
- `src` (number): Player server ID
- `data` (table): Appearance data in the format returned by GetAppearance

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
local newAppearance = {
    components = {
        {component_id = 1, drawable = 5, texture = 0}, -- Mask
        {component_id = 4, drawable = 10, texture = 0}, -- Legs
        {component_id = 6, drawable = 1, texture = 0}, -- Shoes
    },
    props = {
        {prop_id = 0, drawable = 8, texture = 0}, -- Hat
    }
}
Bridge.Clothing.SetAppearance(src, newAppearance)
```

---