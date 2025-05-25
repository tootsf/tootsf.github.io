---
layout: default
title: Blip
parent: Modules
grand_parent: Community Bridge
nav_order: 8
has_children: true
---

# Blip Module
{: .no_toc }

The Blip module provides comprehensive map blip management including creation, customization, categorization, and dynamic updates for enhanced player navigation.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Blip module offers a complete blip management system for creating, organizing, and maintaining map markers with support for dynamic updates, categories, permissions, and advanced customization options.

### Key Features

- **Dynamic Blip Creation**: Create blips with real-time updates
- **Category Management**: Organize blips by type and function
- **Permission System**: Control blip visibility based on player permissions
- **Custom Styling**: Extensive customization options for appearance
- **Route Management**: GPS routing and waypoint integration
- **Proximity Detection**: Show/hide blips based on distance
- **Job Integration**: Job-specific blips and markers
- **Interactive Blips**: Clickable blips with custom actions

## Architecture

```
Blip Module
├── Client Functions    → Blip rendering, interaction, local management
├── Server Functions    → Synchronization, permissions, data management
└── Shared Functions    → Blip data, validation, utilities
```

## Blip Categories

### Location Blips
- Shops and businesses
- Government buildings
- Entertainment venues
- Residential areas

### Service Blips
- Hospitals and clinics
- Police stations
- Fire departments
- Mechanic shops

### Activity Blips
- Mission markers
- Event locations
- Racing checkpoints
- Job sites

### Player Blips
- Player locations
- Friend markers
- Group members
- VIP players

## Quick Start

### Basic Blip Creation

```lua
-- Client Side
local blip = exports.community_bridge:CreateBlip({
    coords = vector3(100.0, 200.0, 30.0),
    sprite = 1,          -- Blip sprite ID
    color = 2,           -- Blip color
    scale = 1.0,         -- Blip size
    label = "Police Station",
    category = "emergency"
})

if blip then
    print("Blip created successfully")
end
```

### Advanced Blip with Custom Properties

```lua
-- Client Side
local blip = exports.community_bridge:CreateBlip({
    coords = vector3(250.0, 300.0, 25.0),
    sprite = 52,         -- Shop sprite
    color = 3,           -- Green color
    scale = 0.8,
    label = "24/7 Store",
    category = "shop",
    shortRange = true,   -- Only visible when close
    route = true,        -- Enable GPS routing
    flash = false,       -- Don't flash
    priority = 1,        -- High priority
    permissions = {"player"}, -- Visible to all players
    metadata = {
        business = "247_store_1",
        hours = "24/7",
        services = {"food", "drinks", "supplies"}
    }
})
```

### Server-Side Blip Management

```lua
-- Server Side
exports.community_bridge:CreateGlobalBlip({
    id = "hospital_central",
    coords = vector3(300.0, -600.0, 43.0),
    sprite = 61,
    color = 1,
    label = "Central Medical Center",
    category = "medical",
    permanent = true,
    visibleTo = "all" -- or specific player list
})
```

## Blip Types and Sprites

### Common Sprites
- **1**: Default marker
- **8**: Police station
- **61**: Hospital
- **357**: Fire station
- **446**: Mechanic shop
- **52**: Shop/Store
- **108**: ATM
- **280**: Gas station

### Custom Sprite System
```lua
-- Register custom sprites
exports.community_bridge:RegisterBlipSprite({
    name = "custom_business",
    sprite = 500,
    description = "Custom business marker"
})
```

## Dynamic Blip Management

### Real-Time Updates

```lua
-- Client Side
local blipId = "dynamic_event"
local blip = exports.community_bridge:CreateBlip({
    id = blipId,
    coords = vector3(100, 200, 30),
    sprite = 1,
    color = 1,
    label = "Event Starting Soon",
    category = "event"
})

-- Update blip properties
Citizen.CreateThread(function()
    Wait(30000) -- 30 seconds
    exports.community_bridge:UpdateBlip(blipId, {
        color = 2,
        label = "Event Active",
        flash = true
    })
    
    Wait(60000) -- 1 minute later
    exports.community_bridge:UpdateBlip(blipId, {
        color = 1,
        label = "Event Ending",
        flash = false
    })
    
    Wait(30000) -- 30 seconds later
    exports.community_bridge:RemoveBlip(blipId)
end)
```

### Proximity-Based Blips

```lua
-- Client Side
exports.community_bridge:CreateProximityBlip({
    coords = vector3(100, 200, 30),
    sprite = 1,
    color = 3,
    label = "Hidden Location",
    showDistance = 50.0,    -- Show when within 50 units
    hideDistance = 100.0,   -- Hide when beyond 100 units
    category = "hidden"
})
```

## Permission-Based Blips

### Job-Specific Blips

```lua
-- Server Side
exports.community_bridge:CreateJobBlip({
    job = "police",
    coords = vector3(400, 500, 30),
    sprite = 8,
    color = 3,
    label = "Police Evidence Locker",
    minGrade = 2,           -- Minimum job grade required
    category = "police_only"
})
```

