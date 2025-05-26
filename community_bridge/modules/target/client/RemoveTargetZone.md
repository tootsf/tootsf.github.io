---
layout: default
title: RemoveTargetZone
parent: Client Functions
grand_parent: Target
nav_order: 7
---

# RemoveTargetZone
{: .no_toc }
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
