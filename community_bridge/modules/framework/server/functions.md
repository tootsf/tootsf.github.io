---
layout: default
title: Functions
parent: Server
grand_parent: "🧩 Framework"
nav_order: 1
permalink: /community_bridge/modules/framework/server/functions/
---

# Framework Server Functions
{: .no_toc }

Server-side functions for framework integration and player data management.

# Framework Server Functions
{: .no_toc }

Server-side functions for framework integration and player data management.

---

## 🔹 GetFrameworkJobs

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns a table of all available jobs in the framework.


```lua
function Framework.GetFrameworkJobs()
```


**table**  
Array of job objects


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
{: .d-inline-block }
Server
{: .label .label-green }

Returns the name of the currently active framework.


```lua
function Framework.GetFrameworkName()
```


**string**  
The framework name


```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print("Using framework: " .. frameworkName)
```

---

## 🔹 GetItem

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns a table of items matching the specified name (and optionally metadata) from the player's inventory.


```lua
function Framework.GetItem(src, item, metadata)
```


**src:** `number`  
Player server ID

**item:** `string`  
Item name

**metadata:** `table` (optional)  
Metadata to match


**table**  
Array of item tables


```lua
local Bridge = exports['community_bridge']:Bridge()
local items = Bridge.Framework.GetItem(source, "bread")
for _, item in pairs(items) do
    print(item.name .. " x" .. item.count)
end
```

---

## 🔹 GetItemCount

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns the count of items matching the specified name (and optionally metadata) from the player's inventory.


```lua
function Framework.GetItemCount(src, item, metadata)
```


**src:** `number`  
Player server ID

**item:** `string`  
Item name

**metadata:** `table` (optional)  
Metadata to match


**number**  
Count of the item


```lua
local Bridge = exports['community_bridge']:Bridge()
local count = Bridge.Framework.GetItemCount(source, "bread")
print("Player has " .. count .. " bread")
```

---

## 🔹 GetPlayer

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets the framework player object for a given source.


```lua
function Framework.GetPlayer(src)
```


**src:** `number`  
Player server ID


**table|nil**  
Framework player object or nil if not found


```lua
local Bridge = exports['community_bridge']:Bridge()
local player = Bridge.Framework.GetPlayer(source)
if player then
    print("Player found")
end
```

---

## 🔹 GetPlayerDob

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets the player's date of birth.


```lua
function Framework.GetPlayerDob(src)
```


**src:** `number`  
Player server ID


**string**  
Date of birth


```lua
local Bridge = exports['community_bridge']:Bridge()
local dob = Bridge.Framework.GetPlayerDob(source)
print("DOB: " .. dob)
```

---

## 🔹 GetPlayerIdentifier

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns the citizen ID of the player.


```lua
function Framework.GetPlayerIdentifier(src)
```


**src:** `number`  
Player server ID


**string**  
Citizen ID


```lua
local Bridge = exports['community_bridge']:Bridge()
local citizenId = Bridge.Framework.GetPlayerIdentifier(source)
print("Player ID: " .. citizenId)
```

---

## 🔹 GetPlayerInventory

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns the entire inventory of the player as a table.


```lua
function Framework.GetPlayerInventory(src)
```


**src:** `number`  
Player server ID


**table**  
Array of inventory items


```lua
local Bridge = exports['community_bridge']:Bridge()
local inventory = Bridge.Framework.GetPlayerInventory(source)
for _, item in pairs(inventory) do
    print(item.name .. " x" .. item.count)
end
```

---

## 🔹 GetPlayerName

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns the first and last name of the player.


```lua
function Framework.GetPlayerName(src)
```


**src:** `number`  
Player server ID


**string**  
First name

**string**  
Last name


```lua
local Bridge = exports['community_bridge']:Bridge()
local firstname, lastname = Bridge.Framework.GetPlayerName(source)
print("Player: " .. firstname .. " " .. lastname)
```

---

## 🔹 GetPlayers

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets a list of all currently connected players.


```lua
function Framework.GetPlayers()
```


**table**  
Array of player server IDs


```lua
local Bridge = exports['community_bridge']:Bridge()
local players = Bridge.Framework.GetPlayers()
print("Connected players: " .. #players)
```

---

## 🔹 HasItem

{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Checks if the player has a specific item in their inventory.


```lua
function Framework.HasItem(src, item)
```


**src:** `number`  
Player server ID

**item:** `string`  
Item name


**boolean**  
True if player has the item


```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.HasItem(source, "bread") then
    print("Player has bread")
end
```