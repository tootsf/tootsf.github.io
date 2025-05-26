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
- [`Send911Call(location, message)`](client/Send911Call.md) - Send a 911 call to dispatch
- [`SendAlert(data)`](client/SendAlert.md) - Send an emergency alert to the dispatch system
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

### 📚 Key Features

- **911 Call System**: Player-initiated emergency calls
- **Automatic Detection**: AI-driven incident recognition
- **Unit Management**: Track and assign emergency units
- **Priority System**: Categorize incidents by urgency
- **GPS Coordination**: Real-time location tracking
- **Communication**: Radio and messaging systems
- **Response Analytics**: Track response times and performance
- **Multi-Service**: Police, medical, fire, and custom services

---

## 📚 Emergency Services

### 📚 Police Department
- **Patrol Units**: Regular police patrols and traffic enforcement
- **Detective Units**: Investigation and evidence collection
- **SWAT Teams**: High-risk response units
- **Traffic Division**: Accident response and traffic control
- **K9 Units**: Specialized units with police dogs
- **Motorcycle Units**: Traffic enforcement and pursuit

### 📚 Medical Services
- **Ambulance Units**: Emergency medical response
- **Paramedic Teams**: Advanced life support
- **Medical Helicopters**: Air rescue and transport
- **Fire Rescue**: Combined fire and medical response
- **Hazmat Teams**: Chemical and biological incidents

### Fire Department
- **Fire Engines**: Structure and vehicle fire response
- **Ladder Trucks**: High-rise and rescue operations
- **Rescue Units**: Technical rescue and extraction
- **Hazmat Units**: Chemical spill and contamination
- **Wildfire Teams**: Forest and brush fire response

### Custom Services
- **Tow Trucks**: Vehicle recovery and impounding
- **Utility Crews**: Power and infrastructure repair
- **Animal Control**: Wildlife and pet incidents
- **Security Services**: Private security response

---

## Incident Types

### Criminal Activity
- **Robbery**: Armed and unarmed theft incidents
- **Assault**: Physical altercations and violence
- **Drug Activity**: Narcotics possession and distribution
- **Vandalism**: Property damage and graffiti
- **Domestic Violence**: Family and relationship disputes
- **Gang Activity**: Organized crime incidents

### Traffic Incidents
- **Vehicle Accidents**: Collisions and crashes
- **Traffic Violations**: Speeding and reckless driving
- **DUI Incidents**: Impaired driving cases
- **Hit and Run**: Accident with fleeing suspect
- **Vehicle Pursuit**: High-speed chases
- **Road Rage**: Aggressive driving incidents

### Medical Emergencies
- **Cardiac Events**: Heart attacks and chest pain
- **Trauma Cases**: Serious injuries and accidents
- **Overdoses**: Drug and alcohol poisoning
- **Mental Health**: Psychiatric emergencies
- **Suicide Attempts**: Self-harm incidents
- **Mass Casualties**: Multiple victim incidents

### Fire Emergencies
- **Structure Fires**: Building and home fires
- **Vehicle Fires**: Car and truck fires
- **Wildland Fires**: Forest and brush fires
- **Gas Leaks**: Propane and natural gas incidents
- **Explosions**: Chemical and structural explosions
- **Smoke Investigations**: Unknown smoke sources

---

## Dispatch Features

### Call Processing
- **Call Intake**: 911 operator interface
- **Caller Information**: Location and contact details
- **Incident Classification**: Type and priority assignment
- **Information Gathering**: Details and circumstances
- **Call Routing**: Direct to appropriate service
- **Follow-up Calls**: Status updates and additional information

### Unit Assignment
- **Availability Tracking**: Monitor unit status and location
- **Automatic Assignment**: AI-based unit selection
- **Manual Override**: Dispatcher control over assignments
- **Backup Requests**: Additional unit coordination
- **Specialized Units**: Match incidents to appropriate skills
- **Cross-Service**: Coordinate multiple emergency services

### Communication Systems
- **Radio Channels**: Department and incident-specific frequencies
- **Text Messaging**: Silent communication options
- **Status Updates**: Unit and incident progress tracking
- **Broadcast Messages**: Department-wide announcements
- **Inter-Agency**: Communication between different services
- **Command Structure**: Chain of command protocols

---

## Priority System

### Priority Levels
- **Priority 1**: Life-threatening emergencies requiring immediate response
- **Priority 2**: Serious incidents with potential for escalation
- **Priority 3**: Non-urgent matters requiring timely response
- **Priority 4**: Routine calls with no time constraints
- **Priority 5**: Administrative and follow-up matters

### Response Times
- **Code 3**: Emergency response with lights and sirens
- **Code 2**: Urgent response without emergency equipment
- **Code 1**: Routine response at normal traffic speeds
- **Hold**: Place incident in queue for later response
- **Refer**: Transfer to appropriate department or service

### Escalation Procedures
- **Automatic Escalation**: Time-based priority increases
- **Manual Override**: Dispatcher priority adjustments
- **Supervisor Review**: Management oversight of high-priority calls
- **Resource Allocation**: Additional units for complex incidents
- **Mutual Aid**: Request assistance from other agencies

---

## Core Components

### Dispatch Console
- Real-time incident monitoring
- Unit status dashboard
- Map-based coordination
- Communication interfaces
- Reporting and analytics

### Mobile Data Terminals
- In-vehicle computer systems
- Incident details and updates
- Navigation and GPS routing
- Database access and queries
- Report writing and submission

### GPS Tracking
- Real-time unit locations
- Automatic vehicle location (AVL)
- Closest unit calculation
- Response time monitoring
- Coverage area analysis

---

## Integration Features

### Framework Compatibility
Integrates with player job systems to identify emergency service personnel.

### Phone System Integration
Connects with phone modules for realistic 911 calling experience.

### Vehicle Systems
Emergency vehicle identification, equipment access, and performance tracking.

### Map Integration
Blip management for incidents, units, and facilities on the player map.

---

## Common Use Cases

