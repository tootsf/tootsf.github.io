---
layout: default
title: "adjustColourForColourblindness"
parent: Functions
grand_parent: Client
great_grand_parent: "♿ Accessibility"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/adjustColourForColourblindness/
---

# adjustColourForColourblindness
{: .no_toc }

Client
{: .label .label-blue }

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
