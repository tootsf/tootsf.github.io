---
layout: default
title: "UpdatePlate"
parent: Functions
grand_parent: Server
great_grand_parent: 🎒 Inventory
nav_order: 1
permalink: /community_bridge/modules/inventory/server/functions/UpdatePlate/
---

# UpdatePlate
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Updates the plate of a vehicle inside the inventory system. Also integrates with jg-mechanic if available.

## Syntax

```lua
Inventory.UpdatePlate(oldplate, newplate)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `oldplate` | string | The current vehicle plate |
| `newplate` | string | The new vehicle plate |

## Returns

| Type | Description |
|------|-------------|
| boolean | True if successful, false otherwise |

## Example

```lua
-- Update a vehicle plate from old to new
local success = Inventory.UpdatePlate("ABC123", "XYZ789")
if success then
    print("Vehicle plate updated successfully")
else
    print("Failed to update vehicle plate")
end
```

---

## Notes

- With ox_inventory: Updates the vehicle in the inventory system and integrates with jg-mechanic if present
- With default inventory: Returns false and an error message as this feature is not bridged
- Useful when players customize or change their vehicle plates