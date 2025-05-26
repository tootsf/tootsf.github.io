---
title: "Shared Functions"
parent: "Progressbar"
grand_parent: "Modules"
great_grand_parent: "Community Bridge"
nav_order: 4
has_children: true
---

# Progressbar - Shared Functions
{: .no_toc }

Shared utility functions for progress bar configuration, validation, and common operations.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

Shared functions provide utilities for progress bar configuration, validation, and common operations.

---

## 🔹 GetProgressConfig
{: .d-inline-block }
Shared
{: .label .label-purple }

Gets the current progress bar configuration.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.GetProgressConfig()
```

#### Returns
- `table`: Current configuration settings

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local config = Bridge.Progressbar.GetProgressConfig()
print('Default timeout: ' .. config.defaultTimeout)
print('Animation enabled: ' .. tostring(config.enableAnimations))
```

### SetProgressConfig
{: .d-inline-block }
Shared
{: .label .label-purple }

Sets global progress bar configuration.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.SetProgressConfig(config)
```

#### Parameters
- `config` (table): Configuration options

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.SetProgressConfig({
    defaultTimeout = 30000,
    enableAnimations = true,
    enableSounds = true,
    defaultPosition = 'center',
    allowCancellation = true,
    showPercentage = true,
    updateInterval = 100
})
```

### GetProgressThemes
{: .d-inline-block }
Shared
{: .label .label-purple }

Gets available progress bar themes.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.GetProgressThemes()
```

#### Returns
- `table`: Available themes

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local themes = Bridge.Progressbar.GetProgressThemes()
for name, theme in pairs(themes) do
    print('Theme: ' .. name)
    print('Primary color: ' .. theme.primaryColor)
end
```

### RegisterProgressTheme
{: .d-inline-block }
Shared
{: .label .label-purple }

Registers a new progress bar theme.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.RegisterProgressTheme(name, theme)
```

#### Parameters
- `name` (string): Theme name
- `theme` (table): Theme configuration

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.RegisterProgressTheme('cyberpunk', {
    primaryColor = '#00ff88',
    secondaryColor = '#ff0088',
    backgroundColor = '#0a0a0a',
    textColor = '#ffffff',
    borderColor = '#00ffff',
    glowEffect = true,
    animation = 'neon-pulse'
})
```

---

## Validation Functions

### ValidateProgressConfig
{: .d-inline-block }
Shared
{: .label .label-purple }

Validates progress bar configuration.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ValidateProgressConfig(config)
```

#### Parameters
- `config` (table): Configuration to validate

#### Returns
- `boolean`: True if valid
- `string`: Error message if invalid

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local valid, error = Bridge.Progressbar.ValidateProgressConfig({
    name = 'test_progress',
    duration = 5000,
    label = 'Testing...'
})

if not valid then
    print('Invalid config: ' .. error)
end
```

### ValidateProgressName
{: .d-inline-block }
Shared
{: .label .label-purple }

Validates progress bar name format.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ValidateProgressName(name)
```

#### Parameters
- `name` (string): Progress name to validate

#### Returns
- `boolean`: True if valid

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local valid = Bridge.Progressbar.ValidateProgressName('my_progress_123')
print('Name valid: ' .. tostring(valid))
```

### ValidateProgressDuration
{: .d-inline-block }
Shared
{: .label .label-purple }

Validates progress duration value.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ValidateProgressDuration(duration)
```

#### Parameters
- `duration` (number): Duration in milliseconds

#### Returns
- `boolean`: True if valid
- `string`: Error message if invalid

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local valid, error = Bridge.Progressbar.ValidateProgressDuration(5000)
if not valid then
    print('Invalid duration: ' .. error)
end
```

---

## Utility Functions

### CalculateProgressPercentage
{: .d-inline-block }
Shared
{: .label .label-purple }

Calculates progress percentage based on elapsed time.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.CalculateProgressPercentage(startTime, duration)
```

#### Parameters
- `startTime` (number): Start timestamp
- `duration` (number): Total duration in milliseconds

#### Returns
- `number`: Progress percentage (0-100)

#### Example
```lua
local startTime = GetGameTimer()
Wait(2500) -- Wait 2.5 seconds
local percentage = Bridge.Progressbar.CalculateProgressPercentage(startTime, 5000)
print('Progress: ' .. percentage .. '%') -- Should be around 50%
```

### FormatProgressTime
{: .d-inline-block }
Shared
{: .label .label-purple }

Formats time remaining for display.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.FormatProgressTime(milliseconds, format)
```

#### Parameters
- `milliseconds` (number): Time in milliseconds
- `format` (string, optional): Format type ('short', 'long', 'exact')

#### Returns
- `string`: Formatted time string

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local formatted = Bridge.Progressbar.FormatProgressTime(65000, 'short')
print(formatted) -- "1m 5s"

local exact = Bridge.Progressbar.FormatProgressTime(65000, 'exact')
print(exact) -- "01:05"
```

### InterpolateProgress
{: .d-inline-block }
Shared
{: .label .label-purple }

Interpolates progress value with easing functions.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.InterpolateProgress(progress, easingType)
```

