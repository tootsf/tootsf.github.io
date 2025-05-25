---
layout: default
title: Client Functions
parent: Input
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 1
permalink: /community_bridge/modules/input/client/
---

# Input Module - Client Functions
{: .no_toc }

Client-side functions for creating and managing input dialogs and forms.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Core Input Functions

### `exports.community_bridge:ShowInput(config)`

Displays a single input dialog.

**Parameters:**
- `config` (table): Input configuration
  - `title` (string): Dialog title
  - `subtitle` (string, optional): Dialog subtitle
  - `placeholder` (string, optional): Input placeholder text
  - `defaultValue` (string, optional): Default input value
  - `type` (string, optional): Input type ("text", "number", "password")
  - `maxLength` (number, optional): Maximum character length
  - `required` (boolean, optional): Whether input is required
  - `validation` (function, optional): Custom validation function

**Returns:**
- `string|nil`: User input or nil if cancelled

**Example:**
```lua
-- Simple text input
local playerName = exports.community_bridge:ShowInput({
    title = "Character Creation",
    subtitle = "Enter your character name",
    placeholder = "John Doe",
    maxLength = 50,
    required = true,
    validation = function(input)
        if string.len(input) < 2 then
            return false, "Name must be at least 2 characters"
        end
        return true
    end
})

if playerName then
    TriggerServerEvent('character:setName', playerName)
end
```

### `exports.community_bridge:ShowInputForm(config)`

Displays a multi-field input form.

**Parameters:**
- `config` (table): Form configuration
  - `title` (string): Form title
  - `subtitle` (string, optional): Form subtitle
  - `fields` (table): Array of input field definitions
  - `submitText` (string, optional): Submit button text
  - `cancelText` (string, optional): Cancel button text

**Returns:**
- `table|nil`: Form data or nil if cancelled

**Example:**
```lua
-- Character creation form
local characterData = exports.community_bridge:ShowInputForm({
    title = "Create Character",
    subtitle = "Fill in your character details",
    submitText = "Create Character",
    fields = {
        {
            name = "firstname",
            label = "First Name",
            type = "text",
            placeholder = "John",
            required = true,
            maxLength = 20
        },
        {
            name = "lastname", 
            label = "Last Name",
            type = "text",
            placeholder = "Doe",
            required = true,
            maxLength = 20
        },
        {
            name = "age",
            label = "Age",
            type = "number",
            min = 18,
            max = 100,
            default = 25,
            required = true
        },
        {
            name = "phone",
            label = "Phone Number",
            type = "text",
            placeholder = "555-0123",
            pattern = "^[0-9-]+$",
            validation = function(value)
                if not string.match(value, "^%d%d%d%-%d%d%d%d$") then
                    return false, "Invalid phone format (XXX-XXXX)"
                end
                return true
            end
        }
    }
})

if characterData then
    TriggerServerEvent('character:create', characterData)
end
```

### `exports.community_bridge:ShowNumberInput(config)`

Specialized function for number inputs with validation.

**Parameters:**
- `config` (table): Number input configuration
  - `title` (string): Dialog title
  - `subtitle` (string, optional): Dialog subtitle
  - `min` (number, optional): Minimum value
  - `max` (number, optional): Maximum value
  - `default` (number, optional): Default value
  - `step` (number, optional): Step increment
  - `decimals` (number, optional): Decimal places allowed

**Returns:**
- `number|nil`: User input number or nil if cancelled

**Example:**
```lua
-- Money transfer input
local amount = exports.community_bridge:ShowNumberInput({
    title = "Transfer Money",
    subtitle = "Enter amount to transfer",
    min = 1,
    max = 1000000,
    step = 1,
    decimals = 0,
    default = 100
})

if amount then
    TriggerServerEvent('banking:transfer', targetPlayerId, amount)
end
```

## Advanced Input Functions

### `exports.community_bridge:ShowSelectInput(config)`

Displays a selection input with predefined options.

**Parameters:**
- `config` (table): Select configuration
  - `title` (string): Dialog title
  - `options` (table): Array of selection options
  - `multiple` (boolean, optional): Allow multiple selections
  - `searchable` (boolean, optional): Enable search functionality

**Returns:**
- `string|table|nil`: Selected value(s) or nil if cancelled

