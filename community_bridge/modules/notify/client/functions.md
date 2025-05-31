---
layout: default
title: Functions
parent: Client
grand_parent: "🔔 Notify"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/notify/client/functions/
has_children: false
---

# Notify Client Functions
{: .no_toc }

Client-side functions for notifications and help text display.

---

## 🔹 GetResourceName

# GetResourceName
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the name of the notification resource being used.

## Syntax

```lua
Bridge.Notify.GetResourceName()
```

## Returns

**string**  
Name of the current notification resource

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local resource = Bridge.Notify.GetResourceName()
print("Using notification resource: " .. resource)
```

---

## 🔹 HideHelpText

# HideHelpText
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Hides the currently displayed help text.

## Syntax

```lua
Bridge.Notify.HideHelpText()
```

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.HideHelpText()
```

---

## 🔹 SendNotify

# SendNotify
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Sends a notification to the player.

## Syntax

```lua
Bridge.Notify.SendNotify(message, type)
```

## Parameters

**message:** `string`  
The notification message to display

**type:** `string`  
Type of notification ('success', 'error', 'info', 'warning')

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.SendNotify("Purchase successful!", "success")
Bridge.Notify.SendNotify("Insufficient funds!", "error")
```

---

## 🔹 ShowHelpText

# ShowHelpText
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Shows help text on screen.

## Syntax

```lua
Bridge.Notify.ShowHelpText(text)
```

## Parameters

**text:** `string`  
The help text to display

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Notify.ShowHelpText("Press [E] to interact")
```
