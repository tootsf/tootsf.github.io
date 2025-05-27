---
layout: default
title: CanCarryItem
parent: Server Functions
grand_parent: "📦 Inventory"
nav_order: 10
permalink: /community_bridge/modules/inventory/server/CanCarryItem/
---

# CanCarryItem
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Checks if there is available space in the inventory for the specified item and count.

## Syntax

```lua
Inventory.CanCarryItem(src, item, count)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | number | The source (player server id) |
| `item` | string | The item name to check |
| `count` | number | The quantity to check |

## Returns

| Type | Description |
|------|-------------|
| boolean | True if the player can carry the item, false otherwise |

## Example

```lua
-- Check if player can carry 5 water bottles
local canCarry = Inventory.CanCarryItem(1, "water", 5)
if canCarry then
    Inventory.AddItem(1, "water", 5)
    -- Notify player they received water
else
    -- Notify player their inventory is full
end
```

---

## Notes

- With ox_inventory: Uses the native CanCarryItem function
- With default inventory: Returns false and an error message as this feature is not bridged
- Consider both weight and slot availability when checking capacity
