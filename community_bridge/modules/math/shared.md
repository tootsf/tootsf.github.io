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

## 📚 Overview

This module provides essential mathematical utility functions that are commonly needed in game development. All functions are available on both client and server sides as shared utilities.

---

## 📚 Range Functions

---

## 🔹 Clamp

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
local Bridge = exports['community_bridge']:Bridge()

local health = Bridge.Math.Clamp(playerHealth, 0, 100)
-- If playerHealth is 150, returns 100
-- If playerHealth is -10, returns 0
-- If playerHealth is 75, returns 75
```

---

## 🔹 Wrap

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
local Bridge = exports['community_bridge']:Bridge()

-- Wrap angle between 0 and 360 degrees
local angle = Bridge.Math.Wrap(370, 0, 360)  -- Returns 10
local angle2 = Bridge.Math.Wrap(-30, 0, 360)  -- Returns 330
```

---

## 📚 Precision Functions

---

## 🔹 Round

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
local Bridge = exports['community_bridge']:Bridge()

local rounded = Bridge.Math.Round(4.7)  -- Returns 5
local rounded2 = Bridge.Math.Round(4.3)  -- Returns 4
```

---

## 🔹 Truncate

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
local Bridge = exports['community_bridge']:Bridge()

local truncated = Bridge.Math.Truncate(3.14159, 2)  -- Returns 3.14
local price = Bridge.Math.Truncate(15.999, 2)  -- Returns 15.99
```

---

## 📚 Interpolation Functions

---

## 🔹 Smooth

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
local Bridge = exports['community_bridge']:Bridge()

-- Smooth fade transition
local fade = Bridge.Math.Smooth(time, 0, 1)  -- Creates smooth S-curve
```

---

## 🔹 Map

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
local Bridge = exports['community_bridge']:Bridge()

-- Map health percentage to screen width
local screenPos = Bridge.Math.Map(healthPercent, 0, 100, 0, 1920)

-- Convert temperature scales
local fahrenheit = Bridge.Math.Map(celsius, 0, 100, 32, 212)
```

---

## 📚 Common Use Cases

### Game Development

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Smooth camera movement
local smoothPos = Bridge.Math.Smooth(lerpValue, startPos, endPos)

-- Health bar calculations
local healthWidth = Bridge.Math.Map(playerHealth, 0, maxHealth, 0, barWidth)

-- Angle normalization
local normalizedAngle = Bridge.Math.Wrap(heading, 0, 360)
```

### UI Elements

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Progress bar percentage
local progress = Bridge.Math.Clamp(currentValue / maxValue * 100, 0, 100)

-- Animation timing
local animFrame = Bridge.Math.Round(Bridge.Math.Map(time, 0, duration, 0, totalFrames))
```
