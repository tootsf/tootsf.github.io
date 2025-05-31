---
layout: default
title: "AddTargetModel"
parent: Functions
grand_parent: Client
great_grand_parent: "🎯 Target"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/target/client/functions/AddTargetModel/
---

# AddTargetModel
{: .no_toc }

Client
{: .label .label-blue }

# AddTargetModel
{: .no_toc }
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
