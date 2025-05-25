---
layout: default
title: Client Functions
parent: Weather
grand_parent: Modules
nav_order: 1
---

# Weather - Client Functions
{: .no_toc }

Client-side weather management and environmental effects in Community Bridge.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Weather client module provides comprehensive weather management capabilities including weather synchronization, environmental effects, forecasting, and visual weather systems for FiveM servers.

## Getting Started

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Set weather type
Bridge.Weather.SetWeather('RAIN')

-- Get current weather
local currentWeather = Bridge.Weather.GetCurrentWeather()
```

## Core Weather Functions

### SetWeather
Sets the current weather type with optional transition.

```lua
Bridge.Weather.SetWeather(weatherType, transitionTime)
```

**Parameters:**
- `weatherType` (string) - Weather type to set
- `transitionTime` (number, optional) - Transition duration in milliseconds

**Example:**
```lua
-- Immediate weather change
Bridge.Weather.SetWeather('THUNDER')

-- Gradual transition over 30 seconds
Bridge.Weather.SetWeather('RAIN', 30000)
```

### GetCurrentWeather
Retrieves the current weather information.

```lua
Bridge.Weather.GetCurrentWeather()
```

**Returns:**
- `table` - Current weather data including type, intensity, and duration

**Example:**
```lua
local weather = Bridge.Weather.GetCurrentWeather()
print('Current weather:', weather.type)
print('Intensity:', weather.intensity)
print('Time remaining:', weather.timeRemaining)
```

### SetWeatherTransition
Creates a smooth transition between weather types.

```lua
Bridge.Weather.SetWeatherTransition(fromWeather, toWeather, duration)
```

**Parameters:**
- `fromWeather` (string) - Starting weather type
- `toWeather` (string) - Target weather type
- `duration` (number) - Transition duration in seconds

**Example:**
```lua
-- Transition from clear to stormy over 2 minutes
Bridge.Weather.SetWeatherTransition('CLEAR', 'THUNDER', 120)
```

## Weather Control Functions

### FreezeWeather
Freezes the current weather state.

```lua
Bridge.Weather.FreezeWeather(freeze)
```

**Parameters:**
- `freeze` (boolean) - Whether to freeze weather

**Example:**
```lua
-- Freeze current weather
Bridge.Weather.FreezeWeather(true)

-- Unfreeze weather
Bridge.Weather.FreezeWeather(false)
```

### SetWeatherOwnership
Takes control of weather synchronization.

```lua
Bridge.Weather.SetWeatherOwnership(enable)
```

**Parameters:**
- `enable` (boolean) - Whether to enable weather ownership

**Example:**
```lua
-- Take control of weather
Bridge.Weather.SetWeatherOwnership(true)
```

### SyncWeatherWithServer
Synchronizes local weather with server state.

```lua
Bridge.Weather.SyncWeatherWithServer()
```

**Example:**
```lua
-- Force sync with server weather
Bridge.Weather.SyncWeatherWithServer()
```

## Wind and Atmosphere Functions

### SetWindSpeed
Sets the wind speed and direction.

```lua
Bridge.Weather.SetWindSpeed(speed)
```

**Parameters:**
- `speed` (number) - Wind speed (0.0 to 12.0)

**Example:**
```lua
-- Set moderate wind
Bridge.Weather.SetWindSpeed(5.0)

-- Calm conditions
Bridge.Weather.SetWindSpeed(0.0)
```

### SetWindDirection
Sets the wind direction.

```lua
Bridge.Weather.SetWindDirection(direction)
```

**Parameters:**
- `direction` (number) - Wind direction in degrees (0-360)

**Example:**
```lua
-- North wind
Bridge.Weather.SetWindDirection(0)

-- East wind
Bridge.Weather.SetWindDirection(90)
```

### GetWindData
Retrieves current wind information.

```lua
Bridge.Weather.GetWindData()
```

**Returns:**
- `table` - Wind data including speed and direction

**Example:**
```lua
local wind = Bridge.Weather.GetWindData()
print('Wind speed:', wind.speed)
print('Wind direction:', wind.direction)
```

## Rainfall and Precipitation

### SetRainLevel
Sets the intensity of rainfall.

```lua
Bridge.Weather.SetRainLevel(level)
```

**Parameters:**
- `level` (number) - Rain intensity (0.0 to 1.0)

**Example:**
```lua
-- Light rain
Bridge.Weather.SetRainLevel(0.3)

-- Heavy downpour
Bridge.Weather.SetRainLevel(1.0)
```

### GetRainLevel
Gets the current rain intensity.

```lua
Bridge.Weather.GetRainLevel()
```

**Returns:**
- `number` - Current rain level (0.0 to 1.0)

**Example:**
```lua
local rainLevel = Bridge.Weather.GetRainLevel()
if rainLevel > 0.5 then
    print('Heavy rain detected')
end
```

### SetSnowLevel
Sets snow intensity for winter weather.

```lua
Bridge.Weather.SetSnowLevel(level)
```

**Parameters:**
- `level` (number) - Snow intensity (0.0 to 1.0)

**Example:**
```lua
-- Light snowfall
Bridge.Weather.SetSnowLevel(0.4)

-- Blizzard conditions
Bridge.Weather.SetSnowLevel(1.0)
```

## Weather Effects Functions

### EnableWeatherEffects
Enables or disables weather visual effects.

```lua
Bridge.Weather.EnableWeatherEffects(enable)
```

**Parameters:**
- `enable` (boolean) - Whether to enable effects

**Example:**
```lua
-- Enable weather effects
Bridge.Weather.EnableWeatherEffects(true)

