# Getting Started

Welcome to Community Bridge! This guide will help you get up and running quickly.

## Installation

### Manual Installation

1. Download the latest release from GitHub
2. Extract the files to your resources folder
3. Add `ensure community-bridge` to your server.cfg
4. Restart your server

### Using Git

```bash
cd resources
git clone https://github.com/your-org/community-bridge.git
```

## Basic Setup

### 1. Configuration

Create a `config.lua` file in your resource:

```lua
Config = {
    Framework = "auto", -- auto, esx, qbcore
    Debug = false,
    EnableModules = {
        banking = true,
        inventory = true,
        notifications = true
    }
}
```

### 2. Initialize the Bridge

In your client-side code:

```lua
Citizen.CreateThread(function()
    while not Bridge do
        Citizen.Wait(100)
    end

    -- Bridge is now available
    print("Bridge loaded!")
end)
```

### 3. Using Bridge Functions

```lua
-- Get player balance
local balance = Bridge.Banking.GetBalance()

-- Send notification
Bridge.Notify.Send("Hello World!", "success")

-- Add item to inventory
Bridge.Inventory.AddItem("bread", 5)
```

## Framework Detection

Community Bridge automatically detects your framework, but you can force a specific one:

```lua
Config.Framework = "esx" -- or "qbcore"
```

## Next Steps

- Explore the [Banking Module](../Community%20Bridge/Banking/)
- Learn about [Notifications](../Community%20Bridge/Notifications/)
- Check out [code examples](../Examples/)

## Troubleshooting

### Common Issues

**Bridge not loading**
- Ensure the resource is started after your framework
- Check console for error messages
- Verify framework detection

**Functions not working**
- Check if the module is enabled in config
- Verify you're using the correct syntax
- Enable debug mode for more information
