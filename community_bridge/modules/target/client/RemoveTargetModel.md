---
layout: default
title: RemoveTargetModel
parent: Client Functions
grand_parent: "🎯 Target"
nav_order: 6
---

# RemoveTargetModel
{: .no_toc }
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
