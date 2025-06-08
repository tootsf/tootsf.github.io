---
layout: default
title: "GetFuel"
parent: Fuel Functions
grand_parent: Client
great_grand_parent: ⛽ Fuel
nav_order: 1
---

# GetFuel
{: .no_toc }

Gets the current fuel level of a vehicle.

## Syntax

```lua
function Fuel.GetFuel(vehicle)
```

## Parameters

**vehicle:** `number`  
The vehicle entity ID.

## Returns

**Type:** `number`  

The fuel level (0.0 to 100.0).

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local fuelLevel = Bridge.Fuel.GetFuel(vehicle)
    print("Fuel level: " .. fuelLevel .. "%")
end
```

---