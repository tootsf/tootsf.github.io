---
title: GetUnitStatus
parent: Shared Functions
grand_parent: Dispatch
nav_order: 1
---

## 🔹 GetUnitStatus

Get the status of a dispatch unit.

**Parameters:**
- `unitId` (number): Unit ID

**Returns:**
- `string`: Status (e.g., "available", "busy")

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local status = Bridge.Dispatch.GetUnitStatus(1)
```
