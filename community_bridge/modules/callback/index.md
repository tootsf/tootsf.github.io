---
layout: default
title: Callback
parent: Modules
grand_parent: Community Bridge
nav_order: 9
has_children: true
---

# Callback Module
{: .no_toc }

The Callback module provides a robust client-server communication system with promise-based callbacks, timeout handling, and advanced data synchronization capabilities.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Callback module enables seamless bidirectional communication between client and server with support for promises, async/await patterns, timeout handling, and data validation for reliable FiveM resource development.

### Key Features

- **Promise-Based Callbacks**: Modern async/await support
- **Timeout Management**: Automatic timeout handling and cleanup
- **Data Validation**: Built-in request/response validation
- **Error Handling**: Comprehensive error management
- **Request Queuing**: Queue management for high-load scenarios
- **Performance Monitoring**: Track callback performance and reliability
- **Retry Logic**: Automatic retry for failed requests
- **Secure Communication**: Data encryption and validation

## Architecture

```
Callback Module
├── Client Functions    → Request initiation, response handling, local callbacks
├── Server Functions    → Request processing, data validation, response management
└── Shared Functions    → Validation, utilities, error handling
```

## Callback Types

### Server Callbacks
- Data retrieval from database
- Server-side validation
- Complex calculations
- Cross-resource communication

### Client Callbacks
- UI interactions
- Local data processing
- Animation triggers
- Player input validation

### Bidirectional Callbacks
- Real-time data synchronization
- Multi-step processes
- Interactive workflows
- Dynamic data updates

## Quick Start

### Basic Server Callback

```lua
-- Server Side - Register callback
exports.community_bridge:RegisterServerCallback('getPlayerMoney', function(src, cb, accountType)
    local playerData = exports.community_bridge:GetPlayerData(src)
    if playerData then
        local money = playerData.money[accountType] or 0
        cb(money)
    else
        cb(nil, "Player data not found")
    end
end)

-- Client Side - Call callback
exports.community_bridge:TriggerServerCallback('getPlayerMoney', function(money, error)
    if error then
        print("Error:", error)
        return
    end
    
    print("Player money:", money)
    -- Update UI with money value
end, 'bank')
```

### Promise-Based Callback

```lua
-- Client Side - Using promises
local function getPlayerMoney(accountType)
    return exports.community_bridge:TriggerServerCallbackPromise('getPlayerMoney', accountType)
end

-- Usage with async/await pattern
Citizen.CreateThread(function()
    local money, error = getPlayerMoney('bank')
    if error then
        print("Failed to get money:", error)
        return
    end
    
    print("Bank balance:", money)
end)
```

### Client Callback

```lua
-- Client Side - Register callback
exports.community_bridge:RegisterClientCallback('showNotification', function(cb, message, type, duration)
    exports.community_bridge:SendNotify(message, type)
    
    -- Simulate notification display duration
    Citizen.SetTimeout(duration or 3000, function()
        cb(true, "Notification shown")
    end)
end)

-- Server Side - Trigger client callback
exports.community_bridge:TriggerClientCallback(playerId, 'showNotification', function(success, result)
    if success then
        print("Notification displayed to player", playerId)
    end
end, "Welcome to the server!", "success", 5000)
```

## Advanced Callback Patterns

### Multi-Step Callback Process

```lua
-- Server Side - Complex multi-step process
exports.community_bridge:RegisterServerCallback('purchaseVehicle', function(src, cb, vehicleData)
    -- Step 1: Validate player funds
    local playerMoney = exports.community_bridge:GetMoney(src, 'bank')
    if playerMoney < vehicleData.price then
        cb(nil, "Insufficient funds")
        return
    end
    
    -- Step 2: Check vehicle availability
    local available = exports.community_bridge:IsVehicleAvailable(vehicleData.model)
    if not available then
        cb(nil, "Vehicle not available")
        return
    end
    
    -- Step 3: Process purchase
    local success = exports.community_bridge:RemoveMoney(src, 'bank', vehicleData.price)
    if success then
        local vehicleId = exports.community_bridge:CreatePlayerVehicle(src, vehicleData)
        cb({
            vehicleId = vehicleId,
            remainingMoney = exports.community_bridge:GetMoney(src, 'bank'),
            purchaseTime = os.time()
        })
    else
        cb(nil, "Payment processing failed")
    end
end)
```

### Callback with Data Validation

```lua
-- Server Side - Callback with validation
exports.community_bridge:RegisterServerCallback('updatePlayerProfile', function(src, cb, profileData)
    -- Validate input data
    local validation = exports.community_bridge:ValidatePlayerProfile(profileData)
    if not validation.valid then
        cb(nil, "Validation failed: " .. table.concat(validation.errors, ", "))
        return
    end
    
    -- Update profile
    local success = exports.community_bridge:UpdatePlayerProfile(src, profileData)
    if success then
        cb({
            success = true,
            profile = exports.community_bridge:GetPlayerProfile(src),
            timestamp = os.time()
        })
    else
        cb(nil, "Database update failed")
    end
end)
```

## Timeout and Error Handling

### Callback with Timeout

```lua
-- Client Side - Callback with custom timeout
exports.community_bridge:TriggerServerCallback('heavyOperation', function(result, error, timedOut)
    if timedOut then
        exports.community_bridge:SendNotify("Operation timed out, please try again", "error")
        return
    end
    
    if error then
        exports.community_bridge:SendNotify("Error: " .. error, "error")
        return
    end
    
    -- Process successful result
    print("Operation completed:", json.encode(result))
end, operationData, 10000) -- 10 second timeout
```

### Retry Logic

