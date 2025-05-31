---
layout: default
title: "hslToRgb"
parent: Functions
grand_parent: Client
great_grand_parent: "♿ Accessibility"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/hslToRgb/
---

# hslToRgb
{: .no_toc }

Client
{: .label .label-blue }

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
