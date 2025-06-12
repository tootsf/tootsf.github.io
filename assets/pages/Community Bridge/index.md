# Community Bridge

Welcome to the Community Bridge documentation. Community Bridge is a comprehensive compatibility layer that allows developers to easily provide support for multiple FiveM frameworks and resources without having to write framework-specific code.

## What is Community Bridge?

Community Bridge is a unified API framework that bridges the gap between different FiveM frameworks (ESX, QBCore, QBox) and popular resources. Instead of writing separate code for each framework, developers can use Community Bridge's standardized functions that automatically adapt to the server's framework and installed resources.

## How It Works

Community Bridge automatically detects your server's framework and installed resources, then provides a consistent API that works across all supported systems. This means you can write your script once and it will work on ESX, QBCore, QBox, and other supported frameworks.

## Getting Started

To use Community Bridge in your resource, simply call:

```lua
local Bridge = exports['community_bridge']:Bridge()
```

Then access any module using:
```lua
-- Example: Get player data
local playerData = Bridge.Framework.GetPlayerData()

-- Example: Send notification
Bridge.Notify.Send('Hello World!', 'success', 5000)

-- Example: Add money
Bridge.Banking.AddMoney(source, 'cash', 1000)
```

## Available Modules

Community Bridge provides the following modules for cross-framework compatibility:

### Core Modules

* **[Framework](Framework/)** 🏗️ - Universal framework compatibility layer for player data, jobs, and framework-specific functions
* **[Banking](Banking/)** 💰 - Manage player finances, transactions, and money operations
* **[Inventory](Inventory/)** 📦 - Handle player items, storage, and inventory management
* **[Notify](Notify/)** 📢 - Send notifications to players with various styles and types

### Interface & Interaction

* **[Targeting](Targeting/)** 🎯 - Create interactive targets and context menus
* **[TextUI](TextUI/)** 📝 - Display contextual text and help information
* **[ProgressBar](ProgressBar/)** ⏳ - Show progress indicators for actions
* **[Input](Input/)** ⌨️ - Handle user input and forms
* **[Menu](Menu/)** 📋 - Create interactive menus and dialogs

### Gameplay Systems

* **[Vehicle Keys](Vehicle%20Keys/)** 🔑 - Manage vehicle ownership and access
* **[Shops](Shops/)** 🏪 - Create and manage shops and purchasing systems
* **[Fuel](Fuel/)** ⛽ - Handle vehicle fuel systems
* **[HUD](HUD/)** 📊 - Manage HUD elements and displays
* **[Dispatch](Dispatch/)** 🚨 - Emergency services dispatch system
* **[Phone](Phone/)** 📱 - Phone and communication systems

## Key Benefits

* 🔄 **Framework Agnostic**: Write once, run anywhere - supports ESX, QBCore, QBox, and custom frameworks
* 🛡️ **Type Safety**: Full TypeScript support with comprehensive type definitions
* 📦 **Modular Design**: Use only the modules you need to keep your resource lightweight
* 🚀 **Performance Optimized**: Minimal overhead with efficient detection and caching
* 🔧 **Easy Integration**: Simple export-based API that's easy to learn and implement
* 📚 **Well Documented**: Comprehensive documentation with examples for every function

## Quick Examples

```lua
-- Initialize Bridge
local Bridge = exports['community_bridge']:Bridge()

-- Check player job
local jobData = Bridge.Framework.GetPlayerJobData()
if jobData.jobName == 'police' and jobData.onDuty then
    print('Player is an on-duty police officer')
end

-- Add money safely
local success = Bridge.Banking.AddMoney(source, 'bank', 5000)
if success then
    Bridge.Notify.Send(source, 'You received $5000!', 'success')
end

-- Check inventory
if Bridge.Inventory.HasItem(source, 'phone', 1) then
    Bridge.Notify.Send(source, 'You have a phone!', 'info')
end
```

## Support & Community

If you need help or have questions:

* 📚 Browse our comprehensive documentation
* 💬 Join our Discord community: [https://discord.gg/jwQ78ssYmV](https://discord.gg/jwQ78ssYmV)
* 🐛 Report issues on GitHub
* 💡 Share ideas and suggestions with the community

## Framework Compatibility

Community Bridge automatically detects and works with:

* **ESX Legacy** (es_extended)
* **QBCore Framework** (qb-core)
* **QBox Framework** (qbx_core)
* **Custom Frameworks** (with configuration)

## Resource Compatibility

Supports popular resources including:

* ox_inventory, qb-inventory, qs-inventory
* ox_target, qb-target, bt-target
* Multiple notification systems
* Various banking and phone systems
* And many more...

---

*Community Bridge - Bridging the gap between frameworks, making FiveM development universal.*
