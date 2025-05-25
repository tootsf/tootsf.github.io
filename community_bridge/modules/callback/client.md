---
title: "Client Functions"
parent: "Callback"
grand_parent: "Modules"
great_grand_parent: "Community Bridge"
nav_order: 2
---

# Callback - Client Functions
{: .no_toc }

Client-side callback functions for triggering server-side operations and handling responses.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Core Functions

### TriggerServerCallback
{: .d-inline-block }
Client
{: .label .label-blue }

Triggers a server callback and waits for the response with optional timeout handling.

```lua
exports.community_bridge:TriggerServerCallback(name, data, timeout)
```

#### Parameters
- `name` (string): The callback name to trigger
- `data` (table, optional): Data to send to the server
- `timeout` (number, optional): Timeout in milliseconds (default: 10000)

#### Returns
- `any`: The response from the server callback

#### Example
```lua
-- Basic callback usage
local result = exports.community_bridge:TriggerServerCallback('player:getMoney')
if result then
    print('Player has $' .. result.cash)
end

-- Callback with data
local vehicleData = {
    model = 'adder',
    coords = GetEntityCoords(PlayerPedId())
}
local success = exports.community_bridge:TriggerServerCallback('vehicle:spawn', vehicleData)

-- Callback with timeout
local playerData = exports.community_bridge:TriggerServerCallback('player:getData', {}, 5000)
```

### TriggerServerCallbackAsync
{: .d-inline-block }
Client
{: .label .label-blue }

Asynchronous version of TriggerServerCallback using promises.

```lua
exports.community_bridge:TriggerServerCallbackAsync(name, data, timeout)
```

#### Parameters
- `name` (string): The callback name to trigger
- `data` (table, optional): Data to send to the server
- `timeout` (number, optional): Timeout in milliseconds

#### Returns
- `Promise`: Promise that resolves with the server response

#### Example
```lua
-- Using async/await pattern
local function GetPlayerDataAsync()
    local playerData = exports.community_bridge:TriggerServerCallbackAsync('player:getData')
    return playerData
end

-- Using promise chain
exports.community_bridge:TriggerServerCallbackAsync('player:getMoney')
    :next(function(money)
        print('Cash: $' .. money.cash)
        print('Bank: $' .. money.bank)
    end)
    :catch(function(error)
        print('Failed to get money: ' .. error)
    end)
```

---

## Utility Functions

### RegisterCallback
{: .d-inline-block }
Client
{: .label .label-blue }

Registers a client-side callback that can be triggered by the server.

```lua
exports.community_bridge:RegisterCallback(name, callback)
```

#### Parameters
- `name` (string): Unique callback name
- `callback` (function): Function to execute when triggered

#### Example
```lua
-- Register a client callback
exports.community_bridge:RegisterCallback('client:showNotification', function(data)
    exports.community_bridge:ShowNotification(data.message, data.type)
    return true
end)

-- Register callback with data processing
exports.community_bridge:RegisterCallback('client:openMenu', function(data)
    local menu = {
        title = data.title,
        items = data.items
    }
    exports.community_bridge:OpenMenu(menu)
    return { success = true, menuId = menu.id }
end)
```

### IsCallbackRegistered
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if a callback is registered on the client.

```lua
exports.community_bridge:IsCallbackRegistered(name)
```

#### Parameters
- `name` (string): Callback name to check

#### Returns
- `boolean`: True if callback is registered

#### Example
```lua
if exports.community_bridge:IsCallbackRegistered('client:showNotification') then
    print('Notification callback is available')
end
```

### UnregisterCallback
{: .d-inline-block }
Client
{: .label .label-blue }

Unregisters a client callback.

```lua
exports.community_bridge:UnregisterCallback(name)
```

#### Parameters
- `name` (string): Callback name to unregister

#### Example
```lua
exports.community_bridge:UnregisterCallback('client:showNotification')
```

---

## Event Handling

### OnCallbackTimeout
{: .d-inline-block }
Client
{: .label .label-blue }

Sets a handler for callback timeout events.

```lua
exports.community_bridge:OnCallbackTimeout(handler)
```

#### Parameters
- `handler` (function): Function to call when a callback times out

