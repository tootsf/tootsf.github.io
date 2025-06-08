---
layout: default
title: "RemoveKeys"
parent: Vehiclekey Functions
grand_parent: Client
great_grand_parent: 🔑 Vehiclekey
nav_order: 1
---

# RemoveKeys
Removes vehicle keys from the current player for the specified vehicle.

## Syntax

```lua
Bridge.VehicleKey.RemoveKeys(vehicle, plate)
```

## Parameters

**vehicle:** `number`  
The vehicle entity ID.

**plate:** `string`  
The license plate of the vehicle.

## Returns

**Type:** `boolean`  
`true` if keys removed successfully, `false` if failed or no system.

## Example

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

## System-Specific Behavior

- **qb-vehiclekeys**: Triggers `qb-vehiclekeys:client:RemoveKeys` client event
- **qbx_vehiclekeys**: Uses QBX key removal system
- **qs-vehiclekeys**: Integrates with QuaS vehicle key removal
- **Renewed-Vehiclekeys**: Uses Renewed Scripts key removal
- **Default**: Returns `true` with error message when no system is bridged