### Emergency Response
- Realistic 911 call handling
- Multi-unit coordination
- Emergency service roleplay
- Crisis management scenarios

### Law Enforcement
- Crime response coordination
- Traffic enforcement support
- Investigation case management
- Officer safety monitoring

### Training Scenarios
- Emergency response training
- Dispatcher certification
- Multi-agency exercises
- Performance evaluation

---

## Quick Start

```lua
-- Create a 911 call
Bridge.Dispatch.Create911Call(source, {
    type = 'robbery',
    location = GetEntityCoords(PlayerPedId()),
    description = 'Armed robbery in progress at convenience store',
    priority = 1,
    caller = {
        name = 'Anonymous',
        phone = 'Unknown'
    }
})

-- Assign unit to incident
Bridge.Dispatch.AssignUnit(incidentId, unitId, 'primary')

-- Update unit status
Bridge.Dispatch.SetUnitStatus(unitId, 'responding')

-- Send dispatch message
Bridge.Dispatch.SendDispatchMessage(unitId, 'Respond to 123 Main St for armed robbery call')

-- Check available units
local availableUnits = Bridge.Dispatch.GetAvailableUnits('police')
```

---

## Advanced Features

### Predictive Analytics
AI-powered incident prediction based on historical data and current patterns.

### Resource Optimization
Automatic unit deployment suggestions for optimal coverage and response times.

### Training Integration
Built-in scenarios and simulations for emergency service training.

### Performance Metrics
Comprehensive analytics for response times, resolution rates, and service quality.

---

## 📚 Client Functions

- [Send911Call](client/Send911Call.md) - Send a 911 call to dispatch

## 📚 Server Functions

- [RegisterUnit](server/RegisterUnit.md) - Register a new emergency unit for dispatch
- [SendDispatchMessage](server/SendDispatchMessage.md) - Send a dispatch message to all units

## 📚 Shared Functions

- [GetUnitStatus](shared/GetUnitStatus.md) - Get the status of a dispatch unit
- [GetActiveCalls](shared/GetActiveCalls.md) - Get a list of active dispatch calls

---

## 📚 Overview

The Dispatch module provides a comprehensive emergency services coordination system. It handles 911 calls, automatic incident detection, unit assignment, communication systems, and response tracking for realistic emergency services roleplay.

### 📚 Key Features

- **911 Call System**: Player-initiated emergency calls
- **Automatic Detection**: AI-driven incident recognition
- **Unit Management**: Track and assign emergency units
- **Priority System**: Categorize incidents by urgency
- **GPS Coordination**: Real-time location tracking
- **Communication**: Radio and messaging systems
- **Response Analytics**: Track response times and performance
- **Multi-Service**: Police, medical, fire, and custom services

---

## 📚 Emergency Services

### 📚 Police Department
- **Patrol Units**: Regular police patrols and traffic enforcement
- **Detective Units**: Investigation and evidence collection
- **SWAT Teams**: High-risk response units
- **Traffic Division**: Accident response and traffic control
- **K9 Units**: Specialized units with police dogs
- **Motorcycle Units**: Traffic enforcement and pursuit

### 📚 Medical Services
- **Ambulance Units**: Emergency medical response
- **Paramedic Teams**: Advanced life support
- **Medical Helicopters**: Air rescue and transport
- **Fire Rescue**: Combined fire and medical response
- **Hazmat Teams**: Chemical and biological incidents

### Fire Department
- **Fire Engines**: Structure and vehicle fire response
- **Ladder Trucks**: High-rise and rescue operations
- **Rescue Units**: Technical rescue and extraction
- **Hazmat Units**: Chemical spill and contamination
- **Wildfire Teams**: Forest and brush fire response

### Custom Services
- **Tow Trucks**: Vehicle recovery and impounding
- **Utility Crews**: Power and infrastructure repair
- **Animal Control**: Wildlife and pet incidents
- **Security Services**: Private security response

---

## Incident Types

### Criminal Activity
- **Robbery**: Armed and unarmed theft incidents
- **Assault**: Physical altercations and violence
- **Drug Activity**: Narcotics possession and distribution
- **Vandalism**: Property damage and graffiti
- **Domestic Violence**: Family and relationship disputes
- **Gang Activity**: Organized crime incidents

### Traffic Incidents
- **Vehicle Accidents**: Collisions and crashes
- **Traffic Violations**: Speeding and reckless driving
- **DUI Incidents**: Impaired driving cases
- **Hit and Run**: Accident with fleeing suspect
- **Vehicle Pursuit**: High-speed chases
- **Road Rage**: Aggressive driving incidents

### Medical Emergencies
- **Cardiac Events**: Heart attacks and chest pain
- **Trauma Cases**: Serious injuries and accidents
- **Overdoses**: Drug and alcohol poisoning
- **Mental Health**: Psychiatric emergencies
- **Suicide Attempts**: Self-harm incidents
- **Mass Casualties**: Multiple victim incidents

### Fire Emergencies
- **Structure Fires**: Building and home fires
- **Vehicle Fires**: Car and truck fires
- **Wildland Fires**: Forest and brush fires
- **Gas Leaks**: Propane and natural gas incidents
- **Explosions**: Chemical and structural explosions
- **Smoke Investigations**: Unknown smoke sources

---

## Dispatch Features

### Call Processing
- **Call Intake**: 911 operator interface
- **Caller Information**: Location and contact details
- **Incident Classification**: Type and priority assignment
- **Information Gathering**: Details and circumstances
- **Call Routing**: Direct to appropriate service
- **Follow-up Calls**: Status updates and additional information

### Unit Assignment
- **Availability Tracking**: Monitor unit status and location
- **Automatic Assignment**: AI-based unit selection
- **Manual Override**: Dispatcher control over assignments
- **Backup Requests**: Additional unit coordination
- **Specialized Units**: Match incidents to appropriate skills
- **Cross-Service**: Coordinate multiple emergency services

