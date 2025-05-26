---
layout: default
title: Server Functions
parent: Weather
grand_parent: Modules
nav_order: 2
---

# Weather - Server Functions
{: .no_toc }

Server-side weather management and synchronization in Community Bridge.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Weather server module provides centralized weather management, synchronization across clients, weather scheduling, and administrative controls for weather systems in FiveM servers.

## Getting Started

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Set global weather
Bridge.Weather.SetGlobalWeather('RAIN')

-- Schedule weather change
Bridge.Weather.ScheduleWeatherChange('CLEAR', 1800) -- 30 minutes
```

## Global Weather Management

---

## 🔹 SetGlobalWeather
Sets weather for all connected players.

```lua
Bridge.Weather.SetGlobalWeather(weatherType, transitionTime)
```

**Parameters:**
- `weatherType` (string) - Weather type to set globally
- `transitionTime` (number, optional) - Transition duration in seconds

**Example:**
```lua
-- Immediate global weather change
Bridge.Weather.SetGlobalWeather('THUNDER')

-- Gradual transition over 5 minutes
Bridge.Weather.SetGlobalWeather('RAIN', 300)
```

---

## 🔹 GetGlobalWeather
Retrieves the current global weather state.

```lua
Bridge.Weather.GetGlobalWeather()
```

**Returns:**
- `table` - Global weather data including type, start time, and duration

**Example:**
```lua
local globalWeather = Bridge.Weather.GetGlobalWeather()
print('Global weather:', globalWeather.type)
print('Started at:', globalWeather.startTime)
print('Duration:', globalWeather.duration)
```

---

## 🔹 SyncWeatherToPlayer
Synchronizes current weather to a specific player.

```lua
Bridge.Weather.SyncWeatherToPlayer(playerId)
```

**Parameters:**
- `playerId` (number) - Player ID to sync weather to

**Example:**
```lua
-- Sync weather to newly connected player
Bridge.Weather.SyncWeatherToPlayer(source)
```

---

## 🔹 SyncWeatherToAll
Synchronizes weather to all connected players.

```lua
Bridge.Weather.SyncWeatherToAll()
```

**Example:**
```lua
-- Force sync weather to everyone
Bridge.Weather.SyncWeatherToAll()
```

## Weather Scheduling

---

## 🔹 ScheduleWeatherChange
Schedules a weather change for the future.

```lua
Bridge.Weather.ScheduleWeatherChange(weatherType, delaySeconds, duration)
```

**Parameters:**
- `weatherType` (string) - Weather type to schedule
- `delaySeconds` (number) - Delay before weather change
- `duration` (number, optional) - Duration of the weather

**Example:**
```lua
-- Rain in 10 minutes for 1 hour
Bridge.Weather.ScheduleWeatherChange('RAIN', 600, 3600)

-- Thunderstorm in 5 minutes (indefinite duration)
Bridge.Weather.ScheduleWeatherChange('THUNDER', 300)
```

---

## 🔹 GetWeatherSchedule
Retrieves the current weather schedule.

```lua
Bridge.Weather.GetWeatherSchedule()
```

**Returns:**
- `table` - Array of scheduled weather events

**Example:**
```lua
local schedule = Bridge.Weather.GetWeatherSchedule()
for _, event in ipairs(schedule) do
    print('Scheduled:', event.type, 'at', event.time)
end
```

---

## 🔹 CancelScheduledWeather
Cancels a scheduled weather event.

```lua
Bridge.Weather.CancelScheduledWeather(scheduleId)
```

**Parameters:**
- `scheduleId` (string) - ID of the scheduled event to cancel

**Example:**
```lua
-- Cancel specific scheduled weather
Bridge.Weather.CancelScheduledWeather('storm_event_001')
```

---

## 🔹 ClearWeatherSchedule
Clears all scheduled weather events.

```lua
Bridge.Weather.ClearWeatherSchedule()
```

**Example:**
```lua
-- Clear entire weather schedule
Bridge.Weather.ClearWeatherSchedule()
```

## Automatic Weather Systems

---

## 🔹 EnableAutoWeather
Enables or disables automatic weather changes.

```lua
Bridge.Weather.EnableAutoWeather(enable, cycleTime)
```

**Parameters:**
- `enable` (boolean) - Whether to enable auto weather
- `cycleTime` (number, optional) - Time between changes in minutes

**Example:**
```lua
-- Enable auto weather with 45-minute cycles
Bridge.Weather.EnableAutoWeather(true, 45)

