---
title: Doorlock Module
sidebar_position: 8
---

# Doorlock Module

The Doorlock module in `community_bridge` provides a unified API for managing door locks across different doorlock systems.

## Server Functions

### SetDoorState
```lua
Doorlock.SetDoorState(doorId, locked)
```
Sets the lock state of a door.
- `doorId` (string/number): Door identifier
- `locked` (boolean): Lock state

## Client Functions

Some doorlock modules may provide client events for updating door states directly.

## Shared Functions

Shared utility functions may be available depending on the doorlock system. See the specific doorlock module for details.
