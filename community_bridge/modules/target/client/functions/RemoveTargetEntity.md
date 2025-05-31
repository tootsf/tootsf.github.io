---
layout: default
title: "RemoveTargetEntity"
parent: Functions
grand_parent: Client
great_grand_parent: "🎯 Target"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/target/client/functions/RemoveTargetEntity/
---

# RemoveTargetEntity
{: .no_toc }

Client
{: .label .label-blue }

# RemoveTargetEntity
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Removes targeting from a specific entity.

## Syntax

```lua
Bridge.Target.RemoveTargetEntity(entity, name)
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
