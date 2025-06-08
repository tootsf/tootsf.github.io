---
layout: default
title: "hue2rgb"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/hue2rgb/
nav_exclude: true
---

# hue2rgb
{: .no_toc }

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