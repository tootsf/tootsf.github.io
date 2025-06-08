---
layout: default
title: "IsMale"
parent: Clothing Functions
grand_parent: Server
great_grand_parent: 👔 Clothing
nav_order: 1
---

# IsMale
Checks if a player's ped is using the male freemode model.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `boolean`: True if male model, false otherwise

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
local isMale = Bridge.Clothing.IsMale(src)
if isMale then
    print("Player " .. src .. " is using male model")
end
```

---