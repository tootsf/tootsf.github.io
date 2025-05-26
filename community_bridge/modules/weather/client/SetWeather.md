---
layout: default
title: SetWeather
parent: Client Functions
grand_parent: Weather
nav_order: 2
---

# SetWeather
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Sets the current weather type with optional transition.

## Syntax

```lua
function Weather.SetWeather(weatherType, transitionTime)
```

## Parameters

**weatherType:** `string`  
Weather type to set. Valid values include:
- 'EXTRASUNNY'
- 'CLEAR'
- 'NEUTRAL'
- 'SMOG'
- 'FOGGY'
- 'OVERCAST'
- 'CLOUDS'
- 'CLEARING'
- 'RAIN'
- 'THUNDER'
- 'SNOW'
- 'BLIZZARD'
- 'SNOWLIGHT'
- 'XMAS'
- 'HALLOWEEN'

**transitionTime:** `number` (optional)  
Transition duration in milliseconds.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Immediate weather change
Bridge.Weather.SetWeather('THUNDER')

-- Gradual transition over 30 seconds
Bridge.Weather.SetWeather('RAIN', 30000)
```
