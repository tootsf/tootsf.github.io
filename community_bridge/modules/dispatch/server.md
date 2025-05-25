---
layout: default
title: Server Functions
parent: Dispatch
grand_parent: Modules
nav_order: 2
---

# Dispatch - Server Functions
{: .no_toc }

The dispatch module in community_bridge does not provide any direct server-side functions for scripts to call.

---

## Available Functions

**None** - The dispatch module only provides client-side `SendAlert()` functionality.

## How It Works

The dispatch system works through automatic event handling:

1. Client calls `Bridge.Dispatch.SendAlert(data)` 
2. This triggers server event `community_bridge:Server:DispatchAlert`
3. Server automatically forwards alert to all players with matching jobs
4. Players receive alert via `community_bridge:Client:DispatchAlert` event

```lua
-- Server-side event handling (automatic)
RegisterNetEvent("community_bridge:Server:DispatchAlert", function(data)
    local jobs = data.jobs
    for _, name in pairs(jobs) do
        local activeJobPlayers = Bridge.Framework.GetPlayersByJob(name)
        for _, src in pairs(activeJobPlayers) do
            TriggerClientEvent('community_bridge:Client:DispatchAlert', src, data)
        end
    end
end)
```

## Manual Alert Forwarding

If you need to manually send dispatch alerts from server-side code, you can trigger the event directly:

```lua
-- Server-side: Send alert to specific jobs
local alertData = {
    message = "Bank robbery in progress",
    code = "10-90",
    coords = vector3(-123.45, 456.78, 20.0),
    jobs = {"police"},
    blipData = {
        sprite = 161,
        color = 1,
        scale = 0.8
    },
    time = 120000
}

-- Get players with police job and send alert
local policeOfficers = Bridge.Framework.GetPlayersByJob("police")
for _, playerId in pairs(policeOfficers) do
    TriggerClientEvent('community_bridge:Client:DispatchAlert', playerId, alertData)
end
```

---

## Related Documentation

- [Dispatch Client Functions](../client/) - Client-side alert sending
- [Framework Functions](../../framework/) - Job management functions
- `description` (string) - Description of the incident
- `priority` (number, optional) - Call priority (1-5, default: 3)
- `department` (string, optional) - Target department

**Returns:**
- `string` - Unique call ID

**Example:**
```lua
-- High priority robbery call
local callId = Bridge.Dispatch.CreateCall(
    source,
    'robbery',
    vector3(-123.45, 456.78, 20.0),
    'Armed robbery at 24/7 store',
    5,
    'police'
)
```

### GetAllCalls
Retrieves all active calls with optional filtering.

```lua
Bridge.Dispatch.GetAllCalls(filters)
```

**Parameters:**
- `filters` (table, optional) - Filter criteria

**Returns:**
- `table` - Array of call objects

**Example:**
```lua
-- Get all active calls
local allCalls = Bridge.Dispatch.GetAllCalls()

-- Get only police calls
local policeCalls = Bridge.Dispatch.GetAllCalls({
    department = 'police',
    status = 'active'
})
```

### UpdateCall
Updates an existing call with new information.

```lua
Bridge.Dispatch.UpdateCall(callId, updates)
```

**Parameters:**
- `callId` (string) - Call ID to update
- `updates` (table) - Fields to update

**Example:**
```lua
Bridge.Dispatch.UpdateCall('call_12345', {
    priority = 5,
    description = 'Armed robbery - shots fired',
    status = 'in_progress'
})
```

### CloseCall
Closes an emergency call.

```lua
Bridge.Dispatch.CloseCall(callId, closedBy, reason, notes)
```

**Parameters:**
- `callId` (string) - Call ID to close
- `closedBy` (number) - Player ID who closed the call
- `reason` (string, optional) - Reason for closing
- `notes` (string, optional) - Additional notes

**Example:**
```lua
Bridge.Dispatch.CloseCall(
    'call_12345',
    source,
    'resolved',
    'Suspect apprehended, stolen goods recovered'
)
```

## Unit Management

### RegisterUnit
Registers a new dispatch unit.

```lua
Bridge.Dispatch.RegisterUnit(playerId, unitData)
```

**Parameters:**
- `playerId` (number) - Player ID
- `unitData` (table) - Unit information

**Example:**
```lua
Bridge.Dispatch.RegisterUnit(source, {
    callsign = 'UNIT-123',
    department = 'police',
    rank = 'officer',
    specializations = {'patrol', 'traffic'}
})
```

### UnregisterUnit
Unregisters a dispatch unit.

```lua
Bridge.Dispatch.UnregisterUnit(playerId)
```

**Parameters:**
- `playerId` (number) - Player ID to unregister

**Example:**
```lua
-- Unregister unit when player goes off duty
Bridge.Dispatch.UnregisterUnit(source)
```

