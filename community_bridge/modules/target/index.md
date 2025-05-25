---
layout: default
title: Target
parent: Modules
grand_parent: Community Bridge
nav_order: 5
has_children: true
permalink: /community_bridge/modules/target/
---

# Target Module
{: .no_toc }

The Target module provides a unified API for targeting systems, allowing players to interact with entities, NPCs, and objects through contextual menus.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

This module standardizes targeting interactions across various targeting resources, providing consistent functionality for player-entity interactions regardless of which targeting system your server uses.

## Supported Targeting Systems

- **ox_target** - Modern targeting with raycast precision
- **qb-target** - QBCore's targeting system
- **bt-target** - BT targeting compatibility
- **qtarget** - qTarget integration
- **Custom Systems** - Extensible for custom targeting implementations

## Key Features

- **Entity Targeting** - Target vehicles, NPCs, and objects
- **Zone Targeting** - Create invisible interaction zones
- **Distance Control** - Configurable interaction distances
- **Rich Interactions** - Icons, labels, and conditional options
- **Performance Optimized** - Efficient targeting detection
- **Multi-framework** - Works across different frameworks

## Quick Start

```lua
-- Client-side example: Add targeting to all vehicles
exports.community_bridge:AddTargetModel(GetHashKey('adder'), {
    name = "vehicle_interaction",
    icon = "fas fa-car",
    label = "Vehicle Options",
    distance = 3.0,
    action = function(entity)
        -- Open vehicle interaction menu
        local options = {
            title = "Vehicle Options",
            options = {
                {
                    title = "Lock/Unlock",
                    icon = "fas fa-lock",
                    onSelect = function()
                        TriggerServerEvent('vehicle:toggleLock', NetworkGetNetworkIdFromEntity(entity))
                    end
                },
                {
                    title = "Engine On/Off", 
                    icon = "fas fa-power-off",
                    onSelect = function()
                        TriggerServerEvent('vehicle:toggleEngine', NetworkGetNetworkIdFromEntity(entity))
                    end
                }
            }
        }
        exports.community_bridge:OpenContextMenu(options)
    end,
    canInteract = function(entity)
        -- Only show if player is near driver door
        local playerPos = GetEntityCoords(PlayerPedId())
        local vehiclePos = GetEntityCoords(entity)
        return #(playerPos - vehiclePos) <= 3.0
    end
})
```

```lua
-- Server-side example: Handle vehicle interactions
RegisterNetEvent('vehicle:toggleLock', function(netId)
    local vehicle = NetworkGetEntityFromNetworkId(netId)
    local playerId = source
    
    if exports.community_bridge:IsVehicleOwner(playerId, vehicle) then
        local currentState = GetVehicleDoorLockStatus(vehicle)
        local newState = currentState == 1 and 2 or 1
        
        SetVehicleDoorsLocked(vehicle, newState)
        exports.community_bridge:SendNotify(playerId, 
            newState == 2 and "Vehicle locked" or "Vehicle unlocked", 
            "success"
        )
    else
        exports.community_bridge:SendNotify(playerId, "You don't own this vehicle", "error")
    end
end)
```

## Module Structure

### Client Functions
- **Entity Targeting** - Add targets to specific entities
- **Model Targeting** - Target all entities of specific models
- **Zone Targeting** - Create coordinate-based interaction zones
- **Management** - Add, remove, and update target configurations
- **Utility Functions** - Distance checks, entity validation, state management

### Server Functions
- **Global Targets** - Register targets for all players
- **Player Targets** - Set targets for specific players
- **Synchronization** - Sync target configurations across clients
- **Permission Management** - Control target access based on roles
- **Analytics** - Track target usage and interactions

### Shared Functions
- **Validation** - Target configuration validation
- **Templates** - Pre-built target setups for common scenarios
- **Utilities** - Distance calculations, entity checks, formatting
- **Configuration** - Standard icons, labels, and option structures

## Navigation

<div class="code-example" markdown="1">
### Quick Links
{: .no_toc }

- [Client Functions](client/) - Entity targeting and interaction management
- [Server Functions](server/) - Global targets and synchronization
- [Shared Functions](shared/) - Utilities and templates
</div>

## Integration Examples

### ATM Targeting System

