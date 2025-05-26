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

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Core Menu Functions

---

## 🔹 Open

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
local Bridge = exports['community_bridge']:Bridge()

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
local Bridge = exports['community_bridge']:Bridge()

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
local Bridge = exports['community_bridge']:Bridge()

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

## 📚 Events

---

## 🔹 MenuCallback Event
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

## 📚 Best Practices

---

## 📚 Utility Functions

---

## 📚 Advanced Features

---

## 📚 Event Handlers

---

## 📚 Menu Design Guidelines

1. **Keep titles concise** - Use clear, short titles
2. **Provide descriptions** - Help users understand options
3. **Use icons** - Visual indicators improve UX
4. **Logical grouping** - Group related options together
5. **Consistent styling** - Maintain visual consistency

---

## 📚 Performance Tips

1. **Lazy loading** - Load menu data when needed
2. **Limit options** - Don't overwhelm with too many choices
3. **Cache static data** - Reuse menu configurations
4. **Clean up** - Properly close menus when done

---

## 📚 Error Handling

```lua
local Bridge = exports['community_bridge']:Bridge()
local success = Bridge.Menu.OpenContextMenu(menuOptions)
if not success then
    Bridge.Menu.SendNotify("Failed to open menu", "error")
end
```

---

## 📚 Framework Detection

```lua
local Bridge = exports['community_bridge']:Bridge()
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

---
