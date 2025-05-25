---
layout: default
title: Shared Functions
parent: Inventory
grand_parent: Modules
nav_order: 3
---

# Inventory Shared Functions
{: .no_toc }

Shared utilities and validation functions available on both client and server sides.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Item Validation

### IsValidItem
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.IsValidItem(itemName)
```

Validates if an item exists in the item database.

**Parameters:**
- `itemName` (string) - Name of the item to validate

**Returns:** 
- `boolean` - True if item exists, false otherwise

**Example:**
```lua
if Inventory.IsValidItem("water") then
    print("Water is a valid item")
else
    print("Invalid item name")
end
```

---

### ValidateItemData
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.ValidateItemData(itemData)
```

Validates the structure of item data.

**Parameters:**
- `itemData` (table) - Item data to validate

**Returns:** 
- `boolean` - True if valid, false otherwise
- `string` - Error message if invalid

**Example:**
```lua
local itemData = {
    name = "water",
    label = "Water Bottle",
    weight = 500,
    stack = true
}

local isValid, error = Inventory.ValidateItemData(itemData)
if not isValid then
    print("Invalid item data: " .. error)
end
```

---

### ValidateSlot
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.ValidateSlot(slot, maxSlots)
```

Validates if a slot number is within valid range.

**Parameters:**
- `slot` (number) - Slot number to validate
- `maxSlots` (number, optional) - Maximum number of slots (default: 50)

**Returns:** 
- `boolean` - True if valid slot number

**Example:**
```lua
if Inventory.ValidateSlot(slot, 40) then
    -- Process slot operation
else
    print("Invalid slot number")
end
```

---

## Item Utilities

### CalculateWeight
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.CalculateWeight(items)
```

Calculates total weight of items.

**Parameters:**
- `items` (table) - Array of items with count and weight

**Returns:** 
- `number` - Total weight in grams

**Example:**
```lua
local items = {
    {name = "water", count = 5, weight = 500},
    {name = "bread", count = 3, weight = 300}
}

local totalWeight = Inventory.CalculateWeight(items)
print("Total weight: " .. totalWeight .. "g")
```

---

### CanStack
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.CanStack(item1, item2)
```

Checks if two items can be stacked together.

**Parameters:**
- `item1` (table) - First item data
- `item2` (table) - Second item data

**Returns:** 
- `boolean` - True if items can stack

**Example:**
```lua
local canStack = Inventory.CanStack(
    {name = "water", metadata = {}},
    {name = "water", metadata = {}}
)
if canStack then
    -- Combine items
end
```

---

### FormatWeight
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.FormatWeight(weight)
```

Formats weight for display.

**Parameters:**
- `weight` (number) - Weight in grams

**Returns:** 
- `string` - Formatted weight string

**Example:**
```lua
local formatted = Inventory.FormatWeight(1500)
print(formatted) -- "1.5 kg"

local formatted2 = Inventory.FormatWeight(500)
print(formatted2) -- "500g"
```

---

## Metadata Handling

### CleanMetadata
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.CleanMetadata(metadata)
```

Removes empty or invalid metadata fields.

**Parameters:**
- `metadata` (table) - Metadata to clean

**Returns:** 
- `table` - Cleaned metadata

**Example:**
```lua
local metadata = {
    durability = 100,
    empty_field = nil,
    owner = "",
    serial = "ABC123"
}

local cleaned = Inventory.CleanMetadata(metadata)
-- Result: {durability = 100, serial = "ABC123"}
```

---

### MergeMetadata
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.MergeMetadata(base, override)
```

Merges two metadata tables.

**Parameters:**
- `base` (table) - Base metadata
- `override` (table) - Metadata to merge in

**Returns:** 
- `table` - Merged metadata

**Example:**
```lua
local base = {durability = 100, owner = "John"}
local override = {durability = 75, serial = "XYZ789"}

local merged = Inventory.MergeMetadata(base, override)
-- Result: {durability = 75, owner = "John", serial = "XYZ789"}
```

---

