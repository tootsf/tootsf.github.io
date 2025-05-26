---
layout: default
title: Client Functions
parent: Target
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 1
has_children: true
permalink: /community_bridge/modules/target/client/
---

# Target Module - Client Functions
{: .no_toc }

Client-side functions for creating and managing target interactions.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Core Target Functions

---

## 🔹 AddTargetEntity

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Target.AddTargetEntity(entity, options)
```

Adds targeting interaction to a specific entity.

**Parameters:**
- `entity` (number): Entity handle
- `options` (table): Target configuration
  - `name` (string): Unique identifier
  - `icon` (string): Font Awesome icon
  - `label` (string): Display text
  - `action` (function): Callback function
  - `distance` (number, optional): Interaction distance (default: 2.0)
  - `canInteract` (function, optional): Conditional function

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Add target to a vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)

Bridge.Target.AddTargetEntity(vehicle, {
    name = "vehicle_options",
    icon = "fas fa-car",
    label = "Vehicle Options",
    distance = 3.0,
    action = function(entity)
        -- Open vehicle menu
        TriggerEvent('vehicle:openMenu', entity)
    end,
    canInteract = function(entity)
        -- Only if player owns the vehicle
        return Bridge.Target.IsVehicleOwned(entity)
    end
})
```

---

## 🔹 AddTargetModel

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Target.AddTargetModel(models, options)
```

Adds targeting interaction to specific entity models.

**Parameters:**
- `models` (table|string): Model name(s) or hash(es)
- `options` (table): Target configuration (same as AddTargetEntity)

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Target ATM models
Bridge.Target.AddTargetModel({
    "prop_atm_01", 
    "prop_atm_02", 
    "prop_atm_03"
}, {
    name = "use_atm",
    icon = "fas fa-credit-card",
    label = "Use ATM",
    distance = 1.5,
    action = function(entity)
        TriggerEvent('banking:openATM')
    end
})
```

---

## 🔹 AddTargetCoords

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Target.AddTargetCoords(coords, options)
```

Adds targeting interaction at specific coordinates.

**Parameters:**
- `coords` (vector3): Target coordinates
- `options` (table): Target configuration plus:
  - `size` (vector3, optional): Target zone size (default: vector3(1.0, 1.0, 1.0))
  - `rotation` (number, optional): Zone rotation (default: 0.0)
  - `debugPoly` (boolean, optional): Show debug outline

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create target zone at coordinates
Bridge.Target.AddTargetCoords(vector3(195.0, -933.0, 30.0), {
    name = "clothing_store",
    icon = "fas fa-tshirt",
    label = "Browse Clothing",
    size = vector3(2.0, 2.0, 2.0),
    rotation = 45.0,
    action = function()
        TriggerEvent('clothing:openShop')
    end
})
```

---

## 🔹 AddTargetZone

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Target.AddTargetZone(name, coords, width, length, options)
```

Adds a rectangular target zone.

**Parameters:**
- `name` (string): Unique zone identifier
- `coords` (vector3): Center coordinates
- `width` (number): Zone width
- `length` (number): Zone length
- `options` (table): Target configuration plus:
  - `heading` (number, optional): Zone heading
  - `minZ` (number, optional): Minimum Z coordinate
  - `maxZ` (number, optional): Maximum Z coordinate

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Create parking zone
Bridge.Target.AddTargetZone("parking_lot", vector3(200.0, -800.0, 31.0), 10.0, 15.0, {
    name = "park_vehicle",
    icon = "fas fa-parking",
    label = "Park Vehicle",
    heading = 0.0,
    minZ = 30.0,
    maxZ = 32.0,
    action = function()
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        if vehicle ~= 0 then
            TriggerServerEvent('parking:saveVehicle', vehicle)
        end
    end,
    canInteract = function()
        return IsPedInAnyVehicle(PlayerPedId(), false)
    end
})
```

## Management Functions

### `Bridge.Target.RemoveTargetEntity(entity, name)`

Removes targeting from a specific entity.

**Parameters:**
- `entity` (number): Entity handle
- `name` (string, optional): Specific target name to remove

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove specific target
Bridge.Target.RemoveTargetEntity(vehicle, "vehicle_options")

-- Remove all targets from entity
Bridge.Target.RemoveTargetEntity(vehicle)
```

---

## 🔹 RemoveTargetModel

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Target.RemoveTargetModel(models, name)
```

Removes targeting from entity models.

**Parameters:**
- `models` (table|string): Model name(s) or hash(es)
- `name` (string, optional): Specific target name to remove

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.RemoveTargetModel("prop_atm_01", "use_atm")
```

---

## 🔹 RemoveTargetZone

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Target.RemoveTargetZone(name)
```

Removes a target zone.

