---
layout: default
title: GetResourceName
parent: Functions
grand_parent: Server
great_grand_parent: "⭐ Skills"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/skills/server/functions/GetResourceName/
---

# GetResourceName
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Returns the name of the currently configured skill system resource that Community Bridge is interfacing with on the server side.

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
print("Server skill system: " .. skillSystem)

-- Conditional logic based on skill system
if skillSystem == "pickle_xp" then
    print("Server is using Pickle XP skill system")
    -- Perform pickle_xp specific operations
elseif skillSystem == "evolent_skills" then
    print("Server is using Evolent Skills system")
    -- Perform evolent_skills specific operations
elseif skillSystem == "none" then
    print("No skill system configured on server")
    -- Handle no skill system case
end

-- Use in resource initialization
RegisterCommand("checkskillsystem", function(source, args, rawCommand)
    local system = Bridge.Skills.GetResourceName()
    TriggerClientEvent("chat:addMessage", source, {
        color = {255, 255, 0},
        multiline = true,
        args = {"System", "Current skill system: " .. system}
    })
end, false)
```

## System Compatibility

This function is compatible with all supported skill systems:
- **pickle_xp** - Pickle XP system
- **evolent_skills** - Evolent Skills system  
- **OT_skills** - OT Skills system
- **ot_skills** - Alternative OT Skills system
- **_default** - Fallback when no system is available (returns "none")

## Notes

- This function is useful for server-side logic that needs to know which skill system is active
- Returns "none" when no supported skill system is detected or configured
- Can be used for conditional resource loading or feature enabling based on available skill systems
- The return value corresponds to the skill system folder name in the Community Bridge modules
