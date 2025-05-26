---
title: RegisterUnit
parent: Server Functions
grand_parent: Dispatch
nav_order: 1
---

## 🔹 RegisterUnit

Register a new emergency unit for dispatch.

**Parameters:**
- `unitData` (table): Unit information

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dispatch.RegisterUnit({type = "police", id = 1, name = "Unit 1"})
```
