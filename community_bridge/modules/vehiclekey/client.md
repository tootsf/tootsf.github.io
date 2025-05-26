---
layout: default
title: Client
parent: VehicleKey
grand_parent: Modules
nav_order: 1
---

# Client Functions
{: .no_toc }

Client-side functions for vehicle key management across multiple key systems.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 🔹 GiveKeys

Gives vehicle keys to the current player for the specified vehicle.

### Syntax

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.VehicleKey.GiveKeys(vehicle, plate)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `vehicle` | `number` | The vehicle entity ID |
| `plate` | `string` | The license plate of the vehicle |

### Returns

| Type | Description |
|------|-------------|
| `boolean` | `true` if keys given successfully, `false` if failed or no system |

### Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Give keys to the vehicle the player is currently in
local playerPed = PlayerPedId()
local vehicle = GetVehiclePedIsIn(playerPed, false)

if vehicle ~= 0 then
    local plate = GetVehicleNumberPlateText(vehicle)
    local success = Bridge.VehicleKey.GiveKeys(vehicle, plate)
    
    if success then
        print("Vehicle keys given successfully")
    else
        print("Failed to give vehicle keys")
    end
end
```

### System-Specific Behavior

- **qb-vehiclekeys**: Triggers `qb-vehiclekeys:server:AcquireVehicleKeys` server event
- **qbx_vehiclekeys**: Uses QBX key acquisition system
- **qs-vehiclekeys**: Integrates with QuaS vehicle key system
- **Renewed-Vehiclekeys**: Uses Renewed Scripts key system
- **Default**: Returns `true` with error message when no system is bridged

---

---

## 🔹 RemoveKeys

Removes vehicle keys from the current player for the specified vehicle.

### Syntax

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.VehicleKey.RemoveKeys(vehicle, plate)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `vehicle` | `number` | The vehicle entity ID |
| `plate` | `string` | The license plate of the vehicle |

### Returns

| Type | Description |
|------|-------------|
| `boolean` | `true` if keys removed successfully, `false` if failed or no system |

### Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove keys from a specific vehicle
local vehicle = GetClosestVehicle(GetEntityCoords(PlayerPedId()), 5.0, 0, 71)

if vehicle ~= 0 then
    local plate = GetVehicleNumberPlateText(vehicle)
    local success = Bridge.VehicleKey.RemoveKeys(vehicle, plate)
    
    if success then
        print("Vehicle keys removed successfully")
    else
        print("Failed to remove vehicle keys")
    end
end
```

### System-Specific Behavior

- **qb-vehiclekeys**: Triggers `qb-vehiclekeys:client:RemoveKeys` client event
- **qbx_vehiclekeys**: Uses QBX key removal system
- **qs-vehiclekeys**: Integrates with QuaS vehicle key removal
- **Renewed-Vehiclekeys**: Uses Renewed Scripts key removal
- **Default**: Returns `true` with error message when no system is bridged

## Practical Usage Examples

### Vehicle Spawning Integration

```lua
local Bridge = exports['community_bridge']:Bridge()

-- When spawning a vehicle, automatically give keys
local vehicle = CreateVehicle(modelHash, coords.x, coords.y, coords.z, heading, true, false)
local plate = GetVehicleNumberPlateText(vehicle)

-- Give keys to the spawned vehicle
Bridge.VehicleKey.GiveKeys(vehicle, plate)

-- Put player in vehicle
TaskWarpPedIntoVehicle(PlayerPedId(), vehicle, -1)
```

### Vehicle Sale/Transfer System

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Transfer vehicle ownership
function TransferVehicleOwnership(oldOwner, newOwner, vehicle, plate)
    -- Remove keys from old owner (if they're the current player)
    if oldOwner == PlayerId() then
        Bridge.VehicleKey.RemoveKeys(vehicle, plate)
    end
    
    -- Give keys to new owner (if they're the current player)
    if newOwner == PlayerId() then
        Bridge.VehicleKey.GiveKeys(vehicle, plate)
    end
end
```

### Garage System Integration

```lua
local Bridge = exports['community_bridge']:Bridge()

-- When taking vehicle out of garage
function TakeVehicleFromGarage(vehicleData)
    local vehicle = SpawnVehicle(vehicleData.model, vehicleData.coords)
    local plate = vehicleData.plate
    
    -- Set the correct plate
    SetVehicleNumberPlateText(vehicle, plate)
    
    -- Give keys to player
    Bridge.VehicleKey.GiveKeys(vehicle, plate)
    
    return vehicle
end
```

## Error Handling

When no vehicle key system is detected:

- Functions return `true` to maintain compatibility
- Error messages are logged using `Prints.Error()`
- Vehicle access is not restricted (default GTA behavior)

### Example Error Handling

```lua
local Bridge = exports['community_bridge']:Bridge()

local success = Bridge.VehicleKey.GiveKeys(vehicle, plate)
if not success then
    -- Handle failure case
    TriggerEvent('showNotification', 'Unable to give vehicle keys')
end
```

## Integration Notes

- Each integration checks `GetResourceState()` before loading
- Plate parameter is required for most systems
- Vehicle entity ID may be used by some systems for additional validation
- Functions are designed to fail gracefully when systems are unavailable
- Some systems may have additional features not exposed through this bridge
