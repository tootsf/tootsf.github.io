---
layout: default
title: "rgbToHex"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
nav_order: 1
---

# rgbToHex
{: .no_toc }

Converts RGB values to hex color code.

## Syntax

```lua
Bridge.Accessibility.rgbToHex(r, g, b)
```

## Parameters

**r:** `number`  
Red color component (0-255)

**g:** `number`  
Green color component (0-255)

**b:** `number`  
Blue color component (0-255)

## Returns

**string**  
Hex color code

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local hex = Bridge.Accessibility.rgbToHex(255, 0, 0)
```

---