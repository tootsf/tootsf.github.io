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

# GetFrameworkJobs
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns a table of all available jobs in the framework.

## Syntax

```lua
function Framework.GetFrameworkJobs()
```

## Returns

**table**  
Array of job objects

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
{: .d-inline-block }
Server
{: .label .label-green }

Returns the name of the currently active framework.

## Syntax

```lua
function Framework.GetFrameworkName()
```

## Returns

**string**  
The framework name

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print("Using framework: " .. frameworkName)
```

---

## 🔹 GetItem

# GetItem
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns a table of items matching the specified name (and optionally metadata) from the player's inventory.

## Syntax

```lua
function Framework.GetItem(src, item, metadata)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

**metadata:** `table` (optional)  
Metadata to match

## Returns

**table**  
Array of item tables

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local items = Bridge.Framework.GetItem(source, "bread")
for _, item in pairs(items) do
    print(item.name .. " x" .. item.count)
end
```

---

## 🔹 GetItemCount

# GetItemCount
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns the count of items matching the specified name (and optionally metadata) from the player's inventory.

## Syntax

```lua
function Framework.GetItemCount(src, item, metadata)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

**metadata:** `table` (optional)  
Metadata to match

## Returns

**number**  
Count of the item

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local count = Bridge.Framework.GetItemCount(source, "bread")
print("Player has " .. count .. " bread")
```

---

## 🔹 GetPlayer

# GetPlayer
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets the framework player object for a given source.

## Syntax

```lua
function Framework.GetPlayer(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**table|nil**  
Framework player object or nil if not found

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local player = Bridge.Framework.GetPlayer(source)
if player then
    print("Player found")
end
```

---

## 🔹 GetPlayerDob

# GetPlayerDob
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets the player's date of birth.

## Syntax

```lua
function Framework.GetPlayerDob(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**string**  
Date of birth

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local dob = Bridge.Framework.GetPlayerDob(source)
print("DOB: " .. dob)
```

---

## 🔹 GetPlayerIdentifier

# GetPlayerIdentifier
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns the citizen ID of the player.

## Syntax

```lua
function Framework.GetPlayerIdentifier(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**string**  
Citizen ID

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local citizenId = Bridge.Framework.GetPlayerIdentifier(source)
print("Player ID: " .. citizenId)
```

---

## 🔹 GetPlayerInventory

# GetPlayerInventory
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns the entire inventory of the player as a table.

## Syntax

```lua
function Framework.GetPlayerInventory(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**table**  
Array of inventory items

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local inventory = Bridge.Framework.GetPlayerInventory(source)
for _, item in pairs(inventory) do
    print(item.name .. " x" .. item.count)
end
```

---

## 🔹 GetPlayerName

# GetPlayerName
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Returns the first and last name of the player.

## Syntax

```lua
function Framework.GetPlayerName(src)
```

## Parameters

**src:** `number`  
Player server ID

## Returns

**string**  
First name

**string**  
Last name

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local firstname, lastname = Bridge.Framework.GetPlayerName(source)
print("Player: " .. firstname .. " " .. lastname)
```

---

## 🔹 GetPlayers

# GetPlayers
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Gets a list of all currently connected players.

## Syntax

```lua
function Framework.GetPlayers()
```

## Returns

**table**  
Array of player server IDs

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
local players = Bridge.Framework.GetPlayers()
print("Connected players: " .. #players)
```

---

## 🔹 HasItem

# HasItem
{: .no_toc }
{: .d-inline-block }
Server
{: .label .label-green }

Checks if the player has a specific item in their inventory.

## Syntax

```lua
function Framework.HasItem(src, item)
```

## Parameters

**src:** `number`  
Player server ID

**item:** `string`  
Item name

## Returns

**boolean**  
True if player has the item

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.HasItem(source, "bread") then
    print("Player has bread")
end
```