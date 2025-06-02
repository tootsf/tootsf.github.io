---
layout: default
title: "GetPlayerIdentifier"
parent: Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/GetPlayerIdentifier/
---

# GetPlayerIdentifier
{: .no_toc }

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