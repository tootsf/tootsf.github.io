# Shells 🏠

<!--META
nav: true
toc: true
description: The Shells library provides a comprehensive system for managing MLO (Map Location Object) shells and interiors with seamless transitions, routing bucket management, and interactive object placement. Supports both exterior and interior configurations with automatic entity management.
-->

The Shells library provides a comprehensive system for managing MLO (Map Location Object) shells and interiors with seamless transitions, routing bucket management, and interactive object placement. Supports both exterior and interior configurations with automatic entity management.

## Overview

The Shells provides functionality for FiveM resources.

## Client Functions

### New

<!--TOC: New-->

**Context:** 🖥️ Client

Creates a new shell instance with exterior and interior configurations, setting up entity management and interaction points.

**Syntax:** `Bridge.Shells.New(data)`

**Parameters:**
- `data` (table) - Shell configuration with id, model, coords, exterior/interior objects

**Returns:**
- (table) - Created shell instance with spawned entity tracking

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a new shell with interactive elements
local shell = Bridge.Shells.New({
    id = 'apartment_1',
    model = 'shell_apartment1',
    coords = vector3(100, 200, 30),
    exterior = {
        entrance = {
            id = 'front_door',
            type = 'entrance',
            coords = vector3(100, 200, 30),
            rotation = vector3(0, 0, 0),
            distance = 2.0
        }
    },
    interior = {
        exit = {
            id = 'exit_door',
            type = 'exit',
            coords = vector3(0, 0, 0),
            rotation = vector3(0, 0, 180),
            distance = 2.0
        },
        stash = {
            id = 'apartment_stash',
            type = 'stash',
            coords = vector3(2, 2, 0),
            rotation = vector3(0, 0, 0),
            distance = 1.5
        }
    }
})

print('Shell created: ' .. shell.id)
```

### Enter

<!--TOC: Enter-->

**Context:** 🖥️ Client

Enters a shell interior, handling screen fade, entity teleportation, and interior object spawning.

**Syntax:** `Bridge.Shells.Enter(id, entranceId)`

**Parameters:**
- `id` (string) - Shell identifier
- `entranceId` (string) - Entrance point identifier within the shell

**Returns:** None

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Enter apartment through front door
Bridge.Shells.Enter('apartment_1', 'front_door')
print('Entering apartment...')
```

### Exit

<!--TOC: Exit-->

**Context:** 🖥️ Client

Exits a shell interior, returning to the exterior with proper cleanup and entity management.

**Syntax:** `Bridge.Shells.Exit(id, exitId)`

**Parameters:**
- `id` (string) - Shell identifier
- `exitId` (string) - Exit point identifier within the shell

**Returns:** None

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Exit apartment through exit door
Bridge.Shells.Exit('apartment_1', 'exit_door')
print('Exiting apartment...')
```

### Inside

<!--TOC: Inside-->

**Context:** 🖥️ Client

Checks if the player is currently inside a shell and returns the shell ID.

**Syntax:** `Bridge.Shells.Inside()`

**Parameters:** None

**Returns:**
- (string | boolean) - Shell ID if inside a shell, false if outside

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local currentShell = Bridge.Shells.Inside()
if currentShell then
    print('Currently inside shell: ' .. currentShell)
    Bridge.Framework.Notify('You are inside: ' .. currentShell, 'info')
else
    print('Currently outside all shells')
end
```

### SetupInterior

<!--TOC: SetupInterior-->

**Context:** 🖥️ Client

Sets up all interior objects and interaction points for a shell.

**Syntax:** `Bridge.Shells.SetupInterior(shell)`

**Parameters:**
- `shell` (table) - Shell instance to set up interior for

**Returns:** None

**Example:**
```lua
-- Internal function - called automatically during shell transitions
local Bridge = exports['community_bridge']:Bridge()
local shell = Bridge.Shells.All['apartment_1']
Bridge.Shells.SetupInterior(shell)
```

### SetupExterior

<!--TOC: SetupExterior-->

**Context:** 🖥️ Client

Sets up all exterior objects and interaction points for a shell.

**Syntax:** `Bridge.Shells.SetupExterior(shell)`

**Parameters:**
- `shell` (table) - Shell instance to set up exterior for

**Returns:** None

**Example:**
```lua
-- Internal function - called automatically during shell transitions
local Bridge = exports['community_bridge']:Bridge()
local shell = Bridge.Shells.All['apartment_1']
Bridge.Shells.SetupExterior(shell)
```

### ClearInterior

<!--TOC: ClearInterior-->

**Context:** 🖥️ Client

