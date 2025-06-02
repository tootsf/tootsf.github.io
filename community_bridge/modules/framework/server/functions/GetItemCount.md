---
layout: default
title: "GetItemCount"
parent: Functions
grand_parent: Server
great_grand_parent: 🧩 Framework
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/GetItemCount/
---

# GetItemCount
{: .no_toc }

Returns the count of items matching the specified name (and optionally metadata) from the player's inventory.

## Syntax

```lua
function Framework.GetItemCount(src, item, metadata)
```

## Parameters

**src:** `number`
Player server ID

**item:** `string`
Item name

**metadata:** `table` (optional)
Metadata to match

## Returns

**number**
Count of the item

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local count = Bridge.Framework.GetItemCount(source, "bread")
print("Player has " .. count .. " bread")
```

---