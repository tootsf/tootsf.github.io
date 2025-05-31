---
layout: default
title: "rgbToHsl"
parent: Functions
grand_parent: Client
great_grand_parent: "♿ Accessibility"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/rgbToHsl/
---

# rgbToHsl
{: .no_toc }

Client
{: .label .label-blue }

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
