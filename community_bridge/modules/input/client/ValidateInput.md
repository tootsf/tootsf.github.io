---
layout: default
title: ValidateInput
parent: Client Functions
grand_parent: "⌨️ Input"
nav_order: 8
---

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
