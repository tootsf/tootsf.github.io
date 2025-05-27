---
layout: default
title: Functions
parent: Client
grand_parent: "⌨️ Input"
nav_order: 1
permalink: /community_bridge/modules/input/client/functions/
---

# Input Client Functions
{: .no_toc }

Client-side functions for input handling and validation.

# Input Client Functions
{: .no_toc }

Client-side functions for input handling and validation.

---

## 🔹 SetValidationRule

# SetValidationRule
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Defines a custom validation rule for input fields.

## Syntax

```lua
function Input.SetValidationRule(name, rule)
```

## Parameters

**name:** `string`  
Unique name for the validation rule.

**rule:** `table`  
Validation rule configuration with the following properties:

- **test:** `function(value, params)`  
  Function to test if the value passes validation.
  - **value:** The input value to validate
  - **params:** Optional parameters for the validation
  - **returns:** boolean - true if valid, false if invalid

- **message:** `string` or `function(params)`  
  Error message to display if validation fails.
  Can be a string or a function that returns a string.

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Define a custom validation rule for phone numbers
Bridge.Input.SetValidationRule("phoneNumber", {
    test = function(value, params)
        -- Simple check for 10-digit number
        return value:match("^%d%d%d%-%d%d%d%-%d%d%d%d$") ~= nil
    end,
    message = "Phone number must be in format: XXX-XXX-XXXX"
})

-- Use the custom validation rule
local formData = Bridge.Input.ShowInputForm({
    title = "Contact Information",
    inputs = {
        {
            type = "text",
            label = "Phone Number",
            name = "phone",
            validation = "phoneNumber"
        }
    }
})

if formData then
    print("Phone: " .. formData.phone)
else
    print("Form was canceled")
end
```

---

## 🔹 ShowColorInput

# ShowColorInput
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays a color picker dialog.

## Syntax

```lua
function Input.ShowColorInput(config)
```

## Parameters

**config:** `table`  
Color input configuration with the following properties:

- **title:** `string`  
  Dialog title.

- **description:** `string` (optional)  
  Color selection description.

- **defaultColor:** `string` (optional)  
  Default color in hex format (e.g., "#FF5733").

- **format:** `string` (optional)  
  Output format: "hex" (default), "rgb", or "rgba".

## Returns

**Type:** `string` or `table` or `nil`  
The selected color in the specified format, or nil if canceled.
- For hex format: String like "#FF5733"  
- For rgb format: Table like {r=255, g=87, b=51}  
- For rgba format: Table like {r=255, g=87, b=51, a=1.0}

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local carColor = Bridge.Input.ShowColorInput({
    title = "Select Car Color",
    description = "Choose a color for your vehicle",
    defaultColor = "#1E90FF",
    format = "rgb"
})

if carColor then
    print(string.format("Selected color: R:%d G:%d B:%d", carColor.r, carColor.g, carColor.b))
else
    print("Color selection was canceled")
end
```

---

## 🔹 ShowDateInput

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

## 🔹 ShowInput

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

## 🔹 ShowInputForm

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

## 🔹 ShowNumberInput

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

## 🔹 ShowSelectInput

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

## 🔹 ValidateInput

# ValidateInput
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Validates an input value against specified rules.

## Syntax

```lua
function Input.ValidateInput(value, rules)
```

## Parameters

**value:** `any`  
The value to validate.

**rules:** `string` or `table`  
Validation rule(s) to apply. Can be:
- A string with rule names separated by pipe "|" (e.g., "required|email")
- A table of rule objects with name and params

## Returns

**Type:** `boolean, string`  
- Boolean indicating if validation passed
- Error message if validation failed, nil otherwise

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Simple validation using string format
local isValid, errorMsg = Bridge.Input.ValidateInput("", "required")
if not isValid then
    print(errorMsg) -- "This field is required"
end

-- Multiple validations using string format
local email = "test@example"
local isValid, errorMsg = Bridge.Input.ValidateInput(email, "required|email")
if not isValid then
    print(errorMsg) -- "Invalid email format"
end

-- Advanced validation using table format
local password = "pass"
local isValid, errorMsg = Bridge.Input.ValidateInput(password, {
    { name = "required" },
    { name = "minLength", params = { length = 8 } }
})
if not isValid then
    print(errorMsg) -- "Must be at least 8 characters"
end
```