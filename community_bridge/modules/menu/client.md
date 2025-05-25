---
layout: default
title: Client Functions
parent: Menu
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 1
permalink: /community_bridge/modules/menu/client/
---

# Menu Module - Client Functions
{: .no_toc }

Client-side functions for creating and managing interactive menus.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Core Menu Functions

### `exports.community_bridge:OpenContextMenu(options)`

Opens a context menu with the specified options.

**Parameters:**
- `options` (table): Menu configuration
  - `title` (string): Menu title
  - `options` (table): Array of menu items
  - `position` (string, optional): Menu position ("top-left", "top-right", etc.)

**Returns:**
- `boolean`: Success status

**Example:**
```lua
local success = exports.community_bridge:OpenContextMenu({
    title = "Vehicle Options",
    options = {
        {
            title = "Lock/Unlock",
            description = "Toggle vehicle lock",
            icon = "fas fa-lock",
            onSelect = function()
                -- Toggle lock logic
                print("Vehicle lock toggled")
            end
        },
        {
            title = "Engine On/Off",
            description = "Toggle engine state",
            icon = "fas fa-power-off",
            onSelect = function()
                -- Engine toggle logic
                print("Engine toggled")
            end
        }
    }
})
```

### `exports.community_bridge:OpenListMenu(options)`

Opens a scrollable list menu.

**Parameters:**
- `options` (table): Menu configuration
  - `title` (string): Menu title
  - `subtitle` (string, optional): Menu subtitle
  - `options` (table): Array of menu items
  - `canClose` (boolean, optional): Whether menu can be closed with ESC

**Returns:**
- `boolean`: Success status

**Example:**
```lua
exports.community_bridge:OpenListMenu({
    title = "Vehicle Dealership",
    subtitle = "Select a vehicle to purchase",
    canClose = true,
    options = {
        {
            title = "Adder",
            description = "High-end supercar",
            price = 1000000,
            rightLabel = "$1,000,000",
            onSelect = function(data)
                -- Purchase logic
                TriggerServerEvent('dealership:buyVehicle', 'adder', data.price)
            end
        },
        {
            title = "Zentorno",
            description = "Sports car",
            price = 725000,
            rightLabel = "$725,000",
            onSelect = function(data)
                TriggerServerEvent('dealership:buyVehicle', 'zentorno', data.price)
            end
        }
    }
})
```

## Input Functions

### `exports.community_bridge:OpenInputDialog(options)`

Opens an input dialog for collecting user data.

**Parameters:**
- `options` (table): Input configuration
  - `title` (string): Dialog title
  - `inputs` (table): Array of input fields
  - `onSubmit` (function): Callback when submitted

**Returns:**
- `boolean`: Success status

**Example:**
```lua
exports.community_bridge:OpenInputDialog({
    title = "Create Character",
    inputs = {
        {
            name = "firstname",
            label = "First Name",
            type = "text",
            required = true,
            maxLength = 20
        },
        {
            name = "lastname",
            label = "Last Name",
            type = "text",
            required = true,
            maxLength = 20
        },
        {
            name = "age",
            label = "Age",
            type = "number",
            min = 18,
            max = 100,
            default = 25
        }
    },
    onSubmit = function(data)
        if data then
            TriggerServerEvent('character:create', data)
        end
    end
})
```

### `exports.community_bridge:OpenConfirmDialog(options)`

Opens a confirmation dialog.

**Parameters:**
- `options` (table): Confirmation configuration
  - `title` (string): Dialog title
  - `description` (string): Confirmation message
  - `onConfirm` (function): Callback when confirmed
  - `onCancel` (function, optional): Callback when cancelled

**Returns:**
- `boolean`: Success status

**Example:**
```lua
exports.community_bridge:OpenConfirmDialog({
    title = "Delete Character",
    description = "Are you sure you want to delete this character? This action cannot be undone.",
    onConfirm = function()
        TriggerServerEvent('character:delete', selectedCharId)
    end,
    onCancel = function()
        print("Character deletion cancelled")
    end
})
```

## Utility Functions

### `exports.community_bridge:CloseMenu()`

Closes the currently open menu.

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Close menu programmatically
exports.community_bridge:CloseMenu()
```

### `exports.community_bridge:IsMenuOpen()`

Checks if a menu is currently open.

**Returns:**
- `boolean`: True if menu is open

**Example:**
```lua
if exports.community_bridge:IsMenuOpen() then
    print("Menu is currently open")
end
```

### `exports.community_bridge:GetMenuType()`

Gets the current menu system being used.

**Returns:**
- `string`: Menu system name ("ox_lib", "qb-menu", etc.)

**Example:**
```lua
local menuSystem = exports.community_bridge:GetMenuType()
print("Using menu system:", menuSystem)
```

## Advanced Features

### Nested Menus

Create multi-level menu navigation:

```lua
local mainMenu = {
    title = "Main Menu",
    options = {
        {
            title = "Settings",
            onSelect = function()
                exports.community_bridge:OpenContextMenu({
                    title = "Settings",
                    options = {
                        {
                            title = "Audio Settings",
                            onSelect = function()
                                -- Open audio settings submenu
                            end
                        },
                        {
                            title = "Video Settings",
                            onSelect = function()
                                -- Open video settings submenu
                            end
                        }
                    }
                })
            end
        }
    }
}
```

### Dynamic Menu Updates

Update menu options dynamically:

```lua
-- Example: Update inventory menu based on current items
local function UpdateInventoryMenu()
    local items = exports.community_bridge:GetPlayerItems()
    local menuOptions = {}
    
    for _, item in pairs(items) do
        table.insert(menuOptions, {
            title = item.label,
            description = "Count: " .. item.count,
            onSelect = function()
                TriggerServerEvent('inventory:useItem', item.name)
            end
        })
    end
    
    exports.community_bridge:OpenListMenu({
        title = "Inventory",
        options = menuOptions
    })
end
```

## Event Handlers

Register for menu events:

```lua
-- Menu opened event
AddEventHandler('community_bridge:menuOpened', function(menuType, menuData)
    print("Menu opened:", menuType)
end)

-- Menu closed event
AddEventHandler('community_bridge:menuClosed', function(menuType)
    print("Menu closed:", menuType)
end)

-- Menu selection event
AddEventHandler('community_bridge:menuSelection', function(menuType, selection)
    print("Menu selection:", selection.title)
end)
```

## Best Practices

### Menu Design Guidelines

1. **Keep titles concise** - Use clear, short titles
2. **Provide descriptions** - Help users understand options
3. **Use icons** - Visual indicators improve UX
4. **Logical grouping** - Group related options together
5. **Consistent styling** - Maintain visual consistency

### Performance Tips

1. **Lazy loading** - Load menu data when needed
2. **Limit options** - Don't overwhelm with too many choices
3. **Cache static data** - Reuse menu configurations
4. **Clean up** - Properly close menus when done

### Error Handling

```lua
local success = exports.community_bridge:OpenContextMenu(menuOptions)
if not success then
    exports.community_bridge:SendNotify("Failed to open menu", "error")
end
```
