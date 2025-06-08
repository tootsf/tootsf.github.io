---
layout: default
title: "GetImagePath"
parent: Functions
grand_parent: Server
great_grand_parent: 🎒 Inventory
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/GetImagePath/
nav_exclude: true
---

# GetImagePath
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Gets the image path for an item. This is an alternate option to GetItemInfo for getting item images. If an image isn't found, reverts to the community_bridge logo (useful for menus).

## Syntax

```lua
Inventory.GetImagePath(item)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | string | The item name |

## Returns

| Type | Description |
|------|-------------|
| string | The image path/URL for the item |

## Example

```lua
-- Get image path for a weapon
local imagePath = Inventory.GetImagePath("weapon_pistol")
print("Image URL:", imagePath)

-- Use in a menu system
local menuItems = {
    {
        label = "Pistol",
        image = Inventory.GetImagePath("weapon_pistol")
    }
}
```

---

## Notes

- With ox_inventory: Attempts to find the image in ox_inventory's web/images folder
- With default inventory: Returns the community_bridge placeholder logo
- Automatically strips .png extensions from item names
- Falls back to community_bridge logo if no image is found

---