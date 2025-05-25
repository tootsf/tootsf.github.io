---
layout: default
title: Client Functions
parent: Helptext
grand_parent: Modules
nav_order: 1
---

# Helptext Client Functions
{: .no_toc }

Client-side functions for displaying contextual help and instruction text.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Display Functions

### ShowHelpText(message, position)
{: .d-inline-block }
Client
{: .label .label-blue }

Displays help text on the screen at the specified position.

**Parameters:**
- `message` (string) - The help text message to display
- `position` (string) - Position on screen (implementation dependent)

**Example:**
```lua
local HelpText = exports['community_bridge']:HelpText()

-- Show help text
HelpText.ShowHelpText("Press ~INPUT_CONTEXT~ to interact", "top")
```

### HideHelpText()
{: .d-inline-block }
Client
{: .label .label-blue }

Hides any currently displayed help text.

**Example:**
```lua
-- Hide help text
HelpText.HideHelpText()
```

---

## Events

The module also responds to server events for remote help text control:

```lua
-- Triggered by server to show help text
RegisterNetEvent('community_bridge:Client:ShowHelpText')

-- Triggered by server to hide help text  
RegisterNetEvent('community_bridge:Client:HideHelpText')
```

---

## Integration Notes

This module serves as a bridge to various textui systems. The actual implementation depends on which textui resource is detected on your server:

- **ox_lib** - Uses `lib.showTextUI()` / `lib.hideTextUI()`
- **okokTextUI** - Uses okokTextUI exports
- **cd_drawtextui** - Uses cd_drawtextui events
- **Default** - Falls back to framework implementation
