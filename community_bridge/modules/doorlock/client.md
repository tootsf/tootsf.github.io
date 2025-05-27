---
layout: default
title: Client
parent: "🚪 Doorlock"
grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/doorlock/client/
---

# Doorlock Client Functions
{: .no_toc }

Client-side functions for managing door locks and access.

---

## 🔹 GetClosestDoor

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the closest door to the current player's position.


```lua
function Doorlock.GetClosestDoor()
```


**string|nil**  
Door identifier or nil if no door found


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


In the default implementation, this function currently returns `nil`. The actual door detection logic depends on the specific doorlock system being used (ox_doorlock, qb-doorlock, etc.).

For full functionality, ensure you have one of the supported doorlock systems installed:
- ox_doorlock
- qb-doorlock  
- rcore_doorlock
- doors_creator

---


This module serves as a bridge to various doorlock systems. The actual implementation will be loaded based on which doorlock system is detected on the server.