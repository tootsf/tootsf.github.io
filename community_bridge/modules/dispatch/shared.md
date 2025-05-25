---
layout: default
title: Shared Functions
parent: Dispatch
grand_parent: Modules
nav_order: 3
---

# Dispatch - Shared Functions
{: .no_toc }

Shared utilities and configurations for Community Bridge dispatch systems.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Dispatch shared module provides common utilities, call type definitions, status codes, and configuration functions used by both client and server-side dispatch systems.

## Getting Started

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get call types
local callTypes = Bridge.Dispatch.GetCallTypes()

-- Validate call type
local isValid = Bridge.Dispatch.IsValidCallType('robbery')
```

## Call Type Management

### GetCallTypes
Retrieves all available emergency call types.

```lua
Bridge.Dispatch.GetCallTypes(department)
```

**Parameters:**
- `department` (string, optional) - Filter by department

**Returns:**
- `table` - Array of call type definitions

**Example:**
```lua
-- All call types
local allTypes = Bridge.Dispatch.GetCallTypes()

-- Police-specific call types
local policeTypes = Bridge.Dispatch.GetCallTypes('police')

for _, callType in ipairs(allTypes) do
    print('Call type:', callType.name, 'Priority:', callType.defaultPriority)
end
```

### IsValidCallType
Validates if a call type exists.

```lua
Bridge.Dispatch.IsValidCallType(callType)
```

**Parameters:**
- `callType` (string) - Call type to validate

**Returns:**
- `boolean` - True if call type is valid

**Example:**
```lua
if Bridge.Dispatch.IsValidCallType('robbery') then
    print('Robbery is a valid call type')
end
```

### GetCallTypeInfo
Gets detailed information about a call type.

```lua
Bridge.Dispatch.GetCallTypeInfo(callType)
```

**Parameters:**
- `callType` (string) - Call type name

**Returns:**
- `table` - Call type information including priority, department, etc.

**Example:**
```lua
local robberyInfo = Bridge.Dispatch.GetCallTypeInfo('robbery')
print('Default priority:', robberyInfo.defaultPriority)
print('Department:', robberyInfo.department)
print('Description:', robberyInfo.description)
print('Required units:', robberyInfo.requiredUnits)
```

## Status Code Management

### GetStatusCodes
Retrieves all available status codes.

```lua
Bridge.Dispatch.GetStatusCodes(category)
```

**Parameters:**
- `category` (string, optional) - Filter by category

**Returns:**
- `table` - Array of status code definitions

**Example:**
```lua
-- All status codes
local allCodes = Bridge.Dispatch.GetStatusCodes()

-- Unit status codes only
local unitCodes = Bridge.Dispatch.GetStatusCodes('unit')

for _, code in ipairs(allCodes) do
    print('Code:', code.code, 'Description:', code.description)
end
```

### IsValidStatusCode
Validates if a status code exists.

```lua
Bridge.Dispatch.IsValidStatusCode(statusCode)
```

**Parameters:**
- `statusCode` (string) - Status code to validate

**Returns:**
- `boolean` - True if status code is valid

**Example:**
```lua
if Bridge.Dispatch.IsValidStatusCode('10-4') then
    print('10-4 is a valid status code')
end
```

### GetStatusCodeInfo
Gets information about a specific status code.

```lua
Bridge.Dispatch.GetStatusCodeInfo(statusCode)
```

**Parameters:**
- `statusCode` (string) - Status code

**Returns:**
- `table` - Status code information

**Example:**
```lua
local codeInfo = Bridge.Dispatch.GetStatusCodeInfo('10-4')
print('Meaning:', codeInfo.meaning)
print('Category:', codeInfo.category)
print('Usage:', codeInfo.usage)
```

## Priority Management

### GetPriorityLevels
Retrieves all priority level definitions.

```lua
Bridge.Dispatch.GetPriorityLevels()
```

**Returns:**
- `table` - Array of priority level definitions

**Example:**
```lua
local priorities = Bridge.Dispatch.GetPriorityLevels()
for level, info in pairs(priorities) do
    print('Priority', level .. ':', info.name, '(' .. info.description .. ')')
end
```

### IsValidPriority
Validates if a priority level is valid.

```lua
Bridge.Dispatch.IsValidPriority(priority)
```

**Parameters:**
- `priority` (number) - Priority level to validate

**Returns:**
- `boolean` - True if priority is valid

**Example:**
```lua
if Bridge.Dispatch.IsValidPriority(5) then
    print('Priority 5 is valid')
