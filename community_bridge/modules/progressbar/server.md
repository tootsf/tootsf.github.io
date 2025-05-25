---
title: "Server Functions"
parent: "Progressbar"
grand_parent: "Modules"
great_grand_parent: "Community Bridge"
nav_order: 3
---

# Progressbar - Server Functions
{: .no_toc }

Server-side functions for coordinating progress bars and managing timed operations.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Core Functions

### TriggerClientProgress
{: .d-inline-block }
Server
{: .label .label-green }

Triggers a progress bar on a specific client from the server.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.TriggerClientProgress(source, config, callback)
```

#### Parameters
- `source` (number): Player server ID
- `config` (table): Progress bar configuration
- `callback` (function, optional): Server-side callback when progress completes

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.TriggerClientProgress(source, {
    name = 'server_task',
    duration = 10000,
    label = 'Processing server request...',
    canCancel = false
}, function(cancelled)
    if not cancelled then
        -- Give reward or complete server-side action
        Bridge.Progressbar.AddPlayerMoney(source, 500)
        Bridge.Progressbar.ShowNotification(source, 'Task completed! +$500', 'success')
    end
end)
```

### BroadcastProgress
{: .d-inline-block }
Server
{: .label .label-green }

Broadcasts a progress bar to all connected players.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.BroadcastProgress(config, callback)
```

#### Parameters
- `config` (table): Progress bar configuration
- `callback` (function, optional): Callback when all players complete

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.BroadcastProgress({
    name = 'server_event',
    duration = 30000,
    label = 'Server event starting...',
    canCancel = false,
    position = 'top'
}, function(results)
    local completedCount = 0
    for playerId, result in pairs(results) do
        if not result.cancelled then
            completedCount = completedCount + 1
        end
    end
    
    print(completedCount .. ' players completed the event')
end)
```

### StopClientProgress
{: .d-inline-block }
Server
{: .label .label-green }

Stops a progress bar on a specific client.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StopClientProgress(source, name)
```

#### Parameters
- `source` (number): Player server ID
- `name` (string, optional): Progress name to stop

#### Example
```lua
-- Stop specific progress
Bridge.Progressbar.StopClientProgress(source, 'server_task')

-- Stop all progress for player
Bridge.Progressbar.StopClientProgress(source)
```

### IsClientProgressActive
{: .d-inline-block }
Server
{: .label .label-green }

Checks if a client has an active progress bar.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.IsClientProgressActive(source, name)
```

#### Parameters
- `source` (number): Player server ID
- `name` (string, optional): Progress name to check

#### Returns
- `boolean`: True if progress is active

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Progressbar.IsClientProgressActive(source, 'repair_task') then
    Bridge.Progressbar.ShowNotification(source, 'Already repairing!', 'error')
    return
end
```

---

## Progress Coordination

### StartSynchronizedProgress
{: .d-inline-block }
Server
{: .label .label-green }

Starts synchronized progress bars for multiple players.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.StartSynchronizedProgress(players, config, callback)
```

#### Parameters
- `players` (table): Array of player server IDs
- `config` (table): Progress configuration
- `callback` (function): Callback when synchronization completes

#### Example
```lua
-- Synchronized bank heist progress
local heistMembers = {1, 2, 3, 4}

Bridge.Progressbar.StartSynchronizedProgress(heistMembers, {
    name = 'bank_heist',
    duration = 45000,
    label = 'Hacking bank systems...',
    canCancel = false,
    syncRequired = true -- All players must complete
}, function(results)
    local allCompleted = true
    for _, result in pairs(results) do
        if result.cancelled or not result.completed then
            allCompleted = false
            break
        end
    end
    
    if allCompleted then
        -- All players completed, start next phase
        TriggerEvent('heist:nextPhase')
    else
        -- Someone failed, abort heist
        TriggerEvent('heist:abort')
    end
end)
```

### CreateProgressGroup
{: .d-inline-block }
Server
{: .label .label-green }

Creates a progress group for team-based activities.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.CreateProgressGroup(groupId, members, config)
```

#### Parameters
- `groupId` (string): Unique group identifier
- `members` (table): Array of player server IDs
- `config` (table): Group progress configuration

#### Returns
- `table`: Progress group object

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local group = Bridge.Progressbar.CreateProgressGroup('raid_team', {1, 2, 3}, {
    name = 'raid_preparation',
    duration = 60000,
    label = 'Preparing for raid...',
    requireAll = true,
    timeoutAction = 'abort'
})

-- Start group progress
group:start(function(results)
    if results.success then
        TriggerEvent('raid:begin', group.members)
    end
end)
```

---

## Database Integration

### SaveProgressState
{: .d-inline-block }
Server
{: .label .label-green }

Saves progress state to database for persistence.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.SaveProgressState(source, progressData)
```

#### Parameters
- `source` (number): Player server ID
- `progressData` (table): Progress state data

#### Example
```lua
RegisterNetEvent('progress:save')
AddEventHandler('progress:save', function(progressData)
    local source = source
    Bridge.Progressbar.SaveProgressState(source, {
        progressName = progressData.name,
        remainingTime = progressData.remainingTime,
        startedAt = progressData.startedAt,
        metadata = progressData.metadata
    })
end)
```

### LoadProgressState
{: .d-inline-block }
Server
{: .label .label-green }

Loads saved progress state from database.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.LoadProgressState(source)
```

