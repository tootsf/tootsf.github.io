---
title: Fuel Module
sidebar_position: 17
---

# Fuel Module

The Fuel module in `community_bridge` provides a unified API for managing vehicle fuel across different fuel systems.

## Server Functions

### SetFuel
```lua
Fuel.SetFuel(plate, amount)
```
Sets the fuel level for a vehicle.
- `plate` (string): Vehicle plate
- `amount` (number): Fuel amount (0-100)

### GetFuel
```lua
Fuel.GetFuel(plate)
```
Gets the fuel level for a vehicle.
- **Returns:** (number) Fuel amount (0-100)

## Client Functions

Some fuel modules may provide client events for updating fuel UI or notifications.

## Shared Functions

Shared utility functions may be available depending on the fuel system. See the specific fuel module for details.
