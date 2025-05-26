---
title: IsMale
parent: Client Functions
grand_parent: Accessibility
nav_order: 8
---

## 🔹 IsMale

Check if current player is male model.

**Returns:**
- `boolean`: True if male, false if female

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Accessibility.IsMale() then
    print("Player is male")
end
```
