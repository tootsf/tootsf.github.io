---
layout: default
title: "ShowHelpText"
parent: Functions
grand_parent: Client
great_grand_parent: "❓ Helptext"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/helptext/client/functions/ShowHelpText/
---

# ShowHelpText
{: .no_toc }

Client
{: .label .label-blue }

# ShowHelpText
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

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
