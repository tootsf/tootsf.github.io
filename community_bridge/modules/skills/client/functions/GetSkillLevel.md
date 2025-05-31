---
layout: default
title: GetSkillLevel
parent: Functions
grand_parent: Client
great_grand_parent: "⭐ Skills"
great_great_grand_parent: Modules
nav_order: 2
permalink: /community_bridge/modules/skills/client/functions/GetSkillLevel/
---

# GetSkillLevel
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Retrieves the current level of a specific skill for the local player from the configured skill system.

## Syntax

```lua
Bridge.Skills.GetSkillLevel(skillName)
```

## Parameters

| Parameter | Type | Description | Required |
|-----------|------|-------------|----------|
| `skillName` | `string` | The name of the skill to query | ✅ |

## Returns

| Type | Description |
|------|-------------|
| `number` | The current skill level (0 if skill not found or no system configured) |

## Example

```lua
-- Get a player's driving skill level
local drivingLevel = Bridge.Skills.GetSkillLevel("driving")
print("Your driving skill level: " .. drivingLevel)

-- Check if player meets minimum skill requirement
local fishingLevel = Bridge.Skills.GetSkillLevel("fishing")
if fishingLevel >= 50 then
    print("You can access advanced fishing areas!")
else
    print("You need level 50 fishing to access this area")
end

-- Get multiple skill levels
local skills = {"mining", "crafting", "cooking"}
for _, skill in ipairs(skills) do
    local level = Bridge.Skills.GetSkillLevel(skill)
    print(skill .. " level: " .. level)
end
```

## System Compatibility

This function works with all supported skill systems:
- **pickle_xp** - Retrieves level using `exports.pickle_xp:GetPlayerLevel()`
- **evolent_skills** - Compatible with Evolent Skills system
- **OT_skills** - Compatible with OT Skills system  
- **ot_skills** - Compatible with alternative OT Skills system
- **_default** - Returns 0 when no system is available

## Notes

- Returns 0 if the skill doesn't exist or no skill system is configured
- Skill names are case-sensitive and must match the skill system's naming convention
- Different skill systems may use different skill names - check your specific system's documentation
- This is a client-side function that operates on the local player only
