---
layout: docs
title: Functions
parent: Client
grand_parent: "🎯 Target"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/target/client/functions/
has_children: true
---

# Target Client Functions
{: .no_toc }

Client-side functions for targeting and interaction systems.

# Target Client Functions
{: .no_toc }

Client-side functions for targeting and interaction systems.

---

## 🔹 AddTargetCoords

## AddTargetCoords
{: .d-inline-block }
Client
{: .label .label-blue }

Adds targeting interaction at specific coordinates.

## Syntax

```lua
function Target.AddTargetCoords(coords, options)
```

## Parameters

**coords:** `vector3`  
Target coordinates.

**options:** `table`  
Target configuration with the following properties:

- **name:** `string`  
  Unique identifier.

- **icon:** `string`  
  Font Awesome icon.

- **label:** `string`  
  Display text.

- **action:** `function`  
  Callback function called when the option is selected.

- **size:** `vector3` (optional)  
  Target zone size (default: vector3(1.0, 1.0, 1.0)).

- **rotation:** `number` (optional)  
  Zone rotation in degrees (default: 0.0).

- **debugPoly:** `boolean` (optional)  
  Show debug outline.

- **distance:** `number` (optional)  
  Interaction distance (default: 2.0).

- **canInteract:** `function` (optional)  
  Conditional function that returns whether interaction is allowed.

## Returns

**Type:** `boolean`  
Success status.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create target zone at coordinates
Bridge.Target.AddTargetCoords(vector3(195.0, -933.0, 30.0), {
    name = "clothing_store",
    icon = "fas fa-tshirt",
    label = "Browse Clothing",
    size = vector3(2.0, 2.0, 2.0),
    rotation = 45.0,
    action = function()
        TriggerEvent('clothing:openShop')
    end
})
```

---

## 🔹 AddTargetEntity

## AddTargetEntity
{: .d-inline-block }
Client
{: .label .label-blue }

Adds targeting interaction to a specific entity.

## Syntax

```lua
function Target.AddTargetEntity(entity, options)
```

## Parameters

**entity:** `number`  
Entity handle.

**options:** `table`  
Target configuration with the following properties:

- **name:** `string`  
  Unique identifier.

- **icon:** `string`  
  Font Awesome icon.

- **label:** `string`  
  Display text.

- **action:** `function`  
  Callback function called when the option is selected.

- **distance:** `number` (optional)  
  Interaction distance (default: 2.0).

- **canInteract:** `function` (optional)  
  Conditional function that returns whether interaction is allowed.

## Returns

**Type:** `boolean`  
Success status.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Add target to a vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)

Bridge.Target.AddTargetEntity(vehicle, {
    name = "vehicle_options",
    icon = "fas fa-car",
    label = "Vehicle Options",
    distance = 3.0,
    action = function(entity)
        -- Open vehicle menu
        TriggerEvent('vehicle:openMenu', entity)
    end,
    canInteract = function(entity)
        -- Only if player owns the vehicle
        return Bridge.Target.IsVehicleOwned(entity)
    end
})
```

---

## 🔹 AddTargetModel

## AddTargetModel
{: .d-inline-block }
Client
{: .label .label-blue }

Adds targeting interaction to specific entity models.

## Syntax

```lua
function Target.AddTargetModel(models, options)
```

## Parameters

**models:** `table` or `string`  
Model name(s) or hash(es). Can be a single string or an array of strings.

**options:** `table`  
Target configuration with the following properties:

- **name:** `string`  
  Unique identifier.

- **icon:** `string`  
  Font Awesome icon.

- **label:** `string`  
  Display text.

- **action:** `function`  
  Callback function called when the option is selected.

- **distance:** `number` (optional)  
  Interaction distance (default: 2.0).

- **canInteract:** `function` (optional)  
  Conditional function that returns whether interaction is allowed.

## Returns

