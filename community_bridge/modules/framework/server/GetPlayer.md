---
layout: default
title: GetPlayer
parent: Server Functions
grand_parent: Framework
nav_order: 2
---

# GetPlayer
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets the framework player object for a given source.

## Syntax

```lua
function Framework.GetPlayer(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**table|nil**  
Framework player object or nil if not found

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local player = Bridge.Framework.GetPlayer(source)
if player then
    print("Player found")
end
```
