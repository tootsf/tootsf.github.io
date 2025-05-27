---
layout: default
title: Functions
parent: Client
grand_parent: "📋 Menu"
nav_order: 1
permalink: /community_bridge/modules/menu/client/functions/
---

# Menu Client Functions
{: .no_toc }

Client-side functions for menu creation and management.

# Menu Client Functions
{: .no_toc }

Client-side functions for menu creation and management.

---

## 🔹 MenuCallbackEvent

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Event triggered when a menu option is selected.


```lua
"community_bridge:menuCallback"
```


**menuId:** `string`  
The ID of the menu where the selection was made.

**option:** `table`  
The selected menu option with all its properties.

**args:** `table` (optional)  
Any arguments provided with the menu option.


You can register a listener for this event to handle menu selections globally:

```lua
RegisterNetEvent('community_bridge:menuCallback')
AddEventHandler('community_bridge:menuCallback', function(menuId, option, args)
    print('Menu: ' .. menuId)
    print('Selected option: ' .. option.title)
    
    if args then
        -- Process any arguments
        for k, v in pairs(args) do
            print(k .. ' = ' .. tostring(v))
        end
    end
    
    -- Handle specific menus
    if menuId == 'my_custom_menu' then
        -- Process selection from this specific menu
    end
end)
```


```lua
local Bridge = exports['community_bridge']:Bridge()

-- Create a menu
local menu = {
    id = "vehicle_menu",
    title = "Vehicle Options",
    options = {
        {
            title = "Lock Vehicle",
            description = "Lock your current vehicle",
            icon = "fas fa-lock",
            args = { action = "lock" }
        },
        {
            title = "Engine Toggle",
            description = "Turn engine on/off",
            icon = "fas fa-key",
            args = { action = "engine" }
        }
    }
}

-- Open the menu without providing onSelect functions
Bridge.Menu.Open(menu)

-- Instead, handle selections via the global event
RegisterNetEvent('community_bridge:menuCallback')
AddEventHandler('community_bridge:menuCallback', function(menuId, option, args)
    if menuId == "vehicle_menu" and args then
        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
        
        if args.action == "lock" then
            -- Lock vehicle code
            print("Locking vehicle")
        elseif args.action == "engine" then
            -- Toggle engine code
            print("Toggling engine")
        end
    end
end)
```

---

## 🔹 Open

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Opens a menu based on the provided configuration. This function can handle both ox_lib and qb-menu formats.


```lua
function Menu.Open(data, useQb)
```


**data:** `table`  
Menu configuration data with options to display.

**useQb:** `boolean` (optional)  
Whether to use QB menu syntax (true) or ox_lib syntax (false).


**Type:** `string`  
Menu ID.


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
            description = "This is a second option",
            icon = "fas fa-chart-simple",
            onSelect = function()
                print("Selected option 2")
            end
        }
    }
}

Bridge.Menu.Open(menuData)
```


```lua
local Bridge = exports['community_bridge']:Bridge()

local menuData = {
    id = 'qb_test_menu',
    title = 'QB Format Menu',
    options = {
        {
            title = "First Option",
            description = "This is option one",
            icon = "fas fa-check",
            onSelect = function()
                print("QB menu option 1 selected")
            end
        },
        {
            title = "Second Option",
            description = "This is option two",
            icon = "fas fa-times",
            onSelect = function()
                print("QB menu option 2 selected")
            end
        }
    }
}

Bridge.Menu.Open(menuData, true) -- Set useQb to true
```

---

## 🔹 OxLibFormat

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Format specification for creating menus using the ox_lib style.


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


**id:** `string` (optional)  
Unique identifier for the menu. If not provided, an ID will be auto-generated.

**title:** `string`  
The title displayed at the top of the menu.

**options:** `table[]`  
Array of menu options to display.


**title:** `string`  
Text displayed for the menu item.

**description:** `string` (optional)  
Additional details shown below the title.

**icon:** `string` (optional)  
FontAwesome icon class (e.g., "fas fa-car").

**args:** `table` (optional)  
Custom data to pass to the onSelect callback.

**onSelect:** `function(selected, secondary, args)` (optional)  
Function called when the option is selected.
- **selected:** Selected menu item data
- **secondary:** Secondary action indicator (used with key modifiers)
- **args:** Arguments passed to the option


```lua
local Bridge = exports['community_bridge']:Bridge()

local menu = {
    id = "vehicle_menu",
    title = "Vehicle Options",
    options = {
        {
            title = "Lock Vehicle",
            description = "Lock your current vehicle",
            icon = "fas fa-lock",
            onSelect = function()
                -- Lock vehicle code here
            end
        },
        {
            title = "Engine Toggle",
            description = "Turn engine on/off",
            icon = "fas fa-key",
            args = { engineState = true },
            onSelect = function(_, _, args)
                -- Toggle engine using args.engineState
            end
        }
    }
}

Bridge.Menu.Open(menu)
```

---

## 🔹 QBMenuFormat

{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Format specification for creating menus using the QB-menu style.


```lua
{
    id = "unique_menu_id",        -- Optional
    title = "Menu Header",  
    options = {
        {
            title = "Option Title",
            description = "Option description text",
            icon = "fas fa-icon",
            onSelect = function()
                -- Code executed when selected
            end
        }
    }
}
```


**id:** `string` (optional)  
Unique identifier for the menu.

**title:** `string`  
The header text displayed at the top of the menu.

**options:** `table[]`  
Array of menu options to display.


**title:** `string`  
Text displayed for the menu item.

**description:** `string` (optional)  
Additional details shown below the title.

**icon:** `string` (optional)  
FontAwesome icon class (e.g., "fas fa-car").

**onSelect:** `function()` (optional)  
Function called when the option is selected.

**disabled:** `boolean` (optional)  
Whether the option is disabled (cannot be selected).


```lua
local Bridge = exports['community_bridge']:Bridge()

local menu = {
    id = "garage_menu",
    title = "Garage Menu",
    options = {
        {
            title = "Personal Vehicle",
            description = "Access your personal vehicles",
            icon = "fas fa-car",
            onSelect = function()
                -- Show personal vehicles
            end
        },
        {
            title = "Job Vehicles",
            description = "Access job-related vehicles",
            icon = "fas fa-truck",
            onSelect = function()
                -- Show job vehicles
            end
        },
        {
            title = "Repair Vehicle",
            description = "Vehicle repairs unavailable",
            icon = "fas fa-wrench",
            disabled = true
        }
    }
}

Bridge.Menu.Open(menu, true) -- Use QB menu format
```