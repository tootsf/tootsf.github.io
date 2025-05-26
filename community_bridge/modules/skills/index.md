---
title: "Skills"
parent: "Modules"
grand_parent: "Community Bridge"
nav_order: 15
has_children: true
---

# Skills Module
{: .no_toc }

Comprehensive character skill and progression system for FiveM servers.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

The Skills module provides a complete character progression system with customizable skills, experience tracking, level progression, and reward systems. It's designed to enhance gameplay by adding RPG-like character development to your FiveM server.

### 📚 Key Features

- **Skill Management**: Create and manage multiple character skills
- **Experience System**: Track experience points and level progression
- **Skill Trees**: Hierarchical skill dependencies and unlocks
- **Passive Effects**: Automatic skill-based bonuses and modifiers
- **Skill Checks**: Random skill-based success/failure mechanics
- **Training System**: Interactive skill improvement activities
- **Leaderboards**: Track top players in various skills
- **Skill Decay**: Optional skill degradation over time

---

## 📚 Skill Types

### 📚 Primary Skills
Core skills that define character capabilities in major areas:
- Combat skills (melee, firearms, defensive)
- Technical skills (hacking, electronics, mechanics)
- Social skills (persuasion, intimidation, leadership)
- Physical skills (strength, endurance, agility)

### 📚 Secondary Skills
Specialized skills for specific activities:
- Crafting and production skills
- Professional job skills
- Criminal activity skills
- Recreational and hobby skills

### Hidden Skills
Background skills that develop automatically:
- Driving proficiency by vehicle type
- Location familiarity
- Faction reputation

---

## Progression System

### Experience Points (XP)
- Gained through successful skill usage
- Variable XP rates based on difficulty
- Bonus XP for first-time activities
- Group XP bonuses for team activities

### Level Progression
- Exponential XP requirements per level
- Skill caps based on character attributes
- Prestige levels for maximum progression
- Skill point allocation at level-up

### Skill Trees
- Prerequisite skills for advanced abilities
- Branching paths for specialization
- Skill synergies and combinations
- Unlock conditions beyond level requirements

---

## Core Components

### Skill Database
- Persistent skill storage per character
- Historical progression tracking
- Skill usage statistics
- Achievement milestones

### Experience Engine
- Real-time XP calculation
- Skill-specific multipliers
- Time-based bonuses
- Anti-farming protection

### Progression UI
- Skill overview screens
- Progress visualization
- Skill tree navigation
- Achievement displays

---

## Integration Features

### Framework Compatibility
Works with all supported frameworks to access player data and save progression.

### Job System Integration
- Job-specific skill requirements
- Skill-based pay rates
- Professional skill development
- Career progression paths

### Activity Integration
- Skill requirements for activities
- XP rewards for completion
- Skill-based success rates
- Activity unlock conditions

---

## Common Use Cases

### RPG Progression
- Character development systems
- Skill-based gameplay mechanics
- Long-term player engagement
- Achievement and milestone tracking

### Professional Development
- Job skill requirements
- Training programs
- Certification systems
- Performance bonuses

### Competition Systems
- Skill-based matchmaking
- Leaderboards and rankings
- Seasonal competitions
- Skill-based tournaments

---

## Quick Start

```lua
-- Register a new skill
Bridge.Skills.RegisterSkill('lockpicking', {
    name = 'Lockpicking',
    description = 'Ability to pick locks and bypass security',
    category = 'criminal',
    maxLevel = 100,
    startingLevel = 1,
    experienceRate = 1.0
})

-- Add experience to a player's skill
Bridge.Skills.AddSkillXP(source, 'lockpicking', 25)

-- Check player's skill level
local level = Bridge.Skills.GetSkillLevel(source, 'lockpicking')
if level >= 50 then
    -- Allow advanced lockpicking
end

-- Perform skill check
local success = Bridge.Skills.SkillCheck(source, 'lockpicking', 'medium')
if success then
    -- Successful skill check
end
```

---

## Advanced Features

### Skill Synergies
Create interconnected skill systems where multiple skills affect outcomes.

### Dynamic Difficulty
Adjust skill requirements based on server population and player progression.

### Skill Events
Trigger custom events based on skill milestones and achievements.

### Analytics Dashboard
Track skill usage patterns and progression statistics for balancing.

---

## Navigation

- [Client Functions](./client) - Client-side skill management and UI
- [Server Functions](./server) - Server-side progression and validation
- [Shared Functions](./shared) - Shared utilities and calculations

Explore each section to learn about specific functionalities and implementation details.
