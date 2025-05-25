---
layout: default
title: Module Template Example
parent: Examples
nav_order: 1
---

# Module Template Example
{: .no_toc }

This is an example of how to structure your documentation for optimal TOC generation.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## Core Functions

### GetSomething()

Description of the function.

**Parameters:**
- `param1` (string) - Description

**Returns:**
- `table` - Description

**Example:**
```lua
local result = Module.GetSomething("value")
```

### SetSomething()

Another function description.

**Parameters:**
- `param1` (string) - Description

**Example:**
```lua
Module.SetSomething("value")
```

## Utility Functions

### HelperFunction()

Description of helper function.

**Returns:**
- `boolean` - Success status

**Example:**
```lua
local success = Module.HelperFunction()
```

## Event Functions

### TriggerEvent()

Description of event function.

**Parameters:**
- `eventName` (string) - Name of event
- `data` (table) - Event data

**Example:**
```lua
Module.TriggerEvent("custom:event", {player = source})
```
