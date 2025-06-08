---
layout: default
title: "MenuCallbackEvent"
parent: Functions
grand_parent: Client
great_grand_parent: 📋 Menu
nav_order: 1
---

# MenuCallbackEvent
{: .no_toc }

# MenuCallback Event
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Event triggered when a menu option is selected.

## Event Name

```lua
"community_bridge:menuCallback"
```

## Event Data

**menuId:** `string`  
The ID of the menu where the selection was made.

**option:** `table`  
The selected menu option with all its properties.

**args:** `table` (optional)  
Any arguments provided with the menu option.

## Usage

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

## Example

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