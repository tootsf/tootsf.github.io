---
layout: default
title: "GetPlayerDob"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetPlayerDob/
---

# GetPlayerDob
{: .no_toc }

Client
{: .label .label-blue }

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

---
