---
layout: default
title: "IsProgressActive"
parent: Functions
grand_parent: Client
great_grand_parent: "📊 Progressbar"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/progressbar/client/functions/IsProgressActive/
---

# IsProgressActive
{: .no_toc }

Client
{: .label .label-blue }

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

---
