---
title: GetCallTypeInfo
parent: Shared Functions
grand_parent: Dispatch
nav_order: 2
---

## 🔹 GetCallTypeInfo

Gets detailed information about a call type.

**Parameters:**
- `callType` (string) - Call type name

**Returns:**
- `table` - Call type information including priority, department, etc.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local robberyInfo = Bridge.Dispatch.GetCallTypeInfo('robbery')
print('Default priority:', robberyInfo.defaultPriority)
print('Department:', robberyInfo.department)
print('Description:', robberyInfo.description)
print('Required units:', robberyInfo.requiredUnits)
``` 