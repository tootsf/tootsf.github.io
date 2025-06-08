---
layout: default
title: "RestoreAppearance"
parent: Clothing Functions
grand_parent: Client
great_grand_parent: 👔 Clothing
nav_order: 1
---

# RestoreAppearance
{: .no_toc }

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