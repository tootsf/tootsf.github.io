---
layout: default
title: "StopProgress"
parent: Progressbar Functions
grand_parent: Client
great_grand_parent: ⏳ Progressbar
nav_order: 1
---

# StopProgress
{: .no_toc }

Stops an active progress bar.

## Syntax

```lua
function Progressbar.StopProgress(name)
```

## Parameters

**name:** `string` (optional)  
Progress name to stop. If not provided, stops all progress bars.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Stop specific progress
Bridge.Progressbar.StopProgress('repair_vehicle')

-- Stop all progress bars
Bridge.Progressbar.StopProgress()
```