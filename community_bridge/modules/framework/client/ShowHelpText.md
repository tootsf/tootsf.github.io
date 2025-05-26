---
layout: default
title: ShowHelpText
parent: Client Functions
grand_parent: Framework
nav_order: 7
---

# ShowHelpText
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays help text on screen.

## Syntax

```lua
function Framework.ShowHelpText(message, position)
```

## Parameters

**message:** `string`  
The help text message

**position:** `any`  
Text position (implementation dependent)

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Framework.ShowHelpText("Press [E] to interact")
```
