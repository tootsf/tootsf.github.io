---
layout: default
title: Accessibility
parent: Modules
grand_parent: Community Bridge
nav_order: 1
has_children: true
permalink: /community_bridge/modules/accessibility/
---

# Accessibility Module

The accessibility module provides colorblind accessibility features and color utility functions.

---

## 📚 Available Functions

### Client-side
- [`updatecolourblindness()`](client.md#updatecolourblindness) - Opens color blindness settings menu
- [`hexToRgb(hex)`](client.md#hextorgb) - Convert hex color to RGB
- [`rgbToHex(r, g, b)`](client.md#rgbtohex) - Convert RGB color to hex
- [`rgbToHsl(r, g, b)`](client.md#rgbtohsl) - Convert RGB color to HSL
- [`hslToRgb(h, s, l)`](client.md#hsltorgb) - Convert HSL color to RGB
- [`adjustColourForColourblindness(color, returnAsRGB)`](client.md#adjustcolourforcolourblindness) - Adjust color for colorblindness
- [`getAdjustedColour(colorName, returnAsRGB)`](client.md#getadjustedcolour) - Get color adjusted for user's colorblindness setting
- [`IsMale()`](client.md#ismale) - Check if current player is male model

### Server-side
No server-side functions available.

---

## 📚 Supported Colorblind Types

- Default (no adjustment)
- Protanomaly (red-blind)
- Deuteranomaly (green-blind) 
- Dual (red-green blind)
- Tritanopia (blue-blind)
- Tritanomaly (blue-weak)

---

## 📚 Commands

- `/colourblind` - Opens the colorblind settings menu
