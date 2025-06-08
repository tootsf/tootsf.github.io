---
layout: default
title: "getAdjustedColour"
parent: Accessibility Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
nav_order: 2
---

# getAdjustedColour
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