---
layout: default
title: GetPlayerDob
parent: Server Functions
grand_parent: "🧩 Framework"
nav_order: 4
---

# GetPlayerDob
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets the player's date of birth.

## Syntax

```lua
function Framework.GetPlayerDob(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**string**  
Date of birth

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local dob = Bridge.Framework.GetPlayerDob(source)
print("DOB: " .. dob)
```
