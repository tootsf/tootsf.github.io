# Framework 🏗️

<!--META
nav: true
toc: true
description: Universal framework compatibility layer that provides consistent access to player data, jobs, and framework-specific functions across QB-Core, ESX, QBox, and custom frameworks. This is the foundation module that enables cross-framework development.
-->

Universal framework compatibility layer that provides consistent access to player data, jobs, and framework-specific functions across QB-Core, ESX, QBox, and custom frameworks. This is the foundation module that enables cross-framework development.

## Overview

The Framework provides functionality for FiveM resources.

## Client Functions

### GetFrameworkJobs

<!--TOC: GetFrameworkJobs-->

**Context:** 🖥️ Client

Function GetFrameworkJobs

**Syntax:** `Bridge.Framework.GetFrameworkJobs()`

**Parameters:** None

**Returns:**
- (table) - Array of job objects with name, label, and grades

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobs = Bridge.Framework.GetFrameworkJobs()
for _, job in pairs(jobs) do
    print('Job:', job.name, job.label)
end
```

### GetFrameworkName

<!--TOC: GetFrameworkName-->

**Context:** 🖥️ Client

Function GetFrameworkName

**Syntax:** `Bridge.Framework.GetFrameworkName()`

**Parameters:** None

**Returns:**
- (string) - The name of the detected framework ('qb-core', 'qbx_core', 'es_extended')

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print('Using framework:', frameworkName)
```

### GetIsPlayerDead

<!--TOC: GetIsPlayerDead-->

**Context:** 🖥️ Client

Function GetIsPlayerDead

**Syntax:** `Bridge.Framework.GetIsPlayerDead()`

**Parameters:** None

**Returns:**
- (boolean) - Whether the player is dead/downed

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.GetIsPlayerDead() then
    print('Player is down or dead')
end
```

### GetItemInfo

<!--TOC: GetItemInfo-->

**Context:** 🖥️ Client

Function GetItemInfo

**Syntax:** `Bridge.Framework.GetItemInfo(item)`

**Parameters:**
- `item` (string) - Item name

**Returns:**
- (table) - Item information (name, label, weight, etc.)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local itemInfo = Bridge.Framework.GetItemInfo('phone')
print('Item label:', itemInfo.label)
print('Item weight:', itemInfo.weight)
```

### GetPlayerData

<!--TOC: GetPlayerData-->

**Context:** 🖥️ Client

Function GetPlayerData

**Syntax:** `Bridge.Framework.GetPlayerData()`

**Parameters:** None

**Returns:**
- (table) - Player data in framework's native format

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local playerData = Bridge.Framework.GetPlayerData()
print('Player name:', playerData.charinfo.firstname)
```

### GetPlayerDob

<!--TOC: GetPlayerDob-->

**Context:** 🖥️ Client

Function GetPlayerDob

**Syntax:** `Bridge.Framework.GetPlayerDob()`

**Parameters:** None

**Returns:**
- (string) - Player's date of birth

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local dob = Bridge.Framework.GetPlayerDob()
print('Player DOB:', dob)
```

### GetPlayerIdentifier

<!--TOC: GetPlayerIdentifier-->

**Context:** 🖥️ Client

Function GetPlayerIdentifier

**Syntax:** `Bridge.Framework.GetPlayerIdentifier()`

**Parameters:** None

**Returns:**
- (string) - Player's unique identifier (citizenid/identifier)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local identifier = Bridge.Framework.GetPlayerIdentifier()
print('Player ID:', identifier)
```

### GetPlayerInventory

<!--TOC: GetPlayerInventory-->

**Context:** 🖥️ Client

Function GetPlayerInventory

**Syntax:** `Bridge.Framework.GetPlayerInventory()`

**Parameters:** None

**Returns:**
- (table) - Player's inventory in standardized format

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local inventory = Bridge.Framework.GetPlayerInventory()
for _, item in pairs(inventory) do
    print('Item:', item.name, 'Count:', item.count)
end
```

### GetPlayerJob

<!--TOC: GetPlayerJob-->

**Context:** 🖥️ Client

Function GetPlayerJob

**Syntax:** `Bridge.Framework.GetPlayerJob()`

**Parameters:** None

