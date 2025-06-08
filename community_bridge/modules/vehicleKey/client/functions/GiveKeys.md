---
layout: default
title: "GiveKeys"
parent: Vehiclekey Functions
grand_parent: Client
great_grand_parent: 🔑 Vehiclekey
nav_order: 1
---

# GiveKeys
{: .no_toc }

Gives vehicle keys to the current player for the specified vehicle.

## Syntax

```lua
Bridge.VehicleKey.GiveKeys(vehicle, plate)
```

## Parameters

**vehicle:** `number`  
The vehicle entity ID.

**plate:** `string`  
The license plate of the vehicle.

## Returns

**Type:** `boolean`  
`true` if keys given successfully, `false` if failed or no system.

## Example

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

## System-Specific Behavior

- **qb-vehiclekeys**: Triggers `qb-vehiclekeys:server:AcquireVehicleKeys` server event
- **qbx_vehiclekeys**: Uses QBX key acquisition system
- **qs-vehiclekeys**: Integrates with QuaS vehicle key system
- **Renewed-Vehiclekeys**: Uses Renewed Scripts key system
- **Default**: Returns `true` with error message when no system is bridged

---