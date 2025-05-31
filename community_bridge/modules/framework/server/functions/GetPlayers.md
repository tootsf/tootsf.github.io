---
layout: default
title: "GetPlayers"
parent: Functions
grand_parent: Server
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/GetPlayers/
---

# GetPlayers
{: .no_toc }

Server
{: .label .label-blue }

# GetPlayers
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets a list of all currently connected players.

## Syntax

```lua
function Framework.GetPlayers()
```

## Returns

**table**  
Array of player server IDs

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local players = Bridge.Framework.GetPlayers()
print("Connected players: " .. #players)
```

---
