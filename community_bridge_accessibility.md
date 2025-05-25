---
title: Accessibility Module
sidebar_position: 25
---

# Accessibility Module

The Accessibility module in `community_bridge` provides a unified API for accessibility features across different systems.

## Server Functions

### SetAccessibilityOption
```lua
Accessibility.SetAccessibilityOption(src, option, value)
```
Sets an accessibility option for a player.
- `src` (number): Player source
- `option` (string): Option name
- `value` (any): Option value

## Client Functions

Some accessibility modules may provide client events for updating accessibility UI or options directly.

## Shared Functions

Shared utility functions may be available depending on the accessibility system. See the specific accessibility module for details.
