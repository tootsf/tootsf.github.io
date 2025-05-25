---
layout: default
title: Client Functions
parent: Vehicle
grand_parent: Modules
nav_order: 1
---

# Vehicle Client Functions
{: .no_toc }

Client-side vehicle management functions for spawning, modification, and local vehicle operations.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Vehicle Spawning

### SpawnVehicle

Spawns a vehicle with specified parameters and optional collision detection.

**Syntax:**
```lua
local vehicle = exports.community_bridge:SpawnVehicle(config)
```

**Parameters:**
- `config` (table): Vehicle spawn configuration
  - `model` (string): Vehicle model name
  - `coords` (vector3): Spawn coordinates
  - `heading` (number): Vehicle heading (optional, default: 0.0)
  - `plate` (string): Custom plate text (optional)
  - `engine` (boolean): Engine running state (optional, default: false)
  - `fuel` (number): Fuel level 0-100 (optional, default: 100)
  - `locked` (boolean): Lock state (optional, default: false)
  - `modifications` (table): Vehicle modifications (optional)

**Returns:**
- `vehicle` (number): Vehicle entity handle or `nil` if failed

**Example:**
```lua
local vehicle = exports.community_bridge:SpawnVehicle({
    model = "adder",
    coords = vector3(100.0, 200.0, 30.0),
    heading = 90.0,
    plate = "SPEED01",
    engine = true,
    fuel = 80,
    modifications = {
        engine = 3,
        brakes = 2,
        primaryColor = {255, 0, 0}
    }
})

if vehicle then
    SetPedIntoVehicle(PlayerPedId(), vehicle, -1)
    exports.community_bridge:SendNotify("Vehicle spawned successfully!", "success")
end
```

### SpawnVehicleWithCallback

Spawns a vehicle with collision detection and callback for result handling.

**Syntax:**
```lua
exports.community_bridge:SpawnVehicleWithCallback(config, callback)
```

**Parameters:**
- `config` (table): Vehicle spawn configuration
- `callback` (function): Callback function with parameters (vehicle, success, error)

**Example:**
```lua
exports.community_bridge:SpawnVehicleWithCallback({
    model = "zentorno",
    coords = vector3(100.0, 200.0, 30.0),
    checkCollision = true,
    maxAttempts = 5
}, function(vehicle, success, error)
    if success then
        TaskWarpPedIntoVehicle(PlayerPedId(), vehicle, -1)
    else
        exports.community_bridge:SendNotify("Failed to spawn vehicle: " .. error, "error")
    end
end)
```

## Vehicle Modification

### ModifyVehicle

Applies modifications to a vehicle including performance upgrades and visual customization.

**Syntax:**
```lua
local success = exports.community_bridge:ModifyVehicle(vehicle, modifications)
```

**Parameters:**
- `vehicle` (number): Vehicle entity handle
- `modifications` (table): Modification configuration
  - `engine` (number): Engine upgrade level (0-4)
  - `brakes` (number): Brake upgrade level (0-3)
  - `transmission` (number): Transmission upgrade level (0-3)
  - `suspension` (number): Suspension upgrade level (0-4)
  - `armor` (number): Armor level (0-5)
  - `turbo` (boolean): Turbo installation
  - `xenon` (boolean): Xenon headlights
  - `primaryColor` (table): RGB color {r, g, b}
  - `secondaryColor` (table): RGB color {r, g, b}
  - `wheels` (table): Wheel configuration
  - `extras` (table): Vehicle extras configuration

**Returns:**
- `success` (boolean): Whether modifications were applied successfully

**Example:**
```lua
local success = exports.community_bridge:ModifyVehicle(vehicle, {
    engine = 4,           -- Max engine upgrade
    brakes = 3,           -- Max brake upgrade
    transmission = 3,     -- Max transmission upgrade
    suspension = 2,       -- Sport suspension
    armor = 5,           -- Max armor
    turbo = true,        -- Install turbo
    xenon = true,        -- Xenon headlights
    primaryColor = {255, 0, 0},    -- Red
    secondaryColor = {0, 0, 0},    -- Black
    wheels = {
        type = 1,        -- Sport wheels
        index = 15,      -- Specific wheel model
        color = 12       -- Wheel color
    },
    extras = {
        [1] = true,      -- Enable extra 1
        [2] = false      -- Disable extra 2
    }
})

if success then
    exports.community_bridge:SendNotify("Vehicle modified successfully!", "success")
end
```

