---
title: VehicleKey Module
sidebar_position: 10
---

# VehicleKey Module

The VehicleKey module in `community_bridge` provides a unified API for managing vehicle keys and ownership across different vehicle key systems.

## Server Functions

### GiveKey
```lua
VehicleKey.GiveKey(src, plate)
```
Gives a vehicle key to a player.
- `src` (number): Player source
- `plate` (string): Vehicle plate

### RemoveKey
```lua
VehicleKey.RemoveKey(src, plate)
```
Removes a vehicle key from a player.

### HasKey
```lua
VehicleKey.HasKey(src, plate)
```
Checks if a player has a key for a vehicle.
- **Returns:** `boolean`

## Client Functions

Some vehicle key modules may provide client events for updating key UI or notifications.

## Shared Functions

Shared utility functions may be available depending on the vehicle key system. See the specific vehicle key module for details.
