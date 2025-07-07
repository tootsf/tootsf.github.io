# Target 🎯

<!--META
nav: true
toc: true
description: The Target module provides a unified interface for adding interactive targets to players, vehicles, entities, and zones. It supports various targeting systems like ox_target and qb-target.
-->

The Target module provides a unified interface for adding interactive targets to players, vehicles, entities, and zones. It supports various targeting systems like ox_target and qb-target.

## Overview

The Target provides functionality for FiveM resources.

## Client Functions

### FixOptions

<!--TOC: FixOptions-->

**Context:** 🖥️ Client

Internal function that fixes options passed to fit alternative target systems. Normalizes options for compatibility between different targeting systems.

**Syntax:** `Bridge.Target.FixOptions(options)`

**Parameters:**
- `options` (table) - Array of target option configurations to normalize

**Returns:**
- (table) - Normalized options table

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local normalizedOptions = Bridge.Target.FixOptions({
    {
        label = "Test Action",
        action = function(entity) print("Action triggered") end
    }
})
```

### AddBoxZone

<!--TOC: AddBoxZone-->

**Context:** 🖥️ Client

Creates a box-shaped target zone at specified coordinates.

**Syntax:** `Bridge.Target.AddBoxZone(name, coords, size, heading, options, debug)`

**Parameters:**
- `name` (string) - Unique name for the zone
- `coords` (table) - Center coordinates of the box (vector3)
- `size` (table) - Size of the box {length, width, height}
- `heading` (number) - Rotation heading of the box
- `options` (table) - Array of target option configurations
- `debug` (boolean) - Whether to show debug visualization

**Returns:**
- (number) - Zone ID for removal later

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local coords = vector3(100.0, 200.0, 30.0)
local zoneId = Bridge.Target.AddBoxZone("shop_entrance", coords, {2.0, 2.0, 2.0}, 0.0, {
    {
        label = "Enter Shop",
        icon = "fas fa-shopping-cart",
        onSelect = function()
            -- Open shop menu
        end
    }
}, true)
```

### AddGlobalPlayer

<!--TOC: AddGlobalPlayer-->

**Context:** 🖥️ Client

Adds target options to all players globally.

**Syntax:** `Bridge.Target.AddGlobalPlayer(options)`

**Parameters:**
- `options` (table) - Array of target option configurations

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.AddGlobalPlayer({
    {
        label = "Give Money",
        icon = "fas fa-dollar-sign",
        onSelect = function(entity)
            print("Selected player: " .. entity)
            -- Add your give money logic here
        end,
        groups = {"police", "admin"}
    }
})
```

### AddGlobalVehicle

<!--TOC: AddGlobalVehicle-->

**Context:** 🖥️ Client

Adds target options to all vehicles globally.

**Syntax:** `Bridge.Target.AddGlobalVehicle(options)`

**Parameters:**
- `options` (table) - Array of target option configurations

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.AddGlobalVehicle({
    {
        label = "Lock/Unlock Vehicle",
        icon = "fas fa-key",
        onSelect = function(entity)
            -- Add your lock/unlock logic here
            print("Toggling vehicle lock for: " .. entity)
        end
    }
})
```

### AddLocalEntity

<!--TOC: AddLocalEntity-->

**Context:** 🖥️ Client

Adds target options to specific local entities.

**Syntax:** `Bridge.Target.AddLocalEntity(entities, options)`

**Parameters:**
- `entities` (number|table) - Entity handle or array of entity handles
- `options` (table) - Array of target option configurations

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local entity = GetClosestObjectOfType(coords, 5.0, GetHashKey("prop_atm_01"), false)
Bridge.Target.AddLocalEntity(entity, {
    {
        label = "Use ATM",
        icon = "fas fa-credit-card",
        onSelect = function()
            -- Open ATM menu
        end
    }
})
```

### AddModel

<!--TOC: AddModel-->

**Context:** 🖥️ Client

Adds target options to all entities of specified model(s).

**Syntax:** `Bridge.Target.AddModel(models, options)`

**Parameters:**
- `models` (number|table) - Model hash or array of model hashes
- `options` (table) - Array of target option configurations

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.AddModel(GetHashKey("prop_gas_pump_1a"), {
    {
        label = "Refuel Vehicle",
        icon = "fas fa-gas-pump",
        onSelect = function(entity)
            -- Start refueling process
        end
    }
})
```

### AddSphereZone

<!--TOC: AddSphereZone-->

**Context:** 🖥️ Client

Creates a spherical target zone at specified coordinates.

**Syntax:** `Bridge.Target.AddSphereZone(name, coords, radius, heading, options)`

**Parameters:**
- `name` (string) - Unique name for the zone
- `coords` (table) - Center coordinates of the sphere (vector3)
- `radius` (number) - Radius of the sphere
- `heading` (number) - Rotation heading (may not apply to all systems)
- `options` (table) - Array of target option configurations

**Returns:**
- (number) - Zone ID for removal later

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local coords = vector3(150.0, 250.0, 30.0)
local zoneId = Bridge.Target.AddSphereZone("atm_zone", coords, 1.5, 0.0, {
    {
        label = "Use ATM",
        icon = "fas fa-credit-card",
        onSelect = function()
            -- Open ATM interface
        end
    }
})
```

### DisableTargeting

<!--TOC: DisableTargeting-->

**Context:** 🖥️ Client

Enables or disables the targeting system entirely.

**Syntax:** `Bridge.Target.DisableTargeting(bool)`

**Parameters:**
- `bool` (boolean) - True to disable targeting, false to enable

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Disable targeting
Bridge.Target.DisableTargeting(true)

-- Re-enable targeting
Bridge.Target.DisableTargeting(false)
```

### RemoveGlobalPlayer

<!--TOC: RemoveGlobalPlayer-->

**Context:** 🖥️ Client

Removes all target options from players.

**Syntax:** `Bridge.Target.RemoveGlobalPlayer()`

**Parameters:** None

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.RemoveGlobalPlayer()
```

### RemoveGlobalVehicle

<!--TOC: RemoveGlobalVehicle-->

**Context:** 🖥️ Client

Removes target options from all vehicles.

**Syntax:** `Bridge.Target.RemoveGlobalVehicle(options)`

**Parameters:**
- `options` (table) - Array of target options to remove (by name)

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.RemoveGlobalVehicle({
    {name = "Lock/Unlock Vehicle"}
})
```

### RemoveLocalEntity

<!--TOC: RemoveLocalEntity-->

**Context:** 🖥️ Client

Removes target options from specific local entities.

**Syntax:** `Bridge.Target.RemoveLocalEntity(entities, optionNames)`

**Parameters:**
- `entities` (number|table) - Entity handle or array of entity handles
- `optionNames` (string|table) - Option name(s) to remove, or nil to remove all

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.RemoveLocalEntity(entity, "Use ATM")
```

### RemoveModel

<!--TOC: RemoveModel-->

**Context:** 🖥️ Client

Removes all target options from a specific model.

**Syntax:** `Bridge.Target.RemoveModel(model)`

**Parameters:**
- `model` (number) - Model hash to remove targets from

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.RemoveModel(GetHashKey("prop_gas_pump_1a"))
```

### RemoveZone

<!--TOC: RemoveZone-->

**Context:** 🖥️ Client

Removes a target zone by name.

**Syntax:** `Bridge.Target.RemoveZone(name)`

**Parameters:**
- `name` (string) - Name of the zone to remove

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.RemoveZone("shop_entrance")
```

