---
layout: docs
title: Functions
parent: Client
grand_parent: "💬 Dialogue"
great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/dialogue/client/functions/
has_children: true
---

# Dialogue Client Functions
{: .no_toc }

Client-side functions for opening and closing dialogues.

# Dialogue Client Functions
{: .no_toc }

Client-side functions for opening and closing dialogues.

---

## 🔹 Close

## Close
{: .d-inline-block }
Client
{: .label .label-blue }

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

## 🔹 Open

## Open
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