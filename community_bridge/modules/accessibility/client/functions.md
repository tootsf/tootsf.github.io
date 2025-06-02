---
layout: default
title: Functions
parent: Client
grand_parent: "♿ Accessibility"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/
---

# Accessibility Client Functions
{: .no_toc }

Client-side functions for accessibility and color adjustments.

---

## 🔹 IsMale

Check if current player is male model.

**Returns:**
- `boolean`: True if male, false if female

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Accessibility.IsMale() then
    print("Player is male")
end
```

---

## 🔹 adjustColourForColourblindness

# adjustColourForColourblindness
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Adjusts colors based on colorblindness type.

## Syntax

```lua
Bridge.Accessibility.adjustColourForColourblindness(r, g, b, type)
```

## Parameters

**r:** `number`  
Red color component (0-255)

**g:** `number`  
Green color component (0-255)

**b:** `number`  
Blue color component (0-255)

**type:** `string`  
Colorblindness type ('protanopia', 'deuteranopia', 'tritanopia')

## Returns

**table**  
Adjusted RGB color values

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local adjustedColor = Bridge.Accessibility.adjustColourForColourblindness(255, 100, 50, 'protanopia')
```

---

## 🔹 getAdjustedColour

# getAdjustedColour
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets color adjusted for current accessibility settings.

## Syntax

```lua
Bridge.Accessibility.getAdjustedColour(r, g, b)
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
Adjusted RGB color values

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local color = Bridge.Accessibility.getAdjustedColour(255, 0, 0)
```

---

## 🔹 hexToRgb

# hexToRgb
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

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

## 🔹 hslToRgb

# hslToRgb
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Converts HSL color to RGB values.

## Syntax

```lua
Bridge.Accessibility.hslToRgb(h, s, l)
```

## Parameters

**h:** `number`  
Hue (0-360)

**s:** `number`  
Saturation (0-1)

**l:** `number`  
Lightness (0-1)

## Returns

**table**  
RGB color values

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local rgb = Bridge.Accessibility.hslToRgb(120, 1, 0.5)
```

---

## 🔹 hue2rgb

# hue2rgb
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Helper function for HSL to RGB conversion.

## Syntax

```lua
Bridge.Accessibility.hue2rgb(p, q, t)
```

## Parameters

**p:** `number`  
First parameter for conversion

**q:** `number`  
Second parameter for conversion  

**t:** `number`  
Third parameter for conversion

## Returns

**number**  
RGB component value

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local component = Bridge.Accessibility.hue2rgb(p, q, t)
```

---

## 🔹 rgbToHex

# rgbToHex
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

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

## 🔹 rgbToHsl

# rgbToHsl
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

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

## 🔹 updatecolourblindness

Opens color blindness settings menu.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Accessibility.updatecolourblindness()
```