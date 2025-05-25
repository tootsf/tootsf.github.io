---
title: Input Module
sidebar_position: 14
---

# Input Module

The Input module in `community_bridge` provides a unified API for handling player input dialogs and prompts across different input systems.

## Server Functions

### OpenInput
```lua
Input.OpenInput(src, inputData)
```
Opens an input dialog for a player.
- `src` (number): Player source
- `inputData` (table): Input configuration data

## Client Functions

Some input modules may provide client events for opening or closing input dialogs directly.

## Shared Functions

Shared utility functions may be available depending on the input system. See the specific input module for details.
