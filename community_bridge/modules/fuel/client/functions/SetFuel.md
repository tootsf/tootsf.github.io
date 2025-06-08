---
layout: default
title: "SetFuel"
parent: Functions
grand_parent: Client
great_grand_parent: ⛽ Fuel
nav_order: 1
---

# SetFuel
{: .no_toc }

Sets the fuel level of a vehicle.

## Syntax

```lua
function Fuel.SetFuel(vehicle, fuel)
```

## Parameters

**vehicle:** `number`  
The vehicle entity ID.

**fuel:** `number`  
Fuel level to set (0.0 to 100.0).

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    Bridge.Fuel.SetFuel(vehicle, 75.0) -- Set fuel to 75%
    print("Fuel set to 75%")
end
```

## Usage Examples

### Check Fuel Before Long Trip
```lua
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local fuel = Bridge.Fuel.GetFuel(vehicle)
    if fuel < 25.0 then
        print("Warning: Low fuel! Current level: " .. fuel .. "%")
    else
        print("Fuel level good: " .. fuel .. "%")
    end
end
```

### Fuel Consumption Simulation
```lua
-- Example of simulating fuel consumption over time
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local currentFuel = Bridge.Fuel.GetFuel(vehicle)
    local consumptionRate = 0.1 -- 0.1% fuel consumed per second
    
    -- Reduce fuel by consumption rate
    local newFuel = math.max(0, currentFuel - consumptionRate)
    Bridge.Fuel.SetFuel(vehicle, newFuel)
end
```

---