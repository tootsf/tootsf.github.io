---
layout: default
title: Server Functions
parent: Vehicle
grand_parent: Modules
nav_order: 2
---

# Vehicle Server Functions
{: .no_toc }

Server-side vehicle management functions for ownership, database operations, and synchronization.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Vehicle Ownership

### SetVehicleOwner

Sets the owner of a vehicle with ownership permissions and insurance data.

**Syntax:**
```lua
local success = exports.community_bridge:SetVehicleOwner(vehicleId, playerId, ownershipData)
```

**Parameters:**
- `vehicleId` (string): Unique vehicle identifier
- `playerId` (string): Player identifier
- `ownershipData` (table): Ownership configuration
  - `ownerType` (string): Type of ownership ("player", "company", "government")
  - `permissions` (table): List of permissions ("drive", "modify", "sell", "transfer")
  - `insurance` (table): Insurance information
  - `registration` (table): Registration details
  - `purchaseDate` (number): Purchase timestamp
  - `purchasePrice` (number): Purchase price

**Returns:**
- `success` (boolean): Whether ownership was set successfully

**Example:**
```lua
local success = exports.community_bridge:SetVehicleOwner("VEH_001", "player123", {
    ownerType = "player",
    permissions = {"drive", "modify", "sell"},
    insurance = {
        active = true,
        provider = "Los Santos Insurance",
        policy = "FULL_COVERAGE",
        premium = 250,
        deductible = 500,
        expires = os.time() + (30 * 24 * 60 * 60) -- 30 days
    },
    registration = {
        state = "San Andreas",
        expires = os.time() + (365 * 24 * 60 * 60), -- 1 year
        fees = 150
    },
    purchaseDate = os.time(),
    purchasePrice = 50000
})

if success then
    exports.community_bridge:SendNotify(playerId, "Vehicle ownership registered successfully", "success")
end
```

### GetVehicleOwner

Retrieves the owner information of a vehicle.

**Syntax:**
```lua
local ownerData = exports.community_bridge:GetVehicleOwner(vehicleId)
```

**Parameters:**
- `vehicleId` (string): Unique vehicle identifier

**Returns:**
- `ownerData` (table): Owner information or `nil` if not found
  - `playerId` (string): Owner player identifier
  - `ownerType` (string): Type of ownership
  - `permissions` (table): Current permissions
  - `insurance` (table): Insurance details
  - `registration` (table): Registration information

**Example:**
```lua
local ownerData = exports.community_bridge:GetVehicleOwner("VEH_001")
if ownerData then
    print("Vehicle owned by:", ownerData.playerId)
    print("Insurance active:", ownerData.insurance.active)
else
    print("Vehicle has no registered owner")
end
```

### TransferVehicleOwnership

Transfers vehicle ownership from one player to another.

**Syntax:**
```lua
local success = exports.community_bridge:TransferVehicleOwnership(vehicleId, fromPlayerId, toPlayerId, transferData)
```

**Parameters:**
- `vehicleId` (string): Unique vehicle identifier
- `fromPlayerId` (string): Current owner player identifier
- `toPlayerId` (string): New owner player identifier
- `transferData` (table): Transfer configuration
  - `price` (number): Sale price (optional)
  - `transferType` (string): Type of transfer ("sale", "gift", "inheritance")
  - `fees` (number): Transfer fees
  - `conditions` (table): Transfer conditions

**Returns:**
- `success` (boolean): Whether transfer was successful

**Example:**
```lua
local success = exports.community_bridge:TransferVehicleOwnership("VEH_001", "player123", "player456", {
    price = 35000,
    transferType = "sale",
    fees = 500,
    conditions = {
        inspection = true,
        insurance = true
    }
})

if success then
    exports.community_bridge:SendNotify("player123", "Vehicle sold successfully", "success")
    exports.community_bridge:SendNotify("player456", "Vehicle purchased successfully", "success")
end
```

## Vehicle Database Operations

### SaveVehicleData

Saves vehicle data to the database including modifications, damage, and status.

