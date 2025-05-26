---
title: Open
parent: Client Functions
grand_parent: Dialogue
nav_order: 1
---

## 🔹 Open

Open a dialogue with options.

**Parameters:**
- `name` (string): Dialogue name
- `dialogue` (table): Dialogue data
- `characterOptions` (table): Character options
- `dialogueOptions` (table): Dialogue options
- `onSelected` (function): Callback when an option is selected

**Returns:**
- `boolean`: Success

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dialogue.Open("npc_greeting", dialogueData, characterOptions, dialogueOptions, function(selected)
    print(selected)
end)
```
