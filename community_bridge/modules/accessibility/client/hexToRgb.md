---
title: hexToRgb
parent: Client Functions
grand_parent: Accessibility
nav_order: 2
---

## 🔹 hexToRgb

Convert hex color to RGB.

**Parameters:**
- `hex` (string): Hex color string (e.g., "#FF0000")

**Returns:**
- `table`: RGB values {r, g, b}

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local rgb = Bridge.Accessibility.hexToRgb("#FF0000")
-- rgb = {r = 255, g = 0, b = 0}
```
