---
layout: default
title: "hexToRgb"
parent: Functions
grand_parent: Client
great_grand_parent: "♿ Accessibility"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/hexToRgb/
---

# hexToRgb
{: .no_toc }

Client
{: .label .label-blue }

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
