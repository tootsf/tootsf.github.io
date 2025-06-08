---
layout: default
title: "BroadcastProgress"
parent: Functions
grand_parent: Server
great_grand_parent: ⏳ Progressbar
nav_order: 1
permalink: /community_bridge/modules/progressbar/server/functions/BroadcastProgress/
nav_exclude: true
---

# BroadcastProgress
{: .no_toc }

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