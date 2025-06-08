---
layout: default
title: Framework Functions
parent: Client
grand_parent: "🧩 Framework"
great_grand_parent: Modules
has_children: true
has_toc: true
nav_order: 1
permalink: /community_bridge/modules/framework/client/functions/
---

# Client Functions
Client-side functions for the framework module.

## Functions

### [GetFrameworkJobs](GetFrameworkJobs)

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