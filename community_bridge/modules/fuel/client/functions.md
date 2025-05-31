---
layout: docs
title: Functions
parent: Client
grand_parent: "⛽ Fuel"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/fuel/client/functions/
has_children: true
---

# Fuel Client Functions
{: .no_toc }

Client-side functions for vehicle fuel management.

# Fuel Client Functions
{: .no_toc }

Client-side functions for vehicle fuel management.

---

## 🔹 GetFuel

## GetFuel

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

## 🔹 GetResourceName

## GetResourceName

Gets the name of the fuel system currently being used.

## Syntax

```lua
function Fuel.GetResourceName()
```

## Returns

**Type:** `string`  

The fuel system name ("default", "ox_fuel", "ps-fuel", etc.)

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local fuelSystem = Bridge.Fuel.GetResourceName()
print("Using fuel system: " .. fuelSystem)
```

---

## 🔹 SetFuel

## SetFuel

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

## 🔹 index

# ⛽ Fuel – Client Functions
{: .no_toc }

The fuel client module provides vehicle fuel management functions.

## Functions

- [GetResourceName](GetResourceName.md) - Get the name of the fuel system being used
- [GetFuel](GetFuel.md) - Get the fuel level of a vehicle  
- [SetFuel](SetFuel.md) - Set the fuel level of a vehicle