**Syntax:**
```lua
local success = exports.community_bridge:SaveVehicleData(vehicleId, vehicleData)
```

**Parameters:**
- `vehicleId` (string): Unique vehicle identifier
- `vehicleData` (table): Complete vehicle data
  - `model` (string): Vehicle model
  - `plate` (string): License plate
  - `position` (table): Last known position
  - `fuel` (number): Fuel level
  - `health` (number): Vehicle health
  - `modifications` (table): Applied modifications
  - `damage` (table): Current damage state
  - `status` (string): Vehicle status ("active", "stored", "impounded")

**Returns:**
- `success` (boolean): Whether data was saved successfully

**Example:**
```lua
local success = exports.community_bridge:SaveVehicleData("VEH_001", {
    model = "adder",
    plate = "SPEED01",
    position = {x = 100.0, y = 200.0, z = 30.0, heading = 90.0},
    fuel = 75,
    health = 900,
    modifications = {
        engine = 3,
        brakes = 2,
        primaryColor = {255, 0, 0}
    },
    damage = {
        engine = 100,
        body = 50
    },
    status = "active"
})
```

### LoadVehicleData

Loads vehicle data from the database.

**Syntax:**
```lua
local vehicleData = exports.community_bridge:LoadVehicleData(vehicleId)
```

**Parameters:**
- `vehicleId` (string): Unique vehicle identifier

**Returns:**
- `vehicleData` (table): Vehicle data or `nil` if not found

**Example:**
```lua
local vehicleData = exports.community_bridge:LoadVehicleData("VEH_001")
if vehicleData then
    print("Vehicle model:", vehicleData.model)
    print("Fuel level:", vehicleData.fuel)
    print("Status:", vehicleData.status)
end
```

### DeleteVehicleData

Removes vehicle data from the database.

**Syntax:**
```lua
local success = exports.community_bridge:DeleteVehicleData(vehicleId)
```

**Parameters:**
- `vehicleId` (string): Unique vehicle identifier

**Returns:**
- `success` (boolean): Whether deletion was successful

**Example:**
```lua
local success = exports.community_bridge:DeleteVehicleData("VEH_001")
if success then
    print("Vehicle data deleted successfully")
end
```

## Vehicle Fleet Management

### CreateFleet

Creates a new vehicle fleet for organization management.

**Syntax:**
```lua
local fleetId = exports.community_bridge:CreateFleet(fleetData)
```

**Parameters:**
- `fleetData` (table): Fleet configuration
  - `name` (string): Fleet name
  - `owner` (string): Fleet owner identifier
  - `ownerType` (string): Owner type ("player", "company", "government")
  - `vehicles` (table): List of vehicle IDs
  - `permissions` (table): Access permissions
  - `settings` (table): Fleet settings

**Returns:**
- `fleetId` (string): Unique fleet identifier or `nil` if failed

**Example:**
```lua
local fleetId = exports.community_bridge:CreateFleet({
    name = "Downtown Taxi Company",
    owner = "company_123",
    ownerType = "company",
    vehicles = {"TAX_001", "TAX_002", "TAX_003"},
    permissions = {
        drivers = {"player1", "player2", "player3"},
        managers = {"player4"},
        maintenance = {"mechanic1", "mechanic2"}
    },
    settings = {
        tracking = true,
        maintenance = true,
        fuelCards = true,
        insurance = "FLEET_COVERAGE"
    }
})

if fleetId then
    print("Fleet created with ID:", fleetId)
end
```

### AddVehicleToFleet

Adds a vehicle to an existing fleet.

**Syntax:**
```lua
local success = exports.community_bridge:AddVehicleToFleet(fleetId, vehicleId, roleData)
```

**Parameters:**
- `fleetId` (string): Fleet identifier
- `vehicleId` (string): Vehicle identifier
- `roleData` (table): Vehicle role in fleet
  - `role` (string): Vehicle role ("taxi", "delivery", "patrol")
  - `permissions` (table): Usage permissions
  - `restrictions` (table): Usage restrictions

