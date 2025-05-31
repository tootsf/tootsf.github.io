---
layout: default
title: "Close"
parent: Functions
grand_parent: Client
great_grand_parent: "💬 Dialogue"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/dialogue/client/functions/Close/
---

# Close
{: .no_toc }

Client
{: .label .label-blue }

# Close
{: .no_toc }
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
