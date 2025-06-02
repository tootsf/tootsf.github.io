---
layout: default
title: Functions
parent: Server
grand_parent: "❓ Helptext"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/helptext/server/functions/
---

# Helptext Server Functions
{: .no_toc }

Server-side functions for displaying help text and instructions.

---

## 🔹 HideHelpText

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

## 🔹 ShowHelpText

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