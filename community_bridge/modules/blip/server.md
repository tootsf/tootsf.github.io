---
layout: default
title: Server Functions
parent: Blip
grand_parent: Modules
nav_order: 2
---

# Blip Server Functions
{: .no_toc }

Server-side blip management functions for synchronization, permissions, and global blip control.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Global Blip Management

### CreateGlobalBlip

Creates a blip that is synchronized across all clients with permission control.

**Syntax:**
```lua
local success = exports.community_bridge:CreateGlobalBlip(blipData)
```

**Parameters:**
- `blipData` (table): Global blip configuration
  - `id` (string): Unique blip identifier
  - `coords` (vector3): Blip coordinates
  - `sprite` (number): Blip sprite ID
  - `color` (number): Blip color ID
  - `label` (string): Blip label text
  - `category` (string): Blip category
  - `permanent` (boolean): Whether blip persists across restarts
  - `visibleTo` (string|table): "all", "job:police", or player list
  - `permissions` (table): Permission requirements
  - `metadata` (table): Additional blip data

**Returns:**
- `success` (boolean): Whether blip was created successfully

**Example:**
```lua
local success = exports.community_bridge:CreateGlobalBlip({
    id = "police_station_main",
    coords = vector3(400.0, -1000.0, 29.0),
    sprite = 60,
    color = 3,
    label = "Mission Row Police Station",
    category = "emergency",
    permanent = true,
    visibleTo = "all",
    permissions = {},
    metadata = {
        department = "LSPD",
        services = {"arrests", "evidence", "impound"},
        hours = "24/7"
    }
})

if success then
    print("Global police station blip created")
end
```

### CreateJobBlip

Creates a blip visible only to players with specific jobs or ranks.

**Syntax:**
```lua
local success = exports.community_bridge:CreateJobBlip(blipData)
```

**Parameters:**
- `blipData` (table): Job-specific blip configuration
  - `job` (string): Required job name
  - `minGrade` (number): Minimum job grade (optional)
  - `maxGrade` (number): Maximum job grade (optional)
  - All other global blip parameters

**Returns:**
- `success` (boolean): Whether blip was created successfully

**Example:**
```lua
-- Create blip visible only to police officers grade 2 and above
local success = exports.community_bridge:CreateJobBlip({
    id = "police_armory",
    job = "police",
    minGrade = 2,
    coords = vector3(450.0, -980.0, 30.0),
    sprite = 110,
    color = 1,
    label = "Police Armory",
    category = "police_restricted",
    permanent = true,
    metadata = {
        access = "sergeant_plus",
        equipment = {"weapons", "armor", "tools"}
    }
})
```

### CreateGroupBlip

Creates a blip visible to specific player groups or organizations.

**Syntax:**
```lua
local success = exports.community_bridge:CreateGroupBlip(blipData)
```

**Parameters:**
- `blipData` (table): Group blip configuration
  - `groupId` (string): Group identifier
  - `members` (table): List of player identifiers
  - `groupType` (string): Type of group ("gang", "family", "business")
  - All other global blip parameters

**Returns:**
- `success` (boolean): Whether blip was created successfully

**Example:**
```lua
local success = exports.community_bridge:CreateGroupBlip({
    id = "gang_hideout_01",
    groupId = "ballas",
    groupType = "gang",
    members = {"player123", "player456", "player789"},
    coords = vector3(100.0, -1800.0, 27.0),
    sprite = 84,
    color = 5,
    label = "Ballas Territory",
    category = "gang",
    permanent = false,
    metadata = {
        territory = "south_ls",
        activities = {"meetings", "operations"}
    }
})
```

## Blip Synchronization

### UpdateGlobalBlip

Updates a global blip's properties and syncs to all clients.

**Syntax:**
```lua
local success = exports.community_bridge:UpdateGlobalBlip(blipId, updateData)
```

**Parameters:**
- `blipId` (string): Blip identifier
- `updateData` (table): Properties to update

**Returns:**
- `success` (boolean): Whether update was successful

**Example:**
```lua
-- Update blip to show it's currently closed
local success = exports.community_bridge:UpdateGlobalBlip("bank_central", {
    color = 1,        -- Change to red
    label = "Bank - CLOSED",
    flash = true,
    metadata = {
        status = "closed",
        reason = "maintenance",
        reopens = os.time() + 3600  -- 1 hour
    }
})
```

### RemoveGlobalBlip

Removes a global blip from all clients.

**Syntax:**
```lua
local success = exports.community_bridge:RemoveGlobalBlip(blipId)
```

**Parameters:**
- `blipId` (string): Blip identifier

**Returns:**
- `success` (boolean): Whether removal was successful

**Example:**
```lua
local success = exports.community_bridge:RemoveGlobalBlip("temporary_event_001")
if success then
    print("Temporary event blip removed")
end
```

