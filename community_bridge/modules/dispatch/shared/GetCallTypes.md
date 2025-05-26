---
title: GetCallTypes
parent: Shared Functions
grand_parent: Dispatch
nav_order: 1
---

## 🔹 GetCallTypes

Retrieves all available emergency call types.

**Parameters:**
- `department` (string, optional) - Filter by department

**Returns:**
- `table` - Array of call type definitions

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- All call types
local allTypes = Bridge.Dispatch.GetCallTypes()

-- Police-specific call types
local policeTypes = Bridge.Dispatch.GetCallTypes('police')

for _, callType in ipairs(allTypes) do
    print('Call type:', callType.name, 'Priority:', callType.defaultPriority)
end
``` 