#### Parameters
- `source` (number): Player server ID

#### Returns
- `table`: Saved progress state or nil

#### Example
```lua
RegisterNetEvent('playerJoined')
AddEventHandler('playerJoined', function()
    local source = source
    local savedProgress = Bridge.Progressbar.LoadProgressState(source)
    
    if savedProgress and savedProgress.remainingTime > 0 then
        -- Resume saved progress
        TriggerClientEvent('progress:resume', source, savedProgress)
    end
end)
```

### ClearProgressState
{: .d-inline-block }
Server
{: .label .label-green }

Clears saved progress state.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ClearProgressState(source, progressName)
```

#### Example
```lua
RegisterNetEvent('progress:completed')
AddEventHandler('progress:completed', function(progressName)
    local source = source
    Bridge.Progressbar.ClearProgressState(source, progressName)
end)
```

---

## Permission System

### SetProgressPermission
{: .d-inline-block }
Server
{: .label .label-green }

Sets permission requirements for progress actions.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.SetProgressPermission(progressName, permission)
```

#### Parameters
- `progressName` (string): Progress identifier
- `permission` (string): Required permission

#### Example
```lua
-- Require admin permission for admin tasks
Bridge.Progressbar.SetProgressPermission('admin_maintenance', 'admin.maintenance')

-- Require job permission for police actions
Bridge.Progressbar.SetProgressPermission('police_investigate', 'job.police')
```

### ValidateProgressAccess
{: .d-inline-block }
Server
{: .label .label-green }

Validates if a player can start a specific progress.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ValidateProgressAccess(source, progressName)
```

#### Parameters
- `source` (number): Player server ID
- `progressName` (string): Progress identifier

#### Returns
- `boolean`: True if player has access

#### Example
```lua
RegisterNetEvent('progress:requestStart')
AddEventHandler('progress:requestStart', function(progressName, config)
    local source = source
    
    if not Bridge.Progressbar.ValidateProgressAccess(source, progressName) then
        Bridge.Progressbar.ShowNotification(source, 'No permission for this action', 'error')
        return
    end
    
    Bridge.Progressbar.TriggerClientProgress(source, config)
end)
```

---

## Progress Analytics

### LogProgressEvent
{: .d-inline-block }
Server
{: .label .label-green }

Logs progress events for analytics.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.LogProgressEvent(source, eventType, progressName, data)
```

#### Parameters
- `source` (number): Player server ID
- `eventType` (string): Event type ('start', 'complete', 'cancel', 'fail')
- `progressName` (string): Progress identifier
- `data` (table, optional): Additional event data

#### Example
```lua
RegisterNetEvent('progress:analytics')
AddEventHandler('progress:analytics', function(eventType, progressName, data)
    local source = source
    Bridge.Progressbar.LogProgressEvent(source, eventType, progressName, {
        duration = data.duration,
        success = data.success,
        timestamp = os.time()
    })
end)
```

### GetProgressStatistics
{: .d-inline-block }
Server
{: .label .label-green }

Gets progress statistics for analysis.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.GetProgressStatistics(timeframe, progressName)
```

#### Parameters
- `timeframe` (string): Time period ('day', 'week', 'month')
- `progressName` (string, optional): Specific progress to analyze

#### Returns
- `table`: Statistics data

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local stats = Bridge.Progressbar.GetProgressStatistics('week', 'vehicle_repair')
print('Repairs completed this week: ' .. stats.completions)
print('Average completion time: ' .. stats.averageTime .. 'ms')
print('Cancellation rate: ' .. stats.cancellationRate .. '%')
```

---

## Event Handlers

### OnProgressStart
{: .d-inline-block }
Server
{: .label .label-green }

Sets a handler for progress start events.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressStart(handler)
```

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressStart(function(source, progressName, config)
    print('Player ' .. source .. ' started progress: ' .. progressName)
    
    -- Log to database
    Bridge.Progressbar.LogProgressEvent(source, 'start', progressName, config)
    
    -- Disable certain server events during progress
    if config.disableEvents then
        TriggerEvent('player:disableEvents', source, config.disableEvents)
    end
end)
```

### OnProgressComplete
{: .d-inline-block }
Server
{: .label .label-green }

Sets a handler for progress completion events.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressComplete(handler)
```

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressComplete(function(source, progressName, cancelled, duration)
    if not cancelled then
        -- Award completion rewards
        local rewards = GetProgressRewards(progressName)
        if rewards then
            Bridge.Progressbar.GiveRewards(source, rewards)
        end
    end
    
    -- Re-enable events
    TriggerEvent('player:enableEvents', source)
end)
```

### OnProgressFailed
{: .d-inline-block }
Server
{: .label .label-green }

