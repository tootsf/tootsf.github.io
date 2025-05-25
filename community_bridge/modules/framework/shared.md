---
layout: default
title: Shared Functions
parent: Framework
grand_parent: Modules
nav_order: 3
---

# Framework Shared Functions
{: .no_toc }

Shared utilities and functions available on both client and server sides.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

Shared functions provide utilities that can be used on both client and server sides, typically for data validation, formatting, and common operations.

## Utility Functions

### IsValidIdentifier
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Framework.IsValidIdentifier(identifier)
```

Validates if an identifier string is properly formatted.

**Parameters:**
- `identifier` (string) - Identifier to validate

**Returns:** 
- `boolean` - True if valid, false otherwise

**Example:**
```lua
local identifier = "steam:110000103fa6de1"
if Framework.IsValidIdentifier(identifier) then
    print("Valid identifier format")
end
```

---

### FormatMoney
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Framework.FormatMoney(amount)
```

Formats a money amount for display.

**Parameters:**
- `amount` (number) - Money amount to format

**Returns:** 
- `string` - Formatted money string

**Example:**
```lua
local formatted = Framework.FormatMoney(1234567)
print(formatted) -- Output: "$1,234,567"
```

---

### ValidateJobData
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Framework.ValidateJobData(jobData)
```

Validates job data structure.

**Parameters:**
- `jobData` (table) - Job data to validate

**Returns:** 
- `boolean` - True if valid, false otherwise

**Example:**
```lua
local jobData = {
    name = "police",
    label = "Police",
    grade = 2,
    grade_label = "Officer"
}

if Framework.ValidateJobData(jobData) then
    print("Job data is valid")
end
```

---

## Configuration

### GetFrameworkType
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Framework.GetFrameworkType()
```

Returns the detected framework type.

**Returns:** 
- `string` - Framework name ("esx", "qbcore", "custom", etc.)

**Example:**
```lua
local framework = Framework.GetFrameworkType()
print("Running on: " .. framework)
```

---

### IsFrameworkLoaded
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Framework.IsFrameworkLoaded()
```

Checks if the framework is fully loaded and ready.

**Returns:** 
- `boolean` - True if loaded, false otherwise

**Example:**
```lua
while not Framework.IsFrameworkLoaded() do
    Citizen.Wait(100)
end
print("Framework is ready!")
```

---

## Constants

### Framework Types
```lua
Framework.Types = {
    ESX = "esx",
    QBCORE = "qbcore",
    CUSTOM = "custom"
}
```

### Money Types
```lua
Framework.MoneyTypes = {
    CASH = "money",
    BANK = "bank",
    CRYPTO = "crypto"
}
```

### Job Grades
```lua
Framework.DefaultGrades = {
    UNEMPLOYED = 0,
    EMPLOYEE = 1,
    SUPERVISOR = 2,
    MANAGER = 3,
    BOSS = 4
}
```

---

## Best Practices

### Framework Detection
```lua
-- Check framework type before using specific features
local frameworkType = Framework.GetFrameworkType()
if frameworkType == Framework.Types.ESX then
    -- ESX-specific logic
elseif frameworkType == Framework.Types.QBCORE then
    -- QBCore-specific logic
end
```

### Data Validation
```lua
-- Always validate data before processing
local function processPlayerData(playerData)
    if not playerData or not playerData.identifier then
        return false, "Invalid player data"
    end
    
    if not Framework.IsValidIdentifier(playerData.identifier) then
        return false, "Invalid identifier format"
    end
    
    return true, "Valid"
end
```
