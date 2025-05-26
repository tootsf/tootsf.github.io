---
layout: default
title: Client Functions
parent: Skills
grand_parent: Modules
nav_order: 2
---

# Skills - Client Functions
{: .no_toc }

Client-side functions for skill progression display, UI management, and player feedback.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Skill Display

---

## 🔹 ShowSkillProgress

### ShowSkillProgress
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.ShowSkillProgress(skillName, currentLevel, currentXP, nextLevelXP)
```

Displays skill progression information to the player.

**Parameters:**
- `skillName` (string) - Name of the skill
- `currentLevel` (number) - Current skill level
- `currentXP` (number) - Current experience points
- `nextLevelXP` (number) - XP required for next level

**Example:**
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

---

## 🔹 UpdateSkillBar

### UpdateSkillBar
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.UpdateSkillBar(skillName, percentage)
```

Updates the skill progress bar display.

**Parameters:**
- `skillName` (string) - Name of the skill
- `percentage` (number) - Progress percentage (0-100)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Update driving skill progress bar
Bridge.Skills.UpdateSkillBar("driving", 75.5)
```

---

### ShowLevelUpNotification
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.ShowLevelUpNotification(skillName, newLevel, rewards)
```

Shows a level up notification with rewards.

**Parameters:**
- `skillName` (string) - Name of the skill that leveled up
- `newLevel` (number) - New skill level
- `rewards` (table, optional) - Array of rewards received

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('skills:levelUp')
AddEventHandler('skills:levelUp', function(skillName, newLevel, rewards)
    Bridge.Skills.ShowLevelUpNotification(skillName, newLevel, rewards)
    
    -- Play level up sound
    PlaySoundFrontend(-1, "RANK_UP", "HUD_AWARDS", 1)
end)
```

---

## Skill UI Management

### OpenSkillsMenu
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.OpenSkillsMenu(playerSkills)
```

Opens the skills overview menu.

**Parameters:**
- `playerSkills` (table) - Player's skill data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterCommand('skills', function()
    TriggerServerEvent('skills:requestData')
end, false)

RegisterNetEvent('skills:receiveData')
AddEventHandler('skills:receiveData', function(skillsData)
    Bridge.Skills.OpenSkillsMenu(skillsData)
end)
```

---

### CloseSkillsMenu
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.CloseSkillsMenu()
```

Closes the skills menu interface.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterKeyMapping('closeskills', 'Close Skills Menu', 'keyboard', 'ESCAPE')
RegisterCommand('closeskills', function()
    Bridge.Skills.CloseSkillsMenu()
end, false)
```

---

## Visual Effects

### PlaySkillUpEffect
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.PlaySkillUpEffect(skillName, effectType)
```

Plays visual effects when a skill increases.

**Parameters:**
- `skillName` (string) - Name of the skill
- `effectType` (string) - Type of effect ("levelup", "xpgain", "milestone")

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('skills:playEffect')
AddEventHandler('skills:playEffect', function(skillName, effectType)
    Bridge.Skills.PlaySkillUpEffect(skillName, effectType)
    
    -- Add screen flash for level up
    if effectType == "levelup" then
        TriggerScreenblurFadeIn(500)
        Citizen.SetTimeout(1000, function()
            TriggerScreenblurFadeOut(500)
        end)
    end
end)
```

---

### ShowSkillHint
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.ShowSkillHint(skillName, hint, duration)
```

Shows a hint about skill progression activities.

**Parameters:**
- `skillName` (string) - Related skill name
- `hint` (string) - Hint message
- `duration` (number, optional) - Display duration in milliseconds

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show hint when player enters a vehicle
RegisterNetEvent('skills:showHint')
AddEventHandler('skills:showHint', function(skillName, message)
    Bridge.Skills.ShowSkillHint(skillName, message, 5000)
end)
```

---

## Activity Tracking

### StartSkillActivity
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.StartSkillActivity(skillName, activityType, config)
```

Starts tracking a skill-related activity.

**Parameters:**
- `skillName` (string) - Name of the skill being trained
- `activityType` (string) - Type of activity
- `config` (table, optional) - Activity configuration

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Start driving skill tracking
RegisterNetEvent('vehicle:enteredAsDriver')
AddEventHandler('vehicle:enteredAsDriver', function(vehicle)
    Bridge.Skills.StartSkillActivity("driving", "vehicle_operation", {
        vehicleClass = GetVehicleClass(vehicle),
        trackSpeed = true,
        trackDistance = true
    })
end)
```

---

### StopSkillActivity
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.StopSkillActivity(skillName, activityType)
```

