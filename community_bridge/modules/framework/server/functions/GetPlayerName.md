---
layout: default
title: "GetPlayerName"
parent: Framework Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
nav_order: 1
---

# GetPlayerName
Returns the first and last name of the player.

## Syntax

```lua
function Framework.GetPlayerName(src)
```

## Parameters

**src:** `number`
Player server ID

## Returns

**string**
First name

**string**
Last name

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local firstname, lastname = Bridge.Framework.GetPlayerName(source)
print("Player: " .. firstname .. " " .. lastname)
```

---