### Communication Systems
- **Radio Channels**: Department and incident-specific frequencies
- **Text Messaging**: Silent communication options
- **Status Updates**: Unit and incident progress tracking
- **Broadcast Messages**: Department-wide announcements
- **Inter-Agency**: Communication between different services
- **Command Structure**: Chain of command protocols

---

## Priority System

### Priority Levels
- **Priority 1**: Life-threatening emergencies requiring immediate response
- **Priority 2**: Serious incidents with potential for escalation
- **Priority 3**: Non-urgent matters requiring timely response
- **Priority 4**: Routine calls with no time constraints
- **Priority 5**: Administrative and follow-up matters

### Response Times
- **Code 3**: Emergency response with lights and sirens
- **Code 2**: Urgent response without emergency equipment
- **Code 1**: Routine response at normal traffic speeds
- **Hold**: Place incident in queue for later response
- **Refer**: Transfer to appropriate department or service

### Escalation Procedures
- **Automatic Escalation**: Time-based priority increases
- **Manual Override**: Dispatcher priority adjustments
- **Supervisor Review**: Management oversight of high-priority calls
- **Resource Allocation**: Additional units for complex incidents
- **Mutual Aid**: Request assistance from other agencies

---

## Core Components

### Dispatch Console
- Real-time incident monitoring
- Unit status dashboard
- Map-based coordination
- Communication interfaces
- Reporting and analytics

### Mobile Data Terminals
- In-vehicle computer systems
- Incident details and updates
- Navigation and GPS routing
- Database access and queries
- Report writing and submission

### GPS Tracking
- Real-time unit locations
- Automatic vehicle location (AVL)
- Closest unit calculation
- Response time monitoring
- Coverage area analysis

---

## Integration Features

### Framework Compatibility
Integrates with player job systems to identify emergency service personnel.

### Phone System Integration
Connects with phone modules for realistic 911 calling experience.

### Vehicle Systems
Emergency vehicle identification, equipment access, and performance tracking.

### Map Integration
Blip management for incidents, units, and facilities on the player map.

---

## Common Use Cases

### Emergency Response
- Realistic 911 call handling
- Multi-unit coordination
- Emergency service roleplay
- Crisis management scenarios

### Law Enforcement
- Crime response coordination
- Traffic enforcement support
- Investigation case management
- Officer safety monitoring

### Training Scenarios
- Emergency response training
- Dispatcher certification
- Multi-agency exercises
- Performance evaluation

---

## Quick Start

```lua
-- Create a 911 call
Bridge.Dispatch.Create911Call(source, {
    type = 'robbery',
    location = GetEntityCoords(PlayerPedId()),
    description = 'Armed robbery in progress at convenience store',
    priority = 1,
    caller = {
        name = 'Anonymous',
        phone = 'Unknown'
    }
})

-- Assign unit to incident
Bridge.Dispatch.AssignUnit(incidentId, unitId, 'primary')

-- Update unit status
Bridge.Dispatch.SetUnitStatus(unitId, 'responding')

-- Send dispatch message
Bridge.Dispatch.SendDispatchMessage(unitId, 'Respond to 123 Main St for armed robbery call')

-- Check available units
local availableUnits = Bridge.Dispatch.GetAvailableUnits('police')
```

---

## Advanced Features

### Predictive Analytics
AI-powered incident prediction based on historical data and current patterns.

### Resource Optimization
Automatic unit deployment suggestions for optimal coverage and response times.

### Training Integration
Built-in scenarios and simulations for emergency service training.

### Performance Metrics
Comprehensive analytics for response times, resolution rates, and service quality.

---

## 📚 Client Functions

- [Send911Call](client/Send911Call.md) - Send a 911 call to dispatch

## 📚 Server Functions

- [RegisterUnit](server/RegisterUnit.md) - Register a new emergency unit for dispatch
- [SendDispatchMessage](server/SendDispatchMessage.md) - Send a dispatch message to all units

## 📚 Shared Functions

- [GetUnitStatus](shared/GetUnitStatus.md) - Get the status of a dispatch unit
- [GetActiveCalls](shared/GetActiveCalls.md) - Get a list of active dispatch calls

---

## 📚 Overview

The Dispatch module provides a comprehensive emergency services coordination system. It handles 911 calls, automatic incident detection, unit assignment, communication systems, and response tracking for realistic emergency services roleplay.

### 📚 Key Features

- **911 Call System**: Player-initiated emergency calls
- **Automatic Detection**: AI-driven incident recognition
- **Unit Management**: Track and assign emergency units
- **Priority System**: Categorize incidents by urgency
- **GPS Coordination**: Real-time location tracking
- **Communication**: Radio and messaging systems
- **Response Analytics**: Track response times and performance
- **Multi-Service**: Police, medical, fire, and custom services

---

## 📚 Emergency Services

### 📚 Police Department
- **Patrol Units**: Regular police patrols and traffic enforcement
- **Detective Units**: Investigation and evidence collection
- **SWAT Teams**: High-risk response units
- **Traffic Division**: Accident response and traffic control
- **K9 Units**: Specialized units with police dogs
- **Motorcycle Units**: Traffic enforcement and pursuit

### 📚 Medical Services
- **Ambulance Units**: Emergency medical response
- **Paramedic Teams**: Advanced life support
- **Medical Helicopters**: Air rescue and transport
- **Fire Rescue**: Combined fire and medical response
- **Hazmat Teams**: Chemical and biological incidents

### Fire Department
- **Fire Engines**: Structure and vehicle fire response
- **Ladder Trucks**: High-rise and rescue operations
- **Rescue Units**: Technical rescue and extraction
- **Hazmat Units**: Chemical spill and contamination
- **Wildfire Teams**: Forest and brush fire response

### Custom Services
- **Tow Trucks**: Vehicle recovery and impounding
- **Utility Crews**: Power and infrastructure repair
- **Animal Control**: Wildlife and pet incidents
- **Security Services**: Private security response

---

## Incident Types

