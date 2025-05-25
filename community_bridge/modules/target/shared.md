---
layout: default
title: Shared Functions
parent: Target
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 3
permalink: /community_bridge/modules/target/shared/
---

# Target Module - Shared Functions
{: .no_toc }

Shared utilities and configurations for the Target module.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Validation Functions

### `exports.community_bridge:ValidateTargetConfig(config)`

Validates target configuration structure and data types.

**Parameters:**
- `config` (table): Target configuration to validate

**Returns:**
- `boolean`: True if valid
- `string`: Error message if invalid

**Example:**
```lua
local targetConfig = {
    name = "test_target",
    models = {"prop_atm_01"},
    options = {
        {
            name = "use",
            icon = "fas fa-hand",
            label = "Use ATM",
            action = function() end
        }
    }
}

local isValid, error = exports.community_bridge:ValidateTargetConfig(targetConfig)
if not isValid then
    print("Target validation failed:", error)
end
```

### `exports.community_bridge:ValidateTargetOptions(options)`

Validates target option arrays.

**Parameters:**
- `options` (table): Array of target options

**Returns:**
- `boolean`: True if valid
- `table`: Array of validation errors

**Example:**
```lua
local options = {
    {
        name = "option1",
        icon = "fas fa-check",
        label = "Valid Option"
    },
    {
        -- Missing required fields
        icon = "fas fa-times"
    }
}

local isValid, errors = exports.community_bridge:ValidateTargetOptions(options)
if not isValid then
    for _, error in pairs(errors) do
        print("Option error:", error)
    end
end
```

## Utility Functions

### `exports.community_bridge:GetDistance(coords1, coords2)`

Calculates distance between two coordinate points.

**Parameters:**
- `coords1` (vector3): First coordinate
- `coords2` (vector3): Second coordinate

**Returns:**
- `number`: Distance between coordinates

**Example:**
```lua
local playerPos = GetEntityCoords(PlayerPedId())
local targetPos = vector3(100.0, -100.0, 30.0)
local distance = exports.community_bridge:GetDistance(playerPos, targetPos)

if distance <= 2.0 then
    print("Within interaction range")
end
```

### `exports.community_bridge:IsInTargetZone(coords, zone)`

Checks if coordinates are within a target zone.

**Parameters:**
- `coords` (vector3): Coordinates to check
- `zone` (table): Zone definition with center, width, length, heading

**Returns:**
- `boolean`: True if coordinates are in zone

**Example:**
```lua
local zone = {
    center = vector3(100.0, -100.0, 30.0),
    width = 5.0,
    length = 5.0,
    heading = 0.0,
    minZ = 29.0,
    maxZ = 31.0
}

local playerPos = GetEntityCoords(PlayerPedId())
if exports.community_bridge:IsInTargetZone(playerPos, zone) then
    print("Player is in target zone")
end
```

### `exports.community_bridge:GetEntityModel(entity)`

Gets the model hash or name for an entity.

**Parameters:**
- `entity` (number): Entity handle

**Returns:**
- `string|number`: Model name or hash

**Example:**
```lua
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
local model = exports.community_bridge:GetEntityModel(vehicle)
print("Vehicle model:", model)
```

## Configuration Functions

### `exports.community_bridge:CreateTargetOption(config)`

Creates a standardized target option structure.

**Parameters:**
- `config` (table): Option configuration
  - `name` (string): Unique option identifier
  - `label` (string): Display text
  - `icon` (string): Font Awesome icon
  - `action` (function, optional): Client action
  - `serverEvent` (string, optional): Server event to trigger
  - `canInteract` (function, optional): Interaction condition

**Returns:**
- `table`: Formatted target option

**Example:**
```lua
local option = exports.community_bridge:CreateTargetOption({
    name = "use_atm",
    label = "Use ATM",
    icon = "fas fa-credit-card",
    serverEvent = "banking:useATM",
    canInteract = function()
        return not IsPedInCombat(PlayerPedId(), 0)
    end
})
```

### `exports.community_bridge:CreateTargetZone(config)`

Creates a standardized target zone structure.

**Parameters:**
- `config` (table): Zone configuration
  - `name` (string): Zone identifier
  - `coords` (vector3): Center coordinates
  - `size` (vector3|table): Zone dimensions
  - `rotation` (number, optional): Zone rotation
  - `options` (table): Target options

**Returns:**
- `table`: Formatted target zone

**Example:**
```lua
local zone = exports.community_bridge:CreateTargetZone({
    name = "parking_area",
    coords = vector3(200.0, -800.0, 31.0),
    size = {width = 10.0, length = 15.0, height = 3.0},
    rotation = 45.0,
    options = {parkingOptions}
})
```

## Template Functions

### `exports.community_bridge:CreateShopTargets(shopConfig)`

Creates standardized shop interaction targets.

