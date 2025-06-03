---
layout: default
title: "RegisterShop"
parent: Functions
grand_parent: Server
great_grand_parent: 🎒 Inventory
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/RegisterShop/
---

# RegisterShop
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Registers a shop with the inventory system. If the shop already exists, returns true without creating a duplicate.

## Syntax

```lua
Inventory.RegisterShop(shopTitle, shopInventory, shopCoords, shopGroups)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `shopTitle` | string | The unique shop identifier/name |
| `shopInventory` | table | The items available in the shop |
| `shopCoords` | table | The coordinates where the shop is located (optional) |
| `shopGroups` | table | Groups/jobs that can access the shop (optional) |

## Returns

| Type | Description |
|------|-------------|
| boolean | True if successful, false otherwise |

## Example

```lua
-- Register a general store
local shopItems = {
    {name = "water", price = 5, currency = "money"},
    {name = "sandwich", price = 10, currency = "money"}
}
local success = Inventory.RegisterShop("general_store", shopItems)

-- Register a job-specific shop
local policeShop = {
    {name = "handcuffs", price = 50, currency = "money"},
    {name = "radio", price = 100, currency = "money"}
}
Inventory.RegisterShop("police_shop", policeShop, nil, {"police"})
```

---

## Notes

- With ox_inventory: Creates a persistent shop that players can access
- With default inventory: Returns false and an error message as this feature is not bridged
- Shop titles should be unique across the server
- If a shop already exists with the same title, returns true without creating a duplicate

---