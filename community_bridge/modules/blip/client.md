---
layout: default
title: Client Functions
parent: Blip
grand_parent: Modules
nav_order: 1
---

# Blip Client Functions
{: .no_toc }

Client-side blip management functions for creating, updating, and managing map markers.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Blip Creation

### CreateBlip

Creates a new blip on the map with specified properties.

**Syntax:**
```lua
local blip = exports.community_bridge:CreateBlip(blipData)
```

**Parameters:**
- `blipData` (table): Blip configuration
  - `coords` (vector3): Blip coordinates
  - `sprite` (number): Blip sprite ID
  - `color` (number): Blip color ID
  - `scale` (number): Blip scale (optional, default: 1.0)
  - `label` (string): Blip label text
  - `category` (string): Blip category (optional)
  - `shortRange` (boolean): Show only when close (optional, default: false)
  - `route` (boolean): Enable GPS routing (optional, default: false)
  - `flash` (boolean): Flash animation (optional, default: false)
  - `priority` (number): Display priority (optional, default: 1)

**Returns:**
- `blip` (number): Blip handle or `nil` if failed

**Example:**
```lua
local hospitalBlip = exports.community_bridge:CreateBlip({
    coords = vector3(300.0, -600.0, 43.0),
    sprite = 61,         -- Hospital sprite
    color = 1,           -- Red color
    scale = 1.0,
    label = "Central Medical Center",
    category = "medical",
    shortRange = false,
    route = true,
    flash = false,
    priority = 2
})

if hospitalBlip then
    print("Hospital blip created successfully")
end
```

### CreateBlipForEntity

Creates a blip attached to an entity (vehicle, ped, object).

**Syntax:**
```lua
local blip = exports.community_bridge:CreateBlipForEntity(entity, blipData)
```

**Parameters:**
- `entity` (number): Entity handle
- `blipData` (table): Blip configuration (same as CreateBlip)

**Returns:**
- `blip` (number): Blip handle or `nil` if failed

**Example:**
```lua
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local blip = exports.community_bridge:CreateBlipForEntity(vehicle, {
        sprite = 225,    -- Car sprite
        color = 3,       -- Green color
        label = "My Vehicle",
        category = "personal"
    })
end
```

### CreateProximityBlip

Creates a blip that appears/disappears based on player distance.

**Syntax:**
```lua
local blip = exports.community_bridge:CreateProximityBlip(blipData)
```

**Parameters:**
- `blipData` (table): Blip configuration plus proximity settings
  - `showDistance` (number): Distance to show blip
  - `hideDistance` (number): Distance to hide blip
  - All other CreateBlip parameters

**Returns:**
- `blip` (number): Blip handle or `nil` if failed

**Example:**
```lua
local secretBlip = exports.community_bridge:CreateProximityBlip({
    coords = vector3(500.0, 600.0, 25.0),
    sprite = 84,
    color = 1,
    label = "Hidden Location",
    category = "secret",
    showDistance = 30.0,
    hideDistance = 50.0
})
```

## Blip Management

### UpdateBlip

Updates properties of an existing blip.

**Syntax:**
```lua
local success = exports.community_bridge:UpdateBlip(blipId, updateData)
```

**Parameters:**
- `blipId` (string|number): Blip identifier or handle
- `updateData` (table): Properties to update

**Returns:**
- `success` (boolean): Whether update was successful

**Example:**
```lua
-- Update blip color and label
local success = exports.community_bridge:UpdateBlip("hospital_central", {
    color = 2,
    label = "Emergency Medical Center",
    flash = true
})

if success then
    print("Blip updated successfully")
end
```

### RemoveBlip

Removes a blip from the map.

**Syntax:**
```lua
local success = exports.community_bridge:RemoveBlip(blipId)
```

**Parameters:**
- `blipId` (string|number): Blip identifier or handle

**Returns:**
- `success` (boolean): Whether removal was successful

**Example:**
```lua
local success = exports.community_bridge:RemoveBlip("temporary_event")
if success then
    print("Temporary blip removed")
end
```

### GetBlip

Retrieves blip information.

**Syntax:**
```lua
local blipData = exports.community_bridge:GetBlip(blipId)
```

**Parameters:**
- `blipId` (string|number): Blip identifier or handle

**Returns:**
- `blipData` (table): Blip information or `nil` if not found

**Example:**
```lua
local blipData = exports.community_bridge:GetBlip("police_station")
if blipData then
    print("Blip location:", blipData.coords)
    print("Blip category:", blipData.category)
end
```

## Category Management