#### Parameters
- `progress` (number): Raw progress value (0-1)
- `easingType` (string): Easing function ('linear', 'ease-in', 'ease-out', 'ease-in-out')

#### Returns
- `number`: Interpolated progress value

#### Example
```lua
local linearProgress = 0.5
local easedProgress = Bridge.Progressbar.InterpolateProgress(linearProgress, 'ease-out')
print('Eased progress: ' .. easedProgress)
```

---

## Constants and Enums

### ProgressPositions
{: .d-inline-block }
Shared
{: .label .label-purple }

Gets available progress bar positions.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ProgressPositions()
```

#### Returns
- `table`: Available position constants

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local positions = Bridge.Progressbar.ProgressPositions()
-- positions.TOP = 'top'
-- positions.CENTER = 'center'
-- positions.BOTTOM = 'bottom'
-- positions.TOP_LEFT = 'top-left'
-- etc.
```

### ProgressStates
{: .d-inline-block }
Shared
{: .label .label-purple }

Gets progress state constants.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ProgressStates()
```

#### Returns
- `table`: Progress state constants

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local states = Bridge.Progressbar.ProgressStates()
-- states.PENDING = 'pending'
-- states.ACTIVE = 'active'
-- states.PAUSED = 'paused'
-- states.COMPLETED = 'completed'
-- states.CANCELLED = 'cancelled'
-- states.FAILED = 'failed'
```

### ProgressEvents
{: .d-inline-block }
Shared
{: .label .label-purple }

Gets progress event type constants.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ProgressEvents()
```

#### Returns
- `table`: Event type constants

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local events = Bridge.Progressbar.ProgressEvents()
-- events.START = 'progress:start'
-- events.UPDATE = 'progress:update'
-- events.COMPLETE = 'progress:complete'
-- events.CANCEL = 'progress:cancel'
-- events.PAUSE = 'progress:pause'
-- events.RESUME = 'progress:resume'
```

---

## Color and Style Utilities

### ConvertColorFormat
{: .d-inline-block }
Shared
{: .label .label-purple }

Converts colors between different formats.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ConvertColorFormat(color, fromFormat, toFormat)
```

#### Parameters
- `color` (string/table): Color value
- `fromFormat` (string): Source format ('hex', 'rgb', 'rgba', 'hsl')
- `toFormat` (string): Target format

#### Returns
- `string/table`: Converted color value

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local hexColor = Bridge.Progressbar.ConvertColorFormat({255, 0, 0}, 'rgb', 'hex')
print(hexColor) -- "#ff0000"

local rgbaColor = Bridge.Progressbar.ConvertColorFormat('#ff0000', 'hex', 'rgba')
print(json.encode(rgbaColor)) -- {255, 0, 0, 255}
```

### BlendColors
{: .d-inline-block }
Shared
{: .label .label-purple }

Blends two colors together.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.BlendColors(color1, color2, ratio)
```

#### Parameters
- `color1` (string): First color (hex format)
- `color2` (string): Second color (hex format)
- `ratio` (number): Blend ratio (0-1)

#### Returns
- `string`: Blended color in hex format

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local blended = Bridge.Progressbar.BlendColors('#ff0000', '#0000ff', 0.5)
print(blended) -- "#7f007f" (purple)
```

### GenerateGradient
{: .d-inline-block }
Shared
{: .label .label-purple }

Generates a color gradient.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.GenerateGradient(startColor, endColor, steps)
```

#### Parameters
- `startColor` (string): Starting color
- `endColor` (string): Ending color
- `steps` (number): Number of gradient steps

#### Returns
- `table`: Array of gradient colors

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local gradient = Bridge.Progressbar.GenerateGradient('#ff0000', '#00ff00', 10)
for i, color in ipairs(gradient) do
    print('Step ' .. i .. ': ' .. color)
end
```

---

## Math Utilities

### EaseInOut
{: .d-inline-block }
Shared
{: .label .label-purple }

Applies ease-in-out interpolation.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.EaseInOut(t)
```

#### Parameters
- `t` (number): Input value (0-1)

#### Returns
- `number`: Eased value

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local eased = Bridge.Progressbar.EaseInOut(0.5)
print('Eased value: ' .. eased)
```

### BezierCurve
{: .d-inline-block }
Shared
{: .label .label-purple }

Calculates bezier curve interpolation.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.BezierCurve(t, p0, p1, p2, p3)
```

#### Parameters
- `t` (number): Interpolation parameter (0-1)
- `p0` (number): First control point
- `p1` (number): Second control point
- `p2` (number): Third control point
- `p3` (number): Fourth control point

#### Returns
- `number`: Interpolated value

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local value = Bridge.Progressbar.BezierCurve(0.5, 0, 0.5, 0.5, 1)
```

### ClampValue
{: .d-inline-block }
Shared
{: .label .label-purple }

