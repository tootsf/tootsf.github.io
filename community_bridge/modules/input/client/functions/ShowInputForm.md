---
layout: default
title: "ShowInputForm"
parent: Functions
grand_parent: Client
great_grand_parent: "⌨️ Input"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/input/client/functions/ShowInputForm/
---

# ShowInputForm
{: .no_toc }

Client
{: .label .label-blue }

# ShowInputForm
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays a multi-input form dialog.

## Syntax

```lua
function Input.ShowInputForm(config)
```

## Parameters

**config:** `table`  
Form configuration with the following properties:

- **title:** `string`  
  Dialog title.

- **description:** `string` (optional)  
  Form description text.

- **inputs:** `table[]`  
  Array of input field definitions, each with:
  - **type:** `string` - Field type ("text", "number", "password", "checkbox")
  - **label:** `string` - Field label
  - **name:** `string` - Input identifier
  - **default:** `any` (optional) - Default value
  - **placeholder:** `string` (optional) - Placeholder text
  - **min:** `number` (optional) - Minimum value for number inputs
  - **max:** `number` (optional) - Maximum value for number inputs
  - **required:** `boolean` (optional) - Whether field is required

## Returns

**Type:** `table` or `nil`  
A table containing input values keyed by input names, or nil if canceled.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local formData = Bridge.Input.ShowInputForm({
    title = "Character Registration",
    description = "Enter your character details",
    inputs = {
        {
            type = "text",
            label = "Full Name",
            name = "name",
            required = true,
            placeholder = "First and Last name"
        },
        {
            type = "number",
            label = "Age",
            name = "age",
            min = 18,
            max = 100,
            default = 30
        },
        {
            type = "text",
            label = "Occupation",
            name = "job",
            placeholder = "Current employment"
        }
    }
})

if formData then
    print("Name: " .. formData.name)
    print("Age: " .. formData.age)
    print("Job: " .. formData.job)
else
    print("Form was canceled")
end
```

---
