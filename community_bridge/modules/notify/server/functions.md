---
layout: default
title: Functions
parent: Server
grand_parent: "🔔 Notify"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/notify/server/functions/
has_children: false
---

# Notify Server Functions
{: .no_toc }

Server-side functions for notifications and help text display.

---

## 🔹 HideHelpText

# HideHelpText
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Hides help text for a specific player.

## Syntax

```lua
Bridge.Notify.HideHelpText(playerId)
```

## Parameters

**playerId:** `number`  
The player's server ID

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.HideHelpText(source)
```

---

## 🔹 SendNotify

# SendNotify
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Sends a notification to a specific player.

## Syntax

```lua
Bridge.Notify.SendNotify(playerId, message, type)
```

## Parameters

**playerId:** `number`  
The player's server ID

**message:** `string`  
The notification message to display

**type:** `string`  
Type of notification ('success', 'error', 'info', 'warning')

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.SendNotify(source, "Purchase successful!", "success")
Bridge.Notify.SendNotify(source, "Insufficient funds!", "error")
```

---

## 🔹 ShowHelpText

# ShowHelpText
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Shows help text to a specific player.

## Syntax

```lua
Bridge.Notify.ShowHelpText(playerId, text)
```

## Parameters

**playerId:** `number`  
The player's server ID

**text:** `string`  
The help text to display

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.ShowHelpText(source, "Press [E] to interact")
```
