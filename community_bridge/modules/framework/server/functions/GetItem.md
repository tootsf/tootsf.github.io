---
layout: default
title: "GetItem"
parent: Functions
grand_parent: Server
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/GetItem/
---

# GetItem
{: .no_toc }

Server
{: .label .label-blue }

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

---
