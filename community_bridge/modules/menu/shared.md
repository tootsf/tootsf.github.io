---
layout: default
title: Shared Functions
parent: Menu
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 3
has_children: true
permalink: /community_bridge/modules/menu/shared/
---

# Menu Module - Shared Functions
{: .no_toc }

Shared utilities and configurations for the Menu module.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

Shared menu functions provide validation, formatting, and utility functions for menu systems.

---

## 🔹 ValidateMenuOptions

Validates menu option structure and data types.

**Parameters:**
- `options` (table): Menu options to validate

**Returns:**
- `boolean`: True if valid
- `string`: Error message if invalid

**Example:**
```lua
local menuOptions = {
    title = "Test Menu",
    options = {
        { title = "Option 1", onSelect = function() end },
        { title = "Option 2", onSelect = function() end }
    }
}

local isValid, errorMsg = Bridge.Menu.ValidateMenuOptions(menuOptions)
if not isValid then
    print("Menu validation failed:", errorMsg)
end
```

### `Bridge.Menu.ValidateInputFields(fields)`

Validates input field configurations.

**Parameters:**
- `fields` (table): Array of input field definitions

**Returns:**
- `boolean`: True if valid
- `table`: Array of validation errors

**Example:**
```lua
local inputFields = {
    {
        name = "username",
        label = "Username",
        type = "text",
        required = true,
        minLength = 3,
        maxLength = 20
    },
    {
        name = "age",
        label = "Age",
        type = "number",
        min = 18,
        max = 100
    }
}

local isValid, errors = Bridge.Menu.ValidateInputFields(inputFields)
if not isValid then
    for _, error in pairs(errors) do
        print("Validation error:", error)
    end
end
```

## Formatting Functions

### `Bridge.Menu.FormatMenuTitle(title, subtitle)`

Formats menu titles with consistent styling.

**Parameters:**
- `title` (string): Primary title
- `subtitle` (string, optional): Secondary title

**Returns:**
- `string`: Formatted title

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local formattedTitle = Bridge.Menu.FormatMenuTitle(
    "Vehicle Dealership", 
    "Premium Cars & Motorcycles"
)
-- Returns: "Vehicle Dealership\n~s~Premium Cars & Motorcycles"
```

### `Bridge.Menu.FormatPrice(amount, currency)`

Formats price displays in menus.

**Parameters:**
- `amount` (number): Price amount
- `currency` (string, optional): Currency symbol (default: "$")

**Returns:**
- `string`: Formatted price string

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local price = Bridge.Menu.FormatPrice(1500000, "$")
-- Returns: "$1,500,000"

local euroPrice = Bridge.Menu.FormatPrice(50000, "€")
-- Returns: "€50,000"
```

### `Bridge.Menu.FormatDescription(text, maxLength)`

Formats and truncates description text.

**Parameters:**
- `text` (string): Description text
- `maxLength` (number, optional): Maximum length (default: 50)

**Returns:**
- `string`: Formatted description

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local desc = Bridge.Menu.FormatDescription(
    "This is a very long description that should be truncated", 
    30
)
-- Returns: "This is a very long descript..."
```

## Icon and Style Utilities

### `Bridge.Menu.GetMenuIcon(iconType)`

Gets standardized icons for common menu elements.

**Parameters:**
- `iconType` (string): Icon type identifier

**Returns:**
- `string`: Icon class or character

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local buyIcon = Bridge.Menu.GetMenuIcon("buy")        -- "fas fa-shopping-cart"
local sellIcon = Bridge.Menu.GetMenuIcon("sell")      -- "fas fa-money-bill"
local lockIcon = Bridge.Menu.GetMenuIcon("lock")      -- "fas fa-lock"
local unlockIcon = Bridge.Menu.GetMenuIcon("unlock")  -- "fas fa-unlock"
```

### `Bridge.Menu.GetMenuColor(colorType)`

Gets standardized colors for menu elements.

**Parameters:**
- `colorType` (string): Color type identifier

**Returns:**
- `string`: Color code or class

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local successColor = Bridge.Menu.GetMenuColor("success")  -- "#4CAF50"
local errorColor = Bridge.Menu.GetMenuColor("error")       -- "#F44336"
local warningColor = Bridge.Menu.GetMenuColor("warning")   -- "#FF9800"
local infoColor = Bridge.Menu.GetMenuColor("info")         -- "#2196F3"
```

## Menu Templates

### `Bridge.Menu.CreateShopTemplate(config)`

Creates a standardized shop menu template.

**Parameters:**
- `config` (table): Shop configuration
  - `title` (string): Shop name
  - `items` (table): Array of shop items
  - `currency` (string, optional): Currency symbol

**Returns:**
- `table`: Complete menu structure

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local shopMenu = Bridge.Menu.CreateShopTemplate({
    title = "24/7 Store",
    currency = "$",
    items = {
        { name = "water", label = "Water Bottle", price = 50 },
        { name = "sandwich", label = "Sandwich", price = 100 },
        { name = "cola", label = "Cola", price = 75 }
    }
})
```

### `Bridge.Menu.CreateVehicleTemplate(vehicles)`

Creates a vehicle selection menu template.

**Parameters:**
- `vehicles` (table): Array of vehicle data

