---
layout: default
title: "StripPNG"
parent: Functions
grand_parent: Server
great_grand_parent: 🎒 Inventory
nav_order: 1
---

# StripPNG
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Removes the ".png" extension from an item name string if present. This is a utility function used internally by other inventory functions.

## Syntax

```lua
Inventory.StripPNG(item)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | string | The item name that may contain .png extension |

## Returns

| Type | Description |
|------|-------------|
| string | The item name without .png extension |

## Example

```lua
-- Strip .png from item name
local itemName = Inventory.StripPNG("weapon_pistol.png")
print(itemName) -- Output: "weapon_pistol"

-- Works with items that don't have .png extension
local cleanName = Inventory.StripPNG("water")
print(cleanName) -- Output: "water"
```

---

## Notes

- This function is used internally by GetImagePath and other functions
- Safe to use on strings that don't contain .png extension
- Only removes the .png extension, not other file extensions
- Case sensitive - looks specifically for ".png"

---