### GetActiveUnits
Gets all currently active units.

```lua
Bridge.Dispatch.GetActiveUnits(department)
```

**Parameters:**
- `department` (string, optional) - Filter by department

**Returns:**
- `table` - Array of active unit objects

**Example:**
```lua
-- All active units
local allUnits = Bridge.Dispatch.GetActiveUnits()

-- Police units only
local policeUnits = Bridge.Dispatch.GetActiveUnits('police')
```

### UpdateUnitStatus
Updates a unit's status and location.

```lua
Bridge.Dispatch.UpdateUnitStatus(playerId, status, location, notes)
```

**Parameters:**
- `playerId` (number) - Player ID
- `status` (string) - New unit status
- `location` (vector3, optional) - Unit location
- `notes` (string, optional) - Status notes

**Example:**
```lua
Bridge.Dispatch.UpdateUnitStatus(
    source,
    'enroute',
    GetEntityCoords(GetPlayerPed(source)),
    'Responding to robbery call'
)
```

## Call Assignment and Response

### AssignUnitsToCall
Assigns units to an emergency call.

```lua
Bridge.Dispatch.AssignUnitsToCall(callId, unitIds, assignedBy)
```

**Parameters:**
- `callId` (string) - Call ID
- `unitIds` (table) - Array of unit IDs to assign
- `assignedBy` (number, optional) - Player ID who made assignment

**Example:**
```lua
-- Assign multiple units to high priority call
Bridge.Dispatch.AssignUnitsToCall('call_12345', {
    'unit_123',
    'unit_456',
    'unit_789'
}, source)
```

### RemoveUnitFromCall
Removes a unit from a call assignment.

```lua
Bridge.Dispatch.RemoveUnitFromCall(callId, unitId, reason)
```

**Parameters:**
- `callId` (string) - Call ID
- `unitId` (string) - Unit ID to remove
- `reason` (string, optional) - Reason for removal

**Example:**
```lua
Bridge.Dispatch.RemoveUnitFromCall(
    'call_12345',
    'unit_123',
    'reassigned_to_higher_priority'
)
```

### GetCallAssignments
Gets unit assignments for a call.

```lua
Bridge.Dispatch.GetCallAssignments(callId)
```

**Parameters:**
- `callId` (string) - Call ID

**Returns:**
- `table` - Array of assigned unit information

**Example:**
```lua
local assignments = Bridge.Dispatch.GetCallAssignments('call_12345')
for _, assignment in ipairs(assignments) do
    print('Unit:', assignment.unitId, 'Status:', assignment.status)
end
```

## Automated Dispatch

### EnableAutoDispatch
Enables or disables automatic call assignment.

```lua
Bridge.Dispatch.EnableAutoDispatch(enable, rules)
```

**Parameters:**
- `enable` (boolean) - Whether to enable auto-dispatch
- `rules` (table, optional) - Auto-dispatch rules

**Example:**
```lua
Bridge.Dispatch.EnableAutoDispatch(true, {
    maxRadius = 2000,
    minUnits = 1,
    maxUnits = 3,
    priorityWeighting = true
})
```

### SetDispatchRules
Sets rules for automatic dispatch.

```lua
Bridge.Dispatch.SetDispatchRules(department, rules)
```

**Parameters:**
- `department` (string) - Department name
- `rules` (table) - Dispatch rules configuration

**Example:**
```lua
Bridge.Dispatch.SetDispatchRules('police', {
    highPriority = {
        minUnits = 2,
        maxRadius = 5000,
        autoAssign = true
    },
    standardPriority = {
        minUnits = 1,
        maxRadius = 3000,
        autoAssign = true
    }
})
```

### TriggerAutoAssignment
Manually triggers auto-assignment for a call.

```lua
Bridge.Dispatch.TriggerAutoAssignment(callId)
```

**Parameters:**
- `callId` (string) - Call ID to auto-assign

**Example:**
```lua
-- Manually trigger auto-assignment
Bridge.Dispatch.TriggerAutoAssignment('call_12345')
```

## Communication Systems

### BroadcastToUnits
Broadcasts a message to units.

```lua
Bridge.Dispatch.BroadcastToUnits(message, department, priority, unitIds)
```

**Parameters:**
- `message` (string) - Message to broadcast
- `department` (string, optional) - Target department
- `priority` (string, optional) - Message priority
- `unitIds` (table, optional) - Specific units to target

**Example:**
```lua
-- Broadcast to all police units
Bridge.Dispatch.BroadcastToUnits(
    'All units be advised: Armed suspect at large',
    'police',
    'urgent'
)

-- Broadcast to specific units
Bridge.Dispatch.BroadcastToUnits(
    'Proceed to staging area',
    nil,
    'normal',
    {'unit_123', 'unit_456'}
)
```

