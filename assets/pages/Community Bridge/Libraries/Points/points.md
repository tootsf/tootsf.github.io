# Points 📍

<!--META
nav: true
toc: true
description: The Points library provides an efficient grid-based proximity detection system for 3D coordinates and entities. It uses spatial partitioning to optimize performance when tracking many points, with support for enter/exit/nearby callbacks.
-->

The Points library provides an efficient grid-based proximity detection system for 3D coordinates and entities. It uses spatial partitioning to optimize performance when tracking many points, with support for enter/exit/nearby callbacks.

## Overview

The Points library provides coordinate management and spatial calculations for handling multiple points, distance calculations, and area-based operations in 3D space.

## New (Client)

### Description
Creates a new point with proximity detection callbacks. The point uses a grid-based system for efficient distance checking and supports both static coordinates and dynamic entity tracking.

### Syntax
```lua
Point.New(id, coords, distance, onEnter, onExit, onNearby, args)
```

### Parameters
- **id** (string): Unique identifier for the point
- **coords** (vector3 | number): 3D coordinates for the point, or entity handle for dynamic tracking
- **distance** (number): Trigger distance for proximity detection
- **onEnter** (function | nil): Callback when player enters the point area (point, data) -> data
- **onExit** (function | nil): Callback when player exits the point area (point, data) -> data
- **onNearby** (function | nil): Callback while player is near the point (point, data) -> data
- **args** (table | nil): Initial data to pass to callbacks

### Returns
- (table): The created point object

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Static point at coordinates
local shopPoint = Point.New(
    "shop_entrance",
    vector3(25.7, -1347.3, 29.5),
    3.0,
    function(point, data)
        print("Entered shop area")
        data.enterTime = GetGameTimer()
        return data
    end,
    function(point, data)
        local duration = GetGameTimer() - (data.enterTime or 0)
        print("Left shop area after " .. duration .. "ms")
        return data
    end,
    nil,
    { shopName = "24/7 Store" }
)

-- Dynamic point following a vehicle
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
if vehicle ~= 0 then
    local carPoint = Point.New(
        "my_car",
        vehicle,
        5.0,
        function(point, data)
            print("Near my car")
            return data
        end
    )
end
```

## Remove (Client)

### Description
Removes an existing point by its ID and cleans up all associated grid references.

### Syntax
```lua
Point.Remove(id)
```

### Parameters
- **id** (string): ID of the point to remove

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Remove the shop point
Point.Remove("shop_entrance")
print("Shop point removed")

-- Remove all vehicle points
local allPoints = Point.GetAll()
for pointId, point in pairs(allPoints) do
    if point.isEntity then
        Point.Remove(pointId)
    end
end
```

## Get (Client)

### Description
Retrieves a point by its ID.

### Syntax
```lua
Point.Get(id)
```

### Parameters
- **id** (string): ID of the point to retrieve

### Returns
- (table): The point object or nil if not found

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local shopPoint = Point.Get("shop_entrance")
if shopPoint then
    print("Shop point distance: " .. shopPoint.distance)
    print("Player inside: " .. tostring(shopPoint.inside))
    print("Coordinates: " .. tostring(shopPoint.coords))
else
    print("Shop point not found")
end
```

## UpdateCoords (Client)

### Description
Updates the coordinates of an existing point and refreshes its grid position.

### Syntax
```lua
Point.UpdateCoords(id, coords)
```

### Parameters
- **id** (string): ID of the point to update
- **coords** (vector3): New coordinates for the point

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

-- Move shop entrance to new location
local newCoords = vector3(30.0, -1350.0, 29.5)
Point.UpdateCoords("shop_entrance", newCoords)
print("Shop entrance moved to new location")

-- Update point based on player interaction
local playerCoords = GetEntityCoords(PlayerPedId())
Point.UpdateCoords("meeting_point", playerCoords)
print("Meeting point set to player location")
```

## GetAll (Client)

### Description
Returns all active points in the system.

### Syntax
```lua
Point.GetAll()
```

### Returns
- (table): Table containing all active points with their IDs as keys

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local allPoints = Point.GetAll()
print("Total active points: " .. table.getn(allPoints))

for pointId, point in pairs(allPoints) do
    local status = point.inside and "INSIDE" or "OUTSIDE"
    print(string.format("%s: %s (%.1fm)", pointId, status, point.distance))
end

-- Count points by type
local staticPoints = 0
local entityPoints = 0
for _, point in pairs(allPoints) do
    if point.isEntity then
        entityPoints = entityPoints + 1
    else
        staticPoints = staticPoints + 1
    end
end
print("Static: " .. staticPoints .. ", Entity: " .. entityPoints)
```

