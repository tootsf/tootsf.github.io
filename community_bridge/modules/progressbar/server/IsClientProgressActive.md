---
layout: default
title: IsClientProgressActive
parent: Server Functions
grand_parent: Progressbar
nav_order: 4
---

# IsClientProgressActive
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Checks if a client has an active progress bar.

## Syntax

```lua
function Progressbar.IsClientProgressActive(source, name)
```

## Parameters

**source:** `number`  
Player server ID

**name:** `string` (optional)  
Progress name to check. If not provided, checks for any active progress bar for the player.

## Returns

**boolean**  
`true` if progress is active, `false` otherwise

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Progressbar.IsClientProgressActive(source, 'repair_task') then
    Bridge.Progressbar.ShowNotification(source, 'Already repairing!', 'error')
    return
end
```
