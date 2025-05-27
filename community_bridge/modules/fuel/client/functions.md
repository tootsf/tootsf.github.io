---
layout: default
title: Functions
parent: Client
grand_parent: "⛽ Fuel"
nav_order: 1
permalink: /community_bridge/modules/fuel/client/functions/
---

# Fuel Client Functions
{: .no_toc }

Client-side functions for vehicle fuel management.

# Fuel Client Functions
{: .no_toc }

Client-side functions for vehicle fuel management.

---

## 🔹 GetFuel

{: .no_toc }

Gets the current fuel level of a vehicle.


```lua
function Fuel.GetFuel(vehicle)
```


**vehicle:** `number`  
The vehicle entity ID.


**Type:** `number`  

The fuel level (0.0 to 100.0).


```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local fuelLevel = Bridge.Fuel.GetFuel(vehicle)
    print("Fuel level: " .. fuelLevel .. "%")
end
```

---

## 🔹 GetResourceName

{: .no_toc }

Gets the name of the fuel system currently being used.


```lua
function Fuel.GetResourceName()
```


**Type:** `string`  

The fuel system name ("default", "ox_fuel", "ps-fuel", etc.)


```lua
local Bridge = exports['community_bridge']:Bridge()
local fuelSystem = Bridge.Fuel.GetResourceName()
print("Using fuel system: " .. fuelSystem)
```

---

## 🔹 SetFuel

{: .no_toc }

Sets the fuel level of a vehicle.


```lua
function Fuel.SetFuel(vehicle, fuel)
```


**vehicle:** `number`  
The vehicle entity ID.

**fuel:** `number`  
Fuel level to set (0.0 to 100.0).


```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    Bridge.Fuel.SetFuel(vehicle, 75.0) -- Set fuel to 75%
    print("Fuel set to 75%")
end
```


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

## 🔹 index

{: .no_toc }

The fuel client module provides vehicle fuel management functions.


- [GetResourceName](GetResourceName.md) - Get the name of the fuel system being used
- [GetFuel](GetFuel.md) - Get the fuel level of a vehicle  
- [SetFuel](SetFuel.md) - Set the fuel level of a vehicle