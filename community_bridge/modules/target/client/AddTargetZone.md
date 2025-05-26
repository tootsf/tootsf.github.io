---
layout: default
title: AddTargetZone
parent: Client Functions
grand_parent: Target
nav_order: 4
---

# AddTargetZone
{: .no_toc }
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