### Criminal Activity
- **Robbery**: Armed and unarmed theft incidents
- **Assault**: Physical altercations and violence
- **Drug Activity**: Narcotics possession and distribution
- **Vandalism**: Property damage and graffiti
- **Domestic Violence**: Family and relationship disputes
- **Gang Activity**: Organized crime incidents

### Traffic Incidents
- **Vehicle Accidents**: Collisions and crashes
- **Traffic Violations**: Speeding and reckless driving
- **DUI Incidents**: Impaired driving cases
- **Hit and Run**: Accident with fleeing suspect
- **Vehicle Pursuit**: High-speed chases
- **Road Rage**: Aggressive driving incidents

### Medical Emergencies
- **Cardiac Events**: Heart attacks and chest pain
- **Trauma Cases**: Serious injuries and accidents
- **Overdoses**: Drug and alcohol poisoning
- **Mental Health**: Psychiatric emergencies
- **Suicide Attempts**: Self-harm incidents
- **Mass Casualties**: Multiple victim incidents

### Fire Emergencies
- **Structure Fires**: Building and home fires
- **Vehicle Fires**: Car and truck fires
- **Wildland Fires**: Forest and brush fires
- **Gas Leaks**: Propane and natural gas incidents
- **Explosions**: Chemical and structural explosions
- **Smoke Investigations**: Unknown smoke sources

---

## Dispatch Features

### Call Processing
- **Call Intake**: 911 operator interface
- **Caller Information**: Location and contact details
- **Incident Classification**: Type and priority assignment
- **Information Gathering**: Details and circumstances
- **Call Routing**: Direct to appropriate service
- **Follow-up Calls**: Status updates and additional information

### Unit Assignment
- **Availability Tracking**: Monitor unit status and location
- **Automatic Assignment**: AI-based unit selection
- **Manual Override**: Dispatcher control over assignments
- **Backup Requests**: Additional unit coordination
- **Specialized Units**: Match incidents to appropriate skills
- **Cross-Service**: Coordinate multiple emergency services

### Communication Systems
- **Radio Channels**: Department and incident-specific frequencies
- **Text Messaging**: Silent communication options
- **Status Updates**: Unit and incident progress tracking
- **Broadcast Messages**: Department-wide announcements
- **Inter-Agency**: Communication between different services
- **Command Structure**: Chain of command protocols

---

## Priority System

### Priority Levels
- **Priority 1**: Life-threatening emergencies requiring immediate response
- **Priority 2**: Serious incidents with potential for escalation
- **Priority 3**: Non-urgent matters requiring timely response
- **Priority 4**: Routine calls with no time constraints
- **Priority 5**: Administrative and follow-up matters

### Response Times
- **Code 3**: Emergency response with lights and sirens
- **Code 2**: Urgent response without emergency equipment
- **Code 1**: Routine response at normal traffic speeds
- **Hold**: Place incident in queue for later response
- **Refer**: Transfer to appropriate department or service

### Escalation Procedures
- **Automatic Escalation**: Time-based priority increases
- **Manual Override**: Dispatcher priority adjustments
- **Supervisor Review**: Management oversight of high-priority calls
- **Resource Allocation**: Additional units for complex incidents
- **Mutual Aid**: Request assistance from other agencies

---

## Core Components

### Dispatch Console
- Real-time incident monitoring
- Unit status dashboard
- Map-based coordination
- Communication interfaces
- Reporting and analytics

### Mobile Data Terminals
- In-vehicle computer systems
- Incident details and updates
- Navigation and GPS routing
- Database access and queries
- Report writing and submission

### GPS Tracking
- Real-time unit locations
- Automatic vehicle location (AVL)
- Closest unit calculation
- Response time monitoring
- Coverage area analysis

---

## Integration Features

### Framework Compatibility
Integrates with player job systems to identify emergency service personnel.

### Phone System Integration
Connects with phone modules for realistic 911 calling experience.

### Vehicle Systems
Emergency vehicle identification, equipment access, and performance tracking.

### Map Integration
Blip management for incidents, units, and facilities on the player map.

---

## Common Use Cases

### Emergency Response
- Realistic 911 call handling
- Multi-unit coordination
- Emergency service roleplay
- Crisis management scenarios

### Law Enforcement
- Crime response coordination
- Traffic enforcement support
- Investigation case management
- Officer safety monitoring

### Training Scenarios
- Emergency response training
- Dispatcher certification
- Multi-agency exercises
- Performance evaluation

---

## Quick Start

```lua
-- Create a 911 call
Bridge.Dispatch.Create911Call(source, {
    type = 'robbery',
    location = GetEntityCoords(PlayerPedId()),
    description = 'Armed robbery in progress at convenience store',
    priority = 1,
    caller = {
        name = 'Anonymous',
        phone = 'Unknown'
    }
})

-- Assign unit to incident
Bridge.Dispatch.AssignUnit(incidentId, unitId, 'primary')

-- Update unit status
Bridge.Dispatch.SetUnitStatus(unitId, 'responding')

-- Send dispatch message
Bridge.Dispatch.SendDispatchMessage(unitId, 'Respond to 123 Main St for armed robbery call')

-- Check available units
local availableUnits = Bridge.Dispatch.GetAvailableUnits('police')
```

---

## Advanced Features

### Predictive Analytics
AI-powered incident prediction based on historical data and current patterns.

### Resource Optimization
Automatic unit deployment suggestions for optimal coverage and response times.

### Training Integration
Built-in scenarios and simulations for emergency service training.

### Performance Metrics
Comprehensive analytics for response times, resolution rates, and service quality.

---

## 📚 Client Functions

- [Send911Call](client/Send911Call.md) - Send a 911 call to dispatch

## 📚 Server Functions

- [RegisterUnit](server/RegisterUnit.md) - Register a new emergency unit for dispatch
- [SendDispatchMessage](server/SendDispatchMessage.md) - Send a dispatch message to all units

## 📚 Shared Functions

- [GetUnitStatus](shared/GetUnitStatus.md) - Get the status of a dispatch unit
- [GetActiveCalls](shared/GetActiveCalls.md) - Get a list of active dispatch calls

