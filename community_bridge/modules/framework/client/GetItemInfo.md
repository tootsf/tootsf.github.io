---
layout: default
title: GetItemInfo
parent: Client Functions
grand_parent: Framework
nav_order: 9
---

# GetItemInfo
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets information about a specific item.

## Syntax

```lua
function Framework.GetItemInfo(item)
```

## Parameters

**item:** `string`  
Item name

## Returns

**table**  
Item information including name, label, weight, etc.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local itemInfo = Bridge.Framework.GetItemInfo("bread")
print("Item label: " .. itemInfo.label)
```
