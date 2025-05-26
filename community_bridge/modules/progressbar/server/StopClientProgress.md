---
layout: default
title: StopClientProgress
parent: Server Functions
grand_parent: "⏳ Progressbar"
nav_order: 3
---

# StopClientProgress
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Stops a progress bar on a specific client.

## Syntax

```lua
function Progressbar.StopClientProgress(source, name)
```

## Parameters

**source:** `number`  
Player server ID

**name:** `string` (optional)  
Progress name to stop. If not provided, stops all progress bars for the specified player.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Stop specific progress
Bridge.Progressbar.StopClientProgress(source, 'server_task')

-- Stop all progress for player
Bridge.Progressbar.StopClientProgress(source)
```
