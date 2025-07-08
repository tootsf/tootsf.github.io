# Clothing 👕

<!--META
nav: true
toc: true
description: The Clothing module provides functions for managing player appearance and clothing across different clothing systems. It handles appearance data conversion and caching.
-->

The Clothing module provides functions for managing player appearance and clothing across different clothing systems. It handles appearance data conversion and caching.

## Overview

The Clothing provides functionality for FiveM resources.

## ToggleDebugging (Client)

### Description
Function ToggleDebugging

### Syntax
```lua
Bridge.Clothing.ToggleDebugging()
```

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Clothing.ToggleDebugging()
```

## RestoreAppearance (Client)

### Description
This will return the peds components to the previously stored components

### Syntax
```lua
Bridge.Clothing.RestoreAppearance(entity)
```

### Parameters
- **entity** (any): Parameter entity

### Returns
- (boolean): 

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Clothing.RestoreAppearance()
```

## UpdateAppearanceBackup (Client)

### Description
Function UpdateAppearanceBackup

### Syntax
```lua
Bridge.Clothing.UpdateAppearanceBackup(data)
```

### Parameters
- **data** (any): Parameter data

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Clothing.UpdateAppearanceBackup()
```

## GetAppearance (Server)

### Description
Retrieves a player's appearance data in a standardized format.

### Syntax
```lua
Bridge.Clothing.GetAppearance(src, fullData)
```

### Parameters
- **src** (number): Player server ID
- **fullData** (boolean): If true, returns full data including model and raw skin data (optional)

### Returns
- (table|nil): Player's appearance data or nil if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get basic appearance data
local appearance = Bridge.Clothing.GetAppearance(source)
if appearance then
    print("Player appearance loaded")
end

-- Get full appearance data including model
local fullData = Bridge.Clothing.GetAppearance(source, true)
if fullData then
    print("Player model: " .. fullData.model)
end
```

## GetFullAppearanceData (Server)

### Description
Internal function to get complete appearance data including caching.

### Syntax
```lua
Bridge.Clothing.GetFullAppearanceData(src)
```

### Parameters
- **src** (number): Player server ID

### Returns
- (table|nil): Complete appearance data with model, skin, and converted formats

### Example
```lua
-- Internal use - prefer GetAppearance() for most cases
local fullData = Bridge.Clothing.GetFullAppearanceData(source)
```

## SetAppearance (Server)

### Description
Sets a player's appearance based on provided appearance data.

### Syntax
```lua
Bridge.Clothing.SetAppearance(src, data, updateBackup, save)
```

### Parameters
- **src** (number): Player server ID
- **data** (table): Appearance data to apply
- **updateBackup** (boolean): Whether to update the backup appearance data (optional)
- **save** (boolean): Whether to save the appearance to database (optional)

### Returns
- (table|nil): Updated appearance data or nil if failed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Apply new clothing
local newAppearance = {
    tshirt_1 = 1,
    tshirt_2 = 0,
    torso_1 = 4,
    torso_2 = 2
}

local result = Bridge.Clothing.SetAppearance(source, newAppearance, false, true)
if result then
    print("Player appearance updated and saved")
end
```

## SetAppearanceExt (Server)

### Description
Sets appearance using gender-specific data tables.

### Syntax
```lua
Bridge.Clothing.SetAppearanceExt(src, data)
```

### Parameters
- **src** (number): Player server ID
- **data** (table): Table with 'male' and 'female' appearance data

### Returns
- (table|nil): Updated appearance data or nil if failed

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Gender-specific uniforms
local uniformData = {
    male = {
        tshirt_1 = 58,
        tshirt_2 = 0,
        torso_1 = 55,
        torso_2 = 0
    },
    female = {
        tshirt_1 = 35,
        tshirt_2 = 0,
        torso_1 = 48,
        torso_2 = 0
    }
}

Bridge.Clothing.SetAppearanceExt(source, uniformData)
```

## RestoreAppearance (Server)

### Description
Function RestoreAppearance

### Syntax
```lua
Bridge.Clothing.RestoreAppearance(src)
```

### Parameters
- **src** (any): Parameter src

### Returns
- (nil): No return value

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()\n\nBridge.Clothing.RestoreAppearance()
```

