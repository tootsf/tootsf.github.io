---
layout: default
title: GetPlayerMetaData
parent: Client Functions
grand_parent: Framework
nav_order: 5
---

# GetPlayerMetaData
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets specific metadata for the player.

## Syntax

```lua
function Framework.GetPlayerMetaData(metadata)
```

## Parameters

**metadata:** `string`  
The metadata key to retrieve

## Returns

**any**  
The metadata value

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local hunger = Bridge.Framework.GetPlayerMetaData("hunger")
print("Player hunger: " .. hunger)
```
