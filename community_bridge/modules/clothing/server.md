---
layout: default
title: Server Functions
parent: "👔 Clothing"
grand_parent: Modules
nav_order: 2
permalink: /community_bridge/modules/clothing/server/
---

# Clothing Server Functions
{: .no_toc }

Server-side functions for managing player appearance and clothing.

---

## 🔹 GetAppearance

Gets the complete appearance data for a player.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `table`: Appearance data containing model, components, and props

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
local appearance = Bridge.Clothing.GetAppearance(src)
if appearance then
    print("Got appearance for player " .. src)
end
```

---

## 🔹 IsMale

Checks if a player's ped is using the male freemode model.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `boolean`: True if male model, false otherwise

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
local isMale = Bridge.Clothing.IsMale(src)
if isMale then
    print("Player " .. src .. " is using male model")
end
```

---

## 🔹 RestoreAppearance

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

## 🔹 SetAppearance

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

## 🔹 SetAppearanceExt

Sets a player's appearance using gender-specific data. Automatically selects male or female appearance based on the player's current model.

**Parameters:**
- `src` (number): Player server ID
- `data` (table): Table containing separate male and female appearance data

**Returns:**
- `table|nil`: Updated appearance data or nil if failed

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
local genderSpecificAppearance = {
    male = {
        components = {
            {component_id = 4, drawable = 10, texture = 0}, -- Male pants
            {component_id = 6, drawable = 1, texture = 0}, -- Male shoes
        }
    },
    female = {
        components = {
            {component_id = 4, drawable = 15, texture = 2}, -- Female pants
            {component_id = 6, drawable = 5, texture = 1}, -- Female shoes
        }
    }
}
Bridge.Clothing.SetAppearanceExt(src, genderSpecificAppearance)
```