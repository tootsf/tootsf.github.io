---
layout: default
title: GetFrameworkName
parent: Server Functions
grand_parent: "🧩 Framework"
nav_order: 1
---

# GetFrameworkName
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

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