### SyncBlipToPlayer

Synchronizes a specific blip to a player.

**Syntax:**
```lua
exports.community_bridge:SyncBlipToPlayer(playerId, blipData)
```

**Parameters:**
- `playerId` (string): Target player identifier
- `blipData` (table): Blip data to sync

**Example:**
```lua
-- Send personal blip to specific player
exports.community_bridge:SyncBlipToPlayer("player123", {
    id = "personal_objective",
    coords = vector3(200.0, 300.0, 28.0),
    sprite = 1,
    color = 6,
    label = "Your Mission Objective",
    category = "personal"
})
```

## Permission Management

### SetBlipPermissions

Sets or updates blip visibility permissions.

**Syntax:**
```lua
local success = exports.community_bridge:SetBlipPermissions(blipId, permissions)
```

**Parameters:**
- `blipId` (string): Blip identifier
- `permissions` (table): Permission configuration
  - `jobs` (table): Required jobs
  - `grades` (table): Grade requirements per job
  - `players` (table): Specific player identifiers
  - `groups` (table): Group identifiers
  - `conditions` (table): Custom conditions

**Returns:**
- `success` (boolean): Whether permissions were set

**Example:**
```lua
local success = exports.community_bridge:SetBlipPermissions("secret_facility", {
    jobs = {"police", "fbi"},
    grades = {
        police = {min = 4},    -- Lieutenant and above
        fbi = {min = 1}        -- Any FBI agent
    },
    conditions = {
        clearance = "high_security",
        time_restriction = {start = 6, end = 22}  -- 6 AM to 10 PM only
    }
})
```

### CheckBlipPermission

Checks if a player has permission to see a specific blip.

**Syntax:**
```lua
local hasPermission = exports.community_bridge:CheckBlipPermission(playerId, blipId)
```

**Parameters:**
- `playerId` (string): Player identifier
- `blipId` (string): Blip identifier

**Returns:**
- `hasPermission` (boolean): Whether player can see the blip

**Example:**
```lua
local hasPermission = exports.community_bridge:CheckBlipPermission("player123", "police_armory")
if hasPermission then
    exports.community_bridge:SyncBlipToPlayer("player123", armorBlipData)
else
    print("Player does not have permission to see armory blip")
end
```

## Dynamic Blip Systems

### CreateEventBlip

Creates a temporary blip for server events.

**Syntax:**
```lua
local blipId = exports.community_bridge:CreateEventBlip(eventData)
```

**Parameters:**
- `eventData` (table): Event blip configuration
  - `eventType` (string): Type of event
  - `duration` (number): Event duration in seconds
  - `participants` (table): Event participants
  - `startTime` (number): Event start timestamp
  - `autoRemove` (boolean): Auto-remove when event ends
  - All other blip parameters

**Returns:**
- `blipId` (string): Event blip identifier

**Example:**
```lua
local eventBlip = exports.community_bridge:CreateEventBlip({
    id = "racing_event_001",
    eventType = "racing",
    coords = vector3(500.0, 600.0, 28.0),
    sprite = 315,    -- Racing flag
    color = 6,       -- Yellow
    label = "Street Race - Starting Soon",
    category = "event",
    duration = 1800, -- 30 minutes
    startTime = os.time() + 300,  -- Starts in 5 minutes
    autoRemove = true,
    participants = {"player1", "player2", "player3"},
    metadata = {
        prize = 10000,
        laps = 3,
        vehicle_class = "sports"
    }
})
```

### CreateBusinessBlip

Creates a blip for businesses with operating hours and status.

**Syntax:**
```lua
local success = exports.community_bridge:CreateBusinessBlip(businessData)
```

**Parameters:**
- `businessData` (table): Business blip configuration
  - `businessId` (string): Business identifier
  - `ownerType` (string): "player" or "npc"
  - `ownerId` (string): Owner identifier
  - `hours` (table): Operating hours
  - `status` (string): Business status
  - All other blip parameters

**Returns:**
- `success` (boolean): Whether business blip was created

**Example:**
```lua
local success = exports.community_bridge:CreateBusinessBlip({
    id = "restaurant_001",
    businessId = "burgershot_downtown",
    ownerType = "player",
    ownerId = "player123",
    coords = vector3(150.0, 250.0, 28.0),
    sprite = 52,
    color = 2,
    label = "Burger Shot - OPEN",
    category = "restaurant",
    hours = {
        monday = {open = 6, close = 23},
        tuesday = {open = 6, close = 23},
        -- ... other days
    },
    status = "open",
    metadata = {
        cuisine = "fast_food",
        rating = 4.2,
        delivery = true
    }
})
```

## Blip Analytics

### TrackBlipInteraction

Tracks player interactions with blips for analytics.

**Syntax:**
```lua
exports.community_bridge:TrackBlipInteraction(playerId, blipId, interactionType)
```

