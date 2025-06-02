---
layout: default
title: "getAdjustedColour"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/getAdjustedColour/
---

# getAdjustedColour
{: .no_toc }

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