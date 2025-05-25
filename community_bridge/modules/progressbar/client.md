---
title: "Client Functions"
parent: "Progressbar"
grand_parent: "Modules"
great_grand_parent: "Community Bridge"
nav_order: 2
---

# Progressbar - Client Functions
{: .no_toc }

Client-side functions for creating and managing progress bars and timed actions.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Core Functions

### StartProgress
{: .d-inline-block }
Client
{: .label .label-blue }

Creates and starts a progress bar with customizable options.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartProgress(config, callback)
```

#### Parameters
- `config` (table): Progress bar configuration
- `callback` (function): Function called when progress completes or is cancelled

#### Configuration Options
- `name` (string): Unique progress identifier
- `duration` (number): Progress duration in milliseconds
- `label` (string): Display label
- `useWhileDead` (boolean): Allow progress while dead
- `canCancel` (boolean): Allow cancellation
- `disableControls` (table): Controls to disable during progress
- `animation` (table): Animation configuration
- `position` (string): Screen position ('top', 'center', 'bottom')

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartProgress({
    name = 'repair_vehicle',
    duration = 10000,
    label = 'Repairing vehicle...',
    useWhileDead = false,
    canCancel = true,
    disableControls = {
        disableMovement = true,
        disableCarMovement = true,
        disableMouse = false,
        disableCombat = true
    },
    animation = {
        animDict = 'mini@repair',
        anim = 'fixing_a_ped'
    }
}, function(cancelled)
    if not cancelled then
        Bridge.Progressbar.ShowNotification('Vehicle repaired!', 'success')
    else
        Bridge.Progressbar.ShowNotification('Repair cancelled', 'error')
    end
end)
```

### StartCircularProgress
{: .d-inline-block }
Client
{: .label .label-blue }

Creates a circular progress indicator.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartCircularProgress(config, callback)
```

#### Parameters
- `config` (table): Circular progress configuration
- `callback` (function): Completion callback

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartCircularProgress({
    name = 'lockpicking',
    duration = 8000,
    label = 'Picking lock...',
    size = 100,
    thickness = 8,
    color = '#00ff00',
    position = 'center'
}, function(cancelled)
    if not cancelled then
        -- Successfully picked lock
        TriggerEvent('door:unlock')
    end
end)
```

### StopProgress
{: .d-inline-block }
Client
{: .label .label-blue }

Stops an active progress bar.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StopProgress(name)
```

#### Parameters
- `name` (string, optional): Progress name to stop. If not provided, stops all progress

#### Example
```lua
-- Stop specific progress
Bridge.Progressbar.StopProgress('repair_vehicle')

-- Stop all progress bars
Bridge.Progressbar.StopProgress()
```

### IsProgressActive
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if a progress bar is currently active.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.IsProgressActive(name)
```

#### Parameters
- `name` (string, optional): Progress name to check. If not provided, checks any progress

#### Returns
- `boolean`: True if progress is active

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Progressbar.IsProgressActive('repair_vehicle') then
    print('Vehicle repair in progress')
end

if Bridge.Progressbar.IsProgressActive() then
    print('Some progress is active')
end
```

---

## Interactive Progress

### StartSkillProgress
{: .d-inline-block }
Client
{: .label .label-blue }

Creates a progress bar with skill check integration.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartSkillProgress(config, callback)
```

#### Parameters
- `config` (table): Skill progress configuration
- `callback` (function): Completion callback with success/failure result

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartSkillProgress({
    name = 'hacking',
    duration = 15000,
    label = 'Hacking system...',
    skillChecks = {
        {
            key = 'E',
            timeWindow = 1000,
            difficulty = 'medium'
        },
        {
            key = 'Q',
            timeWindow = 800,
            difficulty = 'hard'
        }
    }
}, function(success, cancelled)
    if success and not cancelled then
        Bridge.Progressbar.ShowNotification('System hacked!', 'success')
    else
        Bridge.Progressbar.ShowNotification('Hack failed', 'error')
    end
end)
```

### StartMinigameProgress
{: .d-inline-block }
Client
{: .label .label-blue }

Creates a progress bar with mini-game integration.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartMinigameProgress(config, callback)
```

