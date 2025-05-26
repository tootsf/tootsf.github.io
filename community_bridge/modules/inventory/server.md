---
layout: default
title: Server Functions
parent: Inventory
grand_parent: Modules
nav_order: 1
---

# Inventory Server Functions
{: .no_toc }

Server-side functions for inventory management, item operations, and storage systems.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Item Management

---

## 🔹 AddItem
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.AddItem(src, item, count, slot, metadata)
```

Adds an item to a player's inventory.

**Parameters:**
- `src` (number) - Player server ID
- `item` (string) - Item name
- `count` (number) - Amount to add
- `slot` (number, optional) - Specific inventory slot
- `metadata` (table, optional) - Item metadata

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
local success = Bridge.Inventory.AddItem(playerId, "water", 5)
if success then
    TriggerClientEvent('notify', playerId, "Added 5 water bottles")
else
    TriggerClientEvent('notify', playerId, "Inventory full!", "error")
end
```

---

## 🔹 RemoveItem
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.RemoveItem(src, item, count, slot, metadata)
```

Removes an item from a player's inventory.

**Parameters:**
- `src` (number) - Player server ID
- `item` (string) - Item name
- `count` (number) - Amount to remove
- `slot` (number, optional) - Specific inventory slot
- `metadata` (table, optional) - Item metadata for matching

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
if Bridge.Inventory.RemoveItem(playerId, "burger", 1) then
    -- Player consumed burger, restore health
    TriggerClientEvent('hospital:heal', playerId, 25)
else
    TriggerClientEvent('notify', playerId, "You don't have a burger!", "error")
end
```

---

## 🔹 GetItemInfo
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.GetItemInfo(item)
```

Returns detailed information about an item.

**Parameters:**
- `item` (string) - Item name

**Returns:** 
- `table` - Item data containing name, label, stack, weight, description, image

**Example:**
```lua
local itemInfo = Bridge.Inventory.GetItemInfo("water")
if itemInfo then
    print("Item: " .. itemInfo.label .. " - Weight: " .. itemInfo.weight)
    local imageUrl = itemInfo.image or "nui://ox_inventory/web/images/default.png"
end
```

---

## 🔹 GetItemCount
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.GetItemCount(src, item, metadata)
```

Returns the count of a specific item in a player's inventory.

**Parameters:**
- `src` (number) - Player server ID
- `item` (string) - Item name
- `metadata` (table, optional) - Metadata for matching specific items

**Returns:** 
- `number` - Item count

**Example:**
```lua
local playerId = source
local waterCount = Bridge.Inventory.GetItemCount(playerId, "water")
if waterCount >= 3 then
    -- Player has enough water for recipe
    Bridge.Inventory.RemoveItem(playerId, "water", 3)
    Bridge.Inventory.AddItem(playerId, "soup", 1)
end
```

---

## Inventory Operations

---

## 🔹 GetPlayerInventory
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.GetPlayerInventory(src)
```

Returns all items in a player's inventory.

**Parameters:**
- `src` (number) - Player server ID

**Returns:** 
- `table` - Array of inventory items

**Example:**
```lua
local playerId = source
local inventory = Bridge.Inventory.GetPlayerInventory(playerId)
for slot, item in pairs(inventory) do
    if item then
        print("Slot " .. slot .. ": " .. item.name .. " x" .. item.count)
    end
end
```

---

## 🔹 GetItemBySlot
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.GetItemBySlot(src, slot)
```

Returns the item data for a specific inventory slot.

**Parameters:**
- `src` (number) - Player server ID
- `slot` (number) - Inventory slot number

**Returns:** 
- `table|nil` - Item data or nil if slot is empty

**Example:**
```lua
local playerId = source
local slotItem = Bridge.Inventory.GetItemBySlot(playerId, 1)
if slotItem then
    print("First slot contains: " .. slotItem.name)
end
```

---

## 🔹 SetMetadata
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.SetMetadata(src, slot, metadata)
```

Sets metadata for an item in a specific inventory slot.

**Parameters:**
- `src` (number) - Player server ID
- `slot` (number) - Inventory slot number
- `metadata` (table) - New metadata

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
local playerId = source
local newMetadata = {
    durability = 75,
    owner = GetPlayerName(playerId),
    modified = os.time()
}
Bridge.Inventory.SetMetadata(playerId, 5, newMetadata)
```

---

## Storage Systems

---

## 🔹 OpenStash
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.OpenStash(src, id)
```

Opens a registered stash for the player.

**Parameters:**
- `src` (number) - Player server ID
- `id` (string) - Stash identifier (must be registered first)

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
local playerId = source
local stashId = "police_armory_" .. Bridge.Framework.GetJob(playerId).name
-- First register the stash, then open it
Bridge.Inventory.RegisterStash(stashId, "Police Armory", 50, 100000)
Bridge.Inventory.OpenStash(playerId, stashId)
```

---

