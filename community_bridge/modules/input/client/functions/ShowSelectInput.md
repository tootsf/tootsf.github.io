---
layout: default
title: "ShowSelectInput"
parent: Functions
grand_parent: Client
great_grand_parent: "⌨️ Input"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/input/client/functions/ShowSelectInput/
---

# ShowSelectInput
{: .no_toc }

Client
{: .label .label-blue }

# ShowSelectInput
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

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
