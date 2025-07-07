# Test 📋

## Overview

This is a test library to verify the markdown function parsing works correctly.

<--FNC
{
  "name": "TestFunction",
  "side": "client",
  "description": "A test function to verify the system works",
  "syntax": "TestFunction(message)",
  "parameters": [
    { "name": "message", "type": "string", "description": "The message to display" }
  ],
  "returns": [
    { "type": "boolean", "description": "Returns true if successful" }
  ],
  "example": "local success = TestFunction('Hello World')\nprint(success)"
}
FNC-->

<--FNC
{
  "name": "ServerTestFunction",
  "side": "server", 
  "description": "A server-side test function",
  "syntax": "ServerTestFunction(playerId, data)",
  "parameters": [
    { "name": "playerId", "type": "number", "description": "The player ID" },
    { "name": "data", "type": "table", "description": "Data to process" }
  ],
  "returns": [
    { "type": "boolean", "description": "Returns true if processed successfully" }
  ],
  "example": "local result = ServerTestFunction(source, {test = true})\nprint('Server result:', result)"
}
FNC-->
