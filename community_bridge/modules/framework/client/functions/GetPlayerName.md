---
layout: default
title: "GetPlayerName"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetPlayerName/
---

# GetPlayerName
{: .no_toc }

Client
{: .label .label-blue }

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

---
