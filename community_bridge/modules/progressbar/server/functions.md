---
layout: default
title: Functions
parent: Server
grand_parent: "⏳ Progressbar"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/progressbar/server/functions/
---

# Progressbar Server Functions
{: .no_toc }

Server-side functions for progress bar displays.

---

## 🔹 BroadcastProgress

# BroadcastProgress
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Broadcasts a progress bar to all connected players.

## Syntax

```lua
function Progressbar.BroadcastProgress(config, callback)
```

## Parameters

**config:** `table`  
Progress bar configuration with the following properties:
- `name` (string): Unique progress identifier
- `duration` (number): Progress duration in milliseconds
- `label` (string): Display label
- `canCancel` (boolean): Allow cancellation
- `position` (string): Screen position ('top', 'center', 'bottom')

**callback:** `function` (optional)  
Callback when all players complete

## Returns

**table**  
A table with results from each player, indexed by player ID

## Example

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

---

## 🔹 IsClientProgressActive

# IsClientProgressActive
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Checks if a client has an active progress bar.

## Syntax

```lua
function Progressbar.IsClientProgressActive(source, name)
```

## Parameters

**source:** `number`  
Player server ID

**name:** `string` (optional)  
Progress name to check. If not provided, checks for any active progress bar for the player.

## Returns

**boolean**  
`true` if progress is active, `false` otherwise

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Progressbar.IsClientProgressActive(source, 'repair_task') then
    Bridge.Progressbar.ShowNotification(source, 'Already repairing!', 'error')
    return
end
```

---

## 🔹 StartSynchronizedProgress

# StartSynchronizedProgress
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Starts synchronized progress bars for multiple players.

## Syntax

```lua
function Progressbar.StartSynchronizedProgress(players, config, callback)
```

## Parameters

**players:** `table`  
Array of player server IDs

**config:** `table`  
Progress configuration with the following properties:
- `name` (string): Unique progress identifier
- `duration` (number): Progress duration in milliseconds
- `label` (string): Display label
- `canCancel` (boolean): Allow cancellation
- `syncRequired` (boolean): Whether all players must complete for success

**callback:** `function`  
Callback when synchronization completes

## Returns

**table**  
A table with results from each player, indexed by player ID

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

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
        -- At least one player failed
        TriggerEvent('heist:failed')
    end
end)
```

---

## 🔹 StopClientProgress

# StopClientProgress
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Stops a progress bar on a specific client.

## Syntax

```lua
function Progressbar.StopClientProgress(source, name)
```

## Parameters

**source:** `number`  
Player server ID

**name:** `string` (optional)  
Progress name to stop. If not provided, stops all progress bars for the specified player.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Stop specific progress
Bridge.Progressbar.StopClientProgress(source, 'server_task')

-- Stop all progress for player
Bridge.Progressbar.StopClientProgress(source)
```

---

## 🔹 TriggerClientProgress

# TriggerClientProgress
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Triggers a progress bar on a specific client from the server.

## Syntax

```lua
function Progressbar.TriggerClientProgress(source, config, callback)
```

## Parameters

**source:** `number`  
Player server ID

**config:** `table`  
Progress bar configuration with the following properties:
- `name` (string): Unique progress identifier
- `duration` (number): Progress duration in milliseconds
- `label` (string): Display label
- `useWhileDead` (boolean): Allow progress while dead
- `canCancel` (boolean): Allow cancellation
- `disableControls` (table): Controls to disable during progress
- `animation` (table): Animation configuration
- `position` (string): Screen position ('top', 'center', 'bottom')

**callback:** `function` (optional)  
Server-side callback when progress completes

## Example

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