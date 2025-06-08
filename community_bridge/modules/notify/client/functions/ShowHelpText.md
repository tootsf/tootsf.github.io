---
layout: default
title: "ShowHelpText"
parent: Functions
grand_parent: Client
great_grand_parent: 🔔 Notify
nav_order: 1
permalink: /community_bridge/modules/notify/client/functions/ShowHelpText/
nav_exclude: true
---

# ShowHelpText
{: .no_toc }

Shows help text on screen.

## Syntax

```lua
Bridge.Notify.ShowHelpText(text)
```

## Parameters

**text:** `string`  
The help text to display

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.ShowHelpText("Press [E] to interact")
```