---
layout: default
title: "GetIsPlayerDead"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetIsPlayerDead/
---

# GetIsPlayerDead
{: .no_toc }

Client
{: .label .label-blue }

# GetIsPlayerDead
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if the player is currently dead or in last stand.

## Syntax

```lua
function Framework.GetIsPlayerDead()
```

## Returns

**boolean**  
True if player is dead/downed

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.GetIsPlayerDead() then
    print("Player is dead or downed")
end
```

---