**Parameters:**
- `shopConfig` (table): Shop configuration
  - `name` (string): Shop identifier
  - `coords` (vector3): Shop location
  - `items` (table): Available items
  - `blip` (table, optional): Blip configuration

**Returns:**
- `table`: Complete shop target configuration

**Example:**
```lua
local shopTargets = exports.community_bridge:CreateShopTargets({
    name = "general_store",
    coords = vector3(25.0, -1347.0, 29.0),
    items = {
        {name = "water", label = "Water Bottle", price = 50},
        {name = "sandwich", label = "Sandwich", price = 100}
    },
    blip = {
        sprite = 52,
        color = 2,
        scale = 0.8
    }
})
```

### `exports.community_bridge:CreateVehicleTargets(vehicle, options)`

Creates vehicle-specific target options.

**Parameters:**
- `vehicle` (number|string): Vehicle entity or model
- `options` (table): Additional configuration options

**Returns:**
- `table`: Vehicle target configuration

**Example:**
```lua
local vehicleTargets = exports.community_bridge:CreateVehicleTargets("adder", {
    includeDefault = true,
    customOptions = {
        {
            name = "tune",
            label = "Tune Vehicle",
            icon = "fas fa-wrench",
            requiredJob = "mechanic"
        }
    }
})
```

### `exports.community_bridge:CreateJobTargets(jobName, config)`

Creates job-specific target configurations.

**Parameters:**
- `jobName` (string): Job identifier
- `config` (table): Job target configuration

**Returns:**
- `table`: Job target structure

**Example:**
```lua
local policeTargets = exports.community_bridge:CreateJobTargets("police", {
    locations = {
        {
            coords = vector3(441.0, -982.0, 30.0),
            options = {
                {name = "duty", label = "Go On/Off Duty", icon = "fas fa-badge"},
                {name = "armory", label = "Access Armory", icon = "fas fa-gun"}
            }
        }
    }
})
```

## Icon and Label Utilities

### `exports.community_bridge:GetStandardIcon(actionType)`

Gets standardized icons for common actions.

**Parameters:**
- `actionType` (string): Action type identifier

**Returns:**
- `string`: Font Awesome icon class

**Example:**
```lua
local icons = {
    buy = exports.community_bridge:GetStandardIcon("buy"),         -- "fas fa-shopping-cart"
    sell = exports.community_bridge:GetStandardIcon("sell"),       -- "fas fa-money-bill"
    use = exports.community_bridge:GetStandardIcon("use"),         -- "fas fa-hand"
    enter = exports.community_bridge:GetStandardIcon("enter"),     -- "fas fa-door-open"
    exit = exports.community_bridge:GetStandardIcon("exit"),       -- "fas fa-door-closed"
    repair = exports.community_bridge:GetStandardIcon("repair"),   -- "fas fa-wrench"
    fuel = exports.community_bridge:GetStandardIcon("fuel"),       -- "fas fa-gas-pump"
}
```

### `exports.community_bridge:FormatTargetLabel(text, data)`

Formats target labels with dynamic data.

**Parameters:**
- `text` (string): Label template with placeholders
- `data` (table): Data to insert into placeholders

**Returns:**
- `string`: Formatted label

**Example:**
```lua
local label = exports.community_bridge:FormatTargetLabel(
    "Buy {item} - ${price}",
    {item = "Water Bottle", price = 50}
)
-- Returns: "Buy Water Bottle - $50"
```

## Condition Functions

### `exports.community_bridge:CreateJobCondition(jobName, minGrade)`

Creates a job-based interaction condition.

**Parameters:**
- `jobName` (string): Required job name
- `minGrade` (number, optional): Minimum job grade (default: 0)

**Returns:**
- `function`: Condition function

**Example:**
```lua
local policeCondition = exports.community_bridge:CreateJobCondition("police", 2)

local targetOption = {
    name = "arrest",
    label = "Arrest Player",
    icon = "fas fa-handcuffs",
    canInteract = policeCondition
}
```

### `exports.community_bridge:CreateItemCondition(itemName, minCount)`

Creates an item-based interaction condition.

**Parameters:**
- `itemName` (string): Required item name
- `minCount` (number, optional): Minimum item count (default: 1)

**Returns:**
- `function`: Condition function

**Example:**
```lua
local keyCondition = exports.community_bridge:CreateItemCondition("house_key", 1)

local houseOption = {
    name = "unlock",
    label = "Unlock House",
    icon = "fas fa-key",
    canInteract = keyCondition
}
```

### `exports.community_bridge:CreateMoneyCondition(amount, account)`

Creates a money-based interaction condition.

**Parameters:**
- `amount` (number): Required money amount
- `account` (string, optional): Account type (default: "cash")

**Returns:**
- `function`: Condition function

