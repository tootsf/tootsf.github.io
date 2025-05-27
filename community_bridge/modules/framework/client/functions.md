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

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Returns a table of all available jobs in the framework.


```lua
function Framework.GetFrameworkJobs()
```


**table**  
Array of job objects with name, label, and grades


```lua
local Bridge = exports['community_bridge']:Bridge()

local jobs = Bridge.Framework.GetFrameworkJobs()
for _, job in pairs(jobs) do
    print("Job: " .. job.label .. " (" .. job.name .. ")")
end
```

---

## 🔹 GetFrameworkName

{: .no_toc }

Returns the name of the currently active framework.


This function returns a string identifying which framework is currently running on the server (e.g., "qb-core", "es_extended", etc.).


```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
```


| Type | Description |
|------|-------------|
| `string` | The framework name ("qb-core", "es_extended", etc.) |


```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print("Using framework: " .. frameworkName)
```


- [IsFrameworkLoaded](../shared/IsFrameworkLoaded.md)
- [GetFrameworkType](../shared/GetFrameworkType.md)

---

## 🔹 GetIsPlayerDead

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if the player is currently dead or in last stand.


```lua
function Framework.GetIsPlayerDead()
```


**boolean**  
True if player is dead/downed


```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.GetIsPlayerDead() then
    print("Player is dead or downed")
end
```

---

## 🔹 GetItemCount

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the total count of a specific item in player inventory.


```lua
function Framework.GetItemCount(item)
```


**item:** `string`  
Item name


**number**  
Total item count


```lua
local Bridge = exports['community_bridge']:Bridge()

local breadCount = Bridge.Framework.GetItemCount("bread")
print("Player has " .. breadCount .. " bread")
```

---

## 🔹 GetItemInfo

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets information about a specific item.


```lua
function Framework.GetItemInfo(item)
```


**item:** `string`  
Item name


**table**  
Item information including name, label, weight, etc.


```lua
local Bridge = exports['community_bridge']:Bridge()

local itemInfo = Bridge.Framework.GetItemInfo("bread")
print("Item label: " .. itemInfo.label)
```

---

## 🔹 GetPlayerData

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the complete player data from the framework.


```lua
function Framework.GetPlayerData()
```


**table**  
Complete player data structure


```lua
local Bridge = exports['community_bridge']:Bridge()

local playerData = Bridge.Framework.GetPlayerData()
print("Player name: " .. playerData.charinfo.firstname)
```

---

## 🔹 GetPlayerDob

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's date of birth.


```lua
function Framework.GetPlayerDob()
```


**string**  
Date of birth string


```lua
local Bridge = exports['community_bridge']:Bridge()

local dob = Bridge.Framework.GetPlayerDob()
print("Player DOB: " .. dob)
```

---

## 🔹 GetPlayerIdentifier

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's unique identifier (citizenid).


```lua
function Framework.GetPlayerIdentifier()
```


**string**  
Player identifier


```lua
local Bridge = exports['community_bridge']:Bridge()

local citizenId = Bridge.Framework.GetPlayerIdentifier()
print("Player ID: " .. citizenId)
```

---

## 🔹 GetPlayerInventory

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's complete inventory.


```lua
function Framework.GetPlayerInventory()
```


**table**  
Array of inventory items


```lua
local Bridge = exports['community_bridge']:Bridge()

local inventory = Bridge.Framework.GetPlayerInventory()
for _, item in pairs(inventory) do
    print("Item: " .. item.label .. " (Count: " .. item.count .. ")")
end
```

---

## 🔹 GetPlayerJob

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

**Deprecated** - Gets player job information.


```lua
function Framework.GetPlayerJob()
```


**string**  
Job name

**string**  
Job label

**string**  
Grade name

**string**  
Grade level


```lua
local Bridge = exports['community_bridge']:Bridge()

local jobName, jobLabel, gradeName, gradeLevel = Bridge.Framework.GetPlayerJob()
print("Job: " .. jobLabel .. " (Grade: " .. gradeName .. ")")
```

---

## 🔹 GetPlayerJobData

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets comprehensive player job data.


```lua
function Framework.GetPlayerJobData()
```


**table**  
Job data including name, label, grade, boss status, duty status


```lua
local Bridge = exports['community_bridge']:Bridge()

local jobData = Bridge.Framework.GetPlayerJobData()
print("Job: " .. jobData.jobLabel)
print("On duty: " .. tostring(jobData.onDuty))
print("Is boss: " .. tostring(jobData.boss))
```

---

## 🔹 GetPlayerMetaData

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets specific metadata for the player.


```lua
function Framework.GetPlayerMetaData(metadata)
```


**metadata:** `string`  
The metadata key to retrieve


**any**  
The metadata value


```lua
local Bridge = exports['community_bridge']:Bridge()

local hunger = Bridge.Framework.GetPlayerMetaData("hunger")
print("Player hunger: " .. hunger)
```

---

## 🔹 GetPlayerName

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Gets the player's first and last name.


```lua
function Framework.GetPlayerName()
```


**string**  
First name

**string**  
Last name


```lua
local Bridge = exports['community_bridge']:Bridge()

local firstname, lastname = Bridge.Framework.GetPlayerName()
print("Player: " .. firstname .. " " .. lastname)
```

---

## 🔹 HasItem

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Checks if the player has a specific item.


```lua
function Framework.HasItem(item)
```


**item:** `string`  
Item name to check


**boolean**  
True if player has the item


```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Framework.HasItem("bread") then
    print("Player has bread")
end
```

---

## 🔹 HideHelpText

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Hides the currently displayed help text.


```lua
function Framework.HideHelpText()
```


```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.HideHelpText()
```

---

## 🔹 Notify

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Shows a notification to the player.


```lua
function Framework.Notify(message, type, time)
```


**message:** `string`  
The notification message

**type:** `string`  
Notification type

**time:** `number`  
Duration in milliseconds


```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.Notify("Hello player!", "success", 5000)
```

---

## 🔹 ShowHelpText

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays help text on screen.


```lua
function Framework.ShowHelpText(message, position)
```


**message:** `string`  
The help text message

**position:** `any`  
Text position (implementation dependent)


```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.ShowHelpText("Press [E] to interact")
```