```lua
-- Client: Add ATM targets
local atmModels = {
    "prop_atm_01", 
    "prop_atm_02", 
    "prop_atm_03"
}

exports.community_bridge:AddTargetModel(atmModels, {
    name = "use_atm",
    icon = "fas fa-credit-card", 
    label = "Use ATM",
    distance = 1.5,
    action = function(entity)
        -- Trigger banking interface
        TriggerEvent('banking:openATM')
    end,
    canInteract = function(entity)
        -- Don't allow if player is in vehicle
        return not IsPedInAnyVehicle(PlayerPedId(), false)
    end
})

-- Server: Handle ATM usage
RegisterNetEvent('banking:useATM', function()
    local playerId = source
    local playerData = exports.community_bridge:GetPlayerData(playerId)
    
    -- Send banking data to client
    TriggerClientEvent('banking:openInterface', playerId, {
        accounts = playerData.accounts,
        cards = playerData.cards
    })
end)
```

### Dynamic Business Targets

```lua
-- Create targets for player-owned businesses
RegisterNetEvent('business:created', function(businessData)
    local playerId = source
    
    -- Owner targets
    exports.community_bridge:RegisterPlayerTarget(playerId, {
        name = "business_owner_" .. businessData.id,
        coords = businessData.coords,
        options = {
            {
                name = "manage",
                icon = "fas fa-cog",
                label = "Manage Business",
                serverEvent = "business:openManagement"
            },
            {
                name = "collect",
                icon = "fas fa-money-bill",
                label = "Collect Earnings",
                serverEvent = "business:collectEarnings"
            }
        }
    })
    
    -- Customer targets (everyone else)
    exports.community_bridge:RegisterGlobalTarget({
        name = "business_customer_" .. businessData.id,
        coords = businessData.coords,
        options = {
            {
                name = "shop",
                icon = "fas fa-store",
                label = "Browse " .. businessData.name,
                serverEvent = "business:openShop",
                data = {businessId = businessData.id}
            }
        }
    })
end)
```

### Job-Specific Targeting

```lua
-- Police-only targets
local function SetupPoliceTargets(playerId)
    exports.community_bridge:RegisterPlayerTarget(playerId, {
        name = "police_station",
        coords = vector3(441.0, -982.0, 30.0),
        options = {
            {
                name = "duty",
                icon = "fas fa-badge",
                label = "Go On/Off Duty",
                serverEvent = "police:toggleDuty"
            },
            {
                name = "armory",
                icon = "fas fa-gun",
                label = "Access Armory",
                serverEvent = "police:openArmory",
                canInteract = function()
                    return exports.community_bridge:IsOnDuty(PlayerId())
                end
            },
            {
                name = "vehicles",
                icon = "fas fa-car",
                label = "Police Vehicles",
                serverEvent = "police:openGarage"
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
        exports.community_bridge:RemovePlayerTargets(playerId, "police_station")
    end
end)
```

### Conditional Zone Targeting

```lua
-- Heist location that only appears during active heist
RegisterNetEvent('heist:start', function(heistId)
    local heistData = Config.Heists[heistId]
    
    for i, location in pairs(heistData.locations) do
        exports.community_bridge:RegisterGlobalTarget({
            name = "heist_" .. heistId .. "_" .. i,
            coords = location.coords,
            size = vector3(2.0, 2.0, 2.0),
            options = {
                {
                    name = "hack",
                    icon = "fas fa-laptop",
                    label = "Hack Terminal",
                    serverEvent = "heist:hackTerminal",
                    data = {heistId = heistId, locationId = i}
                }
            },
            duration = heistData.duration, -- Auto-remove after time
            canInteract = function()
                return exports.community_bridge:IsHeistMember(PlayerId(), heistId)
            end
        })
    end
end)

RegisterNetEvent('heist:end', function(heistId)
    -- Clean up heist targets
    exports.community_bridge:RemoveGlobalTargets("heist_" .. heistId .. "_*")
end)
```

## Configuration

Configure the targeting system through your resource:

```lua
Config.Target = {
    -- System settings
    system = "ox_target", -- Which targeting system to use
    defaultDistance = 2.0,
    enableOutlines = true,
    
    -- Visual settings
    style = {
        backgroundColor = "rgba(0, 0, 0, 0.8)",
        textColor = "#ffffff",
        iconColor = "#00aaff",
        borderColor = "#ffffff"
    },
    
    -- Performance settings
    updateInterval = 100, -- ms
    maxTargetsPerEntity = 10,
    enableDebug = false
}
```

## Common Use Cases

### Shops and Vendors

```lua
-- Generic shop targeting
exports.community_bridge:AddTargetCoords(vector3(25.0, -1347.0, 29.0), {
    name = "general_store",
    icon = "fas fa-store",
    label = "General Store",
    distance = 2.0,
    action = function()
        TriggerEvent('shop:open', 'general')
    end
})
```

