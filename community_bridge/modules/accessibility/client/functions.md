---
layout: default
title: Functions
parent: Client
grand_parent: "♿ Accessibility"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/
---

# Accessibility Client Functions
{: .no_toc }

Client-side functions for accessibility and color adjustments.

# Accessibility Client Functions
{: .no_toc }

Client-side functions for accessibility and color adjustments.

---

## 🔹 IsMale

Check if current player is male model.

**Returns:**
- `boolean`: True if male, false if female

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Accessibility.IsMale() then
    print("Player is male")
end
```

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

---

## 🔹 updatecolourblindness

Opens color blindness settings menu.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Accessibility.updatecolourblindness()
```