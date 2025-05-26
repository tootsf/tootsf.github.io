---
layout: default
title: Framework Client
parent: Framework
grand_parent: Modules
nav_order: 1
---

# Framework Client
{: .no_toc }

The framework client module provides functions for accessing player data and framework information on the client-side.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Player Data Functions

---

## 🔹 GetFrameworkName

Returns the name of the currently active framework.

**Returns:**
- `string`: The framework name ("qb-core", "es_extended", etc.)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local frameworkName = Bridge.Framework.GetFrameworkName()
print("Using framework: " .. frameworkName)
```

---

## 🔹 GetPlayerData

Gets the complete player data from the framework.

**Returns:**
- `table`: Complete player data structure

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local playerData = Bridge.Framework.GetPlayerData()
print("Player name: " .. playerData.charinfo.firstname)
```

## Job Functions

---

## 🔹 GetFrameworkJobs

Returns a table of all available jobs in the framework.

**Returns:**
- `table`: Array of job objects with name, label, and grades

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local jobs = Bridge.Framework.GetFrameworkJobs()
for _, job in pairs(jobs) do
    print("Job: " .. job.label .. " (" .. job.name .. ")")
end
```

---

## Player Information

---

## 🔹 GetPlayerDob

Gets the player's date of birth.

**Returns:**
- `string`: Date of birth string

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local dob = Bridge.Framework.GetPlayerDob()
print("Player DOB: " .. dob)
```

---

## 🔹 GetPlayerMetaData

Gets specific metadata for the player.

**Parameters:**
- `metadata` (string): The metadata key to retrieve

**Returns:**
- `any`: The metadata value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local hunger = Bridge.Framework.GetPlayerMetaData("hunger")
print("Player hunger: " .. hunger)
```

---

## 🔹 Notify

Shows a notification to the player.

**Parameters:**
- `message` (string): The notification message
- `type` (string): Notification type
- `time` (number): Duration in milliseconds

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.Notify("Hello player!", "success", 5000)
```

---

## 🔹 ShowHelpText

Displays help text on screen.

**Parameters:**
- `message` (string): The help text message
- `position` (any): Text position (implementation dependent)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.ShowHelpText("Press [E] to interact")
```

---

## 🔹 HideHelpText

Hides the currently displayed help text.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.HideHelpText()
```

---

## 🔹 GetItemInfo

Gets information about a specific item.

**Parameters:**
- `item` (string): Item name

**Returns:**
- `table`: Item information including name, label, weight, etc.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local itemInfo = Bridge.Framework.GetItemInfo("bread")
print("Item label: " .. itemInfo.label)
```

---

## 🔹 GetPlayerIdentifier

Gets the player's unique identifier (citizenid).

**Returns:**
- `string`: Player identifier

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local citizenId = Bridge.Framework.GetPlayerIdentifier()
print("Player ID: " .. citizenId)
```

---

## 🔹 GetPlayerName

Gets the player's first and last name.

**Returns:**
- `string`: First name
- `string`: Last name

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local firstname, lastname = Bridge.Framework.GetPlayerName()
print("Player: " .. firstname .. " " .. lastname)
```

---

## 🔹 GetPlayerJob

**Deprecated** - Gets player job information.

**Returns:**
- `string`: Job name
- `string`: Job label  
- `string`: Grade name
- `string`: Grade level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local jobName, jobLabel, gradeName, gradeLevel = Bridge.Framework.GetPlayerJob()
print("Job: " .. jobLabel .. " (Grade: " .. gradeName .. ")")
```

---

## 🔹 GetPlayerJobData

Gets comprehensive player job data.

**Returns:**
- `table`: Job data including name, label, grade, boss status, duty status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local jobData = Bridge.Framework.GetPlayerJobData()
print("Job: " .. jobData.jobLabel)
print("On duty: " .. tostring(jobData.onDuty))
print("Is boss: " .. tostring(jobData.boss))
```

---

## 🔹 HasItem

Checks if the player has a specific item.

**Parameters:**
- `item` (string): Item name to check

**Returns:**
- `boolean`: True if player has the item

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.HasItem("bread") then
    print("Player has bread")
end
```

---

## 🔹 GetItemCount

Gets the total count of a specific item in player inventory.

**Parameters:**
- `item` (string): Item name

**Returns:**
- `number`: Total item count

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local breadCount = Bridge.Framework.GetItemCount("bread")
print("Player has " .. breadCount .. " bread")
```

---

## 🔹 GetPlayerInventory

Gets the player's complete inventory.

**Returns:**
- `table`: Array of inventory items

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Framework.GetPlayerInventory()
for _, item in pairs(inventory) do
    print("Item: " .. item.label .. " (Count: " .. item.count .. ")")
end
```

---

## 🔹 GetIsPlayerDead

Checks if the player is currently dead or in last stand.

**Returns:**
- `boolean`: True if player is dead/downed

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.GetIsPlayerDead() then
    print("Player is dead or downed")
end
```

---

## Events

The framework module triggers several community_bridge events:

---

## 🔹 community_bridge:Client:OnPlayerLoaded

Triggered when the player is loaded into the framework.

```lua
RegisterNetEvent('community_bridge:Client:OnPlayerLoaded')
AddEventHandler('community_bridge:Client:OnPlayerLoaded', function()
    print("Player loaded")
end)
```

### community_bridge:Client:OnPlayerUnload

Triggered when the player is unloaded from the framework.

```lua
RegisterNetEvent('community_bridge:Client:OnPlayerUnload')  
AddEventHandler('community_bridge:Client:OnPlayerUnload', function()
    print("Player unloaded")
end)
```

### community_bridge:Client:OnPlayerJobUpdate

Triggered when the player's job is updated.

```lua
RegisterNetEvent('community_bridge:Client:OnPlayerJobUpdate')
AddEventHandler('community_bridge:Client:OnPlayerJobUpdate', function(name, label, gradeLabel, grade)
    print("Job updated: " .. label .. " (Grade: " .. gradeLabel .. ")")
end)
```

## Framework Support

The module automatically detects and loads the appropriate framework:
- QBCore (qb-core)
- QBX Core (qbx_core)  
- ESX (es_extended)

Functions will only work when a supported framework is running.

### Data Synchronization
Always use server-side functions for authoritative data:

```lua
-- ❌ Don't rely on cached client data for important operations
local clientMoney = Bridge.Framework.GetLocalPlayerData().money

-- ✅ Request server verification for important operations
TriggerServerEvent('framework:requestMoneyCheck', amount)
```

### Event Handling
Set up event handlers early in your resource startup:

```lua
Citizen.CreateThread(function()
    while not Bridge.Framework.IsPlayerLoaded() do
        Citizen.Wait(100)
    end
    
    -- Player is loaded, safe to use framework functions
    local playerData = Bridge.Framework.GetLocalPlayerData()
    -- Initialize UI or other systems
end)
```
