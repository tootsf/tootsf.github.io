---
layout: default
title: "🚨 Dispatch"
parent: Modules
grand_parent: Community Bridge
nav_order: 3
has_children: true
permalink: /community_bridge/modules/dispatch/
---

# Dispatch Module
{: .no_toc }

The dispatch module provides emergency services dispatch functionality with support for multiple dispatch systems.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Available Functions

### Client Functions
- [View all client functions](client/functions/) - Complete list of client-side dispatch functions

### Server Functions
- [View all server functions](server/functions/) - Complete list of server-side dispatch functions

### Shared Functions
- [View all shared functions](shared/functions/) - Complete list of shared dispatch functions

---

## 📚 Supported Dispatch Systems

The module automatically detects and integrates with the following dispatch systems:
- ps-dispatch
- cd_dispatch
- bub-mdt
- qs_dispatch
- linden_outlawalert
- tk_dispatch
- lb-tablet
- redutzu-mdt

If no supported dispatch system is found, alerts will be sent to the default notification system.

---

## 📚 Best Practices

### Alert Timing
Don't spam alerts - use appropriate delays between calls:

```lua
local lastAlert = 0

local function SendRobberyAlert()
    local currentTime = GetGameTimer()
    if currentTime - lastAlert < 30000 then -- 30 second cooldown
        return false, "Please wait before sending another alert"
    end

    lastAlert = currentTime
    Bridge.Dispatch.SendAlert({
        message = "Store robbery in progress",
        code = "10-90",
        jobs = {"police"}
    })
    return true
end
```

### Location Accuracy
Always provide accurate coordinates for better response:

```lua
-- Get precise player location
local coords = GetEntityCoords(PlayerPedId())

Bridge.Dispatch.SendAlert({
    message = "Suspicious activity reported",
    coords = coords,
    jobs = {"police"}
})
```

---

## 📚 Overview

The Dispatch module provides a comprehensive emergency services coordination system. It handles 911 calls, automatic incident detection, unit assignment, communication systems, and response tracking for realistic emergency services roleplay.

### Key Features

- **911 Call System**: Player-initiated emergency calls
- **Automatic Detection**: AI-driven incident recognition
- **Unit Management**: Track and assign emergency units
- **Priority System**: Categorize incidents by urgency
- **GPS Coordination**: Real-time location tracking
- **Communication**: Radio and messaging systems
- **Response Analytics**: Track response times and performance
- **Multi-Service**: Police, medical, fire, and custom services

---

## 📚 Usage Examples

### Sending a Basic Alert

```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Dispatch.SendAlert({
    message = "Vehicle accident reported",
    code = "10-50",
    coords = GetEntityCoords(PlayerPedId()),
    jobs = {"police", "ambulance"}
})
```

### Creating a Custom Incident

```lua
Bridge.Dispatch.Send911Call({
    location = "Downtown Bank",
    message = "Armed robbery in progress",
    priority = "high",
    units_needed = 3
})
```
