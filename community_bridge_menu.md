---
title: Menu Module
sidebar_position: 5
---

# Menu Module

The Menu module in `community_bridge` provides a unified API for opening and managing menus across different menu systems.

## Server Functions

### OpenMenu
```lua
Menu.OpenMenu(src, menuData)
```
Opens a menu for a player.
- `src` (number): Player source
- `menuData` (table): Menu configuration data

## Client Functions

Some menu modules may provide client events for opening or closing menus directly.

## Shared Functions

Shared utility functions may be available depending on the menu system. See the specific menu module for details.
