---
layout: default
title: Shared Functions
parent: Vehicle
grand_parent: Modules
nav_order: 3
---

# Vehicle Shared Functions
{: .no_toc }

Shared vehicle utility functions for validation, calculations, and data management across client and server.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Vehicle Data Validation

### ValidateVehicleModel

Validates if a vehicle model exists and is spawnable.

**Syntax:**
```lua
local isValid, error = exports.community_bridge:ValidateVehicleModel(model)
```

**Parameters:**
- `model` (string): Vehicle model name

**Returns:**
- `isValid` (boolean): Whether the model is valid
- `error` (string): Error message if invalid

**Example:**
```lua
local isValid, error = exports.community_bridge:ValidateVehicleModel("adder")
if not isValid then
    print("Invalid model:", error)
    return
end

-- Proceed with spawning
local vehicle = exports.community_bridge:SpawnVehicle({
    model = "adder",
    coords = playerCoords
})
```

### ValidateVehicleData

Validates complete vehicle data structure.

**Syntax:**
```lua
local isValid, errors = exports.community_bridge:ValidateVehicleData(vehicleData, schema)
```

**Parameters:**
- `vehicleData` (table): Vehicle data to validate
- `schema` (table): Validation schema (optional)

**Returns:**
- `isValid` (boolean): Whether data is valid
- `errors` (table): List of validation errors

**Example:**
```lua
local vehicleData = {
    model = "zentorno",
    plate = "TEST123",
    fuel = 75,
    modifications = {
        engine = 3,
        brakes = 2
    }
}

local isValid, errors = exports.community_bridge:ValidateVehicleData(vehicleData)
if not isValid then
    for _, error in ipairs(errors) do
        print("Validation error:", error)
    end
end
```

### ValidatePlateNumber

Validates license plate format and availability.

**Syntax:**
```lua
local isValid, error = exports.community_bridge:ValidatePlateNumber(plate, checkAvailability)
```

**Parameters:**
- `plate` (string): License plate text
- `checkAvailability` (boolean): Check if plate is already in use (optional, default: false)

**Returns:**
- `isValid` (boolean): Whether plate is valid
- `error` (string): Error message if invalid

**Example:**
```lua
local isValid, error = exports.community_bridge:ValidatePlateNumber("ABC123", true)
if not isValid then
    exports.community_bridge:SendNotify(playerId, "Invalid plate: " .. error, "error")
    return
end
```

## Vehicle Calculations

### CalculateFuelConsumption

Calculates fuel consumption based on vehicle type, modifications, and driving conditions.

**Syntax:**
```lua
local consumption = exports.community_bridge:CalculateFuelConsumption(vehicleData, drivingData)
```

**Parameters:**
- `vehicleData` (table): Vehicle information
  - `model` (string): Vehicle model
  - `class` (string): Vehicle class
  - `modifications` (table): Performance modifications
- `drivingData` (table): Driving conditions
  - `speed` (number): Current speed
  - `acceleration` (number): Acceleration factor
  - `terrain` (string): Terrain type
  - `weather` (string): Weather conditions

**Returns:**
- `consumption` (number): Fuel consumption rate per second

**Example:**
```lua
local consumption = exports.community_bridge:CalculateFuelConsumption({
    model = "adder",
    class = "super",
    modifications = {engine = 4, turbo = true}
}, {
    speed = 120,
    acceleration = 0.8,
    terrain = "highway",
    weather = "clear"
})

print("Fuel consumption:", consumption .. " units/sec")
```

### CalculateVehicleValue

Calculates the current market value of a vehicle based on condition and modifications.

**Syntax:**
```lua
local value = exports.community_bridge:CalculateVehicleValue(vehicleData)
```

**Parameters:**
- `vehicleData` (table): Complete vehicle data
  - `model` (string): Vehicle model
  - `purchasePrice` (number): Original purchase price
  - `modifications` (table): Applied modifications
  - `condition` (number): Vehicle condition (0-100)
  - `mileage` (number): Vehicle mileage
  - `age` (number): Vehicle age in days

**Returns:**
- `value` (number): Current estimated value

**Example:**
```lua
local currentValue = exports.community_bridge:CalculateVehicleValue({
    model = "zentorno",
    purchasePrice = 100000,
    modifications = {
        engine = 4,
        brakes = 3,
        suspension = 2
    },
    condition = 85,
    mileage = 5000,
    age = 30 -- 30 days old
})

print("Current vehicle value:", currentValue)
```

### CalculateRepairCost

Calculates the cost to repair vehicle damage.

**Syntax:**
```lua
local cost = exports.community_bridge:CalculateRepairCost(vehicleData, damageData, repairType)
```

**Parameters:**
- `vehicleData` (table): Vehicle information
- `damageData` (table): Current damage state
- `repairType` (string): Type of repair ("full", "partial", "cosmetic")

**Returns:**
- `cost` (number): Repair cost

