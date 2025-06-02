---
layout: default
title: "rgbToHsl"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/rgbToHsl/
---

# rgbToHsl
{: .no_toc }

Converts RGB values to HSL color space.

## Syntax

```lua
Bridge.Accessibility.rgbToHsl(r, g, b)
```

## Parameters

**r:** `number`  
Red color component (0-255)

**g:** `number`  
Green color component (0-255)

**b:** `number`  
Blue color component (0-255)

## Returns

**table**  
HSL color values

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local hsl = Bridge.Accessibility.rgbToHsl(255, 0, 0)
```

---