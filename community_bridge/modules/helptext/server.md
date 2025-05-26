---
layout: default
title: Server Functions
parent: Helptext
grand_parent: Modules
nav_order: 2
---

# Helptext Server Functions
{: .no_toc }

Server-side functions for sending help text to specific players.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Display Functions

---

## 🔹 ShowHelpText

### ShowHelpText(src, message, position)
{: .d-inline-block }
Server
{: .label .label-green }

Shows help text to a specific player at the specified screen position.

**Parameters:**
- `src` (number) - Player server ID
- `message` (string) - The help text message to display
- `position` (string) - Position on screen (implementation dependent)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help text to a player
local playerId = source
Bridge.HelpText.ShowHelpText(playerId, "Press ~INPUT_CONTEXT~ to interact", "top")
```

---

## 🔹 HideHelpText

### HideHelpText(src)
{: .d-inline-block }
Server
{: .label .label-green }

Hides any currently displayed help text for a specific player.

**Parameters:**
- `src` (number) - Player server ID

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Hide help text for a player
local playerId = source
Bridge.HelpText.HideHelpText(playerId)
```

---

## 📚 Usage Examples

### Context-Based Help

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show help when player enters a zone
RegisterNetEvent('garage:enter', function()
    local src = source
    Bridge.HelpText.ShowHelpText(src, "Press ~INPUT_CONTEXT~ to access garage", "center")
end)

-- Hide help when player exits zone
RegisterNetEvent('garage:exit', function()
    local src = source
    Bridge.HelpText.HideHelpText(src)
end)
```

### Interactive Prompts

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Show interaction prompt
RegisterNetEvent('shop:showPrompt', function()
    local src = source
    Bridge.HelpText.ShowHelpText(src, "Press ~INPUT_PICKUP~ to open shop", "bottom")
end)
```
