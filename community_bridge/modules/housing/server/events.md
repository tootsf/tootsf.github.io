---
layout: default
title: Events
parent: Server
grand_parent: "🏠 Housing"
great_grand_parent: Modules
nav_order: 2
permalink: /community_bridge/modules/housing/server/events/
---

# Housing Events
{: .no_toc }

Standardized events for property entry and exit detection across multiple housing systems.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## community_bridge:Client:OnPlayerInside

Triggered when a player enters or exits a property, providing unified property interaction detection.

### Event Data

```lua
AddEventHandler('community_bridge:Client:OnPlayerInside', function(src, insideId, currentBucket, playerCoords)
    -- Event handling code
end)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | `number` | Server ID of the player |
| `insideId` | `string` or `nil` | Property identifier when entering, `nil` when exiting |
| `currentBucket` | `number` | Player's current routing bucket |
| `playerCoords` | `vector3` | Player's current coordinates |

### Usage Examples

#### Basic Property Detection

```lua
AddEventHandler('community_bridge:Client:OnPlayerInside', function(src, insideId, currentBucket, playerCoords)
    local playerName = GetPlayerName(src)
    
    if insideId then
        print(playerName .. " entered property: " .. insideId)
        print("Location: " .. playerCoords.x .. ", " .. playerCoords.y .. ", " .. playerCoords.z)
        print("Routing bucket: " .. currentBucket)
    else
        print(playerName .. " left a property")
    end
end)
```

#### Property-Based Economy System

```lua
AddEventHandler('community_bridge:Client:OnPlayerInside', function(src, insideId, currentBucket, playerCoords)
    if insideId then
        -- Player entered property - start utility billing
        TriggerEvent('billing:startPropertyUtilities', src, insideId)
        
        -- Apply property-specific weather/time settings
        TriggerClientEvent('weather:enterProperty', src, insideId)
        
        -- Log property access for security
        TriggerEvent('logs:propertyAccess', src, insideId, 'entered')
    else
        -- Player left property - stop utilities
        TriggerEvent('billing:stopPropertyUtilities', src)
        
        -- Restore normal weather/time
        TriggerClientEvent('weather:exitProperty', src)
        
        -- Log exit
        TriggerEvent('logs:propertyAccess', src, nil, 'exited')
    end
end)
```

#### Routing Bucket Management

```lua
AddEventHandler('community_bridge:Client:OnPlayerInside', function(src, insideId, currentBucket, playerCoords)
    if insideId then
        -- Player is now in a property instance
        print("Player in routing bucket: " .. currentBucket)
        
        -- Set property-specific permissions
        TriggerEvent('permissions:setPropertyAccess', src, insideId, currentBucket)
        
        -- Sync with other players in same property
        TriggerEvent('sync:propertyPlayers', currentBucket, src, 'joined')
    else
        -- Player returned to main world
        print("Player returned to main world (bucket 0)")
        
        -- Remove property permissions
        TriggerEvent('permissions:clearPropertyAccess', src)
        
        -- Update player sync
        TriggerEvent('sync:propertyPlayers', 0, src, 'left')
    end
end)
```

#### Property Security System

```lua
local propertyAlarms = {}

AddEventHandler('community_bridge:Client:OnPlayerInside', function(src, insideId, currentBucket, playerCoords)
    if insideId then
        -- Check if player is authorized for this property
        local isAuthorized = exports['housing_system']:isPlayerAuthorized(src, insideId)
        
        if not isAuthorized then
            -- Trigger security alarm
            propertyAlarms[insideId] = true
            TriggerEvent('security:propertyAlarm', insideId, src, playerCoords)
            
            -- Notify property owner
            local ownerId = exports['housing_system']:getPropertyOwner(insideId)
            if ownerId then
                TriggerEvent('phone:sendAlert', ownerId, 'Security Alert', 'Unauthorized access detected at your property!')
            end
        else
            -- Authorized access - disable alarm if active
            if propertyAlarms[insideId] then
                propertyAlarms[insideId] = nil
                TriggerEvent('security:disableAlarm', insideId)
            end
        end
    end
end)
```

## Internal Events

### community_bridge:Server:_OnPlayerInside

Internal event used by housing integrations to trigger the public event. **Do not listen to this event directly.**

```lua
-- Internal use only - housing integrations trigger this
RegisterNetEvent('community_bridge:Server:_OnPlayerInside', function(src, insideId)
    -- Internal processing - converts to public event
end)
```

## Housing System Integration

Different housing systems trigger the unified event through their specific integration:

### QBCore Integration

```lua
-- qb-houses integration
RegisterNetEvent('qb-houses:server:SetInsideMeta', function(insideId, bool)
    local src = source
    insideId = bool and insideId or nil
    TriggerEvent('community_bridge:Server:_OnPlayerInside', src, insideId)
end)
```

### Custom Integration

To integrate a custom housing system:

```lua
-- In your housing resource
exports['community_bridge']:triggerPropertyEvent(playerId, propertyId or nil)

-- Or trigger the internal event directly
TriggerEvent('community_bridge:Server:_OnPlayerInside', playerId, propertyId or nil)
```

## Best Practices

1. **Always check for nil**: The `insideId` parameter is `nil` when exiting properties
2. **Use routing buckets**: Leverage `currentBucket` for proper player isolation
3. **Coordinate validation**: Use `playerCoords` for location-based features
4. **Performance**: Avoid heavy processing in the event handler
5. **Error handling**: Account for edge cases where players disconnect while in properties

## Troubleshooting

- **Event not firing**: Ensure the housing system is properly detected and integrated
- **Incorrect coordinates**: Some housing systems may have delayed coordinate updates
- **Routing bucket issues**: Verify the housing system properly manages routing buckets
- **Multiple triggers**: Some systems may trigger entry/exit events multiple times