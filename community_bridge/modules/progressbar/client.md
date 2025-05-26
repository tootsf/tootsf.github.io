---
title: "Client Functions"
parent: "Progressbar"
grand_parent: "Modules"
great_grand_parent: "Community Bridge"
nav_order: 2
---

# Progressbar - Client Functions

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Core Functions

---

## 🔹 StartProgress

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

---

## 🔹 StartCircularProgress

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

## 📚 Interactive Progress

---

## 📚 Progress Styling

---

## 📚 Multi-Progress

---

## 📚 Animation Integration

---

## 📚 Event Handlers

---

## 📚 Utility Functions

---

## 📚 Best Practices

---

## 📚 Common Patterns
