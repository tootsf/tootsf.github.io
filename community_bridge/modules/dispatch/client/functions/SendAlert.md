---
layout: default
title: "SendAlert"
parent: Functions
grand_parent: Client
great_grand_parent: "🚨 Dispatch"
nav_order: 1
permalink: /community_bridge/modules/dispatch/client/functions/SendAlert/
---

# SendAlert
{: .no_toc }

Sends an emergency alert to the dispatch system.

**Parameters:**
- `data` (table) - Alert configuration
  - `message` (string, optional) - Alert message (default: "An Alert Has Been Made")
  - `code` (string, optional) - Emergency code (default: "10-80")
  - `coords` (vector3, optional) - Alert location (default: player position)
  - `jobs` (table, optional) - Target job types (default: {"police"})
  - `icon` (string, optional) - Alert icon (default: "fas fa-question")
  - `time` (number, optional) - Blip duration in ms (default: 100000)
  - `vehicle` (number, optional) - Vehicle entity
  - `ped` (number, optional) - Ped entity
  - `blipData` (table, optional) - Blip configuration
    - `sprite` (number, optional) - Blip sprite (default: 161)
    - `color` (number, optional) - Blip color (default: 1)
    - `scale` (number, optional) - Blip scale (default: 0.8)

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Basic robbery alert
Bridge.Dispatch.SendAlert({
    message = "Armed robbery at convenience store",
    code = "10-90",
    coords = vector3(-123.45, 456.78, 20.0),
    jobs = {"police"},
    blipData = {
        sprite = 161,
        color = 1,
        scale = 1.0
    },
    time = 120000 -- 2 minutes
})

-- Medical emergency
Bridge.Dispatch.SendAlert({
    message = "Medical emergency - unconscious person",
    code = "10-52",
    coords = GetEntityCoords(PlayerPedId()),
    jobs = {"ambulance", "police"},
    icon = "fas fa-ambulance",
    blipData = {
        sprite = 153,
        color = 3,
        scale = 0.9
    }
})
```