```lua
-- Client Side - Callback with retry logic
local function reliableServerCallback(callbackName, data, maxRetries)
    maxRetries = maxRetries or 3
    local attempts = 0
    
    local function attempt()
        attempts = attempts + 1
        
        exports.community_bridge:TriggerServerCallback(callbackName, function(result, error)
            if error and attempts < maxRetries then
                print("Attempt", attempts, "failed, retrying...")
                Citizen.SetTimeout(1000 * attempts, attempt) -- Exponential backoff
            elseif error then
                print("All attempts failed:", error)
            else
                print("Success after", attempts, "attempts")
                return result
            end
        end, data)
    end
    
    attempt()
end
```

## Queue Management

### Callback Queue System

```lua
-- Client Side - Queue callbacks to prevent overwhelming
local callbackQueue = {}
local isProcessingQueue = false

local function queueCallback(callbackName, data, callback, priority)
    table.insert(callbackQueue, {
        name = callbackName,
        data = data,
        callback = callback,
        priority = priority or 1,
        timestamp = GetGameTimer()
    })
    
    if not isProcessingQueue then
        processCallbackQueue()
    end
end

local function processCallbackQueue()
    if #callbackQueue == 0 then
        isProcessingQueue = false
        return
    end
    
    isProcessingQueue = true
    
    -- Sort by priority
    table.sort(callbackQueue, function(a, b)
        return a.priority > b.priority
    end)
    
    local item = table.remove(callbackQueue, 1)
    
    exports.community_bridge:TriggerServerCallback(item.name, function(result, error)
        if item.callback then
            item.callback(result, error)
        end
        
        -- Process next item after delay
        Citizen.SetTimeout(100, processCallbackQueue)
    end, item.data)
end
```

## Performance Monitoring

### Callback Performance Tracking

```lua
-- Client Side - Performance monitoring
local callbackMetrics = {}

local function trackCallbackPerformance(callbackName, startTime, success)
    if not callbackMetrics[callbackName] then
        callbackMetrics[callbackName] = {
            calls = 0,
            totalTime = 0,
            successes = 0,
            failures = 0
        }
    end
    
    local metrics = callbackMetrics[callbackName]
    metrics.calls = metrics.calls + 1
    metrics.totalTime = metrics.totalTime + (GetGameTimer() - startTime)
    
    if success then
        metrics.successes = metrics.successes + 1
    else
        metrics.failures = metrics.failures + 1
    end
end

-- Enhanced callback with performance tracking
local function trackedServerCallback(callbackName, callback, ...)
    local startTime = GetGameTimer()
    
    exports.community_bridge:TriggerServerCallback(callbackName, function(result, error)
        trackCallbackPerformance(callbackName, startTime, not error)
        
        if callback then
            callback(result, error)
        end
    end, ...)
end
```

## Module Files

- **[Client Functions](client.md)**: Request initiation, local callbacks, promise handling
- **[Server Functions](server.md)**: Request processing, validation, response management
- **[Shared Functions](shared.md)**: Validation, utilities, error handling

## Security Considerations

### Data Validation

```lua
-- Server Side - Secure callback with validation
exports.community_bridge:RegisterServerCallback('secureOperation', function(src, cb, data)
    -- Validate source player
    if not exports.community_bridge:IsPlayerValid(src) then
        cb(nil, "Invalid player")
        return
    end
    
    -- Validate data structure
    local validation = exports.community_bridge:ValidateCallbackData(data, {
        required = {"action", "parameters"},
        types = {action = "string", parameters = "table"}
    })
    
    if not validation.valid then
        cb(nil, "Invalid data format")
        return
    end
    
    -- Check permissions
    if not exports.community_bridge:HasPermission(src, data.action) then
        cb(nil, "Insufficient permissions")
        return
    end
    
    -- Process secure operation
    local result = processSecureOperation(src, data)
    cb(result)
end)
```

### Rate Limiting

```lua
-- Server Side - Rate limiting for callbacks
local callbackRateLimit = {}

local function checkRateLimit(src, callbackName, limit, window)
    limit = limit or 10 -- 10 calls
    window = window or 60000 -- per minute
    
    local currentTime = GetGameTimer()
    local playerKey = src .. "_" .. callbackName
    
    if not callbackRateLimit[playerKey] then
        callbackRateLimit[playerKey] = {
            calls = 0,
            windowStart = currentTime
        }
    end
    
    local rateData = callbackRateLimit[playerKey]
    
    -- Reset window if expired
    if currentTime - rateData.windowStart > window then
        rateData.calls = 0
        rateData.windowStart = currentTime
    end
    
    -- Check limit
    if rateData.calls >= limit then
        return false, "Rate limit exceeded"
    end
    
    rateData.calls = rateData.calls + 1
    return true
end
```

## Best Practices

### Error Handling

```lua
-- Always handle errors gracefully
exports.community_bridge:TriggerServerCallback('operation', function(result, error)
    if error then
        -- Log error for debugging
        print("Callback error:", error)
        
        -- Show user-friendly message
        exports.community_bridge:SendNotify("Operation failed, please try again", "error")
        
        -- Fallback behavior
        handleOperationFailure()
        return
    end
    
    -- Handle successful result
    handleOperationSuccess(result)
end, data)
```

### Memory Management

```lua
-- Clean up callback references
local activeCallbacks = {}

local function cleanupCallbacks()
    local currentTime = GetGameTimer()
    for id, callbackData in pairs(activeCallbacks) do
        if currentTime - callbackData.timestamp > 30000 then -- 30 seconds
            activeCallbacks[id] = nil
        end
    end
end

-- Run cleanup periodically
Citizen.CreateThread(function()
    while true do
        cleanupCallbacks()
        Wait(10000) -- Every 10 seconds
    end
end)
```

---

The Callback module provides robust client-server communication capabilities with modern async patterns, comprehensive error handling, and performance optimization for reliable FiveM resource development.
