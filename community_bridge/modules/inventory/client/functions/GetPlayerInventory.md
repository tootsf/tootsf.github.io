---
layout: default
title: "GetPlayerInventory"
parent: Functions
grand_parent: Client
great_grand_parent: "🎒 Inventory"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/inventory/client/functions/GetPlayerInventory/
---

# GetPlayerInventory
{: .no_toc }

Client
{: .label .label-blue }

# GetPlayerInventory

Returns the complete player inventory.

**Returns:**
- `table` – Array of inventory items with format {name, label, count, slot, metadata}

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Inventory.GetPlayerInventory()
for slot, item in pairs(inventory) do
    if item then
        print("Slot " .. slot .. ": " .. item.name .. " x" .. item.count)
    end
end
```

---
