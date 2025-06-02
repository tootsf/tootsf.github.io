---
layout: default
title: "IsMale"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/IsMale/
---

# IsMale
{: .no_toc }

Check if current player is male model.

**Returns:**
- `boolean`: True if male, false if female

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Accessibility.IsMale() then
    print("Player is male")
end
```

---