Clamps a value between minimum and maximum bounds.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ClampValue(value, min, max)
```

#### Parameters
- `value` (number): Value to clamp
- `min` (number): Minimum bound
- `max` (number): Maximum bound

#### Returns
- `number`: Clamped value

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local clamped = Bridge.Progressbar.ClampValue(150, 0, 100)
print(clamped) -- 100
```

---

## Animation Utilities

### CreateProgressAnimation
{: .d-inline-block }
Shared
{: .label .label-purple }

Creates an animation configuration for progress bars.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.CreateProgressAnimation(type, options)
```

#### Parameters
- `type` (string): Animation type ('fade', 'slide', 'pulse', 'bounce')
- `options` (table): Animation options

#### Returns
- `table`: Animation configuration

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local animation = Bridge.Progressbar.CreateProgressAnimation('pulse', {
    duration = 1000,
    intensity = 0.2,
    repeat = true
})
```

### GetAnimationPresets
{: .d-inline-block }
Shared
{: .label .label-purple }

Gets predefined animation presets.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.GetAnimationPresets()
```

#### Returns
- `table`: Available animation presets

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local presets = Bridge.Progressbar.GetAnimationPresets()
local smoothFade = presets.smoothFade
local bouncySlide = presets.bouncySlide
```

---

## Event Utilities

### CreateProgressEvent
{: .d-inline-block }
Shared
{: .label .label-purple }

Creates a standardized progress event object.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.CreateProgressEvent(type, progressName, data)
```

#### Parameters
- `type` (string): Event type
- `progressName` (string): Progress identifier
- `data` (table, optional): Event data

#### Returns
- `table`: Event object

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local event = Bridge.Progressbar.CreateProgressEvent('complete', 'repair_task', {
    duration = 10000,
    success = true,
    playerId = 1
})
```

### ValidateProgressEvent
{: .d-inline-block }
Shared
{: .label .label-purple }

Validates progress event structure.

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Progressbar.ValidateProgressEvent(event)
```

#### Parameters
- `event` (table): Event object to validate

#### Returns
- `boolean`: True if valid

#### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local valid = Bridge.Progressbar.ValidateProgressEvent(event)
if not valid then
    print('Invalid event structure')
end
```

---

## Common Patterns

### Progress Configuration Builder
```lua
local function CreateProgressConfig(name, duration, label)
    return {
        name = name,
        duration = duration,
        label = label,
        canCancel = true,
        useWhileDead = false,
        disableControls = {
            disableMovement = true,
            disableCarMovement = true,
            disableMouse = false,
            disableCombat = true
        }
    }
end

-- Usage
local repairConfig = CreateProgressConfig('repair', 10000, 'Repairing...')
```

### Progress Template System
```lua
local progressTemplates = {
    repair = {
        duration = 10000,
        label = 'Repairing...',
        animation = {
            animDict = 'mini@repair',
            anim = 'fixing_a_ped'
        },
        disableControls = {
            disableMovement = true,
            disableCarMovement = true
        }
    },
    
    lockpick = {
        duration = 8000,
        label = 'Picking lock...',
        canCancel = true,
        skillCheck = true,
        disableControls = {
            disableMovement = true
        }
    }
}

local function GetProgressTemplate(name)
    return progressTemplates[name] or {}
end
```

### Progress Validation Schema
```lua
local progressSchema = {
    name = 'string',
    duration = 'number',
    label = 'string',
    canCancel = 'boolean',
    useWhileDead = 'boolean',
    position = 'string',
    disableControls = 'table'
}

local function ValidateProgressSchema(config)
    for key, expectedType in pairs(progressSchema) do
        if config[key] and type(config[key]) ~= expectedType then
            return false, 'Invalid type for ' .. key .. ', expected ' .. expectedType
        end
    end
    return true
end
```

---

## Best Practices

### Type Safety
Always validate configuration data:

```lua
local function SafeProgressConfig(config)
    assert(type(config) == 'table', 'Config must be a table')
    assert(type(config.name) == 'string', 'Name must be a string')
    assert(type(config.duration) == 'number', 'Duration must be a number')
    assert(config.duration > 0, 'Duration must be positive')
    
    return config
end
```

### Default Values
Provide sensible defaults:

```lua
local function ApplyProgressDefaults(config)
    local defaults = Bridge.Progressbar.GetProgressConfig()
    
    return {
        name = config.name,
        duration = config.duration,
        label = config.label or 'Processing...',
        canCancel = config.canCancel or defaults.allowCancellation,
        useWhileDead = config.useWhileDead or false,
        position = config.position or defaults.defaultPosition,
        disableControls = config.disableControls or {}
    }
end
```

### Resource Cleanup
Clean up shared resources:

```lua
local activeAnimations = {}

local function CleanupAnimations()
    for id, animation in pairs(activeAnimations) do
        if animation.isComplete then
            activeAnimations[id] = nil
        end
    end
end

-- Cleanup on resource stop
AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        activeAnimations = {}
    end
end)
```
