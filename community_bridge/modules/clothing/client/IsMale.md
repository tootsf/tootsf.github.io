---
title: IsMale
parent: Client Functions
grand_parent: Clothing
nav_order: 1
---

## 🔹 IsMale

Check if current player ped is male.

**Returns:**
- `boolean`: True if male, false if female

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Clothing.IsMale() then
    print("Player is male")
end
```
