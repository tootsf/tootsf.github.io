---
layout: default
title: Server Functions
parent: Skills
grand_parent: Modules
nav_order: 1
---

# Skills - Server Functions
{: .no_toc }

Server-side functions for skill management, progression tracking, and data persistence.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Skill Management

### AddXP
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.AddXP(playerId, skillName, amount, reason)
```

Adds experience points to a player's skill.

**Parameters:**
- `playerId` (number) - Player's server ID
- `skillName` (string) - Name of the skill
- `amount` (number) - XP amount to add
- `reason` (string, optional) - Reason for XP gain

**Returns:**
- `boolean` - Success status
- `table` - Level up information if applicable

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('skills:gainXP')
AddEventHandler('skills:gainXP', function(skillName, amount, reason)
    local playerId = source
    local success, levelUpData = Bridge.Skills.AddXP(playerId, skillName, amount, reason)
    
    if success then
        TriggerClientEvent('skills:xpGained', playerId, skillName, amount, reason)
        
        if levelUpData then
            TriggerClientEvent('skills:levelUp', playerId, skillName, levelUpData.newLevel, levelUpData.rewards)
        end
    end
end)
```

---

### RemoveXP
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.RemoveXP(playerId, skillName, amount, reason)
```

Removes experience points from a player's skill.

**Parameters:**
- `playerId` (number) - Player's server ID
- `skillName` (string) - Name of the skill
- `amount` (number) - XP amount to remove
- `reason` (string, optional) - Reason for XP loss

**Returns:**
- `boolean` - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove XP as penalty for reckless driving
RegisterNetEvent('skills:applyPenalty')
AddEventHandler('skills:applyPenalty', function(penaltyType)
    local playerId = source
    
    if penaltyType == "reckless_driving" then
        Bridge.Skills.RemoveXP(playerId, "driving", 50, "reckless_behavior")
        TriggerClientEvent('skills:penaltyApplied', playerId, "driving", 50)
    end
end)
```

---

### SetSkillLevel
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.SetSkillLevel(playerId, skillName, level)
```

Sets a player's skill to a specific level.

**Parameters:**
- `playerId` (number) - Player's server ID
- `skillName` (string) - Name of the skill
- `level` (number) - Level to set (1-100)

**Returns:**
- `boolean` - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Admin command to set skill level
RegisterCommand('setskill', function(source, args)
    if not IsPlayerAceAllowed(source, 'admin.skills') then return end
    
    local targetId = tonumber(args[1])
    local skillName = args[2]
    local level = tonumber(args[3])
    
    if Bridge.Skills.SetSkillLevel(targetId, skillName, level) then
        TriggerClientEvent('chat:addMessage', source, {
            color = {0, 255, 0},
            args = {'ADMIN', string.format('Set %s skill to level %d for player %d', skillName, level, targetId)}
        })
    end
end, true)
```

---

### GetPlayerSkills
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.GetPlayerSkills(playerId)
```

Retrieves all skill data for a player.

**Parameters:**
- `playerId` (number) - Player's server ID

**Returns:**
- `table` - Player's skill data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('skills:requestData')
AddEventHandler('skills:requestData', function()
    local playerId = source
    local skillsData = Bridge.Skills.GetPlayerSkills(playerId)
    
    TriggerClientEvent('skills:receiveData', playerId, skillsData)
end)
```

---

### GetSkillLevel
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.GetSkillLevel(playerId, skillName)
```

Gets a player's current level in a specific skill.

**Parameters:**
- `playerId` (number) - Player's server ID
- `skillName` (string) - Name of the skill

**Returns:**
- `number` - Current skill level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Check skill requirement for advanced crafting
RegisterNetEvent('crafting:attemptAdvanced')
AddEventHandler('crafting:attemptAdvanced', function(recipe)
    local playerId = source
    local craftingLevel = Bridge.Skills.GetSkillLevel(playerId, "crafting")
    
    if craftingLevel >= recipe.requiredLevel then
        TriggerEvent('crafting:startAdvanced', playerId, recipe)
    else
        TriggerClientEvent('notify', playerId, 
            string.format('Crafting level %d required (you have %d)', recipe.requiredLevel, craftingLevel), 
            'error')
    end
end)
```

---

## Skill Configuration

### CreateSkill
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.CreateSkill(skillName, config)
```

Creates a new skill with custom configuration.

**Parameters:**
- `skillName` (string) - Unique skill name
- `config` (table) - Skill configuration

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create custom cooking skill
Bridge.Skills.CreateSkill("cooking", {
    displayName = "Cooking",
    description = "Ability to prepare delicious meals",
    maxLevel = 50,
    xpPerLevel = 1000,
    category = "crafting",
    icon = "chef-hat",
    rewards = {
        [10] = {unlocks = {"advanced_recipes"}},
        [25] = {unlocks = {"gourmet_cooking"}, items = {"chef_hat"}},
        [50] = {unlocks = {"master_chef"}, money = 10000}
    }
})
```

