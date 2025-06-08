---
layout: default
title: "ShowHelpText"
parent: Functions
grand_parent: Server
great_grand_parent: 🔔 Notify
nav_order: 1
permalink: /community_bridge/modules/notify/server/functions/ShowHelpText/
nav_exclude: true
---

# ShowHelpText
{: .no_toc }

Shows help text to a specific player.

## Syntax

```lua
Bridge.Notify.ShowHelpText(playerId, text)
```

## Parameters

**playerId:** `number`  
The player's server ID

**text:** `string`  
The help text to display

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.ShowHelpText(source, "Press [E] to interact")
```