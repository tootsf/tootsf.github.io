---
layout: default
title: "ConvertToDefault"
parent: Clothing Functions
grand_parent: Client
great_grand_parent: 👔 Clothing
nav_order: 1
---

# ConvertToDefault
{: .no_toc }

Converts appearance data from the specific clothing system format to the default Bridge format.

**Parameters:**
- `systemClothing` (table): Appearance data in system-specific format

**Returns:**
- `table`: Converted appearance data in default Bridge format

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local systemAppearance = {
    -- System-specific format (varies by clothing system)
}
local defaultAppearance = Bridge.Clothing.ConvertToDefault(systemAppearance)
```

---