Stops tracking a skill activity.

**Parameters:**
- `skillName` (string) - Name of the skill
- `activityType` (string) - Type of activity to stop

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('vehicle:exitedAsDriver')
AddEventHandler('vehicle:exitedAsDriver', function()
    Bridge.Skills.StopSkillActivity("driving", "vehicle_operation")
end)
```

---

## Progress Indicators

### ShowXPGain
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.ShowXPGain(skillName, xpAmount, reason)
```

Shows an XP gain notification.

**Parameters:**
- `skillName` (string) - Skill that gained XP
- `xpAmount` (number) - Amount of XP gained
- `reason` (string, optional) - Reason for XP gain

**Example:**
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

---

### UpdateSkillOverlay
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Skills.UpdateSkillOverlay(visible, skillData)
```

Updates the skill progress overlay display.

**Parameters:**
- `visible` (boolean) - Whether to show the overlay
- `skillData` (table, optional) - Current skill information

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show skill overlay during activities
local skillOverlayActive = false

RegisterNetEvent('skills:toggleOverlay')
AddEventHandler('skills:toggleOverlay', function(show, data)
    skillOverlayActive = show
    Bridge.Skills.UpdateSkillOverlay(show, data)
end)
```

---

## Integration Examples

### Fishing Skill Integration
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Start fishing activity
RegisterNetEvent('fishing:startFishing')
AddEventHandler('fishing:startFishing', function()
    Bridge.Skills.StartSkillActivity("fishing", "casting", {
        location = GetEntityCoords(PlayerPedId()),
        baitType = "worm",
        rodQuality = "basic"
    })
    
    Bridge.Skills.ShowSkillHint("fishing", "Keep the line steady for better results!", 3000)
end)

-- Fishing success
RegisterNetEvent('fishing:caught')
AddEventHandler('fishing:caught', function(fishType, fishSize)
    local xpGain = math.floor(fishSize * 0.5) + 10
    TriggerServerEvent('skills:gainXP', 'fishing', xpGain, 'caught_' .. fishType)
end)
```

### Crafting Skill Integration
```lua
local Bridge = exports['community_bridge']:Bridge()

RegisterNetEvent('crafting:startCraft')
AddEventHandler('crafting:startCraft', function(recipe)
    Bridge.Skills.StartSkillActivity("crafting", "recipe_creation", {
        recipe = recipe.name,
        difficulty = recipe.skillRequired,
        materials = recipe.materials
    })
end)

RegisterNetEvent('crafting:completed')
AddEventHandler('crafting:completed', function(recipe, quality)
    local baseXP = 25
    local qualityBonus = quality * 5
    local skillBonus = recipe.skillRequired * 2
    
    TriggerServerEvent('skills:gainXP', 'crafting', baseXP + qualityBonus + skillBonus, 'crafted_' .. recipe.name)
    
    Bridge.Skills.StopSkillActivity("crafting", "recipe_creation")
end)
```

---

## Best Practices

### Performance Optimization
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Debounce skill updates
local lastSkillUpdate = {}

function UpdateSkillSafely(skillName, data)
    local now = GetGameTimer()
    if lastSkillUpdate[skillName] and now - lastSkillUpdate[skillName] < 1000 then
        return -- Prevent spam updates
    end
    
    lastSkillUpdate[skillName] = now
    Bridge.Skills.UpdateSkillBar(skillName, data.percentage)
end
```

### Error Handling
```lua
local Bridge = exports['community_bridge']:Bridge()

function SafeSkillOperation(operation, ...)
    local success, result = pcall(operation, ...)
    if not success then
        print("Skill operation failed: " .. tostring(result))
        return false
    end
    return result
end

-- Usage
SafeSkillOperation(Bridge.Skills.ShowSkillProgress, "driving", 5, 1250, 2000)
```

### Memory Management
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Clean up skill activities on resource stop
AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        -- Stop all active skill tracking
        for skillName, activityType in pairs(activeSkillActivities) do
            Bridge.Skills.StopSkillActivity(skillName, activityType)
        end
    end
end)
```