Sets a handler for progress failure events.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressFailed(handler)
```

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.OnProgressFailed(function(source, progressName, reason)
    print('Progress failed for player ' .. source .. ': ' .. reason)
    
    -- Apply failure consequences
    local penalties = GetProgressPenalties(progressName)
    if penalties then
        Bridge.Progressbar.ApplyPenalties(source, penalties)
    end
end)
```

---

## Advanced Features

### CreateProgressScheduler
{: .d-inline-block }
Server
{: .label .label-green }

Creates a scheduler for managing multiple timed progress operations.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.CreateProgressScheduler(config)
```

#### Parameters
- `config` (table): Scheduler configuration

#### Returns
- `table`: Scheduler object

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local scheduler = Bridge.Progressbar.CreateProgressScheduler({
    maxConcurrent = 10,
    queueTimeout = 30000,
    priorityLevels = {'high', 'normal', 'low'}
})

-- Schedule high priority progress
scheduler:schedule(source, {
    name = 'emergency_repair',
    duration = 5000,
    priority = 'high'
}, callback)
```

### SetupProgressReplication
{: .d-inline-block }
Server
{: .label .label-green }

Sets up progress replication for spectators or team members.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.SetupProgressReplication(source, spectators, config)
```

#### Parameters
- `source` (number): Primary player performing progress
- `spectators` (table): Array of spectator player IDs
- `config` (table): Replication configuration

#### Example
```lua
-- Show progress to team members
Bridge.Progressbar.SetupProgressReplication(source, teamMembers, {
    showProgress = true,
    showLabel = true,
    position = 'top-right',
    prefix = GetPlayerName(source) .. ': '
})
```

---

## Best Practices

### Resource Management
Properly clean up progress data:

```lua
AddEventHandler('playerDropped', function(reason)
    local source = source
    Bridge.Progressbar.StopClientProgress(source)
    Bridge.Progressbar.ClearProgressState(source)
end)

AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        Bridge.Progressbar.BroadcastProgress({
            name = 'resource_stopping',
            duration = 0,
            label = 'Resource stopping...'
        })
    end
end)
```

### Error Handling
Handle progress errors on the server:

```lua
RegisterNetEvent('progress:error')
AddEventHandler('progress:error', function(progressName, error)
    local source = source
    print('Progress error for player ' .. source .. ': ' .. error)
    
    -- Log error
    Bridge.Progressbar.LogProgressEvent(source, 'error', progressName, {
        error = error,
        timestamp = os.time()
    })
    
    -- Clean up progress state
    Bridge.Progressbar.StopClientProgress(source, progressName)
end)
```

### Performance Optimization
Optimize for high player counts:

```lua
-- Batch progress updates
local progressUpdates = {}

CreateThread(function()
    while true do
        if #progressUpdates > 0 then
            for _, update in ipairs(progressUpdates) do
                TriggerClientEvent('progress:update', update.source, update.data)
            end
            progressUpdates = {}
        end
        Wait(100)
    end
end)

-- Queue updates instead of sending immediately
local function QueueProgressUpdate(source, data)
    table.insert(progressUpdates, {
        source = source,
        data = data
    })
end
```

---

## Common Patterns

### Crafting System Integration
```lua
RegisterNetEvent('crafting:start')
AddEventHandler('crafting:start', function(recipe)
    local source = source
    
    -- Validate player has materials
    if not Bridge.Progressbar.HasCraftingMaterials(source, recipe) then
        Bridge.Progressbar.ShowNotification(source, 'Missing materials', 'error')
        return
    end
    
    -- Remove materials
    Bridge.Progressbar.RemoveCraftingMaterials(source, recipe)
    
    -- Start crafting progress
    Bridge.Progressbar.TriggerClientProgress(source, {
        name = 'crafting_' .. recipe.name,
        duration = recipe.time,
        label = 'Crafting ' .. recipe.label .. '...',
        canCancel = true
    }, function(cancelled)
        if not cancelled then
            -- Give crafted item
            Bridge.Progressbar.GiveItem(source, recipe.result, recipe.quantity)
            Bridge.Progressbar.ShowNotification(source, 'Crafted ' .. recipe.label, 'success')
        else
            -- Return materials on cancel
            Bridge.Progressbar.GiveCraftingMaterials(source, recipe, 0.5) -- 50% return
        end
    end)
end)
```

### Job System Integration
```lua
RegisterNetEvent('job:startTask')
AddEventHandler('job:startTask', function(taskId)
    local source = source
    local player = Bridge.Progressbar.GetPlayer(source)
    
    if not player then return end
    
    local task = GetJobTask(player.job, taskId)
    if not task then return end
    
    Bridge.Progressbar.TriggerClientProgress(source, {
        name = 'job_task_' .. taskId,
        duration = task.duration,
        label = task.description,
        canCancel = false
    }, function(cancelled)
        if not cancelled then
            -- Complete task and give rewards
            Bridge.Progressbar.CompleteJobTask(source, taskId)
            Bridge.Progressbar.AddPlayerMoney(source, task.payment)
            Bridge.Progressbar.AddJobExperience(source, task.experience)
        end
    end)
end)
```
