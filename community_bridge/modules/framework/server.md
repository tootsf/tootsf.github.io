---
layout: default
title: Framework Server
parent: Framework
grand_parent: Modules
nav_order: 2
---

# Framework Server
{: .no_toc }

The framework server module provides comprehensive player management, economy operations, and framework integration functions.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Core Functions

### GetFrameworkName()

Returns the name of the currently active framework.

**Returns:**
- `string`: The framework name

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print("Using framework: " .. frameworkName)
```

### GetPlayer(src)

Gets the framework player object for a given source.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `table|nil`: Framework player object or nil if not found

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local player = Bridge.Framework.GetPlayer(source)
if player then
    print("Player found")
end
```

### GetPlayers()

Gets a list of all currently connected players.

**Returns:**
- `table`: Array of player server IDs

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local players = Bridge.Framework.GetPlayers()
print("Connected players: " .. #players)
```

## Player Information

### GetPlayerIdentifier(src)

Gets the unique identifier (citizenid) for a player.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `string`: Player's unique identifier

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local citizenId = Bridge.Framework.GetPlayerIdentifier(source)
print("Player ID: " .. citizenId)
```

### GetPlayerName(src)

Gets the player's first and last name.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `string`: First name
- `string`: Last name

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local firstname, lastname = Bridge.Framework.GetPlayerName(source)
print("Player: " .. firstname .. " " .. lastname)
```

### GetPlayerDob(src)

Gets the player's date of birth.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `string`: Date of birth

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local dob = Bridge.Framework.GetPlayerDob(source)
print("DOB: " .. dob)
```

### GetPlayerPhone(src)

Gets the player's phone number.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `string`: Phone number

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local phone = Bridge.Framework.GetPlayerPhone(source)
print("Phone: " .. phone)
```

### GetPlayerGang(src)

Gets the player's gang name.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `string`: Gang name

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local gang = Bridge.Framework.GetPlayerGang(source)
print("Gang: " .. gang)
```

## Job Management

### GetFrameworkJobs()

Gets all available jobs in the framework.

**Returns:**
- `table`: Array of job objects

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobs = Bridge.Framework.GetFrameworkJobs()
for _, job in pairs(jobs) do
    print("Job: " .. job.label)
end
```

### GetPlayerJob(src) - Deprecated

Gets player job information (deprecated - use GetPlayerJobData instead).

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `string`: Job name
- `string`: Job label
- `string`: Grade name
- `number`: Grade level

### GetPlayerJobData(src)

Gets comprehensive player job data.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `table`: Job data with jobName, jobLabel, gradeName, gradeLabel, gradeRank, boss, onDuty

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobData = Bridge.Framework.GetPlayerJobData(source)
print("Job: " .. jobData.jobLabel)
print("Is boss: " .. tostring(jobData.boss))
print("On duty: " .. tostring(jobData.onDuty))
```

### GetPlayersByJob(job)

Gets all players with a specific job.

**Parameters:**
- `job` (string): Job name

**Returns:**
- `table`: Array of player server IDs

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local cops = Bridge.Framework.GetPlayersByJob("police")
print("Online cops: " .. #cops)
```

### GetPlayerDuty(src)

Gets the player's duty status.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `boolean`: True if on duty

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local onDuty = Bridge.Framework.GetPlayerDuty(source)
print("On duty: " .. tostring(onDuty))
```

### SetPlayerDuty(src, status)

Sets the player's duty status.

**Parameters:**
- `src` (number): Player server ID
- `status` (boolean): Duty status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetPlayerDuty(source, true) -- Put on duty
```

### SetPlayerJob(src, name, grade)

Sets the player's job and grade.

**Parameters:**
- `src` (number): Player server ID
- `name` (string): Job name
- `grade` (string): Grade level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetPlayerJob(source, "police", "0")
```

## Economy

### GetAccountBalance(src, type)

Gets the player's account balance.

**Parameters:**
- `src` (number): Player server ID
- `type` (string): Account type ("money"/"cash", "bank")

**Returns:**
- `number`: Account balance

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local cash = Bridge.Framework.GetAccountBalance(source, "money")
local bank = Bridge.Framework.GetAccountBalance(source, "bank")
```

### AddAccountBalance(src, type, amount)

Adds money to a player's account.

**Parameters:**
- `src` (number): Player server ID
- `type` (string): Account type ("money"/"cash", "bank")
- `amount` (number): Amount to add

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.AddAccountBalance(source, "money", 1000)
```

### RemoveAccountBalance(src, type, amount)

Removes money from a player's account.

**Parameters:**
- `src` (number): Player server ID
- `type` (string): Account type ("money"/"cash", "bank")
- `amount` (number): Amount to remove

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.RemoveAccountBalance(source, "bank", 500)
```

## Inventory Management

### GetItem(src, item, metadata)

Gets specific items from player inventory.

**Parameters:**
- `src` (number): Player server ID
- `item` (string): Item name
- `metadata` (table, optional): Metadata to match

**Returns:**
- `table`: Array of matching items

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local items = Bridge.Framework.GetItem(source, "bread")
for _, item in pairs(items) do
    print("Found bread in slot: " .. item.slot)
end
```

### GetItemInfo(item)

Gets information about an item.

**Parameters:**
- `item` (string): Item name

**Returns:**
- `table`: Item info with name, label, weight, etc.

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local itemInfo = Bridge.Framework.GetItemInfo("bread")
print("Item: " .. itemInfo.label)
```

### GetItemCount(src, item, metadata)

Gets the total count of an item in player inventory.

**Parameters:**
- `src` (number): Player server ID
- `item` (string): Item name
- `metadata` (table, optional): Metadata to match

**Returns:**
- `number`: Total item count

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local breadCount = Bridge.Framework.GetItemCount(source, "bread")
print("Player has " .. breadCount .. " bread")
```

### HasItem(src, item)

Checks if player has an item.

**Parameters:**
- `src` (number): Player server ID
- `item` (string): Item name

**Returns:**
- `boolean`: True if player has the item

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.HasItem(source, "bread") then
    print("Player has bread")
end
```

### GetPlayerInventory(src)

Gets the player's complete inventory.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `table`: Array of inventory items

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local inventory = Bridge.Framework.GetPlayerInventory(source)
for _, item in pairs(inventory) do
    print("Item: " .. item.name .. " (Count: " .. item.count .. ")")
end
```

### GetItemBySlot(src, slot)

Gets the item in a specific inventory slot.

**Parameters:**
- `src` (number): Player server ID
- `slot` (number): Inventory slot

**Returns:**
- `table`: Item data or empty table

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local item = Bridge.Framework.GetItemBySlot(source, 1)
if item.name then
    print("Slot 1 contains: " .. item.name)
end
```

### AddItem(src, item, amount, slot, metadata)

Adds an item to player inventory.

**Parameters:**
- `src` (number): Player server ID
- `item` (string): Item name
- `amount` (number): Amount to add
- `slot` (number, optional): Specific slot
- `metadata` (table, optional): Item metadata

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.AddItem(source, "bread", 5, nil, {quality = 100})
```

### RemoveItem(src, item, amount, slot, metadata)

Removes an item from player inventory.

**Parameters:**
- `src` (number): Player server ID
- `item` (string): Item name
- `amount` (number): Amount to remove
- `slot` (number, optional): Specific slot
- `metadata` (table, optional): Metadata to match

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.RemoveItem(source, "bread", 2)
```

### SetMetadata(src, item, slot, metadata)

Sets metadata for an item in inventory.

**Parameters:**
- `src` (number): Player server ID
- `item` (string): Item name
- `slot` (number): Item slot
- `metadata` (table): New metadata

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetMetadata(source, "bread", 1, {quality = 50})
```

## Player Status

### GetPlayerMetadata(src, metadata)

Gets specific metadata for a player.

**Parameters:**
- `src` (number): Player server ID
- `metadata` (string): Metadata key

**Returns:**
- `any`: Metadata value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local hunger = Bridge.Framework.GetPlayerMetadata(source, "hunger")
print("Hunger: " .. hunger)
```

### SetPlayerMetadata(src, metadata, value)

Sets metadata for a player.

**Parameters:**
- `src` (number): Player server ID
- `metadata` (string): Metadata key
- `value` (any): Metadata value

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetPlayerMetadata(source, "hunger", 50)
```

### GetHunger(src)

Gets the player's hunger level.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `number`: Hunger level (0-100)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local hunger = Bridge.Framework.GetHunger(source)
print("Hunger: " .. hunger)
```

### GetThirst(src)

Gets the player's thirst level.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `number`: Thirst level (0-100)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local thirst = Bridge.Framework.GetThirst(source)
print("Thirst: " .. thirst)
```

### AddHunger(src, value)

Adds to the player's hunger level.

**Parameters:**
- `src` (number): Player server ID
- `value` (number): Amount to add

**Returns:**
- `number`: New hunger level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newHunger = Bridge.Framework.AddHunger(source, 25)
```

### AddThirst(src, value)

Adds to the player's thirst level.

**Parameters:**
- `src` (number): Player server ID
- `value` (number): Amount to add

**Returns:**
- `number`: New thirst level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newThirst = Bridge.Framework.AddThirst(source, 25)
```

### AddStress(src, value)

Adds to the player's stress level.

**Parameters:**
- `src` (number): Player server ID
- `value` (number): Amount to add

**Returns:**
- `number`: New stress level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newStress = Bridge.Framework.AddStress(source, 10)
```

### RemoveStress(src, value)

Removes from the player's stress level.

**Parameters:**
- `src` (number): Player server ID
- `value` (number): Amount to remove

**Returns:**
- `number`: New stress level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newStress = Bridge.Framework.RemoveStress(source, 15)
```

### GetIsPlayerDead(src)

Checks if the player is dead or downed.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `boolean`: True if dead/downed

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.GetIsPlayerDead(source) then
    print("Player is dead")
end
```

### RevivePlayer(src)

Revives a dead player.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.RevivePlayer(source)
```

## Vehicle Management

### GetOwnedVehicles(src)

Gets all vehicles owned by a player.

**Parameters:**
- `src` (number): Player server ID

**Returns:**
- `table`: Array of vehicles with vehicle and plate data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicles = Bridge.Framework.GetOwnedVehicles(source)
for _, vehicle in pairs(vehicles) do
    print("Vehicle: " .. vehicle.vehicle .. " (Plate: " .. vehicle.plate .. ")")
end
```

## Item Registration

### RegisterUsableItem(itemName, cb)

Registers a usable item with a callback function.

**Parameters:**
- `itemName` (string): Item name
- `cb` (function): Callback function when item is used

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.RegisterUsableItem("bread", function(src, itemData)
    print("Player " .. src .. " used bread")
    Bridge.Framework.AddHunger(src, 25)
    Bridge.Framework.RemoveItem(src, "bread", 1, itemData.slot)
end)
```

## Commands

### Framework.Commands.Add(name, help, arguments, argsrequired, callback, permission, ...)

Adds a command to the framework.

**Parameters:**
- `name` (string): Command name
- `help` (string): Help text
- `arguments` (table): Command arguments
- `argsrequired` (boolean): Whether arguments are required
- `callback` (function): Command callback
- `permission` (string): Required permission
- `...` (any): Additional parameters

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.Commands.Add("heal", "Heal yourself", {}, false, function(source, args)
    Bridge.Framework.AddHunger(source, 100)
    Bridge.Framework.AddThirst(source, 100)
end, "admin")
```

## Events

The framework module triggers several community_bridge events:

### community_bridge:Server:OnPlayerLoaded

Triggered when a player loads into the server.

```lua
RegisterNetEvent('community_bridge:Server:OnPlayerLoaded')
AddEventHandler('community_bridge:Server:OnPlayerLoaded', function(src)
    print("Player " .. src .. " loaded")
end)
```

### community_bridge:Server:OnPlayerUnload

Triggered when a player leaves the server.

```lua
RegisterNetEvent('community_bridge:Server:OnPlayerUnload')
AddEventHandler('community_bridge:Server:OnPlayerUnload', function(src)
    print("Player " .. src .. " unloaded")
end)
```

## Framework Support

The module automatically detects and loads the appropriate framework:
- QBCore (qb-core)
- QBX Core (qbx_core)
- ESX (es_extended)

All functions are only available when a supported framework is running.

### GetName
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Framework.GetName(src)
```

Returns the player's display name.

**Parameters:**
- `src` (number) - Player server ID

**Returns:** 
- `string` - Player's display name

**Example:**
```lua
local playerId = source
local playerName = Bridge.Framework.GetName(playerId)
TriggerClientEvent('chat:addMessage', playerId, {
    args = {"Welcome, " .. playerName .. "!"}
})
```

---

### GetSourceFromIdentifier
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Framework.GetSourceFromIdentifier(identifier)
```

Returns the player source from an identifier.

**Parameters:**
- `identifier` (string) - Player's unique identifier

**Returns:** 
- `number|nil` - Player server ID or nil if not found

**Example:**
```lua
local identifier = "steam:110000103fa6de1"
local playerId = Bridge.Framework.GetSourceFromIdentifier(identifier)
if playerId then
    print("Player is online with ID: " .. playerId)
end
```

---

## Economy Functions

### GetMoney
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Framework.GetMoney(src)
```

Returns the player's current money amount.

**Parameters:**
- `src` (number) - Player server ID

**Returns:** 
- `number` - Player's current money

**Example:**
```lua
local playerId = source
local money = Bridge.Framework.GetMoney(playerId)
if money >= 500 then
    print("Player has enough money for purchase")
end
```

---

### AddMoney
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Framework.AddMoney(src, amount)
```

Adds money to a player's account.

**Parameters:**
- `src` (number) - Player server ID
- `amount` (number) - Amount to add

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
local playerId = source
local success = Bridge.Framework.AddMoney(playerId, 1000)
if success then
    TriggerClientEvent('framework:notify', playerId, "You received $1,000!", "success")
end
```

---

### RemoveMoney
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Framework.RemoveMoney(src, amount)
```

Removes money from a player's account.

**Parameters:**
- `src` (number) - Player server ID
- `amount` (number) - Amount to remove

**Returns:** 
- `boolean` - Success status (false if insufficient funds)

**Example:**
```lua
local playerId = source
local cost = 500
if Bridge.Framework.RemoveMoney(playerId, cost) then
    -- Purchase successful
    TriggerClientEvent('framework:notify', playerId, "Purchase complete!", "success")
else
    TriggerClientEvent('framework:notify', playerId, "Insufficient funds!", "error")
end
```

---

## Job Management

### GetJob
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Framework.GetJob(src)
```

Returns the player's current job information.

**Parameters:**
- `src` (number) - Player server ID

**Returns:** 
- `table` - Job data containing name, label, grade, and grade_label

**Example:**
```lua
local playerId = source
local job = Bridge.Framework.GetJob(playerId)
print("Player job: " .. job.name .. " (Grade: " .. job.grade .. ")")
```

---

### SetJob
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Framework.SetJob(src, job, grade)
```

Sets the player's job and grade.

**Parameters:**
- `src` (number) - Player server ID
- `job` (string) - Job name
- `grade` (number) - Job grade/rank

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
local playerId = source
local success = Bridge.Framework.SetJob(playerId, "police", 2)
if success then
    TriggerClientEvent('framework:notify', playerId, "Job updated to Police Officer!", "success")
end
```

---

## Best Practices

### Error Handling
Always check return values for nil or false to handle cases where operations fail:

```lua
local Bridge = exports['community_bridge']:Bridge()

local money = Bridge.Framework.GetMoney(playerId)
if money then
    -- Safe to use money value
else
    print("Error: Could not retrieve player money")
end
```

### Performance Considerations
Cache frequently accessed data to reduce database queries:

```lua
local Bridge = exports['community_bridge']:Bridge()
local playerData = {}
playerData.identifier = Bridge.Framework.GetIdentifier(playerId)
playerData.money = Bridge.Framework.GetMoney(playerId)
playerData.job = Bridge.Framework.GetJob(playerId)
```
