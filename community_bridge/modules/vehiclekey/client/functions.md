---
layout: default
title: Functions
parent: Client
grand_parent: "🔑 Vehiclekey"
nav_order: 1
permalink: /community_bridge/modules/vehiclekey/client/functions/
---

# Vehiclekey Client Functions
{: .no_toc }

Client-side functions for vehicle key management.

# Vehiclekey Client Functions
{: .no_toc }

Client-side functions for vehicle key management.

---

## 🔹 GiveKeys

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gives vehicle keys to the current player for the specified vehicle.


```lua
function VehicleKey.GiveKeys(vehicle, plate)
```


**vehicle:** `number`  
The vehicle entity ID.

**plate:** `string`  
The license plate of the vehicle.


**Type:** `boolean`  
`true` if keys given successfully, `false` if failed or no system.


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


- **qb-vehiclekeys**: Triggers `qb-vehiclekeys:server:AcquireVehicleKeys` server event
- **qbx_vehiclekeys**: Uses QBX key acquisition system
- **qs-vehiclekeys**: Integrates with QuaS vehicle key system
- **Renewed-Vehiclekeys**: Uses Renewed Scripts key system
- **Default**: Returns `true` with error message when no system is bridged

---

## 🔹 RemoveKeys

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Removes vehicle keys from the current player for the specified vehicle.


```lua
function VehicleKey.RemoveKeys(vehicle, plate)
```


**vehicle:** `number`  
The vehicle entity ID.

**plate:** `string`  
The license plate of the vehicle.


**Type:** `boolean`  
`true` if keys removed successfully, `false` if failed or no system.


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


- **qb-vehiclekeys**: Triggers `qb-vehiclekeys:client:RemoveKeys` client event
- **qbx_vehiclekeys**: Uses QBX key removal system
- **qs-vehiclekeys**: Integrates with QuaS vehicle key removal
- **Renewed-Vehiclekeys**: Uses Renewed Scripts key removal
- **Default**: Returns `true` with error message when no system is bridged