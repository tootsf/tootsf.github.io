---
layout: default
title: Client Functions
parent: Dispatch
grand_parent: Modules
nav_order: 1
---

# Dispatch - Client Functions
{: .no_toc }

Client-side dispatch alert functions for emergency services.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Dispatch client module provides a simple interface for sending emergency alerts to dispatch systems. It integrates with various dispatch resources automatically based on what's available on the server.

## Getting Started

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Send a basic alert
Bridge.Dispatch.SendAlert({
    message = "Robbery in progress",
    coords = GetEntityCoords(PlayerPedId()),
    jobs = {"police"},
    blipData = {
        sprite = 161,
        color = 1,
        scale = 0.8
    }
})
```

---

## Alert Management

---

## 🔹 SendAlert

---

## 🔹 SendAlert
{: .d-inline-block }
Client
{: .label .label-blue }

Sends an emergency alert to the dispatch system.

```lua
Bridge.Dispatch.SendAlert(data)
```

**Parameters:**
- `data` (table) - Alert configuration

**Data Structure:**
- `message` (string, optional) - Alert message (default: "An Alert Has Been Made")
- `code` (string, optional) - Emergency code (default: "10-80")
- `coords` (vector3, optional) - Alert location (default: player position)
- `jobs` (table, optional) - Target job types (default: {"police"})
- `icon` (string, optional) - Alert icon (default: "fas fa-question")
- `time` (number, optional) - Blip duration in ms (default: 100000)
- `vehicle` (number, optional) - Vehicle entity
- `ped` (number, optional) - Ped entity
- `blipData` (table, optional) - Blip configuration
  - `sprite` (number, optional) - Blip sprite (default: 161)
  - `color` (number, optional) - Blip color (default: 1)
  - `scale` (number, optional) - Blip scale (default: 0.8)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Basic robbery alert
Bridge.Dispatch.SendAlert({
    message = "Armed robbery at convenience store",
    code = "10-90",
    coords = vector3(-123.45, 456.78, 20.0),
    jobs = {"police"},
    blipData = {
        sprite = 161,
        color = 1,
        scale = 1.0
    },
    time = 120000 -- 2 minutes
})

-- Medical emergency
Bridge.Dispatch.SendAlert({
    message = "Medical emergency - unconscious person",
    code = "10-52",
    coords = GetEntityCoords(PlayerPedId()),
    jobs = {"ambulance", "police"},
    icon = "fas fa-ambulance",
    blipData = {
        sprite = 153,
        color = 3,
        scale = 0.9
    }
})

-- Fire emergency
Bridge.Dispatch.SendAlert({
    message = "Structure fire reported",
    code = "10-70",
    coords = vector3(100.0, -200.0, 30.0),
    jobs = {"fire", "police"},
    icon = "fas fa-fire",
    vehicle = GetVehiclePedIsIn(PlayerPedId(), false),
    blipData = {
        sprite = 436,
        color = 1,
        scale = 1.2
    }
})
```

---

## Supported Dispatch Systems

The community_bridge automatically detects and integrates with the following dispatch systems:

- **ps-dispatch** - Popular dispatch system
- **cd_dispatch** - Core dispatch system  
- **bub-mdt** - Mobile data terminal with dispatch
- **qs_dispatch** - Quasar dispatch system
- **linden_outlawalert** - Outlaw alert system
- **tk_dispatch** - TK dispatch system
- **lb-tablet** - Laptop/tablet dispatch system
- **redutzu-mdt** - Mobile data terminal

If no supported dispatch system is found, alerts will be sent to default notification system.

---

## Best Practices

---

## 📚 Alert Timing
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

---

## 📚 Location Accuracy
Always provide accurate coordinates for better response:

```lua
-- Get precise player location
local coords = GetEntityCoords(PlayerPedId())

Bridge.Dispatch.SendAlert({
    message = "Suspicious activity reported",
    coords = coords, -- Use actual coordinates
    jobs = {"police"}
})
```

