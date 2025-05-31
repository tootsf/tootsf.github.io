---
layout: default
title: "GetPlayerJobData"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetPlayerJobData/
---

# GetPlayerJobData
{: .no_toc }

Client
{: .label .label-blue }

# GetPlayerJobData
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets comprehensive player job data.

## Syntax

```lua
function Framework.GetPlayerJobData()
```

## Returns

**table**  
Job data including name, label, grade, boss status, duty status

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local jobData = Bridge.Framework.GetPlayerJobData()
print("Job: " .. jobData.jobLabel)
print("On duty: " .. tostring(jobData.onDuty))
print("Is boss: " .. tostring(jobData.boss))
```

---
