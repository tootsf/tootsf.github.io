---
title: Progressbar Module
sidebar_position: 6
---

# Progressbar Module

The Progressbar module in `community_bridge` provides a unified API for showing progress bars to players across different progress bar systems.

## Server Functions

### ShowProgressbar
```lua
Progressbar.ShowProgressbar(src, label, duration)
```
Shows a progress bar to a player.
- `src` (number): Player source
- `label` (string): Text to display
- `duration` (number): Duration in milliseconds

## Client Functions

Some progressbar modules may provide client events for showing or hiding progress bars directly.

## Shared Functions

Shared utility functions may be available depending on the progressbar system. See the specific progressbar module for details.
