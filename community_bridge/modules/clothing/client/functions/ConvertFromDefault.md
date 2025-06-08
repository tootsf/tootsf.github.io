---
layout: default
title: "ConvertFromDefault"
parent: Functions
grand_parent: Client
great_grand_parent: 👔 Clothing
nav_order: 1
permalink: /community_bridge/modules/clothing/client/functions/ConvertFromDefault/
nav_exclude: true
---

# ConvertFromDefault
{: .no_toc }

Converts appearance data from the default Bridge format to the specific clothing system format.

**Parameters:**
- `defaultClothing` (table): Appearance data in default Bridge format

**Returns:**
- `table`: Converted appearance data in system-specific format

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local defaultAppearance = {
    components = {
        {component_id = 1, drawable = 5, texture = 0},
        {component_id = 4, drawable = 10, texture = 0}
    },
    props = {
        {prop_id = 0, drawable = 8, texture = 0}
    }
}
local convertedAppearance = Bridge.Clothing.ConvertFromDefault(defaultAppearance)
```

---