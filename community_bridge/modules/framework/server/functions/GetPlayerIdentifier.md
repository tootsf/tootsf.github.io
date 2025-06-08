---
layout: default
title: "GetPlayerIdentifier"
parent: Framework Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
nav_order: 1
---

# GetPlayerIdentifier
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

---