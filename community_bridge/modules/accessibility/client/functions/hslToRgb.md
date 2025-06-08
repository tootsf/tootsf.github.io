---
layout: default
title: "hslToRgb"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
nav_order: 1
---

# hslToRgb
{: .no_toc }

Converts HSL color to RGB values.

## Syntax

```lua
Bridge.Accessibility.hslToRgb(h, s, l)
```

## Parameters

**h:** `number`  
Hue (0-360)

**s:** `number`  
Saturation (0-1)

**l:** `number`  
Lightness (0-1)

## Returns

**table**  
RGB color values

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local rgb = Bridge.Accessibility.hslToRgb(120, 1, 0.5)
```

---