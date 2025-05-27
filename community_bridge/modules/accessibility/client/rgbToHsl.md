---
title: rgbToHsl
parent: Client Functions
grand_parent: "♿ Accessibility"
nav_order: 4
---

## 🔹 rgbToHsl

Convert RGB color to HSL.

**Parameters:**
- `r` (number): Red value (0-255)
- `g` (number): Green value (0-255)
- `b` (number): Blue value (0-255)

**Returns:**
- `table`: HSL values {h, s, l}

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local hsl = Bridge.Accessibility.rgbToHsl(255, 0, 0)
-- hsl = {h = 0, s = 1, l = 0.5}
```