#### Parameters
- `config` (table): Mini-game progress configuration
- `callback` (function): Completion callback

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartMinigameProgress({
    name = 'lockpicking_advanced',
    duration = 12000,
    label = 'Advanced lockpicking...',
    minigame = {
        type = 'sequence',
        keys = {'W', 'A', 'S', 'D'},
        speed = 2.0,
        accuracy = 0.8
    }
}, function(success, score, cancelled)
    if success and not cancelled then
        Bridge.Progressbar.ShowNotification('Lock picked! Score: ' .. score, 'success')
    end
end)
```

---

## Progress Styling

### SetProgressTheme
{: .d-inline-block }
Client
{: .label .label-blue }

Sets the visual theme for progress bars.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.SetProgressTheme(theme)
```

#### Parameters
- `theme` (table): Theme configuration

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.SetProgressTheme({
    background = '#1a1a1a',
    foreground = '#00ff88',
    text = '#ffffff',
    border = '#333333',
    borderRadius = 8,
    animation = 'smooth'
})
```

### CreateCustomProgress
{: .d-inline-block }
Client
{: .label .label-blue }

Creates a progress bar with custom styling.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.CreateCustomProgress(config, callback)
```

#### Parameters
- `config` (table): Custom progress configuration
- `callback` (function): Completion callback

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.CreateCustomProgress({
    name = 'custom_craft',
    duration = 20000,
    label = 'Crafting item...',
    style = {
        width = 400,
        height = 20,
        backgroundColor = 'rgba(0, 0, 0, 0.8)',
        progressColor = 'linear-gradient(90deg, #ff6b6b, #feca57)',
        textColor = '#ffffff',
        fontSize = 16,
        fontFamily = 'Arial',
        borderRadius = 10,
        position = {
            x = '50%',
            y = '70%'
        }
    }
}, function(cancelled)
    if not cancelled then
        Bridge.Progressbar.ShowNotification('Item crafted!', 'success')
    end
end)
```

---

## Multi-Progress

### StartMultiProgress
{: .d-inline-block }
Client
{: .label .label-blue }

Creates multiple progress bars simultaneously.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartMultiProgress(progressBars, callback)
```

#### Parameters
- `progressBars` (table): Array of progress configurations
- `callback` (function): Called when all progress bars complete

#### Example
```lua
local progressBars = {
    {
        name = 'download',
        duration = 8000,
        label = 'Downloading...',
        position = 'top'
    },
    {
        name = 'install',
        duration = 12000,
        label = 'Installing...',
        position = 'center'
    },
    {
        name = 'configure',
        duration = 5000,
        label = 'Configuring...',
        position = 'bottom'
    }
}

Bridge.Progressbar.StartMultiProgress(progressBars, function(results)
    local allCompleted = true
    for _, result in ipairs(results) do
        if result.cancelled then
            allCompleted = false
            break
        end
    end
    
    if allCompleted then
        Bridge.Progressbar.ShowNotification('All tasks completed!', 'success')
    end
end)
```

### GetActiveProgressBars
{: .d-inline-block }
Client
{: .label .label-blue }

Gets information about all active progress bars.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.GetActiveProgressBars()
```

#### Returns
- `table`: Array of active progress bar information

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local activeBars = Bridge.Progressbar.GetActiveProgressBars()
for _, bar in ipairs(activeBars) do
    print('Active: ' .. bar.name .. ' - ' .. bar.progress .. '%')
end
```

---

## Animation Integration

### StartProgressWithAnimation
{: .d-inline-block }
Client
{: .label .label-blue }

Creates a progress bar with synchronized player animation.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartProgressWithAnimation(config, callback)
```

#### Parameters
- `config` (table): Progress and animation configuration
- `callback` (function): Completion callback

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartProgressWithAnimation({
    name = 'mechanic_work',
    duration = 15000,
    label = 'Working on engine...',
    animation = {
        animDict = 'mini@repair',
        anim = 'fixing_a_ped',
        flags = 1,
        prop = 'prop_tool_wrench',
        propPlacement = {
            bone = 57005,
            coords = vector3(0.1, 0.0, 0.0),
            rotation = vector3(0.0, 0.0, 0.0)
        }
    },
    disableControls = {
        disableMovement = true,
        disableCarMovement = true
    }
}, function(cancelled)
    ClearPedTasks(PlayerPedId())
    if not cancelled then
        Bridge.Progressbar.ShowNotification('Engine repaired!', 'success')
    end
end)
```

### StartProgressWithScenario
{: .d-inline-block }
Client
{: .label .label-blue }

Creates a progress bar with a scenario animation.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartProgressWithScenario(config, callback)
```

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartProgressWithScenario({
    name = 'smoking',
    duration = 30000,
    label = 'Smoking...',
    scenario = 'WORLD_HUMAN_SMOKING',
    canCancel = true
}, function(cancelled)
    ClearPedTasks(PlayerPedId())
    if not cancelled then
        -- Apply smoking effects
        TriggerEvent('player:addStress', -10)
    end
end)
```

