---
layout: default
title: "getAdjustedColour"
parent: Functions
grand_parent: Client
great_grand_parent: "♿ Accessibility"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/getAdjustedColour/
---

# getAdjustedColour
{: .no_toc }

Client
{: .label .label-blue }

Get color adjusted for user's colorblindness setting.

**Parameters:**
- `colorName` (string): Name of the color
- `returnAsRGB` (boolean): Return as RGB table if true, else hex

**Returns:**
- `string` or `table`: Adjusted color

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local adjusted = Bridge.Accessibility.getAdjustedColour("red", false)
-- adjusted = "#..."
```

---
