---
title: Send911Call
parent: Client Functions
grand_parent: "🚨 Dispatch"
nav_order: 1
---

## 🔹 Send911Call

Send a 911 call to dispatch.

**Parameters:**
- `location` (vector3): Call location
- `message` (string): Call message

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dispatch.Send911Call(vector3(100, 200, 30), "Robbery in progress!")
```
