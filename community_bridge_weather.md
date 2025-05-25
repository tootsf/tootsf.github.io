---
title: Weather Module
sidebar_position: 16
---

# Weather Module

The Weather module in `community_bridge` provides a unified API for managing weather and time across different weather systems.

## Server Functions

### SetWeather
```lua
Weather.SetWeather(type)
```
Sets the current weather type.
- `type` (string): Weather type (e.g., "CLEAR", "RAIN", etc.)

### SetTime
```lua
Weather.SetTime(hour, minute)
```
Sets the current in-game time.
- `hour` (number): Hour (0-23)
- `minute` (number): Minute (0-59)

## Client Functions

Some weather modules may provide client events for updating weather or time directly.

## Shared Functions

Shared utility functions may be available depending on the weather system. See the specific weather module for details.