---

## 📚 Overview

The Dispatch module provides a comprehensive emergency services coordination system. It handles 911 calls, automatic incident detection, unit assignment, communication systems, and response tracking for realistic emergency services roleplay.

### 📚 Key Features

- **911 Call System**: Player-initiated emergency calls
- **Automatic Detection**: AI-driven incident recognition
- **Unit Management**: Track and assign emergency units
- **Priority System**: Categorize incidents by urgency
- **GPS Coordination**: Real-time location tracking
- **Communication**: Radio and messaging systems
- **Response Analytics**: Track response times and performance
- **Multi-Service**: Police, medical, fire, and custom services

---

## 📚 Emergency Services

### 📚 Police Department
- **Patrol Units**: Regular police patrols and traffic enforcement
- **Detective Units**: Investigation and evidence collection
- **SWAT Teams**: High-risk response units
- **Traffic Division**: Accident response and traffic control
- **K9 Units**: Specialized units with police dogs
- **Motorcycle Units**: Traffic enforcement and pursuit

### 📚 Medical Services
- **Ambulance Units**: Emergency medical response
- **Paramedic Teams**: Advanced life support
- **Medical Helicopters**: Air rescue and transport
- **Fire Rescue**: Combined fire and medical response
- **Hazmat Teams**: Chemical and biological incidents

### Fire Department
- **Fire Engines**: Structure and vehicle fire response
- **Ladder Trucks**: High-rise and rescue operations
- **Rescue Units**: Technical rescue and extraction
- **Hazmat Units**: Chemical spill and contamination
- **Wildfire Teams**: Forest and brush fire response

### Custom Services
- **Tow Trucks**: Vehicle recovery and impounding
- **Utility Crews**: Power and infrastructure repair
- **Animal Control**: Wildlife and pet incidents
- **Security Services**: Private security response

---

## Incident Types

### Criminal Activity
- **Robbery**: Armed and unarmed theft incidents
- **Assault**: Physical altercations and violence
- **Drug Activity**: Narcotics possession and distribution
- **Vandalism**: Property damage and graffiti
- **Domestic Violence**: Family and relationship disputes
- **Gang Activity**: Organized crime incidents

### Traffic Incidents
- **Vehicle Accidents**: Collisions and crashes
- **Traffic Violations**: Speeding and reckless driving
- **DUI Incidents**: Impaired driving cases
- **Hit and Run**: Accident with fleeing suspect
- **Vehicle Pursuit**: High-speed chases
- **Road Rage**: Aggressive driving incidents

### Medical Emergencies
- **Cardiac Events**: Heart attacks and chest pain
- **Trauma Cases**: Serious injuries and accidents
- **Overdoses**: Drug and alcohol poisoning
- **Mental Health**: Psychiatric emergencies
- **Suicide Attempts**: Self-harm incidents
- **Mass Casualties**: Multiple victim incidents

### Fire Emergencies
- **Structure Fires**: Building and home fires
- **Vehicle Fires**: Car and truck fires
- **Wildland Fires**: Forest and brush fires
- **Gas Leaks**: Propane and natural gas incidents
- **Explosions**: Chemical and structural explosions
- **Smoke Investigations**: Unknown smoke sources

---

## Dispatch Features

### Call Processing
- **Call Intake**: 911 operator interface
- **Caller Information**: Location and contact details
- **Incident Classification**: Type and priority assignment
- **Information Gathering**: Details and circumstances
- **Call Routing**: Direct to appropriate service
- **Follow-up Calls**: Status updates and additional information

### Unit Assignment
- **Availability Tracking**: Monitor unit status and location
- **Automatic Assignment**: AI-based unit selection
- **Manual Override**: Dispatcher control over assignments
- **Backup Requests**: Additional unit coordination
- **Specialized Units**: Match incidents to appropriate skills
- **Cross-Service**: Coordinate multiple emergency services

### Communication Systems
- **Radio Channels**: Department and incident-specific frequencies
- **Text Messaging**: Silent communication options
- **Status Updates**: Unit and incident progress tracking
- **Broadcast Messages**: Department-wide announcements
- **Inter-Agency**: Communication between different services
- **Command Structure**: Chain of command protocols

---

## Priority System

### Priority Levels
- **Priority 1**: Life-threatening emergencies requiring immediate response
- **Priority 2**: Serious incidents with potential for escalation
- **Priority 3**: Non-urgent matters requiring timely response
- **Priority 4**: Routine calls with no time constraints
- **Priority 5**: Administrative and follow-up matters

### Response Times
- **Code 3**: Emergency response with lights and sirens
- **Code 2**: Urgent response without emergency equipment
- **Code 1**: Routine response at normal traffic speeds
- **Hold**: Place incident in queue for later response
- **Refer**: Transfer to appropriate department or service

### Escalation Procedures
- **Automatic Escalation**: Time-based priority increases
- **Manual Override**: Dispatcher priority adjustments
- **Supervisor Review**: Management oversight of high-priority calls
- **Resource Allocation**: Additional units for complex incidents
- **Mutual Aid**: Request assistance from other agencies

---

## Core Components

### Dispatch Console
- Real-time incident monitoring
- Unit status dashboard
- Map-based coordination
- Communication interfaces
- Reporting and analytics

### Mobile Data Terminals
- In-vehicle computer systems
- Incident details and updates
- Navigation and GPS routing
- Database access and queries
- Report writing and submission

### GPS Tracking
- Real-time unit locations
- Automatic vehicle location (AVL)
- Closest unit calculation
- Response time monitoring
- Coverage area analysis

---

## Integration Features

### Framework Compatibility
Integrates with player job systems to identify emergency service personnel.

### Phone System Integration
Connects with phone modules for realistic 911 calling experience.

### Vehicle Systems
Emergency vehicle identification, equipment access, and performance tracking.

### Map Integration
Blip management for incidents, units, and facilities on the player map.

---

## Common Use Cases

