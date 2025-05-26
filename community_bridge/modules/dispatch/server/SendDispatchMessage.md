---
title: SendDispatchMessage
parent: Server Functions
grand_parent: Dispatch
nav_order: 2
---

## 🔹 SendDispatchMessage

Send a dispatch message to all units.

**Parameters:**
- `message` (string): Message to send

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dispatch.SendDispatchMessage("All units respond to robbery at Legion Square!")
```
