---
title: Target Module
sidebar_position: 7
---

# Target Module

The Target module in `community_bridge` provides a unified API for adding and managing target zones (e.g., for interaction with objects or NPCs) across different target systems.

## Server Functions

### AddTarget
```lua
Target.AddTarget(src, targetData)
```
Adds a target zone for a player.
- `src` (number): Player source
- `targetData` (table): Target configuration data

## Client Functions

Some target modules may provide client events for adding or removing targets directly.

## Shared Functions

Shared utility functions may be available depending on the target system. See the specific target module for details.