### GetVehicleModifications

Retrieves current modifications of a vehicle.

**Syntax:**
```lua
local modifications = exports.community_bridge:GetVehicleModifications(vehicle)
```

**Parameters:**
- `vehicle` (number): Vehicle entity handle

**Returns:**
- `modifications` (table): Current vehicle modifications

**Example:**
```lua
local mods = exports.community_bridge:GetVehicleModifications(vehicle)
print("Engine Level:", mods.engine)
print("Primary Color:", json.encode(mods.primaryColor))
```

## Vehicle Information

### GetVehicleInfo

Gets comprehensive information about a vehicle.

**Syntax:**
```lua
local info = exports.community_bridge:GetVehicleInfo(vehicle)
```

**Parameters:**
- `vehicle` (number): Vehicle entity handle

**Returns:**
- `info` (table): Vehicle information
  - `model` (string): Vehicle model name
  - `class` (string): Vehicle class
  - `plate` (string): License plate
  - `fuel` (number): Current fuel level
  - `health` (number): Vehicle health
  - `locked` (boolean): Lock state
  - `owner` (string): Vehicle owner identifier
  - `modifications` (table): Current modifications

**Example:**
```lua
local info = exports.community_bridge:GetVehicleInfo(vehicle)
print("Model:", info.model)
print("Fuel:", info.fuel .. "%")
print("Health:", info.health)
print("Owner:", info.owner)
```

### GetNearestVehicle

Finds the nearest vehicle to a player or position.

**Syntax:**
```lua
local vehicle, distance = exports.community_bridge:GetNearestVehicle(coords, maxDistance)
```

**Parameters:**
- `coords` (vector3): Search center coordinates (optional, default: player position)
- `maxDistance` (number): Maximum search distance (optional, default: 10.0)

**Returns:**
- `vehicle` (number): Nearest vehicle entity handle or `nil`
- `distance` (number): Distance to the vehicle

**Example:**
```lua
local vehicle, distance = exports.community_bridge:GetNearestVehicle(nil, 15.0)
if vehicle then
    print("Nearest vehicle is " .. distance .. " units away")
    local info = exports.community_bridge:GetVehicleInfo(vehicle)
    print("Model:", info.model)
end
```

## Vehicle Control

### SetVehicleFuel

Sets the fuel level of a vehicle with optional consumption tracking.

**Syntax:**
```lua
exports.community_bridge:SetVehicleFuel(vehicle, fuel, updateServer)
```

**Parameters:**
- `vehicle` (number): Vehicle entity handle
- `fuel` (number): Fuel level (0-100)
- `updateServer` (boolean): Whether to sync with server (optional, default: true)

**Example:**
```lua
exports.community_bridge:SetVehicleFuel(vehicle, 75, true)
exports.community_bridge:SendNotify("Vehicle refueled to 75%", "info")
```

### GetVehicleFuel

Gets the current fuel level of a vehicle.

**Syntax:**
```lua
local fuel = exports.community_bridge:GetVehicleFuel(vehicle)
```

**Parameters:**
- `vehicle` (number): Vehicle entity handle

**Returns:**
- `fuel` (number): Current fuel level (0-100)

**Example:**
```lua
local fuel = exports.community_bridge:GetVehicleFuel(vehicle)
if fuel < 20 then
    exports.community_bridge:SendNotify("Low fuel warning!", "warning")
end
```

### LockVehicle

Locks or unlocks a vehicle with optional animation and sound effects.

**Syntax:**
```lua
local success = exports.community_bridge:LockVehicle(vehicle, locked, playAnimation)
```

**Parameters:**
- `vehicle` (number): Vehicle entity handle
- `locked` (boolean): Lock state (true = locked, false = unlocked)
- `playAnimation` (boolean): Play lock/unlock animation (optional, default: true)

**Returns:**
- `success` (boolean): Whether the operation was successful

