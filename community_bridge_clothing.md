---
title: Clothing Module
sidebar_position: 19
---

# Clothing Module

The Clothing module in `community_bridge` provides a unified API for managing player clothing and outfits across different clothing systems.

## Server Functions

### SetOutfit
```lua
Clothing.SetOutfit(src, outfitData)
```
Sets a player's outfit.
- `src` (number): Player source
- `outfitData` (table): Outfit configuration data

### GetOutfit
```lua
Clothing.GetOutfit(src)
```
Gets a player's current outfit.
- **Returns:** (table) Outfit data

## Client Functions

Some clothing modules may provide client events for updating clothing UI or applying outfits directly.

## Shared Functions

Shared utility functions may be available depending on the clothing system. See the specific clothing module for details.
