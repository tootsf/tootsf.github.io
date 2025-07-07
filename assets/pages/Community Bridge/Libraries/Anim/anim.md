# Anim 🎭

<!--META
nav: true
toc: true
description: The Anim library provides a comprehensive animation management system for entities in FiveM. It handles animation dictionary loading, playback control, and automatic cleanup with support for callbacks and status tracking.
-->

The Anim library provides a comprehensive animation management system for entities in FiveM. It handles animation dictionary loading, playback control, and automatic cleanup with support for callbacks and status tracking.

## Overview

The Anim provides functionality for FiveM resources.

## Client Functions

### RequestDict

<!--TOC: RequestDict-->

**Context:** 🖥️ Client

Requests and loads an animation dictionary with timeout handling.

**Syntax:** `Bridge.Anim.RequestDict(animDict)`

**Parameters:**
- `animDict` (string) - The animation dictionary name to load

**Returns:**
- (boolean) - True if dictionary was loaded successfully, false otherwise

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local success = Bridge.Anim.RequestDict("mp_player_intdrink")
if success then
    print("Animation dictionary loaded successfully")
else
    print("Failed to load animation dictionary")
end
```

### Start

<!--TOC: Start-->

**Context:** 🖥️ Client

Starts the animation update loop that manages all active animations. This is called automatically when playing animations.

**Syntax:** `Bridge.Anim.Start()`

**Parameters:** None

**Returns:** None

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Usually called automatically, but can be called manually
Bridge.Anim.Start()
print("Animation update loop started")
```

### Play

<!--TOC: Play-->

**Context:** 🖥️ Client

Plays an animation on the specified entity with comprehensive control options and callback support.

**Syntax:** `Bridge.Anim.Play(id, entity, animDict, animName, blendIn, blendOut, duration, flag, playbackRate, onComplete)`

**Parameters:**
- `id` (string | nil) - Unique identifier for the animation (auto-generated if nil)
- `entity` (number) - The entity handle to play the animation on
- `animDict` (string) - The animation dictionary name
- `animName` (string) - The animation name within the dictionary
- `blendIn` (number | nil) - Blend in speed (default: 8.0)
- `blendOut` (number | nil) - Blend out speed (default: -8.0)
- `duration` (number | nil) - Animation duration in milliseconds (-1 for natural length, default: -1)
- `flag` (number | nil) - Animation flags (default: 1)
- `playbackRate` (number | nil) - Animation playback rate (default: 0.0)
- `onComplete` (function | nil) - Callback function called when animation completes with (success, reason)

**Returns:**
- (string | nil) - Animation ID if successful, nil if failed

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = PlayerId()
local playerPed = GetPlayerPed(playerId)

local animId = Bridge.Anim.Play(
    "drink_animation",
    playerPed,
    "mp_player_intdrink",
    "loop_bottle",
    8.0,
    -8.0,
    5000,
    49,
    0.0,
    function(success, reason)
        if success then
            print("Animation completed successfully")
        else
            print("Animation failed: " .. reason)
        end
    end
)

print("Playing animation with ID: " .. tostring(animId))
```

### Stop

<!--TOC: Stop-->

**Context:** 🖥️ Client

Stops an active animation by its ID and triggers the completion callback with stopped status.

**Syntax:** `Bridge.Anim.Stop(id)`

**Parameters:**
- `id` (string) - The animation ID to stop

**Returns:**
- (boolean) - True if animation was stopped successfully, false if ID not found

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Play an animation and store the ID
local animId = Bridge.Anim.Play(nil, GetPlayerPed(PlayerId()), "mp_player_intdrink", "loop_bottle")

-- Stop the animation after 3 seconds
SetTimeout(3000, function()
    local stopped = Bridge.Anim.Stop(animId)
    if stopped then
        print("Animation stopped successfully")
    else
        print("Failed to stop animation - ID not found")
    end
end)
```

