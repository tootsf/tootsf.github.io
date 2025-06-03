---
layout: default
title: "AddTargetCoords"
parent: Functions
grand_parent: Client
great_grand_parent: 🎯 Target
nav_order: 1
permalink: /community_bridge/modules/target/client/functions/AddTargetCoords/
---

# AddTargetCoords
{: .no_toc }

Adds targeting interaction at specific coordinates.

## Syntax

```lua
Bridge.Target.AddTargetCoords(coords, options)
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