**Returns:**
- (string, string, string, number) - Job name, label, grade name, grade level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobName, jobLabel, gradeName, gradeLevel = Bridge.Framework.GetPlayerJob()
print('Job:', jobName, jobLabel)
```

### GetPlayerJobData

<!--TOC: GetPlayerJobData-->

**Context:** 🖥️ Client

Function GetPlayerJobData

**Syntax:** `Bridge.Framework.GetPlayerJobData()`

**Parameters:** None

**Returns:**
- (table) - Complete job information object

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobData = Bridge.Framework.GetPlayerJobData()
print('Job:', jobData.jobName)
print('On duty:', jobData.onDuty)
print('Is boss:', jobData.boss)
```

### GetPlayerMetaData

<!--TOC: GetPlayerMetaData-->

**Context:** 🖥️ Client

Function GetPlayerMetaData

**Syntax:** `Bridge.Framework.GetPlayerMetaData(metadata)`

**Parameters:**
- `metadata` (string|table) - Metadata key to retrieve

**Returns:**
- (any) - The metadata value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local stress = Bridge.Framework.GetPlayerMetaData('stress')
print('Player stress level:', stress)
```

### GetPlayerName

<!--TOC: GetPlayerName-->

**Context:** 🖥️ Client

Function GetPlayerName

**Syntax:** `Bridge.Framework.GetPlayerName()`

**Parameters:** None

**Returns:**
- (string, string) - First name, Last name

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local firstName, lastName = Bridge.Framework.GetPlayerName()
print('Player name:', firstName, lastName)
```

### GetVehicleProperties

<!--TOC: GetVehicleProperties-->

**Context:** 🖥️ Client

Function GetVehicleProperties

**Syntax:** `Bridge.Framework.GetVehicleProperties(vehicle)`

**Parameters:**
- `vehicle` (number) - Vehicle entity handle

**Returns:**
- (table) - Vehicle properties data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
local props = Bridge.Framework.GetVehicleProperties(vehicle)
print('Plate:', props.plate)
```

### HasItem

<!--TOC: HasItem-->

**Context:** 🖥️ Client

Function HasItem

**Syntax:** `Bridge.Framework.HasItem(item)`

**Parameters:**
- `item` (string) - Item name to check

**Returns:**
- (boolean) - Whether player has the item

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.HasItem('phone') then
    print('Player has a phone')
end
```

### HideHelpText

<!--TOC: HideHelpText-->

**Context:** 🖥️ Client

Function HideHelpText

**Syntax:** `Bridge.Framework.HideHelpText()`

**Parameters:** None

**Returns:**
- (nil) - No description provided

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.HideHelpText()
```

### Notify

<!--TOC: Notify-->

**Context:** 🖥️ Client

Function Notify

**Syntax:** `Bridge.Framework.Notify(message, type, time)`

**Parameters:**
- `message` (string) - Notification message
- `type` (string) - Notification type
- `time` (number) - Display duration

**Returns:**
- (nil) - No description provided

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.Notify('Hello World!', 'success', 5000)
```

### SetVehicleProperties

<!--TOC: SetVehicleProperties-->

**Context:** 🖥️ Client

Function SetVehicleProperties

**Syntax:** `Bridge.Framework.SetVehicleProperties(vehicle, properties)`

**Parameters:**
- `vehicle` (number) - Vehicle entity handle
- `properties` (table) - Properties to apply

**Returns:**
- (boolean) - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
local props = { plate = 'BRIDGE1' }
Bridge.Framework.SetVehicleProperties(vehicle, props)
```

### ShowHelpText

<!--TOC: ShowHelpText-->

**Context:** 🖥️ Client

Function ShowHelpText

**Syntax:** `Bridge.Framework.ShowHelpText(message, position)`

**Parameters:**
- `message` (string) - Help text message
- `position` (string) - Text position

**Returns:**
- (nil) - No description provided

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.ShowHelpText('Press E to interact', 'top-center')
```

### GetItemCount

<!--TOC: GetItemCount-->

**Context:** 🖥️ Client

This will return the item count for the specified item in the players inventory.

**Syntax:** `Bridge.Framework.GetItemCount(item)`

**Parameters:**
- `item` (string)

**Returns:**
- (number)

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Framework.GetItemCount()
```

## Server Functions

### AddHunger

<!--TOC: AddHunger-->

**Context:** 🖲️ Server

Function AddHunger

**Syntax:** `Bridge.Framework.AddHunger(src, value)`

**Parameters:**
- `src` (number) - Player source ID
- `value` (number) - Hunger amount to add

**Returns:**
- (number|nil) - New hunger level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newHunger = Bridge.Framework.AddHunger(source, 20)
print('New hunger level:', newHunger)
```

