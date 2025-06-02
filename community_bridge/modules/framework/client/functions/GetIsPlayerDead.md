---
layout: default
title: "GetIsPlayerDead"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetIsPlayerDead/
---

# GetIsPlayerDead
{: .no_toc }

Returns whether the local player is currently dead.

## Description

This function checks if the local player is in a dead state according to the framework's death system.

## Usage

```lua
local Bridge = exports['community_bridge']:Bridge()
local isDead = Bridge.Framework.GetIsPlayerDead()
```

## Returns

| Type | Description |
|------|-------------|
| `boolean` | `true` if player is dead, `false` otherwise |

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.GetIsPlayerDead() then
    print("Player is dead!")
else
    print("Player is alive!")
end
```
