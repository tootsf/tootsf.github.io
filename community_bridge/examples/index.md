---
layout: default
title: Examples & Tutorials
parent: Community Bridge
nav_order: 3
has_children: true
permalink: /community_bridge/examples/
---

# Examples & Tutorials
{: .no_toc }

Practical examples and tutorials for using Community Bridge modules in real-world scenarios.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Getting Started Examples

### Basic Shop System
Learn how to create a simple shop using multiple Community Bridge modules:

```lua
-- Server-side shop handler
RegisterNetEvent('shop:buyItem')
AddEventHandler('shop:buyItem', function(itemName, quantity)
    local playerId = source
    local Bridge = exports['community_bridge']:Bridge()
    
    -- Get item info and calculate cost
    local itemInfo = Bridge.Inventory.GetItemInfo(itemName)
    if not itemInfo then
        Bridge.Notify.SendNotify(playerId, "Item not found!", "error")
        return
    end
    
    local totalCost = itemInfo.price * quantity
    local playerMoney = Bridge.Framework.GetMoney(playerId)
    
    -- Check if player has enough money
    if playerMoney >= totalCost then
        -- Remove money and add item
        if Bridge.Framework.RemoveMoney(playerId, totalCost) then
            if Bridge.Inventory.AddItem(playerId, itemName, quantity) then
                Bridge.Notify.SendNotify(playerId, 
                    string.format("Purchased %dx %s for $%d", 
                    quantity, itemInfo.label, totalCost), "success")
            else
                -- Refund if inventory full
                Bridge.Framework.AddMoney(playerId, totalCost)
                Bridge.Notify.SendNotify(playerId, "Inventory full!", "error")
            end
        end
    else
        Bridge.Notify.SendNotify(playerId, "Insufficient funds!", "error")
    end
end)
```

### Interactive Targeting
Create rich targeting interactions:

```lua
-- Client-side targeting setup
Citizen.CreateThread(function()
    local Bridge = exports['community_bridge']:Bridge()
    
    -- Add targeting to all ATMs
    Bridge.Target.AddTargetModel({'prop_atm_01', 'prop_atm_02', 'prop_atm_03'}, {
        options = {
            {
                label = "Use ATM",
                icon = "fas fa-credit-card",
                action = function(entity)
                    TriggerServerEvent('bank:openATM')
                end
            },
            {
                label = "Check Balance",
                icon = "fas fa-eye",
                action = function(entity)
                    TriggerServerEvent('bank:checkBalance')
                end
            }
        },
        distance = 2.0
    })
end)
```

## Common Patterns

### Framework-Agnostic Player Management
```lua
-- Works with any supported framework
local function GetPlayerData(playerId)
    local Bridge = exports['community_bridge']:Bridge()
    
    return {
        identifier = Bridge.Framework.GetIdentifier(playerId),
        name = Bridge.Framework.GetName(playerId),
        money = Bridge.Framework.GetMoney(playerId),
        job = Bridge.Framework.GetJob(playerId)
    }
end

-- Usage in any event
RegisterNetEvent('myresource:getData')
AddEventHandler('myresource:getData', function()
    local playerData = GetPlayerData(source)
    TriggerClientEvent('myresource:receiveData', source, playerData)
end)
```

### Safe Inventory Operations
```lua
-- Always check return values
local function GivePlayerItem(playerId, item, count)
    local Bridge = exports['community_bridge']:Bridge()
    
    local itemInfo = Bridge.Inventory.GetItemInfo(item)
    if not itemInfo then
        return false, "Invalid item"
    end
    
    if Bridge.Inventory.AddItem(playerId, item, count) then
        Bridge.Notify.SendNotify(playerId, 
            string.format("Received %dx %s", count, itemInfo.label), "success")
        return true, "Success"
    else
        Bridge.Notify.SendNotify(playerId, "Inventory full!", "error")
        return false, "Inventory full"
    end
end
```

## Advanced Examples

### Multi-Step Processes
Using progress bars and notifications for complex operations:

```lua
-- Client-side crafting example
RegisterNetEvent('crafting:start')
AddEventHandler('crafting:start', function(recipe)
    local Bridge = exports['community_bridge']:Bridge()
    
    -- Show crafting progress
    Bridge.ProgressBar.Show({
        label = "Crafting " .. recipe.result.label,
        duration = recipe.time * 1000,
        useWhileDead = false,
        canCancel = true,
        controlDisables = {
            disableMovement = true,
            disableCarMovement = true,
            disableMouse = false,
            disableCombat = true
        },
        animation = {
            animDict = "mini@repair",
            anim = "fixing_a_player"
        }
    }, function(cancelled)
        if not cancelled then
            TriggerServerEvent('crafting:complete', recipe.id)
        else
            Bridge.Notify.SendNotify("Crafting cancelled", "error")
        end
    end)
end)
```

### Dynamic Menu Systems
```lua
-- Server-side dynamic job menu
RegisterNetEvent('job:openMenu')
AddEventHandler('job:openMenu', function()
    local playerId = source
    local Bridge = exports['community_bridge']:Bridge()
    local playerJob = Bridge.Framework.GetJob(playerId)
    
    local menuOptions = {}
    
    -- Add job-specific options
    if playerJob.name == "police" then
        table.insert(menuOptions, {
            title = "Check Database",
            description = "Search criminal records",
            icon = "fas fa-search",
            serverEvent = "police:openMDT"
        })
        
        if playerJob.grade >= 2 then
            table.insert(menuOptions, {
                title = "Manage Evidence",
                description = "Access evidence locker",
                icon = "fas fa-box",
                serverEvent = "police:evidenceLocker"
            })
        end
    end
    
    TriggerClientEvent('job:showMenu', playerId, {
        title = playerJob.label .. " Actions",
        options = menuOptions
    })
end)
```

---

## Best Practices

### Error Handling
Always implement proper error handling:

```lua
local function SafeAddMoney(playerId, amount)
    if not playerId or not amount or amount <= 0 then
        return false, "Invalid parameters"
    end
    
    local Bridge = exports['community_bridge']:Bridge()
    
    if not Bridge.Framework.GetIdentifier(playerId) then
        return false, "Player not found"
    end
    
    return Bridge.Framework.AddMoney(playerId, amount), "Success"
end
```

### Performance Considerations
Cache frequently accessed data:

```lua
local playerCache = {}

local function GetCachedPlayerData(playerId)
    if not playerCache[playerId] or 
       (GetGameTimer() - playerCache[playerId].lastUpdate) > 30000 then
        playerCache[playerId] = {
            data = GetPlayerData(playerId),
            lastUpdate = GetGameTimer()
        }
    end
    return playerCache[playerId].data
end
```

### Modular Resource Design
Structure your resources to use Community Bridge effectively:

```lua
-- config.lua
Config = {}
Config.Framework = "auto" -- Auto-detect framework
Config.Inventory = "auto" -- Auto-detect inventory
Config.Notifications = "auto" -- Auto-detect notification system

-- main.lua
local Bridge = exports['community_bridge']:Bridge()

if not Bridge then
    print("^1Error: Community Bridge not found!")
    return
end

-- Use Community Bridge modules
local Framework = Bridge.Framework
local Inventory = Bridge.Inventory
local Notify = Bridge.Notify
```
