---
layout: default
title: HasItem
parent: Client Functions
grand_parent: Framework
nav_order: 14
---

# HasItem
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if the player has a specific item.

## Syntax

```lua
function Framework.HasItem(item)
```

## Parameters

**item:** `string`  
Item name to check

## Returns

**boolean**  
True if player has the item

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.HasItem("bread") then
    print("Player has bread")
end
```