**Parameters:**
- `name` (string): Zone identifier

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.RemoveTargetZone("parking_lot")
```

## Advanced Features

### Multiple Options per Target

```lua
-- Add multiple options to the same entity
Bridge.Target.AddTargetEntity(ped, {
    {
        name = "talk",
        icon = "fas fa-comments",
        label = "Talk",
        action = function(entity)
            TriggerEvent('npc:startDialog', entity)
        end
    },
    {
        name = "give_item",
        icon = "fas fa-gift",
        label = "Give Item",
        action = function(entity)
            TriggerEvent('npc:giveItem', entity)
        end,
        canInteract = function()
            return Bridge.Target.HasItems()
        end
    }
})
```

### Conditional Interactions

```lua
-- Job-restricted target
Bridge.Target.AddTargetModel("s_m_y_cop_01", {
    name = "police_interaction",
    icon = "fas fa-badge",
    label = "Police Menu",
    action = function(entity)
        TriggerEvent('police:openMenu')
    end,
    canInteract = function()
        local playerJob = Bridge.Target.GetPlayerData().job.name
        return playerJob == "police"
    end
})
```

### Distance-based Options

```lua
-- Different options based on distance
Bridge.Target.AddTargetEntity(vehicle, {
    {
        name = "enter_vehicle",
        icon = "fas fa-door-open",
        label = "Enter Vehicle",
        distance = 3.0,
        action = function(entity)
            TaskEnterVehicle(PlayerPedId(), entity, -1, -1, 1.0, 1, 0)
        end
    },
    {
        name = "inspect_engine",
        icon = "fas fa-wrench",
        label = "Inspect Engine",
        distance = 1.5,
        action = function(entity)
            TriggerEvent('mechanic:inspectEngine', entity)
        end
    }
})
```

## Utility Functions

### `Bridge.Target.IsTargetActive()`

Checks if targeting system is currently active.

**Returns:**
- `boolean`: True if targeting is active

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Target.IsTargetActive() then
    print("Player is currently targeting")
end
```

### `Bridge.Target.GetTargetEntity()`

Gets the currently targeted entity.

**Returns:**
- `number`: Entity handle or 0 if none

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local target = Bridge.Target.GetTargetEntity()
if target ~= 0 then
    print("Targeting entity:", target)
end
```

### `Bridge.Target.SetTargetDistance(distance)`

Sets global targeting distance.

**Parameters:**
- `distance` (number): Maximum targeting distance

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.SetTargetDistance(5.0)
```

### `Bridge.Target.ToggleTargeting(enabled)`

Enables or disables the targeting system.

**Parameters:**
- `enabled` (boolean): Enable/disable targeting

**Example:**
```lua
-- Disable targeting during cutscenes
Bridge.Target.ToggleTargeting(false)

-- Re-enable after cutscene
Bridge.Target.ToggleTargeting(true)
```

## Event Handlers

### Target Events

```lua
-- Target entered
AddEventHandler('community_bridge:targetEntered', function(entity, options)
    print("Entered target zone for entity:", entity)
end)

-- Target exited  
AddEventHandler('community_bridge:targetExited', function(entity)
    print("Exited target zone for entity:", entity)
end)

-- Target selected
AddEventHandler('community_bridge:targetSelected', function(entity, option)
    print("Selected target option:", option.name)
end)
```

### Custom Validation Events

```lua
-- Global interaction check
AddEventHandler('community_bridge:canInteract', function(entity, option, callback)
    -- Custom validation logic
    local canInteract = true
    
    -- Check if player is not in combat
    if IsPedInCombat(PlayerPedId(), 0) then
        canInteract = false
    end
    
    -- Check if player has required items
    if option.requiredItem then
        canInteract = Bridge.Target.HasItem(option.requiredItem)
    end
    
    callback(canInteract)
end)
```

## Configuration

### Target System Settings

```lua
-- Configure targeting behavior
Bridge.Target.SetTargetConfig({
    defaultDistance = 2.0,
    enableOutline = true,
    outlineColor = {255, 255, 255, 255},
    drawSprite = true,
    spriteSize = 0.5,
    enableDebug = false
})
```

### Visual Customization

```lua
-- Customize target appearance
Bridge.Target.SetTargetStyle({
    backgroundColor = "rgba(0, 0, 0, 0.8)",
    textColor = "#ffffff",
    iconColor = "#00ff00",
    borderColor = "#ffffff",
    borderWidth = 2,
    fontSize = "14px",
    fontFamily = "Arial"
})
```

## 📚 Best Practices

---

## 📚 Performance Guidelines

1. **Limit target count** - Don't add too many targets simultaneously
2. **Use appropriate distances** - Smaller distances reduce processing overhead
3. **Efficient callbacks** - Keep action functions lightweight
4. **Clean up targets** - Remove targets when no longer needed

---

## 📚 User Experience Tips

1. **Clear labels** - Use descriptive, concise labels
2. **Consistent icons** - Use standardized Font Awesome icons
3. **Logical grouping** - Group related options together
4. **Visual feedback** - Provide clear interaction feedback

---

## 📚 Error Handling

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Safe target addition with error checking
local function AddSafeTarget(entity, options)
    if not DoesEntityExist(entity) then
        print("Entity does not exist")
        return false
    end
    
    if not options or not options.name then
        print("Invalid target options")
        return false
    end
    
    return Bridge.Target.AddTargetEntity(entity, options)
end
```

---

## 📚 Memory Management

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Clean up targets when entity is deleted
AddEventHandler('entityRemoved', function(entity)
    Bridge.Target.RemoveTargetEntity(entity)
end)

-- Remove temporary targets after use
local function AddTemporaryTarget(entity, options, duration)
    Bridge.Target.AddTargetEntity(entity, options)
    
    SetTimeout(duration, function()
        Bridge.Target.RemoveTargetEntity(entity, options.name)
    end)
end
```
