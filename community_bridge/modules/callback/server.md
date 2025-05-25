---
title: "Server Functions"
parent: "Callback"
grand_parent: "Modules"
great_grand_parent: "Community Bridge"
nav_order: 3
---

# Callback - Server Functions
{: .no_toc }

Server-side callback functions for handling client requests and managing callback systems.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Core Functions

### RegisterCallback
{: .d-inline-block }
Server
{: .label .label-green }

Registers a server-side callback that can be triggered by clients.

```lua
exports.community_bridge:RegisterCallback(name, callback)
```

#### Parameters
- `name` (string): Unique callback name
- `callback` (function): Function to execute when triggered

#### Example
```lua
-- Register a simple callback
exports.community_bridge:RegisterCallback('player:getMoney', function(source, data)
    local player = exports.community_bridge:GetPlayer(source)
    if player then
        return {
            cash = player.cash,
            bank = player.bank
        }
    end
    return false
end)

-- Register callback with data validation
exports.community_bridge:RegisterCallback('vehicle:spawn', function(source, data)
    if not data.model or not data.coords then
        return { success = false, error = 'Missing required data' }
    end
    
    local vehicle = exports.community_bridge:SpawnVehicle(data.model, data.coords, source)
    return { success = true, vehicleId = vehicle }
end)
```

### TriggerClientCallback
{: .d-inline-block }
Server
{: .label .label-green }

Triggers a callback on a specific client and waits for the response.

```lua
exports.community_bridge:TriggerClientCallback(source, name, data, timeout)
```

#### Parameters
- `source` (number): Player server ID
- `name` (string): Callback name to trigger
- `data` (table, optional): Data to send to the client
- `timeout` (number, optional): Timeout in milliseconds

#### Returns
- `any`: The response from the client callback

#### Example
```lua
-- Trigger client callback
local result = exports.community_bridge:TriggerClientCallback(source, 'client:getLocation')
if result then
    print('Player location: ' .. json.encode(result))
end

-- Trigger with data
local confirmation = exports.community_bridge:TriggerClientCallback(source, 'client:confirmAction', {
    message = 'Are you sure you want to delete this item?',
    item = 'weapon_pistol'
})
```

### BroadcastCallback
{: .d-inline-block }
Server
{: .label .label-green }

Triggers a callback on all connected clients.

```lua
exports.community_bridge:BroadcastCallback(name, data, timeout)
```

#### Parameters
- `name` (string): Callback name to trigger
- `data` (table, optional): Data to send to clients
- `timeout` (number, optional): Timeout in milliseconds

#### Returns
- `table`: Array of responses from all clients

#### Example
```lua
-- Broadcast to all clients
local responses = exports.community_bridge:BroadcastCallback('client:getPlayerCount')
local totalPlayers = #responses

-- Broadcast with data
exports.community_bridge:BroadcastCallback('client:showAnnouncement', {
    message = 'Server restart in 5 minutes!',
    type = 'warning'
})
```

---

## Management Functions

### IsCallbackRegistered
{: .d-inline-block }
Server
{: .label .label-green }

Checks if a callback is registered on the server.

```lua
exports.community_bridge:IsCallbackRegistered(name)
```

#### Parameters
- `name` (string): Callback name to check

#### Returns
- `boolean`: True if callback is registered

#### Example
```lua
if exports.community_bridge:IsCallbackRegistered('player:getMoney') then
    print('Money callback is available')
end
```

### UnregisterCallback
{: .d-inline-block }
Server
{: .label .label-green }

Unregisters a server callback.

```lua
exports.community_bridge:UnregisterCallback(name)
```

#### Parameters
- `name` (string): Callback name to unregister

#### Example
```lua
exports.community_bridge:UnregisterCallback('player:getMoney')
```

### GetRegisteredCallbacks
{: .d-inline-block }
Server
{: .label .label-green }

Gets a list of all registered callbacks.

```lua
exports.community_bridge:GetRegisteredCallbacks()
```

#### Returns
- `table`: Array of registered callback names

#### Example
```lua
local callbacks = exports.community_bridge:GetRegisteredCallbacks()
print('Registered callbacks: ' .. json.encode(callbacks))
```

---

## Security Functions

### SetCallbackPermission
{: .d-inline-block }
Server
{: .label .label-green }