### Emergency Response
- Realistic 911 call handling
- Multi-unit coordination
- Emergency service roleplay
- Crisis management scenarios

### Law Enforcement
- Crime response coordination
- Traffic enforcement support
- Investigation case management
- Officer safety monitoring

### Training Scenarios
- Emergency response training
- Dispatcher certification
- Multi-agency exercises
- Performance evaluation

---

## Quick Start

```lua
-- Create a 911 call
Bridge.Dispatch.Create911Call(source, {
    type = 'robbery',
    location = GetEntityCoords(PlayerPedId()),
    description = 'Armed robbery in progress at convenience store',
    priority = 1,
    caller = {
        name = 'Anonymous',
        phone = 'Unknown'
    }
})

-- Assign unit to incident
Bridge.Dispatch.AssignUnit(incidentId, unitId, 'primary')

-- Update unit status
Bridge.Dispatch.SetUnitStatus(unitId, 'responding')

-- Send dispatch message
Bridge.Dispatch.SendDispatchMessage(unitId, 'Respond to 123 Main St for armed robbery call')

-- Check available units
local availableUnits = Bridge.Dispatch.GetAvailableUnits('police')
```

---

## Advanced Features

### Predictive Analytics
AI-powered incident prediction based on historical data and current patterns.

### Resource Optimization
Automatic unit deployment suggestions for optimal coverage and response times.

### Training Integration
Built-in scenarios and simulations for emergency service training.

### Performance Metrics
Comprehensive analytics for response times, resolution rates, and service quality.

---

## 📚 Client Functions

- [Send911Call](client/Send911Call.md) - Send a 911 call to dispatch

## 📚 Server Functions

- [RegisterUnit](server/RegisterUnit.md) - Register a new emergency unit for dispatch
- [SendDispatchMessage](server/SendDispatchMessage.md) - Send a dispatch message to all units

## 📚 Shared Functions

- [GetUnitStatus](shared/GetUnitStatus.md) - Get the status of a dispatch unit
- [GetActiveCalls](shared/GetActiveCalls.md) - Get a list of active dispatch calls

---

## 📚 Overview

The Dispatch module provides a comprehensive emergency services coordination system. It handles 911 calls, automatic incident detection, unit assignment, communication systems, and response tracking for realistic emergency services roleplay.

### 📚 Key Features

- **911 Call System**: Player-initiated emergency calls
- **Automatic Detection**: AI-driven incident recognition
- **Unit Management**: Track and assign emergency units
- **Priority System**: Categorize incidents by urgency
- **GPS Coordination**: Real-time location tracking
- **Communication**: Radio and messaging systems
- **Response Analytics**: Track response times and performance
- **Multi-Service**: Police, medical, fire, and custom services

---

## 📚 Emergency Services

### 📚 Police Department
- **Patrol Units**: Regular police patrols and traffic enforcement
- **Detective Units**: Investigation and evidence collection
- **SWAT Teams**: High-risk response units
- **Traffic Division**: Accident response and traffic control
- **K9 Units**: Specialized units with police dogs
- **Motorcycle Units**: Traffic enforcement and pursuit

### 📚 Medical Services
- **Ambulance Units**: Emergency medical response
- **Paramedic Teams**: Advanced life support
- **Medical Helicopters**: Air rescue and transport
- **Fire Rescue**: Combined fire and medical response
- **Hazmat Teams**: Chemical and biological incidents

### Fire Department
- **Fire Engines**: Structure and vehicle fire response
- **Ladder Trucks**: High-rise and rescue operations
- **Rescue Units**: Technical rescue and extraction
- **Hazmat Units**: Chemical spill and contamination
- **Wildfire Teams**: Forest and brush fire response

### Custom Services
- **Tow Trucks**: Vehicle recovery and impounding
- **Utility Crews**: Power and infrastructure repair
- **Animal Control**: Wildlife and pet incidents
- **Security Services**: Private security response

---

## Incident Types

### Criminal Activity
- **Robbery**: Armed and unarmed theft incidents
- **Assault**: Physical altercations and violence
- **Drug Activity**: Narcotics possession and distribution
- **Vandalism**: Property damage and graffiti
- **Domestic Violence**: Family and relationship disputes
- **Gang Activity**: Organized crime incidents

### Traffic Incidents
- **Vehicle Accidents**: Collisions and crashes
- **Traffic Violations**: Speeding and reckless driving
- **DUI Incidents**: Impaired driving cases
- **Hit and Run**: Accident with fleeing suspect
- **Vehicle Pursuit**: High-speed chases
- **Road Rage**: Aggressive driving incidents

### Medical Emergencies
- **Cardiac Events**: Heart attacks and chest pain
- **Trauma Cases**: Serious injuries and accidents
- **Overdoses**: Drug and alcohol poisoning
- **Mental Health**: Psychiatric emergencies
- **Suicide Attempts**: Self-harm incidents
- **Mass Casualties**: Multiple victim incidents

### Fire Emergencies
- **Structure Fires**: Building and home fires
- **Vehicle Fires**: Car and truck fires
- **Wildland Fires**: Forest and brush fires
- **Gas Leaks**: Propane and natural gas incidents
- **Explosions**: Chemical and structural explosions
- **Smoke Investigations**: Unknown smoke sources

---

## Dispatch Features

### Call Processing
- **Call Intake**: 911 operator interface
- **Caller Information**: Location and contact details
- **Incident Classification**: Type and priority assignment
- **Information Gathering**: Details and circumstances
- **Call Routing**: Direct to appropriate service
- **Follow-up Calls**: Status updates and additional information

### Unit Assignment
- **Availability Tracking**: Monitor unit status and location
- **Automatic Assignment**: AI-based unit selection
- **Manual Override**: Dispatcher control over assignments
- **Backup Requests**: Additional unit coordination
- **Specialized Units**: Match incidents to appropriate skills
- **Cross-Service**: Coordinate multiple emergency services

