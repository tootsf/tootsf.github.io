---
layout: default
title: "GetPlayerMetaData"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetPlayerMetaData/
---

# GetPlayerMetaData
{: .no_toc }

Client
{: .label .label-blue }

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

---
