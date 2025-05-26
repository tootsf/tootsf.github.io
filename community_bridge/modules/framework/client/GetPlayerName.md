---
layout: default
title: GetPlayerName
parent: Client Functions
grand_parent: "🧩 Framework"
nav_order: 11
---

# GetPlayerName
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's first and last name.

## Syntax

```lua
function Framework.GetPlayerName()
```

## Returns

**string**  
First name

**string**  
Last name

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local firstname, lastname = Bridge.Framework.GetPlayerName()
print("Player: " .. firstname .. " " .. lastname)
```