### ShowBlipCategories

Shows specific blip categories while hiding others.

**Syntax:**
```lua
exports.community_bridge:ShowBlipCategories(categories)
```

**Parameters:**
- `categories` (table): List of category names to show

**Example:**
```lua
-- Show only essential services
exports.community_bridge:ShowBlipCategories({
    "medical", 
    "police", 
    "fire", 
    "shop"
})
```

### HideBlipCategories

Hides specific blip categories.

**Syntax:**
```lua
exports.community_bridge:HideBlipCategories(categories)
```

**Parameters:**
- `categories` (table): List of category names to hide

**Example:**
```lua
-- Hide event and temporary blips
exports.community_bridge:HideBlipCategories({
    "event", 
    "temporary", 
    "admin"
})
```

### ToggleBlipCategory

Toggles visibility of a blip category.

**Syntax:**
```lua
local visible = exports.community_bridge:ToggleBlipCategory(category)
```

**Parameters:**
- `category` (string): Category name to toggle

**Returns:**
- `visible` (boolean): New visibility state

**Example:**
```lua
local visible = exports.community_bridge:ToggleBlipCategory("racing")
print("Racing blips now", visible and "visible" or "hidden")
```

### GetVisibleBlipCategories

Gets list of currently visible blip categories.

**Syntax:**
```lua
local categories = exports.community_bridge:GetVisibleBlipCategories()
```

**Returns:**
- `categories` (table): List of visible category names

**Example:**
```lua
local visible = exports.community_bridge:GetVisibleBlipCategories()
print("Visible categories:", table.concat(visible, ", "))
```

## Navigation and Routing

### SetGPSRoute

Sets a GPS route to a blip.

**Syntax:**
```lua
local success = exports.community_bridge:SetGPSRoute(blipId, routeColor)
```

**Parameters:**
- `blipId` (string|number): Target blip identifier
- `routeColor` (number): Route color (optional, default: 5)

**Returns:**
- `success` (boolean): Whether route was set

**Example:**
```lua
local success = exports.community_bridge:SetGPSRoute("hospital_central", 1)
if success then
    exports.community_bridge:SendNotify("Route set to hospital", "info")
end
```

### ClearGPSRoute

Clears the current GPS route.

**Syntax:**
```lua
exports.community_bridge:ClearGPSRoute()
```

**Example:**
```lua
exports.community_bridge:ClearGPSRoute()
exports.community_bridge:SendNotify("GPS route cleared", "info")
```

### CreateWaypointRoute

Creates a multi-waypoint route with automatic progression.

**Syntax:**
```lua
local routeId = exports.community_bridge:CreateWaypointRoute(routeData)
```

**Parameters:**
- `routeData` (table): Route configuration
  - `waypoints` (table): List of waypoint data
  - `sprite` (number): Waypoint sprite
  - `color` (number): Waypoint color
  - `showRoute` (boolean): Show GPS route lines
  - `autoProgress` (boolean): Auto-advance to next waypoint
  - `completionCallback` (function): Called when route is complete

**Returns:**
- `routeId` (string): Route identifier

**Example:**
```lua
local routeId = exports.community_bridge:CreateWaypointRoute({
    waypoints = {
        {coords = vector3(100, 200, 30), label = "Start"},
        {coords = vector3(200, 300, 25), label = "Checkpoint 1"},
        {coords = vector3(300, 400, 35), label = "Finish"}
    },
    sprite = 1,
    color = 6,
    showRoute = true,
    autoProgress = true,
    completionCallback = function()
        exports.community_bridge:SendNotify("Route completed!", "success")
    end
})
```

## Interactive Blips

### CreateInteractiveBlip

Creates a blip with interaction capabilities.

**Syntax:**
```lua
local blip = exports.community_bridge:CreateInteractiveBlip(blipData)
```

**Parameters:**
- `blipData` (table): Blip configuration plus interaction settings
  - `interaction` (table): Interaction configuration
    - `enabled` (boolean): Enable interaction
    - `distance` (number): Interaction distance
    - `action` (function): Function to call on interaction
    - `helpText` (string): Help text to display

**Returns:**
- `blip` (number): Interactive blip handle

**Example:**
```lua
local atmBlip = exports.community_bridge:CreateInteractiveBlip({
    coords = vector3(150.0, 250.0, 28.0),
    sprite = 108,    -- ATM sprite
    color = 2,
    label = "ATM - Click to Use",
    category = "banking",
    interaction = {
        enabled = true,
        distance = 3.0,
        action = function()
            TriggerEvent('banking:openATM')
        end,
        helpText = "Press E to use ATM"
    }
})
```

