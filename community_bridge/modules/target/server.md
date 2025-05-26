---
layout: default
title: Server Functions
parent: Target
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 2
permalink: /community_bridge/modules/target/server/
---

# Target Module - Server Functions
{: .no_toc }

Server-side functions for managing target configurations and synchronization.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

Server-side target management allows for global target configurations and player-specific targeting systems.

---

## 🔹 RegisterGlobalTarget

Registers a target configuration that applies to all players.

**Parameters:**
- `config` (table): Global target configuration
  - `name` (string): Unique identifier
  - `models` (table, optional): Entity models to target
  - `coords` (table, optional): Coordinate-based targets
  - `zones` (table, optional): Zone-based targets
  - `options` (table): Target interaction options

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register ATM targets for all players
Bridge.Target.RegisterGlobalTarget({
    name = "atm_targets",
    models = {"prop_atm_01", "prop_atm_02", "prop_atm_03"},
    options = {
        {
            name = "use_atm",
            icon = "fas fa-credit-card",
            label = "Use ATM",
            serverEvent = "banking:useATM"
        }
    }
})
```

---

## 🔹 RegisterPlayerTarget

Registers a target configuration for a specific player.

**Parameters:**
- `playerId` (number): Player's server ID
- `config` (table): Target configuration (same as RegisterGlobalTarget)

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Job-specific targets for police officers
local function SetupPoliceTargets(playerId)
    Bridge.Target.RegisterPlayerTarget(playerId, {
        name = "police_targets",
        models = {"s_m_y_cop_01", "s_f_y_cop_01"},
        options = {
            {
                name = "request_backup",
                icon = "fas fa-shield-alt",
                label = "Request Backup",
                serverEvent = "police:requestBackup"
            },
            {
                name = "access_mdt",
                icon = "fas fa-laptop",
                label = "Access MDT",
                serverEvent = "police:openMDT"
            }
        }
    })
end

-- Apply when player gets police job
RegisterNetEvent('job:setJob', function(job)
    local playerId = source
    if job == "police" then
        SetupPoliceTargets(playerId)
    else
        Bridge.Target.RemovePlayerTargets(playerId, "police_targets")
    end
end)
```

---

## 🔹 UpdateTargetConfig

Updates an existing target configuration.

**Parameters:**
- `name` (string): Target configuration name
- `config` (table): Updated configuration

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Update shop hours
Bridge.Target.UpdateTargetConfig("general_store", {
    options = {
        {
            name = "shop",
            icon = "fas fa-store",
            label = function()
                local hour = os.date("%H")
                if hour >= "08" and hour < "22" then
                    return "Open Store"
                else
                    return "Closed"
                end
            end,
            canInteract = function()
                local hour = os.date("%H")
                return hour >= "08" and hour < "22"
            end,
            serverEvent = "shop:open"
        }
    }
})
```

---

## 📚 Synchronization Functions

### `Bridge.Target.SyncTargetToPlayer(playerId, name)`

Synchronizes a target configuration to a specific player.

**Parameters:**
- `playerId` (number): Player's server ID
- `name` (string): Target configuration name

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Sync new business targets when player becomes owner
RegisterNetEvent('business:setOwner', function(businessId)
    local playerId = source
    Bridge.Target.SyncTargetToPlayer(playerId, "business_" .. businessId)
end)
```

### `Bridge.Target.SyncTargetToAll(name)`

Synchronizes a target configuration to all online players.

**Parameters:**
- `name` (string): Target configuration name

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Sync new event targets to all players
RegisterNetEvent('event:start', function(eventType)
    local eventTargets = Config.EventTargets[eventType]
    if eventTargets then
        Bridge.Target.RegisterGlobalTarget(eventTargets)
        Bridge.Target.SyncTargetToAll("event_" .. eventType)
    end
end)
```

### `Bridge.Target.RemovePlayerTargets(playerId, name)`

Removes target configuration from a specific player.

**Parameters:**
- `playerId` (number): Player's server ID  
- `name` (string, optional): Specific target name to remove

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Remove job targets when player quits job
RegisterNetEvent('job:quitJob', function(oldJob)
    local playerId = source
    Bridge.Target.RemovePlayerTargets(playerId, oldJob .. "_targets")
end)
```

## Dynamic Target Creation

