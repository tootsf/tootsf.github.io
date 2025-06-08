---
layout: default
title: "OpenMenu"
parent: Clothing Functions
grand_parent: Server
great_grand_parent: 👔 Clothing
nav_order: 1
---

# OpenMenu
Opens the clothing menu interface for a player.

**Parameters:**
- `src` (number): Player server ID

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local src = source
Bridge.Clothing.OpenMenu(src)
```