**Parameters:**
- `playerId` (string): Player identifier
- `blipId` (string): Blip identifier
- `interactionType` (string): Type of interaction ("view", "route", "interact")

**Example:**
```lua
RegisterServerEvent('blip:playerInteraction')
AddEventHandler('blip:playerInteraction', function(blipId, interactionType)
    local src = source
    exports.community_bridge:TrackBlipInteraction(src, blipId, interactionType)
    
    -- Log for analytics
    print(string.format("Player %s %s with blip %s", src, interactionType, blipId))
end)
```

### GetBlipAnalytics

Retrieves analytics data for blip usage.

**Syntax:**
```lua
local analytics = exports.community_bridge:GetBlipAnalytics(blipId, timeRange)
```

**Parameters:**
- `blipId` (string): Blip identifier (optional, for all blips if nil)
- `timeRange` (table): Time range for analytics
  - `startTime` (number): Start timestamp
  - `endTime` (number): End timestamp

**Returns:**
- `analytics` (table): Analytics data
  - `views` (number): Number of times viewed
  - `routes` (number): Times used for routing
  - `interactions` (number): Direct interactions
  - `uniqueUsers` (number): Unique players who interacted

**Example:**
```lua
local analytics = exports.community_bridge:GetBlipAnalytics("hospital_central", {
    startTime = os.time() - (7 * 24 * 60 * 60),  -- Last 7 days
    endTime = os.time()
})

print("Hospital blip analytics:")
print("Views:", analytics.views)
print("Routes:", analytics.routes)
print("Unique users:", analytics.uniqueUsers)
```

## Administrative Functions

### GetAllBlips

Retrieves all server-managed blips.

**Syntax:**
```lua
local blips = exports.community_bridge:GetAllBlips(filters)
```

**Parameters:**
- `filters` (table): Filter criteria (optional)
  - `category` (string): Filter by category
  - `permanent` (boolean): Filter by persistence
  - `visible` (boolean): Filter by visibility

**Returns:**
- `blips` (table): List of blip data

**Example:**
```lua
-- Get all permanent blips
local permanentBlips = exports.community_bridge:GetAllBlips({
    permanent = true
})

for _, blip in ipairs(permanentBlips) do
    print("Permanent blip:", blip.id, blip.label)
end
```

### ExportBlipData

Exports blip data for backup or migration.

**Syntax:**
```lua
local exportData = exports.community_bridge:ExportBlipData(format)
```

**Parameters:**
- `format` (string): Export format ("json", "sql", "lua")

**Returns:**
- `exportData` (string): Exported data in specified format

**Example:**
```lua
local jsonData = exports.community_bridge:ExportBlipData("json")
-- Save to file or send to backup system
```

### ImportBlipData

Imports blip data from backup or migration.

**Syntax:**
```lua
local success = exports.community_bridge:ImportBlipData(importData, format, options)
```

**Parameters:**
- `importData` (string): Data to import
- `format` (string): Data format ("json", "sql", "lua")
- `options` (table): Import options
  - `overwrite` (boolean): Overwrite existing blips
  - `backup` (boolean): Create backup before import

**Returns:**
- `success` (boolean): Whether import was successful

**Example:**
```lua
local success = exports.community_bridge:ImportBlipData(backupData, "json", {
    overwrite = false,
    backup = true
})

if success then
    print("Blip data imported successfully")
end
```

## Best Practices

### Performance Optimization

```lua
-- Batch blip operations when possible
local function batchCreateBlips(blipList)
    local results = {}
    
    for _, blipData in ipairs(blipList) do
        local success = exports.community_bridge:CreateGlobalBlip(blipData)
        results[blipData.id] = success
    end
    
    return results
end
```

### Permission Caching

```lua
-- Cache permission checks to improve performance
local permissionCache = {}
local cacheExpiry = 60000 -- 1 minute

local function getCachedPermission(playerId, blipId)
    local key = playerId .. "_" .. blipId
    local cached = permissionCache[key]
    
    if cached and (GetGameTimer() - cached.timestamp) < cacheExpiry then
        return cached.hasPermission
    end
    
    local hasPermission = exports.community_bridge:CheckBlipPermission(playerId, blipId)
    permissionCache[key] = {
        hasPermission = hasPermission,
        timestamp = GetGameTimer()
    }
    
    return hasPermission
end
```

### Error Handling

```lua
-- Robust error handling for blip operations
local function safeCreateBlip(blipData)
    local success, error = pcall(exports.community_bridge.CreateGlobalBlip, blipData)
    
    if not success then
        print("Failed to create blip:", error)
        return false
    end
    
    return success
end
```

---

These server functions provide comprehensive blip management with synchronization, permissions, analytics, and administrative capabilities for robust server-wide blip systems.