### SendRadioMessage
Sends a radio message between units/dispatch.

```lua
Bridge.Dispatch.SendRadioMessage(fromPlayerId, message, channel, toUnitId)
```

**Parameters:**
- `fromPlayerId` (number) - Sender player ID
- `message` (string) - Radio message content
- `channel` (string) - Radio channel
- `toUnitId` (string, optional) - Target unit ID

**Example:**
```lua
-- Send message to dispatch channel
Bridge.Dispatch.SendRadioMessage(
    source,
    'Unit 123 requesting backup',
    'police_dispatch'
)
```

### LogCommunication
Logs communication for record keeping.

```lua
Bridge.Dispatch.LogCommunication(type, fromId, toId, content, metadata)
```

**Parameters:**
- `type` (string) - Communication type
- `fromId` (string) - Sender identifier
- `toId` (string) - Recipient identifier
- `content` (string) - Message content
- `metadata` (table, optional) - Additional metadata

**Example:**
```lua
Bridge.Dispatch.LogCommunication(
    'radio',
    'unit_123',
    'dispatch',
    'Requesting backup at Main Street',
    {channel = 'police', priority = 'normal'}
)
```

## Emergency and Panic Systems

### HandlePanicButton
Processes a panic button activation.

```lua
Bridge.Dispatch.HandlePanicButton(playerId, reason, location)
```

**Parameters:**
- `playerId` (number) - Player who triggered panic
- `reason` (string, optional) - Panic reason
- `location` (vector3, optional) - Panic location

**Example:**
```lua
-- Handle officer panic button
Bridge.Dispatch.HandlePanicButton(
    source,
    'officer_down',
    GetEntityCoords(GetPlayerPed(source))
)
```

### BroadcastEmergencyAlert
Broadcasts an emergency alert to all units.

```lua
Bridge.Dispatch.BroadcastEmergencyAlert(alertType, message, location, priority)
```

**Parameters:**
- `alertType` (string) - Type of emergency
- `message` (string) - Alert message
- `location` (vector3) - Alert location
- `priority` (string) - Alert priority

**Example:**
```lua
Bridge.Dispatch.BroadcastEmergencyAlert(
    'officer_down',
    'Officer needs immediate assistance',
    vector3(123.45, -456.78, 20.0),
    'critical'
)
```

### CancelPanicAlert
Cancels an active panic alert.

```lua
Bridge.Dispatch.CancelPanicAlert(playerId, reason)
```

**Parameters:**
- `playerId` (number) - Player ID
- `reason` (string, optional) - Cancellation reason

**Example:**
```lua
Bridge.Dispatch.CancelPanicAlert(source, 'false_alarm')
```

## Analytics and Reporting

### GetCallStatistics
Retrieves call statistics and metrics.

```lua
Bridge.Dispatch.GetCallStatistics(timeframe, department)
```

**Parameters:**
- `timeframe` (string, optional) - Time period ('day', 'week', 'month')
- `department` (string, optional) - Department filter

**Returns:**
- `table` - Statistics data

**Example:**
```lua
local stats = Bridge.Dispatch.GetCallStatistics('day', 'police')
print('Calls today:', stats.totalCalls)
print('Average response time:', stats.avgResponseTime)
print('Closure rate:', stats.closureRate)
```

### GetUnitPerformance
Gets performance metrics for units.

```lua
Bridge.Dispatch.GetUnitPerformance(unitId, timeframe)
```

**Parameters:**
- `unitId` (string, optional) - Specific unit ID
- `timeframe` (string, optional) - Time period

**Returns:**
- `table` - Performance metrics

**Example:**
```lua
local performance = Bridge.Dispatch.GetUnitPerformance('unit_123', 'week')
print('Calls handled:', performance.callsHandled)
print('Response time:', performance.avgResponseTime)
print('Success rate:', performance.successRate)
```

### GenerateReport
Generates a dispatch activity report.

```lua
Bridge.Dispatch.GenerateReport(reportType, parameters)
```

**Parameters:**
- `reportType` (string) - Type of report to generate
- `parameters` (table) - Report parameters

**Returns:**
- `table` - Generated report data

**Example:**
```lua
local report = Bridge.Dispatch.GenerateReport('daily_summary', {
    date = '2024-01-15',
    departments = {'police', 'fire', 'ems'}
})
```

## Administrative Functions

### SetDispatchPermissions
Sets dispatch permissions for a player.

```lua
Bridge.Dispatch.SetDispatchPermissions(playerId, permissions)
```

**Parameters:**
- `playerId` (number) - Player ID
- `permissions` (table) - Array of permission strings

**Example:**
```lua
Bridge.Dispatch.SetDispatchPermissions(source, {
    'dispatch.create_calls',
    'dispatch.assign_units',
    'dispatch.manage_units'
})
```

