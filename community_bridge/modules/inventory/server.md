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

### AddItem
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.AddItem(src, item, count, slot, metadata)
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
local playerId = source
local success = Inventory.AddItem(playerId, "water", 5)
if success then
    TriggerClientEvent('notify', playerId, "Added 5 water bottles")
else
    TriggerClientEvent('notify', playerId, "Inventory full!", "error")
end
```

---

### RemoveItem
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.RemoveItem(src, item, count, slot, metadata)
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
local playerId = source
if Inventory.RemoveItem(playerId, "burger", 1) then
    -- Player consumed burger, restore health
    TriggerClientEvent('hospital:heal', playerId, 25)
else
    TriggerClientEvent('notify', playerId, "You don't have a burger!", "error")
end
```

---

### GetItemInfo
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.GetItemInfo(item)
```

Returns detailed information about an item.

**Parameters:**
- `item` (string) - Item name

**Returns:** 
- `table` - Item data containing name, label, stack, weight, description, image

**Example:**
```lua
local itemInfo = Inventory.GetItemInfo("water")
if itemInfo then
    print("Item: " .. itemInfo.label .. " - Weight: " .. itemInfo.weight)
    local imageUrl = itemInfo.image or "nui://ox_inventory/web/images/default.png"
end
```

---

### GetItemCount
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.GetItemCount(src, item, metadata)
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
local waterCount = Inventory.GetItemCount(playerId, "water")
if waterCount >= 3 then
    -- Player has enough water for recipe
    Inventory.RemoveItem(playerId, "water", 3)
    Inventory.AddItem(playerId, "soup", 1)
end
```

---

## Inventory Operations

### GetPlayerInventory
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.GetPlayerInventory(src)
```

Returns all items in a player's inventory.

**Parameters:**
- `src` (number) - Player server ID

**Returns:** 
- `table` - Array of inventory items

**Example:**
```lua
local playerId = source
local inventory = Inventory.GetPlayerInventory(playerId)
for slot, item in pairs(inventory) do
    if item then
        print("Slot " .. slot .. ": " .. item.name .. " x" .. item.count)
    end
end
```

---

### GetItemBySlot
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.GetItemBySlot(src, slot)
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
local slotItem = Inventory.GetItemBySlot(playerId, 1)
if slotItem then
    print("First slot contains: " .. slotItem.name)
end
```

---

### SetMetadata
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.SetMetadata(src, slot, metadata)
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
Inventory.SetMetadata(playerId, 5, newMetadata)
```

---

## Storage Systems

### OpenStash
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.OpenStash(src, stashId, maxWeight, slots)
```

Opens a stash for the player.

**Parameters:**
- `src` (number) - Player server ID
- `stashId` (string) - Unique stash identifier
- `maxWeight` (number, optional) - Maximum weight capacity
- `slots` (number, optional) - Number of inventory slots

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
local playerId = source
local stashId = "police_armory_" .. Framework.GetJob(playerId).name
Inventory.OpenStash(playerId, stashId, 100000, 50)
```

---

### CreateStash
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.CreateStash(stashId, label, maxWeight, slots)
```

Creates a new stash with specified parameters.

**Parameters:**
- `stashId` (string) - Unique stash identifier
- `label` (string) - Display label for the stash
- `maxWeight` (number) - Maximum weight capacity
- `slots` (number) - Number of inventory slots

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
-- Create a gang stash
local gangName = "ballas"
local stashId = "gang_" .. gangName
Inventory.CreateStash(stashId, gangName .. " Gang Stash", 500000, 100)
```

---

## Advanced Features

### RegisterUsableItem
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Inventory.RegisterUsableItem(item, callback)
```

Registers a callback function for when an item is used.

**Parameters:**
- `item` (string) - Item name
- `callback` (function) - Function to call when item is used

**Example:**
```lua
Inventory.RegisterUsableItem("health_potion", function(source, item, metadata)
    local playerId = source
    if Inventory.RemoveItem(playerId, "health_potion", 1) then
        -- Heal player
        TriggerClientEvent('hospital:heal', playerId, 50)
        TriggerClientEvent('notify', playerId, "You feel refreshed!")
    end
end)
```

---

## Best Practices

### Error Handling
Always check return values and handle inventory full scenarios:

```lua
local function giveReward(playerId, item, count)
    if Inventory.AddItem(playerId, item, count) then
        return true, "Item added successfully"
    else
        -- Try to drop item on ground if inventory full
        local coords = GetEntityCoords(GetPlayerPed(playerId))
        Inventory.CreateDroppedItem(item, count, coords)
        return false, "Inventory full - item dropped nearby"
    end
end
```

### Metadata Usage
Use metadata for complex item properties:

```lua
local weaponMetadata = {
    durability = 100,
    serial = GenerateSerial(),
    attachments = {"scope", "suppressor"},
    registered = true,
    owner = Framework.GetIdentifier(playerId)
}
Inventory.AddItem(playerId, "weapon_pistol", 1, nil, weaponMetadata)
```
