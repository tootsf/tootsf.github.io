---
layout: default
title: "RestoreAppearance"
parent: Functions
grand_parent: Client
great_grand_parent: "👔 Clothing"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/clothing/client/functions/RestoreAppearance/
---

# RestoreAppearance
{: .no_toc }

Client
{: .label .label-blue }

Restores the previously stored appearance for a ped entity.

**Parameters:**
- `entity` (number): The ped entity to restore appearance for

**Returns:**
- `boolean`: True if successful

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local ped = PlayerPedId()
Bridge.Clothing.RestoreAppearance(ped)
```

---
