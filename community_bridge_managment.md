---
title: Managment Module
sidebar_position: 22
---

# Managment Module

The Managment module in `community_bridge` provides a unified API for handling staff and management features across different systems.

## Server Functions

### SetStaffLevel
```lua
Managment.SetStaffLevel(src, level)
```
Sets a player's staff level.
- `src` (number): Player source
- `level` (number): Staff level

### GetStaffLevel
```lua
Managment.GetStaffLevel(src)
```
Gets a player's staff level.
- **Returns:** (number) Staff level

## Client Functions

Some managment modules may provide client events for updating staff UI or permissions directly.

## Shared Functions

Shared utility functions may be available depending on the managment system. See the specific managment module for details.
