# Fuel Client

The fuel client module provides vehicle fuel management functions.

## Functions

### GetResourceName()

Gets the name of the fuel system currently being used.

**Returns:**
- `string`: The fuel system name ("default", "ox_fuel", "ps-fuel", etc.)

**Example:**
```lua
local fuelSystem = Fuel.GetResourceName()
print("Using fuel system: " .. fuelSystem)
```

### GetFuel(vehicle)

Gets the current fuel level of a vehicle.

**Parameters:**
- `vehicle` (number): The vehicle entity ID

**Returns:**
- `number`: Fuel level (0.0 to 100.0)

**Example:**
```lua
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local fuelLevel = Fuel.GetFuel(vehicle)
    print("Fuel level: " .. fuelLevel .. "%")
end
```

### SetFuel(vehicle, fuel)

Sets the fuel level of a vehicle.

**Parameters:**
- `vehicle` (number): The vehicle entity ID
- `fuel` (number): Fuel level to set (0.0 to 100.0)

**Example:**
```lua
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    Fuel.SetFuel(vehicle, 75.0) -- Set fuel to 75%
    print("Fuel set to 75%")
end
```

## Usage Examples

### Check Fuel Before Long Trip
```lua
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local fuel = Fuel.GetFuel(vehicle)
    if fuel < 25.0 then
        print("Warning: Low fuel! Current level: " .. fuel .. "%")
    else
        print("Fuel level good: " .. fuel .. "%")
    end
end
```

### Fuel Consumption Simulation
```lua
CreateThread(function()
    while true do
        Wait(30000) -- Check every 30 seconds
        
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped, false)
        
        if vehicle ~= 0 and GetPedInVehicleSeat(vehicle, -1) == ped then
            local currentFuel = Fuel.GetFuel(vehicle)
            local speed = GetEntitySpeed(vehicle)
            
            if speed > 0 then
                -- Consume fuel based on speed
                local consumption = (speed * 0.01) -- Simple consumption calculation
                local newFuel = math.max(0, currentFuel - consumption)
                Fuel.SetFuel(vehicle, newFuel)
                
                if newFuel == 0 then
                    print("Out of fuel!")
                end
            end
        end
    end
end)
```

### Refuel Station Integration
```lua
-- Example refuel function
function RefuelVehicle(vehicle, amount)
    if not DoesEntityExist(vehicle) then return false end
    
    local currentFuel = Fuel.GetFuel(vehicle)
    local newFuel = math.min(100.0, currentFuel + amount)
    
    Fuel.SetFuel(vehicle, newFuel)
    
    return true
end

-- Usage
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if RefuelVehicle(vehicle, 50.0) then
    print("Vehicle refueled!")
end
```

## Notes

- Fuel levels are typically handled as percentages (0.0 to 100.0)
- The function checks if the vehicle entity exists before performing operations
- Default implementation uses native GTA fuel functions
- Actual behavior may vary depending on which fuel system is installed
- Different fuel systems may have different features and limitations

## Integration

This module automatically detects and integrates with popular fuel systems. If no specific fuel system is detected, it falls back to using native GTA fuel functions.
