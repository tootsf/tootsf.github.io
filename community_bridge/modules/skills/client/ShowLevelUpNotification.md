---
layout: default
title: ShowLevelUpNotification
parent: Client Functions
grand_parent: Skills
nav_order: 3
---

# ShowLevelUpNotification
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Shows a level up notification with rewards.

## Syntax

```lua
function Skills.ShowLevelUpNotification(skillName, newLevel, rewards)
```

## Parameters

**skillName:** `string`  
Name of the skill that leveled up.

**newLevel:** `number`  
New skill level.

**rewards:** `table` (optional)  
Array of rewards received.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show level up notification with rewards
Bridge.Skills.ShowLevelUpNotification("driving", 5, {
    { type = "item", name = "repairkit", label = "Repair Kit", quantity = 1 },
    { type = "money", amount = 500, label = "$500" }
})
```