### Vehicle Interactions

```lua
-- Fuel pump targeting
exports.community_bridge:AddTargetModel("prop_gas_pump_1a", {
    name = "fuel_pump",
    icon = "fas fa-gas-pump",
    label = "Refuel Vehicle",
    action = function(entity)
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        if vehicle ~= 0 then
            TriggerEvent('fuel:startRefueling', vehicle)
        end
    end,
    canInteract = function()
        return IsPedInAnyVehicle(PlayerPedId(), false)
    end
})
```

### NPC Interactions

```lua
-- Job NPC targeting
exports.community_bridge:AddTargetEntity(npcPed, {
    name = "job_npc",
    icon = "fas fa-briefcase", 
    label = "Apply for Job",
    distance = 2.0,
    action = function(entity)
        TriggerEvent('jobs:openApplication')
    end
})
```
            label = "Check Engine",
            icon = "fas fa-wrench",
            action = function(entity)
                local plate = GetVehicleNumberPlateText(entity)
                TriggerServerEvent('mechanic:checkEngine', plate)
            end,
            canInteract = function(entity)
                return IsVehicleEngineOn(entity)
            end
        },
        {
            label = "Lock/Unlock",
            icon = "fas fa-key",
            action = function(entity)
                TriggerEvent('vehiclekeys:toggle', entity)
            end
        }
    },
    distance = 2.0
})
```

## Targeting Types

### Entity Targeting
Target specific entities by model or type:

```lua
-- Target specific vehicle models
Target.AddTargetModel({'adder', 'zentorno'}, {
    options = {
        {
            label = "Steal Supercar",
            icon = "fas fa-mask",
            action = function(entity)
                TriggerEvent('carjack:start', entity)
            end,
            job = "criminal"
        }
    }
})
```

### Zone Targeting
Create invisible interaction zones:

```lua
-- Create a zone for a shop
Target.AddBoxZone("general_store", vector3(25.7, -1347.3, 29.49), 2.0, 2.0, {
    name = "general_store",
    heading = 0,
    debugPoly = false,
    minZ = 28.49,
    maxZ = 32.49
}, {
    options = {
        {
            label = "Browse Store",
            icon = "fas fa-shopping-cart",
            action = function()
                TriggerEvent('shop:open', 'general')
            end
        }
    },
    distance = 2.0
})
```

### NPC Targeting
Add interactions to NPCs:

```lua
-- Target all NPCs with job restrictions
Target.AddTargetModel({'s_m_y_cop_01'}, {
    options = {
        {
            label = "Show Badge",
            icon = "fas fa-badge",
            action = function(entity)
                TriggerServerEvent('police:showBadge')
            end,
            job = "police"
        }
    }
})
```

## Module Structure

- **[Server Functions](server/)** - Server-side target validation and events
- **[Client Functions](client/)** - Client-side targeting and interaction management
- **[Shared Functions](shared/)** - Utilities and configuration options

---

## Advanced Features

### Conditional Interactions
```lua
Target.AddTargetEntity(entity, {
    options = {
        {
            label = "Repair Vehicle",
            icon = "fas fa-tools",
            action = function(entity)
                TriggerEvent('mechanic:repair', entity)
            end,
            canInteract = function(entity)
                local health = GetEntityHealth(entity)
                return health < 1000 -- Only show if damaged
            end,
            job = "mechanic",
            item = "repair_kit"
        }
    }
})
```

### Dynamic Options
```lua
Target.AddTargetModel({'vehicle'}, {
    options = function(entity)
        local options = {}
        
        if IsVehicleLocked(entity) then
            table.insert(options, {
                label = "Unlock Vehicle",
                icon = "fas fa-unlock",
                action = function() TriggerEvent('lockpick:start', entity) end
            })
        else
            table.insert(options, {
                label = "Lock Vehicle", 
                icon = "fas fa-lock",
                action = function() TriggerEvent('vehicle:lock', entity) end
            })
        end
        
        return options
    end
})
```

## Configuration

### Global Settings
```lua
Target.SetGlobalOptions({
    defaultDistance = 2.0,
    debugMode = false,
    enableOutline = true,
    outlineColor = {255, 255, 255}
})
```

### Performance Optimization
```lua
-- Disable targeting in certain areas for performance
Target.AddDisabledZone("airport", vector3(-1037.0, -2737.0, 20.0), 500.0)
```
