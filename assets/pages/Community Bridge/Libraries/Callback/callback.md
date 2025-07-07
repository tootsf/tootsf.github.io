# Callback 📞

<!--META
nav: true
toc: true
description: The Callback library provides a robust client-server communication system with support for promises, callbacks, and resource-specific cleanup. It handles bi-directional communication between client and server with automatic timeout and error handling.
-->

The Callback library provides a robust client-server communication system with support for promises, callbacks, and resource-specific cleanup. It handles bi-directional communication between client and server with automatic timeout and error handling.

## Overview

The Callback provides functionality for FiveM resources.

## Client Functions

### Register

<!--TOC: Register-->

**Context:** 🖥️ Client

Registers a client-side callback function that can be triggered by the server.

**Syntax:** `Bridge.Callback.Register(name, handler)`

**Parameters:**
- `name` (string) - Unique name for the callback
- `handler` (function) - Function to execute when callback is triggered

**Returns:** None

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a client callback
Bridge.Callback.Register('getPlayerInfo', function()
    local ped = PlayerPedId()
    return {
        health = GetEntityHealth(ped),
        coords = GetEntityCoords(ped),
        model = GetEntityModel(ped)
    }
end)
```

### RegisterRebound

<!--TOC: RegisterRebound-->

**Context:** 🖥️ Client

Registers a rebound callback that receives responses from server callbacks triggered by this client.

**Syntax:** `Bridge.Callback.RegisterRebound(name, handler)`

**Parameters:**
- `name` (string) - Name of the callback to rebound from
- `handler` (function) - Function to handle the rebound response

**Returns:** None

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a rebound callback for server responses
Bridge.Callback.RegisterRebound('validateUser', function(isValid, reason)
    if isValid then
        print('User validation successful')
    else
        print('User validation failed: ' .. reason)
    end
end)
```

### Trigger

<!--TOC: Trigger-->

**Context:** 🖥️ Client

Triggers a server-side callback and optionally handles the response with a callback or returns a promise.

**Syntax:** `Bridge.Callback.Trigger(name, ...)`

**Parameters:**
- `name` (string) - Name of the server callback to trigger
- `...` (any) - Arguments to pass to the server callback (optional callback function as first argument)

**Returns:**
- (any) - Return value from server callback (when not using callback function)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Trigger with callback
Bridge.Callback.Trigger('getUserMoney', function(money)
    print('Player has $' .. money)
end, GetPlayerServerId(PlayerId()))

-- Trigger with promise (await style)
local money = Bridge.Callback.Trigger('getUserMoney', GetPlayerServerId(PlayerId()))
print('Player has $' .. money)
```

## Server Functions

### Register

<!--TOC: Register-->

**Context:** 🖲️ Server

Registers a server-side callback function that can be triggered by clients.

**Syntax:** `Bridge.Callback.Register(name, handler)`

**Parameters:**
- `name` (string) - Unique name for the callback
- `handler` (function) - Function to execute when callback is triggered (first parameter is source player ID)

**Returns:** None

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a server callback
Bridge.Callback.Register('getUserMoney', function(source, targetId)
    local player = Bridge.Framework.GetPlayer(targetId or source)
    if player then
        return player.PlayerData.money.cash
    end
    return 0
end)
```

### Trigger

<!--TOC: Trigger-->

**Context:** 🖲️ Server

Triggers a client-side callback on specific player(s) and optionally handles the response.

**Syntax:** `Bridge.Callback.Trigger(name, target, ...)`

**Parameters:**
- `name` (string) - Name of the client callback to trigger
- `target` (number | table) - Player ID or table of player IDs to trigger callback on
- `...` (any) - Arguments to pass to the client callback (optional callback function as first argument)

**Returns:**
- (any) - Return value from client callback (when not using callback function)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Trigger on specific player with callback
Bridge.Callback.Trigger('getPlayerInfo', function(playerInfo)
    print('Player health: ' .. playerInfo.health)
end, playerId)

-- Trigger on multiple players
local playerIds = {1, 2, 3}
local playerInfo = Bridge.Callback.Trigger('getPlayerInfo', playerIds)
print('Player info received')
```

