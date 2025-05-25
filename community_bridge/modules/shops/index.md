---
layout: default
title: Shops
parent: Modules
nav_order: 17
has_children: true
---

# Shops Module
{: .no_toc }

The Shops module provides a comprehensive system for creating and managing in-game shops with item purchasing functionality. It handles shop registration, inventory management, and secure transaction processing with both cash and card payment options.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Overview

The Shops module offers:

- **Shop Creation**: Register shops with custom inventories and locations
- **Secure Transactions**: Server-side validation of all purchases
- **Payment Options**: Support for both cash and card payments
- **Interactive Menus**: User-friendly shop browsing interface
- **Anti-Cheat Protection**: Validation of items and prices server-side

## Available Functions

### Server Functions
- `Shops.CreateShop()` - Register a new shop with inventory and location
- `Shops.OpenShop()` - Open a shop for a specific player
- `Shops.CompleteCheckout()` - Process and validate shop transactions

### Client Functions
- `Shops.OpenShop()` - Display shop interface to player
- `Shops.AmountSelect()` - Handle quantity selection for purchases
- `Shops.FinalizeCheckOut()` - Present payment method options

## Module Structure

```
shops/
├── _default/
│   ├── client.lua    # Client-side shop interface and menus
│   └── server.lua    # Server-side shop registration and transactions
```

## Usage Example

```lua
-- Server: Create a shop
Shops.CreateShop("General Store", {
    {name = "bread", price = 5},
    {name = "water", price = 3}
}, {x = 100.0, y = 200.0, z = 30.0}, {"citizen"})

-- Server: Open shop for player
Shops.OpenShop(playerId, "General Store")
```

## Security Features

- All shop transactions are validated server-side
- Item existence and pricing verification
- Account balance checks before processing
- Anti-cheat protection against invalid purchases