### Player Group Blips

```lua
-- Server Side
exports.community_bridge:CreateGroupBlip({
    groupId = "gang_001",
    coords = vector3(500, 600, 25),
    sprite = 84,
    color = 1,
    label = "Gang Hideout",
    category = "gang",
    members = {"player1", "player2", "player3"}
})
```

## Interactive Blips

### Clickable Blips with Actions

```lua
-- Client Side
exports.community_bridge:CreateInteractiveBlip({
    coords = vector3(100, 200, 30),
    sprite = 52,
    color = 2,
    label = "ATM - Click to Use",
    category = "banking",
    interaction = {
        enabled = true,
        distance = 5.0,
        action = function()
            -- Trigger ATM interface
            TriggerEvent('banking:openATM')
        end,
        helpText = "Press E to use ATM"
    }
})
```

## Blip Categories and Filtering

### Category Management

```lua
-- Client Side
-- Show only specific categories
exports.community_bridge:ShowBlipCategories({"shop", "medical", "police"})

-- Hide specific categories
exports.community_bridge:HideBlipCategories({"hidden", "admin"})

-- Toggle category visibility
exports.community_bridge:ToggleBlipCategory("event")

-- Get all visible categories
local categories = exports.community_bridge:GetVisibleBlipCategories()
```

### Custom Filters

```lua
-- Client Side
exports.community_bridge:SetBlipFilter({
    distance = 1000,        -- Only show blips within 1000 units
    categories = {"shop", "service"},
    permissions = true,     -- Respect permission settings
    priority = 1,          -- Minimum priority level
    customFilter = function(blipData)
        -- Custom filtering logic
        return blipData.metadata and blipData.metadata.open == true
    end
})
```

## Route and Navigation

### GPS Routing

```lua
-- Client Side
local blipId = "destination"
exports.community_bridge:CreateNavigationBlip({
    coords = vector3(200, 300, 25),
    sprite = 1,
    color = 5,
    label = "Destination",
    route = true,
    routeColor = 5
})

-- Set as GPS destination
exports.community_bridge:SetGPSRoute(blipId)

-- Clear GPS route
exports.community_bridge:ClearGPSRoute()
```

### Waypoint System

```lua
-- Client Side
local waypoints = {
    {coords = vector3(100, 200, 30), label = "Checkpoint 1"},
    {coords = vector3(200, 300, 25), label = "Checkpoint 2"},
    {coords = vector3(300, 400, 35), label = "Finish Line"}
}

exports.community_bridge:CreateWaypointRoute({
    waypoints = waypoints,
    sprite = 1,
    color = 6,
    showRoute = true,
    autoProgress = true,    -- Automatically move to next waypoint
    completionCallback = function()
        exports.community_bridge:SendNotify("Route completed!", "success")
    end
})
```

## Module Files

- **[Client Functions](client.md)**: Blip creation, interaction, local management
- **[Server Functions](server.md)**: Synchronization, permissions, global blips
- **[Shared Functions](shared.md)**: Blip data, validation, utilities

## Best Practices

### Performance Optimization

```lua
-- Limit blip density in crowded areas
local function createOptimizedBlip(blipData)
    local nearbyBlips = exports.community_bridge:GetNearbyBlips(blipData.coords, 50.0)
    
    if #nearbyBlips > 10 then
        -- Too crowded, use different strategy
        return exports.community_bridge:CreateClusteredBlip(blipData)
    else
        return exports.community_bridge:CreateBlip(blipData)
    end
end
```

### Memory Management

```lua
-- Clean up temporary blips
local temporaryBlips = {}

local function createTemporaryBlip(data, duration)
    local blip = exports.community_bridge:CreateBlip(data)
    temporaryBlips[blip] = GetGameTimer() + duration
    return blip
end

-- Cleanup thread
Citizen.CreateThread(function()
    while true do
        local currentTime = GetGameTimer()
        for blip, expireTime in pairs(temporaryBlips) do
            if currentTime > expireTime then
                exports.community_bridge:RemoveBlip(blip)
                temporaryBlips[blip] = nil
            end
        end
        Wait(5000) -- Check every 5 seconds
    end
end)
```

### User Experience

```lua
-- Provide clear blip organization
local function organizeBlipsByCategory()
    local categories = {
        essential = {priority = 1, color = 1},    -- Red for important
        services = {priority = 2, color = 3},     -- Green for services
        entertainment = {priority = 3, color = 5}, -- Yellow for fun
        other = {priority = 4, color = 0}         -- White for misc
    }
    
    for category, settings in pairs(categories) do
        exports.community_bridge:SetCategorySettings(category, settings)
    end
end
```

---

The Blip module provides comprehensive map marker management capabilities for your FiveM server, supporting everything from basic location markers to advanced interactive navigation systems.
