---
layout: default
title: "ShowHelpText"
parent: Notify Functions
grand_parent: Server
great_grand_parent: 🔔 Notify
nav_order: 1
---

# ShowHelpText
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