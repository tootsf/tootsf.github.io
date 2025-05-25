---
layout: default
title: Vehicle
parent: Modules
grand_parent: Community Bridge
nav_order: 7
has_children: true
---

# Vehicle Module
{: .no_toc }

The Vehicle module provides comprehensive vehicle management including spawning, modification, ownership, damage system, and advanced vehicle operations for FiveM servers.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Vehicle module offers a complete vehicle management system with support for vehicle spawning, customization, ownership tracking, damage simulation, and integration with various vehicle-related resources.

### Key Features

- **Vehicle Spawning**: Smart spawning with collision detection and positioning
- **Vehicle Customization**: Full modification support (engine, brakes, suspension, etc.)
- **Ownership System**: Track vehicle ownership and permissions
- **Damage System**: Realistic damage simulation and repair mechanics
- **Fuel System**: Fuel consumption and refueling mechanics
- **Lock System**: Vehicle locking and key management
- **Impound System**: Vehicle impounding and retrieval
- **Garage Integration**: Personal and public garage management

## Architecture

```
Vehicle Module
├── Client Functions    → Vehicle spawning, modification, local operations
├── Server Functions    → Ownership, database, synchronization, permissions
└── Shared Functions    → Vehicle data, validation, calculations
```

## Vehicle Categories

### Personal Vehicles
- Player-owned vehicles with persistent modifications
- Insurance and registration system
- Fuel and damage persistence
- Key and lock management

### Rental Vehicles
- Temporary vehicle access
- Time-based or distance-based pricing
- Automatic return system
- Usage tracking and billing

### Emergency Vehicles
- Police, fire, and medical vehicles
- Restricted access based on job/rank
- Special equipment and modifications
- Emergency lighting and sirens

### Commercial Vehicles
- Delivery and transport vehicles
- Business-owned fleet management
- Route tracking and optimization
- Cargo and trailer support

## Quick Start

### Basic Vehicle Spawning

```lua
-- Client Side
local vehicle = exports.community_bridge:SpawnVehicle({
    model = "adder",
    coords = vector3(100.0, 200.0, 30.0),
    heading = 90.0,
    plate = "CB12345",
    engine = true,
    fuel = 100
})

if vehicle then
    SetPedIntoVehicle(PlayerPedId(), vehicle, -1)
end
```

### Vehicle Modification

```lua
-- Client Side
local success = exports.community_bridge:ModifyVehicle(vehicle, {
    engine = 3,           -- Engine upgrade level (0-4)
    brakes = 2,           -- Brake upgrade level (0-3)
    transmission = 2,     -- Transmission upgrade level (0-3)
    suspension = 1,       -- Suspension upgrade level (0-4)
    armor = 4,           -- Armor level (0-5)
    turbo = true,        -- Turbo installation
    primaryColor = {255, 0, 0},    -- RGB color
    secondaryColor = {0, 0, 255},  -- RGB color
    wheels = {
        type = 1,        -- Wheel type
        index = 10,      -- Wheel index
        color = 12       -- Wheel color
    }
})
```

### Ownership Management

```lua
-- Server Side
exports.community_bridge:SetVehicleOwner(vehicleId, playerId, {
    ownerType = "player",
    permissions = {"drive", "modify", "sell"},
    insurance = {
        active = true,
        provider = "Los Santos Insurance",
        policy = "FULL_COVERAGE",
        expires = os.time() + (30 * 24 * 60 * 60) -- 30 days
    }
})
```

## Vehicle Systems

### Fuel System
- Realistic fuel consumption based on vehicle type and driving style
- Multiple fuel types (gasoline, diesel, electric)
- Fuel station integration
- Emergency fuel delivery

### Damage System
- Component-based damage (engine, transmission, body, etc.)
- Realistic damage effects on performance
- Repair mechanics and costs
- Insurance claim system

### Lock System
- Vehicle locking with key management
- Remote locking/unlocking
- Alarm system integration
- Anti-theft protection

### Impound System
- Automatic impounding for violations
- Manual impounding by law enforcement
- Impound fees and retrieval process
- Storage time limits

## Advanced Features

### Vehicle Tracking

```lua
-- Server Side
local vehicleData = exports.community_bridge:GetVehicleData(vehicleId)
local tracking = exports.community_bridge:TrackVehicle(vehicleId, {
    gps = true,
    theft = true,
    maintenance = true,
    location = true
})
```

### Fleet Management

```lua
-- Server Side
local fleet = exports.community_bridge:CreateFleet({
    name = "Taxi Company Fleet",
    owner = "company_123",
    vehicles = {"taxi1", "taxi2", "taxi3"},
    permissions = {
        drivers = {"player1", "player2"},
        managers = {"player3"},
        maintenance = {"mechanic1"}
    }
})
```

### Vehicle Sharing

```lua
-- Client Side
exports.community_bridge:ShareVehicle(vehicleId, {
    sharedWith = "player123",
    permissions = {"drive"},
    duration = 3600, -- 1 hour
    conditions = {
        maxDistance = 5000,
        returnLocation = vector3(100, 200, 30)
    }
})
```

## Integration Examples

### Garage System Integration

```lua
-- Server Side
RegisterServerEvent('garage:storeVehicle')
AddEventHandler('garage:storeVehicle', function(vehicleId, garageId)
    local vehicleData = exports.community_bridge:GetVehicleData(vehicleId)
    if vehicleData then
        exports.community_bridge:StoreVehicleInGarage(vehicleId, garageId, {
            position = 1,
            stored = true,
            damage = vehicleData.damage,
            fuel = vehicleData.fuel,
            modifications = vehicleData.modifications
        })
    end
end)
```

### Insurance System Integration

```lua
-- Server Side
exports.community_bridge:ProcessInsuranceClaim(vehicleId, {
    claimType = "collision",
    damage = damageData,
    location = crashLocation,
    witnesses = witnessPlayers,
    photos = evidencePhotos
})
```

## Module Files

- **[Client Functions](client.md)**: Vehicle spawning, modification, local operations
- **[Server Functions](server.md)**: Ownership, database operations, synchronization
- **[Shared Functions](shared.md)**: Vehicle data, validation, utility functions

## Best Practices

### 1. Performance Optimization
```lua
-- Use vehicle pools to limit spawned vehicles
-- Clean up unused vehicles regularly
-- Optimize vehicle streaming and LOD
```

### 2. Data Persistence
```lua
-- Save vehicle modifications to database
-- Track ownership and insurance data
-- Maintain fuel and damage states
```

### 3. Security
```lua
-- Validate vehicle spawning permissions
-- Prevent vehicle duplication exploits
-- Secure ownership transfers
```

### 4. User Experience
```lua
-- Provide clear vehicle status information
-- Smooth vehicle entry/exit animations
-- Responsive modification interfaces
```

---

The Vehicle module provides comprehensive vehicle management capabilities for your FiveM server, supporting everything from basic spawning to advanced fleet management and tracking systems.
