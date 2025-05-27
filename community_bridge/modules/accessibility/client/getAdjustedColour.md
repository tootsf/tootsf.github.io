---
title: getAdjustedColour
parent: Client Functions
grand_parent: "♿ Accessibility"
nav_order: 7
---

## 🔹 getAdjustedColour

Get color adjusted for user's colorblindness setting.

**Parameters:**
- `colorName` (string): Name of the color
- `returnAsRGB` (boolean): Return as RGB table if true, else hex

**Returns:**
- `string` or `table`: Adjusted color

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local adjusted = Bridge.Accessibility.getAdjustedColour("red", false)
-- adjusted = "#..."
```
