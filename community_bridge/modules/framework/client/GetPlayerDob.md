---
layout: default
title: GetPlayerDob
parent: Client Functions
grand_parent: "🧩 Framework"
nav_order: 4
---

# GetPlayerDob
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's date of birth.

## Syntax

```lua
function Framework.GetPlayerDob()
```

## Returns

**string**  
Date of birth string

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local dob = Bridge.Framework.GetPlayerDob()
print("Player DOB: " .. dob)
```