### SetBlipInteraction

Updates interaction settings for an existing blip.

**Syntax:**
```lua
local success = exports.community_bridge:SetBlipInteraction(blipId, interactionData)
```

**Parameters:**
- `blipId` (string|number): Blip identifier
- `interactionData` (table): Interaction configuration

**Returns:**
- `success` (boolean): Whether interaction was set

**Example:**
```lua
local success = exports.community_bridge:SetBlipInteraction("shop_247", {
    enabled = true,
    distance = 5.0,
    action = function()
        TriggerEvent('shops:open247Store')
    end,
    helpText = "Press E to enter store"
})
```

## Utility Functions

### GetNearbyBlips

Gets blips within a specified distance.

**Syntax:**
```lua
local blips = exports.community_bridge:GetNearbyBlips(coords, radius, categories)
```

**Parameters:**
- `coords` (vector3): Center coordinates (optional, default: player position)
- `radius` (number): Search radius (optional, default: 100.0)
- `categories` (table): Filter by categories (optional)

**Returns:**
- `blips` (table): List of nearby blips

**Example:**
```lua
local nearbyShops = exports.community_bridge:GetNearbyBlips(nil, 200.0, {"shop", "service"})
for _, blip in ipairs(nearbyShops) do
    print("Nearby:", blip.label, "at", blip.coords)
end
```

### GetClosestBlip

Finds the closest blip to a position.

**Syntax:**
```lua
local blip, distance = exports.community_bridge:GetClosestBlip(coords, categories)
```

**Parameters:**
- `coords` (vector3): Reference coordinates (optional, default: player position)
- `categories` (table): Filter by categories (optional)

**Returns:**
- `blip` (table): Closest blip data or `nil`
- `distance` (number): Distance to the blip

**Example:**
```lua
local closestShop, distance = exports.community_bridge:GetClosestBlip(nil, {"shop"})
if closestShop then
    print("Closest shop:", closestShop.label, "Distance:", distance)
    exports.community_bridge:SetGPSRoute(closestShop.id)
end
```

### SetBlipFilter

Sets global blip filtering criteria.

**Syntax:**
```lua
exports.community_bridge:SetBlipFilter(filterData)
```

**Parameters:**
- `filterData` (table): Filter configuration
  - `distance` (number): Maximum distance to show blips
  - `categories` (table): Allowed categories
  - `priority` (number): Minimum priority level
  - `customFilter` (function): Custom filtering function

**Example:**
```lua
exports.community_bridge:SetBlipFilter({
    distance = 500,
    categories = {"essential", "shop", "service"},
    priority = 1,
    customFilter = function(blipData)
        -- Only show open businesses
        return blipData.metadata and blipData.metadata.open == true
    end
})
```

## Best Practices

### Performance Optimization

```lua
-- Batch blip operations when possible
local function createMultipleBlips(blipList)
    local createdBlips = {}
    
    for _, blipData in ipairs(blipList) do
        local blip = exports.community_bridge:CreateBlip(blipData)
        if blip then
            table.insert(createdBlips, blip)
        end
    end
    
    return createdBlips
end

-- Limit concurrent blips
local maxBlips = 50
local activeBlips = {}

local function manageBlipLimit()
    if #activeBlips >= maxBlips then
        -- Remove oldest blip
        local oldestBlip = table.remove(activeBlips, 1)
        exports.community_bridge:RemoveBlip(oldestBlip)
    end
end
```

### Memory Management

```lua
-- Clean up blips on resource stop
local managedBlips = {}

AddEventHandler('onResourceStop', function(resourceName)
    if GetCurrentResourceName() == resourceName then
        for _, blipId in ipairs(managedBlips) do
            exports.community_bridge:RemoveBlip(blipId)
        end
        managedBlips = {}
    end
end)
```

### User Experience

```lua
-- Progressive blip loading based on distance
local function loadBlipsProgressive()
    local playerCoords = GetEntityCoords(PlayerPedId())
    local loadedBlips = {}
    
    -- Load high priority blips first
    for _, blipData in ipairs(highPriorityBlips) do
        local distance = #(playerCoords - blipData.coords)
        if distance < 1000 then -- Within 1km
            local blip = exports.community_bridge:CreateBlip(blipData)
            table.insert(loadedBlips, blip)
        end
    end
    
    return loadedBlips
end
```

---

These client functions provide comprehensive blip management capabilities with support for dynamic updates, categorization, interaction, and performance optimization.
