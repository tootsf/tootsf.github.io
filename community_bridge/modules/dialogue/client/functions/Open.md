---
layout: default
title: "Open"
parent: Functions
grand_parent: Client
great_grand_parent: "💬 Dialogue"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/dialogue/client/functions/Open/
---

# Open
{: .no_toc }

Client
{: .label .label-blue }

# Open
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

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
