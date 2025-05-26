---
layout: default
title: UpdateSkillBar
parent: Client Functions
grand_parent: Skills
nav_order: 2
---

# UpdateSkillBar
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Updates the skill progress bar display.

## Syntax

```lua
function Skills.UpdateSkillBar(skillName, percentage)
```

## Parameters

**skillName:** `string`  
Name of the skill.

**percentage:** `number`  
Progress percentage (0-100).

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Update driving skill progress bar
Bridge.Skills.UpdateSkillBar("driving", 75.5)
```
