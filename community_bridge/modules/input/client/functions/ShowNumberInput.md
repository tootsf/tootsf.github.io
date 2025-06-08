---
layout: default
title: "ShowNumberInput"
parent: Input Functions
grand_parent: Client
great_grand_parent: ⌨️ Input
nav_order: 1
---

# ShowNumberInput
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