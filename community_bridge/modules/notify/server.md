---
layout: default
title: Server Functions
parent: Notify
grand_parent: Modules
nav_order: 1
---

# Notify Server Functions
{: .no_toc }

Server-side functions for sending notifications to players across different notification systems.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Basic Notifications

### SendNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.SendNotify(src, message, type, options)
```

Sends a notification to a specific player.

**Parameters:**
- `src` (number) - Player server ID
- `message` (string) - Notification message
- `type` (string) - Notification type ('success', 'error', 'warning', 'info')
- `options` (table, optional) - Additional notification options

**Returns:** 
- `boolean` - Success status

**Example:**
```lua
-- Basic notifications
Notify.SendNotify(playerId, "Welcome to the server!", "success")
Notify.SendNotify(playerId, "You don't have enough money!", "error")
Notify.SendNotify(playerId, "Your vehicle is low on fuel", "warning")
Notify.SendNotify(playerId, "Press E to interact", "info")

-- With custom options
Notify.SendNotify(playerId, "Processing payment...", "info", {
    duration = 5000,
    position = "top-right",
    icon = "fas fa-credit-card"
})
```

---

### SendNotifyAll
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.SendNotifyAll(message, type, options)
```

Sends a notification to all online players.

**Parameters:**
- `message` (string) - Notification message
- `type` (string) - Notification type
- `options` (table, optional) - Additional notification options

**Example:**
```lua
-- Server announcements
Notify.SendNotifyAll("Server restart in 10 minutes!", "warning")
Notify.SendNotifyAll("New update has been installed!", "success")

-- Event notifications
Notify.SendNotifyAll("Double XP weekend has started!", "info", {
    duration = 10000,
    icon = "fas fa-star"
})
```

---

### SendNotifyGroup
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.SendNotifyGroup(playerIds, message, type, options)
```

Sends a notification to a specific group of players.

**Parameters:**
- `playerIds` (table) - Array of player server IDs
- `message` (string) - Notification message
- `type` (string) - Notification type
- `options` (table, optional) - Additional notification options

**Example:**
```lua
-- Notify specific players
local policeOfficers = GetPlayersWithJob("police")
Notify.SendNotifyGroup(policeOfficers, "Bank robbery in progress!", "warning")

-- Notify players in range
local playersInRange = GetPlayersInRange(coords, 50.0)
Notify.SendNotifyGroup(playersInRange, "Explosion detected nearby!", "error")
```

---

## Advanced Notifications

### SendProgressNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.SendProgressNotify(src, id, message, progress, options)
```

Sends or updates a progress notification.

**Parameters:**
- `src` (number) - Player server ID
- `id` (string) - Unique progress notification ID
- `message` (string) - Progress message
- `progress` (number) - Progress percentage (0-100)
- `options` (table, optional) - Additional options

**Returns:** 
- `string` - Progress notification ID

**Example:**
```lua
-- Start a progress notification
local progressId = Notify.SendProgressNotify(playerId, "download", "Downloading files...", 0)

-- Update progress
for i = 1, 100 do
    Notify.SendProgressNotify(playerId, progressId, "Downloading: " .. i .. "%", i)
    Wait(50)
end

-- Complete progress
Notify.SendProgressNotify(playerId, progressId, "Download complete!", 100, {
    type = "success",
    autoClose = 3000
})
```

---

### SendRichNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.SendRichNotify(src, data)
```

Sends a rich notification with advanced formatting.

**Parameters:**
- `src` (number) - Player server ID
- `data` (table) - Rich notification data

**Example:**
```lua
Notify.SendRichNotify(playerId, {
    title = "Bank Transfer",
    message = "You received $50,000 from John Doe",
    type = "success",
    icon = "fas fa-money-bill-wave",
    image = "https://example.com/money.png",
    actions = {
        {
            label = "View Details",
            action = "bank:viewTransfer",
            data = {transferId = 12345}
        }
    },
    duration = 8000
})
```

---

## Job-Based Notifications

### SendJobNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.SendJobNotify(jobName, message, type, minGrade, options)
```

Sends a notification to all players with a specific job.

**Parameters:**
- `jobName` (string) - Job name
- `message` (string) - Notification message
- `type` (string) - Notification type
- `minGrade` (number, optional) - Minimum job grade required
- `options` (table, optional) - Additional options

**Example:**
```lua
-- Notify all police officers
Notify.SendJobNotify("police", "Backup requested at bank!", "warning")

-- Notify only high-ranking police
Notify.SendJobNotify("police", "New investigation assigned", "info", 3)

-- Notify medical staff
Notify.SendJobNotify("ambulance", "Mass casualty event reported", "error", 0, {
    sound = "emergency_alert"
})
```

---

### SendGangNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.SendGangNotify(gangName, message, type, options)
```

Sends a notification to all members of a specific gang.

**Parameters:**
- `gangName` (string) - Gang name
- `message` (string) - Notification message  
- `type` (string) - Notification type
- `options` (table, optional) - Additional options

**Example:**
```lua
Notify.SendGangNotify("ballas", "Territory under attack!", "warning")
Notify.SendGangNotify("families", "Gang meeting at the hideout", "info")
```

---

## Conditional Notifications

### SendConditionalNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.SendConditionalNotify(condition, playerIds, message, type, options)
```

Sends notifications based on conditional logic.

**Parameters:**
- `condition` (function) - Function that returns true/false for each player
- `playerIds` (table) - Array of player IDs to check
- `message` (string|function) - Message or function returning message
- `type` (string) - Notification type
- `options` (table, optional) - Additional options

**Example:**
```lua
-- Notify players with low health
Notify.SendConditionalNotify(
    function(playerId)
        local health = GetEntityHealth(GetPlayerPed(playerId))
        return health < 50
    end,
    GetPlayers(),
    "Your health is low! Find medical assistance.",
    "warning"
)

-- Dynamic messages based on player data
Notify.SendConditionalNotify(
    function(playerId)
        return Framework.GetMoney(playerId) > 1000000
    end,
    GetPlayers(),
    function(playerId)
        local money = Framework.GetMoney(playerId)
        return "You have " .. Framework.FormatMoney(money) .. "!"
    end,
    "success"
)
```

---

## Notification Management

### ClearNotifications
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.ClearNotifications(src, type)
```

Clears all notifications for a player.

**Parameters:**
- `src` (number) - Player server ID
- `type` (string, optional) - Specific notification type to clear

**Example:**
```lua
-- Clear all notifications
Notify.ClearNotifications(playerId)

-- Clear only error notifications
Notify.ClearNotifications(playerId, "error")
```

---

### SetNotificationSettings
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Notify.SetNotificationSettings(src, settings)
```

Updates notification settings for a player.

**Parameters:**
- `src` (number) - Player server ID
- `settings` (table) - Notification settings

**Example:**
```lua
-- Customize player notification preferences
Notify.SetNotificationSettings(playerId, {
    position = "bottom-right",
    duration = 6000,
    soundEnabled = false,
    maxNotifications = 5
})
```

---

## Event Integration

### Event Handlers
```lua
-- Handle framework money changes
RegisterNetEvent('framework:moneyChanged')
AddEventHandler('framework:moneyChanged', function(playerId, newAmount, oldAmount, reason)
    local difference = newAmount - oldAmount
    
    if difference > 0 then
        Notify.SendNotify(playerId, 
            "+" .. Framework.FormatMoney(difference) .. " (" .. reason .. ")", 
            "success")
    elseif difference < 0 then
        Notify.SendNotify(playerId, 
            Framework.FormatMoney(difference) .. " (" .. reason .. ")", 
            "error")
    end
end)

-- Handle inventory changes
RegisterNetEvent('inventory:itemAdded')
AddEventHandler('inventory:itemAdded', function(playerId, item, count)
    local itemInfo = Inventory.GetItemInfo(item)
    if itemInfo then
        Notify.SendNotify(playerId, 
            "+" .. count .. "x " .. itemInfo.label, 
            "success")
    end
end)
```

---

## Best Practices

### Rate Limiting
```lua
local notificationLimits = {}

local function CanSendNotification(playerId)
    local now = GetGameTimer()
    local playerLimit = notificationLimits[playerId]
    
    if not playerLimit then
        notificationLimits[playerId] = {count = 0, resetTime = now + 10000}
        return true
    end
    
    if now > playerLimit.resetTime then
        notificationLimits[playerId] = {count = 0, resetTime = now + 10000}
        return true
    end
    
    if playerLimit.count < 10 then -- Max 10 notifications per 10 seconds
        notificationLimits[playerId].count = playerLimit.count + 1
        return true
    end
    
    return false
end
```

### Smart Grouping
```lua
-- Group similar notifications to avoid spam
local function SendSmartNotify(playerId, message, type)
    local lastNotify = GetLastNotification(playerId)
    
    if lastNotify and lastNotify.type == type and 
       (GetGameTimer() - lastNotify.time) < 2000 then
        -- Update existing notification instead of creating new one
        Notify.UpdateNotification(lastNotify.id, message)
    else
        Notify.SendNotify(playerId, message, type)
    end
end
```

### Localization Support
```lua
-- Use localized messages
local function SendLocalizedNotify(playerId, key, type, args)
    local playerLang = Framework.GetPlayerLanguage(playerId)
    local message = Locales.Get(playerLang, key, args)
    Notify.SendNotify(playerId, message, type)
end

-- Usage
SendLocalizedNotify(playerId, "money_received", "success", {amount = 1000})
```
