---
title: hslToRgb
parent: Client Functions
grand_parent: "♿ Accessibility"
nav_order: 5
---

## 🔹 hslToRgb

Convert HSL color to RGB.

**Parameters:**
- `h` (number): Hue (0-1)
- `s` (number): Saturation (0-1)
- `l` (number): Lightness (0-1)

**Returns:**
- `table`: RGB values {r, g, b}

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local rgb = Bridge.Accessibility.hslToRgb(0, 1, 0.5)
-- rgb = {r = 255, g = 0, b = 0}
```
