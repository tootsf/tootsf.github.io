---
layout: default
title: Client Functions
parent: "❓ Helptext"
grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/helptext/client/
---

# Helptext Client Functions
{: .no_toc }

Client-side functions for displaying help text and instructions.

---

## 🔹 HideHelpText

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Hides the currently displayed help text from the screen.


```lua
function HelpText.HideHelpText()
```


```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help text
Bridge.HelpText.ShowHelpText("Press ~INPUT_CONTEXT~ to interact", "top")

-- Later, hide the help text
Bridge.HelpText.HideHelpText()
```

---

## 🔹 ShowHelpText

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays help text on the screen at the specified position.


```lua
function HelpText.ShowHelpText(message, position)
```


**message:** `string`  
The help text message to display.

**position:** `string`  
Position on screen (implementation dependent).


```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help text
Bridge.HelpText.ShowHelpText("Press ~INPUT_CONTEXT~ to interact", "top")
```