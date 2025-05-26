---
layout: default
title: Shared Functions
parent: Weather
grand_parent: Modules
nav_order: 3
---

# Weather - Shared Functions
{: .no_toc }

Shared weather utilities and configurations for Community Bridge weather systems.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Weather shared module provides common utilities, weather type definitions, and configuration functions used by both client and server-side weather systems.

## Getting Started

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get weather types
local weatherTypes = Bridge.Weather.GetWeatherTypes()

-- Validate weather
local isValid = Bridge.Weather.IsValidWeatherType('RAIN')
```

## Weather Type Management

---

## 🔹 GetWeatherTypes

Retrieves all available weather types.

```lua
Bridge.Weather.GetWeatherTypes()
```

**Returns:**
- `table` - Array of available weather type names

**Example:**
```lua
local weatherTypes = Bridge.Weather.GetWeatherTypes()
for _, weather in ipairs(weatherTypes) do
    print('Available weather:', weather)
end
```

---

## 🔹 IsValidWeatherType

Validates if a weather type exists.

```lua
Bridge.Weather.IsValidWeatherType(weatherType)
```

**Parameters:**
- `weatherType` (string) - Weather type to validate

**Returns:**
- `boolean` - True if weather type is valid

**Example:**
```lua
if Bridge.Weather.IsValidWeatherType('RAIN') then
    print('Rain is a valid weather type')
end
```

---

## 🔹 GetWeatherInfo

Gets detailed information about a weather type.

```lua
Bridge.Weather.GetWeatherInfo(weatherType)
```

**Parameters:**
- `weatherType` (string) - Weather type name

**Returns:**
- `table` - Weather information including effects and properties

**Example:**
```lua
local rainInfo = Bridge.Weather.GetWeatherInfo('RAIN')
print('Rain description:', rainInfo.description)
print('Has precipitation:', rainInfo.hasPrecipitation)
print('Visibility modifier:', rainInfo.visibilityModifier)
```

## Weather Configuration

---

## 🔹 GetWeatherConfig

Retrieves the weather system configuration.

```lua
Bridge.Weather.GetWeatherConfig()
```

**Returns:**
- `table` - Complete weather configuration

**Example:**
```lua
local config = Bridge.Weather.GetWeatherConfig()
print('Default weather:', config.defaultWeather)
print('Transition time:', config.defaultTransition)
print('Auto weather enabled:', config.autoWeatherEnabled)
```

---

## 🔹 GetWeatherTimings

Gets timing configurations for weather systems.

```lua
Bridge.Weather.GetWeatherTimings()
```

**Returns:**
- `table` - Weather timing configurations

**Example:**
```lua
local timings = Bridge.Weather.GetWeatherTimings()
print('Min duration:', timings.minDuration)
print('Max duration:', timings.maxDuration)
print('Cycle length:', timings.cycleLength)
```

---

## 🔹 GetWeatherEffects

Retrieves weather effect configurations.

```lua
Bridge.Weather.GetWeatherEffects(weatherType)
```

**Parameters:**
- `weatherType` (string, optional) - Specific weather type

**Returns:**
- `table` - Weather effects configuration

**Example:**
```lua
-- Get all weather effects
local allEffects = Bridge.Weather.GetWeatherEffects()

-- Get effects for specific weather
local rainEffects = Bridge.Weather.GetWeatherEffects('RAIN')
print('Rain particle density:', rainEffects.particleDensity)
```

## Weather Utilities

---

## 🔹 FormatWeatherName

Formats weather type name for display.

```lua
Bridge.Weather.FormatWeatherName(weatherType)
```

**Parameters:**
- `weatherType` (string) - Raw weather type name

**Returns:**
- `string` - Formatted display name

**Example:**
```lua
local formatted = Bridge.Weather.FormatWeatherName('THUNDER')
print(formatted) -- "Thunderstorm"

local formatted2 = Bridge.Weather.FormatWeatherName('EXTRASUNNY')
print(formatted2) -- "Extra Sunny"
```

---

## 🔹 GetWeatherIcon

Gets the icon identifier for a weather type.

```lua
Bridge.Weather.GetWeatherIcon(weatherType)
```

**Parameters:**
- `weatherType` (string) - Weather type name

**Returns:**
- `string` - Icon identifier or class

**Example:**
```lua
local icon = Bridge.Weather.GetWeatherIcon('RAIN')
print('Rain icon:', icon) -- "fas fa-cloud-rain"

local sunIcon = Bridge.Weather.GetWeatherIcon('CLEAR')
print('Clear icon:', sunIcon) -- "fas fa-sun"
```

---

## 🔹 GetWeatherColor

Gets the color associated with a weather type.

```lua
Bridge.Weather.GetWeatherColor(weatherType)
```

**Parameters:**
- `weatherType` (string) - Weather type name

**Returns:**
- `string` - Hex color code

**Example:**
```lua
local rainColor = Bridge.Weather.GetWeatherColor('RAIN')
print('Rain color:', rainColor) -- "#4A90E2"