Sets permission requirements for a callback.

```lua
exports.community_bridge:SetCallbackPermission(name, permission)
```

#### Parameters
- `name` (string): Callback name
- `permission` (string): Required permission

#### Example
```lua
-- Require admin permission
exports.community_bridge:SetCallbackPermission('admin:banPlayer', 'admin.ban')

-- Require VIP permission
exports.community_bridge:SetCallbackPermission('vip:teleport', 'vip.teleport')
```

### ValidateCallbackAccess
{: .d-inline-block }
Server
{: .label .label-green }

Validates if a player can access a callback.

```lua
exports.community_bridge:ValidateCallbackAccess(source, name)
```

#### Parameters
- `source` (number): Player server ID
- `name` (string): Callback name

#### Returns
- `boolean`: True if player has access

#### Example
```lua
local hasAccess = exports.community_bridge:ValidateCallbackAccess(source, 'admin:banPlayer')
if not hasAccess then
    exports.community_bridge:ShowNotification(source, 'No permission', 'error')
    return false
end
```

### AddCallbackRateLimit
{: .d-inline-block }
Server
{: .label .label-green }

Adds rate limiting to a callback.

```lua
exports.community_bridge:AddCallbackRateLimit(name, maxCalls, timeWindow)
```

#### Parameters
- `name` (string): Callback name
- `maxCalls` (number): Maximum calls allowed
- `timeWindow` (number): Time window in milliseconds

#### Example
```lua
-- Limit to 5 calls per minute
exports.community_bridge:AddCallbackRateLimit('player:getMoney', 5, 60000)

-- Limit expensive operations
exports.community_bridge:AddCallbackRateLimit('db:complexQuery', 1, 10000)
```

---

## Event Handling

### OnCallbackTimeout
{: .d-inline-block }
Server
{: .label .label-green }

Sets a handler for callback timeout events.

```lua
exports.community_bridge:OnCallbackTimeout(handler)
```

#### Parameters
- `handler` (function): Function to call when a callback times out

#### Example
```lua
exports.community_bridge:OnCallbackTimeout(function(source, callbackName, timeout)
    print('Callback "' .. callbackName .. '" timed out for player ' .. source)
    exports.community_bridge:ShowNotification(source, 'Request timed out', 'error')
end)
```

### OnCallbackError
{: .d-inline-block }
Server
{: .label .label-green }

Sets a handler for callback error events.

```lua
exports.community_bridge:OnCallbackError(handler)
```

#### Parameters
- `handler` (function): Function to call when a callback errors

#### Example
```lua
exports.community_bridge:OnCallbackError(function(source, callbackName, error)
    print('Callback error: ' .. callbackName .. ' - ' .. error)
    -- Log to database or file
    exports.community_bridge:LogError('callback', {
        player = source,
        callback = callbackName,
        error = error
    })
end)
```

---

## Advanced Features

### Callback Middleware
{: .d-inline-block }
Server
{: .label .label-green }

Add middleware to process callbacks before execution.

```lua
exports.community_bridge:AddCallbackMiddleware(middleware)
```

#### Parameters
- `middleware` (function): Middleware function

#### Example
```lua
-- Add logging middleware
exports.community_bridge:AddCallbackMiddleware(function(source, name, data, next)
    local startTime = os.clock()
    print('Player ' .. source .. ' executing: ' .. name)
    
    local result = next(data)
    
    local duration = (os.clock() - startTime) * 1000
    print('Callback completed in ' .. duration .. 'ms')
    
    return result
end)

-- Add permission middleware
exports.community_bridge:AddCallbackMiddleware(function(source, name, data, next)
    if not exports.community_bridge:ValidateCallbackAccess(source, name) then
        return { success = false, error = 'No permission' }
    end
    
    return next(data)
end)
```

### Callback Caching
{: .d-inline-block }
Server
{: .label .label-green }

Enable caching for expensive callbacks.

```lua
exports.community_bridge:EnableCallbackCache(name, ttl)
```

#### Parameters
- `name` (string): Callback name
- `ttl` (number): Time to live in milliseconds

#### Example
```lua
-- Cache player data for 30 seconds
exports.community_bridge:EnableCallbackCache('player:getData', 30000)

-- Cache server statistics for 5 minutes
exports.community_bridge:EnableCallbackCache('server:getStats', 300000)
```

