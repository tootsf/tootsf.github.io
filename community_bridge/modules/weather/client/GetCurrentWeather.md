---
layout: default
title: GetCurrentWeather
parent: Client Functions
grand_parent: Weather
nav_order: 3
---

# GetCurrentWeather
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Retrieves the current weather information.

## Syntax

```lua
function Weather.GetCurrentWeather()
```

## Returns

**Type:** `table`  
Current weather data including the following properties:
- **type:** Current weather type
- **intensity:** Weather intensity value
- **timeRemaining:** Time remaining in current weather cycle

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local weather = Bridge.Weather.GetCurrentWeather()
print('Current weather:', weather.type)
print('Intensity:', weather.intensity)
print('Time remaining:', weather.timeRemaining)
```
