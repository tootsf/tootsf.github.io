---
layout: default
title: Functions
parent: Server
grand_parent: "🎒 Inventory"
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/
---

# Inventory Server Functions
{: .no_toc }

Server-side functions for inventory management.

# Inventory Server Functions
{: .no_toc }

Server-side functions for inventory management.

---

## 🔹 AddItem

# AddItem
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Adds an item to a player's inventory.

## Syntax

```lua
function Inventory.AddItem(src, item, count, slot, metadata)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

**count:** `number`  
Amount to add

**slot:** `number` (optional)  
Specific inventory slot

**metadata:** `table` (optional)  
Item metadata

## Returns

**boolean**  
Success status

## Example

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

## 🔹 CanCarryItem

# CanCarryItem
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Checks if there is available space in the inventory for the specified item and count.

## Syntax

```lua
Inventory.CanCarryItem(src, item, count)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | number | The source (player server id) |
| `item` | string | The item name to check |
| `count` | number | The quantity to check |

## Returns

| Type | Description |
|------|-------------|
| boolean | True if the player can carry the item, false otherwise |

## Example

```lua
-- Check if player can carry 5 water bottles
local canCarry = Inventory.CanCarryItem(1, "water", 5)
if canCarry then
    Inventory.AddItem(1, "water", 5)
    -- Notify player they received water
else
    -- Notify player their inventory is full
end
```

---

## Notes

- With ox_inventory: Uses the native CanCarryItem function
- With default inventory: Returns false and an error message as this feature is not bridged
- Consider both weight and slot availability when checking capacity

---

## 🔹 GetImagePath

# GetImagePath
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Gets the image path for an item. This is an alternate option to GetItemInfo for getting item images. If an image isn't found, reverts to the community_bridge logo (useful for menus).

## Syntax

```lua
Inventory.GetImagePath(item)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | string | The item name |

## Returns

| Type | Description |
|------|-------------|
| string | The image path/URL for the item |

## Example

```lua
-- Get image path for a weapon
local imagePath = Inventory.GetImagePath("weapon_pistol")
print("Image URL:", imagePath)

-- Use in a menu system
local menuItems = {
    {
        label = "Pistol",
        image = Inventory.GetImagePath("weapon_pistol")
    }
}
```

---

## Notes

- With ox_inventory: Attempts to find the image in ox_inventory's web/images folder
- With default inventory: Returns the community_bridge placeholder logo
- Automatically strips .png extensions from item names
- Falls back to community_bridge logo if no image is found

---

## 🔹 GetItemBySlot

# GetItemBySlot
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Returns the specified slot data as a table. This function is only available when using ox_inventory.

## Syntax

```lua
Inventory.GetItemBySlot(src, slot)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | number | The source (player server id) |
| `slot` | number | The inventory slot number |

## Returns

| Type | Description |
|------|-------------|
| table | Slot data in format {weight, name, metadata, slot, label, count} |

## Example

```lua
-- Get item data from slot 1 for player with source 1
local slotData = Inventory.GetItemBySlot(1, 1)
if slotData then
    print("Item in slot 1:", slotData.name, "Count:", slotData.count)
end
```

---

## Notes

- This function is only available when using ox_inventory
- Returns nil if the slot is empty or invalid
- Slot numbers typically start from 1

---

## 🔹 GetItemCount

# GetItemCount
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets the count of an item in a player's inventory.

## Syntax

```lua
function Inventory.GetItemCount(src, item)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

## Returns

**number**  
Count of the item (0 if not found)

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
local waterCount = Bridge.Inventory.GetItemCount(playerId, "water")

if waterCount >= 5 then
    TriggerClientEvent('notify', playerId, "You have " .. waterCount .. " water bottles")
else
    TriggerClientEvent('notify', playerId, "You need more water bottles")
end
```

---

## 🔹 GetPlayerInventory

# GetPlayerInventory
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets a player's complete inventory.

