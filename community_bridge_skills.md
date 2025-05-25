---
title: Skills Module
sidebar_position: 9
---

# Skills Module

The Skills module in `community_bridge` provides a unified API for managing player skills and experience across different skill systems.

## Server Functions

### AddSkillXP
```lua
Skills.AddSkillXP(src, skill, amount)
```
Adds experience points to a player's skill.
- `src` (number): Player source
- `skill` (string): Skill name
- `amount` (number): Amount of XP to add

### GetSkillXP
```lua
Skills.GetSkillXP(src, skill)
```
Returns the current XP for a player's skill.

### SetSkillXP
```lua
Skills.SetSkillXP(src, skill, amount)
```
Sets the XP for a player's skill.

## Client Functions

Some skills modules may provide client events for updating skill UI or notifications.

## Shared Functions

Shared utility functions may be available depending on the skills system. See the specific skills module for details.
