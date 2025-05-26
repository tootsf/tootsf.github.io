---
layout: default
title: Shared Functions
parent: Input
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 3
permalink: /community_bridge/modules/input/shared/
---

# Input Module - Shared Functions
{: .no_toc }

Shared utilities and configurations for the Input module.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

Shared functions provide validation, formatting, and utility functions that work on both client and server sides.

---

## 🔹 ValidateInputData

Validates input data against a schema definition.

**Parameters:**
- `data` (table): Input data to validate
- `schema` (table): Validation schema

**Returns:**
- `boolean`: True if valid
- `table`: Array of validation errors

**Example:**
```lua
local schema = {
    firstname = {
        type = "string",
        required = true,
        minLength = 2,
        maxLength = 20,
        pattern = "^[a-zA-Z]+$"
    },
    age = {
        type = "number",
        required = true,
        min = 18,
        max = 100
    },
    email = {
        type = "string",
        required = false,
        pattern = "^[%w%._%+%-]+@[%w%._%+%-]+%.%w+$"
    }
}

local inputData = {
    firstname = "John",
    age = 25,
    email = "john@example.com"
}

local isValid, errors = Bridge.Input.ValidateInputData(inputData, schema)
if not isValid then
    for _, error in pairs(errors) do
        print("Validation error:", error.field, error.message)
    end
end
```

### `Bridge.Input.CreateValidationSchema(fields)`

Creates a validation schema from field definitions.

**Parameters:**
- `fields` (table): Array of field definitions

**Returns:**
- `table`: Validation schema

**Example:**
```lua
local fields = {
    {
        name = "username",
        label = "Username",
        type = "text",
        required = true,
        minLength = 3,
        maxLength = 20,
        pattern = "^[a-zA-Z0-9_]+$"
    },
    {
        name = "password",
        label = "Password",
        type = "password",
        required = true,
        minLength = 8
    }
}

local schema = Bridge.Input.CreateValidationSchema(fields)
```

### `Bridge.Input.RegisterValidator(name, validator)`

Registers a custom validation function.

**Parameters:**
- `name` (string): Validator name
- `validator` (function): Validation function

**Example:**
```lua
-- Register credit card validator
Bridge.Input.RegisterValidator("creditCard", function(value)
    -- Luhn algorithm implementation
    local sum = 0
    local alternate = false
    
    for i = string.len(value), 1, -1 do
        local digit = tonumber(string.sub(value, i, i))
        if alternate then
            digit = digit * 2
            if digit > 9 then
                digit = digit - 9
            end
        end
        sum = sum + digit
        alternate = not alternate
    end
    
    if sum % 10 == 0 then
        return true
    else
        return false, "Invalid credit card number"
    end
end)
```

## Input Type Definitions

### `Bridge.Input.GetInputType(typeName)`

Gets input type configuration by name.

**Parameters:**
- `typeName` (string): Input type name

**Returns:**
- `table`: Input type definition

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local emailType = Bridge.Input.GetInputType("email")
-- Returns: {
--     pattern = "^[%w%._%+%-]+@[%w%._%+%-]+%.%w+$",
--     placeholder = "example@domain.com",
--     maxLength = 320
-- }
```

### `Bridge.Input.RegisterInputType(name, definition)`

Registers a custom input type.

**Parameters:**
- `name` (string): Input type name
- `definition` (table): Type definition

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

Bridge.Input.RegisterInputType("phone", {
    pattern = "^%+?[1-9]%d{1,14}$",
    placeholder = "+1234567890",
    maxLength = 15,
    format = function(value)
        -- Format phone number display
        local digits = string.gsub(value, "[^%d]", "")
        if string.len(digits) == 10 then
            return string.format("(%s) %s-%s", 
                string.sub(digits, 1, 3),
                string.sub(digits, 4, 6),
                string.sub(digits, 7, 10)
            )
        end
        return value
    end,
    validate = function(value)
        local digits = string.gsub(value, "[^%d]", "")
        if string.len(digits) < 10 then
            return false, "Phone number too short"
        end
        if string.len(digits) > 15 then
            return false, "Phone number too long"
        end
        return true
    end
})
```

## Field Templates

### `Bridge.Input.CreateTextField(config)`

Creates a standardized text field definition.

**Parameters:**
- `config` (table): Field configuration

**Returns:**
- `table`: Complete field definition

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local nameField = Bridge.Input.CreateTextField({
    name = "fullName",
    label = "Full Name",
    placeholder = "Enter your full name",
    required = true,
    maxLength = 50
})
```

### `Bridge.Input.CreateNumberField(config)`

Creates a standardized number field definition.

**Parameters:**
- `config` (table): Field configuration

**Returns:**
- `table`: Complete field definition

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local ageField = Bridge.Input.CreateNumberField({
    name = "age",
    label = "Age",
    min = 18,
    max = 100,
    step = 1,
    required = true
})
```

