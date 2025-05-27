---
layout: default
title: Functions
parent: Client
grand_parent: "❓ Helptext"
nav_order: 1
permalink: /community_bridge/modules/helptext/client/functions/
---

# Helptext Client Functions
{: .no_toc }

Client-side functions for displaying help text and instructions.

# Helptext Client Functions
{: .no_toc }

Client-side functions for displaying help text and instructions.

---

## 🔹 HideHelpText

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

## 🔹 ShowHelpText

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