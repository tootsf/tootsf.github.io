---
layout: default
title: "SetMetadata"
parent: Functions
grand_parent: Server
great_grand_parent: "🎒 Inventory"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/SetMetadata/
---

# SetMetadata
{: .no_toc }

Server
{: .label .label-blue }

# SetMetadata
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Sets the metadata of an item in the inventory at a specific slot. This function is only available when using ox_inventory.

## Syntax

```lua
Inventory.SetMetadata(src, item, slot, metadata)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | number | The source (player server id) |
| `item` | string | The item name |
| `slot` | number | The inventory slot number |
| `metadata` | table | The metadata to set for the item |

## Returns

| Type | Description |
|------|-------------|
| nil | This function does not return a value |

## Example

```lua
-- Set metadata for an item in slot 5
local metadata = {
    durability = 85,
    serial = "ABC123",
    description = "Custom weapon"
}
Inventory.SetMetadata(1, "weapon_pistol", 5, metadata)
```

---

## Notes

- This function is only available when using ox_inventory
- The slot must contain the specified item for the operation to work
- Metadata can include custom properties like durability, serial numbers, etc.

---
