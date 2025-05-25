---
layout: default
title: Client Functions
parent: Framework
grand_parent: Modules
nav_order: 2
---

# Framework Client Functions
{: .no_toc }

Client-side functions for framework integration and player data management.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Most framework operations are handled server-side for security and data integrity. However, the client-side provides some utility functions and event handlers for UI updates and local player data management.

## Player Data

### GetLocalPlayerData
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Framework.GetLocalPlayerData()
```

Returns cached local player data (if available).

**Returns:** 
- `table|nil` - Player data or nil if not cached

**Example:**
```lua
local playerData = Framework.GetLocalPlayerData()
if playerData then
    print("Local player job: " .. playerData.job.name)
end
```

---

### RefreshPlayerData
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
Framework.RefreshPlayerData()
```

Requests updated player data from the server.

**Example:**
```lua
-- After a job change or other significant update
Framework.RefreshPlayerData()
```

---

## Events

### Framework Data Updates

The client automatically receives updates when player data changes on the server.

**framework:updatePlayerData**
```lua
RegisterNetEvent('framework:updatePlayerData')
AddEventHandler('framework:updatePlayerData', function(playerData)
    -- Handle updated player data
    print("Player data updated:", json.encode(playerData))
end)
```

**framework:updateMoney**
```lua
RegisterNetEvent('framework:updateMoney')
AddEventHandler('framework:updateMoney', function(money)
    -- Handle money updates for UI
    SendNUIMessage({
        type = "updateMoney",
        money = money
    })
end)
```

**framework:updateJob**
```lua
RegisterNetEvent('framework:updateJob')
AddEventHandler('framework:updateJob', function(job)
    -- Handle job updates
    print("New job: " .. job.name .. " (Grade: " .. job.grade .. ")")
end)
```

---

## Integration Examples

### UI Integration
```lua
-- Update HUD with player data
RegisterNetEvent('framework:playerLoaded')
AddEventHandler('framework:playerLoaded', function(playerData)
    SendNUIMessage({
        type = "playerLoaded",
        data = {
            name = playerData.name,
            job = playerData.job,
            money = playerData.money
        }
    })
end)
```

### Framework-Specific Events
```lua
-- ESX compatibility
if GetResourceState('es_extended') == 'started' then
    RegisterNetEvent('esx:playerLoaded')
    AddEventHandler('esx:playerLoaded', function(playerData)
        Framework.RefreshPlayerData()
    end)
end

-- QBCore compatibility
if GetResourceState('qb-core') == 'started' then
    RegisterNetEvent('QBCore:Client:OnPlayerLoaded')
    AddEventHandler('QBCore:Client:OnPlayerLoaded', function()
        Framework.RefreshPlayerData()
    end)
end
```

---

## Best Practices

### Data Synchronization
Always use server-side functions for authoritative data:

```lua
-- ❌ Don't rely on cached client data for important operations
local clientMoney = Framework.GetLocalPlayerData().money

-- ✅ Request server verification for important operations
TriggerServerEvent('framework:requestMoneyCheck', amount)
```

### Event Handling
Set up event handlers early in your resource startup:

```lua
Citizen.CreateThread(function()
    while not Framework.IsPlayerLoaded() do
        Citizen.Wait(100)
    end
    
    -- Player is loaded, safe to use framework functions
    local playerData = Framework.GetLocalPlayerData()
    -- Initialize UI or other systems
end)
```
