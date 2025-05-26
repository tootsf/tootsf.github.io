---
layout: default
title: Housing
parent: Modules
nav_order: 10
has_children: true
---

# Housing Module
{: .no_toc }

The Housing module provides a unified interface for detecting when players enter or leave properties across multiple housing systems. It offers a standardized event system for property-based interactions regardless of the underlying housing resource.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

The Housing module offers:

- **Multi-Housing Support**: Compatible with various housing resources
- **Automatic Detection**: Automatically detects installed housing systems
- **Event System**: Standardized events for property entry/exit
- **Routing Bucket Integration**: Provides routing bucket information for properties
- **Location Data**: Access to player coordinates and property information

---

## 📚 Supported Housing Resources

- **qb-houses**: QBCore housing system
- **qb-appartments**: QBCore apartments
- **ps-housing**: Project Sloth housing
- **bcs-housing**: BCS housing system
- **esx_property**: ESX property system
- **Default**: Fallback implementation for custom integrations

## Available Events

### Server Events
- `community_bridge:Client:OnPlayerInside` - Triggered when player enters/exits property

## Module Structure

```
housing/
├── _default/           # Fallback implementation and event handling
├── qb-houses/         # QBCore housing integration
├── qb-appartments/    # QBCore apartments integration
├── ps-housing/        # Project Sloth housing integration
├── bcs-housing/       # BCS housing integration
└── esx_property/      # ESX property integration
```

## Event System

The module standardizes property entry/exit detection across different housing systems by:
1. Listening to housing-specific events from each system
2. Converting them to a unified event format
3. Providing additional context like routing buckets and coordinates

## Usage Example

```lua
-- Listen for players entering/exiting properties
AddEventHandler('community_bridge:Client:OnPlayerInside', function(src, insideId, currentBucket, playerCoords)
    if insideId then
        print("Player " .. src .. " entered property: " .. insideId)
        print("Routing bucket: " .. currentBucket)
        print("Coordinates: " .. playerCoords.x .. ", " .. playerCoords.y .. ", " .. playerCoords.z)
    else
        print("Player " .. src .. " left property")
    end
end)
```

## Integration Benefits

- **Consistent API**: Same event handling regardless of housing system
- **Automatic Detection**: No manual configuration needed  
- **Rich Context**: Access to routing buckets and coordinates
- **Easy Migration**: Switch housing systems without changing event handlers