end
```

### GetPriorityInfo
Gets information about a priority level.

```lua
Bridge.Dispatch.GetPriorityInfo(priority)
```

**Parameters:**
- `priority` (number) - Priority level

**Returns:**
- `table` - Priority information

**Example:**
```lua
local priorityInfo = Bridge.Dispatch.GetPriorityInfo(5)
print('Name:', priorityInfo.name)
print('Color:', priorityInfo.color)
print('Response time:', priorityInfo.expectedResponseTime)
```

## Department Management

### GetDepartments
Retrieves all available departments.

```lua
Bridge.Dispatch.GetDepartments()
```

**Returns:**
- `table` - Array of department definitions

**Example:**
```lua
local departments = Bridge.Dispatch.GetDepartments()
for _, dept in ipairs(departments) do
    print('Department:', dept.name, 'Code:', dept.code)
end
```

### IsValidDepartment
Validates if a department exists.

```lua
Bridge.Dispatch.IsValidDepartment(department)
```

**Parameters:**
- `department` (string) - Department to validate

**Returns:**
- `boolean` - True if department is valid

**Example:**
```lua
if Bridge.Dispatch.IsValidDepartment('police') then
    print('Police is a valid department')
end
```

### GetDepartmentInfo
Gets information about a department.

```lua
Bridge.Dispatch.GetDepartmentInfo(department)
```

**Parameters:**
- `department` (string) - Department name

**Returns:**
- `table` - Department information

**Example:**
```lua
local policeInfo = Bridge.Dispatch.GetDepartmentInfo('police')
print('Full name:', policeInfo.fullName)
print('Radio channel:', policeInfo.radioChannel)
print('Headquarters:', policeInfo.headquarters)
```

## Configuration Functions

### GetDispatchConfig
Retrieves the dispatch system configuration.

```lua
Bridge.Dispatch.GetDispatchConfig()
```

**Returns:**
- `table` - Complete dispatch configuration

**Example:**
```lua
local config = Bridge.Dispatch.GetDispatchConfig()
print('Auto-dispatch enabled:', config.autoDispatchEnabled)
print('Max response radius:', config.maxResponseRadius)
print('Default call timeout:', config.defaultCallTimeout)
```

### GetRadioChannels
Gets available radio channel configurations.

```lua
Bridge.Dispatch.GetRadioChannels(department)
```

**Parameters:**
- `department` (string, optional) - Filter by department

**Returns:**
- `table` - Radio channel configurations

**Example:**
```lua
-- All radio channels
local allChannels = Bridge.Dispatch.GetRadioChannels()

-- Police channels only
local policeChannels = Bridge.Dispatch.GetRadioChannels('police')

for _, channel in ipairs(allChannels) do
    print('Channel:', channel.name, 'Frequency:', channel.frequency)
end
```

### GetDispatchZones
Retrieves dispatch zone configurations.

```lua
Bridge.Dispatch.GetDispatchZones()
```

**Returns:**
- `table` - Array of dispatch zone definitions

**Example:**
```lua
local zones = Bridge.Dispatch.GetDispatchZones()
for _, zone in ipairs(zones) do
    print('Zone:', zone.name, 'Department:', zone.department)
end
```

## Utility Functions

### FormatCallType
Formats call type name for display.

```lua
Bridge.Dispatch.FormatCallType(callType)
```

**Parameters:**
- `callType` (string) - Raw call type name

**Returns:**
- `string` - Formatted display name

**Example:**
```lua
local formatted = Bridge.Dispatch.FormatCallType('shots_fired')
print(formatted) -- "Shots Fired"

local formatted2 = Bridge.Dispatch.FormatCallType('traffic_stop')
print(formatted2) -- "Traffic Stop"
```

### GetCallTypeIcon
Gets the icon for a call type.

```lua
Bridge.Dispatch.GetCallTypeIcon(callType)
```

**Parameters:**
- `callType` (string) - Call type name

**Returns:**
- `string` - Icon identifier or class

**Example:**
```lua
local icon = Bridge.Dispatch.GetCallTypeIcon('robbery')
print('Robbery icon:', icon) -- "fas fa-mask"

local medicalIcon = Bridge.Dispatch.GetCallTypeIcon('medical')
print('Medical icon:', medicalIcon) -- "fas fa-ambulance"
```

### GetPriorityColor
Gets the color associated with a priority level.

```lua
Bridge.Dispatch.GetPriorityColor(priority)
```

**Parameters:**
- `priority` (number) - Priority level

**Returns:**
- `string` - Hex color code

**Example:**
```lua
local highPriorityColor = Bridge.Dispatch.GetPriorityColor(5)
print('Priority 5 color:', highPriorityColor) -- "#FF0000"

