# Math 🧮

<!--META
nav: true
toc: true
description: Mathematical utility functions for 3D calculations, value clamping, interpolation, and common mathematical operations. This module provides essential mathematical tools for game development including smoothing, mapping values between ranges, and mathematical computations.
-->

Mathematical utility functions for 3D calculations, value clamping, interpolation, and common mathematical operations. This module provides essential mathematical tools for game development including smoothing, mapping values between ranges, and mathematical computations.

## Overview

The Math provides functionality for FiveM resources.

## Client Functions

### Clamp

<!--TOC: Clamp-->

**Context:** 🖥️ Client

Clamps a value between a minimum and maximum range.

**Syntax:** `Bridge.Math.Clamp(value, min, max)`

**Parameters:**
- `value` (number) - The value to clamp
- `min` (number) - The minimum value
- `max` (number) - The maximum value

**Returns:**
- (number) - The clamped value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local health = Bridge.Math.Clamp(playerHealth, 0, 100)
print('Clamped health:', health)
```

### Map

<!--TOC: Map-->

**Context:** 🖥️ Client

Function Map

**Syntax:** `Bridge.Math.Map(value, inMin, inMax, outMin, outMax)`

**Parameters:**
- `value` (number) - The value to map
- `inMin` (number) - Input range minimum
- `inMax` (number) - Input range maximum
- `outMin` (number) - Output range minimum
- `outMax` (number) - Output range maximum

**Returns:**
- (number) - The mapped value in the new range

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
-- Map speed (0-100) to volume (0.0-1.0)
local volume = Bridge.Math.Map(speed, 0, 100, 0.0, 1.0)
SetVehicleRadioVolume(vehicle, volume)
```

### Round

<!--TOC: Round-->

**Context:** 🖥️ Client

Function Round

**Syntax:** `Bridge.Math.Round(value)`

**Parameters:**
- `value` (number) - The value to round

**Returns:**
- (number) - The rounded value to nearest whole number

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local rounded = Bridge.Math.Round(3.7)
print('Rounded value:', rounded) -- Output: 4
```

### Smooth

<!--TOC: Smooth-->

**Context:** 🖥️ Client

Function Smooth

**Syntax:** `Bridge.Math.Smooth(value, min, max)`

**Parameters:**
- `value` (number) - The interpolation value
- `min` (number) - The minimum value
- `max` (number) - The maximum value

**Returns:**
- (number) - The interpolated value using smoothstep algorithm

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local smoothed = Bridge.Math.Smooth(0.5, 0, 1)
print('Smoothed value:', smoothed)
```

### Truncate

<!--TOC: Truncate-->

**Context:** 🖥️ Client

Function Truncate

**Syntax:** `Bridge.Math.Truncate(value, decimals)`

**Parameters:**
- `value` (number) - The value to truncate
- `decimals` (number) - Number of decimal places to keep

**Returns:**
- (number) - The truncated value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local truncated = Bridge.Math.Truncate(3.14159, 2)
print('Truncated value:', truncated) -- Output: 3.14
```

### Wrap

<!--TOC: Wrap-->

**Context:** 🖥️ Client

Function Wrap

**Syntax:** `Bridge.Math.Wrap(value, min, max)`

**Parameters:**
- `value` (number) - The value to wrap
- `min` (number) - The minimum value
- `max` (number) - The maximum value

**Returns:**
- (number) - The wrapped value within the range

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local angle = Bridge.Math.Wrap(370, 0, 360)
print('Wrapped angle:', angle) -- Output: 10
```

## Server Functions

### Clamp

<!--TOC: Clamp-->

**Context:** 🖲️ Server

Function Clamp

**Syntax:** `Bridge.Math.Clamp(value, min, max)`

**Parameters:**
- `value` (number) - The value to clamp
- `min` (number) - The minimum value
- `max` (number) - The maximum value

**Returns:**
- (number) - The clamped value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local damage = Bridge.Math.Clamp(weaponDamage, 10, 100)
print('Clamped damage:', damage)
```

### Map

<!--TOC: Map-->

**Context:** 🖲️ Server

Function Map

**Syntax:** `Bridge.Math.Map(value, inMin, inMax, outMin, outMax)`

**Parameters:**
- `value` (number) - The value to map
- `inMin` (number) - Input range minimum
- `inMax` (number) - Input range maximum
- `outMin` (number) - Output range minimum
- `outMax` (number) - Output range maximum

**Returns:**
- (number) - The mapped value in the new range

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
-- Map player level (1-100) to experience multiplier (1.0-2.5)
local multiplier = Bridge.Math.Map(playerLevel, 1, 100, 1.0, 2.5)
local exp = baseExp * multiplier
```

### Round

<!--TOC: Round-->

**Context:** 🖲️ Server

Function Round

**Syntax:** `Bridge.Math.Round(value)`

**Parameters:**
- `value` (number) - The value to round

**Returns:**
- (number) - The rounded value to nearest whole number

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local price = Bridge.Math.Round(item.cost * 1.15)
print('Rounded price:', price)
```

### Smooth

<!--TOC: Smooth-->

**Context:** 🖲️ Server

Function Smooth

**Syntax:** `Bridge.Math.Smooth(value, min, max)`

**Parameters:**
- `value` (number) - The interpolation value
- `min` (number) - The minimum value
- `max` (number) - The maximum value

**Returns:**
- (number) - The interpolated value using smoothstep algorithm

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local progress = Bridge.Math.Smooth(timeElapsed / totalTime, 0, 1)
print('Smooth progress:', progress)
```

### Truncate

<!--TOC: Truncate-->

**Context:** 🖲️ Server

Function Truncate

**Syntax:** `Bridge.Math.Truncate(value, decimals)`

**Parameters:**
- `value` (number) - The value to truncate
- `decimals` (number) - Number of decimal places to keep

**Returns:**
- (number) - The truncated value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local money = Bridge.Math.Truncate(playerMoney, 2)
print('Money with 2 decimals:', money)
```

### Wrap

<!--TOC: Wrap-->

**Context:** 🖲️ Server

Function Wrap

**Syntax:** `Bridge.Math.Wrap(value, min, max)`

**Parameters:**
- `value` (number) - The value to wrap
- `min` (number) - The minimum value
- `max` (number) - The maximum value

**Returns:**
- (number) - The wrapped value within the range

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local hour = Bridge.Math.Wrap(currentHour + offset, 0, 24)
print('Wrapped hour:', hour)
```