#### Example
```lua
exports.community_bridge:OnCallbackTimeout(function(callbackName, timeout)
    print('Callback "' .. callbackName .. '" timed out after ' .. timeout .. 'ms')
    exports.community_bridge:ShowNotification('Server request timed out', 'error')
end)
```

### OnCallbackError
{: .d-inline-block }
Client
{: .label .label-blue }

Sets a handler for callback error events.

```lua
exports.community_bridge:OnCallbackError(handler)
```

#### Parameters
- `handler` (function): Function to call when a callback errors

#### Example
```lua
exports.community_bridge:OnCallbackError(function(callbackName, error)
    print('Callback "' .. callbackName .. '" failed: ' .. error)
    exports.community_bridge:ShowNotification('Request failed', 'error')
end)
```

---

## Advanced Usage

### Batch Callbacks
{: .d-inline-block }
Client
{: .label .label-blue }

Execute multiple callbacks in parallel.

```lua
exports.community_bridge:TriggerBatchCallbacks(callbacks)
```

#### Parameters
- `callbacks` (table): Array of callback objects with name, data, and timeout

#### Returns
- `table`: Array of results in the same order

#### Example
```lua
local callbacks = {
    { name = 'player:getMoney' },
    { name = 'player:getVehicles' },
    { name = 'player:getProperties', timeout = 5000 }
}

local results = exports.community_bridge:TriggerBatchCallbacks(callbacks)
local money = results[1]
local vehicles = results[2]
local properties = results[3]
```

### Callback Middleware
{: .d-inline-block }
Client
{: .label .label-blue }

Add middleware to process callbacks before execution.

```lua
exports.community_bridge:AddCallbackMiddleware(middleware)
```

#### Parameters
- `middleware` (function): Middleware function

#### Example
```lua
-- Add logging middleware
exports.community_bridge:AddCallbackMiddleware(function(name, data, next)
    print('Executing callback: ' .. name)
    local startTime = GetGameTimer()
    
    local result = next(data)
    
    local duration = GetGameTimer() - startTime
    print('Callback completed in ' .. duration .. 'ms')
    
    return result
end)
```

---

## Best Practices

### Error Handling
Always handle potential errors when using callbacks:

```lua
local success, result = pcall(function()
    return exports.community_bridge:TriggerServerCallback('risky:operation', data)
end)

if success and result then
    -- Handle successful result
    processResult(result)
else
    -- Handle error
    print('Callback failed')
    exports.community_bridge:ShowNotification('Operation failed', 'error')
end
```

### Timeout Management
Set appropriate timeouts based on operation complexity:

```lua
-- Quick operations - short timeout
local quickResult = exports.community_bridge:TriggerServerCallback('player:getName', {}, 2000)

-- Database operations - longer timeout
local dbResult = exports.community_bridge:TriggerServerCallback('db:complexQuery', data, 15000)

-- File operations - very long timeout
local fileResult = exports.community_bridge:TriggerServerCallback('file:process', data, 30000)
```

### Resource Cleanup
Unregister callbacks when resource stops:

```lua
AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        exports.community_bridge:UnregisterCallback('myResource:callback')
    end
end)
```

---

## Common Patterns

### Request-Response Pattern
```lua
-- Client requests data from server
local function RequestPlayerStats()
    return exports.community_bridge:TriggerServerCallback('player:getStats')
end

-- Usage
local stats = RequestPlayerStats()
if stats then
    updateUI(stats)
end
```

### Validation Pattern
```lua
-- Client validates data with server
local function ValidateInput(input)
    return exports.community_bridge:TriggerServerCallback('validation:check', {
        type = 'username',
        value = input
    })
end

-- Usage
local isValid = ValidateInput(userInput)
if not isValid then
    exports.community_bridge:ShowNotification('Invalid input', 'error')
    return
end
```

### Permission Check Pattern
```lua
-- Check permissions before action
local function CanPerformAction(action)
    return exports.community_bridge:TriggerServerCallback('permission:check', {
        action = action
    })
end

-- Usage
if CanPerformAction('admin:teleport') then
    -- Perform admin action
else
    exports.community_bridge:ShowNotification('No permission', 'error')
end
```
