---
layout: default
title: Server Functions
parent: Notify
grand_parent: Modules
nav_order: 1
---

# Notify Server Functions
{: .no_toc }

Server-side functions for sending notifications to players.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Available Functions

---

## 🔹 SendNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
Bridge.Notify.SendNotify(src, message, _type, time)
```

Sends a notification to a specific player.

**Parameters:**
- `src` (number) - Player server ID
- `message` (string) - Notification message
- `_type` (string, optional) - Notification type
- `time` (number, optional) - Display duration in milliseconds

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Basic notification
Bridge.Notify.SendNotify(playerId, "Welcome to the server!")

-- Notification with type and time
Bridge.Notify.SendNotify(playerId, "You don't have enough money!", "error", 5000)
```

---

## 📚 Deprecated Functions

{: .label .label-red }
**Note:** The following functions are deprecated. Use the [HelpText module](../../helptext/) instead.

---

## 🔹 ShowHelpText (Deprecated)
```lua
Bridge.Notify.ShowHelpText(src, message, position)
```

---

## 🔹 HideHelpText (Deprecated)
```lua
Bridge.Notify.HideHelpText(src)
```

---

## Supported Notification Systems

The community_bridge automatically detects and uses available notification systems:

- **ox_lib** - Modern notification system
- **mythic_notify** - Popular notification resource
- **okokNotify** - Advanced notification system
- **pNotify** - Classic notification system
- **r_notify** - Simple notification system
- **t-notify** - Themed notifications
- **wasabi_notify** - Feature-rich notifications

If no supported system is found, falls back to framework default notifications.
Bridge.Notify.SendNotify(playerId, "Press E to interact", "info")

-- With custom options
Bridge.Notify.SendNotify(playerId, "Processing payment...", "info", {
    duration = 5000,
    position = "top-right",
    icon = "fas fa-credit-card"
})
```

---

## 🔹 SendNotifyAll
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendNotifyAll(message, type, options)
```

Sends a notification to all online players.

**Parameters:**
- `message` (string) - Notification message
- `type` (string) - Notification type
- `options` (table, optional) - Additional notification options

**Example:**
```lua
-- Server announcements
Bridge.Notify.SendNotifyAll("Server restart in 10 minutes!", "warning")
Bridge.Notify.SendNotifyAll("New update has been installed!", "success")

-- Event notifications
Bridge.Notify.SendNotifyAll("Double XP weekend has started!", "info", {
    duration = 10000,
    icon = "fas fa-star"
})
```

---

## 🔹 SendNotifyGroup
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendNotifyGroup(playerIds, message, type, options)
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
Bridge.Notify.SendNotifyGroup(policeOfficers, "Bank robbery in progress!", "warning")

-- Notify players in range
local playersInRange = GetPlayersInRange(coords, 50.0)
Bridge.Notify.SendNotifyGroup(playersInRange, "Explosion detected nearby!", "error")
```

---

## 📚 Advanced Notifications

---

## 🔹 SendProgressNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendProgressNotify(src, id, message, progress, options)
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
local progressId = Bridge.Notify.SendProgressNotify(playerId, "download", "Downloading files...", 0)

-- Update progress
for i = 1, 100 do
    Bridge.Notify.SendProgressNotify(playerId, progressId, "Downloading: " .. i .. "%", i)
    Wait(50)
end

-- Complete progress
Bridge.Notify.SendProgressNotify(playerId, progressId, "Download complete!", 100, {
    type = "success",
    autoClose = 3000
})
```

---

## 🔹 SendRichNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendRichNotify(src, data)
```

Sends a rich notification with advanced formatting.

**Parameters:**
- `src` (number) - Player server ID
- `data` (table) - Rich notification data

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendRichNotify(playerId, {
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

---

## 🔹 SendJobNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendJobNotify(jobName, message, type, minGrade, options)
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
Bridge.Notify.SendJobNotify("police", "Backup requested at bank!", "warning")

-- Notify only high-ranking police
Bridge.Notify.SendJobNotify("police", "New investigation assigned", "info", 3)

-- Notify medical staff
Bridge.Notify.SendJobNotify("ambulance", "Mass casualty event reported", "error", 0, {
    sound = "emergency_alert"
})
```

---

---

