---
layout: default
title: "AmountSelect"
parent: Shops Functions
grand_parent: Client
great_grand_parent: 🛒 Shops
nav_order: 1
---

# AmountSelect
{: .no_toc }

Opens a quantity selection interface for purchasing items.

## Syntax

```lua
Bridge.Shops.AmountSelect(shopName, item, itemLabel, price)
```

## Parameters

**shopName:** `string`  
Name of the shop processing the purchase.

**item:** `string`  
Internal item name.

**itemLabel:** `string`  
Display name for the item.

**price:** `number`  
Unit price of the item.

## Returns

**Type:** `nil`  
Opens quantity selection input dialog.

## Features

- Dropdown selection from 1 to 100 items
- Automatic progression to payment selection
- Input validation for quantity selection

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Called automatically when player selects an item from shop
Bridge.Shops.AmountSelect("Downtown Market", "bread", "Fresh Bread", 15)
```

---