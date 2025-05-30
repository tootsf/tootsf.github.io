---
layout: default
title: "RemoveTargetModel"
parent: Functions
grand_parent: Client
great_grand_parent: "🎯 Target"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/target/client/functions/RemoveTargetModel/
---

# RemoveTargetModel
{: .no_toc }

Client
{: .label .label-blue }

# RemoveTargetModel
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Removes targeting from entity models.

## Syntax

```lua
Bridge.Target.RemoveTargetModel(models, name)
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
