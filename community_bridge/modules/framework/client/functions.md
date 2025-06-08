---
layout: functions
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
{: .no_toc }

Client-side functions for the framework module.

<div class="toc-container">## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}</div>

---

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
