---
layout: default
title: HasItem
parent: Server Functions
grand_parent: Framework
nav_order: 10
---

# HasItem
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Checks if the player has a specific item in their inventory.

## Syntax

```lua
function Framework.HasItem(src, item)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

## Returns

**boolean**  
True if player has the item

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.HasItem(source, "bread") then
    print("Player has bread")
end
```
