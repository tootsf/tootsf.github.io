---
layout: default
title: Functions
parent: Client
grand_parent: "🎒 Inventory"
nav_order: 1
permalink: /community_bridge/modules/inventory/client/functions/
---

# Inventory Client Functions
{: .no_toc }

Client-side functions for inventory management.

# Inventory Client Functions
{: .no_toc }

Client-side functions for inventory management.

---

## 🔹 GetImagePath

Gets the image path for an item.

**Parameters:**
- `item` (string) – Name of the item

**Returns:**
- `string` – Image path or URL

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

## 🔹 GetItemCount

Returns the count of a specific item in the player's inventory.

**Parameters:**
- `item` (string) – Name of the item

**Returns:**
- `number` – Count of the item (0 if not found)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local waterCount = Bridge.Inventory.GetItemCount("water")
print("Player has " .. waterCount .. " water bottles")
```

---

## 🔹 GetItemInfo

Returns detailed information about an item.

**Parameters:**
- `item` (string) – Name of the item

**Returns:**
- `table` – Item data containing name, label, stack, weight, description, image

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

## 🔹 GetPlayerInventory

Returns the complete player inventory.

**Returns:**
- `table` – Array of inventory items with format {name, label, count, slot, metadata}

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

## 🔹 HasItem

Checks if the player has a specific item in their inventory.

**Parameters:**
- `item` (string) – Name of the item

**Returns:**
- `boolean` – True if the player has the item

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

## 🔹 OpenShop

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Opens a shop interface for the player. This function is only available when using ox_inventory.


```lua
function Inventory.OpenShop(shopTitle, shopInventory)
```


**shopTitle:** `string`  
Title of the shop

**shopInventory:** `table`  
Shop inventory data


```lua
local Bridge = exports['community_bridge']:Bridge()

-- This will only work with ox_inventory
Bridge.Inventory.OpenShop("General Store", {
    { name = "water", price = 10 },
    { name = "bread", price = 5 }
})
```

---

## 🔹 StripPNG

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Utility function to remove .png extension from item names.


```lua
function Inventory.StripPNG(item)
```


**item:** `string`  
Item name potentially with .png extension


**string**  
Item name without .png extension


```lua
local Bridge = exports['community_bridge']:Bridge()

local cleanName = Bridge.Inventory.StripPNG("water.png")
-- Returns: "water"
```