---
layout: default
title: Client Functions
parent: Accessibility
grand_parent: Modules
nav_order: 1
---

# Accessibility Client
{: .no_toc }

The accessibility client module provides colorblind accessibility features and color conversion utilities.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Colorblind Features

### updatecolourblindness()

Opens a menu allowing the user to select their colorblindness type.

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Accessibility.updatecolourblindness()
```

**Example:**
```lua
-- Open colorblind settings menu
local Bridge = exports['community_bridge']:Bridge()
Bridge.Accessibility.updatecolourblindness()
```

### hexToRgb(hex)

Converts a hex color string to RGB values.

**Parameters:**
- `hex` (string): Hex color string (with or without #)

**Returns:** 
- `r` (number): Red value (0-255)
- `g` (number): Green value (0-255) 
- `b` (number): Blue value (0-255)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local r, g, b = Bridge.Accessibility.hexToRgb("#FF0000")
print(r, g, b) -- 255, 0, 0
```

### rgbToHex(r, g, b)

Converts RGB values to a hex color string.

**Parameters:**
- `r` (number): Red value (0-255)
- `g` (number): Green value (0-255)
- `b` (number): Blue value (0-255)

**Returns:**
- `hex` (string): Hex color string with #

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local hex = Bridge.Accessibility.rgbToHex(255, 0, 0)
print(hex) -- "#ff0000"
```

### rgbToHsl(r, g, b)

Converts RGB values to HSL (Hue, Saturation, Lightness) values.

**Parameters:**
- `r` (number): Red value (0-255)
- `g` (number): Green value (0-255)
- `b` (number): Blue value (0-255)

**Returns:**
- `h` (number): Hue (0-1)
- `s` (number): Saturation (0-1)
- `l` (number): Lightness (0-1)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local h, s, l = Bridge.Accessibility.rgbToHsl(255, 0, 0)
print(h, s, l) -- Hue, saturation, lightness values
```

### hslToRgb(h, s, l)

Converts HSL values to RGB values.

**Parameters:**
- `h` (number): Hue (0-1)
- `s` (number): Saturation (0-1)
- `l` (number): Lightness (0-1)

**Returns:**
- `r` (number): Red value (0-255)
- `g` (number): Green value (0-255)
- `b` (number): Blue value (0-255)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local r, g, b = Bridge.Accessibility.hslToRgb(0, 1, 0.5)
print(r, g, b) -- RGB values
```

### adjustColourForColourblindness(color, returnAsRGB)

Adjusts a color based on the user's colorblindness setting.

**Parameters:**
- `color` (string|table): Hex color string or RGB table {r, g, b}
- `returnAsRGB` (boolean): Whether to return RGB table instead of hex string

**Returns:**
- `color` (string|table): Adjusted color as hex string or RGB table

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
-- Adjust hex color
local adjustedHex = Bridge.Accessibility.adjustColourForColourblindness("#FF0000", false)

-- Adjust RGB color
local adjustedRGB = Bridge.Accessibility.adjustColourForColourblindness({r = 255, g = 0, b = 0}, true)
```

### getAdjustedColour(colorName, returnAsRGB)

Gets a color adjusted for the user's current colorblindness setting.

**Parameters:**
- `colorName` (string|table): Hex color string or RGB table
- `returnAsRGB` (boolean): Whether to return RGB table instead of hex string

**Returns:**
- `color` (string|table): Color adjusted for colorblindness or original if default setting

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
-- Get adjusted color for current colorblind setting
local color = Bridge.Accessibility.getAdjustedColour("#FF0000")

-- Get as RGB table
local rgbColor = Bridge.Accessibility.getAdjustedColour("#FF0000", true)
```

## Commands

### /colourblind

Opens the colorblind accessibility menu where users can select their colorblindness type.

```lua
-- This command is automatically registered
-- Players can use: /colourblind
```

## Supported Colorblind Types

- **default** - No color adjustment
- **protanomaly** - Red-blind (shifts towards blue/cyan)
- **deuteranomaly** - Green-blind (shifts towards blue/magenta)
- **dual** - Red-Green blind (significant shift towards blue/yellow)
- **tritanopia** - Blue-blind (shifts towards red/yellow)
- **tritanomaly** - Blue-weak (slight shift towards red/yellow)

Settings are automatically saved using KVP storage and persist across sessions.