### BackupDispatchData
Creates a backup of dispatch data.

```lua
Bridge.Dispatch.BackupDispatchData()
```

**Returns:**
- `table` - Backup data

**Example:**
```lua
local backup = Bridge.Dispatch.BackupDispatchData()
-- Store backup data for recovery
```

### RestoreDispatchData
Restores dispatch data from backup.

```lua
Bridge.Dispatch.RestoreDispatchData(backupData)
```

**Parameters:**
- `backupData` (table) - Previously backed up data

**Example:**
```lua
-- Restore from backup after system failure
Bridge.Dispatch.RestoreDispatchData(storedBackup)
```

## Event Callbacks

### OnCallCreated
Registers callback for new call creation.

```lua
Bridge.Dispatch.OnCallCreated(callback)
```

**Parameters:**
- `callback` (function) - Function to call when call is created

**Example:**
```lua
Bridge.Dispatch.OnCallCreated(function(callData)
    print('New call created:', callData.id, callData.type)
    
    -- Auto-assign units for high priority calls
    if callData.priority >= 4 then
        Bridge.Dispatch.TriggerAutoAssignment(callData.id)
    end
    
    -- Log call creation
    Bridge.Dispatch.LogCommunication(
        'call_created',
        'system',
        'dispatch',
        'Call ' .. callData.id .. ' created: ' .. callData.type
    )
end)
```

### OnUnitStatusChange
Registers callback for unit status changes.

```lua
Bridge.Dispatch.OnUnitStatusChange(callback)
```

**Parameters:**
- `callback` (function) - Function to call on status change

**Example:**
```lua
Bridge.Dispatch.OnUnitStatusChange(function(unitId, oldStatus, newStatus)
    print('Unit status change:', unitId, oldStatus, '->', newStatus)
    
    -- Reassign calls if unit goes offline
    if newStatus == 'offline' then
        -- Handle unit going offline
        Bridge.Dispatch.ReassignUnitCalls(unitId)
    end
end)
```

## Integration Examples

### Automatic Emergency Detection
```lua
-- Setup automatic emergency call creation
local function setupEmergencyDetection()
    -- Monitor for gunshots
    AddEventHandler('gameEventTriggered', function(name, data)
        if name == 'CEventNetworkPlayerWeaponDamage' then
            local shooter = data[1]
            local victim = data[2]
            
            if victim ~= 0 and victim ~= shooter then
                local location = GetEntityCoords(victim)
                
                -- Create shots fired call
                local callId = Bridge.Dispatch.CreateCall(
                    -1, -- System generated
                    'shots_fired',
                    location,
                    'Shots fired - automatic detection',
                    4,
                    'police'
                )
                
                -- Auto-assign nearby units
                Bridge.Dispatch.TriggerAutoAssignment(callId)
            end
        end
    end)
end
```

### Performance Monitoring
```lua
-- Monitor dispatch performance
local function monitorPerformance()
    Citizen.CreateThread(function()
        while true do
            Citizen.Wait(300000) -- Check every 5 minutes
            
            local stats = Bridge.Dispatch.GetCallStatistics('hour')
            
            -- Alert if response times are too high
            if stats.avgResponseTime > 300 then -- 5 minutes
                Bridge.Dispatch.BroadcastToUnits(
                    'Dispatch Alert: Response times are elevated',
                    nil,
                    'urgent'
                )
            end
            
            -- Check for unclosed calls
            local oldCalls = Bridge.Dispatch.GetAllCalls({
                status = 'active',
                olderThan = 3600 -- 1 hour
            })
            
            for _, call in ipairs(oldCalls) do
                Bridge.Dispatch.BroadcastToUnits(
                    'Long-running call: ' .. call.id .. ' - ' .. call.type,
                    call.department,
                    'normal'
                )
            end
        end
    end)
end
```

### Multi-Department Coordination
```lua
-- Handle multi-department incidents
Bridge.Dispatch.OnCallCreated(function(callData)
    -- Auto-notify other departments for certain call types
    local multiDeptCalls = {
        'major_accident',
        'structure_fire',
        'active_shooter',
        'hazmat_incident'
    }
    
    if table.contains(multiDeptCalls, callData.type) then
        -- Notify all relevant departments
        local departments = {'police', 'fire', 'ems'}
        
        for _, dept in ipairs(departments) do
            if dept ~= callData.department then
                Bridge.Dispatch.BroadcastToUnits(
                    'Multi-department incident: ' .. callData.type .. ' at ' .. callData.location,
                    dept,
                    'urgent'
                )
            end
        end
    end
end)
```

---

## Related Documentation

- [Dispatch Client Functions](client.md) - Client-side dispatch interface
- [Dispatch Shared Functions](shared.md) - Shared dispatch utilities
- [Dispatch Overview](index.md) - Module introduction and features
