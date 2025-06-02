---
layout: default
title: "ToggleDoorLock"
parent: Functions
grand_parent: Server
great_grand_parent: 🚪 Doorlock
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/doorlock/server/functions/ToggleDoorLock/
---

# ToggleDoorLock
{: .no_toc }

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