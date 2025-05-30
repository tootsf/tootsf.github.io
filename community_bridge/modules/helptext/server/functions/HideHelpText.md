---
layout: default
title: "HideHelpText"
parent: Functions
grand_parent: Server
great_grand_parent: "❓ Helptext"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/helptext/server/functions/HideHelpText/
---

# HideHelpText
{: .no_toc }

Server
{: .label .label-blue }

# HideHelpText
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Hides the currently displayed help text for a specific player.

## Syntax

```lua
function HelpText.HideHelpText(src)
```

## Parameters

**src:** `number`  
The player server ID to hide the help text for.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help text to player with ID 1
Bridge.HelpText.ShowHelpText(1, "Press ~INPUT_CONTEXT~ to interact", "top")

-- Later, hide the help text for the same player
Bridge.HelpText.HideHelpText(1)
```

---