### Async Callbacks
{: .d-inline-block }
Server
{: .label .label-green }

Register asynchronous callbacks for database operations.

```lua
exports.community_bridge:RegisterAsyncCallback(name, callback)
```

#### Parameters
- `name` (string): Callback name
- `callback` (function): Async callback function

#### Example
```lua
exports.community_bridge:RegisterAsyncCallback('player:saveData', function(source, data)
    return exports.community_bridge:SavePlayerData(source, data)
        :then(function(result)
            return { success = true, saved = result }
        end)
        :catch(function(error)
            return { success = false, error = error }
        end)
end)
```

---

## Database Integration

### Database Callbacks
Register callbacks for common database operations:

```lua
-- Player data callbacks
exports.community_bridge:RegisterCallback('player:getData', function(source, data)
    local identifier = exports.community_bridge:GetPlayerIdentifier(source)
    return exports.community_bridge:GetPlayerData(identifier)
end)

exports.community_bridge:RegisterCallback('player:saveData', function(source, data)
    local identifier = exports.community_bridge:GetPlayerIdentifier(source)
    return exports.community_bridge:SavePlayerData(identifier, data.playerData)
end)

-- Vehicle callbacks
exports.community_bridge:RegisterCallback('vehicle:getOwned', function(source, data)
    local identifier = exports.community_bridge:GetPlayerIdentifier(source)
    return exports.community_bridge:GetOwnedVehicles(identifier)
end)

-- Property callbacks
exports.community_bridge:RegisterCallback('property:getOwned', function(source, data)
    local identifier = exports.community_bridge:GetPlayerIdentifier(source)
    return exports.community_bridge:GetOwnedProperties(identifier)
end)
```

---

## Best Practices

### Error Handling
Always include proper error handling:

```lua
exports.community_bridge:RegisterCallback('safe:operation', function(source, data)
    local success, result = pcall(function()
        -- Potentially dangerous operation
        return performOperation(data)
    end)
    
    if success then
        return { success = true, data = result }
    else
        print('Callback error: ' .. result)
        return { success = false, error = 'Operation failed' }
    end
end)
```

### Input Validation
Validate all input data:

```lua
exports.community_bridge:RegisterCallback('player:updateSettings', function(source, data)
    if not data or not data.settings then
        return { success = false, error = 'Invalid data' }
    end
    
    -- Validate settings structure
    local validSettings = {}
    for key, value in pairs(data.settings) do
        if allowedSettings[key] and validateSetting(key, value) then
            validSettings[key] = value
        end
    end
    
    -- Save validated settings
    local success = exports.community_bridge:SavePlayerSettings(source, validSettings)
    return { success = success }
end)
```

### Performance Optimization
Optimize callback performance:

```lua
-- Use caching for expensive operations
exports.community_bridge:RegisterCallback('server:getOnlinePlayers', function(source, data)
    local cached = GetResourceKvpString('online_players_cache')
    if cached then
        local cacheData = json.decode(cached)
        if os.time() - cacheData.timestamp < 30 then -- 30 second cache
            return cacheData.players
        end
    end
    
    local players = GetPlayers()
    SetResourceKvp('online_players_cache', json.encode({
        players = players,
        timestamp = os.time()
    }))
    
    return players
end)
```

---

## Common Patterns

### CRUD Operations
```lua
-- Create
exports.community_bridge:RegisterCallback('item:create', function(source, data)
    return exports.community_bridge:CreateItem(data.item)
end)

-- Read
exports.community_bridge:RegisterCallback('item:get', function(source, data)
    return exports.community_bridge:GetItem(data.id)
end)

-- Update
exports.community_bridge:RegisterCallback('item:update', function(source, data)
    return exports.community_bridge:UpdateItem(data.id, data.updates)
end)

-- Delete
exports.community_bridge:RegisterCallback('item:delete', function(source, data)
    return exports.community_bridge:DeleteItem(data.id)
end)
```

### Permission-Based Actions
```lua
exports.community_bridge:RegisterCallback('admin:kickPlayer', function(source, data)
    if not exports.community_bridge:HasPermission(source, 'admin.kick') then
        return { success = false, error = 'No permission' }
    end
    
    local success = exports.community_bridge:KickPlayer(data.target, data.reason)
    return { success = success }
end)
```
