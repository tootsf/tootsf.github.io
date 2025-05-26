---
layout: default
title: Notify
parent: Modules
grand_parent: Community Bridge
nav_order: 16
has_children: true
permalink: /community_bridge/modules/notify/
---

# Notify Module
{: .no_toc }

The Notify module provides a unified API for sending notifications to players across different notification systems.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

This module standardizes notification delivery across various notification resources, ensuring consistent user experience regardless of which notification system your server uses.

---

## 📚 Supported Notification Systems

- **ox_lib** - Modern notification system with rich formatting
- **qb-core** - QBCore's built-in notification system
- **esx_notify** - ESX notification integration
- **mythic_notify** - Mythic notification compatibility
- **Custom Systems** - Extensible for custom notification implementations

---

## 📚 Key Features

- **Multiple Types** - Success, error, warning, info, and custom types
- **Rich Formatting** - Support for colors, icons, and positioning
- **Duration Control** - Customizable display duration
- **Progress Notifications** - Long-running operation updates
- **Sound Integration** - Optional sound effects

---

## 📚 Quick Start

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Server-side example
local playerId = source

-- Basic notification
Bridge.Notify.SendNotify(playerId, "Welcome to the server!", "success")

-- Error notification
Bridge.Notify.SendNotify(playerId, "You don't have enough money!", "error")

-- Custom notification with options
Bridge.Notify.SendNotify(playerId, "Processing request...", "info", {
    duration = 5000,
    position = "top",
    icon = "fas fa-spinner fa-spin"
})
```

## Notification Types

### Standard Types
- `success` - Green notifications for positive actions
- `error` - Red notifications for errors and failures  
- `warning` - Yellow/orange notifications for warnings
- `info` - Blue notifications for information
- `default` - Standard neutral notifications

### Custom Styling
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Notify.SendNotify(playerId, "Custom message", "custom", {
    color = "#FF6B6B",
    backgroundColor = "#2C3E50",
    icon = "fas fa-crown"
})
```

## Module Structure

This module is organized into three main categories:

- **[Server Functions](server/)** - Server-side notification sending
- **[Client Functions](client/)** - Client-side notification display and management
- **[Shared Functions](shared/)** - Utility functions and constants

---

## Configuration

Configure default notification behavior:

```lua
-- In your resource config
Bridge.Notify.SetDefaults({
    duration = 4000,
    position = "top-right",
    showIcon = true,
    playSound = true
})
```

## Advanced Features

### Progress Notifications
```lua
-- Start a progress notification
local notifyId = Bridge.Notify.ShowProgress(playerId, "Downloading files...", 0)

-- Update progress
for i = 1, 100 do
    Bridge.Notify.UpdateProgress(notifyId, i, "Downloading: " .. i .. "%")
    Wait(50)
end

-- Complete the progress
Bridge.Notify.CompleteProgress(notifyId, "Download complete!", "success")
```

### Grouped Notifications
```lua
-- Group related notifications
Bridge.Notify.SendGrouped(playerId, "inventory", {
    {message = "Added 5x Water", type = "success"},
    {message = "Added 3x Bread", type = "success"},
    {message = "Inventory limit reached", type = "warning"}
})
```
