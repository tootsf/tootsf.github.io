---
layout: default
title: GetFrameworkJobs
parent: Server Functions
grand_parent: Framework
nav_order: 6
---

# GetFrameworkJobs
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns a table of all available jobs in the framework.

## Syntax

```lua
function Framework.GetFrameworkJobs()
```

## Returns

**table**  
Array of job objects

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local jobs = Bridge.Framework.GetFrameworkJobs()
for _, job in pairs(jobs) do
    print("Job: " .. job.label .. " (" .. job.name .. ")")
end
```
