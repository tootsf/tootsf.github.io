---
layout: default
title: "IsMale"
parent: Functions
grand_parent: Client
great_grand_parent: ♿ Accessibility
nav_order: 1
permalink: /community_bridge/modules/accessibility/client/functions/IsMale/
nav_exclude: true
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