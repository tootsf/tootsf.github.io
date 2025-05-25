---
title: Notify Module
sidebar_position: 4
---

# Notify Module

The Notify module in `community_bridge` provides a unified API for sending notifications to players across different notification systems.

## Server Functions

### SendNotify
```lua
Notify.SendNotify(src, message, type)
```
Sends a notification to a player.
- `src` (number): Player source
- `message` (string): Notification message
- `type` (string): Notification type (e.g., "success", "error", "inform")

## Client Functions

Some notification modules may provide client events for displaying notifications directly.

## Shared Functions

Shared utility functions may be available depending on the notification system. See the specific notify module for details.
