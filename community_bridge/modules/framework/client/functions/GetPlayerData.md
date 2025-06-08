---
layout: default
title: "GetPlayerData"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
nav_order: 6
permalink: /community_bridge/modules/framework/client/functions/GetPlayerData/
nav_exclude: true
---

# GetPlayerData
{: .no_toc }

Gets the complete player data from the framework.

## Syntax

```lua
function Framework.GetPlayerData()
```

## Returns

**table**
Complete player data structure

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerData = Bridge.Framework.GetPlayerData()
print("Player name: " .. playerData.charinfo.firstname)
```
