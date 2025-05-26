
---
layout: default
title: Clothing
parent: Modules
grand_parent: Community Bridge
nav_order: 5
has_children: true
permalink: /community_bridge/modules/clothing/
---

# Clothing Module

The clothing module provides functions for managing player appearance and clothing.

---

## 📚 Available Functions

### Client-side
- [`IsMale()`](client.md#ismale) - Check if current player ped is male
- [`GetAppearance(entity)`](client.md#getappearance) - Get appearance data for a ped
- [`SetAppearance(entity, skinData)`](client.md#setappearance) - Apply appearance data to a ped
- [`RestoreAppearance(entity)`](client.md#restoreappearance) - Restore previously stored appearance
- [`UpdateAppearanceBackup(data)`](client.md#updateappearancebackup) - Update the appearance backup
- [`CopyAppearanceToClipboard()`](client.md#copyappearancetoclipboard) - Copy current appearance to clipboard
- [`ToggleDebugging()`](client.md#toggledebugging) - Toggle clothing debugging mode

### Server-side
- [`IsMale(src)`](server.md#ismale) - Check if a player's ped is male
- [`GetAppearance(src)`](server.md#getappearance) - Get appearance data for a player
- [`SetAppearance(src, data)`](server.md#setappearance) - Set appearance for a player
- [`SetAppearanceExt(src, data)`](server.md#setappearanceext) - Set appearance with gender-specific data
- [`RestoreAppearance(src)`](server.md#restoreappearance) - Restore a player's previous appearance

---

## 📚 Commands

- `/clothing:enabledebug` - Toggle clothing debugging mode
- `/clothing:copy` - Copy current appearance to clipboard

---

## 📚 Note

This module is marked as incomplete in the source code. It provides basic appearance management functionality but may not include all advanced features found in dedicated clothing systems.