**Example:**
```lua
local success = exports.community_bridge:LockVehicle(vehicle, true, true)
if success then
    exports.community_bridge:SendNotify("Vehicle locked", "success")
else
    exports.community_bridge:SendNotify("Cannot lock this vehicle", "error")
end
```

## Vehicle Damage System

### SetVehicleDamage

Applies damage to specific vehicle components.

**Syntax:**
```lua
exports.community_bridge:SetVehicleDamage(vehicle, damageData)
```

**Parameters:**
- `vehicle` (number): Vehicle entity handle
- `damageData` (table): Damage configuration
  - `engine` (number): Engine damage (0-1000)
  - `body` (number): Body damage (0-1000)
  - `petrolTank` (number): Fuel tank damage (0-1000)
  - `doors` (table): Door damage per door index
  - `windows` (table): Window damage per window index
  - `tyres` (table): Tire damage per wheel index

**Example:**
```lua
exports.community_bridge:SetVehicleDamage(vehicle, {
    engine = 500,     -- 50% engine damage
    body = 300,       -- 30% body damage
    doors = {
        [0] = 250,    -- Driver door damage
        [1] = 100     -- Passenger door damage
    },
    tyres = {
        [0] = true,   -- Burst front left tire
        [1] = false   -- Front right tire intact
    }
})
```

### RepairVehicle

Repairs a vehicle completely or partially.

**Syntax:**
```lua
exports.community_bridge:RepairVehicle(vehicle, repairType)
```

**Parameters:**
- `vehicle` (number): Vehicle entity handle
- `repairType` (string): Type of repair ("full", "engine", "body", "visual")

**Example:**
```lua
exports.community_bridge:RepairVehicle(vehicle, "full")
exports.community_bridge:SendNotify("Vehicle fully repaired", "success")
```

## Vehicle Effects

### PlayVehicleEffect

Plays visual or audio effects on a vehicle.

**Syntax:**
```lua
exports.community_bridge:PlayVehicleEffect(vehicle, effectType, duration)
```

**Parameters:**
- `vehicle` (number): Vehicle entity handle
- `effectType` (string): Effect type ("fire", "smoke", "sparks", "alarm")
- `duration` (number): Effect duration in milliseconds

**Example:**
```lua
-- Play engine fire effect for 5 seconds
exports.community_bridge:PlayVehicleEffect(vehicle, "fire", 5000)

-- Play car alarm
exports.community_bridge:PlayVehicleEffect(vehicle, "alarm", 10000)
```

## Best Practices

### Performance Optimization

```lua
-- Cache vehicle handles when possible
local playerVehicle = nil
local lastVehicleCheck = 0

Citizen.CreateThread(function()
    while true do
        local currentTime = GetGameTimer()
        if currentTime - lastVehicleCheck > 1000 then -- Check every second
            local ped = PlayerPedId()
            if IsPedInAnyVehicle(ped, false) then
                playerVehicle = GetVehiclePedIsIn(ped, false)
            else
                playerVehicle = nil
            end
            lastVehicleCheck = currentTime
        end
        Wait(100)
    end
end)
```

### Error Handling

```lua
-- Always check if vehicle exists before operations
local function safeVehicleOperation(vehicle, operation)
    if not DoesEntityExist(vehicle) then
        exports.community_bridge:SendNotify("Vehicle no longer exists", "error")
        return false
    end
    
    return operation()
end

-- Example usage
safeVehicleOperation(vehicle, function()
    return exports.community_bridge:ModifyVehicle(vehicle, modifications)
end)
```

### Memory Management

```lua
-- Clean up spawned vehicles when no longer needed
local spawnedVehicles = {}

local function cleanupVehicle(vehicle)
    if DoesEntityExist(vehicle) then
        DeleteVehicle(vehicle)
        spawnedVehicles[vehicle] = nil
    end
end

-- Cleanup on resource stop
AddEventHandler('onResourceStop', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        for vehicle, _ in pairs(spawnedVehicles) do
            cleanupVehicle(vehicle)
        end
    end
end)
```

---

These client functions provide comprehensive vehicle management capabilities, from basic spawning and modification to advanced damage simulation and effect systems.
