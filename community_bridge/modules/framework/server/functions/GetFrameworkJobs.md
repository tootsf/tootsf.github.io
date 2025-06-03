---
layout: default
title: "GetFrameworkJobs"
parent: Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/GetFrameworkJobs/
---

# GetFrameworkJobs
{: .no_toc }

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

---