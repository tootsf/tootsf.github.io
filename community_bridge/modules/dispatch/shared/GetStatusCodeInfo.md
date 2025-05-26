---
title: GetStatusCodeInfo
parent: Shared Functions
grand_parent: Dispatch
nav_order: 5
---

## 🔹 GetStatusCodeInfo

Gets information about a specific status code.

**Parameters:**
- `statusCode` (string) - Status code

**Returns:**
- `table` - Status code information

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local codeInfo = Bridge.Dispatch.GetStatusCodeInfo('10-4')
print('Meaning:', codeInfo.meaning)
print('Category:', codeInfo.category)
print('Usage:', codeInfo.usage)
``` 