# Test 📋

## Overview

This is a test library to verify the markdown function parsing works correctly.

## Client Functions

### TestFunction

**Description:** A test function to verify the system works

**Syntax:** `TestFunction(message)`

**Parameters:**
- `message` (string) - The message to display

**Returns:**
- `boolean` - Returns true if successful

**Example:**
```lua
local success = TestFunction('Hello World')
print(success)
```

## Server Functions

### ServerTestFunction

**Description:** A server-side test function

**Syntax:** `ServerTestFunction(playerId, data)`

**Parameters:**
- `playerId` (number) - The player ID
- `data` (table) - Data to process

**Returns:**
- `boolean` - Returns true if processed successfully

**Example:**
```lua
local result = ServerTestFunction(source, {test = true})
print('Server result:', result)
```
