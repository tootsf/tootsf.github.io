---
layout: default
title: GetPlayerJobData
parent: Client Functions
grand_parent: "🧩 Framework"
nav_order: 13
---

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
