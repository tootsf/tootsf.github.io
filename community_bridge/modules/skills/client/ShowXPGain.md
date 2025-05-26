---
layout: default
title: ShowXPGain
parent: Client Functions
grand_parent: Skills
nav_order: 4
---

# ShowXPGain
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Shows an XP gain notification.

## Syntax

```lua
function Skills.ShowXPGain(skillName, xpAmount, reason)
```

## Parameters

**skillName:** `string`  
Skill that gained XP.

**xpAmount:** `number`  
Amount of XP gained.

**reason:** `string` (optional)  
Reason for XP gain.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('skills:xpGained')
AddEventHandler('skills:xpGained', function(skillName, amount, reason)
    Bridge.Skills.ShowXPGain(skillName, amount, reason)
    
    -- Show floating text above player
    local coords = GetEntityCoords(PlayerPedId())
    local text = string.format("+%d XP (%s)", amount, skillName)
    -- Add floating text implementation here
end)
```
