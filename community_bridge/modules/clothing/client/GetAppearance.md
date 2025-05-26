---
title: GetAppearance
parent: Client Functions
grand_parent: Clothing
nav_order: 2
---

## 🔹 GetAppearance

Gets the complete appearance data for a ped entity.

**Parameters:**
- `entity` (number): The ped entity to get appearance from

**Returns:**
- `table`: Appearance data containing model, components, and props

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local ped = PlayerPedId()
local appearance = Bridge.Clothing.GetAppearance(ped)
print(json.encode(appearance))
```

**Return Structure:**
```lua
{
    model = 1885233650, -- Entity model hash
    components = {
        {component_id = 0, drawable = 1, texture = 0},
        -- ... more components (0-11)
    },
    props = {
        {prop_id = 0, drawable = -1, texture = -1},
        -- ... more props (0-13)  
    }
}
```
