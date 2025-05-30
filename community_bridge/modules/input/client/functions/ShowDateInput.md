---
layout: default
title: "ShowDateInput"
parent: Functions
grand_parent: Client
great_grand_parent: "⌨️ Input"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/input/client/functions/ShowDateInput/
---

# ShowDateInput
{: .no_toc }

Client
{: .label .label-blue }

# ShowDateInput
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays a date selection dialog.

## Syntax

```lua
function Input.ShowDateInput(config)
```

## Parameters

**config:** `table`  
Date input configuration with the following properties:

- **title:** `string`  
  Dialog title.

- **description:** `string` (optional)  
  Date selection description.

- **minDate:** `string` (optional)  
  Earliest selectable date in "YYYY-MM-DD" format.

- **maxDate:** `string` (optional)  
  Latest selectable date in "YYYY-MM-DD" format.

- **defaultDate:** `string` (optional)  
  Default selected date in "YYYY-MM-DD" format.

## Returns

**Type:** `string` or `nil`  
The selected date in "YYYY-MM-DD" format or nil if canceled.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local birthDate = Bridge.Input.ShowDateInput({
    title = "Select Birth Date",
    description = "Choose your character's date of birth",
    minDate = "1960-01-01",
    maxDate = "2005-01-01",
    defaultDate = "1990-01-01"
})

if birthDate then
    print("Selected birth date: " .. birthDate)
else
    print("Date selection was canceled")
end
```

---