**Example:**
```lua
local repairCost = exports.community_bridge:CalculateRepairCost({
    model = "adder",
    class = "super"
}, {
    engine = 500,
    body = 300,
    doors = {[0] = 200}
}, "full")

print("Repair cost:", repairCost)
```

## Vehicle Utilities

### GetVehicleClass

Gets the vehicle class information with detailed specifications.

**Syntax:**
```lua
local classData = exports.community_bridge:GetVehicleClass(model)
```

**Parameters:**
- `model` (string): Vehicle model name

**Returns:**
- `classData` (table): Vehicle class information
  - `class` (string): Vehicle class name
  - `type` (string): Vehicle type
  - `seats` (number): Number of seats
  - `fuelType` (string): Fuel type
  - `basePrice` (number): Base market price
  - `performance` (table): Performance characteristics

**Example:**
```lua
local classData = exports.community_bridge:GetVehicleClass("adder")
print("Class:", classData.class)
print("Seats:", classData.seats)
print("Fuel Type:", classData.fuelType)
print("Base Price:", classData.basePrice)
```

### GetVehicleSpecs

Gets detailed vehicle specifications and capabilities.

**Syntax:**
```lua
local specs = exports.community_bridge:GetVehicleSpecs(model)
```

**Parameters:**
- `model` (string): Vehicle model name

**Returns:**
- `specs` (table): Vehicle specifications
  - `topSpeed` (number): Maximum speed
  - `acceleration` (number): Acceleration rating
  - `braking` (number): Braking rating
  - `handling` (number): Handling rating
  - `fuelCapacity` (number): Fuel tank capacity
  - `weight` (number): Vehicle weight

**Example:**
```lua
local specs = exports.community_bridge:GetVehicleSpecs("zentorno")
print("Top Speed:", specs.topSpeed .. " km/h")
print("Acceleration:", specs.acceleration .. "/10")
print("Fuel Capacity:", specs.fuelCapacity .. " liters")
```

### FormatVehicleName

Formats a vehicle model name for display purposes.

**Syntax:**
```lua
local displayName = exports.community_bridge:FormatVehicleName(model)
```

**Parameters:**
- `model` (string): Vehicle model name

**Returns:**
- `displayName` (string): Formatted display name

**Example:**
```lua
local displayName = exports.community_bridge:FormatVehicleName("adder")
print(displayName) -- Output: "Truffade Adder"

local displayName2 = exports.community_bridge:FormatVehicleName("police")
print(displayName2) -- Output: "Police Cruiser"
```

## Vehicle Templates

### GetVehicleTemplate

Gets a predefined vehicle template with common configurations.

**Syntax:**
```lua
local template = exports.community_bridge:GetVehicleTemplate(templateName)
```

**Parameters:**
- `templateName` (string): Template name ("police", "taxi", "delivery", "racing", "luxury")

**Returns:**
- `template` (table): Vehicle template configuration

**Example:**
```lua
local policeTemplate = exports.community_bridge:GetVehicleTemplate("police")
-- Returns:
-- {
--     modifications = {
--         engine = 3,
--         brakes = 3,
--         transmission = 3,
--         armor = 4
--     },
--     livery = 1,
--     extras = {[1] = true, [2] = true},
--     sirens = true,
--     locked = false
-- }

local taxiTemplate = exports.community_bridge:GetVehicleTemplate("taxi")
-- Returns taxi-specific configuration
```

### CreateCustomTemplate

Creates a custom vehicle template for reuse.

**Syntax:**
```lua
local success = exports.community_bridge:CreateCustomTemplate(templateName, templateData)
```

**Parameters:**
- `templateName` (string): Custom template name
- `templateData` (table): Template configuration

**Returns:**
- `success` (boolean): Whether template was created successfully

**Example:**
```lua
local success = exports.community_bridge:CreateCustomTemplate("racing_setup", {
    modifications = {
        engine = 4,
        brakes = 3,
        transmission = 3,
        suspension = 4,
        turbo = true
    },
    primaryColor = {255, 0, 0},
    secondaryColor = {0, 0, 0},
    wheels = {type = 1, index = 20},
    spoiler = 3,
    weight = -50 -- Weight reduction
})

if success then
    print("Racing template created successfully")
end
```

## Vehicle Conversion Utilities

### ConvertVehicleData

Converts vehicle data between different formats (database, network, display).

**Syntax:**
```lua
local convertedData = exports.community_bridge:ConvertVehicleData(vehicleData, fromFormat, toFormat)
```

**Parameters:**
- `vehicleData` (table): Vehicle data to convert
- `fromFormat` (string): Source format ("database", "network", "game")
- `toFormat` (string): Target format ("database", "network", "game")

**Returns:**
- `convertedData` (table): Converted vehicle data

