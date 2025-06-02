---
layout: default
title: Functions
parent: Server
grand_parent: "🚪 Doorlock"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/doorlock/server/functions/
---

# Doorlock Server Functions
{: .no_toc }

Server-side functions for managing door locks and access.

---

## 🔹 ToggleDoorLock

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