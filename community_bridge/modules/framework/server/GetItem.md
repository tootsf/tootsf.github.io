---
layout: default
title: GetItem
parent: Server Functions
grand_parent: "🧩 Framework"
nav_order: 8
---

# GetItem
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns a table of items matching the specified name (and optionally metadata) from the player's inventory.

## Syntax

```lua
function Framework.GetItem(src, item, metadata)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

**metadata:** `table` (optional)  
Metadata to match

## Returns

**table**  
Array of item tables

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local items = Bridge.Framework.GetItem(source, "bread")
for _, item in pairs(items) do
    print(item.name .. " x" .. item.count)
end
```
