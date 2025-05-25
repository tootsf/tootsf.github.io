---
title: Math Module
sidebar_position: 15
---

# Math Module

The Math module in `community_bridge` provides shared math utility functions for use across resources.

## Shared Functions

### Clamp
```lua
Math.Clamp(value, min, max)
```
Clamps a value between a minimum and maximum.
- `value` (number): The value to clamp
- `min` (number): Minimum allowed value
- `max` (number): Maximum allowed value
- **Returns:** (number) Clamped value

### Round
```lua
Math.Round(value, decimals)
```
Rounds a value to a specified number of decimal places.
- `value` (number): The value to round
- `decimals` (number): Number of decimal places
- **Returns:** (number) Rounded value
