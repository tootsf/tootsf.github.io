---
layout: default
title: QB Menu Format
parent: Client Functions
grand_parent: "📋 Menu"
nav_order: 3
---

# QB Menu Format
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Format specification for creating menus using the QB-menu style.

## Syntax

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

## Menu Properties

**id:** `string` (optional)  
Unique identifier for the menu.

**title:** `string`  
The header text displayed at the top of the menu.

**options:** `table[]`  
Array of menu options to display.

## Option Properties

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

## Example

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
