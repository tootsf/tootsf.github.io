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

## 📚 Client Functions

- [updatecolourblindness](client/updatecolourblindness.md) - Opens color blindness settings menu
- [hexToRgb](client/hexToRgb.md) - Convert hex color to RGB
- [rgbToHex](client/rgbToHex.md) - Convert RGB color to hex
- [rgbToHsl](client/rgbToHsl.md) - Convert RGB color to HSL
- [hslToRgb](client/hslToRgb.md) - Convert HSL color to RGB
- [adjustColourForColourblindness](client/adjustColourForColourblindness.md) - Adjust color for colorblindness
- [getAdjustedColour](client/getAdjustedColour.md) - Get color adjusted for user's colorblindness setting
- [IsMale](client/IsMale.md) - Check if current player is male model

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
