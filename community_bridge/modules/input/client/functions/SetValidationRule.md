---
layout: default
title: "SetValidationRule"
parent: Input Functions
grand_parent: Client
great_grand_parent: ⌨️ Input
nav_order: 1
---

# SetValidationRule
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