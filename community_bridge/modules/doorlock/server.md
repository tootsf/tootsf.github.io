---
layout: default
title: Server Functions
parent: Doorlock
grand_parent: Modules
nav_order: 2
---

# Doorlock Server
{: .no_toc }

The doorlock server module provides basic door lock management functionality.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Door Management

### ToggleDoorLock(doorID, toggle)

Toggles the lock status of a specified door.

**Parameters:**
- `doorID` (string): Unique identifier for the door
- `toggle` (boolean): Lock status (true = locked, false = unlocked)

**Returns:**
- `boolean`: Always returns true in default implementation

**Example:**
```lua
-- Lock a door
local success = Doorlock.ToggleDoorLock("police_station_main", true)
if success then
    print("Door locked")
end

-- Unlock a door
Doorlock.ToggleDoorLock("police_station_main", false)
```

## Note

In the default implementation, this function always returns `true` but doesn't perform actual door locking logic. The real functionality depends on the specific doorlock system being used.

For full functionality, ensure you have one of the supported doorlock systems installed:
- ox_doorlock
- qb-doorlock
- rcore_doorlock  
- doors_creator

## Integration

This module serves as a bridge to various doorlock systems. The actual implementation will be loaded based on which doorlock system is detected on the server.

## Usage in Scripts

```lua
-- Example usage in a police script
RegisterNetEvent('police:lockNearestDoor')
AddEventHandler('police:lockNearestDoor', function()
    local src = source
    -- Get the closest door somehow (implementation dependent)
    local doorId = "some_door_id"
    
    -- Toggle the lock
    Doorlock.ToggleDoorLock(doorId, true)
    
    -- Notify the player
    TriggerClientEvent('QBCore:Notify', src, 'Door locked', 'success')
end)
```
