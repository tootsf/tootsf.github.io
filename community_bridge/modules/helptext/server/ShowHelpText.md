---
layout: default
title: ShowHelpText
parent: Server Functions
grand_parent: "💬 Helptext"
nav_order: 1
---

# ShowHelpText
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Displays help text on the screen for a specific player.

## Syntax

```lua
function HelpText.ShowHelpText(src, message, position)
```

## Parameters

**src:** `number`  
The player server ID to show the help text to.

**message:** `string`  
The help text message to display.

**position:** `string`  
Position on screen (implementation dependent).

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help text to player with ID 1
Bridge.HelpText.ShowHelpText(1, "Press ~INPUT_CONTEXT~ to interact", "top")
```
