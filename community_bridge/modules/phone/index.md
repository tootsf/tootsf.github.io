---
layout: default
title: Phone
parent: Modules
nav_order: 16
has_children: true
---

# Phone Module
{: .no_toc }

The Phone module provides a unified interface for interacting with various phone systems in FiveM. It supports multiple popular phone resources through a bridge system that automatically detects and integrates with the installed phone resource.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Overview

The Phone module offers:

- **Multi-Phone Support**: Compatible with various phone resources
- **Automatic Detection**: Automatically detects installed phone systems
- **Email System**: Send emails through supported phone systems
- **Player Phone Access**: Retrieve player phone information
- **Fallback Handling**: Graceful fallback when no phone system is detected

## Supported Phone Resources

- **qs-smartphone**: Full integration with email and phone access
- **gksphone**: Integration support
- **lb-phone**: Integration support  
- **okokPhone**: Integration support
- **Default**: Fallback implementation when no phone system is detected

## Available Functions

### Server Functions
- `Phone.GetPlayerPhone()` - Retrieve player's phone information
- `Phone.SendEmail()` - Send email to player through phone system

### Client Functions
- `Phone.SendEmail()` - Client-side email sending functionality

## Module Structure

```
phone/
├── _default/           # Fallback implementation
├── qs-smartphone/      # QuaS Smartphone integration
├── gksphone/          # GKS Phone integration
├── lb-phone/          # LB Phone integration
└── okokPhone/         # OKOK Phone integration
```

## Bridge System

The module uses a bridge system that:
1. Checks for installed phone resources
2. Loads appropriate integration files
3. Falls back to default implementation if no phone system is found
4. Provides consistent API regardless of underlying phone system

## Usage Example

```lua
-- Server: Send email to player
local success = Phone.SendEmail(playerId, "noreply@server.com", "Welcome!", "Welcome to our server!")

-- Server: Get player phone
local phoneNumber = Phone.GetPlayerPhone(playerId)
if phoneNumber then
    print("Player phone: " .. phoneNumber)
end
```
