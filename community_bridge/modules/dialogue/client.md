---
layout: default
title: Client Functions
parent: "💬 Dialogue"
grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/dialogue/client/
---

# Dialogue Client Functions
{: .no_toc }

Client-side functions for opening and closing dialogues.

---

## 🔹 Close

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Closes an active dialogue.


```lua
function Dialogue.Close(name)
```


**name:** `string`  
Dialogue name


**boolean**  
Success


```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dialogue.Close("npc_greeting")
```

---

## 🔹 Open

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Opens a dialogue with options.


```lua
function Dialogue.Open(name, dialogue, characterOptions, dialogueOptions, onSelected)
```


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


**boolean**  
Success


```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Dialogue.Open("npc_greeting", dialogueData, characterOptions, dialogueOptions, function(selected)
    print(selected)
end)
```