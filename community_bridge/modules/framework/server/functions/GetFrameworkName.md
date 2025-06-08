---
layout: default
title: "GetFrameworkName"
parent: Framework Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
nav_order: 1
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