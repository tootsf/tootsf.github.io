---
layout: default
title: "TriggerClientProgress"
parent: Progressbar Functions
grand_parent: Server
great_grand_parent: ⏳ Progressbar
nav_order: 1
---

# TriggerClientProgress
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