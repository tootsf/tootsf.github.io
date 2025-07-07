# Point 📍

<!--META
nav: true
toc: true
description: The Point system provides an efficient grid-based spatial management system for tracking player proximity to locations and entities. It uses spatial partitioning for optimized performance and supports both static coordinate points and dynamic entity tracking with enter/exit callbacks.
-->

The Point system provides an efficient grid-based spatial management system for tracking player proximity to locations and entities. It uses spatial partitioning for optimized performance and supports both static coordinate points and dynamic entity tracking with enter/exit callbacks.

## Overview

The Point provides functionality for FiveM resources.

## Client Functions

### Register

<!--TOC: Register-->

**Context:** 🖥️ Client

Creates a new point that tracks player proximity with enter/exit callbacks. Supports both static coordinates and dynamic entities.

**Syntax:** `Bridge.Point.Register(id, target, distance, args, onEnter, onExit, onNearby)`

**Parameters:**
- `id` (string) - Unique identifier for the point
- `target` (number | vector3) - Entity handle for dynamic tracking or vector3 for static position
- `distance` (number) - Trigger distance for enter/exit events
- `args` (any) - Custom data to pass to callback functions
- `onEnter` (function) - Callback when player enters the point (point, data) -> updatedData
- `onExit` (function) - Callback when player exits the point (point, data) -> updatedData
- `onNearby` (function | nil) - Optional callback for nearby points processing

**Returns:**
- (table) - Point object reference

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Static coordinate point
local shopPoint = Bridge.Point.Register(
    'shop_entrance',
    vector3(100, 200, 20),
    5.0,
    {shopName = 'General Store'},
    function(point, data)
        print('Entered ' .. data.shopName)
        Bridge.Framework.ShowHelpText('Press [E] to shop')
        return data
    end,
    function(point, data)
        print('Left ' .. data.shopName)
        Bridge.Framework.HideHelpText()
        return data
    end
)

-- Dynamic entity tracking
local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
local vehiclePoint = Bridge.Point.Register(
    'my_vehicle',
    vehicle,
    3.0,
    {plate = GetVehicleNumberPlateText(vehicle)},
    function(point, data)
        print('Near vehicle: ' .. data.plate)
        return data
    end,
    function(point, data)
        print('Away from vehicle: ' .. data.plate)
        return data
    end
)
```

### Remove

<!--TOC: Remove-->

**Context:** 🖥️ Client

Removes a point by its ID and cleans up associated resources.

**Syntax:** `Bridge.Point.Remove(id)`

**Parameters:**
- `id` (string) - ID of the point to remove

**Returns:** None

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove a specific point
Bridge.Point.Remove('shop_entrance')
print('Shop entrance point removed')
```

### Get

<!--TOC: Get-->

**Context:** 🖥️ Client

Retrieves a point object by its ID.

**Syntax:** `Bridge.Point.Get(id)`

**Parameters:**
- `id` (string) - ID of the point to retrieve

**Returns:**
- (table | nil) - Point object or nil if not found

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local point = Bridge.Point.Get('shop_entrance')
if point then
    print('Point distance: ' .. point.distance)
    print('Point inside: ' .. tostring(point.inside))
else
    print('Point not found')
end
```

### UpdateCoords

<!--TOC: UpdateCoords-->

**Context:** 🖥️ Client

Updates the coordinates of an existing point and refreshes its grid position.

**Syntax:** `Bridge.Point.UpdateCoords(id, coords)`

**Parameters:**
- `id` (string) - ID of the point to update
- `coords` (vector3) - New coordinates for the point

**Returns:** None

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Move a point to new location
local newLocation = vector3(150, 250, 25)
Bridge.Point.UpdateCoords('shop_entrance', newLocation)
print('Point moved to new location')
```

### GetAll

<!--TOC: GetAll-->

**Context:** 🖥️ Client

Returns all active points in the system.

**Syntax:** `Bridge.Point.GetAll()`

**Parameters:** None

**Returns:**
- (table) - Table of all active points indexed by ID

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local allPoints = Bridge.Point.GetAll()
print('Total active points: ' .. table.getn(allPoints))

for id, point in pairs(allPoints) do
    print('Point ID: ' .. id .. ', Inside: ' .. tostring(point.inside))
end
```

### GetNearbyCells

<!--TOC: GetNearbyCells-->

**Context:** 🖥️ Client

Returns grid cell keys that are near the specified coordinates. Used internally for spatial optimization.

**Syntax:** `Bridge.Point.GetNearbyCells(coords)`

**Parameters:**
- `coords` (vector3) - Coordinates to find nearby cells for

**Returns:**
- (table) - Array of nearby grid cell keys

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get nearby grid cells for optimization
local playerCoords = GetEntityCoords(PlayerPedId())
local nearbyCells = Bridge.Point.GetNearbyCells(playerCoords)
print('Nearby cells: ' .. #nearbyCells)
```

### CheckPointsInSameCell

<!--TOC: CheckPointsInSameCell-->

**Context:** 🖥️ Client

Returns all points in the same grid cell as the specified point for proximity checking.

**Syntax:** `Bridge.Point.CheckPointsInSameCell(point)`

**Parameters:**
- `point` (table) - Point object to check against

**Returns:**
- (table) - Table of nearby points in the same cell

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local myPoint = Bridge.Point.Get('shop_entrance')
if myPoint then
    local nearbyPoints = Bridge.Point.CheckPointsInSameCell(myPoint)
    print('Points in same cell: ' .. table.getn(nearbyPoints))
end
```

