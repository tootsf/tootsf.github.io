---
layout: default
title: ShowSkillProgress
parent: Client Functions
grand_parent: Skills
nav_order: 1
---

# ShowSkillProgress
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays skill progression information to the player.

## Syntax

```lua
function Skills.ShowSkillProgress(skillName, currentLevel, currentXP, nextLevelXP)
```

## Parameters

**skillName:** `string`  
Name of the skill.

**currentLevel:** `number`  
Current skill level.

**currentXP:** `number`  
Current experience points.

**nextLevelXP:** `number`  
XP required for next level.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('skills:showProgress')
AddEventHandler('skills:showProgress', function(skillData)
    Bridge.Skills.ShowSkillProgress(
        skillData.name,
        skillData.level,
        skillData.xp,
        skillData.nextLevelXP
    )
end)
```