### ValidateMetadata
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.ValidateMetadata(metadata, schema)
```

Validates metadata against a schema.

**Parameters:**
- `metadata` (table) - Metadata to validate
- `schema` (table) - Validation schema

**Returns:** 
- `boolean` - True if valid
- `table` - Array of validation errors

**Example:**
```lua
local schema = {
    durability = {type = "number", min = 0, max = 100},
    owner = {type = "string", required = false},
    serial = {type = "string", pattern = "^[A-Z]{3}[0-9]{3}$"}
}

local metadata = {durability = 85, serial = "ABC123"}
local isValid, errors = Inventory.ValidateMetadata(metadata, schema)
```

---

## Configuration

### GetItemConfig
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.GetItemConfig(itemName)
```

Gets configuration data for an item.

**Parameters:**
- `itemName` (string) - Name of the item

**Returns:** 
- `table` - Item configuration

**Example:**
```lua
local config = Inventory.GetItemConfig("weapon_pistol")
print("Max durability: " .. config.maxDurability)
print("Is weapon: " .. tostring(config.weapon))
```

---

### GetSystemConfig
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.GetSystemConfig()
```

Gets current inventory system configuration.

**Returns:** 
- `table` - System configuration

**Example:**
```lua
local config = Inventory.GetSystemConfig()
print("Max weight: " .. config.maxWeight)
print("Max slots: " .. config.maxSlots)
print("System: " .. config.system)
```

---

## Constants

### Item Types
```lua
Inventory.ItemTypes = {
    WEAPON = "weapon",
    CONSUMABLE = "consumable",
    TOOL = "tool",
    MISC = "misc",
    VEHICLE = "vehicle",
    CLOTHING = "clothing"
}
```

### Metadata Fields
```lua
Inventory.MetadataFields = {
    DURABILITY = "durability",
    SERIAL = "serial",
    OWNER = "owner",
    CREATED = "created",
    MODIFIED = "modified",
    CUSTOM = "custom"
}
```

### Weight Units
```lua
Inventory.WeightUnits = {
    GRAM = 1,
    KILOGRAM = 1000,
    POUND = 453.592
}
```

---

## Utility Functions

### GenerateSerial
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.GenerateSerial(pattern)
```

Generates a serial number based on a pattern.

**Parameters:**
- `pattern` (string, optional) - Serial pattern (default: "XXX000")

**Returns:** 
- `string` - Generated serial number

**Example:**
```lua
local serial = Inventory.GenerateSerial("ABC###")
print(serial) -- "ABC123"

local serial2 = Inventory.GenerateSerial()
print(serial2) -- "XYZ456"
```

---

### CompareItems
{: .d-inline-block }
Shared
{: .label .label-green }

```lua
Inventory.CompareItems(item1, item2, compareMetadata)
```

Compares two items for equality.

**Parameters:**
- `item1` (table) - First item
- `item2` (table) - Second item  
- `compareMetadata` (boolean, optional) - Whether to compare metadata

**Returns:** 
- `boolean` - True if items are equal

**Example:**
```lua
local item1 = {name = "water", count = 5}
local item2 = {name = "water", count = 3}

local nameMatch = Inventory.CompareItems(item1, item2, false)
print("Names match: " .. tostring(nameMatch)) -- true

local exactMatch = Inventory.CompareItems(item1, item2, true)
print("Exact match: " .. tostring(exactMatch)) -- false
```

---

## Best Practices

### Metadata Management
```lua
-- Always clean metadata before storage
local function StoreItem(itemData)
    if itemData.metadata then
        itemData.metadata = Inventory.CleanMetadata(itemData.metadata)
    end
    -- Store item...
end
```

### Weight Calculations
```lua
-- Use shared weight calculation for consistency
local function CheckInventorySpace(playerId, newItems)
    local currentItems = GetPlayerInventory(playerId)
    local currentWeight = Inventory.CalculateWeight(currentItems)
    local newWeight = Inventory.CalculateWeight(newItems)
    
    return (currentWeight + newWeight) <= Config.MaxWeight
end
```

### Item Validation
```lua
-- Always validate items before processing
local function ProcessItemData(itemData)
    local isValid, error = Inventory.ValidateItemData(itemData)
    if not isValid then
        print("Invalid item data: " .. error)
        return false
    end
    
    if not Inventory.IsValidItem(itemData.name) then
        print("Unknown item: " .. itemData.name)
        return false
    end
    
    return true
end
```
