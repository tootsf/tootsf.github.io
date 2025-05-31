---
layout: default
title: Functions
parent: Client
grand_parent: "👔 Clothing"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/clothing/client/functions/
has_children: true
---

# Clothing Client Functions
{: .no_toc }

Client-side functions for managing player appearance and clothing.

# Clothing Client Functions
{: .no_toc }

Client-side functions for managing player appearance and clothing.

---

## 🔹 CopyAppearanceToClipboard

Copies the current player's appearance data to the clipboard.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Clothing.CopyAppearanceToClipboard()
```

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

---

## 🔹 IsMale

Checks if the current player ped is using the male freemode model.

**Returns:**
- `boolean`: True if male model, false otherwise

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local isMale = Bridge.Clothing.IsMale()
if isMale then
    print("Player is using male model")
end
```

---

## 🔹 RestoreAppearance

Restores the previously stored appearance for a ped entity.

**Parameters:**
- `entity` (number): The ped entity to restore appearance for

**Returns:**
- `boolean`: True if successful

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local ped = PlayerPedId()
Bridge.Clothing.RestoreAppearance(ped)
```

---

## 🔹 SetAppearance

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

## 🔹 ToggleDebugging

Toggles clothing debugging mode which monitors and logs appearance changes.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Clothing.ToggleDebugging()
```

---

## 🔹 UpdateAppearanceBackup

Updates the stored appearance backup data.

**Parameters:**
- `data` (table): Appearance data to store as backup

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local currentAppearance = Bridge.Clothing.GetAppearance(PlayerPedId())
Bridge.Clothing.UpdateAppearanceBackup(currentAppearance)
```