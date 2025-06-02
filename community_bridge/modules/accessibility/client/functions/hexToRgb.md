---
layout: default
title: "hexToRgb"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/hexToRgb/
---

# hexToRgb
{: .no_toc }

Converts hex color to RGB values.

## Syntax

```lua
Bridge.Accessibility.hexToRgb(hex)
```

## Parameters

**hex:** `string`  
Hex color code (e.g., "#FF0000")

## Returns

**table**  
RGB color values

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local rgb = Bridge.Accessibility.hexToRgb("#FF0000")
```

---