---
layout: default
title: "Open"
parent: Menu Functions
grand_parent: Client
great_grand_parent: 📋 Menu
nav_order: 1
---

# Open
{: .no_toc }

Opens a menu based on the provided configuration. This function can handle both ox_lib and qb-menu formats.

## Syntax

```lua
function Menu.Open(data, useQb)
```

## Parameters

**data:** `table`  
Menu configuration data with options to display.

**useQb:** `boolean` (optional)  
Whether to use QB menu syntax (true) or ox_lib syntax (false).

## Returns

**Type:** `string`  
Menu ID.

## Example (ox_lib format)

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

## Example (QB menu format)

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