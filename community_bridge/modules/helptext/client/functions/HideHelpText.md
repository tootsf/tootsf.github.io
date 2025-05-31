---
layout: default
title: "HideHelpText"
parent: Functions
grand_parent: Client
great_grand_parent: "❓ Helptext"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/helptext/client/functions/HideHelpText/
---

# HideHelpText
{: .no_toc }

Client
{: .label .label-blue }

# HideHelpText
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Hides the currently displayed help text from the screen.

## Syntax

```lua
function HelpText.HideHelpText()
```

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help text
Bridge.HelpText.ShowHelpText("Press ~INPUT_CONTEXT~ to interact", "top")

-- Later, hide the help text
Bridge.HelpText.HideHelpText()
```

---
