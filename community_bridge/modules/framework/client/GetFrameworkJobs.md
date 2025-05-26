---
layout: default
title: GetFrameworkJobs
parent: Client Functions
grand_parent: "🧩 Framework"
nav_order: 3
---

# GetFrameworkJobs
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Returns a table of all available jobs in the framework.

## Syntax

```lua
function Framework.GetFrameworkJobs()
```

## Returns

**table**  
Array of job objects with name, label, and grades

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local jobs = Bridge.Framework.GetFrameworkJobs()
for _, job in pairs(jobs) do
    print("Job: " .. job.label .. " (" .. job.name .. ")")
end
```