---

### UpdateSkillConfig
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.UpdateSkillConfig(skillName, newConfig)
```

Updates an existing skill's configuration.

**Parameters:**
- `skillName` (string) - Name of the skill to update
- `newConfig` (table) - New configuration settings

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Update driving skill to have more levels
Bridge.Skills.UpdateSkillConfig("driving", {
    maxLevel = 75,
    xpPerLevel = 800,
    newRewards = {
        [60] = {unlocks = {"professional_driver"}},
        [75] = {unlocks = {"racing_license"}}
    }
})
```

---

## Progression Systems

### CalculateXPMultiplier
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.CalculateXPMultiplier(playerId, skillName, baseAmount, factors)
```

Calculates XP multiplier based on various factors.

**Parameters:**
- `playerId` (number) - Player's server ID
- `skillName` (string) - Skill being trained
- `baseAmount` (number) - Base XP amount
- `factors` (table) - Multiplier factors

**Returns:**
- `number` - Final XP amount with multipliers applied

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local function CalculateFishingXP(playerId, fishType, fishSize, conditions)
    local baseXP = 20
    local factors = {
        fishRarity = fishType == "legendary" and 3.0 or 1.0,
        sizeBonus = math.max(1.0, fishSize / 100),
        weatherBonus = conditions.weather == "rain" and 1.2 or 1.0,
        timeOfDay = conditions.isNight and 1.1 or 1.0
    }
    
    return Bridge.Skills.CalculateXPMultiplier(playerId, "fishing", baseXP, factors)
end
```

---

### ProcessSkillDecay
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.ProcessSkillDecay(playerId, skillName, decayRate)
```

Applies skill decay for unused skills.

**Parameters:**
- `playerId` (number) - Player's server ID
- `skillName` (string) - Skill to apply decay to
- `decayRate` (number) - Rate of decay (0.0-1.0)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Apply skill decay for inactive players
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(24 * 60 * 60 * 1000) -- Daily decay check
        
        for _, playerId in ipairs(GetPlayers()) do
            local lastActive = Bridge.Skills.GetLastActivity(playerId)
            local daysSinceActive = (os.time() - lastActive) / (24 * 60 * 60)
            
            if daysSinceActive > 7 then -- Decay after 7 days inactive
                local decayRate = math.min(0.1, daysSinceActive * 0.01)
                
                for _, skill in pairs({"driving", "fishing", "crafting"}) do
                    Bridge.Skills.ProcessSkillDecay(playerId, skill, decayRate)
                end
            end
        end
    end
end)
```

---

## Achievement System

### CheckAchievements
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.CheckAchievements(playerId, skillName, newLevel)
```

Checks and awards achievements based on skill progression.

**Parameters:**
- `playerId` (number) - Player's server ID
- `skillName` (string) - Skill that was leveled
- `newLevel` (number) - New skill level

**Returns:**
- `table` - Array of achievements earned

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('skills:levelUpAchievements')
AddEventHandler('skills:levelUpAchievements', function(skillName, newLevel)
    local playerId = source
    local achievements = Bridge.Skills.CheckAchievements(playerId, skillName, newLevel)
    
    for _, achievement in ipairs(achievements) do
        TriggerClientEvent('achievements:unlock', playerId, achievement)
        
        -- Give achievement rewards
        if achievement.rewards then
            if achievement.rewards.money then
                Bridge.Framework.AddMoney(playerId, achievement.rewards.money)
            end
            if achievement.rewards.items then
                for item, amount in pairs(achievement.rewards.items) do
                    Bridge.Inventory.AddItem(playerId, item, amount)
                end
            end
        end
    end
end)
```

---

### CreateAchievement
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.CreateAchievement(achievementId, config)
```

Creates a new skill-based achievement.

**Parameters:**
- `achievementId` (string) - Unique achievement identifier
- `config` (table) - Achievement configuration

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Skills.CreateAchievement("master_craftsman", {
    name = "Master Craftsman",
    description = "Reach level 50 in crafting",
    requirements = {
        skills = {
            crafting = 50
        }
    },
    rewards = {
        money = 25000,
        items = {
            master_crafting_kit = 1
        }
    },
    rarity = "legendary"
})
```

---

## Data Persistence

### SavePlayerSkills
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.SavePlayerSkills(playerId)
```

Saves a player's skill data to the database.

**Parameters:**
- `playerId` (number) - Player's server ID

**Returns:**
- `boolean` - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Auto-save skills every 5 minutes
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(5 * 60 * 1000) -- 5 minutes
        
        for _, playerId in ipairs(GetPlayers()) do
            Bridge.Skills.SavePlayerSkills(playerId)
        end
    end
end)

-- Save on disconnect
AddEventHandler('playerDropped', function()
    local playerId = source
    Bridge.Skills.SavePlayerSkills(playerId)
end)
```

