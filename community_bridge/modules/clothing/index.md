---
layout: default
title: Clothing
parent: Modules
grand_parent: Community Bridge
nav_order: 2
has_children: true
permalink: /community_bridge/modules/clothing/
---

# Clothing Module
{: .no_toc }

The clothing module provides functions for managing player appearance and clothing.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Available Functions

### Client Functions
- [`CopyAppearanceToClipboard()`](client/CopyAppearanceToClipboard.md) - Copy current appearance to clipboard
- [`GetAppearance(entity)`](client/GetAppearance.md) - Get appearance data for a ped entity
- [`IsMale()`](client/IsMale.md) - Check if current player ped is male
- [`RestoreAppearance(entity)`](client/RestoreAppearance.md) - Restore previously stored appearance
- [`SetAppearance(entity, skinData)`](client/SetAppearance.md) - Apply appearance data to a ped
- [`ToggleDebugging()`](client/ToggleDebugging.md) - Toggle clothing debugging mode
- [`UpdateAppearanceBackup(data)`](client/UpdateAppearanceBackup.md) - Update the appearance backup

### Server Functions
- [`GetAppearance(src)`](server/GetAppearance.md) - Get appearance data for a player
- [`IsMale(src)`](server/IsMale.md) - Check if a player's ped is male
- [`RestoreAppearance(src)`](server/RestoreAppearance.md) - Restore a player's previous appearance
- [`SetAppearance(src, data)`](server/SetAppearance.md) - Set appearance for a player
- [`SetAppearanceExt(src, data)`](server/SetAppearanceExt.md) - Set appearance with gender-specific data

---

## 📚 Commands

- `/clothing:enabledebug` - Toggle clothing debugging mode
- `/clothing:copy` - Copy current appearance to clipboard

---

## 📚 Note

This module provides comprehensive appearance management functionality including:
- Basic appearance management (components and props)
- Gender-specific outfit support
- Appearance backup and restoration
- Debug mode for troubleshooting
- Clipboard support for sharing appearances