---

## 📚 Job Targeting
Target appropriate emergency services:

```lua
-- Medical emergency - target ambulance and police
Bridge.Dispatch.SendAlert({
    message = "Car accident with injuries",
    jobs = {"ambulance", "police"},
    code = "10-52"
})

-- Fire emergency - target fire department
Bridge.Dispatch.SendAlert({
    message = "Building fire",
    jobs = {"fire", "police"},
    code = "10-70"
})
```
- `priority` (number, optional) - Call priority (1-5, default: 3)

**Returns:**
- `string` - Call ID

**Example:**
```lua
-- High priority robbery call
local callId = Bridge.Dispatch.CreateCall(
    'robbery',
    GetEntityCoords(PlayerPedId()),
    'Armed robbery at 24/7 store',
    5
)
```

---

## 🔹 GetActiveCalls
Retrieves all active emergency calls.

```lua
Bridge.Dispatch.GetActiveCalls(department)
```

**Parameters:**
- `department` (string, optional) - Filter by department

**Returns:**
- `table` - Array of active call objects

**Example:**
```lua
-- All active calls
local allCalls = Bridge.Dispatch.GetActiveCalls()

-- Police calls only
local policeCalls = Bridge.Dispatch.GetActiveCalls('police')

for _, call in ipairs(allCalls) do
    print('Call:', call.id, call.type, call.location)
end
```

---

## 🔹 RespondToCall
Responds to an emergency call.

```lua
Bridge.Dispatch.RespondToCall(callId, responseType)
```

**Parameters:**
- `callId` (string) - ID of the call to respond to
- `responseType` (string, optional) - Type of response ('enroute', 'onscene', 'available')

**Example:**
```lua
-- Respond to call
Bridge.Dispatch.RespondToCall('call_12345', 'enroute')

-- Arrive on scene
Bridge.Dispatch.RespondToCall('call_12345', 'onscene')
```

---

## 🔹 CloseCall
Closes an emergency call.

```lua
Bridge.Dispatch.CloseCall(callId, reason, notes)
```

**Parameters:**
- `callId` (string) - ID of the call to close
- `reason` (string, optional) - Reason for closing
- `notes` (string, optional) - Additional notes

**Example:**
```lua
Bridge.Dispatch.CloseCall(
    'call_12345',
    'resolved',
    'Suspect apprehended, no injuries'
)
```

## Call Information and Updates

---

## 🔹 GetCallDetails
Gets detailed information about a specific call.

```lua
Bridge.Dispatch.GetCallDetails(callId)
```

**Parameters:**
- `callId` (string) - Call ID

**Returns:**
- `table` - Detailed call information

**Example:**
```lua
local callDetails = Bridge.Dispatch.GetCallDetails('call_12345')
print('Call type:', callDetails.type)
print('Priority:', callDetails.priority)
print('Responders:', #callDetails.responders)
```

---

## 🔹 UpdateCallStatus
Updates the status of a call.

```lua
Bridge.Dispatch.UpdateCallStatus(callId, status, notes)
```

**Parameters:**
- `callId` (string) - Call ID
- `status` (string) - New status
- `notes` (string, optional) - Status update notes

**Example:**
```lua
Bridge.Dispatch.UpdateCallStatus(
    'call_12345',
    'in_progress',
    'Backup requested'
)
```

---

## 🔹 AddCallNote
Adds a note to an existing call.

```lua
Bridge.Dispatch.AddCallNote(callId, note, isPrivate)
```

**Parameters:**
- `callId` (string) - Call ID
- `note` (string) - Note content
- `isPrivate` (boolean, optional) - Whether note is private

**Example:**
```lua
Bridge.Dispatch.AddCallNote(
    'call_12345',
    'Suspect vehicle: Red Sedan, License: ABC123'
)
```

## GPS and Location Services

---

## 🔹 SetGPSWaypoint
Sets GPS waypoint to a call location.

