---
layout: default
title: GetPlayerIdentifier
parent: Server Functions
grand_parent: "🧩 Framework"
nav_order: 5
---

# GetPlayerIdentifier
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns the citizen ID of the player.

## Syntax

```lua
function Framework.GetPlayerIdentifier(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**string**  
Citizen ID

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local citizenId = Bridge.Framework.GetPlayerIdentifier(source)
print("Player ID: " .. citizenId)
```
