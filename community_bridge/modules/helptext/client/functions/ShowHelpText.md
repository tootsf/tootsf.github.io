---
layout: default
title: "ShowHelpText"
parent: Helptext Functions
grand_parent: Client
great_grand_parent: ❓ Helptext
nav_order: 1
---

# ShowHelpText
{: .no_toc }

Displays help text on the screen at the specified position.

## Syntax

```lua
function HelpText.ShowHelpText(message, position)
```

## Parameters

**message:** `string`  
The help text message to display.

**position:** `string`  
Position on screen (implementation dependent).

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help text
Bridge.HelpText.ShowHelpText("Press ~INPUT_CONTEXT~ to interact", "top")
```