---
layout: default
title: SetWeatherTransition
parent: Client Functions
grand_parent: Weather
nav_order: 4
---

# SetWeatherTransition
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Creates a smooth transition between weather types.

## Syntax

```lua
function Weather.SetWeatherTransition(fromWeather, toWeather, duration)
```

## Parameters

**fromWeather:** `string`  
Starting weather type.

**toWeather:** `string`  
Target weather type.

**duration:** `number`  
Transition duration in milliseconds.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Transition from clear to rainy over 60 seconds
Bridge.Weather.SetWeatherTransition('CLEAR', 'RAIN', 60000)
```
