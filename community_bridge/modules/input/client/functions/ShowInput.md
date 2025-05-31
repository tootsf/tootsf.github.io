---
layout: default
title: "ShowInput"
parent: Functions
grand_parent: Client
great_grand_parent: "⌨️ Input"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/input/client/functions/ShowInput/
---

# ShowInput
{: .no_toc }

Client
{: .label .label-blue }

# ShowInput
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays a single input dialog.

## Syntax

```lua
function Input.ShowInput(config)
```

## Parameters

**config:** `table`  
Input configuration with the following properties:

- **title:** `string`  
  Dialog title.

- **subtitle:** `string` (optional)  
  Dialog subtitle.

- **placeholder:** `string` (optional)  
  Input placeholder text.

- **defaultValue:** `string` (optional)  
  Default input value.

- **type:** `string` (optional)  
  Input type ("text", "number", "password").

- **maxLength:** `number` (optional)  
  Maximum character length.

## Returns

**Type:** `string` or `nil`  
The input value or nil if canceled.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local name = Bridge.Input.ShowInput({
    title = "Enter Name",
    subtitle = "Please provide your character name",
    placeholder = "First and Last Name",
    maxLength = 50
})

if name then
    print("Name entered: " .. name)
else
    print("Input was canceled")
end
```

---