**Returns:**
- `success` (boolean): Whether vehicle was added successfully

**Example:**
```lua
local success = exports.community_bridge:AddVehicleToFleet("FLEET_001", "VEH_004", {
    role = "delivery",
    permissions = {"drive", "load_cargo"},
    restrictions = {
        maxDistance = 50000,
        timeLimit = 28800 -- 8 hours
    }
})
```

## Vehicle Tracking and Analytics

### TrackVehicle

Enables tracking for a vehicle with various monitoring options.

**Syntax:**
```lua
local trackingId = exports.community_bridge:TrackVehicle(vehicleId, trackingConfig)
```

**Parameters:**
- `vehicleId` (string): Vehicle identifier
- `trackingConfig` (table): Tracking configuration
  - `gps` (boolean): GPS location tracking
  - `theft` (boolean): Anti-theft monitoring
  - `maintenance` (boolean): Maintenance tracking
  - `usage` (boolean): Usage analytics
  - `fuel` (boolean): Fuel consumption tracking
  - `speed` (boolean): Speed monitoring
  - `route` (boolean): Route tracking

**Returns:**
- `trackingId` (string): Tracking session identifier

**Example:**
```lua
local trackingId = exports.community_bridge:TrackVehicle("VEH_001", {
    gps = true,
    theft = true,
    maintenance = true,
    usage = true,
    fuel = true,
    speed = true,
    route = false
})

if trackingId then
    print("Vehicle tracking enabled:", trackingId)
end
```

### GetVehicleAnalytics

Retrieves analytics data for a vehicle or fleet.

**Syntax:**
```lua
local analytics = exports.community_bridge:GetVehicleAnalytics(vehicleId, timeRange)
```

**Parameters:**
- `vehicleId` (string): Vehicle identifier
- `timeRange` (table): Time range for analytics
  - `startTime` (number): Start timestamp
  - `endTime` (number): End timestamp

**Returns:**
- `analytics` (table): Analytics data
  - `distance` (number): Total distance traveled
  - `fuelConsumed` (number): Fuel consumption
  - `averageSpeed` (number): Average speed
  - `trips` (number): Number of trips
  - `maintenance` (table): Maintenance events
  - `violations` (table): Traffic violations

**Example:**
```lua
local analytics = exports.community_bridge:GetVehicleAnalytics("VEH_001", {
    startTime = os.time() - (7 * 24 * 60 * 60), -- Last 7 days
    endTime = os.time()
})

if analytics then
    print("Distance traveled:", analytics.distance .. " km")
    print("Fuel consumed:", analytics.fuelConsumed .. " liters")
    print("Average speed:", analytics.averageSpeed .. " km/h")
end
```

## Vehicle Impound System

### ImpoundVehicle

Impounds a vehicle and removes it from active use.

**Syntax:**
```lua
local success = exports.community_bridge:ImpoundVehicle(vehicleId, impoundData)
```

**Parameters:**
- `vehicleId` (string): Vehicle identifier
- `impoundData` (table): Impound configuration
  - `reason` (string): Impound reason
  - `location` (string): Impound lot location
  - `officer` (string): Impounding officer
  - `fee` (number): Release fee
  - `duration` (number): Impound duration in seconds
  - `violations` (table): Associated violations

**Returns:**
- `success` (boolean): Whether vehicle was impounded successfully

**Example:**
```lua
local success = exports.community_bridge:ImpoundVehicle("VEH_001", {
    reason = "Illegal parking",
    location = "Central Impound Lot",
    officer = "Officer Johnson",
    fee = 500,
    duration = 24 * 60 * 60, -- 24 hours
    violations = {"parking", "expired_registration"}
})

if success then
    local owner = exports.community_bridge:GetVehicleOwner("VEH_001")
    if owner then
        exports.community_bridge:SendNotify(owner.playerId, "Your vehicle has been impounded", "warning")
    end
end
```

### ReleaseVehicle

Releases a vehicle from impound after fee payment.

**Syntax:**
```lua
local success = exports.community_bridge:ReleaseVehicle(vehicleId, playerId, paymentData)
```

