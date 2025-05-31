---
layout: default
title: "rgbToHex"
parent: Functions
grand_parent: Client
great_grand_parent: "♿ Accessibility"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/rgbToHex/
---

# rgbToHex
{: .no_toc }

Client
{: .label .label-blue }

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