---

### LoadPlayerSkills
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Skills.LoadPlayerSkills(playerId)
```

Loads a player's skill data from the database.

**Parameters:**
- `playerId` (number) - Player's server ID

**Returns:**
- `table` - Player's skill data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('Framework:PlayerLoaded')
AddEventHandler('Framework:PlayerLoaded', function(playerId)
    local skillsData = Bridge.Skills.LoadPlayerSkills(playerId)
    
    if skillsData then
        TriggerClientEvent('skills:initialize', playerId, skillsData)
    else
        -- Initialize with default skills
        Bridge.Skills.InitializeDefaultSkills(playerId)
    end
end)
```

---

## Integration Examples

### Job Skill Requirements
```lua
local Bridge = exports['community_bridge']:Bridge()

local jobSkillRequirements = {
    mechanic = {driving = 15, repair = 20},
    chef = {cooking = 25},
    doctor = {medical = 30},
    pilot = {flying = 40}
}

RegisterNetEvent('jobs:attemptHire')
AddEventHandler('jobs:attemptHire', function(jobName)
    local playerId = source
    local requirements = jobSkillRequirements[jobName]
    
    if requirements then
        for skill, requiredLevel in pairs(requirements) do
            local playerLevel = Bridge.Skills.GetSkillLevel(playerId, skill)
            if playerLevel < requiredLevel then
                TriggerClientEvent('notify', playerId, 
                    string.format('You need %s level %d (you have %d)', skill, requiredLevel, playerLevel), 
                    'error')
                return
            end
        end
    end
    
    -- All requirements met
    TriggerEvent('jobs:hire', playerId, jobName)
end)
```

### Skill-Based Pricing
```lua
local Bridge = exports['community_bridge']:Bridge()

local function CalculateRepairCost(playerId, baseCost)
    local repairSkill = Bridge.Skills.GetSkillLevel(playerId, "repair")
    local discount = math.min(0.5, repairSkill * 0.01) -- Max 50% discount
    
    return math.floor(baseCost * (1 - discount))
end

RegisterNetEvent('repair:getQuote')
AddEventHandler('repair:getQuote', function(vehicleId)
    local playerId = source
    local baseCost = 500
    local finalCost = CalculateRepairCost(playerId, baseCost)
    
    TriggerClientEvent('repair:showQuote', playerId, finalCost, baseCost)
end)
```

---

## Best Practices

### Performance Optimization
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Batch skill updates
local skillUpdateQueue = {}

local function QueueSkillUpdate(playerId, skillName, amount, reason)
    if not skillUpdateQueue[playerId] then
        skillUpdateQueue[playerId] = {}
    end
    
    if not skillUpdateQueue[playerId][skillName] then
        skillUpdateQueue[playerId][skillName] = {amount = 0, reasons = {}}
    end
    
    skillUpdateQueue[playerId][skillName].amount = 
        skillUpdateQueue[playerId][skillName].amount + amount
    table.insert(skillUpdateQueue[playerId][skillName].reasons, reason)
end

-- Process queue every 10 seconds
Citizen.CreateThread(function()
    while true do
        Citizen.Wait(10000)
        
        for playerId, skills in pairs(skillUpdateQueue) do
            for skillName, data in pairs(skills) do
                Bridge.Skills.AddXP(playerId, skillName, data.amount, table.concat(data.reasons, ", "))
            end
        end
        
        skillUpdateQueue = {}
    end
end)
```

### Data Validation
```lua
local Bridge = exports['community_bridge']:Bridge()

local function ValidateSkillData(skillName, amount)
    if type(skillName) ~= "string" or skillName == "" then
        return false, "Invalid skill name"
    end
    
    if type(amount) ~= "number" or amount <= 0 or amount > 1000 then
        return false, "Invalid XP amount"
    end
    
    return true
end

RegisterNetEvent('skills:gainXP')
AddEventHandler('skills:gainXP', function(skillName, amount, reason)
    local playerId = source
    local isValid, error = ValidateSkillData(skillName, amount)
    
    if not isValid then
        print("Invalid skill data from player " .. playerId .. ": " .. error)
        return
    end
    
    Bridge.Skills.AddXP(playerId, skillName, amount, reason)
end)
```

### Error Handling
```lua
local Bridge = exports['community_bridge']:Bridge()

local function SafeSkillOperation(operation, ...)
    local success, result = pcall(operation, ...)
    if not success then
        print("Skill operation failed: " .. tostring(result))
        return false
    end
    return result
end

-- Wrapper for safe skill operations
local function SafeAddXP(playerId, skillName, amount, reason)
    return SafeSkillOperation(Bridge.Skills.AddXP, playerId, skillName, amount, reason)
end
```
