---
layout: default
title: Framework
parent: Modules
grand_parent: Community Bridge
nav_order: 1
has_children: true
permalink: /community_bridge/modules/framework/
---

# Framework Module
{: .no_toc }

The Framework module provides a unified API for interacting with player data, money, jobs, and other core framework features across different frameworks (ESX, QBCore, etc.).

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

This module acts as an abstraction layer between your resource and the underlying framework, allowing you to write framework-agnostic code that works seamlessly across different server configurations.

## Supported Frameworks

- **ESX** - Full support for all ESX versions
- **QBCore** - Complete QBCore integration
- **Custom Frameworks** - Extensible architecture for custom implementations

## Key Features

- **Player Management** - Get player data, identifiers, and online status
- **Economy Integration** - Money handling across different currency systems
- **Job System** - Unified job management and grade handling
- **Event Integration** - Framework-specific event handling and callbacks

## Quick Start

```lua
-- Server-side example
local playerId = source
local identifier = Bridge.Framework.GetIdentifier(playerId)
local playerMoney = Bridge.Framework.GetMoney(playerId)
local playerJob = Bridge.Framework.GetJob(playerId)

if playerMoney >= 1000 then
    Bridge.Framework.RemoveMoney(playerId, 1000)
    -- Give item or perform action
end
```

## Module Structure

This module is organized into three main categories:

- **[Server Functions](server/)** - Server-side player and economy management
- **[Client Functions](client/)** - Client-side framework integration
- **[Shared Functions](shared/)** - Utilities available on both sides

---

## Configuration

The Framework module automatically detects your server's framework and configures itself accordingly. No manual configuration is typically required.

### Custom Framework Support

To add support for a custom framework, implement the required interface functions in your framework's bridge file. See the developer documentation for details.