### Communication Systems
- **Radio Channels**: Department and incident-specific frequencies
- **Text Messaging**: Silent communication options
- **Status Updates**: Unit and incident progress tracking
- **Broadcast Messages**: Department-wide announcements
- **Inter-Agency**: Communication between different services
- **Command Structure**: Chain of command protocols

---

## Priority System

### Priority Levels
- **Priority 1**: Life-threatening emergencies requiring immediate response
- **Priority 2**: Serious incidents with potential for escalation
- **Priority 3**: Non-urgent matters requiring timely response
- **Priority 4**: Routine calls with no time constraints
- **Priority 5**: Administrative and follow-up matters

### Response Times
- **Code 3**: Emergency response with lights and sirens
- **Code 2**: Urgent response without emergency equipment
- **Code 1**: Routine response at normal traffic speeds
- **Hold**: Place incident in queue for later response
- **Refer**: Transfer to appropriate department or service

### Escalation Procedures
- **Automatic Escalation**: Time-based priority increases
- **Manual Override**: Dispatcher priority adjustments
- **Supervisor Review**: Management oversight of high-priority calls
- **Resource Allocation**: Additional units for complex incidents
- **Mutual Aid**: Request assistance from other agencies

---

## Core Components

### Dispatch Console
- Real-time incident monitoring
- Unit status dashboard
- Map-based coordination
- Communication interfaces
- Reporting and analytics

### Mobile Data Terminals
- In-vehicle computer systems
- Incident details and updates
- Navigation and GPS routing
- Database access and queries
- Report writing and submission

### GPS Tracking
- Real-time unit locations
- Automatic vehicle location (AVL)
- Closest unit calculation
- Response time monitoring
- Coverage area analysis

---

## Integration Features

### Framework Compatibility
Integrates with player job systems to identify emergency service personnel.

### Phone System Integration
Connects with phone modules for realistic 911 calling experience.

### Vehicle Systems
Emergency vehicle identification, equipment access, and performance tracking.

### Map Integration
Blip management for incidents, units, and facilities on the player map.

---

## Common Use Cases

### Emergency Response
- Realistic 911 call handling
- Multi-unit coordination
- Emergency service roleplay
- Crisis management scenarios

### Law Enforcement
- Crime response coordination
- Traffic enforcement support
- Investigation case management
- Officer safety monitoring

### Training Scenarios
- Emergency response training
- Dispatcher certification
- Multi-agency exercises
- Performance evaluation

---

## Quick Start

```lua
-- Create a 911 call
Bridge.Dispatch.Create911Call(source, {
    type = 'robbery',
    location = GetEntityCoords(PlayerPedId()),
    description = 'Armed robbery in progress at convenience store',
    priority = 1,
    caller = {
        name = 'Anonymous',
        phone = 'Unknown'
    }
})

-- Assign unit to incident
Bridge.Dispatch.AssignUnit(incidentId, unitId, 'primary')

-- Update unit status
Bridge.Dispatch.SetUnitStatus(unitId, 'responding')

-- Send dispatch message
Bridge.Dispatch.SendDispatchMessage(unitId, 'Respond to 123 Main St for armed robbery call')

-- Check available units
local availableUnits = Bridge.Dispatch.GetAvailableUnits('police')
```

---

## Advanced Features

### Predictive Analytics
AI-powered incident prediction based on historical data and current patterns.

### Resource Optimization
Automatic unit deployment suggestions for optimal coverage and response times.

### Training Integration
Built-in scenarios and simulations for emergency service training.

### Performance Metrics
Comprehensive analytics for response times, resolution rates, and service quality.

---

## 📚 Client Functions

- [Send911Call](client/Send911Call.md) - Send a 911 call to dispatch

## 📚 Server Functions

- [RegisterUnit](server/RegisterUnit.md) - Register a new emergency unit for dispatch
- [SendDispatchMessage](server/SendDispatchMessage.md) - Send a dispatch message to all units

## 📚 Shared Functions

- [GetUnitStatus](shared/GetUnitStatus.md) - Get the status of a dispatch unit
- [GetActiveCalls](shared/GetActiveCalls.md) - Get a list of active dispatch calls

---

## 📚 Overview

The Dispatch module provides a comprehensive emergency services coordination system. It handles 911 calls, automatic incident detection, unit assignment, communication systems, and response tracking for realistic emergency services roleplay.

### 📚 Key Features

- **911 Call System**: Player-initiated emergency calls
- **Automatic Detection**: AI-driven incident recognition
- **Unit Management**: Track and assign emergency units
- **Priority System**: Categorize incidents by urgency
- **GPS Coordination**: Real-time location tracking
- **Communication**: Radio and messaging systems
- **Response Analytics**: Track response times and performance
- **Multi-Service**: Police, medical, fire, and custom services

---

## 📚 Emergency Services

### 📚 Police Department
- **Patrol Units**: Regular police patrols and traffic enforcement
- **Detective Units**: Investigation and evidence collection
- **SWAT Teams**: High-risk response units
- **Traffic Division**: Accident response and traffic control
- **K9 Units**: Specialized units with police dogs
- **Motorcycle Units**: Traffic enforcement and pursuit

### 📚 Medical Services
- **Ambulance Units**: Emergency medical response
- **Paramedic Teams**: Advanced life support
- **Medical Helicopters**: Air rescue and transport
- **Fire Rescue**: Combined fire and medical response
- **Hazmat Teams**: Chemical and biological incidents

### Fire Department
- **Fire Engines**: Structure and vehicle fire response
- **Ladder Trucks**: High-rise and rescue operations
- **Rescue Units**: Technical rescue and extraction
- **Hazmat Units**: Chemical spill and contamination
- **Wildfire Teams**: Forest and brush fire response

### Custom Services
- **Tow Trucks**: Vehicle recovery and impounding
- **Utility Crews**: Power and infrastructure repair
- **Animal Control**: Wildlife and pet incidents
- **Security Services**: Private security response

---

## Incident Types

