---
layout: default
title: "HideHelpText"
parent: Functions
grand_parent: Server
great_grand_parent: 🔔 Notify
nav_order: 1
permalink: /community_bridge/modules/notify/server/functions/HideHelpText/
---

# HideHelpText
{: .no_toc }

Hides help text for a specific player.

## Syntax

```lua
Bridge.Notify.HideHelpText(playerId)
```

## Parameters

**playerId:** `number`  
The player's server ID

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.HideHelpText(source)
```

---