---
layout: default
title: "hexToRgb"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
nav_order: 1
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