## 🔹 RegisterStash
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.RegisterStash(id, label, slots, weight, owner, groups, coords)
```

Registers a new stash with specified parameters.

**Parameters:**
- `id` (string) - Unique stash identifier
- `label` (string) - Display label for the stash
- `slots` (number) - Number of inventory slots
- `weight` (number) - Maximum weight capacity
- `owner` (string, optional) - Owner identifier
- `groups` (table, optional) - Job/group restrictions
- `coords` (table, optional) - Location coordinates

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
-- Register a gang stash
local gangName = "ballas"
local stashId = "gang_" .. gangName
Bridge.Inventory.RegisterStash(stashId, gangName .. " Gang Stash", 100, 500000)
```

---

## 🔹 HasItem
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.HasItem(src, item)
```

Checks if a player has a specific item in their inventory.

**Parameters:**
- `src` (number) - Player server ID
- `item` (string) - Item name

**Returns:** 
- `boolean` - True if player has the item

**Example:**
```lua
local playerId = source
if Bridge.Inventory.HasItem(playerId, "lockpick") then
    -- Player has lockpick, allow action
    TriggerClientEvent('lockpicking:start', playerId)
else
    TriggerClientEvent('notify', playerId, "You need a lockpick!", "error")
end
```

---

## 🔹 CanCarryItem
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.CanCarryItem(src, item, count)
```

Checks if a player can carry the specified item and amount.

**Parameters:**
- `src` (number) - Player server ID
- `item` (string) - Item name
- `count` (number) - Amount to check

**Returns:** 
- `boolean` - True if player can carry the items

**Example:**
```lua
local playerId = source
if Bridge.Inventory.CanCarryItem(playerId, "gold_bar", 5) then
    Bridge.Inventory.AddItem(playerId, "gold_bar", 5)
    TriggerClientEvent('notify', playerId, "Added 5 gold bars")
else
    TriggerClientEvent('notify', playerId, "Inventory full!", "error")
end
```

---

## 🔹 UpdatePlate
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.UpdatePlate(oldplate, newplate)
```

Updates vehicle plate in inventory system (useful for vehicle key systems).

**Parameters:**
- `oldplate` (string) - Current vehicle plate
- `newplate` (string) - New vehicle plate

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
-- When a vehicle plate is changed
local oldPlate = "ABC123"
local newPlate = "XYZ789"
Bridge.Inventory.UpdatePlate(oldPlate, newPlate)
```

---

## 🔹 GetImagePath
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.GetImagePath(item)
```

Gets the image path for an item (alternative to GetItemInfo for images only).

**Parameters:**
- `item` (string) - Item name

**Returns:** 
- `string` - Image URL/path

**Example:**
```lua
local itemImage = Bridge.Inventory.GetImagePath("water")
-- Returns: "nui://ox_inventory/web/images/water.png" or default image
```

---

## 🔹 OpenShop
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.OpenShop(src, shopTitle)
```

Opens a registered shop for a player.

**Parameters:**
- `src` (number) - Player server ID
- `shopTitle` (string) - Shop identifier

**Example:**
```lua
local playerId = source
Bridge.Inventory.OpenShop(playerId, "general_store")
```

---

## 🔹 RegisterShop
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.RegisterShop(shopTitle, shopInventory, shopCoords, shopGroups)
```

Registers a new shop in the inventory system.

**Parameters:**
- `shopTitle` (string) - Shop identifier
- `shopInventory` (table) - Shop items and prices
- `shopCoords` (table, optional) - Shop location
- `shopGroups` (table, optional) - Job/group restrictions

**Returns:**
- `boolean` - Success status

**Example:**
```lua
local shopItems = {
    {name = "water", price = 5},
    {name = "burger", price = 10}
}
Bridge.Inventory.RegisterShop("general_store", shopItems)
```

---

## 🔹 StripPNG
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Inventory.StripPNG(item)
```

Removes ".png" extension from item names for image processing.

**Parameters:**
- `item` (string) - Item name

**Returns:** 
- `string` - Item name without .png extension

**Example:**
```lua
local cleanName = Bridge.Inventory.StripPNG("water.png")
-- Returns: "water"
```

---

## Best Practices

---

## 📚 Error Handling

Always check return values and handle inventory full scenarios:

```lua
local function giveReward(playerId, item, count)
    if Bridge.Inventory.CanCarryItem(playerId, item, count) then
        if Bridge.Inventory.AddItem(playerId, item, count) then
            return true, "Item added successfully"
        else
            return false, "Failed to add item"
        end
    else
        return false, "Inventory full - cannot carry items"
    end
end
```

---

## 📚 Metadata Usage

Use metadata for complex item properties:

```lua
local weaponMetadata = {
    durability = 100,
    serial = GenerateSerial(),
    attachments = {"scope", "suppressor"},
    registered = true,
    owner = Bridge.Framework.GetIdentifier(playerId)
}
Bridge.Inventory.AddItem(playerId, "weapon_pistol", 1, nil, weaponMetadata)
```

---

## 📚 Stash Management

Always register stashes before opening them:

```lua
-- Register stash once (usually on resource start)
local stashId = "gang_hideout"
Bridge.Inventory.RegisterStash(stashId, "Gang Hideout", 100, 500000)

-- Then open for players when needed
Bridge.Inventory.OpenStash(playerId, stashId)
```
