---
layout: default
title: "GetPlayerJob"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetPlayerJob/
---

# GetPlayerJob
{: .no_toc }

Client
{: .label .label-blue }

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

---
