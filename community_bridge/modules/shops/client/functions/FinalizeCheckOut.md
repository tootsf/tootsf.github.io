---
layout: default
title: "FinalizeCheckOut"
parent: Functions
grand_parent: Client
great_grand_parent: 🛒 Shops
nav_order: 1
permalink: /community_bridge/modules/shops/client/functions/FinalizeCheckOut/
---

# FinalizeCheckOut
{: .no_toc }

Presents payment method options and processes the final transaction.

## Syntax

```lua
Bridge.Shops.FinalizeCheckOut(shopName, item, itemLabel, price, amount)
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

**amount:** `string`  
Quantity being purchased.

## Returns

**Type:** `nil`  
Opens payment method selection menu.

## Payment Options

- **Cash Payment**: Deducts from player's cash balance
- **Card Payment**: Deducts from player's bank balance

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Called automatically after quantity selection
Bridge.Shops.FinalizeCheckOut("Downtown Market", "bread", "Fresh Bread", 15, "3")

-- Creates menu with options:
-- "Pay by Cash $45" - Uses cash/money account
-- "Pay by Card $45" - Uses bank account
```

---