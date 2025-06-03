---
layout: default
title: "GetResourceName"
parent: Functions
grand_parent: Client
great_grand_parent: 🔔 Notify
nav_order: 1
permalink: /community_bridge/modules/notify/client/functions/GetResourceName/
---

# GetResourceName
{: .no_toc }

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