local sunColor = Bridge.Weather.GetWeatherColor('CLEAR')
print('Clear color:', sunColor) -- "#F39C12"
```

## Weather Calculations

---

## 🔹 CalculateTransitionTime

Calculates optimal transition time between weather types.

```lua
Bridge.Weather.CalculateTransitionTime(fromWeather, toWeather)
```

**Parameters:**
- `fromWeather` (string) - Starting weather type
- `toWeather` (string) - Target weather type

**Returns:**
- `number` - Recommended transition time in seconds

**Example:**
```lua
local transitionTime = Bridge.Weather.CalculateTransitionTime('CLEAR', 'THUNDER')
print('Recommended transition:', transitionTime .. ' seconds')
```

---

## 🔹 GetWeatherIntensity

Calculates the intensity rating of a weather type.

```lua
Bridge.Weather.GetWeatherIntensity(weatherType)
```

**Parameters:**
- `weatherType` (string) - Weather type name

**Returns:**
- `number` - Intensity rating (0.0 to 1.0)

**Example:**
```lua
local intensity = Bridge.Weather.GetWeatherIntensity('THUNDER')
print('Thunder intensity:', intensity) -- 0.9

local clearIntensity = Bridge.Weather.GetWeatherIntensity('CLEAR')
print('Clear intensity:', clearIntensity) -- 0.1
```

---

## 🔹 IsExtremeWeatherType

Checks if a weather type is considered extreme.

```lua
Bridge.Weather.IsExtremeWeatherType(weatherType)
```

**Parameters:**
- `weatherType` (string) - Weather type to check

**Returns:**
- `boolean` - True if weather is extreme

**Example:**
```lua
if Bridge.Weather.IsExtremeWeatherType('THUNDER') then
    print('Thunderstorm is extreme weather')
end

if not Bridge.Weather.IsExtremeWeatherType('CLOUDS') then
    print('Cloudy weather is mild')
end
```

## Weather Categories

---

## 🔹 GetWeatherCategory

Gets the category of a weather type.

```lua
Bridge.Weather.GetWeatherCategory(weatherType)
```

**Parameters:**
- `weatherType` (string) - Weather type name

**Returns:**
- `string` - Weather category

**Example:**
```lua
local category = Bridge.Weather.GetWeatherCategory('RAIN')
print('Rain category:', category) -- "precipitation"

local clearCategory = Bridge.Weather.GetWeatherCategory('CLEAR')
print('Clear category:', clearCategory) -- "clear"
```

---

## 🔹 GetWeathersByCategory

Gets all weather types in a specific category.

```lua
Bridge.Weather.GetWeathersByCategory(category)
```

**Parameters:**
- `category` (string) - Weather category name

**Returns:**
- `table` - Array of weather types in the category

**Example:**
```lua
local precipitationWeathers = Bridge.Weather.GetWeathersByCategory('precipitation')
for _, weather in ipairs(precipitationWeathers) do
    print('Precipitation weather:', weather)
end
```

---

## 🔹 GetWeatherCategories

Gets all available weather categories.

```lua
Bridge.Weather.GetWeatherCategories()
```

**Returns:**
- `table` - Array of weather category names

**Example:**
```lua
local categories = Bridge.Weather.GetWeatherCategories()
for _, category in ipairs(categories) do
    print('Weather category:', category)
end
```

## Random Weather Functions

---

## 🔹 GetRandomWeather

Gets a random weather type.

```lua
Bridge.Weather.GetRandomWeather(category, excludeExtreme)
```

**Parameters:**
- `category` (string, optional) - Specific category to choose from
- `excludeExtreme` (boolean, optional) - Whether to exclude extreme weather

**Returns:**
- `string` - Random weather type name

**Example:**
```lua
-- Any random weather
local randomWeather = Bridge.Weather.GetRandomWeather()

-- Random mild weather (no extreme)
local mildWeather = Bridge.Weather.GetRandomWeather(nil, true)

-- Random precipitation weather
local rainWeather = Bridge.Weather.GetRandomWeather('precipitation')
```

---

## 🔹 GetWeightedRandomWeather

Gets a random weather type based on weights.

```lua
Bridge.Weather.GetWeightedRandomWeather(weights)
```

**Parameters:**
- `weights` (table, optional) - Weather type weights

**Returns:**
- `string` - Weighted random weather type

**Example:**
```lua
local weights = {
    CLEAR = 40,
    CLOUDS = 30,
    RAIN = 20,
    THUNDER = 10
}
local weatherType = Bridge.Weather.GetWeightedRandomWeather(weights)
```

## Validation Functions

---

## 🔹 ValidateWeatherData

Validates weather data structure.

```lua
Bridge.Weather.ValidateWeatherData(weatherData)
```

**Parameters:**
- `weatherData` (table) - Weather data to validate

**Returns:**
- `boolean` - True if data is valid
- `string` - Error message if invalid

**Example:**
```lua
local weatherData = {
    type = 'RAIN',
    intensity = 0.7,
    duration = 1800
}

