---
layout: default
title: GetIsPlayerDead
parent: Client Functions
grand_parent: Framework
nav_order: 17
---

# GetIsPlayerDead
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if the player is currently dead or in last stand.

## Syntax

```lua
function Framework.GetIsPlayerDead()
```

## Returns

**boolean**  
True if player is dead/downed

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.GetIsPlayerDead() then
    print("Player is dead or downed")
end
```
