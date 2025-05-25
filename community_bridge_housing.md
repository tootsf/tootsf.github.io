---
title: Housing Module
sidebar_position: 21
---

# Housing Module

The Housing module in `community_bridge` provides a unified API for managing player housing and properties across different housing systems.

## Server Functions

### SetHouseOwner
```lua
Housing.SetHouseOwner(src, houseId)
```
Sets a player as the owner of a house.
- `src` (number): Player source
- `houseId` (string): House identifier

### GetHouseOwner
```lua
Housing.GetHouseOwner(houseId)
```
Gets the owner of a house.
- **Returns:** (number) Player source

## Client Functions

Some housing modules may provide client events for updating housing UI or ownership directly.

## Shared Functions

Shared utility functions may be available depending on the housing system. See the specific housing module for details.