## Syntax

```lua
function Inventory.GetPlayerInventory(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**table**  
Array of inventory items with format {name, label, count, slot, metadata}

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
local inventory = Bridge.Inventory.GetPlayerInventory(playerId)

for slot, item in pairs(inventory) do
    if item then
        print("Player " .. playerId .. " has " .. item.name .. " x" .. item.count .. " in slot " .. slot)
    end
end
```

---

## 🔹 HasItem

# HasItem
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Checks if a player has an item.

## Syntax

```lua
function Inventory.HasItem(src, item, count)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

**count:** `number` (optional)  
Minimum amount required (defaults to 1)

## Returns

**boolean**  
True if player has the required amount of the item

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = source
if Bridge.Inventory.HasItem(playerId, "lockpick", 1) then
    -- Player has at least one lockpick
    TriggerClientEvent('lockpicking:start', playerId)
else
    TriggerClientEvent('notify', playerId, "You need a lockpick!", "error")
end
```

---

## 🔹 OpenStash

# OpenStash
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Opens the specified stash for the player. Implementation varies depending on the inventory system being used.

## Syntax

```lua
Inventory.OpenStash(src, id, label, slots, weight, owner, groups, coords)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | number | The source (player server id) |
| `id` | number\|string | The unique stash identifier |
| `label` | string | The display name of the stash |
| `slots` | number | Number of inventory slots |
| `weight` | number | Maximum weight capacity |
| `owner` | string | The owner identifier (optional) |
| `groups` | table | Allowed groups/jobs (optional) |
| `coords` | table | Stash coordinates (optional) |

## Returns

| Type | Description |
|------|-------------|
| nil | This function does not return a value |

## Example

```lua
-- Open a personal stash for player
Inventory.OpenStash(1, "player_stash_123", "Personal Stash", 50, 100000)

-- Open a job-specific stash
Inventory.OpenStash(1, "police_evidence", "Evidence Locker", 100, 500000, nil, {"police"})
```

---

## Notes

- With ox_inventory: Stash must be registered first using RegisterStash
- With default inventory: Returns an error message as stashes are not supported
- The stash ID should be unique across the server

---

## 🔹 RegisterShop

# RegisterShop
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Registers a shop with the inventory system. If the shop already exists, returns true without creating a duplicate.

## Syntax

```lua
Inventory.RegisterShop(shopTitle, shopInventory, shopCoords, shopGroups)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `shopTitle` | string | The unique shop identifier/name |
| `shopInventory` | table | The items available in the shop |
| `shopCoords` | table | The coordinates where the shop is located (optional) |
| `shopGroups` | table | Groups/jobs that can access the shop (optional) |

## Returns

| Type | Description |
|------|-------------|
| boolean | True if successful, false otherwise |

## Example

```lua
-- Register a general store
local shopItems = {
    {name = "water", price = 5, currency = "money"},
    {name = "sandwich", price = 10, currency = "money"}
}
local success = Inventory.RegisterShop("general_store", shopItems)

-- Register a job-specific shop
local policeShop = {
    {name = "handcuffs", price = 50, currency = "money"},
    {name = "radio", price = 100, currency = "money"}
}
Inventory.RegisterShop("police_shop", policeShop, nil, {"police"})
```

---

## Notes

- With ox_inventory: Creates a persistent shop that players can access
- With default inventory: Returns false and an error message as this feature is not bridged
- Shop titles should be unique across the server
- If a shop already exists with the same title, returns true without creating a duplicate

---

## 🔹 RegisterStash

# RegisterStash
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Registers a stash with the inventory system. Must be called before using OpenStash.

## Syntax

