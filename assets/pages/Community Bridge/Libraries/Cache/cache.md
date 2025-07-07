# Cache 💾

<!--META
nav: true
toc: true
description: The Cache library provides a powerful caching system with automatic updates, change detection, and resource cleanup. It allows you to cache expensive calculations or frequently accessed data with configurable update intervals and callback support.
-->

The Cache library provides a powerful caching system with automatic updates, change detection, and resource cleanup. It allows you to cache expensive calculations or frequently accessed data with configurable update intervals and callback support.

## Overview

The Cache provides functionality for FiveM resources.

<--FNC
{
  "name": "OnChange",
  "side": "shared",
  "description": "Registers a callback function to be called when the cache value changes",
  "syntax": "Cache.OnChange(name, onChange)",
  "parameters": [
    { "name": "name", "type": "string", "description": "Name of the cache entry" },
    { "name": "onChange", "type": "function", "description": "Callback function with signature (newValue, oldValue)" }
  ],
  "returns": [
    { "type": "string", "description": "Callback ID for removal purposes" }
  ],
  "example": "local callbackId = Cache.OnChange(\"player_health\", function(newHealth, oldHealth)\n    print(\"Health changed from \" .. oldHealth .. \" to \" .. newHealth)\nend)"
}
FNC-->

<--FNC
{
  "name": "RemoveOnChange",
  "side": "shared", 
  "description": "Removes a previously registered onChange callback using its ID",
  "syntax": "Cache.RemoveOnChange(name, id)",
  "parameters": [
    { "name": "name", "type": "string", "description": "Name of the cache entry" },
    { "name": "id", "type": "string", "description": "Callback ID returned from OnChange" }
  ],
  "returns": [
    { "type": "boolean", "description": "Returns true if callback was removed successfully" }
  ],
  "example": "local success = Cache.RemoveOnChange(\"player_health\", callbackId)\nprint(\"Callback removed: \" .. tostring(success))"
}
FNC-->

## Shared Functions

### Create

<!--TOC: Create-->

**Context:** 🔄 Shared

Creates a new cache entry with a comparison function and optional update interval. The cache will automatically update based on the wait time and call registered callbacks when values change.

**Syntax:** `Cache.Create(name, compare, waitTime)`

**Parameters:**
- `name` (string) - Unique name for the cache entry
- `compare` (function) - Function that returns the current value to cache
- `waitTime` (number | nil) - Update interval in milliseconds (nil for manual updates only)

**Returns:**
- (CacheEntry | nil) - The created cache entry or nil if creation failed

**Example:**
```lua
-- Cache player health with 1 second updates
local healthCache = Cache.Create(
    "player_health",
    function()
        return GetEntityHealth(PlayerPedId())
    end,
    1000
)

print("Health cache created with initial value: " .. tostring(healthCache.Value))
```

### Get

<!--TOC: Get-->

**Context:** 🔄 Shared

Retrieves the current cached value for the specified cache name.

**Syntax:** `Cache.Get(name)`

**Parameters:**
- `name` (string) - Name of the cache entry to retrieve

**Returns:**
- (any) - The cached value or nil if cache doesn't exist

**Example:**
```lua
-- Get the cached player health
local currentHealth = Cache.Get("player_health")
if currentHealth then
    print("Player health: " .. currentHealth)
else
    print("Health cache not found")
end
```

### OnChange

<!--TOC: OnChange-->

**Context:** 🔄 Shared

Registers a callback function to be called whenever the cached value changes. The callback receives both new and old values.

**Syntax:** `Cache.OnChange(name, onChange)`

**Parameters:**
- `name` (string) - Name of the cache entry to monitor
- `onChange` (function) - Callback function with signature (newValue, oldValue)

**Returns:**
- (string) - Callback ID for removal purposes

**Example:**
```lua
-- Monitor health changes
local callbackId = Cache.OnChange("player_health", function(newHealth, oldHealth)
    local diff = newHealth - oldHealth
    if diff > 0 then
        print("Health increased by " .. diff)
    elseif diff < 0 then
        print("Health decreased by " .. math.abs(diff))
    end
end)

print("Health monitor registered with ID: " .. callbackId)
```

### RemoveOnChange

<!--TOC: RemoveOnChange-->

**Context:** 🔄 Shared

Removes a previously registered onChange callback using its ID.

**Syntax:** `Cache.RemoveOnChange(name, id)`

**Parameters:**
- `name` (string) - Name of the cache entry
- `id` (string) - Callback ID returned from OnChange

**Returns:** None

**Example:**
```lua
-- Remove the health monitor callback
Cache.RemoveOnChange("player_health", callbackId)
print("Health monitor callback removed")
```

### Remove

<!--TOC: Remove-->

**Context:** 🔄 Shared

Completely removes a cache entry and all its associated callbacks. This will stop all automatic updates for the cache.

**Syntax:** `Cache.Remove(name)`

**Parameters:**
- `name` (string) - Name of the cache entry to remove

**Returns:** None

**Example:**
```lua
-- Remove the health cache completely
Cache.Remove("player_health")
print("Health cache removed")
```

### Update

<!--TOC: Update-->

**Context:** 🔄 Shared

Manually updates a cache entry with a new value and triggers onChange callbacks if the value has changed.

**Syntax:** `Cache.Update(name, newValue)`

**Parameters:**
- `name` (string) - Name of the cache entry to update
- `newValue` (any) - The new value to set

**Returns:** None

**Example:**
```lua
-- Manually update the health cache
Cache.Update("player_health", 150)
print("Health cache manually updated to 150")
```

