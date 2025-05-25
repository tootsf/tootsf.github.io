---
title: Shops Module
sidebar_position: 12
---

# Shops Module

The Shops module in `community_bridge` provides a unified API for managing shops and purchases across different shop systems.

## Server Functions

### OpenShop
```lua
Shops.OpenShop(src, shopId)
```
Opens a shop for a player.
- `src` (number): Player source
- `shopId` (string): Shop identifier

### BuyItem
```lua
Shops.BuyItem(src, shopId, item, count)
```
Handles a purchase for a player.
- `item` (string): Item name
- `count` (number): Quantity

## Client Functions

Some shop modules may provide client events for opening shops or confirming purchases.

## Shared Functions

Shared utility functions may be available depending on the shop system. See the specific shop module for details.
