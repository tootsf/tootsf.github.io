---
layout: default
title: "GetItemBySlot"
parent: Functions
grand_parent: Server
great_grand_parent: "🎒 Inventory"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/GetItemBySlot/
---

# GetItemBySlot
{: .no_toc }

Server
{: .label .label-blue }

# GetItemBySlot
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Returns the specified slot data as a table. This function is only available when using ox_inventory.

## Syntax

```lua
Inventory.GetItemBySlot(src, slot)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | number | The source (player server id) |
| `slot` | number | The inventory slot number |

## Returns

| Type | Description |
|------|-------------|
| table | Slot data in format {weight, name, metadata, slot, label, count} |

## Example

```lua
-- Get item data from slot 1 for player with source 1
local slotData = Inventory.GetItemBySlot(1, 1)
if slotData then
    print("Item in slot 1:", slotData.name, "Count:", slotData.count)
end
```

---

## Notes

- This function is only available when using ox_inventory
- Returns nil if the slot is empty or invalid
- Slot numbers typically start from 1

---
