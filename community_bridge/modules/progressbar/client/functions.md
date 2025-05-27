---
layout: default
title: Functions
parent: Client
grand_parent: "⏳ Progressbar"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/progressbar/client/functions/
---

# Progressbar Client Functions
{: .no_toc }

Client-side functions for progress bar displays.

# Progressbar Client Functions
{: .no_toc }

Client-side functions for progress bar displays.

---

## 🔹 IsProgressActive

# IsProgressActive
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if a progress bar is currently active.

## Syntax

```lua
function Progressbar.IsProgressActive(name)
```

## Parameters

**name:** `string` (optional)  
Progress name to check. If not provided, checks for any active progress bar.

## Returns

**boolean**  
`true` if progress is active, `false` otherwise

## Example

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

## 🔹 StartCircularProgress

# StartCircularProgress
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Creates a circular progress indicator.

## Syntax

```lua
function Progressbar.StartCircularProgress(config, callback)
```

## Parameters

**config:** `table`  
Circular progress configuration with the following properties:
- `name` (string): Unique progress identifier
- `duration` (number): Progress duration in milliseconds
- `label` (string): Display label
- `size` (number): Size of the circular progress indicator
- `thickness` (number): Thickness of the circular progress line
- `color` (string): Color of the progress indicator (hex format)
- `position` (string): Screen position ('top', 'center', 'bottom')

**callback:** `function`  
Completion callback function called when progress completes or is cancelled

## Example

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

---

## 🔹 StartProgress

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

---

## 🔹 StopProgress

# StopProgress
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Stops an active progress bar.

## Syntax

```lua
function Progressbar.StopProgress(name)
```

## Parameters

**name:** `string` (optional)  
Progress name to stop. If not provided, stops all progress bars.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Stop specific progress
Bridge.Progressbar.StopProgress('repair_vehicle')

-- Stop all progress bars
Bridge.Progressbar.StopProgress()
```