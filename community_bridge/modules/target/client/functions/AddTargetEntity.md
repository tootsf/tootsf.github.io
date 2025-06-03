---
layout: default
title: "AddTargetEntity"
parent: Functions
grand_parent: Client
great_grand_parent: 🎯 Target
nav_order: 2
permalink: /community_bridge/modules/target/client/functions/AddTargetEntity/
---

# AddTargetEntity
{: .no_toc }

Adds targeting interaction to a specific entity.

## Syntax

```lua
Bridge.Target.AddTargetEntity(entity, options)
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