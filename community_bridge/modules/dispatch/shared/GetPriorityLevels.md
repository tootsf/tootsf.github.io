---
title: GetPriorityLevels
parent: Shared Functions
grand_parent: Dispatch
nav_order: 3
---

## 🔹 GetPriorityLevels

Retrieves all priority level definitions.

**Returns:**
- `table` - Array of priority level definitions

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local priorities = Bridge.Dispatch.GetPriorityLevels()
for level, info in pairs(priorities) do
    print('Priority', level .. ':', info.name, '(' .. info.description .. ')')
end
``` 