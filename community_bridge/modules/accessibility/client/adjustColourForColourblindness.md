---
title: adjustColourForColourblindness
parent: Client Functions
grand_parent: Accessibility
nav_order: 6
---

## 🔹 adjustColourForColourblindness

Adjust color for colorblindness.

**Parameters:**
- `color` (string or table): Color to adjust (hex or RGB)
- `returnAsRGB` (boolean): Return as RGB table if true, else hex

**Returns:**
- `string` or `table`: Adjusted color

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local adjusted = Bridge.Accessibility.adjustColourForColourblindness("#FF0000", true)
-- adjusted = {r = ..., g = ..., b = ...}
```
