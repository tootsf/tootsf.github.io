---
layout: default
title: "GetPlayerInventory"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/GetPlayerInventory/
---

# GetPlayerInventory
{: .no_toc }

Client
{: .label .label-blue }

# GetPlayerInventory
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's complete inventory.

## Syntax

```lua
function Framework.GetPlayerInventory()
```

## Returns

**table**  
Array of inventory items

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Framework.GetPlayerInventory()
for _, item in pairs(inventory) do
    print("Item: " .. item.label .. " (Count: " .. item.count .. ")")
end
```

---
