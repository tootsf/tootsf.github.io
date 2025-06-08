---
layout: default
title: "GetClosestDoor"
parent: Doorlock Functions
grand_parent: Client
great_grand_parent: 🚪 Doorlock
nav_order: 1
---

# GetClosestDoor
{: .no_toc }

Gets the closest door to the current player's position.

## Syntax

```lua
function Doorlock.GetClosestDoor()
```

## Returns

**string|nil**  
Door identifier or nil if no door found

## Example

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

## Note

In the default implementation, this function currently returns `nil`. The actual door detection logic depends on the specific doorlock system being used (ox_doorlock, qb-doorlock, etc.).

For full functionality, ensure you have one of the supported doorlock systems installed:
- ox_doorlock
- qb-doorlock  
- rcore_doorlock
- doors_creator

---

## Integration

This module serves as a bridge to various doorlock systems. The actual implementation will be loaded based on which doorlock system is detected on the server.