local lowPriorityColor = Bridge.Dispatch.GetPriorityColor(1)
print('Priority 1 color:', lowPriorityColor) -- "#00FF00"
```

## Distance and Location Functions

### CalculateDistance
Calculates distance between two points.

```lua
Bridge.Dispatch.CalculateDistance(point1, point2)
```

**Parameters:**
- `point1` (vector3) - First coordinate
- `point2` (vector3) - Second coordinate

**Returns:**
- `number` - Distance in meters

**Example:**
```lua
local distance = Bridge.Dispatch.CalculateDistance(
    vector3(0, 0, 0),
    vector3(100, 100, 0)
)
print('Distance:', distance .. 'm')
```

### IsWithinRange
Checks if two points are within a specified range.

```lua
Bridge.Dispatch.IsWithinRange(point1, point2, maxDistance)
```

**Parameters:**
- `point1` (vector3) - First coordinate
- `point2` (vector3) - Second coordinate
- `maxDistance` (number) - Maximum distance in meters

**Returns:**
- `boolean` - True if within range

**Example:**
```lua
local inRange = Bridge.Dispatch.IsWithinRange(
    unitLocation,
    callLocation,
    1000
)

if inRange then
    print('Unit is within response range')
end
```

### GetZoneFromCoords
Gets the dispatch zone for given coordinates.

```lua
Bridge.Dispatch.GetZoneFromCoords(coords)
```

**Parameters:**
- `coords` (vector3) - Coordinates to check

**Returns:**
- `table` - Zone information if found

**Example:**
```lua
local zone = Bridge.Dispatch.GetZoneFromCoords(GetEntityCoords(PlayerPedId()))
if zone then
    print('Current zone:', zone.name)
    print('Responsible department:', zone.department)
end
```

## Time and Duration Functions

### FormatDuration
Formats duration in seconds to human-readable format.

```lua
Bridge.Dispatch.FormatDuration(seconds)
```

**Parameters:**
- `seconds` (number) - Duration in seconds

**Returns:**
- `string` - Formatted duration string

**Example:**
```lua
local formatted = Bridge.Dispatch.FormatDuration(3661)
print(formatted) -- "1h 1m 1s"

local shortFormat = Bridge.Dispatch.FormatDuration(125)
print(shortFormat) -- "2m 5s"
```

### CalculateResponseTime
Calculates expected response time based on distance and priority.

```lua
Bridge.Dispatch.CalculateResponseTime(distance, priority, trafficFactor)
```

**Parameters:**
- `distance` (number) - Distance in meters
- `priority` (number) - Call priority level
- `trafficFactor` (number, optional) - Traffic multiplier (default: 1.0)

**Returns:**
- `number` - Expected response time in seconds

**Example:**
```lua
local responseTime = Bridge.Dispatch.CalculateResponseTime(1500, 5, 1.2)
print('Expected response time:', Bridge.Dispatch.FormatDuration(responseTime))
```

### IsCallExpired
Checks if a call has exceeded its timeout period.

```lua
Bridge.Dispatch.IsCallExpired(callStartTime, priority)
```

**Parameters:**
- `callStartTime` (number) - Call creation timestamp
- `priority` (number, optional) - Call priority for timeout calculation

**Returns:**
- `boolean` - True if call has expired

**Example:**
```lua
local expired = Bridge.Dispatch.IsCallExpired(callData.timestamp, callData.priority)
if expired then
    print('Call has exceeded maximum duration')
end
```

## Validation Functions

### ValidateCallData
Validates call data structure and content.

```lua
Bridge.Dispatch.ValidateCallData(callData)
```

**Parameters:**
- `callData` (table) - Call data to validate

**Returns:**
- `boolean` - True if data is valid
- `string` - Error message if invalid

**Example:**
```lua
local callData = {
    type = 'robbery',
    location = vector3(123, 456, 20),
    description = 'Bank robbery in progress',
    priority = 5
}

local isValid, error = Bridge.Dispatch.ValidateCallData(callData)
if not isValid then
    print('Invalid call data:', error)