```lua
Bridge.Dispatch.SetGPSWaypoint(callId)
```

**Parameters:**
- `callId` (string) - Call ID to navigate to

**Example:**
```lua
-- Set waypoint to active call
Bridge.Dispatch.SetGPSWaypoint('call_12345')
```

---

## 🔹 GetNearestCalls
Gets emergency calls near the player's location.

```lua
Bridge.Dispatch.GetNearestCalls(radius, maxCalls)
```

**Parameters:**
- `radius` (number, optional) - Search radius in meters (default: 1000)
- `maxCalls` (number, optional) - Maximum calls to return (default: 10)

**Returns:**
- `table` - Array of nearby calls sorted by distance

**Example:**
```lua
local nearbyCalls = Bridge.Dispatch.GetNearestCalls(500, 5)
for _, call in ipairs(nearbyCalls) do
    print('Nearby call:', call.type, call.distance .. 'm away')
end
```

---

## 🔹 TrackUnit
Enables GPS tracking for a unit.

```lua
Bridge.Dispatch.TrackUnit(enable, updateInterval)
```

**Parameters:**
- `enable` (boolean) - Whether to enable tracking
- `updateInterval` (number, optional) - Update interval in seconds

**Example:**
```lua
-- Enable tracking with 5-second updates
Bridge.Dispatch.TrackUnit(true, 5)

-- Disable tracking
Bridge.Dispatch.TrackUnit(false)
```

## Radio and Communications

---

## 🔹 SendRadioMessage
Sends a radio message to dispatch or units.

```lua
Bridge.Dispatch.SendRadioMessage(message, channel, priority)
```

**Parameters:**
- `message` (string) - Radio message content
- `channel` (string, optional) - Radio channel
- `priority` (string, optional) - Message priority

**Example:**
```lua
-- Send radio message
Bridge.Dispatch.SendRadioMessage(
    'Unit 12 requesting backup at Main Street',
    'police',
    'urgent'
)
```

---

## 🔹 GetRadioHistory
Retrieves radio communication history.

```lua
Bridge.Dispatch.GetRadioHistory(channel, limit)
```

**Parameters:**
- `channel` (string, optional) - Specific channel
- `limit` (number, optional) - Number of messages to retrieve

**Returns:**
- `table` - Array of radio messages

**Example:**
```lua
local radioHistory = Bridge.Dispatch.GetRadioHistory('police', 20)
for _, message in ipairs(radioHistory) do
    print(message.timestamp, message.sender, message.content)
end
```

---

## 🔹 SetRadioChannel
Sets the active radio channel.

```lua
Bridge.Dispatch.SetRadioChannel(channel)
```

**Parameters:**
- `channel` (string) - Radio channel name

**Example:**
```lua
-- Switch to police channel
Bridge.Dispatch.SetRadioChannel('police')

-- Switch to fire department
Bridge.Dispatch.SetRadioChannel('fire')
```

## Unit Management

---

## 🔹 SetUnitStatus
Sets the status of the current unit.

```lua
Bridge.Dispatch.SetUnitStatus(status, location)
```

**Parameters:**
- `status` (string) - Unit status
- `location` (vector3, optional) - Unit location

**Example:**
```lua
-- Set unit as available
Bridge.Dispatch.SetUnitStatus('available')

-- Set unit as busy at specific location
Bridge.Dispatch.SetUnitStatus('busy', GetEntityCoords(PlayerPedId()))
```

---

## 🔹 GetUnitStatus
Gets the current unit status.

```lua
Bridge.Dispatch.GetUnitStatus()
```

**Returns:**
- `table` - Unit status information

**Example:**
```lua
local status = Bridge.Dispatch.GetUnitStatus()
print('Unit status:', status.status)
print('Last update:', status.lastUpdate)
```

---

## 🔹 GetNearbyUnits
Gets units near the player's location.

```lua
Bridge.Dispatch.GetNearbyUnits(radius, department)
```

