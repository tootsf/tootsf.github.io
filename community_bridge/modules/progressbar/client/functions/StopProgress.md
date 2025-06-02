---
layout: default
title: "StopProgress"
parent: Functions
grand_parent: Client
great_grand_parent: ⏳ Progressbar
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/progressbar/client/functions/StopProgress/
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