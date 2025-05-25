---
title: Dispatch Module
sidebar_position: 11
---

# Dispatch Module

The Dispatch module in `community_bridge` provides a unified API for sending and managing dispatch calls across different dispatch systems.

## Server Functions

### SendDispatch
```lua
Dispatch.SendDispatch(data)
```
Sends a dispatch call.
- `data` (table): Dispatch call data (location, type, message, etc.)

## Client Functions

Some dispatch modules may provide client events for receiving or displaying dispatch calls.

## Shared Functions

Shared utility functions may be available depending on the dispatch system. See the specific dispatch module for details.