**Example:**
```lua
-- Job selection
local selectedJob = exports.community_bridge:ShowSelectInput({
    title = "Choose Job",
    subtitle = "Select your profession",
    searchable = true,
    options = {
        {value = "police", label = "Police Officer", description = "Protect and serve"},
        {value = "medic", label = "Paramedic", description = "Save lives"},
        {value = "mechanic", label = "Mechanic", description = "Fix vehicles"},
        {value = "taxi", label = "Taxi Driver", description = "Transport passengers"}
    }
})

if selectedJob then
    TriggerServerEvent('job:apply', selectedJob)
end
```

### `exports.community_bridge:ShowDateInput(config)`

Displays a date picker input.

**Parameters:**
- `config` (table): Date input configuration
  - `title` (string): Dialog title
  - `format` (string, optional): Date format ("MM/DD/YYYY", "DD/MM/YYYY", etc.)
  - `minDate` (string, optional): Minimum selectable date
  - `maxDate` (string, optional): Maximum selectable date
  - `default` (string, optional): Default date

**Returns:**
- `string|nil`: Selected date or nil if cancelled

**Example:**
```lua
-- Appointment booking
local appointmentDate = exports.community_bridge:ShowDateInput({
    title = "Book Appointment",
    subtitle = "Select appointment date",
    format = "MM/DD/YYYY",
    minDate = "today",
    maxDate = "+30days"
})

if appointmentDate then
    TriggerServerEvent('appointments:book', appointmentDate)
end
```

### `exports.community_bridge:ShowColorInput(config)`

Displays a color picker input.

**Parameters:**
- `config` (table): Color input configuration
  - `title` (string): Dialog title
  - `default` (string, optional): Default color (hex format)
  - `palette` (table, optional): Predefined color palette

**Returns:**
- `string|nil`: Selected color (hex format) or nil if cancelled

**Example:**
```lua
-- Vehicle color selection
local vehicleColor = exports.community_bridge:ShowColorInput({
    title = "Vehicle Color",
    subtitle = "Choose primary color",
    default = "#FF0000",
    palette = {
        "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
        "#FF00FF", "#00FFFF", "#FFFFFF", "#000000"
    }
})

if vehicleColor then
    TriggerServerEvent('vehicle:setColor', vehicleColor)
end
```

## Input Validation

### `exports.community_bridge:SetValidationRule(name, rule)`

Registers a custom validation rule.

**Parameters:**
- `name` (string): Rule name
- `rule` (function): Validation function

**Example:**
```lua
-- Register email validation rule
exports.community_bridge:SetValidationRule("email", function(value)
    local pattern = "^[%w%._%+%-]+@[%w%._%+%-]+%.%w+$"
    if string.match(value, pattern) then
        return true
    else
        return false, "Invalid email format"
    end
end)

-- Use in input form
local userData = exports.community_bridge:ShowInputForm({
    title = "Registration",
    fields = {
        {
            name = "email",
            label = "Email Address",
            type = "email",
            validation = "email" -- Use registered rule
        }
    }
})
```

### `exports.community_bridge:ValidateInput(value, rules)`

Manually validates input against rules.

**Parameters:**
- `value` (string): Value to validate
- `rules` (table): Validation rules

**Returns:**
- `boolean`: True if valid
- `string`: Error message if invalid

**Example:**
```lua
local isValid, error = exports.community_bridge:ValidateInput("test@email.com", {
    required = true,
    type = "email",
    maxLength = 50
})

if not isValid then
    print("Validation error:", error)
end
```

## Input Templates

### `exports.community_bridge:ShowPasswordChangeForm()`

Predefined form for password changes.

**Returns:**
- `table|nil`: Password data or nil if cancelled

**Example:**
```lua
local passwordData = exports.community_bridge:ShowPasswordChangeForm()
if passwordData then
    TriggerServerEvent('account:changePassword', passwordData.current, passwordData.new)
end
```

### `exports.community_bridge:ShowContactForm()`

Predefined contact information form.

**Returns:**
- `table|nil`: Contact data or nil if cancelled

**Example:**
```lua
local contactInfo = exports.community_bridge:ShowContactForm()
if contactInfo then
    TriggerServerEvent('profile:updateContact', contactInfo)
end
```

### `exports.community_bridge:ShowPaymentForm(amount)`

Predefined payment form with amount.

