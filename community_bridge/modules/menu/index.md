---
layout: default
title: Menu
parent: Modules
grand_parent: Community Bridge
nav_order: 15
has_children: true
permalink: /community_bridge/modules/menu/
---

# Menu Module
{: .no_toc }

The Menu module provides a unified API for creating interactive menus across different menu systems.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

This module standardizes menu creation and interaction across various menu resources, providing consistent functionality regardless of which menu system your server uses.

## Supported Menu Systems

- **ox_lib** - Modern context menus and input dialogs
- **qb-menu** - QBCore's menu system
- **esx_menu_default** - ESX default menu integration
- **menuv** - MenuV compatibility
- **Custom Systems** - Extensible for custom menu implementations

## Key Features

- **Context Menus** - Right-click style context menus
- **List Menus** - Scrollable list-based menus
- **Input Dialogs** - Text and number input collection
- **Confirmation Dialogs** - Yes/no confirmation prompts
- **Nested Menus** - Multi-level menu navigation
- **Rich Content** - Icons, descriptions, and formatting

## Quick Start

```lua
-- Client-side example
local menuOptions = {
    title = "General Store",
    options = {
        {
            title = "Buy Water",
            description = "Refreshing water bottle",
            price = 50,
            icon = "fas fa-tint",
            onSelect = function()
                TriggerServerEvent('shop:buyItem', 'water', 50)
            end
        },
        {
            title = "Buy Sandwich", 
            description = "Filling meal",
            price = 100,
            icon = "fas fa-hamburger",
            onSelect = function()
                TriggerServerEvent('shop:buyItem', 'sandwich', 100)
            end
        }
    }
}

Bridge.Menu.OpenListMenu(menuOptions)
```

```lua
-- Server-side example
RegisterNetEvent('shop:buyItem', function(item, price)
    local playerId = source
    local playerMoney = Bridge.Menu.GetMoney(playerId, 'cash')
    
    if playerMoney >= price then
        Bridge.Menu.RemoveMoney(playerId, 'cash', price)
        Bridge.Menu.AddItem(playerId, item, 1)
        Bridge.Menu.SendNotify(playerId, 'Purchase successful!', 'success')
    else
        Bridge.Menu.SendNotify(playerId, 'Not enough money!', 'error')
    end
end)
```

## Module Structure

### Client Functions
- **Menu Creation** - Context menus, list menus, input dialogs
- **Menu Management** - Open, close, navigation controls
- **Event Handling** - Menu interactions and callbacks
- **Utility Functions** - Validation, formatting, state management

### Server Functions  
- **Menu Triggers** - Send menus to specific players or all players
- **Data Management** - Cache and retrieve menu configurations
- **Permission System** - Control menu access based on player roles
- **Analytics** - Track menu usage and interactions

### Shared Functions
- **Validation** - Menu option and input field validation
- **Formatting** - Title, price, and description formatting
- **Templates** - Pre-built menu structures for common use cases
- **Utilities** - Sorting, filtering, and data manipulation

## Navigation

<div class="code-example" markdown="1">
### Quick Links
{: .no_toc }

- [Client Functions](client/) - Menu creation and interaction
- [Server Functions](server/) - Menu triggers and data management  
- [Shared Functions](shared/) - Utilities and templates
</div>

## Integration Examples

### Basic Shop System

```lua
-- Client: shops.lua
local function OpenShop(shopType)
    local shopData = Config.Shops[shopType]
    
    local menuOptions = {
        title = shopData.name,
        subtitle = shopData.description,
        options = {}
    }
    
    for _, item in pairs(shopData.items) do
        table.insert(menuOptions.options, {
            title = item.label,
            description = item.description,
            rightLabel = Bridge.Menu.FormatPrice(item.price),
            icon = item.icon,
            onSelect = function()
                TriggerServerEvent('shop:purchase', shopType, item.name, item.price)
            end
        })
    end
    
    Bridge.Menu.OpenListMenu(menuOptions)
end

-- Server: shops.lua
RegisterNetEvent('shop:purchase', function(shopType, itemName, price)
    local playerId = source
    
    -- Validate purchase
    if Bridge.Menu.GetMoney(playerId, 'cash') >= price then
        Bridge.Menu.RemoveMoney(playerId, 'cash', price)
        Bridge.Menu.AddItem(playerId, itemName, 1)
        Bridge.Menu.SendNotify(playerId, 'Item purchased!', 'success')
    else
        Bridge.Menu.SendNotify(playerId, 'Insufficient funds!', 'error')
    end
end)
```

### Dynamic Job Menu

```lua
-- Generate job-specific menu based on player's role
local function OpenJobMenu()
    local playerJob = Bridge.Menu.GetJob(PlayerId())
    local jobConfig = Config.JobMenus[playerJob]
    
    if not jobConfig then
        Bridge.Menu.SendNotify('No job menu available', 'info')
        return
    end
    
    local menuData = Bridge.Menu.CreateJobTemplate(jobConfig.actions)
    Bridge.Menu.OpenContextMenu(menuData)
end
```

## Configuration

Menu system can be configured through your resource's config file:

```lua
Config.MenuSettings = {
    defaultPosition = "top-right",
    animationSpeed = 200,
    closeOnSelect = true,
    enableSounds = true,
    theme = {
        primary = "#1976D2",
        secondary = "#424242", 
        success = "#4CAF50",
        error = "#F44336",
        warning = "#FF9800"
    }
}
        description = "Purchase a bottle of water - $5",
        icon = "fas fa-tint",
        onSelect = function()
            TriggerServerEvent('shop:buyItem', 'water', 1)
        end
    },
    {
        title = "Buy Food",
        description = "Purchase a sandwich - $10",
        icon = "fas fa-hamburger",
        onSelect = function()
            TriggerServerEvent('shop:buyItem', 'sandwich', 1)
        end
    }
}

Bridge.Menu.Open('shop_menu', 'General Store', menuOptions)
```

## Menu Types

### Context Menus
Perfect for right-click interactions and quick actions:

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Menu.ShowContext({
    id = 'vehicle_menu',
    title = 'Vehicle Options',
    options = {
        {
            title = 'Lock/Unlock',
            icon = 'fas fa-key',
            onSelect = function()
                TriggerEvent('vehiclekeys:toggle')
            end
        },
        {
            title = 'Engine On/Off',
            icon = 'fas fa-power-off',
            onSelect = function()
                TriggerEvent('vehicle:toggleEngine')
            end
        }
    }
})
```

### List Menus
Great for longer lists with navigation:

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Menu.ShowList({
    id = 'player_list',
    title = 'Online Players',
    options = playerOptions,
    onSelect = function(option, index)
        -- Handle player selection
    end,
    onClose = function()
        -- Handle menu close
    end
})
```

## Module Structure

- **[Server Functions](server/)** - Server-side menu data management
- **[Client Functions](client/)** - Client-side menu display and interaction
- **[Shared Functions](shared/)** - Menu validation and utilities
