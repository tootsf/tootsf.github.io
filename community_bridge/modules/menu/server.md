---
layout: default
title: Server Functions
parent: Menu
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 2
permalink: /community_bridge/modules/menu/server/
---

# Menu Module - Server Functions
{: .no_toc }

The menu module in community_bridge does not provide any server-side functions.

---

## Available Functions

**None** - The menu module only provides client-side functionality.

All menu operations are handled client-side using the `Menu.Open()` function. 

For server-to-client menu triggers, use standard FiveM events:

```lua
-- Server-side: Trigger a menu on a specific client
TriggerClientEvent('your_script:openMenu', playerId, menuData)
```

```lua
-- Client-side: Handle the menu trigger
RegisterNetEvent('your_script:openMenu', function(menuData)
    Menu.Open(menuData)
end)
```

---

## Related Documentation

- [Menu Client Functions](../client/) - Client-side menu functions
- [Menu Examples](../../examples/) - Usage examples
            description = "Filling meal",
            price = 100,
            item = "sandwich"
        }
    }
}

Bridge.Menu.TriggerClientMenu(playerId, "list", shopOptions)
```

### `Bridge.Menu.TriggerMenuForAll(menuType, options)`

Triggers a menu for all online players.

**Parameters:**
- `menuType` (string): Type of menu
- `options` (table): Menu configuration

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Emergency notification menu for all players
Bridge.Menu.TriggerMenuForAll("confirm", {
    title = "Server Restart",
    description = "Server will restart in 5 minutes. Save your progress!",
    onConfirm = function()
        -- Player acknowledged
    end
})
```

## Data Management Functions

### `Bridge.Menu.GetMenuData(menuId)`

Retrieves stored menu data by ID.

**Parameters:**
- `menuId` (string): Unique menu identifier

