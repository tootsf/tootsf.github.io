---
title: rgbToHex
parent: Client Functions
grand_parent: "♿ Accessibility"
nav_order: 3
---

## 🔹 rgbToHex

Convert RGB color to hex.

**Parameters:**
- `r` (number): Red value (0-255)
- `g` (number): Green value (0-255)
- `b` (number): Blue value (0-255)

**Returns:**
- `string`: Hex color string (e.g., "#FF0000")

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local hex = Bridge.Accessibility.rgbToHex(255, 0, 0)
-- hex = "#FF0000"
```
