---
title: "Shared Functions"
parent: "Callback"
grand_parent: "Modules"
great_grand_parent: "Community Bridge"
nav_order: 4
---

# Callback - Shared Functions
{: .no_toc }

Shared utility functions for callback management and communication patterns.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Utility Functions

### GenerateCallbackId
{: .d-inline-block }
Shared
{: .label .label-purple }

Generates a unique identifier for callback requests.

```lua
exports.community_bridge:GenerateCallbackId()
```

#### Returns
- `string`: Unique callback identifier

#### Example
```lua
local callbackId = exports.community_bridge:GenerateCallbackId()
print('Generated ID: ' .. callbackId) -- "cb_1234567890123"
```

### ValidateCallbackData
{: .d-inline-block }
Shared
{: .label .label-purple }

Validates callback data structure and types.

```lua
exports.community_bridge:ValidateCallbackData(data, schema)
```

#### Parameters
- `data` (table): Data to validate
- `schema` (table): Validation schema

#### Returns
- `boolean`: True if data is valid
- `string`: Error message if invalid

#### Example
```lua
local schema = {
    name = 'string',
    age = 'number',
    active = 'boolean'
}

local valid, error = exports.community_bridge:ValidateCallbackData({
    name = 'John',
    age = 25,
    active = true
}, schema)

if not valid then
    print('Validation error: ' .. error)
end
```

### SerializeCallbackData
{: .d-inline-block }
Shared
{: .label .label-purple }

Serializes callback data for transmission.

```lua
exports.community_bridge:SerializeCallbackData(data)
```

#### Parameters
- `data` (any): Data to serialize

#### Returns
- `string`: Serialized data

#### Example
```lua
local data = {
    players = { 'player1', 'player2' },
    config = { maxPlayers = 32 }
}

local serialized = exports.community_bridge:SerializeCallbackData(data)
```

### DeserializeCallbackData
{: .d-inline-block }
Shared
{: .label .label-purple }

Deserializes callback data after transmission.

```lua
exports.community_bridge:DeserializeCallbackData(serializedData)
```

#### Parameters
- `serializedData` (string): Serialized data string

#### Returns
- `any`: Deserialized data

#### Example
```lua
local originalData = exports.community_bridge:DeserializeCallbackData(serialized)
```

---

## Promise Utilities

### CreatePromise
{: .d-inline-block }
Shared
{: .label .label-purple }

Creates a new promise for async callback operations.

```lua
exports.community_bridge:CreatePromise()
```

#### Returns
- `table`: Promise object with resolve, reject, and then methods

#### Example
```lua
local promise = exports.community_bridge:CreatePromise()

-- Resolve the promise
promise:resolve('Success!')

-- Use the promise
promise:then(function(result)
    print('Result: ' .. result)
end)
```

### PromiseAll
{: .d-inline-block }
Shared
{: .label .label-purple }

Waits for all promises to resolve.

```lua
exports.community_bridge:PromiseAll(promises)
```

#### Parameters
- `promises` (table): Array of promise objects

#### Returns
- `Promise`: Promise that resolves when all input promises resolve

#### Example
```lua
local promises = {
    exports.community_bridge:TriggerServerCallbackAsync('player:getData'),
    exports.community_bridge:TriggerServerCallbackAsync('player:getVehicles'),
    exports.community_bridge:TriggerServerCallbackAsync('player:getProperties')
}

exports.community_bridge:PromiseAll(promises):then(function(results)
    local playerData = results[1]
    local vehicles = results[2]
    local properties = results[3]
    
    print('All data loaded successfully')
end)
```

### PromiseRace
{: .d-inline-block }
Shared
{: .label .label-purple }

Returns the first promise to resolve or reject.

```lua
exports.community_bridge:PromiseRace(promises)
```

#### Parameters
- `promises` (table): Array of promise objects

#### Returns
- `Promise`: Promise that resolves/rejects with the first completed promise

#### Example
```lua
local promises = {
    exports.community_bridge:TriggerServerCallbackAsync('server1:getData'),
    exports.community_bridge:TriggerServerCallbackAsync('server2:getData')
}

exports.community_bridge:PromiseRace(promises):then(function(result)
    print('First server responded: ' .. json.encode(result))
end)
```

