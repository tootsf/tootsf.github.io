---
layout: default
title: "ToggleDoorLock"
parent: Doorlock Functions
grand_parent: Server
great_grand_parent: 🚪 Doorlock
nav_order: 1
---

# ToggleDoorLock
Toggle a door's lock status.

**Parameters:**
- `doorID` (number): Door ID
- `toggle` (boolean): Lock (true) or unlock (false)

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Doorlock.ToggleDoorLock(doorID, true)
```