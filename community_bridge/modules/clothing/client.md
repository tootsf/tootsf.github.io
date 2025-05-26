---
layout: default
title: Client Functions
parent: Clothing
grand_parent: Modules
nav_order: 1
---

# Clothing Client
{: .no_toc }

The clothing client module provides functions for managing player appearance and clothing on the client-side.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Character Model Functions

### IsMale()

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

### GetAppearance(entity)

Gets the complete appearance data for a ped entity.

**Parameters:**
- `entity` (number): The ped entity to get appearance from

**Returns:**
- `table`: Appearance data containing model, components, and props

**Example:**
```lua
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

### SetAppearance(entity, skinData)

Applies appearance data to a ped entity.

**Parameters:**
- `entity` (number): The ped entity to apply appearance to
- `skinData` (table): Appearance data in the format returned by GetAppearance

**Returns:**
- `boolean`: True if successful

**Example:**
```lua
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

### RestoreAppearance(entity)

Restores the previously stored appearance for a ped entity.

**Parameters:**
- `entity` (number): The ped entity to restore appearance for

**Returns:**
- `boolean`: True if successful

**Example:**
```lua
local ped = PlayerPedId()
Bridge.Clothing.RestoreAppearance(ped)
```

### UpdateAppearanceBackup(data)

Updates the stored appearance backup data.

**Parameters:**
- `data` (table): Appearance data to store as backup

**Example:**
```lua
local currentAppearance = Bridge.Clothing.GetAppearance(PlayerPedId())
Bridge.Clothing.UpdateAppearanceBackup(currentAppearance)
```

### CopyAppearanceToClipboard()

Copies the current player's appearance data to the clipboard.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Clothing.CopyAppearanceToClipboard()
```

### ToggleDebugging()

Toggles clothing debugging mode which monitors and logs appearance changes.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Clothing.ToggleDebugging()
```

## Events

### community_bridge:client:SetAppearance

Triggered from server to set a player's appearance.

```lua
RegisterNetEvent('community_bridge:client:SetAppearance', function(data)
    -- Automatically handled by the module
end)
```

### community_bridge:client:RestoreAppearance  

Triggered from server to restore a player's appearance.

```lua
RegisterNetEvent('community_bridge:client:RestoreAppearance', function()
    -- Automatically handled by the module
end)
```

## Commands

### /clothing:enabledebug

Toggles clothing debugging mode.

### /clothing:copy

Copies current appearance to clipboard.

## Component IDs

| ID | Component |
|----|-----------|
| 0  | Face |
| 1  | Mask |
| 2  | Hair |
| 3  | Torso |
| 4  | Leg |
| 5  | Parachute / bag |
| 6  | Shoes |
| 7  | Accessory |
| 8  | Undershirt |
| 9  | Kevlar |
| 10 | Badge |
| 11 | Torso 2 |

## Prop IDs

| ID | Prop |
|----|------|
| 0  | Hat |
| 1  | Glasses |
| 2  | Earrings |
| 6  | Watch |
| 7  | Bracelet |
