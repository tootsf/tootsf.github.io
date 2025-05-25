# Doorlock

The doorlock module provides basic door locking functionality with support for multiple doorlock systems.

## Available Functions

### Client-side
- [`GetClosestDoor()`](client.md#getclosestdoor) - Get the closest door to the player

### Server-side
- [`ToggleDoorLock(doorID, toggle)`](server.md#toggledoorlock) - Toggle a door's lock status

## Supported Systems

The module supports multiple doorlock systems:
- ox_doorlock
- qb-doorlock
- rcore_doorlock
- doors_creator

## Note

This module appears to be incomplete with minimal functionality. The default implementation provides basic structure but limited actual door interaction capabilities.
