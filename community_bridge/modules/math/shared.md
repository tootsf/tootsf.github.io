---
layout: default
title: Shared Functions
parent: Math
grand_parent: Modules
nav_order: 1
---

# Math Shared Functions
{: .no_toc }

Shared mathematical utility functions available on both client and server sides.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Range Functions

### Clamp(value, min, max)
{: .d-inline-block }
Shared
{: .label .label-purple }

Constrains a value between minimum and maximum bounds.

**Parameters:**
- `value` (number) - The value to clamp
- `min` (number) - The minimum value
- `max` (number) - The maximum value

**Returns:**
- `number` - The clamped value

**Example:**
```lua
local Math = exports['community_bridge']:Math()

local health = Math.Clamp(playerHealth, 0, 100)
-- If playerHealth is 150, returns 100
-- If playerHealth is -10, returns 0
-- If playerHealth is 75, returns 75
```

### Wrap(value, min, max)
{: .d-inline-block }
Shared
{: .label .label-purple }

Wraps a value around between minimum and maximum bounds.

**Parameters:**
- `value` (number) - The value to wrap
- `min` (number) - The minimum value
- `max` (number) - The maximum value

**Returns:**
- `number` - The wrapped value

**Example:**
```lua
-- Wrap angle between 0 and 360 degrees
local angle = Math.Wrap(370, 0, 360)  -- Returns 10
local angle2 = Math.Wrap(-30, 0, 360)  -- Returns 330
```

## Precision Functions

### Round(value)
{: .d-inline-block }
Shared
{: .label .label-purple }

Rounds a number to the nearest whole number.

**Parameters:**
- `value` (number) - The value to round

**Returns:**
- `number` - The rounded value

**Example:**
```lua
local rounded = Math.Round(4.7)  -- Returns 5
local rounded2 = Math.Round(4.3)  -- Returns 4
```

### Truncate(value, decimals)
{: .d-inline-block }
Shared
{: .label .label-purple }

Truncates a number to the specified number of decimal places.

**Parameters:**
- `value` (number) - The value to truncate
- `decimals` (number) - Number of decimal places

**Returns:**
- `number` - The truncated value

**Example:**
```lua
local truncated = Math.Truncate(3.14159, 2)  -- Returns 3.14
local price = Math.Truncate(15.999, 2)  -- Returns 15.99
```

## Interpolation Functions

### Smooth(value, min, max)
{: .d-inline-block }
Shared
{: .label .label-purple }

Gets a smooth interpolated value between two numbers using Hermite interpolation.

**Parameters:**
- `value` (number) - The interpolation value
- `min` (number) - The minimum value
- `max` (number) - The maximum value

**Returns:**
- `number` - The smoothly interpolated value

**Example:**
```lua
-- Smooth fade transition
local fade = Math.Smooth(time, 0, 1)  -- Creates smooth S-curve
```

### Map(value, inMin, inMax, outMin, outMax)
{: .d-inline-block }
Shared
{: .label .label-purple }

Maps a value from one range to another range.

**Parameters:**
- `value` (number) - The value to map
- `inMin` (number) - Input range minimum
- `inMax` (number) - Input range maximum
- `outMin` (number) - Output range minimum
- `outMax` (number) - Output range maximum

**Returns:**
- `number` - The mapped value

**Example:**
```lua
-- Map health percentage to screen width
local screenPos = Math.Map(healthPercent, 0, 100, 0, 1920)

-- Convert temperature scales
local fahrenheit = Math.Map(celsius, 0, 100, 32, 212)
```

---

## Common Use Cases

### Game Development

```lua
-- Smooth camera movement
local smoothPos = Math.Smooth(lerpValue, startPos, endPos)

-- Health bar calculations
local healthWidth = Math.Map(playerHealth, 0, maxHealth, 0, barWidth)

-- Angle normalization
local normalizedAngle = Math.Wrap(heading, 0, 360)
```

### UI Elements

```lua
-- Progress bar percentage
local progress = Math.Clamp(currentValue / maxValue * 100, 0, 100)

-- Animation timing
local animFrame = Math.Round(Math.Map(time, 0, duration, 0, totalFrames))
```
