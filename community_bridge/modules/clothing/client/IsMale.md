---
title: IsMale
parent: Client Functions
grand_parent: "👔 Clothing"
nav_order: 3
---

## 🔹 IsMale

Checks if the current player ped is using the male freemode model.

**Returns:**
- `boolean`: True if male model, false otherwise

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local isMale = Bridge.Clothing.IsMale()
if isMale then
    print("Player is using male model")
end
```
