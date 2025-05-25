---
layout: default
title: Server
parent: Shops
grand_parent: Modules
nav_order: 1
---

# Server Functions
{: .no_toc }

Server-side functions for shop management and transaction processing.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Shops.CreateShop

Creates and registers a new shop with specified inventory, location, and access groups.

### Syntax

```lua
Shops.CreateShop(shopTitle, shopInventory, shopCoords, shopGroups)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `shopTitle` | `string` | Unique identifier and display name for the shop |
| `shopInventory` | `table` | Array of items with name and price properties |
| `shopCoords` | `table` | Shop location coordinates (x, y, z) |
| `shopGroups` | `table` | Array of groups allowed to access the shop |

### Returns

| Type | Description |
|------|-------------|
| `boolean` | `true` if shop created successfully, `false` otherwise |

### Example

```lua
local shopInventory = {
    {name = "bread", price = 15},
    {name = "water_bottle", price = 10},
    {name = "sandwich", price = 25}
}

local shopCoords = {x = 373.875, y = 325.896, z = 103.566}
local allowedGroups = {"citizen", "police"}

local success = Shops.CreateShop("Downtown Market", shopInventory, shopCoords, allowedGroups)
if success then
    print("Shop created successfully!")
end
```

---

## Shops.OpenShop

Opens a registered shop for a specific player, displaying the shop interface.

### Syntax

```lua
Shops.OpenShop(src, shopTitle)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | `number` | Server ID of the player |
| `shopTitle` | `string` | Name of the registered shop to open |

### Returns

| Type | Description |
|------|-------------|
| `boolean` | `true` if shop opened successfully, `false` if shop not found |

### Example

```lua
-- Open shop for player when they interact with shop NPC
RegisterNetEvent('openGeneralStore', function()
    local src = source
    local opened = Shops.OpenShop(src, "Downtown Market")
    
    if not opened then
        -- Notify player that shop is unavailable
        Notify.SendNotify(src, "Shop is currently unavailable", "error", 3000)
    end
end)
```

---

## Shops.CompleteCheckout

Processes a shop transaction with full validation and anti-cheat protection.

### Syntax

```lua
Shops.CompleteCheckout(src, shopName, item, amount, paymentType)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | `number` | Server ID of the player making the purchase |
| `shopName` | `string` | Name of the shop processing the transaction |
| `item` | `string` | Item name being purchased |
| `amount` | `number` | Quantity of items to purchase |
| `paymentType` | `string` | Payment method: `"money"` (cash) or `"bank"` (card) |

### Returns

| Type | Description |
|------|-------------|
| `nil` | Function handles success/failure through notifications |

### Validation Features

- Verifies shop exists and item is in shop inventory
- Checks player has sufficient funds
- Validates item pricing against registered shop data
- Logs potential cheating attempts

### Example

```lua
-- This function is typically called automatically through the client interface
-- Manual usage example:
Shops.CompleteCheckout(playerId, "Downtown Market", "bread", 2, "bank")

-- The function will:
-- 1. Verify the shop exists
-- 2. Check if "bread" is in the shop's inventory
-- 3. Calculate total cost (bread price * 2)
-- 4. Verify player has enough bank funds
-- 5. Remove money and add items to inventory
-- 6. Send success/failure notification
```

## Event Handlers

The module automatically registers the following server event:

### community_bridge:completeCheckout

Internal event triggered by client-side checkout process.

```lua
RegisterNetEvent("community_bridge:completeCheckout", function(shopName, item, amount, paymentType)
    -- Validates payment type and calls Shops.CompleteCheckout
end)
```

## Security Notes

- All transactions are validated server-side to prevent exploitation
- Invalid purchase attempts are logged with player information
- Shop inventory and pricing cannot be modified client-side
- Payment validation ensures players have sufficient funds before processing
