---
layout: default
title: "SetAppearance"
parent: Functions
grand_parent: Client
great_grand_parent: 👔 Clothing
nav_order: 1
permalink: /community_bridge/modules/clothing/client/functions/SetAppearance/
nav_exclude: true
---

# SetAppearance
{: .no_toc }

Applies appearance data to a ped entity.

**Parameters:**
- `entity` (number): The ped entity to apply appearance to
- `skinData` (table): Appearance data in the format returned by GetAppearance

**Returns:**
- `boolean`: True if successful

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local ped = PlayerPedId()
local appearance = {
    components = {
        {component_id = 1, drawable = 5, texture = 0}, -- Mask
        {component_id = 3, drawable = 15, texture = 0}, -- Arms
        {component_id = 4, drawable = 10, texture = 0}, -- Legs
        {component_id = 6, drawable = 1, texture = 0}, -- Shoes
        {component_id = 8, drawable = 15, texture = 0}, -- Undershirt
        {component_id = 11, drawable = 15, texture = 0}, -- Torso
    },
    props = {
        {prop_id = 0, drawable = 8, texture = 0}, -- Hat
    }
}
Bridge.Clothing.SetAppearance(ped, appearance)
```

---