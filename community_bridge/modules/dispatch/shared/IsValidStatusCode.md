---
title: IsValidStatusCode
parent: Shared Functions
grand_parent: Dispatch
nav_order: 8
---

## 🔹 IsValidStatusCode

Validates if a status code exists.

**Parameters:**
- `statusCode` (string) - Status code to validate

**Returns:**
- `boolean` - True if status code is valid

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Dispatch.IsValidStatusCode('10-4') then
    print('10-4 is a valid status code')
end
``` 