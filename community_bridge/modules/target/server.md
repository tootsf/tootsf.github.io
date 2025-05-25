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

## Target Management Functions

### `exports.community_bridge:RegisterGlobalTarget(config)`

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
-- Register ATM targets for all players
exports.community_bridge:RegisterGlobalTarget({
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

### `exports.community_bridge:RegisterPlayerTarget(playerId, config)`

Registers a target configuration for a specific player.

**Parameters:**
- `playerId` (number): Player's server ID
- `config` (table): Target configuration (same as RegisterGlobalTarget)

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Job-specific targets for police officers
local function SetupPoliceTargets(playerId)
    exports.community_bridge:RegisterPlayerTarget(playerId, {
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
        exports.community_bridge:RemovePlayerTargets(playerId, "police_targets")
    end
end)
```

### `exports.community_bridge:UpdateTargetConfig(name, config)`

Updates an existing target configuration.

**Parameters:**
- `name` (string): Target configuration name
- `config` (table): Updated configuration

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Update shop hours
exports.community_bridge:UpdateTargetConfig("general_store", {
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

## Synchronization Functions

### `exports.community_bridge:SyncTargetToPlayer(playerId, name)`

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
    exports.community_bridge:SyncTargetToPlayer(playerId, "business_" .. businessId)
end)
```

### `exports.community_bridge:SyncTargetToAll(name)`

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
        exports.community_bridge:RegisterGlobalTarget(eventTargets)
        exports.community_bridge:SyncTargetToAll("event_" .. eventType)
    end
end)
```

### `exports.community_bridge:RemovePlayerTargets(playerId, name)`

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
    exports.community_bridge:RemovePlayerTargets(playerId, oldJob .. "_targets")
end)
```

## Dynamic Target Creation

### `exports.community_bridge:CreateDynamicTarget(config)`

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

exports.community_bridge:CreateDynamicTarget({
    name = "dynamic_shop",
    updateInterval = 30000, -- 30 seconds
    coords = vector3(25.0, -1347.0, 29.0),
    generator = GenerateShopTarget
})
```

## Event-Driven Targets

### `exports.community_bridge:CreateEventTarget(eventName, config)`

Creates targets that respond to specific events.

**Parameters:**
- `eventName` (string): Event name to listen for
- `config` (table): Target configuration with event handlers

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Target that appears during robberies
exports.community_bridge:CreateEventTarget("robbery:start", {
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
        exports.community_bridge:RemoveGlobalTarget("robbery_escape")
    end
})
```

## Permission Management

### `exports.community_bridge:SetTargetPermission(name, permission)`

Sets permission requirements for a target.

**Parameters:**
- `name` (string): Target configuration name
- `permission` (string|function): Permission requirement

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Require admin permission for admin targets
exports.community_bridge:SetTargetPermission("admin_panel", function(playerId)
    return exports.community_bridge:HasPermission(playerId, "admin.panel")
end)

-- Simple job requirement
exports.community_bridge:SetTargetPermission("mechanic_tools", "job.mechanic")
```

### `exports.community_bridge:CheckTargetPermission(playerId, targetName)`

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
    
    if not exports.community_bridge:CheckTargetPermission(playerId, targetName) then
        exports.community_bridge:SendNotify(playerId, "Access denied", "error")
        return
    end
    
    -- Process interaction
    HandleTargetInteraction(playerId, targetName, optionName)
end)
```

## Configuration Functions

### `exports.community_bridge:SetGlobalTargetConfig(config)`

Sets global configuration for the target system.

**Parameters:**
- `config` (table): Global configuration options

**Example:**
```lua
exports.community_bridge:SetGlobalTargetConfig({
    defaultDistance = 3.0,
    enableOutlines = true,
    maxTargetsPerEntity = 5,
    updateInterval = 100,
    enableDebug = false
})
```

### `exports.community_bridge:GetTargetConfig(name)`

Gets configuration for a specific target.

**Parameters:**
- `name` (string): Target configuration name

**Returns:**
- `table|nil`: Target configuration or nil if not found

**Example:**
```lua
local config = exports.community_bridge:GetTargetConfig("atm_targets")
if config then
    print("ATM targets found with", #config.options, "options")
end
```

## Analytics and Monitoring

### `exports.community_bridge:LogTargetInteraction(playerId, targetName, option)`

Logs target interactions for analytics.

**Parameters:**
- `playerId` (number): Player's server ID
- `targetName` (string): Target name
- `option` (string): Selected option

**Example:**
```lua
RegisterNetEvent('target:used', function(targetName, optionName)
    local playerId = source
    exports.community_bridge:LogTargetInteraction(playerId, targetName, optionName)
end)
```

### `exports.community_bridge:GetTargetStats(targetName, timeframe)`

Gets usage statistics for a target.

**Parameters:**
- `targetName` (string): Target name
- `timeframe` (string): Time period ("hour", "day", "week", "month")

**Returns:**
- `table`: Statistics data

**Example:**
```lua
local stats = exports.community_bridge:GetTargetStats("atm_targets", "day")
print("ATM used", stats.totalInteractions, "times today")
print("Most popular ATM:", stats.mostUsedLocation)
```

## Event Handlers

### Server Events

```lua
-- Player connected - sync all global targets
AddEventHandler('playerConnecting', function()
    local playerId = source
    exports.community_bridge:SyncAllGlobalTargets(playerId)
end)

-- Clean up player-specific targets on disconnect
AddEventHandler('playerDropped', function()
    local playerId = source
    exports.community_bridge:CleanupPlayerTargets(playerId)
end)

-- Target system events
RegisterNetEvent('community_bridge:targetInteraction', function(targetName, optionName, data)
    local playerId = source
    
    -- Log interaction
    exports.community_bridge:LogTargetInteraction(playerId, targetName, optionName)
    
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
    exports.community_bridge:RegisterPlayerTarget(playerId, {
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
    exports.community_bridge:RegisterGlobalTarget({
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
            exports.community_bridge:RegisterGlobalTarget({
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
        exports.community_bridge:RemoveGlobalTargets("heist_*")
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
    exports.community_bridge:RegisterGlobalTarget(targets)
end

function TargetManager:CleanupJobTargets(job)
    if self.jobs[job] then
        exports.community_bridge:RemoveGlobalTarget(self.jobs[job].name)
        self.jobs[job] = nil
    end
end
```
