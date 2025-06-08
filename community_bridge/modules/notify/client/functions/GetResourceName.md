---
layout: default
title: "GetResourceName"
parent: Notify Functions
grand_parent: Client
great_grand_parent: 🔔 Notify
nav_order: 1
---

# GetResourceName
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