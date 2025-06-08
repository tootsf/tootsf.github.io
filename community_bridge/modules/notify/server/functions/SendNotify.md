---
layout: default
title: "SendNotify"
parent: Functions
grand_parent: Server
great_grand_parent: 🔔 Notify
nav_order: 1
permalink: /community_bridge/modules/notify/server/functions/SendNotify/
nav_exclude: true
---

# SendNotify
{: .no_toc }

Sends a notification to a specific player.

## Syntax

```lua
Bridge.Notify.SendNotify(playerId, message, type)
```

## Parameters

**playerId:** `number`  
The player's server ID

**message:** `string`  
The notification message to display

**type:** `string`  
Type of notification ('success', 'error', 'info', 'warning')

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.SendNotify(source, "Purchase successful!", "success")
Bridge.Notify.SendNotify(source, "Insufficient funds!", "error")
```

---