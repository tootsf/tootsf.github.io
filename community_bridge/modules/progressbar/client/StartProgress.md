---
layout: default
title: StartProgress
parent: Client Functions
grand_parent: "⏳ Progressbar"
nav_order: 1
---

# StartProgress
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Creates and starts a progress bar with customizable options.

## Syntax

```lua
function Progressbar.StartProgress(config, callback)
```

## Parameters

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

**callback:** `function`  
Function called when progress completes or is cancelled

## Example

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
