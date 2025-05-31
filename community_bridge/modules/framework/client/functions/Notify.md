---
layout: default
title: "Notify"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/Notify/
---

# Notify
{: .no_toc }

Client
{: .label .label-blue }

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

---
