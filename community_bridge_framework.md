---
title: Framework Module
sidebar_position: 3
---

# Framework Module

The Framework module in `community_bridge` provides a unified API for interacting with player data, money, jobs, and other core framework features across different frameworks (e.g., ESX, QBCore, etc.).

## Server Functions

### GetIdentifier
```lua
Framework.GetIdentifier(src)
```
Returns the unique identifier for a player.

### GetName
```lua
Framework.GetName(src)
```
Returns the player's display name.

### GetMoney
```lua
Framework.GetMoney(src)
```
Returns the player's current money amount.

### AddMoney
```lua
Framework.AddMoney(src, amount)
```
Adds money to a player's account.

### RemoveMoney
```lua
Framework.RemoveMoney(src, amount)
```
Removes money from a player's account.

### GetJob
```lua
Framework.GetJob(src)
```
Returns the player's current job.

### SetJob
```lua
Framework.SetJob(src, job, grade)
```
Sets the player's job and grade.

### GetSourceFromIdentifier
```lua
Framework.GetSourceFromIdentifier(identifier)
```
Returns the player source from an identifier.

## Client Functions

Most framework actions are handled server-side. Some modules may provide client events for UI updates or player data refreshes.

## Shared Functions

Shared utility functions may be available depending on the framework. See the specific framework module for details.
