---
layout: default
title: Client Functions
parent: Inventory
grand_parent: Modules
nav_order: 2
---

# Inventory Client Functions
{: .no_toc }

Client-side functions for inventory data retrieval and item information.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Item Information

### GetItemInfo
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Inventory.GetItemInfo(item)
```

Returns detailed information about an item.

**Parameters:**
- `item` (string) - Name of the item

**Returns:** 
- `table` - Item data containing name, label, stack, weight, description, image

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local itemInfo = Bridge.Inventory.GetItemInfo("water")
if itemInfo then
    print("Item: " .. itemInfo.label .. " - Weight: " .. itemInfo.weight)
    local imageUrl = itemInfo.image or "default_placeholder.png"
end
```

---

### GetItemCount
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Inventory.GetItemCount(item)
```

Returns the count of a specific item in the player's inventory.

**Parameters:**
- `item` (string) - Name of the item

**Returns:** 
- `number` - Count of the item (0 if not found)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local waterCount = Bridge.Inventory.GetItemCount("water")
print("Player has " .. waterCount .. " water bottles")
```

---

### HasItem
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Inventory.HasItem(item)
```

Checks if the player has a specific item in their inventory.

**Parameters:**
- `item` (string) - Name of the item

**Returns:** 
- `boolean` - True if the player has the item

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Inventory.HasItem("driver_license") then
    -- Player can drive
    print("Player has a valid driver's license")
else
    -- Player cannot drive
    TriggerEvent('notify', "You need a driver's license to drive!")
end
```

---

### GetPlayerInventory
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Inventory.GetPlayerInventory()
```

Returns the complete player inventory.

**Returns:** 
- `table` - Array of inventory items with format {name, label, count, slot, metadata}

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Inventory.GetPlayerInventory()
for slot, item in pairs(inventory) do
    if item then
        print("Slot " .. slot .. ": " .. item.name .. " x" .. item.count)
    end
end
```

---

### GetImagePath
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Inventory.GetImagePath(item)
```

Gets the image path for an item.

**Parameters:**
- `item` (string) - Name of the item

**Returns:** 
- `string` - Image path or URL

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local imagePath = Bridge.Inventory.GetImagePath("water")
-- Returns system-specific path like "nui://ox_inventory/web/images/water.png"

SendNUIMessage({
    action = "showItem",
    image = imagePath,
    name = "Water Bottle"
})
```

---

## Shop Integration (ox_inventory only)

### OpenShop
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Inventory.OpenShop(shopTitle, shopInventory)
```

Opens a shop interface for the player. This function is only available when using ox_inventory.

**Parameters:**
- `shopTitle` (string) - Title of the shop
- `shopInventory` (table) - Shop inventory data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- This will only work with ox_inventory
Bridge.Inventory.OpenShop("General Store", {
    { name = "water", price = 10 },
    { name = "bread", price = 5 }
})
```

---

## Utility Functions

### StripPNG
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Bridge.Inventory.StripPNG(item)
```

Utility function to remove .png extension from item names.

**Parameters:**
- `item` (string) - Item name potentially with .png extension

**Returns:** 
- `string` - Item name without .png extension

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local cleanName = Bridge.Inventory.StripPNG("water.png")
-- Returns: "water"
```

---

## Best Practices

### Error Handling
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Always validate item data
local function SafeGetItemInfo(itemName)
    if not itemName or itemName == "" then
        return nil
    end
    
    local itemInfo = Bridge.Inventory.GetItemInfo(itemName)
    if not itemInfo or not itemInfo.name then
        print("Invalid item: " .. itemName)
        return nil
    end
    
    return itemInfo
end
```

### Performance Optimization
```lua
-- Cache inventory data when possible
local inventoryCache = {}
local lastUpdate = 0

local function GetCachedInventory()
    local now = GetGameTimer()
    if now - lastUpdate > 1000 then -- Update every second
        inventoryCache = Bridge.Inventory.GetPlayerInventory()
        lastUpdate = now
    end
    return inventoryCache
end
```

### Framework Compatibility
```lua
-- Check which inventory system is available
local Bridge = exports['community_bridge']:Bridge()

CreateThread(function()
    Wait(1000) -- Wait for bridge to load
    
    local itemInfo = Bridge.Inventory.GetItemInfo("water")
    if itemInfo and itemInfo.name then
        print("Inventory bridge is working correctly")
        print("Using system: " .. (itemInfo.image:match("nui://([^/]+)") or "default"))
    else
        print("Warning: Inventory bridge may not be configured correctly")
    end
end)
```