local isValid, error = Bridge.Weather.ValidateWeatherData(weatherData)
if not isValid then
    print('Invalid weather data:', error)
end
```

---

## 🔹 SanitizeWeatherType

Sanitizes and normalizes weather type input.

```lua
Bridge.Weather.SanitizeWeatherType(input)
```

**Parameters:**
- `input` (string) - Raw weather type input

**Returns:**
- `string` - Sanitized weather type name

**Example:**
```lua
local sanitized = Bridge.Weather.SanitizeWeatherType('rain')
print(sanitized) -- "RAIN"

local sanitized2 = Bridge.Weather.SanitizeWeatherType('Thunder Storm')
print(sanitized2) -- "THUNDER"
```

## Data Structures

---

## 📚 Weather Type Definition
```lua
{
    name = 'RAIN',
    displayName = 'Rainy',
    description = 'Light to moderate rainfall',
    category = 'precipitation',
    intensity = 0.6,
    isExtreme = false,
    hasPrecipitation = true,
    hasWind = true,
    visibilityModifier = 0.7,
    icon = 'fas fa-cloud-rain',
    color = '#4A90E2',
    effects = {
        particleDensity = 0.6,
        windSpeed = 3.5,
        fogLevel = 0.2
    }
}
```

---

## 📚 Weather Configuration
```lua
{
    defaultWeather = 'CLEAR',
    defaultTransition = 30,
    autoWeatherEnabled = true,
    cycleDuration = 45,
    extremeWeatherChance = 0.15,
    transitionSmoothness = 0.8,
    regionWeatherEnabled = true,
    playerOverridesEnabled = true
}
```

## Best Practices

---

## 📚 Weather Type Validation
```lua
-- Always validate weather types before use
local function setWeatherSafely(weatherType)
    if Bridge.Weather.IsValidWeatherType(weatherType) then
        Bridge.Weather.SetWeather(weatherType)
    else
        print('Invalid weather type:', weatherType)
        Bridge.Weather.SetWeather('CLEAR') -- Fallback
    end
end
```

### Configuration Access
```lua
-- Cache configuration for performance
local weatherConfig = Bridge.Weather.GetWeatherConfig()
local weatherTypes = Bridge.Weather.GetWeatherTypes()

-- Use configuration values
local function getRandomMildWeather()
    return Bridge.Weather.GetRandomWeather(nil, true)
end
```

### Display Formatting
```lua
-- Format weather for UI display
local function formatWeatherForUI(weatherType)
    return {
        name = Bridge.Weather.FormatWeatherName(weatherType),
        icon = Bridge.Weather.GetWeatherIcon(weatherType),
        color = Bridge.Weather.GetWeatherColor(weatherType),
        category = Bridge.Weather.GetWeatherCategory(weatherType),
        isExtreme = Bridge.Weather.IsExtremeWeatherType(weatherType)
    }
end
```

## Integration Examples

### Weather Selection Interface
```lua
-- Create weather selection menu
local function createWeatherMenu()
    local categories = Bridge.Weather.GetWeatherCategories()
    local menu = {}
    
    for _, category in ipairs(categories) do
        local categoryWeathers = Bridge.Weather.GetWeathersByCategory(category)
        local categoryMenu = {
            label = category:gsub("^%l", string.upper),
            items = {}
        }
        
        for _, weather in ipairs(categoryWeathers) do
            table.insert(categoryMenu.items, {
                label = Bridge.Weather.FormatWeatherName(weather),
                value = weather,
                icon = Bridge.Weather.GetWeatherIcon(weather),
                color = Bridge.Weather.GetWeatherColor(weather)
            })
        end
        
        table.insert(menu, categoryMenu)
    end
    
    return menu
end
```

### Weather Transition Calculator
```lua
-- Calculate optimal weather transitions
local function planWeatherTransition(currentWeather, targetWeather)
    local transitionTime = Bridge.Weather.CalculateTransitionTime(currentWeather, targetWeather)
    local currentIntensity = Bridge.Weather.GetWeatherIntensity(currentWeather)
    local targetIntensity = Bridge.Weather.GetWeatherIntensity(targetWeather)
    
    return {
        duration = transitionTime,
        intensityDelta = targetIntensity - currentIntensity,
        isToExtreme = Bridge.Weather.IsExtremeWeatherType(targetWeather),
        recommended = transitionTime >= 30 -- Minimum 30 seconds for smooth transition
    }
end
```

---

## Related Documentation

- [Weather Client Functions](client.md) - Client-side weather effects
- [Weather Server Functions](server.md) - Server-side weather management
- [Weather Overview](index.md) - Module introduction and features