**Returns:**
- `table`: Vehicle menu structure

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local vehicleMenu = Bridge.Menu.CreateVehicleTemplate({
    {
        model = "adder",
        name = "Truffade Adder",
        category = "Super",
        price = 1000000,
        speed = 95,
        acceleration = 85
    },
    {
        model = "zentorno",
        name = "Pegassi Zentorno", 
        category = "Super",
        price = 725000,
        speed = 90,
        acceleration = 90
    }
})
```

### `Bridge.Menu.CreateJobTemplate(jobActions)`

Creates a job-specific menu template.

**Parameters:**
- `jobActions` (table): Array of job actions

**Returns:**
- `table`: Job menu structure

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local policeMenu = Bridge.Menu.CreateJobTemplate({
    {
        action = "cuff",
        label = "Handcuff Player",
        icon = "fas fa-handcuffs",
        requiredGrade = 0
    },
    {
        action = "fine",
        label = "Issue Fine",
        icon = "fas fa-money-bill",
        requiredGrade = 1
    },
    {
        action = "arrest",
        label = "Arrest Player",
        icon = "fas fa-user-lock",
        requiredGrade = 2
    }
})
```

## Utility Functions

### `Bridge.Menu.SortMenuOptions(options, sortBy)`

Sorts menu options by specified criteria.

**Parameters:**
- `options` (table): Array of menu options
- `sortBy` (string): Sort criteria ("title", "price", "order")

**Returns:**
- `table`: Sorted options array

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local sortedOptions = Bridge.Menu.SortMenuOptions(menuOptions, "price")
```

### `Bridge.Menu.FilterMenuOptions(options, filter)`

Filters menu options based on criteria.

**Parameters:**
- `options` (table): Array of menu options
- `filter` (function): Filter function

**Returns:**
- `table`: Filtered options array

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local affordableItems = Bridge.Menu.FilterMenuOptions(shopItems, function(item)
    return item.price <= playerMoney
end)
```

### `Bridge.Menu.MergeMenuOptions(option1, option2)`

Merges two menu option sets.

**Parameters:**
- `option1` (table): First option set
- `option2` (table): Second option set

**Returns:**
- `table`: Merged options

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local allOptions = Bridge.Menu.MergeMenuOptions(basicItems, premiumItems)
```

## Configuration Constants

### Menu Types

```lua
MenuTypes = {
    CONTEXT = "context",
    LIST = "list", 
    INPUT = "input",
    CONFIRM = "confirm",
    GRID = "grid"
}
```

### Input Types

```lua
InputTypes = {
    TEXT = "text",
    NUMBER = "number",
    PASSWORD = "password",
    EMAIL = "email",
    SELECT = "select",
    CHECKBOX = "checkbox",
    SLIDER = "slider"
}
```

### Icon Categories

```lua
MenuIcons = {
    -- Actions
    BUY = "fas fa-shopping-cart",
    SELL = "fas fa-money-bill",
    USE = "fas fa-hand-paper",
    DROP = "fas fa-trash",
    GIVE = "fas fa-gift",
    
    -- Status
    LOCK = "fas fa-lock",
    UNLOCK = "fas fa-unlock",
    ONLINE = "fas fa-circle",
    OFFLINE = "far fa-circle",
    
    -- Categories
    VEHICLE = "fas fa-car",
    WEAPON = "fas fa-gun",
    FOOD = "fas fa-hamburger",
    DRINK = "fas fa-coffee",
    MEDICAL = "fas fa-medkit",
    
    -- Navigation
    BACK = "fas fa-arrow-left",
    FORWARD = "fas fa-arrow-right",
    UP = "fas fa-arrow-up",
    DOWN = "fas fa-arrow-down",
    CLOSE = "fas fa-times"
}
```

## Error Constants

```lua
MenuErrors = {
    INVALID_OPTIONS = "Invalid menu options provided",
    MISSING_TITLE = "Menu title is required",
    EMPTY_OPTIONS = "Menu must have at least one option",
    INVALID_CALLBACK = "Menu option callback must be a function",
    UNSUPPORTED_TYPE = "Unsupported menu type",
    PERMISSION_DENIED = "Player lacks permission for this menu",
    MENU_NOT_FOUND = "Menu configuration not found"
}
```

## Helper Functions

### `Bridge.Menu.IsMenuDataValid(data)`

Quick validation check for menu data.

**Parameters:**
- `data` (table): Menu data to validate

**Returns:**
- `boolean`: True if data is valid

### `Bridge.Menu.GetDefaultMenuStyle()`

Gets default styling configuration.

**Returns:**
- `table`: Default style settings

### `Bridge.Menu.ConvertLegacyMenu(legacyData)`

Converts old menu format to new standard.

**Parameters:**
- `legacyData` (table): Legacy menu data

**Returns:**
- `table`: Converted menu data

## Best Practices

### Validation Guidelines

1. **Always validate** - Check all menu data before processing
2. **Provide fallbacks** - Handle invalid data gracefully
3. **Clear error messages** - Help developers identify issues
4. **Type checking** - Ensure proper data types

### Performance Tips

1. **Reuse templates** - Use standard templates when possible
2. **Cache formatted data** - Don't reformat repeatedly
3. **Efficient sorting** - Sort once, use multiple times
4. **Minimal validation** - Only validate what's necessary

### Code Examples

```lua
-- Complete menu creation with validation
local function CreateSafeMenu(title, items)
    -- Validate input
    if not title or type(title) ~= "string" then
        return nil, "Invalid title"
    end
    
    if not items or #items == 0 then
        return nil, "No menu items provided"
    end
    
    -- Format and validate each item
    local formattedItems = {}
    for _, item in pairs(items) do
        local isValid, error = Bridge.Menu.ValidateMenuOptions({item})
        if isValid then
            table.insert(formattedItems, item)
        else
            print("Skipping invalid menu item:", error)
        end
    end
    
    if #formattedItems == 0 then
        return nil, "No valid menu items"
    end
    
    return {
        title = Bridge.Menu.FormatMenuTitle(title),
        options = formattedItems
    }
end
```
