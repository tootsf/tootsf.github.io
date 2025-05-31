---
layout: default
title: "GetPlayerIdentifier"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetPlayerIdentifier/
---

# GetPlayerIdentifier
{: .no_toc }

Client
{: .label .label-blue }

# GetPlayerIdentifier
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's unique identifier (citizenid).

## Syntax

```lua
function Framework.GetPlayerIdentifier()
```

## Returns

**string**  
Player identifier

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local citizenId = Bridge.Framework.GetPlayerIdentifier()
print("Player ID: " .. citizenId)
```

---
