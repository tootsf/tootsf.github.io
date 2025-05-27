---
layout: default
title: Functions
parent: Client
grand_parent: "🛒 Shops"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/shops/client/functions/
---

# Shops Client Functions
{: .no_toc }

Client-side functions for shop and store management.

# Shops Client Functions
{: .no_toc }

Client-side functions for shop and store management.

---

## 🔹 AmountSelect

# AmountSelect
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Opens a quantity selection interface for purchasing items.

## Syntax

```lua
function Shops.AmountSelect(shopName, item, itemLabel, price)
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

## 🔹 FinalizeCheckOut

# FinalizeCheckOut
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Presents payment method options and processes the final transaction.

## Syntax

```lua
function Shops.FinalizeCheckOut(shopName, item, itemLabel, price, amount)
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

## 🔹 OpenShop

# OpenShop
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays the shop interface to the player with interactive item browsing.

## Syntax

```lua
function Shops.OpenShop(title, shopData)
```

## Parameters

**title:** `string`  
Display title for the shop menu.

**shopData:** `table`  
Shop inventory data received from server.

## Returns

**Type:** `nil`  
Opens menu interface for player interaction.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- This function is typically called automatically via server event
-- Manual usage example:
local shopInventory = {
    {name = "bread", price = 15},
    {name = "water_bottle", price = 10}
}

Bridge.Shops.OpenShop("Downtown Market", shopInventory)
```

## Menu Features

- Displays item names using inventory system labels
- Shows item prices with currency formatting
- Interactive selection for quantity and payment
- Automatic menu generation from shop data