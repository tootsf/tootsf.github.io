---
layout: default
title: GetPlayerIdentifier
parent: Client Functions
grand_parent: Framework
nav_order: 10
---

# GetPlayerIdentifier
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's unique identifier (citizenid).

## Syntax

```lua
function Framework.GetPlayerIdentifier()
```

## Returns

**string**  
Player identifier

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local citizenId = Bridge.Framework.GetPlayerIdentifier()
print("Player ID: " .. citizenId)
```
