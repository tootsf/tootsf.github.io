---
layout: default
title: StartSynchronizedProgress
parent: Server Functions
grand_parent: Progressbar
nav_order: 5
---

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