**Returns:**
- `table|nil`: Menu data or nil if not found

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local vehicleData = Bridge.Menu.GetMenuData("dealership_vehicles")
if vehicleData then
    -- Use cached menu data
    print("Found", #vehicleData.vehicles, "vehicles")
end
```

### `Bridge.Menu.SetMenuData(menuId, data)`

Stores menu data with a unique identifier.

**Parameters:**
- `menuId` (string): Unique menu identifier
- `data` (table): Menu data to store

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Cache expensive database query results
local vehicleData = MySQL.query.await('SELECT * FROM vehicles WHERE dealership = ?', {dealershipId})

Bridge.Menu.SetMenuData("dealership_" .. dealershipId, {
    vehicles = vehicleData,
    lastUpdated = os.time()
})
```

### `Bridge.Menu.ClearMenuData(menuId)`

Clears stored menu data.

**Parameters:**
- `menuId` (string): Menu identifier to clear

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Clear cached data when dealership inventory changes
Bridge.Menu.ClearMenuData("dealership_" .. dealershipId)
```

## Permission Functions

### `Bridge.Menu.CheckMenuPermission(playerId, menuId)`

Checks if a player has permission to access a specific menu.

**Parameters:**
- `playerId` (number): Player's server ID
- `menuId` (string): Menu identifier

**Returns:**
- `boolean`: True if player has permission

**Example:**
```lua
RegisterNetEvent('openAdminMenu', function()
    local playerId = source
    
    if Bridge.Menu.CheckMenuPermission(playerId, "admin_panel") then
        -- Open admin menu
        TriggerClientEvent('community_bridge:openMenu', playerId, adminMenuData)
    else
        Bridge.Menu.SendNotify(playerId, "Access denied", "error")
    end
end)
```

### `Bridge.Menu.SetMenuPermission(playerId, menuId, hasPermission)`

Sets menu permission for a player.

**Parameters:**
- `playerId` (number): Player's server ID
- `menuId` (string): Menu identifier
- `hasPermission` (boolean): Permission status

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Grant admin menu access
Bridge.Menu.SetMenuPermission(playerId, "admin_panel", true)

-- Revoke access
Bridge.Menu.SetMenuPermission(playerId, "admin_panel", false)
```

## Dynamic Menu Generation

### `Bridge.Menu.GenerateShopMenu(shopId, playerId)`

Generates a shop menu based on current inventory and player data.

**Parameters:**
- `shopId` (string): Shop identifier
- `playerId` (number): Target player ID

**Returns:**
- `table`: Generated menu data

**Example:**
```lua
local function GenerateWeaponShop(playerId)
    local playerJob = Bridge.Menu.GetJob(playerId)
    local weapons = {}
    
    -- Only show certain weapons to police
    if playerJob == "police" then
        weapons = Config.PoliceWeapons
    else
        weapons = Config.CivilianWeapons
    end
    
    local menuOptions = {}
    for _, weapon in pairs(weapons) do
        table.insert(menuOptions, {
            title = weapon.label,
            description = weapon.description,
            price = weapon.price,
            weapon = weapon.name
        })
    end
    
    return {
        title = "Weapon Shop",
        subtitle = "Licensed Firearms",
        options = menuOptions
    }
end

-- Usage
RegisterNetEvent('weaponshop:open', function()
    local playerId = source
    local menuData = GenerateWeaponShop(playerId)
    Bridge.Menu.TriggerClientMenu(playerId, "list", menuData)
end)
```

## Menu Analytics

### `Bridge.Menu.LogMenuInteraction(playerId, menuId, action, data)`

Logs menu interactions for analytics.

**Parameters:**
- `playerId` (number): Player's server ID
- `menuId` (string): Menu identifier
- `action` (string): Action performed ("opened", "closed", "selected")
- `data` (table, optional): Additional data

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Log when players use shop menus
RegisterNetEvent('shop:purchase', function(item, price)
    local playerId = source
    
    Bridge.Menu.LogMenuInteraction(playerId, "general_store", "purchase", {
        item = item,
        price = price,
        timestamp = os.time()
    })
end)
```

### `Bridge.Menu.GetMenuStats(menuId, timeframe)`

Gets usage statistics for a menu.

**Parameters:**
- `menuId` (string): Menu identifier
- `timeframe` (string): Time period ("day", "week", "month")

**Returns:**
- `table`: Statistics data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local stats = Bridge.Menu.GetMenuStats("general_store", "week")
print("Store accessed", stats.opens, "times this week")
print("Most popular item:", stats.topItem)
```

## Event Handlers

### Server Events

```lua
-- Player opened menu
RegisterNetEvent('community_bridge:menuOpened', function(menuType, menuId)
    local playerId = source
    print(GetPlayerName(playerId), "opened menu:", menuId)
end)

-- Player made selection
RegisterNetEvent('community_bridge:menuSelection', function(menuId, selection)
    local playerId = source
    
    -- Handle specific menu selections
    if menuId == "vehicle_dealership" then
        HandleVehiclePurchase(playerId, selection)
    elseif menuId == "weapon_shop" then
        HandleWeaponPurchase(playerId, selection)
    end
end)

-- Menu validation
RegisterNetEvent('community_bridge:validateMenuAccess', function(menuId)
    local playerId = source
    local hasAccess = Bridge.Menu.CheckMenuPermission(playerId, menuId)
    
    TriggerClientEvent('community_bridge:menuAccessResult', playerId, menuId, hasAccess)
end)
```

## Configuration Functions

### `Bridge.Menu.SetMenuConfig(config)`

Updates menu system configuration.

**Parameters:**
- `config` (table): Configuration options

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Menu.SetMenuConfig({
    defaultPosition = "center",
    animationSpeed = 250,
    closeOnSelect = true,
    enableSounds = true,
    theme = "dark"
})
```

### `Bridge.Menu.GetMenuConfig()`

Gets current menu configuration.

**Returns:**
- `table`: Current configuration

## Best Practices

### Security Considerations

1. **Validate permissions** - Always check player permissions
2. **Sanitize input** - Validate all menu data
3. **Rate limiting** - Prevent menu spam
4. **Audit trails** - Log important menu interactions

### Performance Optimization

1. **Cache menu data** - Store frequently used menus
2. **Lazy loading** - Generate content when needed
3. **Cleanup unused data** - Remove old cached menus
4. **Batch operations** - Group multiple menu operations

### Error Handling

```lua
local Bridge = exports['community_bridge']:Bridge()

local success = Bridge.Menu.TriggerClientMenu(playerId, "list", menuData)
if not success then
    print("Failed to send menu to player:", playerId)
    -- Fallback or retry logic
end
```
