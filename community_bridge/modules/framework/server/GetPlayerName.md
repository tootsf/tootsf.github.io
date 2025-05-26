---
layout: default
title: GetPlayerName
parent: Server Functions
grand_parent: "🧩 Framework"
nav_order: 7
---

# GetPlayerName
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

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