## 🔹 SendGangNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendGangNotify(gangName, message, type, options)
```

Sends a notification to all members of a specific gang.

**Parameters:**
- `gangName` (string) - Gang name
- `message` (string) - Notification message  
- `type` (string) - Notification type
- `options` (table, optional) - Additional options

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendGangNotify("ballas", "Territory under attack!", "warning")
Bridge.Notify.SendGangNotify("families", "Gang meeting at the hideout", "info")
```

---

## Conditional Notifications

---

## 🔹 SendConditionalNotify
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendConditionalNotify(condition, playerIds, message, type, options)
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
Bridge.Notify.SendConditionalNotify(
    function(playerId)
        local health = GetEntityHealth(GetPlayerPed(playerId))
        return health < 50
    end,
    GetPlayers(),
    "Your health is low! Find medical assistance.",
    "warning"
)

-- Dynamic messages based on player data
Bridge.Notify.SendConditionalNotify(
    function(playerId)
        return Bridge.Framework.GetMoney(playerId) > 1000000
    end,
    GetPlayers(),
    function(playerId)
        local money = Bridge.Framework.GetMoney(playerId)
        return "You have " .. Bridge.Framework.FormatMoney(money) .. "!"
    end,
    "success"
)
```

---

## Notification Management

---

## 🔹 ClearNotifications
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.ClearNotifications(src, type)
```

Clears all notifications for a player.

**Parameters:**
- `src` (number) - Player server ID
- `type` (string, optional) - Specific notification type to clear

**Example:**
```lua
-- Clear all notifications
Bridge.Notify.ClearNotifications(playerId)

-- Clear only error notifications
Bridge.Notify.ClearNotifications(playerId, "error")
```

---

---

## 🔹 SetNotificationSettings
{: .d-inline-block }
Server
{: .label .label-purple }

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SetNotificationSettings(src, settings)
```

Updates notification settings for a player.

**Parameters:**
- `src` (number) - Player server ID
- `settings` (table) - Notification settings

**Example:**
```lua
-- Customize player notification preferences
Bridge.Notify.SetNotificationSettings(playerId, {
    position = "bottom-right",
    duration = 6000,
    soundEnabled = false,
    maxNotifications = 5
})
```

---

## Event Integration

---

## 📚 Event Handlers
```lua
-- Handle framework money changes
RegisterNetEvent('framework:moneyChanged')
AddEventHandler('framework:moneyChanged', function(playerId, newAmount, oldAmount, reason)
    local difference = newAmount - oldAmount
      if difference > 0 then
        Bridge.Notify.SendNotify(playerId, 
            "+" .. Bridge.Framework.FormatMoney(difference) .. " (" .. reason .. ")", 
            "success")
    elseif difference < 0 then
        Bridge.Notify.SendNotify(playerId, 
            Bridge.Framework.FormatMoney(difference) .. " (" .. reason .. ")", 
            "error")
    end
end)

-- Handle inventory changes
RegisterNetEvent('inventory:itemAdded')
AddEventHandler('inventory:itemAdded', function(playerId, item, count)
    local itemInfo = Bridge.Inventory.GetItemInfo(item)
    if itemInfo then
        Bridge.Notify.SendNotify(playerId, 
            "+" .. count .. "x " .. itemInfo.label, 
            "success")
    end
end)
```

---

## Best Practices

---

## 📚 Rate Limiting
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

---

## 📚 Smart Grouping
```lua
-- Group similar notifications to avoid spam
local function SendSmartNotify(playerId, message, type)
    local lastNotify = GetLastNotification(playerId)
    
    if lastNotify and lastBridge.Notify.type == type and 
       (GetGameTimer() - lastBridge.Notify.time) < 2000 then
        -- Update existing notification instead of creating new one
        Bridge.Notify.UpdateNotification(lastBridge.Notify.id, message)
    else
        Bridge.Notify.SendNotify(playerId, message, type)
    end
end
```

---

## 📚 Localization Support
```lua
-- Use localized messages
local function SendLocalizedNotify(playerId, key, type, args)    local playerLang = Bridge.Framework.GetPlayerLanguage(playerId)
    local message = Bridge.Locales.Get(playerLang, key, args)
    Bridge.Notify.SendNotify(playerId, message, type)
end

-- Usage
SendLocalizedNotify(playerId, "money_received", "success", {amount = 1000})
```
