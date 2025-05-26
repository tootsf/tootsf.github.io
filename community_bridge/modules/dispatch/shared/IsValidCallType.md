---
title: IsValidCallType
parent: Shared Functions
grand_parent: Dispatch
nav_order: 6
---

## 🔹 IsValidCallType

Validates if a call type exists.

**Parameters:**
- `callType` (string) - Call type to validate

**Returns:**
- `boolean` - True if call type is valid

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Dispatch.IsValidCallType('robbery') then
    print('Robbery is a valid call type')
end
``` 