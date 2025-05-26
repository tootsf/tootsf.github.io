---
layout: default
title: GetPlayerData
parent: Client Functions
grand_parent: "🧩 Framework"
nav_order: 2
---

# GetPlayerData
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

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