---

## Event Handlers

### OnProgressStart
{: .d-inline-block }
Client
{: .label .label-blue }

Sets a handler for progress start events.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressStart(handler)
```

#### Parameters
- `handler` (function): Function called when progress starts

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressStart(function(progressName, config)
    print('Progress started: ' .. progressName)
    
    -- Disable certain UI elements
    if config.disableHUD then
        DisplayHud(false)
    end
end)
```

### OnProgressUpdate
{: .d-inline-block }
Client
{: .label .label-blue }

Sets a handler for progress update events.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressUpdate(handler)
```

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressUpdate(function(progressName, percentage)
    if progressName == 'important_task' then
        TriggerEvent('hud:updateProgressDisplay', percentage)
    end
end)
```

### OnProgressComplete
{: .d-inline-block }
Client
{: .label .label-blue }

Sets a handler for progress completion events.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressComplete(handler)
```

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressComplete(function(progressName, cancelled)
    print('Progress "' .. progressName .. '" completed. Cancelled: ' .. tostring(cancelled))
    
    -- Re-enable UI elements
    DisplayHud(true)
end)
```

---

## Utility Functions

### SetProgressPosition
{: .d-inline-block }
Client
{: .label .label-blue }

Updates the position of an active progress bar.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.SetProgressPosition(name, position)
```

#### Parameters
- `name` (string): Progress bar name
- `position` (string/table): New position ('top', 'center', 'bottom' or custom coordinates)

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.SetProgressPosition('repair_vehicle', 'top')

-- Custom position
Bridge.Progressbar.SetProgressPosition('repair_vehicle', {
    x = '25%',
    y = '80%'
})
```

### UpdateProgressLabel
{: .d-inline-block }
Client
{: .label .label-blue }

Updates the label of an active progress bar.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.UpdateProgressLabel(name, label)
```

#### Parameters
- `name` (string): Progress bar name
- `label` (string): New label text

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.UpdateProgressLabel('download', 'Downloading... 50%')
```

### PauseProgress
{: .d-inline-block }
Client
{: .label .label-blue }

Pauses an active progress bar.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.PauseProgress(name)
```

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.PauseProgress('repair_vehicle')
```

### ResumeProgress
{: .d-inline-block }
Client
{: .label .label-blue }

Resumes a paused progress bar.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ResumeProgress(name)
```

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ResumeProgress('repair_vehicle')
```

---

## Best Practices

### Resource Management
Always clean up progress bars when resource stops:

```lua
AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        Bridge.Progressbar.StopProgress()
    end
end)
```

### Error Handling
Handle progress errors gracefully:

```lua
local success, error = pcall(function()
    Bridge.Progressbar.StartProgress(config, callback)
end)

if not success then
    print('Progress error: ' .. error)
    Bridge.Progressbar.ShowNotification('Progress failed to start', 'error')
end
```

### Performance Optimization
Use appropriate update intervals:

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartProgress({
    name = 'long_task',
    duration = 60000,
    updateInterval = 500, -- Update every 500ms instead of default 100ms
    label = 'Long running task...'
}, callback)
```

---

## Common Patterns

### Crafting System
```lua
local function StartCrafting(item, duration)
    Bridge.Progressbar.StartProgressWithAnimation({
        name = 'crafting_' .. item,
        duration = duration,
        label = 'Crafting ' .. item .. '...',
        animation = {
            animDict = 'anim@amb@business@coc@coc_unpack_cut@',
            anim = 'coc_unpack_cut_v1_cokecutter'
        },
        canCancel = true
    }, function(cancelled)
        ClearPedTasks(PlayerPedId())
        if not cancelled then
            TriggerServerEvent('inventory:addItem', item, 1)
            Bridge.Progressbar.ShowNotification('Crafted ' .. item, 'success')
        end
    end)
end
```

### Loading Screen
```lua
local function ShowLoadingProgress(stages)
    local currentStage = 1
    
    local function nextStage()
        if currentStage <= #stages then
            local stage = stages[currentStage]
            Bridge.Progressbar.StartProgress({
                name = 'loading_stage_' .. currentStage,
                duration = stage.duration,
                label = stage.label,
                canCancel = false
            }, function()
                currentStage = currentStage + 1
                nextStage()
            end)
        else
            Bridge.Progressbar.ShowNotification('Loading complete!', 'success')
        end
    end
    
    nextStage()
end
```
