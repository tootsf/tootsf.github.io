---
layout: default
title: GetItemInfo
parent: Client Functions
grand_parent: Inventory
nav_order: 1
---

# GetItemInfo
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Retrieves detailed information about a specific item.

## Syntax

```lua
function Inventory.GetItemInfo(itemName)
```

## Parameters

**itemName:** `string`  
The name/ID of the item to get information for.

## Returns

**Type:** `table` or `nil`  
A table containing item information or nil if the item doesn't exist:
- **name:** Item name/ID
- **label:** Display name
- **description:** Item description
- **weight:** Item weight
- **type:** Item type
- **image:** Image name
- **unique:** Whether the item is unique
- **useable:** Whether the item can be used
- **shouldClose:** Whether to close inventory on use
- **slot:** Default slot (if applicable)
- **combinable:** Combinable properties (if applicable)

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local itemInfo = Bridge.Inventory.GetItemInfo("phone")
if itemInfo then
    print("Item: " .. itemInfo.label)
    print("Description: " .. itemInfo.description)
    print("Weight: " .. itemInfo.weight)
else
    print("Item not found")
end
```
