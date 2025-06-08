---
layout: default
title: "StartCircularProgress"
parent: Functions
grand_parent: Client
great_grand_parent: ⏳ Progressbar
nav_order: 1
permalink: /community_bridge/modules/progressbar/client/functions/StartCircularProgress/
nav_exclude: true
---

# StartCircularProgress
{: .no_toc }

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