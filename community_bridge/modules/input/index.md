---
layout: default
title: Input
parent: Modules
grand_parent: Community Bridge
nav_order: 6
has_children: true
---

# Input Module
{: .no_toc }

The Input module provides a comprehensive system for collecting user input through various UI components including text inputs, forms, number inputs, and selection dialogs.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Input module bridges client-side input collection with server-side validation and processing. It supports multiple input types, real-time validation, custom styling, and session management for complex workflows.

### Key Features

- **Multiple Input Types**: Text, number, password, textarea, select dropdowns
- **Form Management**: Multi-field forms with validation and conditional logic
- **Real-time Validation**: Client and server-side validation with custom rules
- **Session Management**: Track input sessions and user interactions
- **Custom Styling**: Themed inputs with custom CSS and animations
- **Admin Controls**: Special admin inputs with enhanced permissions

## Architecture

```
Input Module
├── Client Functions    → UI rendering, validation, user interaction
├── Server Functions    → Data processing, validation, session management
└── Shared Functions    → Validation schemas, templates, formatting
```

## Input Types

### Basic Inputs
- **Text Input**: Single-line text collection
- **Number Input**: Numeric values with min/max validation
- **Password Input**: Masked text input for sensitive data
- **Textarea**: Multi-line text collection

### Advanced Inputs
- **Select Input**: Dropdown selection with search
- **Multi-Select**: Multiple option selection
- **Date Picker**: Date and time selection
- **File Upload**: File selection and upload

### Form Components
- **Input Forms**: Multi-field forms with validation
- **Wizard Forms**: Step-by-step form completion
- **Dynamic Forms**: Forms that adapt based on user input

## Quick Start

### Basic Text Input

```lua
-- Client Side
local result = Bridge.Input.ShowInput({
    header = "Enter Name",
    placeholder = "Your name here...",
    maxLength = 50,
    required = true
})

if result then
    TriggerServerEvent('myresource:saveName', result)
end
```

### Multi-Field Form

```lua
-- Client Side
local formData = Bridge.Input.ShowInputForm({
    title = "Player Registration",
    fields = {
        {name = "firstName", label = "First Name", type = "text", required = true},
        {name = "age", label = "Age", type = "number", min = 18, max = 100},
        {name = "city", label = "City", type = "select", options = {"Los Santos", "Sandy Shores", "Paleto Bay"}}
    }
})

if formData then
    TriggerServerEvent('myresource:registerPlayer', formData)
end
```

### Server-Side Processing

```lua
-- Server Side
RegisterServerEvent('myresource:registerPlayer')
AddEventHandler('myresource:registerPlayer', function(formData)
    local src = source
    
    -- Validate input
    local validation = Bridge.Input.ValidateInputData(formData, {
        firstName = {required = true, minLength = 2},
        age = {required = true, type = "number", min = 18},
        city = {required = true, enum = {"Los Santos", "Sandy Shores", "Paleto Bay"}}
    })
    
    if validation.valid then
        -- Process valid data
        SavePlayerData(src, formData)
        Bridge.Input.SendNotify(src, "Registration successful!", "success")
    else
        -- Handle validation errors
        Bridge.Input.SendNotify(src, validation.error, "error")
    end
end)
```

## Validation System

The Input module includes a robust validation system that works on both client and server sides:

### Client Validation
- Real-time validation as user types
- Visual feedback with error messages
- Prevent submission of invalid data

### Server Validation
- Comprehensive data validation
- Security checks and sanitization
- Custom validation rules

### Validation Rules
- **Required**: Field must have a value
- **Type**: Data type validation (string, number, boolean)
- **Length**: Minimum and maximum length constraints
- **Pattern**: Regular expression matching
- **Enum**: Value must be from predefined list
- **Custom**: Custom validation functions

## Styling and Themes

The Input module supports extensive customization:

### Default Themes
- **Dark Theme**: Modern dark UI
- **Light Theme**: Clean light interface
- **Neon Theme**: Colorful gaming aesthetic
- **Minimal Theme**: Simple, distraction-free design

### Custom Styling
```lua
local customStyle = {
    backgroundColor = "#1a1a1a",
    textColor = "#ffffff",
    borderColor = "#00ff88",
    focusColor = "#ff6b35",
    fontSize = "16px",
    borderRadius = "8px"
}

Bridge.Input.ShowInput({
    header = "Styled Input",
    style = customStyle
})
```

## Best Practices

### 1. Input Validation
```lua
-- Always validate on both client and server
-- Client for UX, server for security
local function validateName(name)
    if not name or #name < 2 then
        return false, "Name must be at least 2 characters"
    end
    if #name > 50 then
        return false, "Name cannot exceed 50 characters"
    end
    return true
end
```

### 2. User Experience
```lua
-- Provide clear labels and placeholders
{
    header = "Enter Your Character Name",
    placeholder = "e.g., John Smith",
    helpText = "This will be your character's display name"
}
```

### 3. Error Handling
```lua
-- Handle user cancellation gracefully
local result = Bridge.Input.ShowInput(inputConfig)
if result == nil then
    -- User cancelled - don't show error
    return
end
```

### 4. Performance
```lua
-- Use debouncing for real-time validation
-- Cache validation results
-- Minimize server validation calls
```

## Module Files

- **[Client Functions](client.md)**: UI rendering, user interaction, validation
- **[Server Functions](server.md)**: Data processing, session management, admin controls
- **[Shared Functions](shared.md)**: Validation schemas, templates, utilities

## Examples

### Character Creation Form
```lua
local Bridge = exports['community_bridge']:Bridge()

local characterData = Bridge.Input.ShowInputForm({
    title = "Create Character",
    subtitle = "Fill in your character details",
    fields = {
        {name = "firstName", label = "First Name", type = "text", required = true, maxLength = 30},
        {name = "lastName", label = "Last Name", type = "text", required = true, maxLength = 30},
        {name = "age", label = "Age", type = "number", min = 18, max = 80, required = true},
        {name = "gender", label = "Gender", type = "select", options = {"Male", "Female"}, required = true},
        {name = "backstory", label = "Backstory", type = "textarea", placeholder = "Tell us about your character...", maxLength = 500}
    },
    validation = {
        firstName = {pattern = "^[a-zA-Z]+$", message = "Only letters allowed"},
        lastName = {pattern = "^[a-zA-Z]+$", message = "Only letters allowed"}
    }
})
```

### Business Application
```lua
local Bridge = exports['community_bridge']:Bridge()

local businessApp = Bridge.Input.ShowInputForm({
    title = "Business License Application",
    fields = {
        {name = "businessName", label = "Business Name", type = "text", required = true},
        {name = "businessType", label = "Business Type", type = "select", 
         options = {"Restaurant", "Shop", "Service", "Entertainment"}},
        {name = "investment", label = "Initial Investment", type = "number", min = 10000},
        {name = "description", label = "Business Description", type = "textarea"},
        {name = "agreement", label = "I agree to the terms", type = "checkbox", required = true}
    }
})
```

---

The Input module provides powerful and flexible input collection capabilities for your FiveM server, with comprehensive validation, styling options, and seamless client-server integration.
