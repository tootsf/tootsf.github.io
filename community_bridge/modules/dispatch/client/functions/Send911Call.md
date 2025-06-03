---
layout: default
title: "Send911Call"
parent: Functions
grand_parent: Client
great_grand_parent: "🚨 Dispatch"
nav_order: 1
permalink: /community_bridge/modules/dispatch/client/functions/Send911Call/
---

# Send911Call
{: .no_toc }

Send a 911 call to dispatch.

**Parameters:**
- `location` (vector3): Call location
- `message` (string): Call message

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dispatch.Send911Call(vector3(100, 200, 30), "Robbery in progress!")
```
