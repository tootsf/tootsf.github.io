---
layout: default
title: ox_lib Format
parent: Client Functions
grand_parent: "📋 Menu"
nav_order: 2
---

# ox_lib Format
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Format specification for creating menus using the ox_lib style.

## Syntax

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

## Menu Properties

**id:** `string` (optional)  
Unique identifier for the menu. If not provided, an ID will be auto-generated.

**title:** `string`  
The title displayed at the top of the menu.

**options:** `table[]`  
Array of menu options to display.

## Option Properties

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

## Example

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