**Example:**
```lua
-- Convert from game format to database format
local dbData = exports.community_bridge:ConvertVehicleData(gameVehicleData, "game", "database")

-- Convert from database format to network format for client sync
local networkData = exports.community_bridge:ConvertVehicleData(dbData, "database", "network")
```

### SerializeVehicleData

Serializes vehicle data for storage or transmission.

**Syntax:**
```lua
local serialized = exports.community_bridge:SerializeVehicleData(vehicleData, compression)
```

**Parameters:**
- `vehicleData` (table): Vehicle data to serialize
- `compression` (boolean): Enable compression (optional, default: false)

**Returns:**
- `serialized` (string): Serialized data string

**Example:**
```lua
local serialized = exports.community_bridge:SerializeVehicleData(vehicleData, true)
-- Store in database or send over network

-- Deserialize when needed
local vehicleData = exports.community_bridge:DeserializeVehicleData(serialized)
```

## Vehicle Constants

### GetVehicleConstants

Gets vehicle-related constants and configuration values.

**Syntax:**
```lua
local constants = exports.community_bridge:GetVehicleConstants()
```

**Returns:**
- `constants` (table): Vehicle constants
  - `maxFuel` (number): Maximum fuel level
  - `maxHealth` (number): Maximum vehicle health
  - `classes` (table): Vehicle class definitions
  - `fuelTypes` (table): Available fuel types
  - `repairMultipliers` (table): Repair cost multipliers

**Example:**
```lua
local constants = exports.community_bridge:GetVehicleConstants()
print("Max fuel:", constants.maxFuel)
print("Available classes:", json.encode(constants.classes))
```

## Distance and Position Utilities

### CalculateDistance

Calculates distance between two positions or vehicles.

**Syntax:**
```lua
local distance = exports.community_bridge:CalculateDistance(pos1, pos2, use3D)
```

**Parameters:**
- `pos1` (vector3): First position
- `pos2` (vector3): Second position
- `use3D` (boolean): Use 3D distance calculation (optional, default: true)

**Returns:**
- `distance` (number): Distance in units

**Example:**
```lua
local distance = exports.community_bridge:CalculateDistance(
    vector3(100, 200, 30),
    vector3(150, 250, 35),
    true
)
print("Distance:", distance .. " units")
```

### FindNearestRoad

Finds the nearest road position to given coordinates.

**Syntax:**
```lua
local roadPos = exports.community_bridge:FindNearestRoad(coords, radius)
```

**Parameters:**
- `coords` (vector3): Search center coordinates
- `radius` (number): Search radius (optional, default: 50.0)

**Returns:**
- `roadPos` (vector3): Nearest road position or `nil` if not found

**Example:**
```lua
local roadPos = exports.community_bridge:FindNearestRoad(vector3(100, 200, 30), 100)
if roadPos then
    print("Nearest road at:", roadPos)
else
    print("No road found nearby")
end
```

## Best Practices

### Data Validation Pipeline

```lua
-- Create a validation pipeline for vehicle operations
local function validateVehicleOperation(vehicleData, operation)
    -- Step 1: Validate model
    local modelValid, modelError = exports.community_bridge:ValidateVehicleModel(vehicleData.model)
    if not modelValid then
        return false, "Invalid model: " .. modelError
    end
    
    -- Step 2: Validate data structure
    local dataValid, dataErrors = exports.community_bridge:ValidateVehicleData(vehicleData)
    if not dataValid then
        return false, "Data validation failed: " .. table.concat(dataErrors, ", ")
    end
    
    -- Step 3: Operation-specific validation
    if operation == "spawn" and vehicleData.plate then
        local plateValid, plateError = exports.community_bridge:ValidatePlateNumber(vehicleData.plate, true)
        if not plateValid then
            return false, "Invalid plate: " .. plateError
        end
    end
    
    return true
end
```

### Performance Optimization

```lua
-- Cache frequently accessed vehicle data
local vehicleDataCache = {}
local cacheTimeout = 300000 -- 5 minutes

local function getCachedVehicleSpecs(model)
    local currentTime = GetGameTimer()
    local cached = vehicleDataCache[model]
    
    if cached and (currentTime - cached.timestamp) < cacheTimeout then
        return cached.data
    end
    
    local specs = exports.community_bridge:GetVehicleSpecs(model)
    vehicleDataCache[model] = {
        data = specs,
        timestamp = currentTime
    }
    
    return specs
end
```

### Error Handling

```lua
-- Robust error handling for vehicle operations
local function safeVehicleOperation(operation, ...)
    local success, result = pcall(operation, ...)
    
    if not success then
        print("Vehicle operation failed:", result)
        return nil, "Operation failed: " .. result
    end
    
    return result, nil
end

-- Usage example
local vehicle, error = safeVehicleOperation(exports.community_bridge.SpawnVehicle, spawnConfig)
if not vehicle then
    print("Spawn failed:", error)
end
```

---

These shared functions provide essential utilities for vehicle data validation, calculations, and management that work consistently across both client and server environments.
