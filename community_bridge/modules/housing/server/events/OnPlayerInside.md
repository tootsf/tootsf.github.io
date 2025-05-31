---
layout: default
title: "OnPlayerInside"
parent: Events
grand_parent: Server
great_grand_parent: "🏠 Housing"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/housing/server/events/OnPlayerInside/
---

# OnPlayerInside
{: .no_toc }

Server
{: .label .label-green }

Triggered when a player enters or exits a property.

## Event Name

```
community_bridge:Client:OnPlayerInside
```

## Description

This event is triggered when a player enters or exits a property. It provides information about the player's location, routing bucket, and property state.

## Parameters

- `playerId` (number) - The server ID of the player
- `inside` (boolean) - Whether the player is inside (true) or outside (false) a property
- `coords` (vector3) - The player's current coordinates
- `routingBucket` (number) - The player's current routing bucket

## Example

```lua
RegisterNetEvent('community_bridge:Client:OnPlayerInside', function(playerId, inside, coords, routingBucket)
    local playerName = GetPlayerName(playerId)
    
    if inside then
        print(playerName .. " entered a property at " .. tostring(coords))
        print("Routing bucket: " .. routingBucket)
    else
        print(playerName .. " exited a property at " .. tostring(coords))
    end
end)
```

## Supported Housing Systems

This event works with the following housing systems:
- qb-houses
- qb-appartments
- ps-housing
- bcs-housing
- esx_property

## Notes

- The event is triggered on the server side
- Coordinates are provided as vector3 objects
- Routing bucket information is useful for instanced properties
- The event fires for both entry and exit
