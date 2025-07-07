# Skills 🎯

<!--META
nav: true
toc: true
description: The Skills module provides functions for managing player skills and experience points. It supports various skill systems with a unified interface.
-->

The Skills module provides functions for managing player skills and experience points. It supports various skill systems with a unified interface.

## Overview

The Skills provides functionality for FiveM resources.

## Client Functions

### GetResourceName

<!--TOC: GetResourceName-->

**Context:** 🖥️ Client

Gets the name of the currently active skills system.

**Syntax:** `Bridge.Skills.GetResourceName()`

**Parameters:** None

**Returns:**
- (string) - Name of the skills system being used

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local skillsSystem = Bridge.Skills.GetResourceName()
print("Using skills system: " .. skillsSystem)
```

### GetSkillLevel

<!--TOC: GetSkillLevel-->

**Context:** 🖥️ Client

Gets the current level of a specific skill for the player.

**Syntax:** `Bridge.Skills.GetSkillLevel(skillName)`

**Parameters:**
- `skillName` (string) - Name of the skill to check

**Returns:**
- (number) - Current level of the skill (0 if not supported)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local drivingLevel = Bridge.Skills.GetSkillLevel("driving")
local shootingLevel = Bridge.Skills.GetSkillLevel("shooting")

print("Driving level: " .. drivingLevel)
print("Shooting level: " .. shootingLevel)
```

## Server Functions

### AddXp

<!--TOC: AddXp-->

**Context:** 🖲️ Server

Adds experience points to a specific skill for a player.

**Syntax:** `Bridge.Skills.AddXp(src, skillName, amount)`

**Parameters:**
- `src` (number) - Player server ID
- `skillName` (string) - Name of the skill to add XP to
- `amount` (number) - Amount of XP to add

**Returns:**
- (boolean) - True if XP was added successfully, false if not supported

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Add driving XP when player completes a delivery
local success = Bridge.Skills.AddXp(source, "driving", 25)
if success then
    Bridge.Notify.SendNotify(source, "You gained 25 driving XP!", "success")
end
```

### GetResourceName

<!--TOC: GetResourceName-->

**Context:** 🖲️ Server

Gets the name of the currently active skills system.

**Syntax:** `Bridge.Skills.GetResourceName()`

**Parameters:** None

**Returns:**
- (string) - Name of the skills system being used

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local skillsSystem = Bridge.Skills.GetResourceName()
print("Using skills system: " .. skillsSystem)
```

### GetSkillLevel

<!--TOC: GetSkillLevel-->

**Context:** 🖲️ Server

Gets the current level of a specific skill for a player.

**Syntax:** `Bridge.Skills.GetSkillLevel(src, skillName)`

**Parameters:**
- `src` (number) - Player server ID
- `skillName` (string) - Name of the skill to check

**Returns:**
- (number) - Current level of the skill (0 if not supported)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local playerDrivingLevel = Bridge.Skills.GetSkillLevel(source, "driving")
print("Player driving level: " .. playerDrivingLevel)
```

### RemoveXp

<!--TOC: RemoveXp-->

**Context:** 🖲️ Server

Removes experience points from a specific skill for a player.

**Syntax:** `Bridge.Skills.RemoveXp(src, skillName, amount)`

**Parameters:**
- `src` (number) - Player server ID
- `skillName` (string) - Name of the skill to remove XP from
- `amount` (number) - Amount of XP to remove

**Returns:**
- (boolean) - True if XP was removed successfully, false if not supported

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove driving XP as penalty for reckless driving
local success = Bridge.Skills.RemoveXp(source, "driving", 10)
if success then
    Bridge.Notify.SendNotify(source, "You lost 10 driving XP for reckless driving!", "error")
end
```