**Type:** `boolean`  
Success status.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Target ATM models
Bridge.Target.AddTargetModel({
    "prop_atm_01", 
    "prop_atm_02", 
    "prop_atm_03"
}, {
    name = "use_atm",
    icon = "fas fa-credit-card",
    label = "Use ATM",
    distance = 1.5,
    action = function(entity)
        TriggerEvent('banking:openATM')
    end
})
```

---

## 🔹 AddTargetZone

## AddTargetZone
{: .d-inline-block }
Client
{: .label .label-blue }

Adds a rectangular target zone.

## Syntax

```lua
function Target.AddTargetZone(name, coords, width, length, options)
```

## Parameters

**name:** `string`  
Unique zone identifier.

**coords:** `vector3`  
Center coordinates of the zone.

**width:** `number`  
Zone width.

**length:** `number`  
Zone length.

**options:** `table`  
Target configuration with the following properties:

- **name:** `string`  
  Unique identifier.

- **icon:** `string`  
  Font Awesome icon.

- **label:** `string`  
  Display text.

- **action:** `function`  
  Callback function called when the option is selected.

- **heading:** `number` (optional)  
  Zone heading in degrees.

- **minZ:** `number` (optional)  
  Minimum Z coordinate.

- **maxZ:** `number` (optional)  
  Maximum Z coordinate.

- **distance:** `number` (optional)  
  Interaction distance (default: 2.0).

- **canInteract:** `function` (optional)  
  Conditional function that returns whether interaction is allowed.

## Returns

**Type:** `boolean`  
Success status.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create parking zone
Bridge.Target.AddTargetZone("parking_lot", vector3(200.0, -800.0, 31.0), 10.0, 15.0, {
    name = "park_vehicle",
    icon = "fas fa-parking",
    label = "Park Vehicle",
    heading = 0.0,
    minZ = 30.0,
    maxZ = 32.0,
    action = function()
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        if vehicle ~= 0 then
            TriggerServerEvent('parking:saveVehicle', vehicle)
        end
    end,
    canInteract = function()
        return IsPedInAnyVehicle(PlayerPedId(), false)
    end
})
```

---

## 🔹 RemoveTargetEntity

## RemoveTargetEntity
{: .d-inline-block }
Client
{: .label .label-blue }

Removes targeting from a specific entity.

## Syntax

```lua
function Target.RemoveTargetEntity(entity, name)
```

## Parameters

**entity:** `number`  
Entity handle.

**name:** `string` (optional)  
Specific target name to remove. If not provided, all targets from the entity will be removed.

## Returns

**Type:** `boolean`  
Success status.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove specific target
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
Bridge.Target.RemoveTargetEntity(vehicle, "vehicle_options")

-- Remove all targets from entity
Bridge.Target.RemoveTargetEntity(vehicle)
```

---

## 🔹 RemoveTargetModel

## RemoveTargetModel
{: .d-inline-block }
Client
{: .label .label-blue }

Removes targeting from entity models.

## Syntax

```lua
function Target.RemoveTargetModel(models, name)
```

## Parameters

**models:** `table` or `string`  
Model name(s) or hash(es). Can be a single string or an array of strings.

**name:** `string` (optional)  
Specific target name to remove. If not provided, all targets from the specified models will be removed.

## Returns

**Type:** `boolean`  
Success status.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove specific target from ATM model
Bridge.Target.RemoveTargetModel("prop_atm_01", "use_atm")

-- Remove all targets from multiple ATM models
Bridge.Target.RemoveTargetModel({
    "prop_atm_01", 
    "prop_atm_02", 
    "prop_atm_03"
})
```

---

## 🔹 RemoveTargetZone

## RemoveTargetZone
{: .d-inline-block }
Client
{: .label .label-blue }

Removes a target zone.

## Syntax

```lua
function Target.RemoveTargetZone(name)
```

## Parameters

**name:** `string`  
Zone identifier.

## Returns

**Type:** `boolean`  
Success status.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove the parking lot target zone
Bridge.Target.RemoveTargetZone("parking_lot")
```