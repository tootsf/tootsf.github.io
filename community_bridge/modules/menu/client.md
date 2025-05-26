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

## 📚 Core Menu Functions

---

## 🔹 Open
{: .d-inline-block }
Client
{: .label .label-blue }

```lua
local Bridge = exports['community_bridge']:Bridge()
Bridge.Menu.Open(data, useQb)
```

Opens a menu based on the provided configuration. This function can handle both ox_lib and qb-menu formats.

**Parameters:**
- `data` (table) - Menu configuration data
- `useQb` (boolean) - Whether to use QB menu syntax (true) or ox_lib syntax (false)

**Returns:** 
- `string` - Menu ID

**Example (ox_lib format):**
```lua
local Menu = exports['community_bridge']:Menu()

local menuData = {
    id = "test_menu",
    title = "Test Menu",
    options = {
        {
            title = "First Button",
            description = "Open a secondary menu!",
            icon = "fas fa-code-pull-request",
            args = {
                number = 1,
            },
            onSelect = function(selected, secondary, args)
                print("Selected option 1")
            end
        },
        {
            title = "Second Button",
            description = "Another option",
            icon = "fas fa-code-pull-request",
            args = {
                number = 2,
            },
            onSelect = function(selected, secondary, args)
                print("Selected option 2")
            end
        }
    }
}

local Bridge = exports['community_bridge']:Bridge()
local menuId = Bridge.Menu.Open(menuData, false) -- false for ox_lib format
```

**Example (QB menu format):**
```lua
local Bridge = exports['community_bridge']:Bridge()

local qbMenuData = {
    {
        header = 'QBCore Test Menu',
        icon = 'fas fa-code',
        isMenuHeader = true, -- Set to true to make a nonclickable title
    },
    {
        header = 'First Button',
        txt = 'Open a secondary menu!',
        icon = 'fas fa-code-pull-request',
        params = {
            event = 'myResource:client:handleSelection',
            args = {
                number = 1,
            }
        }
    },
    {
        header = 'Second Button',
        txt = 'Another option',
        icon = 'fas fa-code-pull-request',
        params = {
            event = 'myResource:client:handleSelection',
            args = {
                number = 2,
            }
        }
    }
}

local menuId = Bridge.Menu.Open(qbMenuData, true) -- true for QB menu format

-- Handle the selection event
RegisterNetEvent('myResource:client:handleSelection', function(args)
    print("Selected option with number:", args.number)
end)
```

---

## 📚 Menu Data Formats

---

## 🔹 ox_lib Format
```lua
{
    id = "unique_menu_id",        -- Optional, auto-generated if not provided
    title = "Menu Title",
    options = {
        {
            title = "Option Title",
            description = "Option description",
            icon = "fas fa-icon",     -- FontAwesome icon
            args = {},                -- Custom data
            onSelect = function(selected, secondary, args)
                -- Handle selection
            end
        }
    }
}
```

---

## 🔹 QB Menu Format
```lua
{
    {
        header = 'Menu Title',
        icon = 'fas fa-icon',
        isMenuHeader = true,  -- Makes this a non-clickable header
    },
    {
        header = 'Option Title',
        txt = 'Option description',
        icon = 'fas fa-icon',
        disabled = false,     -- Optional, makes option non-clickable
        hidden = false,       -- Optional, hides the option
        params = {
            isServer = false, -- Optional, specify if event is server-side
            event = 'event:name',
            args = {}         -- Custom data
        }
    }
}
```

---

## Events

### MenuCallback Event
```lua
RegisterNetEvent('community_bridge:client:MenuCallback', function(args)
    local id = args.id
    local onSelect = args.onSelect
    local args = args.args
    -- Handle callback
    onSelect(args)
end)
```

---

## Best Practices

### Menu Creation
```lua
-- Always check if the menu system is available
local Menu = exports['community_bridge']:Menu()
if not Menu then
    print("Community Bridge menu system not available")
    return
end

-- Use meaningful IDs for menus you might need to reference later
local menuData = {
    id = "player_actions_menu",
    title = "Player Actions",
    options = {}
}
```

### Error Handling
```lua
-- Validate menu data before opening
local function ValidateMenuData(data, useQb)
    if not data then
        print("Menu data is required")
        return false
    end
    
    if useQb then
        if not data[1] then
            print("QB menu requires at least one option")
            return false
        end
    else
        if not data.options or #data.options == 0 then
            print("ox_lib menu requires options array")
            return false
        end
    end
    
    return true
end

local function SafeOpenMenu(data, useQb)
    if ValidateMenuData(data, useQb) then
        return Bridge.Menu.Open(data, useQb)
    end
    return nil
end
```

### Framework Detection
```lua
-- Automatically detect which menu format to use
local function DetectMenuFormat()
    if GetResourceState('ox_lib') == 'started' then
        return false -- Use ox_lib format
    elseif GetResourceState('qb-menu') == 'started' then
        return true -- Use QB format
    else
        print("No supported menu system found")
        return nil
    end
end

local useQbFormat = DetectMenuFormat()
if useQbFormat ~= nil then
    Bridge.Menu.Open(menuData, useQbFormat)
end
```
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

### `Bridge.Menu.OpenInputDialog(options)`

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
local Bridge = exports['community_bridge']:Bridge()

Bridge.Menu.OpenInputDialog({
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

### `Bridge.Menu.OpenConfirmDialog(options)`

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
local Bridge = exports['community_bridge']:Bridge()

Bridge.Menu.OpenConfirmDialog({
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

### `Bridge.Menu.CloseMenu()`

Closes the currently open menu.

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Close menu programmatically
Bridge.Menu.CloseMenu()
```

### `Bridge.Menu.IsMenuOpen()`

Checks if a menu is currently open.

**Returns:**
- `boolean`: True if menu is open

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

if Bridge.Menu.IsMenuOpen() then
    print("Menu is currently open")
end
```

### `Bridge.Menu.GetMenuType()`

Gets the current menu system being used.

**Returns:**
- `string`: Menu system name ("ox_lib", "qb-menu", etc.)

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local menuSystem = Bridge.Menu.GetMenuType()
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
                Bridge.Menu.OpenContextMenu({
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
    local items = Bridge.Menu.GetPlayerItems()
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
    
    Bridge.Menu.OpenListMenu({
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
local Bridge = exports['community_bridge']:Bridge()

local success = Bridge.Menu.OpenContextMenu(menuOptions)
if not success then
    Bridge.Menu.SendNotify("Failed to open menu", "error")
end
```
