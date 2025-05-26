---
layout: default
title: "📦 Inventory"
parent: Modules
grand_parent: Community Bridge
nav_order: 11
has_children: true
permalink: /community_bridge/modules/inventory/
---

# Inventory Module
{: .no_toc }

The Inventory module provides a unified API for interacting with player inventories across different inventory systems (ox_inventory, qb-inventory, qs-inventory, etc.).

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

This module abstracts inventory operations to work seamlessly across different inventory systems, allowing you to write code that works regardless of which inventory resource your server uses.

---

## 📚 Supported Inventory Systems

- **ox_inventory** - Full support for all ox_inventory features
- **qb-inventory** - Complete QBCore inventory integration
- **qs-inventory** - Quasar Store inventory system support
- **lj-inventory** - LJ inventory compatibility
- **Custom Systems** - Extensible for custom inventory implementations

---

## 📚 Key Features

- **Item Management** - Add, remove, and modify items with metadata support
- **Inventory Queries** - Get item counts, inventory contents, and item information
- **Stash Integration** - Unified stash and storage access
- **Metadata Support** - Handle complex item data and custom properties
- **Real-time Updates** - Automatic inventory synchronization

---

## 📚 Quick Start

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Server-side example
local playerId = source
local itemName = "water"
local itemCount = 5

-- Add item to player inventory
if Bridge.Inventory.AddItem(playerId, itemName, itemCount) then
    TriggerClientEvent('notify', playerId, "Added " .. itemCount .. " " .. itemName)
else
    TriggerClientEvent('notify', playerId, "Inventory full!", "error")
end

-- Check if player has enough items
local currentCount = Bridge.Inventory.GetItemCount(playerId, itemName)
if currentCount >= 3 then
    Bridge.Inventory.RemoveItem(playerId, itemName, 3)
    -- Process action
end
```

## Module Structure

This module is organized into two main categories:

- **[Server Functions](server/)** - Server-side inventory management and operations
- **[Client Functions](client/)** - Client-side inventory integration and UI

---

## Configuration

The Inventory module automatically detects your server's inventory system and configures itself accordingly. 

### Custom Item Registration

Register custom items that work across all inventory systems:

```lua
-- In your resource startup
Bridge.Inventory.RegisterItem("custom_item", {
    label = "Custom Item",
    weight = 100,
    stack = true,
    close = true,
    description = "A custom item for my resource"
})
```

### Metadata Handling

Work with complex item metadata:

```lua
local metadata = {
    durability = 100,
    serial = "ABC123",
    customData = {
        owner = "PlayerName",
        created = os.time()
    }
}

Bridge.Inventory.AddItem(playerId, "weapon_pistol", 1, nil, metadata)
```
