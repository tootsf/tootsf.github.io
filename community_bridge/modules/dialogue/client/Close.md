---
layout: default
title: Close
parent: Client Functions
grand_parent: Dialogue
nav_order: 2
---

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