### `Bridge.Target.CreateDynamicTarget(config)`

Creates a target that can be dynamically modified.

**Parameters:**
- `config` (table): Dynamic target configuration
  - `name` (string): Unique identifier
  - `updateInterval` (number, optional): Update frequency in ms
  - `generator` (function): Function that generates target options

**Returns:**
- `string`: Dynamic target ID

**Example:**
```lua
-- Dynamic shop target that changes based on stock
local function GenerateShopTarget()
    local stock = GetShopStock("general_store")
    
    if stock > 0 then
        return {
            name = "shop",
            icon = "fas fa-store",
            label = "Browse Store (" .. stock .. " items)",
            serverEvent = "shop:browse"
        }
    else
        return {
            name = "shop",
            icon = "fas fa-store",
            label = "Store Closed (Out of Stock)",
            canInteract = false
        }
    end
end

Bridge.Target.CreateDynamicTarget({
    name = "dynamic_shop",
    updateInterval = 30000, -- 30 seconds
    coords = vector3(25.0, -1347.0, 29.0),
    generator = GenerateShopTarget
})
```

## Event-Driven Targets

### `Bridge.Target.CreateEventTarget(eventName, config)`

Creates targets that respond to specific events.

**Parameters:**
- `eventName` (string): Event name to listen for
- `config` (table): Target configuration with event handlers

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Target that appears during robberies
Bridge.Target.CreateEventTarget("robbery:start", {
    name = "robbery_escape",
    coords = vector3(150.0, -1040.0, 29.0),
    options = {
        {
            name = "escape_route",
            icon = "fas fa-running",
            label = "Escape Route",
            serverEvent = "robbery:useEscape"
        }
    },
    duration = 300000, -- 5 minutes
    onExpire = function()
        Bridge.Target.RemoveGlobalTarget("robbery_escape")
    end
})
```

## Permission Management

### `Bridge.Target.SetTargetPermission(name, permission)`

Sets permission requirements for a target.

**Parameters:**
- `name` (string): Target configuration name
- `permission` (string|function): Permission requirement

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Require admin permission for admin targets
Bridge.Target.SetTargetPermission("admin_panel", function(playerId)
    return Bridge.Target.HasPermission(playerId, "admin.panel")
end)

-- Simple job requirement
Bridge.Target.SetTargetPermission("mechanic_tools", "job.mechanic")
```

### `Bridge.Target.CheckTargetPermission(playerId, targetName)`

Checks if a player has permission for a target.

**Parameters:**
- `playerId` (number): Player's server ID
- `targetName` (string): Target name

**Returns:**
- `boolean`: True if player has permission

**Example:**
```lua
RegisterNetEvent('target:interact', function(targetName, optionName)
    local playerId = source
    
    if not Bridge.Target.CheckTargetPermission(playerId, targetName) then
        Bridge.Target.SendNotify(playerId, "Access denied", "error")
        return
    end
    
    -- Process interaction
    HandleTargetInteraction(playerId, targetName, optionName)
end)
```

## Configuration Functions

### `Bridge.Target.SetGlobalTargetConfig(config)`

Sets global configuration for the target system.

**Parameters:**
- `config` (table): Global configuration options

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Target.SetGlobalTargetConfig({
    defaultDistance = 3.0,
    enableOutlines = true,
    maxTargetsPerEntity = 5,
    updateInterval = 100,
    enableDebug = false
})
```

### `Bridge.Target.GetTargetConfig(name)`

Gets configuration for a specific target.

**Parameters:**
- `name` (string): Target configuration name

**Returns:**
- `table|nil`: Target configuration or nil if not found

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local config = Bridge.Target.GetTargetConfig("atm_targets")
if config then
    print("ATM targets found with", #config.options, "options")
end
```

## Analytics and Monitoring

### `Bridge.Target.LogTargetInteraction(playerId, targetName, option)`

Logs target interactions for analytics.

**Parameters:**
- `playerId` (number): Player's server ID
- `targetName` (string): Target name
- `option` (string): Selected option

**Example:**
```lua
RegisterNetEvent('target:used', function(targetName, optionName)
    local playerId = source
    Bridge.Target.LogTargetInteraction(playerId, targetName, optionName)
end)
```

### `Bridge.Target.GetTargetStats(targetName, timeframe)`

