---
title: IsMale
parent: Server Functions
grand_parent: Clothing
nav_order: 1
---

## 🔹 IsMale

Check if a player's ped is male.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `boolean`: True if male, false if female

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Clothing.IsMale(src) then
    print("Player is male")
end
```