### AddItem

<!--TOC: AddItem-->

**Context:** 🖲️ Server

Function AddItem

**Syntax:** `Bridge.Framework.AddItem(src, item, amount, slot, metadata)`

**Parameters:**
- `src` (number) - Player source ID
- `item` (string) - Item name
- `amount` (number) - Item quantity
- `slot` (number) - Optional specific slot
- `metadata` (table) - Optional item metadata

**Returns:**
- (boolean|nil) - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local success = Bridge.Framework.AddItem(source, 'phone', 1)
print('Item added:', success)
```

### AddStress

<!--TOC: AddStress-->

**Context:** 🖲️ Server

Function AddStress

**Syntax:** `Bridge.Framework.AddStress(src, value)`

**Parameters:**
- `src` (number) - Player source ID
- `value` (number) - Stress amount to add

**Returns:**
- (number|nil) - New stress level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newStress = Bridge.Framework.AddStress(source, 10)
print('New stress level:', newStress)
```

### AddThirst

<!--TOC: AddThirst-->

**Context:** 🖲️ Server

Function AddThirst

**Syntax:** `Bridge.Framework.AddThirst(src, value)`

**Parameters:**
- `src` (number) - Player source ID
- `value` (number) - Thirst amount to add

**Returns:**
- (number|nil) - New thirst level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newThirst = Bridge.Framework.AddThirst(source, 25)
print('New thirst level:', newThirst)
```

### GetFrameworkJobs

<!--TOC: GetFrameworkJobs-->

**Context:** 🖲️ Server

Function GetFrameworkJobs

**Syntax:** `Bridge.Framework.GetFrameworkJobs()`

**Parameters:** None

**Returns:**
- (table) - Array of all framework jobs

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobs = Bridge.Framework.GetFrameworkJobs()
print('Total jobs:', #jobs)
```

### GetFrameworkName

<!--TOC: GetFrameworkName-->

**Context:** 🖲️ Server

Function GetFrameworkName

**Syntax:** `Bridge.Framework.GetFrameworkName()`

**Parameters:** None

