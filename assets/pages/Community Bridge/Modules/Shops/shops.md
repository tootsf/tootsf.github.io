# Shops 🛍️

<!--META
nav: true
toc: true
description: The Shops module provides a fallback shop system when inventory modules don't support native shop functionality. It creates a simple, universal shop interface that works across all frameworks.
-->

The Shops module provides a fallback shop system when inventory modules don't support native shop functionality. It creates a simple, universal shop interface that works across all frameworks.

## Overview

The Shops provides functionality for FiveM resources.

## Client Functions

### FinalizeCheckOut

<!--TOC: FinalizeCheckOut-->

**Context:** 🖥️ Client

Internal function to finalize shop purchases with payment options.

**Syntax:** `Bridge.Shops.FinalizeCheckOut(shopName, item, itemLabel, price, amount)`

**Parameters:**
- `shopName` (string) - Name of the shop
- `item` (string) - Item name being purchased
- `itemLabel` (string) - Display label for the item
- `price` (number) - Price per item
- `amount` (number) - Quantity being purchased

**Returns:**
- (nil) - No return value

**Example:**
```lua
-- Internal use only - handles payment selection UI
```

### OpenShop

<!--TOC: OpenShop-->

**Context:** 🖥️ Client

Opens a registered shop interface for the player.

**Syntax:** `Bridge.Shops.OpenShop(shopTitle, inventory)`

**Parameters:**
- `shopTitle` (string) - The title/name of the shop to display
- `inventory` (table) - Table of items available in the shop

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- This is typically called internally when inventory doesn't support shops
local shopItems = {
    {name = "water", label = "Water Bottle", price = 10},
    {name = "bread", label = "Bread", price = 5}
}
Bridge.Shops.OpenShop("General Store", shopItems)
```

### AmountSelect

<!--TOC: AmountSelect-->

**Context:** 🖥️ Client

This is an internal event that is used to open the amount select menu

**Syntax:** `Bridge.Shops.AmountSelect(shopName, item, itemLabel, price)`

**Parameters:**
- `shopName` (string)
- `item` (string)
- `itemLabel` (string)
- `price` (number)

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Shops.AmountSelect()
```

## Server Functions

### CompleteCheckout

<!--TOC: CompleteCheckout-->

**Context:** 🖲️ Server

Internal function to process shop purchases and handle payments.

**Syntax:** `Bridge.Shops.CompleteCheckout(src, shopName, item, amount, paymentType)`

**Parameters:**
- `src` (number) - Player server ID
- `shopName` (string) - Name of the shop
- `item` (string) - Item being purchased
- `amount` (number) - Quantity being purchased
- `paymentType` (string) - Payment method (money, bank)

**Returns:**
- (nil) - No return value

**Example:**
```lua
-- Internal use only - processes payments and gives items
```

### CreateShop

<!--TOC: CreateShop-->

**Context:** 🖲️ Server

Creates a new shop that can be opened by players. Used as fallback when inventory systems don't support shops.

**Syntax:** `Bridge.Shops.CreateShop(shopTitle, shopInventory, shopCoords, shopGroups)`

**Parameters:**
- `shopTitle` (string) - Unique name/title for the shop
- `shopInventory` (table) - Table of items with prices and labels
- `shopCoords` (table) - Coordinates where the shop is located
- `shopGroups` (table) - Job groups that can access this shop

**Returns:**
- (boolean) - True if shop was created successfully

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a general store
local inventory = {
    {name = "water", label = "Water Bottle", price = 10},
    {name = "sandwich", label = "Sandwich", price = 25},
    {name = "energy_drink", label = "Energy Drink", price = 15}
}

local coords = vector3(25.7, -1347.3, 29.49)
Bridge.Shops.CreateShop("247_store_1", inventory, coords)
```

### OpenShop

<!--TOC: OpenShop-->

**Context:** 🖲️ Server

Opens a created shop for a specific player.

**Syntax:** `Bridge.Shops.OpenShop(src, shopTitle)`

**Parameters:**
- `src` (number) - Player server ID
- `shopTitle` (string) - Name of the shop to open

**Returns:**
- (boolean) - True if shop was opened successfully

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Open shop for player
local success = Bridge.Shops.OpenShop(source, "247_store_1")
if success then
    print("Shop opened for player " .. source)
else
    print("Failed to open shop")
end
```