**Parameters:**
- `vehicleId` (string): Vehicle identifier
- `playerId` (string): Player requesting release
- `paymentData` (table): Payment information
  - `amount` (number): Payment amount
  - `method` (string): Payment method
  - `receipt` (string): Receipt number

**Returns:**
- `success` (boolean): Whether vehicle was released successfully

**Example:**
```lua
RegisterServerEvent('impound:releaseVehicle')
AddEventHandler('impound:releaseVehicle', function(vehicleId, paymentAmount)
    local src = source
    local playerMoney = exports.community_bridge:GetMoney(src, "bank")
    
    if playerMoney >= paymentAmount then
        local success = exports.community_bridge:ReleaseVehicle(vehicleId, src, {
            amount = paymentAmount,
            method = "bank",
            receipt = "IMP_" .. os.time()
        })
        
        if success then
            exports.community_bridge:RemoveMoney(src, "bank", paymentAmount)
            exports.community_bridge:SendNotify(src, "Vehicle released successfully", "success")
        end
    else
        exports.community_bridge:SendNotify(src, "Insufficient funds", "error")
    end
end)
```

## Vehicle Synchronization

### SyncVehicleData

Synchronizes vehicle data across all clients.

**Syntax:**
```lua
exports.community_bridge:SyncVehicleData(vehicleId, syncData, targetClients)
```

**Parameters:**
- `vehicleId` (string): Vehicle identifier
- `syncData` (table): Data to synchronize
- `targetClients` (table): Target client IDs (optional, default: all)

**Example:**
```lua
-- Sync vehicle modifications to all clients
exports.community_bridge:SyncVehicleData("VEH_001", {
    modifications = {
        engine = 4,
        primaryColor = {0, 255, 0}
    },
    fuel = 50,
    damage = {
        engine = 200
    }
})
```

### BroadcastVehicleUpdate

Broadcasts a vehicle update to all relevant clients.

**Syntax:**
```lua
exports.community_bridge:BroadcastVehicleUpdate(vehicleId, updateType, updateData)
```

**Parameters:**
- `vehicleId` (string): Vehicle identifier
- `updateType` (string): Type of update ("damage", "fuel", "lock", "modification")
- `updateData` (table): Update data

**Example:**
```lua
-- Broadcast vehicle damage update
exports.community_bridge:BroadcastVehicleUpdate("VEH_001", "damage", {
    component = "engine",
    damage = 500,
    cause = "collision"
})
```

## Best Practices

### Data Validation

```lua
-- Always validate vehicle data before database operations
local function validateVehicleData(vehicleData)
    if not vehicleData.model or not vehicleData.plate then
        return false, "Missing required vehicle data"
    end
    
    if vehicleData.fuel < 0 or vehicleData.fuel > 100 then
        return false, "Invalid fuel level"
    end
    
    return true
end

-- Usage
local isValid, error = validateVehicleData(vehicleData)
if not isValid then
    print("Validation error:", error)
    return
end
```

### Performance Optimization

```lua
-- Batch database operations when possible
local function batchSaveVehicles(vehicles)
    local queries = {}
    for vehicleId, data in pairs(vehicles) do
        table.insert(queries, {
            query = "UPDATE vehicles SET data = ? WHERE id = ?",
            parameters = {json.encode(data), vehicleId}
        })
    end
    
    exports.oxmysql:transaction(queries, function(success)
        if success then
            print("Batch vehicle save completed")
        end
    end)
end
```

### Security

```lua
-- Verify ownership before allowing operations
local function verifyVehicleOwnership(playerId, vehicleId)
    local ownerData = exports.community_bridge:GetVehicleOwner(vehicleId)
    if not ownerData then
        return false, "Vehicle has no registered owner"
    end
    
    if ownerData.playerId ~= playerId then
        return false, "Player is not the vehicle owner"
    end
    
    return true
end
```

---

These server functions provide comprehensive vehicle management capabilities including ownership tracking, database operations, fleet management, and synchronization systems.
