# Logs 📝

<!--META
nav: true
toc: true
description: The Logs library provides unified logging functionality that supports multiple logging systems including built-in Discord webhooks, qb-log, and ox_lib. It automatically formats player information and timestamps for comprehensive audit trails.
-->

The Logs library provides unified logging functionality that supports multiple logging systems including built-in Discord webhooks, qb-log, and ox_lib. It automatically formats player information and timestamps for comprehensive audit trails.

## Overview

The Logs provides functionality for FiveM resources.

## Send (Server)

### Description
Sends a log message to the configured logging system. Supports built-in Discord webhooks, qb-log, and ox_lib logging systems based on server configuration.

### Syntax
```lua
Bridge.Logs.Send(src, message)
```

### Parameters
- **src** (number): Source player ID for the log entry
- **message** (string): The log message to send

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Log a player action
Bridge.Logs.Send(source, "Player purchased a vehicle: Adder for $1,000,000")

-- Log an admin action
Bridge.Logs.Send(source, "Admin spawned vehicle: adder at coordinates (100, 200, 30)")

-- Log a system event
Bridge.Logs.Send(source, "Player completed heist with reward: $50,000")
```

