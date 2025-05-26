---
layout: default
title: SetWeatherType
parent: Client Functions
grand_parent: Weather
nav_order: 1
---

# SetWeatherType
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Sets the current weather type.

## Syntax

```lua
function Weather.SetWeatherType(weatherType)
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

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Set weather to sunny
Bridge.Weather.SetWeatherType('EXTRASUNNY')

-- Set weather to rainy
Bridge.Weather.SetWeatherType('RAIN')
```
