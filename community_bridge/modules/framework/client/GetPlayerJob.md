---
layout: default
title: GetPlayerJob
parent: Client Functions
grand_parent: "🧩 Framework"
nav_order: 12
---

# GetPlayerJob
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

**Deprecated** - Gets player job information.

## Syntax

```lua
function Framework.GetPlayerJob()
```

## Returns

**string**  
Job name

**string**  
Job label

**string**  
Grade name

**string**  
Grade level

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local jobName, jobLabel, gradeName, gradeLevel = Bridge.Framework.GetPlayerJob()
print("Job: " .. jobLabel .. " (Grade: " .. gradeName .. ")")
```