-- Disable automatic weather
Bridge.Weather.EnableAutoWeather(false)
```

---

## 🔹 SetWeatherCycle
Configures a custom weather cycle.

```lua
Bridge.Weather.SetWeatherCycle(weatherCycle)
```

**Parameters:**
- `weatherCycle` (table) - Array of weather types and durations

**Example:**
```lua
local cycle = {
    {type = 'CLEAR', duration = 30},
    {type = 'CLOUDS', duration = 15},
    {type = 'RAIN', duration = 20},
    {type = 'CLEAR', duration = 25}
}
Bridge.Weather.SetWeatherCycle(cycle)
```

### GetCurrentCycle
Gets information about the current weather cycle.

```lua
Bridge.Weather.GetCurrentCycle()
```

**Returns:**
- `table` - Current cycle information

**Example:**
```lua
local cycle = Bridge.Weather.GetCurrentCycle()
print('Current step:', cycle.currentStep)
print('Time remaining:', cycle.timeRemaining)
```

## Weather Region Management

### CreateWeatherRegion
Creates a localized weather region.

```lua
Bridge.Weather.CreateWeatherRegion(regionId, center, radius, weatherType)
```

**Parameters:**
- `regionId` (string) - Unique identifier for the region
- `center` (vector3) - Center coordinates of the region
- `radius` (number) - Radius of the region in meters
- `weatherType` (string) - Weather type for the region

**Example:**
```lua
-- Create storm region around airport
Bridge.Weather.CreateWeatherRegion(
    'airport_storm',
    vector3(-1037.0, -2737.0, 20.0),
    1000.0,
    'THUNDER'
)
```

### RemoveWeatherRegion
Removes a weather region.

```lua
Bridge.Weather.RemoveWeatherRegion(regionId)
```

**Parameters:**
- `regionId` (string) - ID of the region to remove

**Example:**
```lua
Bridge.Weather.RemoveWeatherRegion('airport_storm')
```

### GetActiveRegions
Gets all active weather regions.

```lua
Bridge.Weather.GetActiveRegions()
```

**Returns:**
- `table` - Array of active weather regions

**Example:**
```lua
local regions = Bridge.Weather.GetActiveRegions()
for _, region in ipairs(regions) do
    print('Region:', region.id, 'Weather:', region.weather)
end
```

## Player Weather Overrides

### SetPlayerWeather
Sets weather for a specific player.

```lua
Bridge.Weather.SetPlayerWeather(playerId, weatherType, duration)
```

**Parameters:**
- `playerId` (number) - Player ID
- `weatherType` (string) - Weather type for the player
- `duration` (number, optional) - Duration in seconds

**Example:**
```lua
-- Give player personal storm for 5 minutes
Bridge.Weather.SetPlayerWeather(source, 'THUNDER', 300)
```

### RemovePlayerWeather
Removes weather override for a player.

```lua
Bridge.Weather.RemovePlayerWeather(playerId)
```

**Parameters:**
- `playerId` (number) - Player ID to remove override

**Example:**
```lua
-- Return player to global weather
Bridge.Weather.RemovePlayerWeather(source)
```

### GetPlayerWeather
Gets the current weather for a specific player.

```lua
Bridge.Weather.GetPlayerWeather(playerId)
```

**Parameters:**
- `playerId` (number) - Player ID

**Returns:**
- `table` - Player weather information

**Example:**
```lua
local playerWeather = Bridge.Weather.GetPlayerWeather(source)
if playerWeather.override then
    print('Player has weather override:', playerWeather.type)
end
```

## Weather Data and Analytics

### LogWeatherChange
Logs a weather change event.

```lua
Bridge.Weather.LogWeatherChange(fromWeather, toWeather, reason, playerId)
```

**Parameters:**
- `fromWeather` (string) - Previous weather type
- `toWeather` (string) - New weather type
- `reason` (string) - Reason for change
- `playerId` (number, optional) - Player who triggered change

**Example:**
```lua
Bridge.Weather.LogWeatherChange('CLEAR', 'RAIN', 'admin_command', source)
```

### GetWeatherHistory
Retrieves weather change history.

```lua
Bridge.Weather.GetWeatherHistory(hours)
```

**Parameters:**
- `hours` (number, optional) - Number of hours to retrieve (default: 24)

**Returns:**
- `table` - Array of weather history events

**Example:**
```lua
local history = Bridge.Weather.GetWeatherHistory(12)
for _, event in ipairs(history) do
    print(event.timestamp, event.from, '->', event.to)