**Parameters:**
- `radius` (number, optional) - Search radius in meters
- `department` (string, optional) - Filter by department

**Returns:**
- `table` - Array of nearby units

**Example:**
```lua
local nearbyUnits = Bridge.Dispatch.GetNearbyUnits(1000, 'police')
for _, unit in ipairs(nearbyUnits) do
    print('Unit:', unit.callsign, unit.distance .. 'm away')
end
```

## Panic and Emergency Features

---

## 🔹 TriggerPanicButton
Triggers an emergency panic button.

```lua
Bridge.Dispatch.TriggerPanicButton(reason)
```

**Parameters:**
- `reason` (string, optional) - Reason for panic

**Example:**
```lua
-- Officer down panic
Bridge.Dispatch.TriggerPanicButton('officer_down')

-- General emergency
Bridge.Dispatch.TriggerPanicButton('emergency')
```

### CancelPanic
Cancels an active panic alert.

```lua
Bridge.Dispatch.CancelPanic()
```

**Example:**
```lua
-- False alarm - cancel panic
Bridge.Dispatch.CancelPanic()
```

### SendEmergencyAlert
Sends an emergency alert to dispatch.

```lua
Bridge.Dispatch.SendEmergencyAlert(alertType, message, location)
```

**Parameters:**
- `alertType` (string) - Type of emergency alert
- `message` (string) - Alert message
- `location` (vector3, optional) - Alert location

**Example:**
```lua
Bridge.Dispatch.SendEmergencyAlert(
    'shots_fired',
    'Shots fired at Legion Square',
    vector3(215.0, -810.0, 30.0)
)
```

## UI and Display Functions

### ShowDispatchUI
Shows or hides the dispatch interface.

```lua
Bridge.Dispatch.ShowDispatchUI(show)
```

**Parameters:**
- `show` (boolean) - Whether to show the UI

**Example:**
```lua
-- Show dispatch UI
Bridge.Dispatch.ShowDispatchUI(true)

-- Hide dispatch UI
Bridge.Dispatch.ShowDispatchUI(false)
```

### UpdateDispatchDisplay
Updates the dispatch display with new information.

```lua
Bridge.Dispatch.UpdateDispatchDisplay(data)
```

**Parameters:**
- `data` (table) - Display data to update

**Example:**
```lua
Bridge.Dispatch.UpdateDispatchDisplay({
    activeCalls = activeCalls,
    unitStatus = unitStatus,
    radioMessages = recentMessages
})
```

### ShowCallNotification
Shows a notification for a new call.

```lua
Bridge.Dispatch.ShowCallNotification(callData, duration)
```

**Parameters:**
- `callData` (table) - Call information
- `duration` (number, optional) - Notification duration in seconds

**Example:**
```lua
Bridge.Dispatch.ShowCallNotification({
    id = 'call_12345',
    type = 'robbery',
    location = 'Main Street Bank',
    priority = 5
}, 10)
```

## Call Filtering and Search

### FilterCalls
Filters calls based on criteria.

```lua
Bridge.Dispatch.FilterCalls(filters)
```

**Parameters:**
- `filters` (table) - Filter criteria

**Returns:**
- `table` - Filtered call results

**Example:**
```lua
local filters = {
    type = 'robbery',
    priority = {min = 3, max = 5},
    status = 'active',
    department = 'police'
}
local filteredCalls = Bridge.Dispatch.FilterCalls(filters)
```

### SearchCalls
Searches calls by keyword.

```lua
Bridge.Dispatch.SearchCalls(keyword, includeInactive)
```

**Parameters:**
- `keyword` (string) - Search keyword
- `includeInactive` (boolean, optional) - Include closed calls

**Returns:**
- `table` - Search results

**Example:**
```lua
local results = Bridge.Dispatch.SearchCalls('bank robbery', false)
for _, call in ipairs(results) do
    print('Found call:', call.id, call.description)
end
```

