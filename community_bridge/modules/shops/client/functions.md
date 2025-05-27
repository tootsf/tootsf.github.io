---
layout: default
title: Functions
parent: Client
grand_parent: "🛒 Shops"
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

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Opens a quantity selection interface for purchasing items.


```lua
function Shops.AmountSelect(shopName, item, itemLabel, price)
```


**shopName:** `string`  
Name of the shop processing the purchase.

**item:** `string`  
Internal item name.

**itemLabel:** `string`  
Display name for the item.

**price:** `number`  
Unit price of the item.


**Type:** `nil`  
Opens quantity selection input dialog.


- Dropdown selection from 1 to 100 items
- Automatic progression to payment selection
- Input validation for quantity selection


```lua
local Bridge = exports['community_bridge']:Bridge()

-- Called automatically when player selects an item from shop
Bridge.Shops.AmountSelect("Downtown Market", "bread", "Fresh Bread", 15)
```

---

## 🔹 FinalizeCheckOut

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Presents payment method options and processes the final transaction.


```lua
function Shops.FinalizeCheckOut(shopName, item, itemLabel, price, amount)
```


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


**Type:** `nil`  
Opens payment method selection menu.


- **Cash Payment**: Deducts from player's cash balance
- **Card Payment**: Deducts from player's bank balance


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

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays the shop interface to the player with interactive item browsing.


```lua
function Shops.OpenShop(title, shopData)
```


**title:** `string`  
Display title for the shop menu.

**shopData:** `table`  
Shop inventory data received from server.


**Type:** `nil`  
Opens menu interface for player interaction.


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


- Displays item names using inventory system labels
- Shows item prices with currency formatting
- Interactive selection for quantity and payment
- Automatic menu generation from shop data