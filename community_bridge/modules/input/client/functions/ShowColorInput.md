---
layout: default
title: "ShowColorInput"
parent: Functions
grand_parent: Client
great_grand_parent: "⌨️ Input"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/input/client/functions/ShowColorInput/
---

# ShowColorInput
{: .no_toc }

Client
{: .label .label-blue }

# ShowColorInput
{: .no_toc }
{: .d-inline-block }
Client
{: .label .label-blue }

Displays a color picker dialog.

## Syntax

```lua
function Input.ShowColorInput(config)
```

## Parameters

**config:** `table`  
Color input configuration with the following properties:

- **title:** `string`  
  Dialog title.

- **description:** `string` (optional)  
  Color selection description.

- **defaultColor:** `string` (optional)  
  Default color in hex format (e.g., "#FF5733").

- **format:** `string` (optional)  
  Output format: "hex" (default), "rgb", or "rgba".

## Returns

**Type:** `string` or `table` or `nil`  
The selected color in the specified format, or nil if canceled.
- For hex format: String like "#FF5733"  
- For rgb format: Table like {r=255, g=87, b=51}  
- For rgba format: Table like {r=255, g=87, b=51, a=1.0}

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local carColor = Bridge.Input.ShowColorInput({
    title = "Select Car Color",
    description = "Choose a color for your vehicle",
    defaultColor = "#1E90FF",
    format = "rgb"
})

if carColor then
    print(string.format("Selected color: R:%d G:%d B:%d", carColor.r, carColor.g, carColor.b))
else
    print("Color selection was canceled")
end
```

---
