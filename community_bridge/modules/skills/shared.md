---
layout: default
title: Shared Functions
parent: Skills
grand_parent: Modules
nav_order: 3
---

# Skills - Shared Functions
{: .no_toc }

Shared utilities and configurations for the Skills module that work across both client and server environments.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Skills shared module provides common utilities, configurations, and data structures used by both client and server-side Skills functionality. This includes skill definitions, configuration management, and utility functions.

## Getting Started

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Access shared configurations
local skillConfig = Bridge.Skills.GetSkillConfig()
local skillData = Bridge.Skills.GetSkillData('driving')
```

## Configuration Functions

### GetSkillConfig
Retrieves the complete skills configuration.

```lua
Bridge.Skills.GetSkillConfig()
```

**Returns:**
- `table` - Complete skills configuration object

**Example:**
```lua
local config = Bridge.Skills.GetSkillConfig()
print(config.maxLevel) -- 100
print(config.xpMultiplier) -- 1.0
```

### GetSkillData
Gets detailed information about a specific skill.

```lua
Bridge.Skills.GetSkillData(skillName)
```

**Parameters:**
- `skillName` (string) - Name of the skill

**Returns:**
- `table` - Skill data including categories, XP requirements, etc.

**Example:**
```lua
local drivingData = Bridge.Skills.GetSkillData('driving')
print(drivingData.category) -- 'vehicle'
print(drivingData.maxLevel) -- 100
```

### GetSkillCategories
Retrieves all available skill categories.

```lua
Bridge.Skills.GetSkillCategories()
```

**Returns:**
- `table` - Array of skill category names

**Example:**
```lua
local categories = Bridge.Skills.GetSkillCategories()
for _, category in ipairs(categories) do
    print('Category:', category)
end
```

## Skill Calculation Functions

### CalculateXPRequired
Calculates the XP required to reach a specific level.

```lua
Bridge.Skills.CalculateXPRequired(level, skillName)
```

**Parameters:**
- `level` (number) - Target level
- `skillName` (string, optional) - Skill name for custom calculations

**Returns:**
- `number` - XP required to reach the level

**Example:**
```lua
local xpNeeded = Bridge.Skills.CalculateXPRequired(50, 'driving')
print('XP needed for level 50:', xpNeeded)
```

### CalculateLevelFromXP
Determines the level based on current XP.

```lua
Bridge.Skills.CalculateLevelFromXP(currentXP, skillName)
```

**Parameters:**
- `currentXP` (number) - Current XP amount
- `skillName` (string, optional) - Skill name for custom calculations

**Returns:**
- `number` - Current level based on XP

**Example:**
```lua
local level = Bridge.Skills.CalculateLevelFromXP(15000, 'driving')
print('Current level:', level)
```

### GetXPProgress
Calculates progress to the next level.

```lua
Bridge.Skills.GetXPProgress(currentXP, skillName)
```

**Parameters:**
- `currentXP` (number) - Current XP amount
- `skillName` (string, optional) - Skill name

**Returns:**
- `table` - Progress information with current level, next level, progress percentage

**Example:**
```lua
local progress = Bridge.Skills.GetXPProgress(12500, 'driving')
print('Current Level:', progress.currentLevel)
print('Next Level:', progress.nextLevel)
print('Progress:', progress.percentage .. '%')
```

## Skill Validation Functions

### IsValidSkill
Checks if a skill name is valid.

```lua
Bridge.Skills.IsValidSkill(skillName)
```

**Parameters:**
- `skillName` (string) - Name of the skill to validate

**Returns:**
- `boolean` - True if skill exists

**Example:**
```lua
if Bridge.Skills.IsValidSkill('cooking') then
    print('Cooking is a valid skill')
end
```

### IsValidLevel
Validates if a level is within acceptable range.

```lua
Bridge.Skills.IsValidLevel(level, skillName)
```

**Parameters:**
- `level` (number) - Level to validate
- `skillName` (string, optional) - Skill name for custom limits

**Returns:**
- `boolean` - True if level is valid

**Example:**
```lua
if Bridge.Skills.IsValidLevel(75, 'driving') then
    print('Level 75 is valid for driving')
end
```

### IsValidXP
Checks if XP amount is valid.

```lua
Bridge.Skills.IsValidXP(xpAmount)
```

**Parameters:**
- `xpAmount` (number) - XP amount to validate

**Returns:**
- `boolean` - True if XP amount is valid

**Example:**
```lua
if Bridge.Skills.IsValidXP(1000) then
    print('XP amount is valid')
