---
layout: default
title: GetResourceName
parent: Functions
grand_parent: Client
great_grand_parent: "⭐ Skills"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/skills/client/functions/GetResourceName/
---

# GetResourceName
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Returns the name of the currently configured skill system resource that Community Bridge is interfacing with.

## Syntax

```lua
Bridge.Skills.GetResourceName()
```

## Parameters

This function takes no parameters.

## Returns

| Type | Description |
|------|-------------|
| `string` | The name of the skill system resource (e.g., "pickle_xp", "evolent_skills", "OT_skills", "ot_skills") or "none" if no skill system is configured |

## Example

```lua
-- Get the current skill system name
local skillSystem = Bridge.Skills.GetResourceName()
print("Current skill system: " .. skillSystem)

-- Check if a specific skill system is being used
if skillSystem == "pickle_xp" then
    print("Using Pickle XP skill system")
elseif skillSystem == "none" then
    print("No skill system configured")
end
```

## System Compatibility

This function is compatible with all supported skill systems:
- **pickle_xp** - Pickle XP system
- **evolent_skills** - Evolent Skills system  
- **OT_skills** - OT Skills system
- **ot_skills** - Alternative OT Skills system
- **_default** - Fallback when no system is available (returns "none")

## Notes

- This function is useful for determining which skill system is currently active
- Returns "none" when no supported skill system is detected or configured
- The return value corresponds to the skill system folder name in the Community Bridge modules
