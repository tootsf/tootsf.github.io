---
layout: default
title: Functions
parent: Client
grand_parent: "🧩 Framework"
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/
---

# Framework Client Functions
{: .no_toc }

Client-side functions for framework integration and player data management.

# Framework Client Functions
{: .no_toc }

Client-side functions for framework integration and player data management.

---

## 🔹 GetFrameworkJobs

# GetFrameworkJobs
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Returns a table of all available jobs in the framework.

## Syntax

```lua
function Framework.GetFrameworkJobs()
```

## Returns

**table**  
Array of job objects with name, label, and grades

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local jobs = Bridge.Framework.GetFrameworkJobs()
for _, job in pairs(jobs) do
    print("Job: " .. job.label .. " (" .. job.name .. ")")
end
```

---

## 🔹 GetFrameworkName

# GetFrameworkName
{: .no_toc }

Returns the name of the currently active framework.

## Description

This function returns a string identifying which framework is currently running on the server (e.g., "qb-core", "es_extended", etc.).

## Usage

```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
```

## Returns

| Type | Description |
|------|-------------|
| `string` | The framework name ("qb-core", "es_extended", etc.) |

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print("Using framework: " .. frameworkName)
```

## Related Functions

- [IsFrameworkLoaded](../shared/IsFrameworkLoaded.md)
- [GetFrameworkType](../shared/GetFrameworkType.md)

---

## 🔹 GetIsPlayerDead

# GetIsPlayerDead
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if the player is currently dead or in last stand.

## Syntax

```lua
function Framework.GetIsPlayerDead()
```

## Returns

**boolean**  
True if player is dead/downed

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.GetIsPlayerDead() then
    print("Player is dead or downed")
end
```

---

## 🔹 GetItemCount

# GetItemCount
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the total count of a specific item in player inventory.

## Syntax

```lua
function Framework.GetItemCount(item)
```

## Parameters

**item:** `string`  
Item name

## Returns

**number**  
Total item count

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local breadCount = Bridge.Framework.GetItemCount("bread")
print("Player has " .. breadCount .. " bread")
```

---

## 🔹 GetItemInfo

# GetItemInfo
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets information about a specific item.

## Syntax

```lua
function Framework.GetItemInfo(item)
```

## Parameters

**item:** `string`  
Item name

## Returns

**table**  
Item information including name, label, weight, etc.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local itemInfo = Bridge.Framework.GetItemInfo("bread")
print("Item label: " .. itemInfo.label)
```

---

## 🔹 GetPlayerData

# GetPlayerData
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the complete player data from the framework.

## Syntax

```lua
function Framework.GetPlayerData()
```

## Returns

**table**  
Complete player data structure

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerData = Bridge.Framework.GetPlayerData()
print("Player name: " .. playerData.charinfo.firstname)
```

---

## 🔹 GetPlayerDob

# GetPlayerDob
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's date of birth.

## Syntax

```lua
function Framework.GetPlayerDob()
```

## Returns

**string**  
Date of birth string

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local dob = Bridge.Framework.GetPlayerDob()
print("Player DOB: " .. dob)
```

---

## 🔹 GetPlayerIdentifier

# GetPlayerIdentifier
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's unique identifier (citizenid).

## Syntax

```lua
function Framework.GetPlayerIdentifier()
```

## Returns

**string**  
Player identifier

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local citizenId = Bridge.Framework.GetPlayerIdentifier()
print("Player ID: " .. citizenId)
```

---

## 🔹 GetPlayerInventory

# GetPlayerInventory
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's complete inventory.

## Syntax

```lua
function Framework.GetPlayerInventory()
```

## Returns

**table**  
Array of inventory items

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Framework.GetPlayerInventory()
for _, item in pairs(inventory) do
    print("Item: " .. item.label .. " (Count: " .. item.count .. ")")
end
```

---

## 🔹 GetPlayerJob

# GetPlayerJob
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

**Deprecated** - Gets player job information.

## Syntax

```lua
function Framework.GetPlayerJob()
```

## Returns

**string**  
Job name

**string**  
Job label

**string**  
Grade name

**string**  
Grade level

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local jobName, jobLabel, gradeName, gradeLevel = Bridge.Framework.GetPlayerJob()
print("Job: " .. jobLabel .. " (Grade: " .. gradeName .. ")")
```

---

## 🔹 GetPlayerJobData

# GetPlayerJobData
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets comprehensive player job data.

## Syntax

```lua
function Framework.GetPlayerJobData()
```

## Returns

**table**  
Job data including name, label, grade, boss status, duty status

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local jobData = Bridge.Framework.GetPlayerJobData()
print("Job: " .. jobData.jobLabel)
print("On duty: " .. tostring(jobData.onDuty))
print("Is boss: " .. tostring(jobData.boss))
```

---

## 🔹 GetPlayerMetaData

# GetPlayerMetaData
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets specific metadata for the player.

## Syntax

```lua
function Framework.GetPlayerMetaData(metadata)
```

## Parameters

**metadata:** `string`  
The metadata key to retrieve

## Returns

**any**  
The metadata value

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local hunger = Bridge.Framework.GetPlayerMetaData("hunger")
print("Player hunger: " .. hunger)
```

---

## 🔹 GetPlayerName

# GetPlayerName
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's first and last name.

## Syntax

```lua
function Framework.GetPlayerName()
```

## Returns

**string**  
First name

**string**  
Last name

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local firstname, lastname = Bridge.Framework.GetPlayerName()
print("Player: " .. firstname .. " " .. lastname)
```

---

## 🔹 HasItem

# HasItem
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if the player has a specific item.

## Syntax

```lua
function Framework.HasItem(item)
```

## Parameters

**item:** `string`  
Item name to check

## Returns

**boolean**  
True if player has the item

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.HasItem("bread") then
    print("Player has bread")
end
```

---

## 🔹 HideHelpText

# HideHelpText
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Hides the currently displayed help text.

## Syntax

```lua
function Framework.HideHelpText()
```

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.HideHelpText()
```

---

## 🔹 Notify

# Notify
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Shows a notification to the player.

## Syntax

```lua
function Framework.Notify(message, type, time)
```

## Parameters

**message:** `string`  
The notification message

**type:** `string`  
Notification type

**time:** `number`  
Duration in milliseconds

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.Notify("Hello player!", "success", 5000)
```

---

## 🔹 ShowHelpText

# ShowHelpText
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays help text on screen.

## Syntax

```lua
function Framework.ShowHelpText(message, position)
```

## Parameters

**message:** `string`  
The help text message

**position:** `any`  
Text position (implementation dependent)

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.ShowHelpText("Press [E] to interact")
```