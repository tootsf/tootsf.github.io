---
layout: default
title: "Open"
parent: Dialogue Functions
grand_parent: Client
great_grand_parent: 💬 Dialogue
nav_order: 1
---

# Open
{: .no_toc }

Opens a dialogue with options.

## Syntax

```lua
function Dialogue.Open(name, dialogue, characterOptions, dialogueOptions, onSelected)
```

## Parameters

**name:** `string`  
Dialogue name

**dialogue:** `table`  
Dialogue data

**characterOptions:** `table`  
Character options

**dialogueOptions:** `table`  
Dialogue options

**onSelected:** `function`  
Callback when an option is selected

## Returns

**boolean**  
Success

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dialogue.Open("npc_greeting", dialogueData, characterOptions, dialogueOptions, function(selected)
    print(selected)
end)
```