Gets usage statistics for a target.

**Parameters:**
- `targetName` (string): Target name
- `timeframe` (string): Time period ("hour", "day", "week", "month")

**Returns:**
- `table`: Statistics data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local stats = Bridge.Target.GetTargetStats("atm_targets", "day")
print("ATM used", stats.totalInteractions, "times today")
print("Most popular ATM:", stats.mostUsedLocation)
```

## Event Handlers

### Server Events

```lua
-- Player connected - sync all global targets
AddEventHandler('playerConnecting', function()
    local playerId = source
    Bridge.Target.SyncAllGlobalTargets(playerId)
end)

-- Clean up player-specific targets on disconnect
AddEventHandler('playerDropped', function()
    local playerId = source
    Bridge.Target.CleanupPlayerTargets(playerId)
end)

-- Target system events
RegisterNetEvent('community_bridge:targetInteraction', function(targetName, optionName, data)
    local playerId = source
    
    -- Log interaction
    Bridge.Target.LogTargetInteraction(playerId, targetName, optionName)
    
    -- Handle specific targets
    if targetName == "vehicle_dealership" then
        HandleVehiclePurchase(playerId, data)
    elseif targetName == "job_center" then
        HandleJobApplication(playerId, data)
    end
end)
```

## Advanced Examples

### Dynamic Business Targets

```lua
-- Create targets for player businesses
RegisterNetEvent('business:purchased', function(businessData)
    local playerId = source
    
    -- Create management targets for owner
    Bridge.Target.RegisterPlayerTarget(playerId, {
        name = "business_" .. businessData.id,
        coords = {businessData.coords},
        options = {
            {
                name = "manage",
                icon = "fas fa-cog",
                label = "Manage Business",
                serverEvent = "business:openManagement",
                data = {businessId = businessData.id}
            },
            {
                name = "collect_earnings",
                icon = "fas fa-money-bill",
                label = "Collect Earnings",
                serverEvent = "business:collectEarnings",
                data = {businessId = businessData.id}
            }
        }
    })
    
    -- Create customer targets for everyone else
    Bridge.Target.RegisterGlobalTarget({
        name = "business_customer_" .. businessData.id,
        coords = {businessData.coords},
        options = {
            {
                name = "enter",
                icon = "fas fa-door-open",
                label = "Enter " .. businessData.name,
                serverEvent = "business:enter",
                data = {businessId = businessData.id}
            }
        }
    })
end)
```

### Conditional Target System

```lua
-- Create targets that change based on conditions
local function UpdateHeistTargets()
    local activeHeist = GetActiveHeist()
    
    if activeHeist then
        -- Add heist-specific targets
        for _, location in pairs(activeHeist.locations) do
            Bridge.Target.RegisterGlobalTarget({
                name = "heist_" .. location.id,
                coords = {location.coords},
                options = {
                    {
                        name = "hack",
                        icon = "fas fa-laptop",
                        label = "Hack System",
                        serverEvent = "heist:hack",
                        data = {locationId = location.id}
                    }
                }
            })
        end
    else
        -- Remove heist targets
        Bridge.Target.RemoveGlobalTargets("heist_*")
    end
end

-- Update targets when heist status changes
RegisterNetEvent('heist:statusChanged', UpdateHeistTargets)
```

## Best Practices

### Performance Guidelines

1. **Batch updates** - Group target modifications together
2. **Efficient conditions** - Use lightweight permission checks
3. **Clean up unused targets** - Remove targets when no longer needed
4. **Limit dynamic updates** - Don't update targets too frequently

### Security Considerations

1. **Validate permissions** - Always check player access rights
2. **Sanitize data** - Validate all target configuration data
3. **Rate limiting** - Prevent target interaction spam
4. **Audit logging** - Log important target interactions

### Code Organization

```lua
-- Organize targets by category
local TargetManager = {
    jobs = {},
    businesses = {},
    events = {},
    admin = {}
}

function TargetManager:RegisterJobTargets(job, targets)
    self.jobs[job] = targets
    Bridge.Target.RegisterGlobalTarget(targets)
end

function TargetManager:CleanupJobTargets(job)
    if self.jobs[job] then
        Bridge.Target.RemoveGlobalTarget(self.jobs[job].name)
        self.jobs[job] = nil
    end
end
```
