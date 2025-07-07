# Doorlock 🚪

<!--META
nav: true
toc: true
description: The Doorlock module provides functions for managing door locking states across different doorlock systems. It handles locking and unlocking doors with various access controls.
-->

The Doorlock module provides functions for managing door locking states across different doorlock systems. It handles locking and unlocking doors with various access controls.

## Overview

The Doorlock provides functionality for FiveM resources.

## Client Functions

### GetClosestDoor

<!--TOC: GetClosestDoor-->

**Context:** 🖥️ Client

This will get the closest door to the ped

**Syntax:** `Bridge.Doorlock.GetClosestDoor()`

**Parameters:** None

**Returns:**
- (string) - | nil

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Doorlock.GetClosestDoor()
```

## Server Functions

### ToggleDoorLock

<!--TOC: ToggleDoorLock-->

**Context:** 🖲️ Server

Toggles the lock state of a specific door by its ID.

**Syntax:** `Bridge.Doorlock.ToggleDoorLock(doorID, toggle)`

**Parameters:**
- `doorID` (string) - Unique identifier of the door to toggle
- `toggle` (boolean) - True to lock the door, false to unlock

**Returns:**
- (boolean) - True if the door state was changed successfully

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Lock a door
local success = Bridge.Doorlock.ToggleDoorLock("police_station_main", true)
if success then
    print("Police station main door locked")
end

-- Unlock a door
Bridge.Doorlock.ToggleDoorLock("hospital_entrance", false)
print("Hospital entrance unlocked")
```

