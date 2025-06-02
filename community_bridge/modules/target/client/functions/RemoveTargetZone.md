---
layout: default
title: "RemoveTargetZone"
parent: Functions
grand_parent: Client
great_grand_parent: 🎯 Target
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/target/client/functions/RemoveTargetZone/
---

# RemoveTargetZone
{: .no_toc }

Removes a target zone.

## Syntax

```lua
Bridge.Target.RemoveTargetZone(name)
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