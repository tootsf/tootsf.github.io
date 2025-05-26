---
layout: default
title: Client Functions
parent: Doorlock
grand_parent: Modules
nav_order: 1
---

# Doorlock Client
{: .no_toc }

The doorlock client module provides basic door detection functionality.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Door Detection

---

## 🔹 GetClosestDoor

### GetClosestDoor()

Gets the closest door to the current player's position.

**Returns:**
- `string|nil`: Door identifier or nil if no door found

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local closestDoor = Bridge.Doorlock.GetClosestDoor()
if closestDoor then
    print("Closest door: " .. closestDoor)
else
    print("No door found nearby")
end
```

---

## 📚 Note

In the default implementation, this function currently returns `nil`. The actual door detection logic depends on the specific doorlock system being used (ox_doorlock, qb-doorlock, etc.).

For full functionality, ensure you have one of the supported doorlock systems installed:
- ox_doorlock
- qb-doorlock  
- rcore_doorlock
- doors_creator

---

## 📚 Integration

This module serves as a bridge to various doorlock systems. The actual implementation will be loaded based on which doorlock system is detected on the server.