## Event Callbacks

### OnNewCall
Registers callback for new emergency calls.

```lua
Bridge.Dispatch.OnNewCall(callback)
```

**Parameters:**
- `callback` (function) - Function to call when new call is created

**Example:**
```lua
Bridge.Dispatch.OnNewCall(function(callData)
    print('New emergency call:', callData.type)
    
    -- Auto-respond if high priority and nearby
    if callData.priority >= 4 then
        local distance = #(GetEntityCoords(PlayerPedId()) - callData.location)
        if distance < 500 then
            Bridge.Dispatch.RespondToCall(callData.id, 'enroute')
        end
    end
end)
```

### OnCallUpdate
Registers callback for call updates.

```lua
Bridge.Dispatch.OnCallUpdate(callback)
```

**Parameters:**
- `callback` (function) - Function to call when call is updated

**Example:**
```lua
Bridge.Dispatch.OnCallUpdate(function(callId, updateType, data)
    print('Call updated:', callId, updateType)
    
    -- Refresh UI if needed
    if updateType == 'status_change' then
        Bridge.Dispatch.UpdateDispatchDisplay()
    end
end)
```

### OnRadioMessage
Registers callback for radio messages.

```lua
Bridge.Dispatch.OnRadioMessage(callback)
```

**Parameters:**
- `callback` (function) - Function to call when radio message is received

**Example:**
```lua
Bridge.Dispatch.OnRadioMessage(function(message)
    print('Radio:', message.sender, '-', message.content)
    
    -- Play radio sound
    PlaySoundFrontend(-1, 'radio_beep', 'HUD_FRONTEND_DEFAULT_SOUNDSET')
end)
```

## Integration Examples

### Automatic Call Response System
```lua
local function setupAutoResponse()
    Bridge.Dispatch.OnNewCall(function(callData)
        local playerDept = Bridge.Framework.GetPlayerData().job.name
        
        -- Only respond to calls for our department
        if callData.department == playerDept then
            local distance = #(GetEntityCoords(PlayerPedId()) - callData.location)
            
            -- Auto-respond if within 1km and high priority
            if distance <= 1000 and callData.priority >= 4 then
                Bridge.Dispatch.RespondToCall(callData.id, 'enroute')
                Bridge.Dispatch.SetGPSWaypoint(callData.id)
                
                Bridge.Notify.Show(
                    'Responding to high priority call: ' .. callData.type,
                    'info',
                    5000
                )
            end
        end
    end)
end
```

### Dispatch UI Integration
```lua
local function createDispatchInterface()
    Bridge.Dispatch.OnNewCall(function(callData)
        -- Update UI with new call
        SendNUIMessage({
            type = 'newCall',
            call = {
                id = callData.id,
                type = callData.type,
                location = callData.location,
                description = callData.description,
                priority = callData.priority,
                timestamp = callData.timestamp
            }
        })
    end)
    
    -- Handle UI responses
    RegisterNUICallback('respondToCall', function(data, cb)
        Bridge.Dispatch.RespondToCall(data.callId, data.responseType)
        cb('ok')
    end)
end
```

### Emergency Response Workflow
```lua
local function handleEmergencyResponse()
    -- Monitor panic buttons
    local lastPanicCheck = 0
    
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(100)
            
            -- Check for panic button input
            if IsControlJustPressed(0, 166) then -- F5 key
                local currentTime = GetGameTimer()
                
                -- Double-tap detection for panic
                if currentTime - lastPanicCheck < 500 then
                    Bridge.Dispatch.TriggerPanicButton('manual')
                    lastPanicCheck = 0
                else
                    lastPanicCheck = currentTime
                end
            end
        end
    end)
end
```

---

## Related Documentation

- [Dispatch Server Functions](server.md) - Server-side dispatch management
- [Dispatch Shared Functions](shared.md) - Shared dispatch utilities
- [Dispatch Overview](index.md) - Module introduction and features
