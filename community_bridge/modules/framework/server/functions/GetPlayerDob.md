---
layout: default
title: "GetPlayerDob"
parent: Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/GetPlayerDob/
---

# GetPlayerDob
{: .no_toc }

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

---