**Example:**
```lua
local expensiveItemCondition = exports.community_bridge:CreateMoneyCondition(10000, "bank")

local luxuryOption = {
    name = "buy_luxury",
    label = "Buy Luxury Item - $10,000",
    icon = "fas fa-gem",
    canInteract = expensiveItemCondition
}
```

## Data Processing

### `exports.community_bridge:ProcessTargetData(rawData)`

Processes and standardizes raw target data.

**Parameters:**
- `rawData` (table): Raw target configuration

**Returns:**
- `table`: Processed target data

**Example:**
```lua
local rawConfig = {
    name = "shop",
    location = {x = 100, y = -100, z = 30},
    actions = {"buy", "sell"}
}

local processedData = exports.community_bridge:ProcessTargetData(rawConfig)
-- Converts to standard format with vector3 coords and proper options
```

### `exports.community_bridge:MergeTargetConfigs(config1, config2)`

Merges two target configurations.

**Parameters:**
- `config1` (table): First configuration
- `config2` (table): Second configuration

**Returns:**
- `table`: Merged configuration

**Example:**
```lua
local baseConfig = {
    name = "vehicle_base",
    options = {
        {name = "lock", label = "Lock/Unlock", icon = "fas fa-lock"}
    }
}

local mechanicConfig = {
    options = {
        {name = "repair", label = "Repair", icon = "fas fa-wrench"}
    }
}

local mergedConfig = exports.community_bridge:MergeTargetConfigs(baseConfig, mechanicConfig)
-- Results in config with both lock and repair options
```

## Constants and Enums

### Target Types

```lua
TargetTypes = {
    ENTITY = "entity",
    MODEL = "model", 
    COORDS = "coords",
    ZONE = "zone",
    BONE = "bone"
}
```

### Standard Icons

```lua
StandardIcons = {
    -- Actions
    BUY = "fas fa-shopping-cart",
    SELL = "fas fa-money-bill",
    USE = "fas fa-hand",
    INTERACT = "fas fa-hand-point-right",
    ENTER = "fas fa-door-open",
    EXIT = "fas fa-door-closed",
    
    -- Vehicles
    LOCK = "fas fa-lock",
    UNLOCK = "fas fa-unlock",
    ENGINE = "fas fa-power-off",
    TRUNK = "fas fa-box-open",
    HOOD = "fas fa-car-crash",
    
    -- Jobs
    POLICE = "fas fa-shield-alt",
    MEDIC = "fas fa-medkit",
    MECHANIC = "fas fa-wrench",
    TAXI = "fas fa-taxi",
    
    -- Items
    WEAPON = "fas fa-gun",
    FOOD = "fas fa-hamburger",
    DRINK = "fas fa-coffee",
    MEDICAL = "fas fa-pills",
    TOOL = "fas fa-hammer"
}
```

### Standard Labels

```lua
StandardLabels = {
    BUY = "Purchase",
    SELL = "Sell",
    USE = "Use",
    ENTER = "Enter",
    EXIT = "Exit",
    LOCK = "Lock",
    UNLOCK = "Unlock",
    REPAIR = "Repair",
    REFUEL = "Refuel"
}
```

## Helper Functions

### `exports.community_bridge:GetTargetDistance(coords1, coords2)`

Alias for GetDistance with target-specific context.

### `exports.community_bridge:IsValidEntity(entity)`

Checks if an entity handle is valid for targeting.

**Parameters:**
- `entity` (number): Entity handle

**Returns:**
- `boolean`: True if entity is valid

### `exports.community_bridge:GetTargetCenter(target)`

Gets the center point of a target configuration.

**Parameters:**
- `target` (table): Target configuration

**Returns:**
- `vector3`: Center coordinates

## Best Practices

### Configuration Guidelines

1. **Use templates** - Leverage standard templates for common scenarios
2. **Validate inputs** - Always validate target configurations
3. **Consistent naming** - Use clear, descriptive names
4. **Standard icons** - Use predefined icons for consistency

### Performance Tips

1. **Efficient conditions** - Keep canInteract functions lightweight
2. **Minimal data** - Only include necessary configuration data
3. **Reuse configurations** - Cache and reuse common target setups
4. **Batch processing** - Process multiple targets together when possible

### Example Usage

```lua
-- Complete target setup using shared utilities
local function SetupShopTargets()
    local shopConfig = {
        name = "general_store",
        coords = vector3(25.0, -1347.0, 29.0),
        items = Config.ShopItems
    }
    
    -- Validate configuration
    local isValid, error = exports.community_bridge:ValidateTargetConfig(shopConfig)
    if not isValid then
        print("Shop config error:", error)
        return
    end
    
    -- Create standardized shop targets
    local targets = exports.community_bridge:CreateShopTargets(shopConfig)
    
    -- Register targets
    exports.community_bridge:RegisterGlobalTarget(targets)
    
    print("Shop targets registered successfully")
end
```
