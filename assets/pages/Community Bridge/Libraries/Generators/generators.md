# Generators 🎲

<!--META
nav: true
toc: true
description: The Generators library provides tools for creating and managing randomized content including loot tables with weighted probability systems and automatic item file generation for different inventory systems.
-->

The Generators library provides tools for creating and managing randomized content including loot tables with weighted probability systems and automatic item file generation for different inventory systems.

## Overview

The Generators provides functionality for FiveM resources.

## LootTable.Register (Server)

### Description
Registers a new loot table with items, chances, and tier configuration for randomized loot generation.

### Syntax
```lua
Bridge.LootTable.Register(name, items)
```

### Parameters
- **name** (string): Unique identifier for the loot table
- **items** (table): Table of items with min/max counts, chance percentages, tiers, and metadata

### Returns
- (table): The registered loot table in normalized format

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Register a chest loot table
Bridge.LootTable.Register('treasure_chest', {
    gold_bar = {
        min = 1,
        max = 3,
        chance = 15, -- 15% chance
        tier = 1,
        item = 'gold_bar',
        metadata = {quality = 'pure'}
    },
    lockpick = {
        min = 2,
        max = 5,
        chance = 45, -- 45% chance
        tier = 1,
        item = 'lockpick',
        metadata = {durability = 100}
    },
    rare_gem = {
        min = 1,
        max = 1,
        chance = 5, -- 5% chance
        tier = 2,
        item = 'rare_gem',
        metadata = {type = 'diamond'}
    }
})

print('Treasure chest loot table registered')
```

## LootTable.Get (Server)

### Description
Retrieves a registered loot table by name.

### Syntax
```lua
Bridge.LootTable.Get(name)
```

### Parameters
- **name** (string): Name of the loot table to retrieve

### Returns
- (table): The loot table array or empty table if not found

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

local chestLoot = Bridge.LootTable.Get('treasure_chest')
if #chestLoot &gt; 0 then
    print('Found ' .. #chestLoot .. ' items in treasure chest loot table')
else
    print('Treasure chest loot table not found')
end
```

## LootTable.GetRandomItem (Server)

### Description
Gets a single random item from a loot table based on chance rolls and tier filtering.

### Syntax
```lua
Bridge.LootTable.GetRandomItem(name, tier, randomNumber)
```

### Parameters
- **name** (string): Name of the loot table
- **tier** (number | nil): Tier filter for items (default: 1)
- **randomNumber** (number | nil): Custom random number 1-100 (auto-generated if nil)

### Returns
- (table | nil): Random item with count, metadata, tier, and chance or nil if no match

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get random item from tier 1
local item = Bridge.LootTable.GetRandomItem('treasure_chest', 1)
if item then
    print('Found: ' .. item.item .. ' x' .. item.count)
    print('Tier: ' .. item.tier .. ', Chance: ' .. item.chance .. '%')

    -- Add to player inventory
    Bridge.Inventory.AddItem(source, item.item, item.count, nil, item.metadata)
else
    print('No item found this time')
end

-- Get rare tier 2 item with specific roll
local rareItem = Bridge.LootTable.GetRandomItem('treasure_chest', 2, 3) -- 3% roll
if rareItem then
    print('Lucky! Found rare item: ' .. rareItem.item)
end
```

## LootTable.GetRandomItems (Server)

### Description
Gets all items from a loot table that match the chance roll and tier criteria.

### Syntax
```lua
Bridge.LootTable.GetRandomItems(name, tier, randomNumber)
```

### Parameters
- **name** (string): Name of the loot table
- **tier** (number | nil): Tier filter for items (default: 1)
- **randomNumber** (number | nil): Custom random number 1-100 (auto-generated if nil)

### Returns
- (table): Array of all matching items with counts, metadata, tiers, and chances

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get all matching items from a loot table
local items = Bridge.LootTable.GetRandomItems('treasure_chest', 1)
print('Found ' .. #items .. ' items:')

for _, item in pairs(items) do
    print('- ' .. item.item .. ' x' .. item.count .. ' (' .. item.chance .. '% chance)')
    Bridge.Inventory.AddItem(source, item.item, item.count, nil, item.metadata)
end

if #items &gt; 0 then
    Bridge.Framework.Notify('You found ' .. #items .. ' items!', 'success')
else
    Bridge.Framework.Notify('The chest was empty...', 'error')
end
```

## LootTable.GetRandomItemsWithLimit (Server)

### Description
Gets random items with one-time selection (items are removed from table after being selected).

### Syntax
```lua
Bridge.LootTable.GetRandomItemsWithLimit(name, tier, randomNumber)
```

### Parameters
- **name** (string): Name of the loot table
- **tier** (number | nil): Tier filter for items (default: 1)
- **randomNumber** (number | nil): Custom random number 1-100 (auto-generated if nil)

### Returns
- (table): Array of selected items (items removed from source table)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get items with depletion (one-time loot)
local items = Bridge.LootTable.GetRandomItemsWithLimit('treasure_chest', 1)
for _, item in pairs(items) do
    -- item format: {item_name, metadata, count, tier, chance}
    local itemName, metadata, count, tier, chance = item[1], item[2], item[3], item[4], item[5]
    Bridge.Inventory.AddItem(source, itemName, count, nil, metadata)
    print('Added: ' .. itemName .. ' x' .. count)
end

-- Note: Selected items are removed from the loot table
print('Loot table depleted by ' .. #items .. ' items')
```

## ItemsBuilder.Generate (Server)

### Description
Generates item configuration files for different inventory systems (QB-Core old/new, OX Inventory) from a universal item table.

### Syntax
```lua
Bridge.ItemsBuilder.Generate(invoking, outputPrefix, itemsTable, useQB)
```

### Parameters
- **invoking** (string | nil): Resource name generating the files (auto-detected if nil)
- **outputPrefix** (string | nil): Output directory name (default: 'generated_items')
- **itemsTable** (table): Universal item definitions with label, weight, description, etc.
- **useQB** (boolean | nil): Whether input is in QB format (true) or OX format (false)

### Example
```lua
local Bridge = exports['community_bridge']:Bridge()

-- Define items in universal format
local items = {
    lockpick = {
        label = 'Lockpick',
        description = 'Used to pick locks',
        weight = 100,
        stack = true,
        close = true,
        client = {
            image = 'lockpick.png'
        }
    },
    gold_bar = {
        label = 'Gold Bar',
        description = 'A valuable gold bar',
        weight = 1000,
        stack = true,
        close = false,
        client = {
            image = 'gold_bar.png'
        }
    }
}

-- Generate files for all inventory systems
Bridge.ItemsBuilder.Generate(
    'my_resource',
    'items_output',
    items,
    false -- OX format input
)

print('Generated item files:')
print('- my_resource_qb_core_old.lua')
print('- my_resource_qb_core_new.lua')
print('- my_resource_ox_inventory.lua')
```