end
```

### SanitizeInput
Sanitizes user input for dispatch fields.

```lua
Bridge.Dispatch.SanitizeInput(input, inputType)
```

**Parameters:**
- `input` (string) - Raw input to sanitize
- `inputType` (string) - Type of input ('description', 'notes', 'callsign')

**Returns:**
- `string` - Sanitized input

**Example:**
```lua
local sanitized = Bridge.Dispatch.SanitizeInput(
    'Bank robbery <script>alert("xss")</script>',
    'description'
)
print('Sanitized:', sanitized) -- "Bank robbery [removed script]"
```

## Data Structures

### Call Type Definition
```lua
{
    name = 'robbery',
    displayName = 'Robbery',
    description = 'Armed or unarmed robbery in progress',
    department = 'police',
    defaultPriority = 4,
    requiredUnits = 2,
    maxUnits = 4,
    icon = 'fas fa-mask',
    color = '#FF6B6B',
    codes = {'211', '10-31'},
    autoAssign = true
}
```

### Status Code Definition
```lua
{
    code = '10-4',
    meaning = 'Acknowledged',
    category = 'communication',
    department = 'all',
    usage = 'Confirming receipt of message',
    shorthand = 'ACK'
}
```

### Priority Level Definition
```lua
{
    level = 5,
    name = 'Critical',
    description = 'Life-threatening emergency',
    color = '#FF0000',
    expectedResponseTime = 300, -- 5 minutes
    autoAssign = true,
    requiredUnits = 2
}
```

### Department Definition
```lua
{
    name = 'police',
    code = 'PD',
    fullName = 'Los Santos Police Department',
    radioChannel = 'police_main',
    headquarters = vector3(425.1, -979.5, 30.7),
    jurisdiction = 'city',
    emergencyNumber = '911'
}
```

## Best Practices

### Call Type Validation
```lua
-- Always validate call types before processing
local function createCallSafely(callType, location, description)
    if Bridge.Dispatch.IsValidCallType(callType) then
        local callInfo = Bridge.Dispatch.GetCallTypeInfo(callType)
        return Bridge.Dispatch.CreateCall(
            source,
            callType,
            location,
            description,
            callInfo.defaultPriority
        )
    else
        print('Invalid call type:', callType)
        return nil
    end
end
```

### Priority Handling
```lua
-- Use priority information for processing
local function processCall(callData)
    local priorityInfo = Bridge.Dispatch.GetPriorityInfo(callData.priority)
    
    -- High priority calls get immediate attention
    if callData.priority >= 4 then
        Bridge.Dispatch.TriggerAutoAssignment(callData.id)
    end
    
    -- Calculate expected response
    local expectedTime = Bridge.Dispatch.CalculateResponseTime(
        callData.distance,
        callData.priority
    )
    
    return {
        priority = priorityInfo,
        expectedResponse = expectedTime
    }
end
```

### Configuration Access
```lua
-- Cache configuration for performance
local dispatchConfig = Bridge.Dispatch.GetDispatchConfig()
local callTypes = Bridge.Dispatch.GetCallTypes()
local departments = Bridge.Dispatch.GetDepartments()

-- Use cached data
local function isValidConfiguration(data)
    return Bridge.Dispatch.IsValidCallType(data.type) and
           Bridge.Dispatch.IsValidDepartment(data.department) and
           Bridge.Dispatch.IsValidPriority(data.priority)
end
```

## Integration Examples

### Call Type Selection Interface
```lua
-- Create call type selection menu
local function createCallTypeMenu(department)
    local callTypes = Bridge.Dispatch.GetCallTypes(department)
    local menu = {}
    
    for _, callType in ipairs(callTypes) do
        table.insert(menu, {
            label = Bridge.Dispatch.FormatCallType(callType.name),
            value = callType.name,
            icon = Bridge.Dispatch.GetCallTypeIcon(callType.name),
            priority = callType.defaultPriority,
            description = callType.description
        })
    end
    
    return menu
end
```

### Priority-Based UI Styling
```lua
-- Style UI elements based on priority
local function styleCallPriority(priority)
    local priorityInfo = Bridge.Dispatch.GetPriorityInfo(priority)
    local color = Bridge.Dispatch.GetPriorityColor(priority)
    
    return {
        color = color,
        name = priorityInfo.name,
        className = 'priority-' .. priority,
        urgency = priority >= 4 and 'urgent' or 'normal'
    }
end
```

### Distance-Based Assignment
```lua
-- Find units within response range
local function findAvailableUnits(callLocation, priority)
    local config = Bridge.Dispatch.GetDispatchConfig()
    local maxRange = config.maxResponseRadius
    local units = Bridge.Dispatch.GetActiveUnits()
    local availableUnits = {}
    
    for _, unit in ipairs(units) do
        if unit.status == 'available' then
            local distance = Bridge.Dispatch.CalculateDistance(
                unit.location,
                callLocation
            )
            
            if Bridge.Dispatch.IsWithinRange(unit.location, callLocation, maxRange) then
                table.insert(availableUnits, {
                    unit = unit,
                    distance = distance,
                    responseTime = Bridge.Dispatch.CalculateResponseTime(distance, priority)
                })
            end
        end
    end
    
    -- Sort by distance
    table.sort(availableUnits, function(a, b)
        return a.distance < b.distance
    end)
    
    return availableUnits
end
```

---

## Related Documentation

- [Dispatch Client Functions](client.md) - Client-side dispatch interface
- [Dispatch Server Functions](server.md) - Server-side dispatch management
- [Dispatch Overview](index.md) - Module introduction and features
