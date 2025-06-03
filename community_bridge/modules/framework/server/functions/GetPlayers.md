---
layout: default
title: "GetPlayers"
parent: Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/GetPlayers/
---

# GetPlayers
{: .no_toc }

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