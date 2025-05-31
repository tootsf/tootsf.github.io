---
layout: default
title: "GetPlayerData"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetPlayerData/
---

# GetPlayerData
{: .no_toc }

Client
{: .label .label-blue }

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

---
