---
title: Inventory Module
sidebar_position: 2
---

# Inventory Module

The Inventory module in `community_bridge` provides a unified API for interacting with player inventories across different inventory systems (e.g., ox_inventory, qb-inventory, qs-inventory, etc.).

## Server Functions

### AddItem
```lua
Inventory.AddItem(src, item, count, slot, metadata)
```
Adds an item to a player's inventory.
- `src` (number): Player source
- `item` (string): Item name
- `count` (number): Amount to add
- `slot` (number): Inventory slot (optional)
- `metadata` (table): Item metadata (optional)
- **Returns:** `boolean` (success)

### RemoveItem
```lua
Inventory.RemoveItem(src, item, count, slot, metadata)
```
Removes an item from a player's inventory.
- Same parameters as AddItem
- **Returns:** `boolean` (success)

### GetItemInfo
```lua
Inventory.GetItemInfo(item)
```
Returns a table with item info:
- `name`, `label`, `stack`, `weight`, `description`, `image`

### GetItemCount
```lua
Inventory.GetItemCount(src, item, metadata)
```
Returns the count of a specific item in a player's inventory.
- `src` (number): Player source
- `item` (string): Item name
- `metadata` (table): Metadata (optional)
- **Returns:** `number`

### GetPlayerInventory
```lua
Inventory.GetPlayerInventory(src)
```
Returns a table of all items in a player's inventory.

### GetItemBySlot
```lua
Inventory.GetItemBySlot(src, slot)
```
Returns the item data for a specific slot.

### SetMetadata
```lua
Inventory.SetMetadata(src, item, slot, metadata)
```
Sets the metadata for an item in a player's inventory.

### OpenStash
```lua
Inventory.OpenStash(src, id)
```
Opens a stash for the player.
- `id` (string/number): Stash identifier

## Client Functions

Most inventory actions are handled server-side. Some modules may provide client events for UI updates or inventory refreshes.

## Shared Functions

Shared utility functions may be available depending on the inventory system. See the specific inventory module for details.
