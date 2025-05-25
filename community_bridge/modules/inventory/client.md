---
layout: default
title: Client Functions
parent: Inventory
grand_parent: Modules
nav_order: 2
---

# Inventory Client Functions
{: .no_toc }

Client-side functions for inventory UI management and local inventory operations.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Inventory Management

### OpenInventory
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.OpenInventory()
```

Opens the player's main inventory interface.

**Example:**
```lua
RegisterCommand('inventory', function()
    Inventory.OpenInventory()
end, false)

RegisterKeyMapping('inventory', 'Open Inventory', 'keyboard', 'TAB')
```

---

### CloseInventory
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.CloseInventory()
```

Closes any open inventory interface.

**Example:**
```lua
RegisterNetEvent('inventory:forceClose')
AddEventHandler('inventory:forceClose', function()
    Inventory.CloseInventory()
end)
```

---

### IsInventoryOpen
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.IsInventoryOpen()
```

Checks if any inventory interface is currently open.

**Returns:** 
- `boolean` - True if inventory is open

**Example:**
```lua
if Inventory.IsInventoryOpen() then
    -- Disable certain controls or features
    DisableControlAction(0, 24, true) -- Disable attack
end
```

---

## Item Display

### GetItemImage
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.GetItemImage(itemName)
```

Gets the image path for an item.

**Parameters:**
- `itemName` (string) - Name of the item

**Returns:** 
- `string` - Image path or URL

**Example:**
```lua
local imagePath = Inventory.GetItemImage("water")
-- Returns: "nui://ox_inventory/web/images/water.png"

SendNUIMessage({
    action = "showItem",
    image = imagePath,
    name = "Water Bottle"
})
```

---

### DisplayItemInfo
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.DisplayItemInfo(itemData)
```

Displays detailed item information in a tooltip or popup.

**Parameters:**
- `itemData` (table) - Item data including name, label, description, metadata

**Example:**
```lua
RegisterNetEvent('inventory:showItemDetails')
AddEventHandler('inventory:showItemDetails', function(itemData)
    Inventory.DisplayItemInfo({
        name = itemData.name,
        label = itemData.label,
        description = itemData.description,
        metadata = itemData.metadata,
        durability = itemData.metadata?.durability
    })
end)
```

---

## Inventory Events

### Item Used Event
```lua
RegisterNetEvent('inventory:itemUsed')
AddEventHandler('inventory:itemUsed', function(itemName, metadata)
    -- Handle item usage effects client-side
    if itemName == "health_potion" then
        -- Play healing animation
        local playerPed = PlayerPedId()
        TaskPlayAnim(playerPed, "mp_player_intdrink", "loop_bottle", 8.0, -8.0, 3000, 0, 0, false, false, false)
        
        -- Show visual effects
        TriggerEvent('effects:showHeal')
    end
end)
```

### Inventory Updated Event
```lua
RegisterNetEvent('inventory:updated')
AddEventHandler('inventory:updated', function(inventoryData)
    -- Update UI when inventory changes
    SendNUIMessage({
        action = "updateInventory",
        inventory = inventoryData
    })
end)
```

---

## Drag and Drop

### StartDrag
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.StartDrag(fromSlot, itemData)
```

Initiates drag operation for an inventory item.

**Parameters:**
- `fromSlot` (number) - Source slot number
- `itemData` (table) - Item being dragged

**Example:**
```lua
-- Called from NUI when starting to drag an item
RegisterNUICallback('startDrag', function(data, cb)
    Inventory.StartDrag(data.slot, data.item)
    cb('ok')
end)
```

---

### CompleteDrop
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.CompleteDrop(toSlot, fromSlot)
```

Completes a drag and drop operation.

**Parameters:**
- `toSlot` (number) - Destination slot
- `fromSlot` (number) - Source slot

**Example:**
```lua
RegisterNUICallback('dropItem', function(data, cb)
    if Inventory.CompleteDrop(data.toSlot, data.fromSlot) then
        cb('success')
    else
        cb('error')
    end
end)
```

---

## Hotbar Management

### UpdateHotbar
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.UpdateHotbar(hotbarData)
```

