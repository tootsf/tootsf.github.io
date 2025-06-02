---
layout: default
title: "GetFrameworkName"
parent: Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/GetFrameworkName/
---

# GetFrameworkName
{: .no_toc }

Returns the name of the currently active framework.

## Syntax

```lua
function Framework.GetFrameworkName()
```

## Returns

**string**
The framework name

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print("Using framework: " .. frameworkName)
```

---