---
layout: default
title: "ShowSelectInput"
parent: Input Functions
grand_parent: Client
great_grand_parent: ⌨️ Input
nav_order: 1
---

# ShowSelectInput
Displays a selection dialog with options.

## Syntax

```lua
function Input.ShowSelectInput(config)
```

## Parameters

**config:** `table`  
Select input configuration with the following properties:

- **title:** `string`  
  Dialog title.

- **description:** `string` (optional)  
  Selection description.

- **options:** `table[]`  
  Array of options to display, each with:
  - **label:** `string` - Display text
  - **value:** `any` - Value returned when selected
  - **description:** `string` (optional) - Additional description
  - **icon:** `string` (optional) - Icon identifier

- **multiselect:** `boolean` (optional)  
  Whether multiple options can be selected.

## Returns

**Type:** `any` or `table` or `nil`  
The selected value, array of values (if multiselect=true), or nil if canceled.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local selectedJob = Bridge.Input.ShowSelectInput({
    title = "Select Job",
    description = "Choose your character's occupation",
    options = {
        { label = "Police Officer", value = "police", description = "Serve and protect the city", icon = "badge" },
        { label = "Medic", value = "ambulance", description = "Save lives and treat injuries", icon = "ambulance" },
        { label = "Mechanic", value = "mechanic", description = "Repair and modify vehicles", icon = "wrench" },
        { label = "Taxi Driver", value = "taxi", description = "Transport citizens around the city", icon = "taxi" }
    }
})

if selectedJob then
    print("Selected job: " .. selectedJob)
else
    print("Selection was canceled")
end
```

---