### `Bridge.Input.CreateSelectField(config)`

Creates a standardized select field definition.

**Parameters:**
- `config` (table): Field configuration

**Returns:**
- `table`: Complete field definition

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local countryField = Bridge.Input.CreateSelectField({
    name = "country",
    label = "Country",
    required = true,
    searchable = true,
    options = {
        {value = "US", label = "United States"},
        {value = "CA", label = "Canada"},
        {value = "UK", label = "United Kingdom"}
    }
})
```

## Form Templates

### `Bridge.Input.CreateLoginForm()`

Creates a standardized login form template.

**Returns:**
- `table`: Login form configuration

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local loginForm = Bridge.Input.CreateLoginForm()
-- Returns form with username/email and password fields
```

### `Bridge.Input.CreateRegistrationForm()`

Creates a standardized registration form template.

**Returns:**
- `table`: Registration form configuration

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local regForm = Bridge.Input.CreateRegistrationForm()
-- Returns form with username, email, password, confirm password fields
```

### `Bridge.Input.CreateContactForm()`

Creates a standardized contact information form.

**Returns:**
- `table`: Contact form configuration

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local contactForm = Bridge.Input.CreateContactForm()
-- Returns form with name, email, phone, message fields
```

### `Bridge.Input.CreateAddressForm()`

Creates a standardized address form template.

**Returns:**
- `table`: Address form configuration

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local addressForm = Bridge.Input.CreateAddressForm()
-- Returns form with street, city, state, zip, country fields
```

## Data Formatting

### `Bridge.Input.FormatInputValue(value, type)`

Formats input value based on type.

**Parameters:**
- `value` (string): Raw input value
- `type` (string): Input type

**Returns:**
- `string`: Formatted value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local formatted = Bridge.Input.FormatInputValue("1234567890", "phone")
-- Returns: "(123) 456-7890"

local formatted = Bridge.Input.FormatInputValue("john doe", "name")
-- Returns: "John Doe"
```

### `Bridge.Input.SanitizeInput(value, options)`

Sanitizes input value for security.

**Parameters:**
- `value` (string): Input value to sanitize
- `options` (table, optional): Sanitization options

**Returns:**
- `string`: Sanitized value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local clean = Bridge.Input.SanitizeInput("<script>alert('xss')</script>", {
    stripHtml = true,
    trimWhitespace = true,
    maxLength = 100
})
-- Returns: "alert('xss')"
```

### `Bridge.Input.NormalizeInput(value, type)`

Normalizes input value to standard format.

**Parameters:**
- `value` (string): Input value
- `type` (string): Input type

**Returns:**
- `string`: Normalized value

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local normalized = Bridge.Input.NormalizeInput("JOHN@EXAMPLE.COM", "email")
-- Returns: "john@example.com"
```

## Validation Rules

### Standard Validation Rules

```lua
ValidationRules = {
    required = function(value)
        if value == nil or value == "" then
            return false, "This field is required"
        end
        return true
    end,
    
    minLength = function(value, min)
        if string.len(tostring(value)) < min then
            return false, "Must be at least " .. min .. " characters"
        end
        return true
    end,
    
    maxLength = function(value, max)
        if string.len(tostring(value)) > max then
            return false, "Must be no more than " .. max .. " characters"
        end
        return true
    end,
    
    min = function(value, min)
        local num = tonumber(value)
        if not num or num < min then
            return false, "Must be at least " .. min
        end
        return true
    end,
    
    max = function(value, max)
        local num = tonumber(value)
        if not num or num > max then
            return false, "Must be no more than " .. max
        end
        return true
    end,
    
    pattern = function(value, pattern)
        if not string.match(tostring(value), pattern) then
            return false, "Invalid format"
        end
        return true
    end,
    
    email = function(value)
        local pattern = "^[%w%._%+%-]+@[%w%._%+%-]+%.%w+$"
        if not string.match(value, pattern) then
            return false, "Invalid email address"
        end
        return true
    end,
    
    url = function(value)
        local pattern = "^https?://[%w%.%-]+%.%w+[%w%.%-/]*$"
        if not string.match(value, pattern) then
            return false, "Invalid URL"
        end
        return true
    end,
    
    numeric = function(value)
        local num = tonumber(value)
        if not num then
            return false, "Must be a number"
        end
        return true
    end,
    
    alpha = function(value)
        if not string.match(value, "^[a-zA-Z]+$") then
            return false, "Only letters allowed"
        end
        return true
    end,
    
    alphanumeric = function(value)
        if not string.match(value, "^[a-zA-Z0-9]+$") then
            return false, "Only letters and numbers allowed"
        end
        return true
    end
}
```

### Custom Validation Rules