---

## Configuration

### SetCallbackConfig
{: .d-inline-block }
Shared
{: .label .label-purple }

Sets global callback configuration.

```lua
exports.community_bridge:SetCallbackConfig(config)
```

#### Parameters
- `config` (table): Configuration options

#### Example
```lua
exports.community_bridge:SetCallbackConfig({
    defaultTimeout = 10000,
    enableLogging = true,
    logLevel = 'info',
    retryAttempts = 3,
    retryDelay = 1000
})
```

### GetCallbackConfig
{: .d-inline-block }
Shared
{: .label .label-purple }

Gets current callback configuration.

```lua
exports.community_bridge:GetCallbackConfig()
```

#### Returns
- `table`: Current configuration

#### Example
```lua
local config = exports.community_bridge:GetCallbackConfig()
print('Default timeout: ' .. config.defaultTimeout)
```

---

## Event System

### CreateEventEmitter
{: .d-inline-block }
Shared
{: .label .label-purple }

Creates an event emitter for callback events.

```lua
exports.community_bridge:CreateEventEmitter()
```

#### Returns
- `table`: Event emitter object

#### Example
```lua
local emitter = exports.community_bridge:CreateEventEmitter()

-- Listen for events
emitter:on('callback:success', function(data)
    print('Callback succeeded: ' .. data.name)
end)

-- Emit events
emitter:emit('callback:success', { name = 'player:getData' })
```

### GlobalEventEmitter
{: .d-inline-block }
Shared
{: .label .label-purple }

Gets the global callback event emitter.

```lua
exports.community_bridge:GlobalEventEmitter()
```

#### Returns
- `table`: Global event emitter

#### Example
```lua
local emitter = exports.community_bridge:GlobalEventEmitter()

emitter:on('callback:timeout', function(data)
    print('Callback timed out: ' .. data.name)
end)
```

---

## Validation Schemas

### Common Schemas
Predefined validation schemas for common data types:

```lua
-- Player data schema
local playerSchema = {
    id = 'number',
    name = 'string',
    coords = 'table',
    health = 'number'
}

-- Vehicle data schema
local vehicleSchema = {
    model = 'string',
    coords = 'table',
    heading = 'number',
    plate = 'string'
}

-- Menu data schema
local menuSchema = {
    title = 'string',
    items = 'table',
    options = 'table'
}
```

### Custom Validators
Create custom validation functions:

```lua
-- Custom coordinate validator
local function validateCoords(coords)
    return type(coords) == 'table' and 
           type(coords.x) == 'number' and 
           type(coords.y) == 'number' and 
           type(coords.z) == 'number'
end

-- Custom plate validator
local function validatePlate(plate)
    return type(plate) == 'string' and 
           string.len(plate) >= 3 and 
           string.len(plate) <= 8
end
```

---

## Error Handling

### CallbackError
{: .d-inline-block }
Shared
{: .label .label-purple }

Creates a standardized callback error object.

```lua
exports.community_bridge:CallbackError(message, code, data)
```

#### Parameters
- `message` (string): Error message
- `code` (string, optional): Error code
- `data` (any, optional): Additional error data

#### Returns
- `table`: Error object

#### Example
```lua
local error = exports.community_bridge:CallbackError(
    'Invalid player ID',
    'INVALID_PLAYER',
    { playerId = 999 }
)

return error
```

### IsCallbackError
{: .d-inline-block }
Shared
{: .label .label-purple }

Checks if a value is a callback error object.

```lua
exports.community_bridge:IsCallbackError(value)
```

#### Parameters
- `value` (any): Value to check

#### Returns
- `boolean`: True if value is a callback error

#### Example
```lua
local result = exports.community_bridge:TriggerServerCallback('test:callback')

if exports.community_bridge:IsCallbackError(result) then
    print('Error: ' .. result.message)
else
    print('Success: ' .. json.encode(result))
end
```

---

## Performance Utilities

### DebounceCallback
{: .d-inline-block }
Shared
{: .label .label-purple }

