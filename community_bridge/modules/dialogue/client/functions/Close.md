---
layout: default
title: "Close"
parent: Dialogue Functions
grand_parent: Client
great_grand_parent: 💬 Dialogue
nav_order: 1
---

# Close
Closes an active dialogue.

## Syntax

```lua
function Dialogue.Close(name)
```

## Parameters

**name:** `string`  
Dialogue name

## Returns

**boolean**  
Success

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dialogue.Close("npc_greeting")
```

---