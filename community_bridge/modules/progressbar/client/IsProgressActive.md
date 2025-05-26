---
layout: default
title: IsProgressActive
parent: Client Functions
grand_parent: "⏳ Progressbar"
nav_order: 4
---

# IsProgressActive
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if a progress bar is currently active.

## Syntax

```lua
function Progressbar.IsProgressActive(name)
```

## Parameters

**name:** `string` (optional)  
Progress name to check. If not provided, checks for any active progress bar.

## Returns

**boolean**  
`true` if progress is active, `false` otherwise

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Progressbar.IsProgressActive('repair_vehicle') then
    print('Vehicle repair in progress')
end

if Bridge.Progressbar.IsProgressActive() then
    print('Some progress is active')
end
```