Updates the hotbar with new item data.

**Parameters:**
- `hotbarData` (table) - Array of hotbar items

**Example:**
```lua
RegisterNetEvent('inventory:updateHotbar')
AddEventHandler('inventory:updateHotbar', function(hotbarData)
    Inventory.UpdateHotbar(hotbarData)
    
    -- Update HUD hotbar display
    SendNUIMessage({
        action = "updateHotbar",
        items = hotbarData
    })
end)
```

---

### UseHotbarSlot
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.UseHotbarSlot(slot)
```

Uses an item from a specific hotbar slot.

**Parameters:**
- `slot` (number) - Hotbar slot number (1-5)

**Example:**
```lua
-- Register hotbar keybinds
for i = 1, 5 do
    RegisterCommand('hotbar' .. i, function()
        Inventory.UseHotbarSlot(i)
    end, false)
    
    RegisterKeyMapping('hotbar' .. i, 'Use Hotbar Slot ' .. i, 'keyboard', i)
end
```

---

## Animation Integration

### PlayUseAnimation
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Inventory.PlayUseAnimation(itemName, animationData)
```

Plays an animation when using an item.

**Parameters:**
- `itemName` (string) - Name of the item being used
- `animationData` (table) - Animation dictionary and name

**Example:**
```lua
RegisterNetEvent('inventory:playAnimation')
AddEventHandler('inventory:playAnimation', function(itemName)
    local animations = {
        water = {dict = "mp_player_intdrink", anim = "loop_bottle"},
        burger = {dict = "mp_player_inteat@burger", anim = "mp_player_int_eat_burger"},
        cigarette = {dict = "mp_player_int_uppercut", anim = "mp_player_int_uppercut"}
    }
    
    local anim = animations[itemName]
    if anim then
        Inventory.PlayUseAnimation(itemName, anim)
    end
end)
```

---

## NUI Callbacks

### Inventory Actions
```lua
-- Handle inventory UI actions
RegisterNUICallback('useItem', function(data, cb)
    TriggerServerEvent('inventory:useItem', data.slot, data.item)
    cb('ok')
end)

RegisterNUICallback('dropItem', function(data, cb)
    TriggerServerEvent('inventory:dropItem', data.slot, data.amount)
    cb('ok')
end)

RegisterNUICallback('giveItem', function(data, cb)
    local closestPlayer = GetClosestPlayer()
    if closestPlayer then
        TriggerServerEvent('inventory:giveItem', closestPlayer, data.slot, data.amount)
        cb('ok')
    else
        cb('error')
    end
end)
```

---

## Best Practices

### Performance Optimization
```lua
-- Debounce rapid inventory updates
local lastUpdate = 0
RegisterNetEvent('inventory:clientUpdate')
AddEventHandler('inventory:clientUpdate', function(data)
    local now = GetGameTimer()
    if now - lastUpdate < 100 then return end -- Limit to 10 updates per second
    lastUpdate = now
    
    -- Process update
    Inventory.UpdateDisplay(data)
end)
```

### Error Handling
```lua
-- Always validate item data
local function SafeUseItem(itemData)
    if not itemData or not itemData.name then
        Notify.SendNotify("Invalid item data", "error")
        return false
    end
    
    if not itemData.useable then
        Notify.SendNotify("This item cannot be used", "error")
        return false
    end
    
    return true
end
```

### UI State Management
```lua
-- Track inventory state
local inventoryState = {
    isOpen = false,
    currentTab = "main",
    isDragging = false,
    selectedSlot = nil
}

RegisterNetEvent('inventory:setState')
AddEventHandler('inventory:setState', function(newState)
    for key, value in pairs(newState) do
        inventoryState[key] = value
    end
end)
```
