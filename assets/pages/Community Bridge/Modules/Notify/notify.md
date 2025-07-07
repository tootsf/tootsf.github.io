# Notify 🔔

<!--META
nav: true
toc: true
description: The Notify module provides a unified interface for sending notifications across different notification systems. It automatically detects and uses the configured notification system.
-->

The Notify module provides a unified interface for sending notifications across different notification systems. It automatically detects and uses the configured notification system.

## Overview

The Notify provides functionality for FiveM resources.

## Client Functions

### GetResourceName

<!--TOC: GetResourceName-->

**Context:** 🖥️ Client

Gets the name of the currently active notification system.

**Syntax:** `Bridge.Notify.GetResourceName()`

**Parameters:** None

**Returns:**
- (string) - Name of the notification resource being used

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local notifySystem = Bridge.Notify.GetResourceName()
print("Using notification system: " .. notifySystem)
```

### SendNotify

<!--TOC: SendNotify-->

**Context:** 🖥️ Client

Sends a notification message to the client with specified type and duration.

**Syntax:** `Bridge.Notify.SendNotify(message, type, time)`

**Parameters:**
- `message` (string) - The notification message to display
- `type` (string) - The type of notification (success, error, info, warning)
- `time` (number) - Duration in milliseconds (default: 3000)

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Send a success notification
Bridge.Notify.SendNotify("Action completed successfully!", "success", 5000)

-- Send an error notification with default duration
Bridge.Notify.SendNotify("Something went wrong!", "error")
```

### HideHelpText

<!--TOC: HideHelpText-->

**Context:** 🖥️ Client

DEPRECATED: Hides the help text message on screen. Use HelpText.HideHelpText() instead.

**Syntax:** `Bridge.Notify.HideHelpText()`

**Parameters:** None

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- DEPRECATED - Use HelpText module instead
Bridge.Notify.HideHelpText()
```

### ShowHelpText

<!--TOC: ShowHelpText-->

**Context:** 🖥️ Client

DEPRECATED: Shows a help text message on screen. Use HelpText.ShowHelpText() instead.

**Syntax:** `Bridge.Notify.ShowHelpText(message)`

**Parameters:**
- `message` (string) - The help text message to display

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- DEPRECATED - Use HelpText module instead
Bridge.Notify.ShowHelpText("Press E to interact")
```

## Server Functions

### SendNotify

<!--TOC: SendNotify-->

**Context:** 🖲️ Server

Sends a notification message to a specific player.

**Syntax:** `Bridge.Notify.SendNotify(src, message, type, time)`

**Parameters:**
- `src` (number) - Player server ID to send notification to
- `message` (string) - The notification message to display
- `type` (string) - The type of notification (success, error, info, warning)
- `time` (number) - Duration in milliseconds (default: 3000)

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Send notification to specific player
Bridge.Notify.SendNotify(source, "Welcome to the server!", "info", 8000)

-- Send error notification
Bridge.Notify.SendNotify(source, "You don't have permission!", "error")
```

### HideHelpText

<!--TOC: HideHelpText-->

**Context:** 🖲️ Server

DEPRECATED: Hides the help text message on screen for a specific player. Use HelpText.HideHelpText() instead.

**Syntax:** `Bridge.Notify.HideHelpText(src)`

**Parameters:**
- `src` (number) - Player server ID

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- DEPRECATED - Use HelpText module instead
Bridge.Notify.HideHelpText(source)
```

### ShowHelpText

<!--TOC: ShowHelpText-->

**Context:** 🖲️ Server

DEPRECATED: Shows a help text message on screen for a specific player. Use HelpText.ShowHelpText() instead.

**Syntax:** `Bridge.Notify.ShowHelpText(src, message)`

**Parameters:**
- `src` (number) - Player server ID
- `message` (string) - The help text message to display

**Returns:**
- (nil) - No return value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

-- DEPRECATED - Use HelpText module instead
Bridge.Notify.ShowHelpText(source, "Press E to interact")
```

