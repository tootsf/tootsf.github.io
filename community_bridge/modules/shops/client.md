---
layout: default
title: Client
parent: Shops
grand_parent: Modules
nav_order: 2
---

# Client Functions
{: .no_toc }

Client-side functions for shop interface and user interaction.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Shops.OpenShop

Displays the shop interface to the player with interactive item browsing.

### Syntax

```lua
Shops.OpenShop(title, shopData)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `title` | `string` | Display title for the shop menu |
| `shopData` | `table` | Shop inventory data received from server |

### Returns

| Type | Description |
|------|-------------|
| `nil` | Opens menu interface for player interaction |

### Example

```lua
-- This function is typically called automatically via server event
-- Manual usage example:
local shopInventory = {
    {name = "bread", price = 15},
    {name = "water_bottle", price = 10}
}

Shops.OpenShop("Downtown Market", shopInventory)
```

### Menu Features

- Displays item names using inventory system labels
- Shows item prices with currency formatting
- Interactive selection for quantity and payment
- Automatic menu generation from shop data

---

## Shops.AmountSelect

Opens a quantity selection interface for purchasing items.

### Syntax

```lua
Shops.AmountSelect(shopName, item, itemLabel, price)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `shopName` | `string` | Name of the shop processing the purchase |
| `item` | `string` | Internal item name |
| `itemLabel` | `string` | Display name for the item |
| `price` | `number` | Unit price of the item |

### Returns

| Type | Description |
|------|-------------|
| `nil` | Opens quantity selection input dialog |

### Features

- Dropdown selection from 1 to 100 items
- Automatic progression to payment selection
- Input validation for quantity selection

### Example

```lua
-- Called automatically when player selects an item from shop
Shops.AmountSelect("Downtown Market", "bread", "Fresh Bread", 15)
```

---

## Shops.FinalizeCheckOut

Presents payment method options and processes the final transaction.

### Syntax

```lua
Shops.FinalizeCheckOut(shopName, item, itemLabel, price, amount)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `shopName` | `string` | Name of the shop processing the purchase |
| `item` | `string` | Internal item name |
| `itemLabel` | `string` | Display name for the item |
| `price` | `number` | Unit price of the item |
| `amount` | `string` | Quantity being purchased |

### Returns

| Type | Description |
|------|-------------|
| `nil` | Opens payment method selection menu |

### Payment Options

- **Cash Payment**: Deducts from player's cash balance
- **Card Payment**: Deducts from player's bank balance

### Example

```lua
-- Called automatically after quantity selection
Shops.FinalizeCheckOut("Downtown Market", "bread", "Fresh Bread", 15, "3")

-- Creates menu with options:
-- "Pay by Cash $45" - Uses cash/money account
-- "Pay by Card $45" - Uses bank account
```

### Menu Display

The function calculates total cost and presents:
- Total price calculation (unit price × quantity)
- Payment confirmation with item description
- Visual icons for cash and card options
- Secure server-side transaction processing

## Event Handlers

The module automatically registers the following client event:

### community_bridge:openShop

Receives shop data from server and opens the shop interface.

```lua
RegisterNetEvent('community_bridge:openShop', function(_type, _title, shopData)
    -- Validates event source and parameters
    -- Calls Shops.OpenShop with received data
end)
```

## User Interface Flow

1. **Shop Opening**: Server triggers shop display with inventory data
2. **Item Selection**: Player browses and selects desired items
3. **Quantity Selection**: Input dialog for purchase amount (1-100)
4. **Payment Method**: Choice between cash or card payment
5. **Transaction Processing**: Server-side validation and completion
6. **Confirmation**: Success/failure notification to player

## Dependencies

The client functions require:
- `Menu` module for interface display
- `Input` module for quantity selection
- `Inventory` module for item information
- `Ids` module for unique menu identifiers
- `Language` module for localized text
