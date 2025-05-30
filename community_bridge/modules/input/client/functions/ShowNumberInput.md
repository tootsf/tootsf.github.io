---
layout: default
title: "ShowNumberInput"
parent: Functions
grand_parent: Client
great_grand_parent: "⌨️ Input"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/input/client/functions/ShowNumberInput/
---

# ShowNumberInput
{: .no_toc }

Client
{: .label .label-blue }

# ShowNumberInput
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays a number input dialog.

## Syntax

```lua
function Input.ShowNumberInput(config)
```

## Parameters

**config:** `table`  
Number input configuration with the following properties:

- **title:** `string`  
  Dialog title.

- **subtitle:** `string` (optional)  
  Dialog subtitle.

- **placeholder:** `string` (optional)  
  Input placeholder text.

- **defaultValue:** `number` (optional)  
  Default number value.

- **min:** `number` (optional)  
  Minimum allowed value.

- **max:** `number` (optional)  
  Maximum allowed value.

## Returns

**Type:** `number` or `nil`  
The input number value or nil if canceled.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local amount = Bridge.Input.ShowNumberInput({
    title = "Enter Amount",
    subtitle = "How many items do you want to purchase?",
    min = 1,
    max = 100,
    defaultValue = 1
})

if amount then
    print("Selected amount: " .. amount)
else
    print("Input was canceled")
end
```

---
