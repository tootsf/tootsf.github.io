---
layout: default
title: Notify
parent: Client Functions
grand_parent: Framework
nav_order: 6
---

# Notify
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Shows a notification to the player.

## Syntax

```lua
function Framework.Notify(message, type, time)
```

## Parameters

**message:** `string`  
The notification message

**type:** `string`  
Notification type

**time:** `number`  
Duration in milliseconds

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.Notify("Hello player!", "success", 5000)
```