**Parameters:**
- `amount` (number): Payment amount

**Returns:**
- `table|nil`: Payment data or nil if cancelled

**Example:**
```lua
local paymentData = exports.community_bridge:ShowPaymentForm(500)
if paymentData then
    TriggerServerEvent('payment:process', paymentData)
end
```

## Utility Functions

### `exports.community_bridge:IsInputOpen()`

Checks if an input dialog is currently open.

**Returns:**
- `boolean`: True if input is open

**Example:**
```lua
if not exports.community_bridge:IsInputOpen() then
    -- Safe to open new input
    exports.community_bridge:ShowInput(config)
end
```

### `exports.community_bridge:CloseInput()`

Programmatically closes the current input dialog.

**Example:**
```lua
-- Close input on specific event
AddEventHandler('playerDied', function()
    exports.community_bridge:CloseInput()
end)
```

### `exports.community_bridge:SetInputStyle(style)`

Customizes input dialog appearance.

**Parameters:**
- `style` (table): Style configuration

**Example:**
```lua
exports.community_bridge:SetInputStyle({
    backgroundColor = "#1a1a1a",
    textColor = "#ffffff",
    accentColor = "#007ACC",
    borderRadius = "8px",
    font = "Arial, sans-serif"
})
```

## Event Handlers

### Input Events

```lua
-- Input opened
AddEventHandler('community_bridge:inputOpened', function(inputType)
    print("Input dialog opened:", inputType)
    -- Disable other UI elements
    SetNuiFocus(true, true)
end)

-- Input closed
AddEventHandler('community_bridge:inputClosed', function(inputType, data)
    print("Input dialog closed:", inputType)
    -- Re-enable UI elements
    SetNuiFocus(false, false)
end)

-- Input validation failed
AddEventHandler('community_bridge:inputValidationFailed', function(field, error)
    print("Validation failed for", field, ":", error)
end)
```

## Best Practices

### Form Design Guidelines

1. **Clear labels** - Use descriptive field labels
2. **Helpful placeholders** - Provide example input
3. **Logical order** - Arrange fields in logical sequence
4. **Required indicators** - Mark required fields clearly
5. **Validation feedback** - Provide immediate validation feedback

### User Experience Tips

1. **Progressive disclosure** - Don't overwhelm with too many fields
2. **Default values** - Provide sensible defaults where possible
3. **Error handling** - Give clear, actionable error messages
4. **Confirmation** - Confirm destructive actions
5. **Accessibility** - Support keyboard navigation

### Performance Considerations

1. **Minimal data** - Only collect necessary information
2. **Client validation** - Validate on client before server
3. **Debounced validation** - Don't validate on every keystroke
4. **Lazy loading** - Load options when needed

### Example Usage Patterns

```lua
-- Multi-step form with validation
local function CreateCharacterWizard()
    -- Step 1: Basic info
    local basicInfo = exports.community_bridge:ShowInputForm({
        title = "Character Creation - Step 1",
        subtitle = "Basic Information",
        fields = {
            {name = "firstname", label = "First Name", required = true},
            {name = "lastname", label = "Last Name", required = true},
            {name = "age", label = "Age", type = "number", min = 18, max = 100}
        }
    })
    
    if not basicInfo then return end
    
    -- Step 2: Appearance
    local appearance = exports.community_bridge:ShowInputForm({
        title = "Character Creation - Step 2", 
        subtitle = "Appearance",
        fields = {
            {name = "gender", label = "Gender", type = "select", 
             options = {
                 {value = "male", label = "Male"},
                 {value = "female", label = "Female"}
             }},
            {name = "height", label = "Height (cm)", type = "number", min = 150, max = 200}
        }
    })
    
    if not appearance then return end
    
    -- Combine and submit
    local characterData = {}
    for k, v in pairs(basicInfo) do characterData[k] = v end
    for k, v in pairs(appearance) do characterData[k] = v end
    
    TriggerServerEvent('character:create', characterData)
end
```

### Error Handling

```lua
-- Safe input with error handling
local function SafeInput(config)
    local success, result = pcall(function()
        return exports.community_bridge:ShowInput(config)
    end)
    
    if not success then
        print("Input error:", result)
        exports.community_bridge:SendNotify("Input failed", "error")
        return nil
    end
    
    return result
end
```