Removes all interior entities and interaction points for a shell.

**Syntax:** `Bridge.Shells.ClearInterior(shell)`

**Parameters:**
- `shell` (table) - Shell instance to clear interior for

**Returns:** None

**Example:**
```lua
-- Internal function - called automatically during shell transitions
local Bridge = exports['community_bridge']:Bridge()
local shell = Bridge.Shells.All['apartment_1']
Bridge.Shells.ClearInterior(shell)
```

### ClearExterior

<!--TOC: ClearExterior-->

**Context:** 🖥️ Client

Removes all exterior entities and interaction points for a shell.

**Syntax:** `Bridge.Shells.ClearExterior(shell)`

**Parameters:**
- `shell` (table) - Shell instance to clear exterior for

**Returns:** None

**Example:**
```lua
-- Internal function - called automatically during shell transitions
local Bridge = exports['community_bridge']:Bridge()
local shell = Bridge.Shells.All['apartment_1']
Bridge.Shells.ClearExterior(shell)
```

### Event.Add

<!--TOC: Event.Add-->

**Context:** 🖥️ Client

Adds an event callback for shell lifecycle events (OnSpawn, OnRemove).

**Syntax:** `Bridge.Shells.Event.Add(eventName, callback)`

**Parameters:**
- `eventName` (string) - Event name ('OnSpawn' or 'OnRemove')
- `callback` (function) - Callback function to execute on event

**Returns:** None

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Add spawn event listener
Bridge.Shells.Event.Add('OnSpawn', function(objectData, entity)
    print('Shell object spawned: ' .. objectData.id)
    print('Entity handle: ' .. entity)
    
    -- Custom logic for spawned objects
    if objectData.type == 'stash' then
        print('Stash object is now available')
    end
end)

-- Add remove event listener
Bridge.Shells.Event.Add('OnRemove', function(objectData, entity)
    print('Shell object removed: ' .. objectData.id)
    
    -- Cleanup custom data
    if objectData.type == 'stash' then
        print('Stash object removed')
    end
end)
```

## Server Functions

### New

<!--TOC: New-->

**Context:** 🖲️ Server

Creates a new shell on the server with routing bucket management and interaction point configuration.

**Syntax:** `Bridge.Shells.New(data)`

**Parameters:**
- `data` (table) - Shell configuration with id, model, coords, interior/exterior objects, and bucket settings

**Returns:**
- (table) - Created shell instance with bucket and interaction data

**Example:**
```lua
-- Server-side shell creation
local Bridge = exports['community_bridge']:Bridge()

local shell = Bridge.Shells.New({
    id = 'apartment_complex_1',
    model = 'shell_apartment1',
    coords = vector3(200, 300, 50),
    bucket = 1001, -- Custom routing bucket
    interior = {
        {
            type = 'exit',
            id = 'main_exit',
            offset = vector3(0, 0, 0)
        },
        {
            type = 'stash',
            id = 'personal_stash',
            offset = vector3(2, 2, 0),
            distance = 1.5
        }
    },
    exterior = {
        {
            type = 'entrance',
            id = 'main_entrance',
            offset = vector3(0, 0, 0)
        }
    }
})

print('Server shell created with bucket: ' .. shell.bucket)
```

### Interactable.New

<!--TOC: Interactable.New-->

**Context:** 🖲️ Server

Creates a new interaction point configuration for shells with type, positioning, and metadata.

**Syntax:** `Bridge.Shells.Interactable.New(type, id, model, coords, rotation, entityType, distance, meta)`

**Parameters:**
- `type` (string) - Interaction type (entrance, exit, stash, etc.)
- `id` (string) - Unique identifier for the interaction
- `model` (string | nil) - Model to spawn for the interaction (optional)
- `coords` (vector3) - World coordinates for the interaction
- `rotation` (vector3 | nil) - Rotation vector (default: 0,0,0)
- `entityType` (string | nil) - Entity type (object, ped, vehicle - default: object)
- `distance` (number | nil) - Interaction distance (default: 2.0)
- `meta` (table | nil) - Additional metadata for the interaction

**Returns:**
- (table) - Configured interaction object

**Example:**
```lua
-- Server-side interaction creation
local Bridge = exports['community_bridge']:Bridge()

local doorInteraction = Bridge.Shells.Interactable.New(
    'entrance',
    'apartment_door',
    'prop_door_01',
    vector3(100, 200, 30),
    vector3(0, 0, 90),
    'object',
    2.5,
    {
        requiresKey = true,
        keyId = 'apartment_key_1'
    }
)

print('Door interaction created: ' .. doorInteraction.id)
```

