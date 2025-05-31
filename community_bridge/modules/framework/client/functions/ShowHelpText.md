---
layout: default
title: "ShowHelpText"
parent: Functions
grand_parent: Client
great_grand_parent: "🧩 Framework"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/ShowHelpText/
---

# ShowHelpText
{: .no_toc }

Client
{: .label .label-blue }

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
