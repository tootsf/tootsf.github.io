---
title: "Weather"
parent: "Modules"
grand_parent: "Community Bridge"
nav_order: 16
has_children: true
---

# Weather Module
{: .no_toc }

Dynamic weather system for realistic environmental conditions and gameplay mechanics.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Weather module provides a comprehensive weather system that goes beyond basic weather changes. It includes realistic weather patterns, seasonal cycles, location-based weather variations, and weather-dependent gameplay mechanics.

### Key Features

- **Dynamic Weather**: Realistic weather transitions and patterns
- **Seasonal Cycles**: Four-season system with appropriate weather
- **Regional Weather**: Different weather zones across the map
- **Weather Effects**: Gameplay impact from weather conditions
- **Forecast System**: Predictive weather information
- **Custom Weather**: Create unique weather conditions
- **Synchronization**: Server-wide weather consistency
- **Weather Events**: Special weather phenomena

---

## Weather Types

### Standard Weather
- **Clear**: Sunny, clear skies with good visibility
- **Cloudy**: Overcast conditions with reduced sunlight
- **Foggy**: Low visibility conditions affecting driving
- **Rainy**: Light to heavy rainfall with wet road effects
- **Stormy**: Thunderstorms with lightning and heavy rain
- **Snowy**: Snow precipitation with cold temperatures

### Special Weather
- **Blizzard**: Extreme snow conditions with very low visibility
- **Hurricane**: Extreme wind and rain conditions
- **Sandstorm**: Desert areas with sand and dust storms
- **Heatwave**: Extreme heat affecting character performance
- **Acid Rain**: Dystopian weather affecting vehicles and health

### Custom Weather
- Create unique weather conditions for events
- Combine multiple weather effects
- Scripted weather sequences
- Location-specific phenomena

---

## Weather Systems

### Regional Weather
Different areas of the map can have independent weather:
- **Urban Areas**: City-specific weather patterns
- **Desert Regions**: Arid climate with heat and sandstorms
- **Mountain Areas**: Cold temperatures and snow
- **Coastal Zones**: Marine weather with fog and storms
- **Forest Regions**: Humid conditions with frequent rain

### Seasonal Cycles
Automatic progression through seasons:
- **Spring**: Mild temperatures, frequent rain, growing season
- **Summer**: Hot temperatures, clear skies, occasional storms
- **Autumn**: Cooling temperatures, colorful foliage, gusty winds
- **Winter**: Cold temperatures, snow, reduced daylight

### Time-Based Weather
Weather changes based on time of day:
- **Morning**: Fog and dew conditions
- **Afternoon**: Peak sunshine and heat
- **Evening**: Cooling temperatures, wind changes
- **Night**: Temperature drops, different precipitation patterns

---

## Weather Effects

### Vehicle Impact
- **Rain**: Reduced traction and braking distance
- **Snow**: Significant handling difficulties
- **Fog**: Reduced visibility requiring headlights
- **Wind**: Affects aircraft and motorcycle handling
- **Ice**: Extremely slippery road conditions

### Character Effects
- **Temperature**: Affects health and stamina
- **Visibility**: Impacts perception and accuracy
- **Movement**: Snow and mud slow movement speed
- **Clothing**: Weather-appropriate dress requirements
- **Health**: Extreme weather affects player wellness

### Gameplay Mechanics
- **Agriculture**: Crop growth affected by weather
- **Energy**: Solar panels affected by cloud cover
- **Crime**: Weather impacts police response and visibility
- **Events**: Weather-dependent activities and missions

---

## Core Components

### Weather Engine
- Real-time weather simulation
- Atmospheric pressure modeling
- Temperature and humidity tracking
- Wind speed and direction calculation

### Forecast System
- Short-term weather predictions
- Long-term seasonal forecasts
- Weather warning systems
- Historical weather data

### Synchronization
- Server-wide weather consistency
- Client weather state management
- Weather event broadcasting
- Anti-desync protection

---

## Integration Features

### Framework Compatibility
Integrates with player systems for weather-based effects and notifications.

### Vehicle Systems
Weather affects vehicle performance, damage, and maintenance requirements.

### Job Integration
Weather impacts various job activities:
- Construction work affected by rain
- Farming dependent on weather cycles
- Emergency services respond to weather events
- Tourism affected by weather conditions

---

## Common Use Cases

### Realistic Simulation
- Immersive roleplay environments
- Seasonal business cycles
- Weather-dependent activities
- Emergency response scenarios

### Gameplay Mechanics
- Weather-based challenges
- Seasonal events and activities
- Weather survival elements
- Environmental storytelling

### Economic Systems
- Weather affects supply and demand
- Seasonal price fluctuations
- Weather insurance systems
- Climate-dependent businesses

---

## Quick Start

```lua
-- Set current weather
exports.community_bridge:SetWeather('RAIN', true) -- true for gradual transition

-- Get current weather
local weather = exports.community_bridge:GetCurrentWeather()
print('Current weather: ' .. weather.type)

-- Set weather for specific region
exports.community_bridge:SetRegionalWeather('downtown', 'FOGGY')

-- Enable automatic weather cycles
exports.community_bridge:EnableWeatherCycle(true)

-- Register weather change event
RegisterNetEvent('weather:changed')
AddEventHandler('weather:changed', function(newWeather, oldWeather)
    print('Weather changed from ' .. oldWeather .. ' to ' .. newWeather)
end)

-- Check if weather allows activity
if exports.community_bridge:IsWeatherSuitable('CLEAR', 'CLOUDY') then
    -- Start outdoor activity
end
```

---

## Advanced Features

### Weather Prediction AI
Machine learning-based weather forecasting for realistic patterns.

### Climate Change
Long-term climate shifts affecting seasonal patterns and extreme weather frequency.

### Weather API Integration
Connect to real-world weather data for authentic regional weather.

### Dynamic Weather Events
Scripted weather phenomena for special events and storytelling.

---

## Navigation

- [Client Functions](./client) - Client-side weather display and effects
- [Server Functions](./server) - Server-side weather management and synchronization
- [Shared Functions](./shared) - Shared weather calculations and utilities

Explore each section to learn about specific functionalities and implementation details.
