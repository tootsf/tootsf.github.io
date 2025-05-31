---
layout: default
title: "HasItem"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/HasItem/
---

# HasItem
{: .no_toc }

Client
{: .label .label-blue }

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

---
