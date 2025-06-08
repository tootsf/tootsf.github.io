---
layout: default
title: "Close"
parent: Functions
grand_parent: Client
great_grand_parent: 💬 Dialogue
nav_order: 1
permalink: /community_bridge/modules/dialogue/client/functions/Close/
nav_exclude: true
---

# Close
{: .no_toc }

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