**Returns:**
- (string) - The name of the detected framework

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local frameworkName = Bridge.Framework.GetFrameworkName()
print('Server using:', frameworkName)
```

### GetHunger

<!--TOC: GetHunger-->

**Context:** 🖲️ Server

Function GetHunger

**Syntax:** `Bridge.Framework.GetHunger(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (number|nil) - Current hunger level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local hunger = Bridge.Framework.GetHunger(source)
print('Player hunger:', hunger)
```

### GetIsFrameworkAdmin

<!--TOC: GetIsFrameworkAdmin-->

**Context:** 🖲️ Server

Function GetIsFrameworkAdmin

**Syntax:** `Bridge.Framework.GetIsFrameworkAdmin(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (boolean) - Whether the player is an admin

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.GetIsFrameworkAdmin(source) then
    print('Player is an admin')
end
```

### GetIsPlayerDead

<!--TOC: GetIsPlayerDead-->

**Context:** 🖲️ Server

Function GetIsPlayerDead

**Syntax:** `Bridge.Framework.GetIsPlayerDead(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (boolean|nil) - Whether the player is dead/downed

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
if Bridge.Framework.GetIsPlayerDead(source) then
    print('Player is down')
end
```

### GetItem

<!--TOC: GetItem-->

**Context:** 🖲️ Server

Function GetItem

**Syntax:** `Bridge.Framework.GetItem(src, item, metadata)`

**Parameters:**
- `src` (number) - Player source ID
- `item` (string) - Item name
- `metadata` (table) - Optional metadata filter

**Returns:**
- (table|nil) - Item data if found

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local phoneItem = Bridge.Framework.GetItem(source, 'phone')
if phoneItem then
    print('Player has phone with count:', phoneItem.count)
end
```

### GetItemBySlot

<!--TOC: GetItemBySlot-->

**Context:** 🖲️ Server

Function GetItemBySlot

**Syntax:** `Bridge.Framework.GetItemBySlot(src, slot)`

**Parameters:**
- `src` (number) - Player source ID
- `slot` (number) - Inventory slot number

**Returns:**
- (table|nil) - Item in the specified slot

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local item = Bridge.Framework.GetItemBySlot(source, 1)
if item then
    print('Slot 1 contains:', item.name)
end
```

### GetOwnedVehicles

<!--TOC: GetOwnedVehicles-->

**Context:** 🖲️ Server

Function GetOwnedVehicles

**Syntax:** `Bridge.Framework.GetOwnedVehicles(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (table) - Array of owned vehicles with vehicle and plate

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local vehicles = Bridge.Framework.GetOwnedVehicles(source)
for _, vehicle in pairs(vehicles) do
    print('Vehicle:', vehicle.vehicle, 'Plate:', vehicle.plate)
end
```

### GetPlayer

<!--TOC: GetPlayer-->

**Context:** 🖲️ Server

Function GetPlayer

**Syntax:** `Bridge.Framework.GetPlayer(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (table|nil) - Player object in framework's native format

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local player = Bridge.Framework.GetPlayer(source)
if player then
    print('Found player data')
end
```

### GetPlayerDob

<!--TOC: GetPlayerDob-->

**Context:** 🖲️ Server

Function GetPlayerDob

**Syntax:** `Bridge.Framework.GetPlayerDob(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (string|nil) - Player's date of birth

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local dob = Bridge.Framework.GetPlayerDob(source)
print('DOB:', dob)
```

### GetPlayerDuty

<!--TOC: GetPlayerDuty-->

**Context:** 🖲️ Server

Function GetPlayerDuty

**Syntax:** `Bridge.Framework.GetPlayerDuty(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (boolean|nil) - Whether the player is on duty

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local onDuty = Bridge.Framework.GetPlayerDuty(source)
print('On duty:', onDuty)
```

### GetPlayerGang

<!--TOC: GetPlayerGang-->

**Context:** 🖲️ Server

Function GetPlayerGang

**Syntax:** `Bridge.Framework.GetPlayerGang(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (string|nil) - Player's gang name

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local gang = Bridge.Framework.GetPlayerGang(source)
print('Player gang:', gang)
```

### GetPlayerIdentifier

<!--TOC: GetPlayerIdentifier-->

**Context:** 🖲️ Server

Function GetPlayerIdentifier

**Syntax:** `Bridge.Framework.GetPlayerIdentifier(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (string|nil) - Player's unique identifier

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local identifier = Bridge.Framework.GetPlayerIdentifier(source)
print('Player ID:', identifier)
```

### GetPlayerInventory

<!--TOC: GetPlayerInventory-->

**Context:** 🖲️ Server

Function GetPlayerInventory

**Syntax:** `Bridge.Framework.GetPlayerInventory(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (table|nil) - Player's complete inventory

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local inventory = Bridge.Framework.GetPlayerInventory(source)
for _, item in pairs(inventory) do
    print('Item:', item.name, 'Count:', item.count)
end
```

### GetPlayerJob

<!--TOC: GetPlayerJob-->

**Context:** 🖲️ Server

Function GetPlayerJob

**Syntax:** `Bridge.Framework.GetPlayerJob(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (string, string, string, number) - Job name, label, grade name, grade level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobName, jobLabel, gradeName, gradeLevel = Bridge.Framework.GetPlayerJob(source)
print('Job:', jobName)
```

### GetPlayerJobData

<!--TOC: GetPlayerJobData-->

**Context:** 🖲️ Server

Function GetPlayerJobData

**Syntax:** `Bridge.Framework.GetPlayerJobData(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (table|nil) - Complete job information object

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local jobData = Bridge.Framework.GetPlayerJobData(source)
if jobData then
    print('Job:', jobData.jobName)
    print('On duty:', jobData.onDuty)
end
```

### GetPlayerMetadata

<!--TOC: GetPlayerMetadata-->

**Context:** 🖲️ Server

Function GetPlayerMetadata

**Syntax:** `Bridge.Framework.GetPlayerMetadata(src, metadata)`

**Parameters:**
- `src` (number) - Player source ID
- `metadata` (string) - Metadata key

**Returns:**
- (any|nil) - Metadata value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local stress = Bridge.Framework.GetPlayerMetadata(source, 'stress')
print('Player stress:', stress)
```

### GetPlayerName

<!--TOC: GetPlayerName-->

**Context:** 🖲️ Server

Function GetPlayerName

**Syntax:** `Bridge.Framework.GetPlayerName(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (string|nil, string|nil) - First name, Last name

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local firstName, lastName = Bridge.Framework.GetPlayerName(source)
print('Player:', firstName, lastName)
```

### GetPlayerPhone

<!--TOC: GetPlayerPhone-->

**Context:** 🖲️ Server

Function GetPlayerPhone

**Syntax:** `Bridge.Framework.GetPlayerPhone(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (string|nil) - Player's phone number

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local phone = Bridge.Framework.GetPlayerPhone(source)
print('Player phone:', phone)
```

### GetPlayers

<!--TOC: GetPlayers-->

**Context:** 🖲️ Server

Function GetPlayers

**Syntax:** `Bridge.Framework.GetPlayers()`

**Parameters:** None

**Returns:**
- (table) - Array of all online player source IDs

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local players = Bridge.Framework.GetPlayers()
print('Online players:', #players)
```

### GetPlayersByJob

<!--TOC: GetPlayersByJob-->

**Context:** 🖲️ Server

Function GetPlayersByJob

**Syntax:** `Bridge.Framework.GetPlayersByJob(job)`

**Parameters:**
- `job` (string) - Job name to filter by

**Returns:**
- (table) - Array of player source IDs with the job

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local police = Bridge.Framework.GetPlayersByJob('police')
print('Police online:', #police)
```

### GetThirst

<!--TOC: GetThirst-->

**Context:** 🖲️ Server

Function GetThirst

**Syntax:** `Bridge.Framework.GetThirst(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (number|nil) - Current thirst level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local thirst = Bridge.Framework.GetThirst(source)
print('Player thirst:', thirst)
```

### RegisterUsableItem

<!--TOC: RegisterUsableItem-->

**Context:** 🖲️ Server

Function RegisterUsableItem

**Syntax:** `Bridge.Framework.RegisterUsableItem(itemName, callback)`

**Parameters:**
- `itemName` (string) - Item name to register
- `callback` (function) - Function to call when item is used

**Returns:**
- (function|nil) - Registration result

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.RegisterUsableItem('phone', function(src, itemData)
    print('Player', src, 'used phone')
end)
```

### RemoveHunger

<!--TOC: RemoveHunger-->

**Context:** 🖲️ Server

Function RemoveHunger

**Syntax:** `Bridge.Framework.RemoveHunger(src, value)`

**Parameters:**
- `src` (number) - Player source ID
- `value` (number) - Hunger amount to remove

**Returns:**
- (number|nil) - New hunger level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newHunger = Bridge.Framework.RemoveHunger(source, 15)
print('Reduced hunger to:', newHunger)
```

### RemoveItem

<!--TOC: RemoveItem-->

**Context:** 🖲️ Server

Function RemoveItem

**Syntax:** `Bridge.Framework.RemoveItem(src, item, amount, slot, metadata)`

**Parameters:**
- `src` (number) - Player source ID
- `item` (string) - Item name
- `amount` (number) - Item quantity
- `slot` (number) - Optional specific slot
- `metadata` (table) - Optional metadata filter

**Returns:**
- (boolean|nil) - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local success = Bridge.Framework.RemoveItem(source, 'phone', 1)
print('Item removed:', success)
```

### RemoveStress

<!--TOC: RemoveStress-->

**Context:** 🖲️ Server

Function RemoveStress

**Syntax:** `Bridge.Framework.RemoveStress(src, value)`

**Parameters:**
- `src` (number) - Player source ID
- `value` (number) - Stress amount to remove

**Returns:**
- (number|nil) - New stress level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newStress = Bridge.Framework.RemoveStress(source, 5)
print('Reduced stress to:', newStress)
```

### RemoveThirst

<!--TOC: RemoveThirst-->

**Context:** 🖲️ Server

Function RemoveThirst

**Syntax:** `Bridge.Framework.RemoveThirst(src, value)`

**Parameters:**
- `src` (number) - Player source ID
- `value` (number) - Thirst amount to remove

**Returns:**
- (number|nil) - New thirst level

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local newThirst = Bridge.Framework.RemoveThirst(source, 10)
print('Reduced thirst to:', newThirst)
```

### RevivePlayer

<!--TOC: RevivePlayer-->

**Context:** 🖲️ Server

Function RevivePlayer

**Syntax:** `Bridge.Framework.RevivePlayer(src)`

**Parameters:**
- `src` (number) - Player source ID

**Returns:**
- (boolean) - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local success = Bridge.Framework.RevivePlayer(source)
print('Revive success:', success)
```

### SetMetadata

<!--TOC: SetMetadata-->

**Context:** 🖲️ Server

Function SetMetadata

**Syntax:** `Bridge.Framework.SetMetadata(src, item, slot, metadata)`

**Parameters:**
- `src` (number) - Player source ID
- `item` (string) - Item name
- `slot` (number) - Item slot
- `metadata` (table) - New metadata

**Returns:**
- (boolean|nil) - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local metadata = { quality = 100 }
Bridge.Framework.SetMetadata(source, 'phone', 1, metadata)
```

### SetPlayerDuty

<!--TOC: SetPlayerDuty-->

**Context:** 🖲️ Server

Function SetPlayerDuty

**Syntax:** `Bridge.Framework.SetPlayerDuty(src, status)`

**Parameters:**
- `src` (number) - Player source ID
- `status` (boolean) - Duty status to set

**Returns:**
- (nil) - No description provided

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetPlayerDuty(source, true)
```

### SetPlayerJob

<!--TOC: SetPlayerJob-->

**Context:** 🖲️ Server

Function SetPlayerJob

**Syntax:** `Bridge.Framework.SetPlayerJob(src, name, grade)`

**Parameters:**
- `src` (number) - Player source ID
- `name` (string) - Job name
- `grade` (string|number) - Job grade

**Returns:**
- (boolean|nil) - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetPlayerJob(source, 'police', '1')
```

### SetPlayerMetadata

<!--TOC: SetPlayerMetadata-->

**Context:** 🖲️ Server

Function SetPlayerMetadata

**Syntax:** `Bridge.Framework.SetPlayerMetadata(src, metadata, value)`

**Parameters:**
- `src` (number) - Player source ID
- `metadata` (string) - Metadata key
- `value` (any) - Value to set

**Returns:**
- (boolean|nil) - Success status

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.SetPlayerMetadata(source, 'stress', 50)
```

### AddAccountBalance

<!--TOC: AddAccountBalance-->

**Context:** 🖲️ Server

Adds the specified amount to the player's account balance of the specified type.

**Syntax:** `Bridge.Framework.AddAccountBalance(src, _type, amount)`

**Parameters:**
- `src` (number)
- `_type` (string)
- `amount` (number)

**Returns:**
- (boolean) - | nil

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Framework.AddAccountBalance()
```

### GetStatus

<!--TOC: GetStatus-->

**Context:** 🖲️ Server

Function GetStatus

**Syntax:** `Bridge.Framework.GetStatus(src, column)`

**Parameters:**
- `src` (any) - Parameter src
- `column` (any) - Parameter column

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Framework.GetStatus()
```

### GetAccountBalance

<!--TOC: GetAccountBalance-->

**Context:** 🖲️ Server

Returns the player's account balance of the specified type.

**Syntax:** `Bridge.Framework.GetAccountBalance(src, _type)`

**Parameters:**
- `src` (number)
- `_type` (string)

**Returns:**
- (number) - | nil

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Framework.GetAccountBalance()
```

### GetItemCount

<!--TOC: GetItemCount-->

**Context:** 🖲️ Server

Returns the count of items matching the specified name and if passed metadata from the player's inventory.

**Syntax:** `Bridge.Framework.GetItemCount(src, item, metadata)`

**Parameters:**
- `src` (number)
- `item` (string)
- `metadata` (table)

**Returns:**
- (number) - | nil

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Framework.GetItemCount()
```

### RemoveAccountBalance

<!--TOC: RemoveAccountBalance-->

**Context:** 🖲️ Server

Removes the specified amount from the player's account balance of the specified type.

**Syntax:** `Bridge.Framework.RemoveAccountBalance(src, _type, amount)`

**Parameters:**
- `src` (number)
- `_type` (string)
- `amount` (number)

**Returns:**
- (boolean) - | nil

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Framework.RemoveAccountBalance()
```

### GetItemInfo

<!--TOC: GetItemInfo-->

**Context:** 🖲️ Server

This will return a table with the item info, {name, label, stack, weight, description, image}

**Syntax:** `Bridge.Framework.GetItemInfo(item)`

**Parameters:**
- `item` (string)

**Returns:**
- (table)

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Framework.GetItemInfo()
```

### HasItem

<!--TOC: HasItem-->

**Context:** 🖲️ Server

Returns boolean if the player has the specified item in their inventory.

**Syntax:** `Bridge.Framework.HasItem(src, item)`

**Parameters:**
- `src` (number)
- `item` (string)

**Returns:**
- (boolean)

**Example:**
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Framework.HasItem()
```

