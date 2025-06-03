---
layout: default
title: "OpenShop"
parent: Functions
grand_parent: Client
great_grand_parent: 🛒 Shops
nav_order: 1
permalink: /community_bridge/modules/shops/client/functions/OpenShop/
---

# OpenShop
{: .no_toc }

Displays the shop interface to the player with interactive item browsing.

## Syntax

```lua
Bridge.Shops.OpenShop(title, shopData)
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