```lua
-- Game-specific validation rules
GameValidationRules = {
    playerName = function(value)
        if string.len(value) < 2 then
            return false, "Name too short"
        end
        if string.len(value) > 20 then
            return false, "Name too long"
        end
        if not string.match(value, "^[a-zA-Z ]+$") then
            return false, "Only letters and spaces allowed"
        end
        return true
    end,
    
    vehiclePlate = function(value)
        if string.len(value) ~= 8 then
            return false, "Plate must be 8 characters"
        end
        if not string.match(value, "^[A-Z0-9]+$") then
            return false, "Only uppercase letters and numbers"
        end
        return true
    end,
    
    phoneNumber = function(value)
        local digits = string.gsub(value, "[^%d]", "")
        if string.len(digits) ~= 10 then
            return false, "Invalid phone number format"
        end
        return true
    end
}
```

## Input Constants

### Input Types

```lua
InputTypes = {
    TEXT = "text",
    NUMBER = "number",
    EMAIL = "email",
    PASSWORD = "password",
    TEXTAREA = "textarea",
    SELECT = "select",
    MULTISELECT = "multiselect",
    CHECKBOX = "checkbox",
    RADIO = "radio",
    DATE = "date",
    TIME = "time",
    DATETIME = "datetime",
    COLOR = "color",
    RANGE = "range",
    FILE = "file"
}
```

### Validation Types

```lua
ValidationType = {
    REQUIRED = "required",
    MIN_LENGTH = "minLength",
    MAX_LENGTH = "maxLength",
    MIN = "min",
    MAX = "max",
    PATTERN = "pattern",
    EMAIL = "email",
    URL = "url",
    NUMERIC = "numeric",
    ALPHA = "alpha",
    ALPHANUMERIC = "alphanumeric",
    CUSTOM = "custom"
}
```

## Utility Functions

### `Bridge.Input.CreateInputId()`

Generates a unique input identifier.

**Returns:**
- `string`: Unique input ID

### `Bridge.Input.IsValidInputType(type)`

Checks if an input type is valid.

**Parameters:**
- `type` (string): Input type to check

**Returns:**
- `boolean`: True if valid

### `Bridge.Input.GetDefaultValue(field)`

Gets default value for a field based on type.

**Parameters:**
- `field` (table): Field definition

**Returns:**
- `any`: Default value

### `Bridge.Input.MergeFormConfigs(config1, config2)`

Merges two form configurations.

**Parameters:**
- `config1` (table): First configuration
- `config2` (table): Second configuration

**Returns:**
- `table`: Merged configuration

## Helper Functions

### Input Processing

```lua
-- Process form data with validation and formatting
function ProcessFormData(formData, schema)
    local processedData = {}
    local errors = {}
    
    for fieldName, fieldSchema in pairs(schema) do
        local value = formData[fieldName]
        
        -- Apply default if no value provided
        if value == nil and fieldSchema.default then
            value = fieldSchema.default
        end
        
        -- Validate
        local isValid, error = Bridge.Input.ValidateInputData({[fieldName] = value}, {[fieldName] = fieldSchema})
        if not isValid then
            table.insert(errors, {field = fieldName, message = error[1].message})
        else
            -- Format/normalize value
            local processedValue = Bridge.Input.NormalizeInput(value, fieldSchema.type)
            processedData[fieldName] = processedValue
        end
    end
    
    return processedData, errors
end
```

## Best Practices

### Validation Guidelines

1. **Client and server** - Validate on both sides
2. **Clear messages** - Provide helpful error messages
3. **Real-time feedback** - Validate as user types
4. **Security focused** - Sanitize all inputs
5. **User-friendly** - Guide users to correct format

### Performance Tips

1. **Efficient patterns** - Use optimized regex patterns
2. **Lazy validation** - Only validate when necessary
3. **Cached schemas** - Reuse validation schemas
4. **Batch processing** - Validate multiple fields together

### Example Implementation

```lua
-- Complete form processing example
local function CreateCharacterForm()
    local schema = Bridge.Input.CreateValidationSchema({
        {
            name = "firstName",
            type = "text",
            required = true,
            minLength = 2,
            maxLength = 20,
            pattern = "^[a-zA-Z]+$"
        },
        {
            name = "lastName",
            type = "text", 
            required = true,
            minLength = 2,
            maxLength = 20,
            pattern = "^[a-zA-Z]+$"
        },
        {
            name = "age",
            type = "number",
            required = true,
            min = 18,
            max = 100
        }
    })
    
    return {
        title = "Character Creation",
        schema = schema,
        fields = {
            Bridge.Input.CreateTextField({
                name = "firstName",
                label = "First Name",
                placeholder = "Enter first name",
                required = true
            }),
            Bridge.Input.CreateTextField({
                name = "lastName",
                label = "Last Name", 
                placeholder = "Enter last name",
                required = true
            }),
            Bridge.Input.CreateNumberField({
                name = "age",
                label = "Age",
                min = 18,
                max = 100,
                required = true
            })
        }
    }
end
```
