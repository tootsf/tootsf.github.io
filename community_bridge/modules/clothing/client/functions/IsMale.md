---
layout: default
title: "IsMale"
parent: Functions
grand_parent: Client
great_grand_parent: "👔 Clothing"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/clothing/client/functions/IsMale/
---

# IsMale
{: .no_toc }

Client
{: .label .label-blue }

Checks if the current player ped is using the male freemode model.

**Returns:**
- `boolean`: True if male model, false otherwise

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local isMale = Bridge.Clothing.IsMale()
if isMale then
    print("Player is using male model")
end
```

---
