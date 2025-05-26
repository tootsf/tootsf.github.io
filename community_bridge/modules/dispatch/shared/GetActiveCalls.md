---
title: GetActiveCalls
parent: Shared Functions
grand_parent: Dispatch
nav_order: 2
---

## 🔹 GetActiveCalls

Get a list of active dispatch calls.

**Returns:**
- `table`: List of active calls

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local calls = Bridge.Dispatch.GetActiveCalls()
```
