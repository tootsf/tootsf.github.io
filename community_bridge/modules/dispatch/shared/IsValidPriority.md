---
title: IsValidPriority
parent: Shared Functions
grand_parent: Dispatch
nav_order: 7
---

## 🔹 IsValidPriority

Validates if a priority level is valid.

**Parameters:**
- `priority` (number) - Priority level to validate

**Returns:**
- `boolean` - True if priority level is valid

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Dispatch.IsValidPriority(3) then
    print('Priority 3 is valid')
end
``` 