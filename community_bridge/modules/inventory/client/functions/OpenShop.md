---
layout: default
title: "OpenShop"
parent: Functions
grand_parent: Client
great_grand_parent: "🎒 Inventory"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/client/functions/OpenShop/
---

# OpenShop
{: .no_toc }

Client
{: .label .label-blue }

# OpenShop
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Opens a shop interface for the player. This function is only available when using ox_inventory.

## Syntax

```lua
function Inventory.OpenShop(shopTitle, shopInventory)
```

## Parameters

**shopTitle:** `string`  
Title of the shop

**shopInventory:** `table`  
Shop inventory data

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- This will only work with ox_inventory
Bridge.Inventory.OpenShop("General Store", {
    { name = "water", price = 10 },
    { name = "bread", price = 5 }
})
```

---