-- Disable for performance
Bridge.Weather.EnableWeatherEffects(false)
```

### SetWeatherParticles
Controls weather particle effects.

```lua
Bridge.Weather.SetWeatherParticles(particleType, density)
```

**Parameters:**
- `particleType` (string) - Type of particles ('rain', 'snow', 'dust')
- `density` (number) - Particle density (0.0 to 1.0)

**Example:**
```lua
-- Dense rain particles
Bridge.Weather.SetWeatherParticles('rain', 0.8)

-- Light snow
Bridge.Weather.SetWeatherParticles('snow', 0.3)
```

### SetFogLevel
Sets the fog density.

```lua
Bridge.Weather.SetFogLevel(level)
```

**Parameters:**
- `level` (number) - Fog density (0.0 to 1.0)

**Example:**
```lua
-- Heavy fog
Bridge.Weather.SetFogLevel(0.9)

-- Clear visibility
Bridge.Weather.SetFogLevel(0.0)
```

## Weather Forecasting

### GetWeatherForecast
Retrieves the weather forecast.

```lua
Bridge.Weather.GetWeatherForecast(hours)
```

**Parameters:**
- `hours` (number, optional) - Number of hours to forecast (default: 24)

**Returns:**
- `table` - Array of weather forecast data

**Example:**
```lua
local forecast = Bridge.Weather.GetWeatherForecast(12)
for i, weather in ipairs(forecast) do
    print('Hour ' .. i .. ':', weather.type)
end
```

### PredictWeatherChange
Predicts upcoming weather changes.

```lua
Bridge.Weather.PredictWeatherChange()
```

**Returns:**
- `table` - Next weather change information

**Example:**
```lua
local nextChange = Bridge.Weather.PredictWeatherChange()
if nextChange then
    print('Next weather:', nextChange.type)
    print('In:', nextChange.timeUntil .. ' minutes')
end
```

## Weather Events and Callbacks

### OnWeatherChange
Registers a callback for weather changes.

```lua
Bridge.Weather.OnWeatherChange(callback)
```

**Parameters:**
- `callback` (function) - Function to call on weather change

**Example:**
```lua
Bridge.Weather.OnWeatherChange(function(newWeather, oldWeather)
    print('Weather changed from', oldWeather, 'to', newWeather)
    
    -- Adjust vehicle handling for rain
    if newWeather == 'RAIN' then
        -- Reduce vehicle traction
    end
end)
```

### OnWeatherSync
Registers a callback for weather synchronization events.

```lua
Bridge.Weather.OnWeatherSync(callback)
```

**Parameters:**
- `callback` (function) - Function to call on sync

**Example:**
```lua
Bridge.Weather.OnWeatherSync(function(weatherData)
    print('Weather synced:', weatherData.type)
    -- Update local weather effects
end)
```

## Utility Functions

### IsWeatherType
Checks if current weather matches a specific type.

```lua
Bridge.Weather.IsWeatherType(weatherType)
```

**Parameters:**
- `weatherType` (string) - Weather type to check

**Returns:**
- `boolean` - True if weather matches

**Example:**
```lua
if Bridge.Weather.IsWeatherType('RAIN') then
    print('It is currently raining')
end
```

### GetWeatherIntensity
Gets the intensity of the current weather.

```lua
Bridge.Weather.GetWeatherIntensity()
```

**Returns:**
- `number` - Weather intensity (0.0 to 1.0)

**Example:**
```lua
local intensity = Bridge.Weather.GetWeatherIntensity()
if intensity > 0.7 then
    print('Intense weather conditions')
end
```

### IsExtremeWeather
Checks if current weather is considered extreme.

```lua
Bridge.Weather.IsExtremeWeather()
```

**Returns:**
- `boolean` - True if weather is extreme

**Example:**
```lua
if Bridge.Weather.IsExtremeWeather() then
    print('Extreme weather warning!')
    -- Trigger emergency protocols
end
```

## Integration Examples

### Dynamic Weather System
```lua
local function setupDynamicWeather()
    -- Register weather change handler
    Bridge.Weather.OnWeatherChange(function(newWeather, oldWeather)
        -- Adjust game mechanics based on weather
        if newWeather == 'RAIN' then
            -- Reduce vehicle grip
            -- Increase accident chances
        elseif newWeather == 'FOG' then
            -- Reduce visibility
            -- Enable fog lights
        end
    end)
    
    -- Sync with server weather
    Bridge.Weather.SyncWeatherWithServer()
end
```

### Weather-Based Vehicle Handling
```lua
local function adjustVehicleForWeather()
    local currentWeather = Bridge.Weather.GetCurrentWeather()
    local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
    
    if vehicle ~= 0 then
        if currentWeather.type == 'RAIN' then
            -- Reduce traction for rain
            SetVehicleHandlingFloat(vehicle, 'CHandlingData', 'fTractionCurveMax', 0.8)
        elseif currentWeather.type == 'SNOW' then
            -- Significantly reduce traction for snow
            SetVehicleHandlingFloat(vehicle, 'CHandlingData', 'fTractionCurveMax', 0.5)
        end
    end
end
```

### Weather UI Integration
```lua
local function updateWeatherUI()
    local weather = Bridge.Weather.GetCurrentWeather()
    local forecast = Bridge.Weather.GetWeatherForecast(6)
    
    -- Update current weather display
    SendNUIMessage({
        type = 'updateWeather',
        current = {
            type = weather.type,
            intensity = weather.intensity,
            temperature = weather.temperature
        },
        forecast = forecast
    })
end
```

---

## Related Documentation

- [Weather Server Functions](server.md) - Server-side weather management
- [Weather Shared Functions](shared.md) - Shared weather utilities
- [Weather Overview](index.md) - Module introduction and features
