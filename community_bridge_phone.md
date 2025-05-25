---
title: Phone Module
sidebar_position: 23
---

# Phone Module

The Phone module in `community_bridge` provides a unified API for handling phone features across different phone systems.

## Server Functions

### SendMessage
```lua
Phone.SendMessage(src, number, message)
```
Sends a message to a phone number.
- `src` (number): Player source
- `number` (string): Phone number
- `message` (string): Message content

### StartCall
```lua
Phone.StartCall(src, number)
```
Starts a call to a phone number.

## Client Functions

Some phone modules may provide client events for updating phone UI or notifications directly.

## Shared Functions

Shared utility functions may be available depending on the phone system. See the specific phone module for details.
