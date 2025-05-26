---
title: GetStatusCodes
parent: Shared Functions
grand_parent: Dispatch
nav_order: 4
---

## 🔹 GetStatusCodes

Retrieves all available status codes.

**Parameters:**
- `category` (string, optional) - Filter by category

**Returns:**
- `table` - Array of status code definitions

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- All status codes
local allCodes = Bridge.Dispatch.GetStatusCodes()

-- Unit status codes only
local unitCodes = Bridge.Dispatch.GetStatusCodes('unit')

for _, code in ipairs(allCodes) do
    print('Code:', code.code, 'Description:', code.description)
end
``` 