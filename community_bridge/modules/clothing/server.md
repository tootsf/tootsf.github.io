---
layout: default
title: Server Functions
parent: Clothing
grand_parent: Modules
nav_order: 2
---

# Clothing Server
{: .no_toc }

The clothing server module provides functions for managing player appearance from the server-side.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Character Model Functions

### IsMale(src)

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

### GetAppearance(src)

Gets the complete appearance data for a player.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `table`: Appearance data containing model, components, and props

**Example:**
```lua
local src = source
local appearance = Bridge.Clothing.GetAppearance(src)
if appearance then
    print("Got appearance for player " .. src)
end
```

### SetAppearance(src, data)

Sets a player's appearance and stores their previous appearance as backup.

**Parameters:**
- `src` (number): Player server ID
- `data` (table): Appearance data in the format returned by GetAppearance

**Example:**
```lua
local src = source
local newAppearance = {
    components = {
        {component_id = 1, drawable = 5, texture = 0}, -- Mask
        {component_id = 4, drawable = 10, texture = 0}, -- Legs
        {component_id = 6, drawable = 1, texture = 0}, -- Shoes
    },
    props = {        {prop_id = 0, drawable = 8, texture = 0}, -- Hat
    }
}
Bridge.Clothing.SetAppearance(src, newAppearance)
```

### SetAppearanceExt(src, data)

Sets a player's appearance using gender-specific data. Automatically selects male or female appearance based on the player's current model.

**Parameters:**
- `src` (number): Player server ID
- `data` (table): Table containing separate male and female appearance data

**Returns:**
- `table|nil`: Updated appearance data or nil if failed

**Example:**
```lua
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

### RestoreAppearance(src)

Restores a player's previously stored appearance.

**Parameters:**
- `src` (number): Player server ID

**Example:**
```lua
local src = source
Bridge.Clothing.RestoreAppearance(src)
```

## Usage Examples

### Basic Appearance Management

```lua
-- Get player's current appearance
local Bridge = exports['community_bridge']:Bridge()
local src = source
local currentAppearance = Bridge.Clothing.GetAppearance(src)

-- Modify and apply new appearance
local newAppearance = {
    components = {
        {component_id = 1, drawable = 12, texture = 0}, -- Different mask
    }
}
Bridge.Clothing.SetAppearance(src, newAppearance)

-- Later restore original appearance
Bridge.Clothing.RestoreAppearance(src)
```

### Gender-Specific Outfits

```lua
-- Define outfit that works for both genders
local uniformOutfit = {
    male = {
        components = {
            {component_id = 3, drawable = 4, texture = 0}, -- Male torso
            {component_id = 4, drawable = 25, texture = 0}, -- Male legs
            {component_id = 6, drawable = 25, texture = 0}, -- Male shoes
        }
    },
    female = {
        components = {
            {component_id = 3, drawable = 6, texture = 0}, -- Female torso
            {component_id = 4, drawable = 35, texture = 0}, -- Female legs  
            {component_id = 6, drawable = 29, texture = 0}, -- Female shoes
        }
    }
}

-- Apply appropriate outfit based on player's gender
Bridge.Clothing.SetAppearanceExt(source, uniformOutfit)
```

## Note

This module is marked as incomplete in the source code. It provides basic server-side appearance management but may not include all advanced features. The module automatically stores the player's previous appearance when setting a new one, allowing for easy restoration.