```lua
Inventory.RegisterStash(id, label, slots, weight, owner, groups, coords)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number\|string | The unique stash identifier |
| `label` | string | The display name of the stash |
| `slots` | number | Number of inventory slots |
| `weight` | number | Maximum weight capacity |
| `owner` | string | The owner identifier (optional) |
| `groups` | table | Allowed groups/jobs (optional) |
| `coords` | table | Stash coordinates (optional) |

## Returns

| Type | Description |
|------|-------------|
| boolean | True if successful, false otherwise |

## Example

```lua
-- Register a personal stash
local success = Inventory.RegisterStash("player_stash_123", "Personal Stash", 50, 100000, "ABC123")

-- Register a job stash with group restrictions
local jobStash = Inventory.RegisterStash(
    "police_evidence", 
    "Evidence Locker", 
    100, 
    500000, 
    nil, 
    {"police", "sheriff"}
)
```

---

## Notes

- With ox_inventory: Creates a persistent stash that can be accessed across server restarts
- With default inventory: Returns false and an error message as stashes are not supported
- If a stash with the same ID already exists, returns true without creating a duplicate

---

## 🔹 RemoveItem

# RemoveItem
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Removes an item from a player's inventory.

## Syntax

```lua
function Inventory.RemoveItem(src, item, count, slot, metadata)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

**count:** `number`  
Amount to remove

**slot:** `number` (optional)  
Specific inventory slot

**metadata:** `table` (optional)  
Item metadata for matching

## Returns

**boolean**  
Success status

## Example

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

## 🔹 SetMetadata

# SetMetadata
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Sets the metadata of an item in the inventory at a specific slot. This function is only available when using ox_inventory.

## Syntax

```lua
Inventory.SetMetadata(src, item, slot, metadata)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | number | The source (player server id) |
| `item` | string | The item name |
| `slot` | number | The inventory slot number |
| `metadata` | table | The metadata to set for the item |

## Returns

| Type | Description |
|------|-------------|
| nil | This function does not return a value |

## Example

```lua
-- Set metadata for an item in slot 5
local metadata = {
    durability = 85,
    serial = "ABC123",
    description = "Custom weapon"
}
Inventory.SetMetadata(1, "weapon_pistol", 5, metadata)
```

---

## Notes

- This function is only available when using ox_inventory
- The slot must contain the specified item for the operation to work
- Metadata can include custom properties like durability, serial numbers, etc.

---

## 🔹 StripPNG

# StripPNG
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Removes the ".png" extension from an item name string if present. This is a utility function used internally by other inventory functions.

## Syntax

```lua
Inventory.StripPNG(item)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `item` | string | The item name that may contain .png extension |

## Returns

| Type | Description |
|------|-------------|
| string | The item name without .png extension |

## Example

```lua
-- Strip .png from item name
local itemName = Inventory.StripPNG("weapon_pistol.png")
print(itemName) -- Output: "weapon_pistol"

-- Works with items that don't have .png extension
local cleanName = Inventory.StripPNG("water")
print(cleanName) -- Output: "water"
```

---

## Notes

- This function is used internally by GetImagePath and other functions
- Safe to use on strings that don't contain .png extension
- Only removes the .png extension, not other file extensions
- Case sensitive - looks specifically for ".png"

---

## 🔹 UpdatePlate

# UpdatePlate
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Updates the plate of a vehicle inside the inventory system. Also integrates with jg-mechanic if available.

## Syntax

```lua
Inventory.UpdatePlate(oldplate, newplate)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `oldplate` | string | The current vehicle plate |
| `newplate` | string | The new vehicle plate |

## Returns

| Type | Description |
|------|-------------|
| boolean | True if successful, false otherwise |

## Example

```lua
-- Update a vehicle plate from old to new
local success = Inventory.UpdatePlate("ABC123", "XYZ789")
if success then
    print("Vehicle plate updated successfully")
else
    print("Failed to update vehicle plate")
end
```

---

## Notes

- With ox_inventory: Updates the vehicle in the inventory system and integrates with jg-mechanic if present
- With default inventory: Returns false and an error message as this feature is not bridged
- Useful when players customize or change their vehicle plates