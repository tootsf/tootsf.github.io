---
layout: default
title: GetPlayers
parent: Server Functions
grand_parent: Framework
nav_order: 3
---

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
