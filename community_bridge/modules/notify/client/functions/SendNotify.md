---
layout: default
title: "SendNotify"
parent: Notify Functions
grand_parent: Client
great_grand_parent: 🔔 Notify
nav_order: 1
---

# SendNotify
Sends a notification to the player.

## Syntax

```lua
Bridge.Notify.SendNotify(message, type)
```

## Parameters

**message:** `string`  
The notification message to display

**type:** `string`  
Type of notification ('success', 'error', 'info', 'warning')

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.SendNotify("Purchase successful!", "success")
Bridge.Notify.SendNotify("Insufficient funds!", "error")
```

---