end
```

### GetWeatherStatistics
Gets weather usage statistics.

```lua
Bridge.Weather.GetWeatherStatistics()
```

**Returns:**
- `table` - Weather statistics data

**Example:**
```lua
local stats = Bridge.Weather.GetWeatherStatistics()
print('Most common weather:', stats.mostCommon)
print('Total changes today:', stats.changesTotal)
```

## Event Callbacks

### OnWeatherChangeRequest
Registers callback for weather change requests.

```lua
Bridge.Weather.OnWeatherChangeRequest(callback)
```

**Parameters:**
- `callback` (function) - Function to handle requests

**Example:**
```lua
Bridge.Weather.OnWeatherChangeRequest(function(playerId, weatherType, reason)
    -- Validate permission
    if not Bridge.Framework.HasPermission(playerId, 'weather.change') then
        return false, 'No permission'
    end
    
    -- Allow the change
    return true
end)
```

### OnPlayerWeatherSync
Registers callback for player weather synchronization.

```lua
Bridge.Weather.OnPlayerWeatherSync(callback)
```

**Parameters:**
- `callback` (function) - Function to handle sync events

**Example:**
```lua
Bridge.Weather.OnPlayerWeatherSync(function(playerId, weatherData)
    print('Syncing weather to player:', playerId)
    -- Log sync event or modify weather data
end)
```

## Administrative Functions

### ResetWeatherSystem
Resets the entire weather system to default state.

```lua
Bridge.Weather.ResetWeatherSystem()
```

**Example:**
```lua
-- Reset everything to clear weather
Bridge.Weather.ResetWeatherSystem()
```

### SetWeatherPermissions
Sets weather control permissions for a player.

```lua
Bridge.Weather.SetWeatherPermissions(playerId, permissions)
```

**Parameters:**
- `playerId` (number) - Player ID
- `permissions` (table) - Array of permission strings

**Example:**
```lua
Bridge.Weather.SetWeatherPermissions(source, {
    'weather.change',
    'weather.schedule',
    'weather.regions'
})
```

### BroadcastWeatherAlert
Sends a weather alert to all players.

```lua
Bridge.Weather.BroadcastWeatherAlert(alertType, message, severity)
```

**Parameters:**
- `alertType` (string) - Type of alert
- `message` (string) - Alert message
- `severity` (string) - Severity level

**Example:**
```lua
Bridge.Weather.BroadcastWeatherAlert(
    'storm_warning',
    'Severe thunderstorm approaching the city',
    'high'
)
```

## Integration Examples

### Automatic Weather Events
```lua
-- Setup automatic weather events
local function setupWeatherEvents()
    -- Create storm event every 2 hours
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(7200000) -- 2 hours
            
            -- 30% chance of storm
            if math.random() < 0.3 then
                Bridge.Weather.ScheduleWeatherChange('THUNDER', 300, 1800)
                Bridge.Weather.BroadcastWeatherAlert(
                    'storm_incoming',
                    'A thunderstorm is approaching',
                    'medium'
                )
            end
        end
    end)
end
```

### Region-Based Weather
```lua
-- Create weather regions for different areas
local function setupWeatherRegions()
    -- Desert area - always clear and hot
    Bridge.Weather.CreateWeatherRegion(
        'desert',
        vector3(1000.0, 3000.0, 50.0),
        2000.0,
        'CLEAR'
    )
    
    -- Mountain area - often foggy
    Bridge.Weather.CreateWeatherRegion(
        'mountains',
        vector3(-1000.0, 6000.0, 800.0),
        1500.0,
        'FOGGY'
    )
end
```

### Weather-Based Events
```lua
-- Trigger events based on weather changes
Bridge.Weather.OnWeatherChangeRequest(function(playerId, weatherType, reason)
    -- Log weather changes
    Bridge.Weather.LogWeatherChange(
        Bridge.Weather.GetGlobalWeather().type,
        weatherType,
        reason,
        playerId
    )
    
    -- Trigger special events for certain weather
    if weatherType == 'THUNDER' then
        TriggerEvent('weather:thunderstorm_started')
    elseif weatherType == 'CLEAR' then
        TriggerEvent('weather:clear_skies')
    end
    
    return true
end)
```

---

## Related Documentation

- [Weather Client Functions](client.md) - Client-side weather effects
- [Weather Shared Functions](shared.md) - Shared weather utilities  
- [Weather Overview](index.md) - Module introduction and features
