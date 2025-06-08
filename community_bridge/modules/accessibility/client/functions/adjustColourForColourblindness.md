---
layout: default
title: "adjustColourForColourblindness"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
nav_order: 1
---

# adjustColourForColourblindness
{: .no_toc }

Adjusts colors based on colorblindness type.

## Syntax

```lua
Bridge.Accessibility.adjustColourForColourblindness(r, g, b, type)
```

## Parameters

**r:** `number`
Red color component (0-255)

**g:** `number`
Green color component (0-255)

**b:** `number`
Blue color component (0-255)

**type:** `string`
Colorblindness type ('protanopia', 'deuteranopia', 'tritanopia')

## Returns

**table**
Adjusted RGB color values

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local adjustedColor = Bridge.Accessibility.adjustColourForColourblindness(255, 100, 50, 'protanopia')
```

---