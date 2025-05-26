---
title: Close
parent: Client Functions
grand_parent: Dialogue
nav_order: 2
---

## 🔹 Close

Close an active dialogue.

**Parameters:**
- `name` (string): Dialogue name

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dialogue.Close("npc_greeting")
```
