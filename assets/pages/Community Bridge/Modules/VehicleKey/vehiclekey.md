# VehicleKey 🔑

<!--META
nav: true
toc: true
description: The VehicleKey module provides functions for managing vehicle keys across different key systems. It handles giving and removing keys for vehicles.
-->

The VehicleKey module provides functions for managing vehicle keys across different key systems. It handles giving and removing keys for vehicles.

## Overview

The VehicleKey provides functionality for FiveM resources.

## Client Functions

### GiveKeys

<!--TOC: GiveKeys-->

**Context:** 🖥️ Client

Gives the player keys to a specific vehicle.

**Syntax:** `Bridge.VehicleKey.GiveKeys(vehicle, plate)`

**Parameters:**
- `vehicle` (number) - Vehicle entity handle
- `plate` (string) - License plate of the vehicle

**Returns:**
- (boolean) - Returns false if plate is invalid, otherwise no return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get nearby vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local plate = GetVehicleNumberPlateText(vehicle)
    Bridge.VehicleKey.GiveKeys(vehicle, plate)
    print("Given keys to vehicle: " .. plate)
end
```

### RemoveKeys

<!--TOC: RemoveKeys-->

**Context:** 🖥️ Client

Removes the player's keys to a specific vehicle.

**Syntax:** `Bridge.VehicleKey.RemoveKeys(vehicle, plate)`

**Parameters:**
- `vehicle` (number) - Vehicle entity handle
- `plate` (string) - License plate of the vehicle

**Returns:**
- (boolean) - Returns false if plate is invalid, otherwise no return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove keys from current vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local plate = GetVehicleNumberPlateText(vehicle)
    Bridge.VehicleKey.RemoveKeys(vehicle, plate)
    print("Removed keys from vehicle: " .. plate)
end
```