end
```

## Utility Functions

### FormatSkillName
Formats skill name for display.

```lua
Bridge.Skills.FormatSkillName(skillName)
```

**Parameters:**
- `skillName` (string) - Raw skill name

**Returns:**
- `string` - Formatted skill name

**Example:**
```lua
local formatted = Bridge.Skills.FormatSkillName('weapon_handling')
print(formatted) -- "Weapon Handling"
```

### GetSkillIcon
Retrieves the icon for a skill.

```lua
Bridge.Skills.GetSkillIcon(skillName)
```

**Parameters:**
- `skillName` (string) - Name of the skill

**Returns:**
- `string` - Icon identifier or path

**Example:**
```lua
local icon = Bridge.Skills.GetSkillIcon('driving')
print('Driving icon:', icon)
```

### GetSkillColor
Gets the color associated with a skill or level.

```lua
Bridge.Skills.GetSkillColor(skillName, level)
```

**Parameters:**
- `skillName` (string) - Name of the skill
- `level` (number, optional) - Level for color coding

**Returns:**
- `string` - Color hex code

**Example:**
```lua
local color = Bridge.Skills.GetSkillColor('driving', 85)
print('Color for level 85 driving:', color)
```

## Data Structures

### Skill Configuration
```lua
{
    maxLevel = 100,
    xpMultiplier = 1.0,
    levelingCurve = 'exponential',
    categories = {
        'combat', 'vehicle', 'crafting', 'social', 'survival'
    }
}
```

### Skill Data
```lua
{
    name = 'driving',
    category = 'vehicle',
    description = 'Ability to operate vehicles effectively',
    maxLevel = 100,
    icon = 'fas fa-car',
    color = '#3498db',
    xpRequirements = {
        -- Level-based XP requirements
    }
}
```

### XP Progress
```lua
{
    currentLevel = 25,
    nextLevel = 26,
    currentXP = 12500,
    xpForNext = 13000,
    xpNeeded = 500,
    percentage = 75.5
}
```

## Best Practices

### Configuration Management
```lua
-- Cache configuration for performance
local skillConfig = Bridge.Skills.GetSkillConfig()

-- Validate before processing
if Bridge.Skills.IsValidSkill(skillName) then
    local skillData = Bridge.Skills.GetSkillData(skillName)
    -- Process skill data
end
```

### Level Calculations
```lua
-- Use shared functions for consistency
local function updateSkillDisplay(skillName, currentXP)
    local progress = Bridge.Skills.GetXPProgress(currentXP, skillName)
    local formattedName = Bridge.Skills.FormatSkillName(skillName)
    local color = Bridge.Skills.GetSkillColor(skillName, progress.currentLevel)
    
    -- Update UI with calculated values
end
```

### Validation Workflow
```lua
-- Comprehensive validation
local function processSkillUpdate(skillName, xpAmount)
    if not Bridge.Skills.IsValidSkill(skillName) then
        return false, 'Invalid skill name'
    end
    
    if not Bridge.Skills.IsValidXP(xpAmount) then
        return false, 'Invalid XP amount'
    end
    
    -- Process the skill update
    return true
end
```

## Integration Examples

### Custom Skill System
```lua
-- Initialize custom skill handling
local function initializeSkills()
    local categories = Bridge.Skills.GetSkillCategories()
    
    for _, category in ipairs(categories) do
        print('Initializing category:', category)
        -- Set up category-specific handlers
    end
end
```

### Dynamic Skill Display
```lua
-- Create dynamic skill information
local function createSkillInfo(skillName, playerXP)
    local skillData = Bridge.Skills.GetSkillData(skillName)
    local progress = Bridge.Skills.GetXPProgress(playerXP, skillName)
    local icon = Bridge.Skills.GetSkillIcon(skillName)
    local color = Bridge.Skills.GetSkillColor(skillName, progress.currentLevel)
    
    return {
        name = Bridge.Skills.FormatSkillName(skillName),
        level = progress.currentLevel,
        progress = progress.percentage,
        icon = icon,
        color = color,
        category = skillData.category
    }
end
```

---

## Related Documentation

- [Skills Client Functions](client.md) - Client-side skill management
- [Skills Server Functions](server.md) - Server-side skill operations
- [Skills Overview](index.md) - Module introduction and features
