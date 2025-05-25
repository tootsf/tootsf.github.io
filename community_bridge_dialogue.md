---
title: Dialogue Module
sidebar_position: 20
---

# Dialogue Module

The Dialogue module in `community_bridge` provides a unified API for handling dialogue and conversation systems.

## Server Functions

### StartDialogue
```lua
Dialogue.StartDialogue(src, dialogueData)
```
Starts a dialogue for a player.
- `src` (number): Player source
- `dialogueData` (table): Dialogue configuration data

## Client Functions

Some dialogue modules may provide client events for starting or ending dialogues directly.

## Shared Functions

Shared utility functions may be available depending on the dialogue system. See the specific dialogue module for details.