Creates a debounced version of a callback function.

```lua
exports.community_bridge:DebounceCallback(callback, delay)
```

#### Parameters
- `callback` (function): Function to debounce
- `delay` (number): Delay in milliseconds

#### Returns
- `function`: Debounced function

#### Example
```lua
local debouncedSave = exports.community_bridge:DebounceCallback(function(data)
    exports.community_bridge:TriggerServerCallback('player:saveData', data)
end, 1000)

-- Multiple rapid calls will be debounced
debouncedSave(playerData)
debouncedSave(playerData)
debouncedSave(playerData) -- Only this one will execute after 1 second
```

### ThrottleCallback
{: .d-inline-block }
Shared
{: .label .label-purple }

Creates a throttled version of a callback function.

```lua
exports.community_bridge:ThrottleCallback(callback, interval)
```

#### Parameters
- `callback` (function): Function to throttle
- `interval` (number): Minimum interval between calls in milliseconds

#### Returns
- `function`: Throttled function

#### Example
```lua
local throttledUpdate = exports.community_bridge:ThrottleCallback(function(position)
    exports.community_bridge:TriggerServerCallback('player:updatePosition', position)
end, 500)

-- Will execute at most once every 500ms
CreateThread(function()
    while true do
        throttledUpdate(GetEntityCoords(PlayerPedId()))
        Wait(100) -- Called every 100ms, but throttled to 500ms
    end
end)
```

---

## Testing Utilities

### MockCallback
{: .d-inline-block }
Shared
{: .label .label-purple }

Creates a mock callback for testing purposes.

```lua
exports.community_bridge:MockCallback(name, response, delay)
```

#### Parameters
- `name` (string): Callback name to mock
- `response` (any): Mock response
- `delay` (number, optional): Simulated delay in milliseconds

#### Example
```lua
-- Mock a slow database operation
exports.community_bridge:MockCallback('db:getPlayerData', {
    id = 1,
    name = 'TestPlayer',
    money = 5000
}, 2000)

-- Test the callback
local result = exports.community_bridge:TriggerServerCallback('db:getPlayerData')
```

### TestCallbackPerformance
{: .d-inline-block }
Shared
{: .label .label-purple }

Tests callback performance and logs metrics.

```lua
exports.community_bridge:TestCallbackPerformance(name, iterations, data)
```

#### Parameters
- `name` (string): Callback name to test
- `iterations` (number): Number of test iterations
- `data` (any, optional): Test data

#### Returns
- `table`: Performance metrics

#### Example
```lua
local metrics = exports.community_bridge:TestCallbackPerformance('player:getData', 100)
print('Average response time: ' .. metrics.averageTime .. 'ms')
print('Min time: ' .. metrics.minTime .. 'ms')
print('Max time: ' .. metrics.maxTime .. 'ms')
```

---

## Best Practices

### Type Safety
Always validate data types in shared functions:

```lua
local function safeCallback(name, data)
    assert(type(name) == 'string', 'Callback name must be a string')
    assert(data == nil or type(data) == 'table', 'Data must be a table or nil')
    
    return exports.community_bridge:TriggerServerCallback(name, data)
end
```

### Error Propagation
Properly propagate errors through the callback chain:

```lua
local function handleCallbackResult(result)
    if exports.community_bridge:IsCallbackError(result) then
        -- Log error
        print('Callback failed: ' .. result.message)
        
        -- Show user-friendly message
        exports.community_bridge:ShowNotification('Operation failed', 'error')
        
        -- Return false to indicate failure
        return false
    end
    
    return result
end
```

### Resource Management
Clean up resources when no longer needed:

```lua
-- Store active promises for cleanup
local activePromises = {}

local function cleanupPromises()
    for id, promise in pairs(activePromises) do
        if promise.isResolved or promise.isRejected then
            activePromises[id] = nil
        end
    end
end

-- Cleanup on resource stop
AddEventHandler('onResourceStop', function(resourceName)
    if resourceName == GetCurrentResourceName() then
        for _, promise in pairs(activePromises) do
            promise:reject('Resource stopping')
        end
        activePromises = {}
    end
end)
```
