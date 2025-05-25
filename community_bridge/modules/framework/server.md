---
layout: default
title: Server Functions
parent: Framework
grand_parent: Modules
nav_order: 1
---

# Framework Server Functions
{: .no_toc }

Server-side functions for player management, economy operations, and framework integration.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Player Management

### GetIdentifier
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Framework.GetIdentifier(src)
```

Returns the unique identifier for a player.

**Parameters:**
- `src` (number) - Player server ID

**Returns:** 
- `string` - Player's unique identifier

**Example:**
```lua
local playerId = source
local identifier = Framework.GetIdentifier(playerId)
print("Player identifier: " .. identifier)
```

---

### GetName
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Framework.GetName(src)
```

Returns the player's display name.

**Parameters:**
- `src` (number) - Player server ID

**Returns:** 
- `string` - Player's display name

**Example:**
```lua
local playerId = source
local playerName = Framework.GetName(playerId)
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
Framework.GetSourceFromIdentifier(identifier)
```

Returns the player source from an identifier.

**Parameters:**
- `identifier` (string) - Player's unique identifier

**Returns:** 
- `number|nil` - Player server ID or nil if not found

**Example:**
```lua
local identifier = "steam:110000103fa6de1"
local playerId = Framework.GetSourceFromIdentifier(identifier)
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
Framework.GetMoney(src)
```

Returns the player's current money amount.

**Parameters:**
- `src` (number) - Player server ID

**Returns:** 
- `number` - Player's current money

**Example:**
```lua
local playerId = source
local money = Framework.GetMoney(playerId)
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
Framework.AddMoney(src, amount)
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
local success = Framework.AddMoney(playerId, 1000)
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
Framework.RemoveMoney(src, amount)
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
if Framework.RemoveMoney(playerId, cost) then
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
Framework.GetJob(src)
```

Returns the player's current job information.

**Parameters:**
- `src` (number) - Player server ID

**Returns:** 
- `table` - Job data containing name, label, grade, and grade_label

**Example:**
```lua
local playerId = source
local job = Framework.GetJob(playerId)
print("Player job: " .. job.name .. " (Grade: " .. job.grade .. ")")
```

---

### SetJob
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Framework.SetJob(src, job, grade)
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
local success = Framework.SetJob(playerId, "police", 2)
if success then
    TriggerClientEvent('framework:notify', playerId, "Job updated to Police Officer!", "success")
end
```

---

## Best Practices

### Error Handling
Always check return values for nil or false to handle cases where operations fail:

```lua
local money = Framework.GetMoney(playerId)
if money then
    -- Safe to use money value
else
    print("Error: Could not retrieve player money")
end
```

### Performance Considerations
Cache frequently accessed data to reduce database queries:

```lua
local playerData = {}
playerData.identifier = Framework.GetIdentifier(playerId)
playerData.money = Framework.GetMoney(playerId)
playerData.job = Framework.GetJob(playerId)
```
