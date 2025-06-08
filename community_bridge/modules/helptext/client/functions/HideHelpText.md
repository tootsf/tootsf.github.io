---
layout: default
title: "HideHelpText"
parent: Helptext Functions
grand_parent: Client
great_grand_parent: ❓ Helptext
nav_order: 1
---

# HideHelpText
{: .no_toc }

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