### Criminal Activity
- **Robbery**: Armed and unarmed theft incidents
- **Assault**: Physical altercations and violence
- **Drug Activity**: Narcotics possession and distribution
- **Vandalism**: Property damage and graffiti
- **Domestic Violence**: Family and relationship disputes
- **Gang Activity**: Organized crime incidents

### Traffic Incidents
- **Vehicle Accidents**: Collisions and crashes
- **Traffic Violations**: Speeding and reckless driving
- **DUI Incidents**: Impaired driving cases
- **Hit and Run**: Accident with fleeing suspect
- **Vehicle Pursuit**: High-speed chases
- **Road Rage**: Aggressive driving incidents

### Medical Emergencies
- **Cardiac Events**: Heart attacks and chest pain
- **Trauma Cases**: Serious injuries and accidents
- **Overdoses**: Drug and alcohol poisoning
- **Mental Health**: Psychiatric emergencies
- **Suicide Attempts**: Self-harm incidents
- **Mass Casualties**: Multiple victim incidents

### Fire Emergencies
- **Structure Fires**: Building and home fires
- **Vehicle Fires**: Car and truck fires
- **Wildland Fires**: Forest and brush fires
- **Gas Leaks**: Propane and natural gas incidents
- **Explosions**: Chemical and structural explosions
- **Smoke Investigations**: Unknown smoke sources

---

## Dispatch Features

### Call Processing
- **Call Intake**: 911 operator interface
- **Caller Information**: Location and contact details
- **Incident Classification**: Type and priority assignment
- **Information Gathering**: Details and circumstances
- **Call Routing**: Direct to appropriate service
- **Follow-up Calls**: Status updates and additional information

### Unit Assignment
- **Availability Tracking**: Monitor unit status and location
- **Automatic Assignment**: AI-based unit selection
- **Manual Override**: Dispatcher control over assignments
- **Backup Requests**: Additional unit coordination
- **Specialized Units**: Match incidents to appropriate skills
- **Cross-Service**: Coordinate multiple emergency services

### Communication Systems
- **Radio Channels**: Department and incident-specific frequencies
- **Text Messaging**: Silent communication options
- **Status Updates**: Unit and incident progress tracking
- **Broadcast Messages**: Department-wide announcements
- **Inter-Agency**: Communication between different services
- **Command Structure**: Chain of command protocols

---

## Priority System

### Priority Levels
- **Priority 1**: Life-threatening emergencies requiring immediate response
- **Priority 2**: Serious incidents with potential for escalation
- **Priority 3**: Non-urgent matters requiring timely response
- **Priority 4**: Routine calls with no time constraints
- **Priority 5**: Administrative and follow-up matters

### Response Times
- **Code 3**: Emergency response with lights and sirens
- **Code 2**: Urgent response without emergency equipment
- **Code 1**: Routine response at normal traffic speeds
- **Hold**: Place incident in queue for later response
- **Refer**: Transfer to appropriate department or service

### Escalation Procedures
- **Automatic Escalation**: Time-based priority increases
- **Manual Override**: Dispatcher priority adjustments
- **Supervisor Review**: Management oversight of high-priority calls
- **Resource Allocation**: Additional units for complex incidents
- **Mutual Aid**: Request assistance from other agencies

---

## Core Components

### Dispatch Console
- Real-time incident monitoring
- Unit status dashboard
- Map-based coordination
- Communication interfaces
- Reporting and analytics

### Mobile Data Terminals
- In-vehicle computer systems
- Incident details and updates
- Navigation and GPS routing
- Database access and queries
- Report writing and submission

### GPS Tracking
- Real-time unit locations
- Automatic vehicle location (AVL)
- Closest unit calculation
- Response time monitoring
- Coverage area analysis

---

## Integration Features

### Framework Compatibility
Integrates with player job systems to identify emergency service personnel.

### Phone System Integration
Connects with phone modules for realistic 911 calling experience.

### Vehicle Systems
Emergency vehicle identification, equipment access, and performance tracking.

### Map Integration
Blip management for incidents, units, and facilities on the player map.

---

## Common Use Cases

### Emergency Response
- Realistic 911 call handling
- Multi-unit coordination
- Emergency service roleplay
- Crisis management scenarios

### Law Enforcement
- Crime response coordination
- Traffic enforcement support
- Investigation case management
- Officer safety monitoring

### Training Scenarios
- Emergency response training
- Dispatcher certification
- Multi-agency exercises
- Performance evaluation

---

## Quick Start

```lua
-- Create a 911 call
Bridge.Dispatch.Create911Call(source, {
    type = 'robbery',
    location = GetEntityCoords(PlayerPedId()),
    description = 'Armed robbery in progress at convenience store',
    priority = 1,
    caller = {
        name = 'Anonymous',
        phone = 'Unknown'
    }
})

-- Assign unit to incident
Bridge.Dispatch.AssignUnit(incidentId, unitId, 'primary')

-- Update unit status
Bridge.Dispatch.SetUnitStatus(unitId, 'responding')

-- Send dispatch message
Bridge.Dispatch.SendDispatchMessage(unitId, 'Respond to 123 Main St for armed robbery call')

-- Check available units
local availableUnits = Bridge.Dispatch.GetAvailableUnits('police')
```

---

## Advanced Features

### Predictive Analytics
AI-powered incident prediction based on historical data and current patterns.

### Resource Optimization
Automatic unit deployment suggestions for optimal coverage and response times.

### Training Integration
Built-in scenarios and simulations for emergency service training.

### Performance Metrics
Comprehensive analytics for response times, resolution rates, and service quality.

---

## 📚 Client Functions

- [Send911Call](client/Send911Call.md) - Send a 911 call to dispatch

## 📚 Server Functions

- [RegisterUnit](server/RegisterUnit.md) - Register a new emergency unit for dispatch
- [SendDispatchMessage](server/SendDispatchMessage.md) - Send a dispatch message to all units

## 📚 Shared Functions

- [GetUnitStatus](shared/GetUnitStatus.md) - Get the status of a dispatch unit
- [GetActiveCalls](shared/GetActiveCalls.md) - Get a list of active dispatch calls

---
