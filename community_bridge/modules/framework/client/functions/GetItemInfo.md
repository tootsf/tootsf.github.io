---
layout: default
title: "GetItemInfo"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 5
permalink: /community_bridge/modules/framework/client/functions/GetItemInfo/
---

# GetItemInfo
{: .no_toc }

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
