# Getting Started with Community Bridge

## Prerequisites

Before installing Community Bridge, ensure you have:

- A working FiveM server
- Basic knowledge of Lua scripting
- A supported framework (ESX, QBCore, or custom)
- Database access (MySQL recommended)

## Installation

### Step 1: Download Community Bridge

1. Download the latest release from the repository
2. Extract the archive to your FiveM resources folder
3. Rename the folder to `community_bridge` if needed

### Step 2: Database Setup

Community Bridge requires a MySQL database for data persistence:

```sql
-- Create the database (if not exists)
CREATE DATABASE IF NOT EXISTS community_bridge;

-- The resource will automatically create required tables
-- on first startup
```

### Step 3: Configuration

#### Server Configuration (`server.cfg`)

Add Community Bridge to your server configuration:

```cfg
# Add Community Bridge to your resources
ensure community_bridge

# Make sure it starts after your framework
ensure [framework]  # ESX, QBCore, etc.
ensure community_bridge
```

#### Resource Configuration

Configure Community Bridge in the `settings/` folder:

1. **serverConfig.lua** - Server-side settings
2. **clientConfig.lua** - Client-side settings
3. **sharedConfig.lua** - Shared settings

### Step 4: Framework Integration

#### ESX Integration

```lua
-- In serverConfig.lua
Config.Framework = 'esx'
Config.ESX = {
    ResourceName = 'es_extended',
    GetSharedObject = 'esx:getSharedObject'
}
```

#### QBCore Integration

```lua
-- In serverConfig.lua
Config.Framework = 'qbcore'
Config.QBCore = {
    ResourceName = 'qb-core'
}
```

#### Custom Framework

```lua
-- In serverConfig.lua
Config.Framework = 'custom'
-- Implement your framework bridge functions
```

## Module Configuration

### Enabling/Disabling Modules

In `sharedConfig.lua`, configure which modules to use:

```lua
Config.Modules = {
    helptext = true,     -- Enable HelpText module
    notify = true,       -- Enable Notify module
    menu = false,        -- Disable Menu module
    target = true,       -- Enable Target module
    inventory = false,   -- Disable Inventory module
}
```

### Module-Specific Configuration

Each module has its own configuration file in `modules/moduleName/config.lua`:

```lua
-- Example: modules/helptext/config.lua
Config.HelpText = {
    DefaultPosition = 'center',
    FadeTime = 500,
    MaxDisplayTime = 5000,
    Keybind = 'E'
}
```

## Basic Usage Examples

### Using HelpText Module

```lua
-- Client-side usage
Bridge.HelpText.ShowHelpText('Press E to interact', 'center')

-- With custom styling
Bridge.HelpText.ShowHelpText('Custom message', 'top', {
    backgroundColor = '#000000',
    textColor = '#ffffff'
})

-- Hide help text
Bridge.HelpText.HideHelpText()
```

### Using Notify Module

```lua
-- Client-side notifications
Bridge.Notify.Success('Operation completed successfully!')
Bridge.Notify.Error('Something went wrong!')
Bridge.Notify.Info('Information message')
Bridge.Notify.Warning('Warning message')

-- Server-side notifications
Bridge.Notify.Player(playerId, 'success', 'Welcome to the server!')
```

### Using Target Module

```lua
-- Add target to entity
Bridge.Target.AddEntity(entity, {
    {
        label = 'Interact',
        action = function()
            -- Handle interaction
        end,
        canInteract = function()
            return true -- Custom condition
        end
    }
})

-- Add target to zone
Bridge.Target.AddZone('unique_id', {
    coords = vector3(0, 0, 0),
    size = vector3(2, 2, 2),
    options = {
        {
            label = 'Zone Interaction',
            action = function()
                -- Handle zone interaction
            end
        }
    }
})
```

## Advanced Configuration

### Performance Tuning

```lua
-- In serverConfig.lua
Config.Performance = {
    CacheTimeout = 300,      -- Cache timeout in seconds
    MaxConcurrentQueries = 10, -- Max database queries
    DebugMode = false,       -- Enable debug logging
    OptimizeNetworking = true -- Optimize network calls
}
```

### Security Settings

```lua
-- In serverConfig.lua
Config.Security = {
    EnableAntiCheat = true,
    MaxRequestsPerSecond = 10,
    BanDuration = 86400, -- 24 hours
    LogSuspiciousActivity = true
}
```

### Localization

```lua
-- In sharedConfig.lua
Config.Locale = 'en' -- Available: en, es, fr, de, etc.

-- Custom locale additions
Config.CustomLocales = {
    en = {
        custom_message = 'Your custom message'
    }
}
```

## Troubleshooting

### Common Issues

#### Module Not Loading
1. Check console for error messages
2. Verify module is enabled in configuration
3. Ensure proper resource start order
4. Check file permissions

#### Database Connection Issues
1. Verify database credentials
2. Check database server status
3. Ensure proper table permissions
4. Review connection configuration

#### Framework Integration Problems
1. Verify framework resource name
2. Check framework version compatibility
3. Review bridge configuration
4. Test with minimal configuration

### Debug Mode

Enable debug mode for detailed logging:

```lua
-- In serverConfig.lua
Config.Debug = true

-- View logs in console or server log files
```

### Performance Monitoring

Monitor resource performance:

```lua
-- Server-side monitoring
Bridge.Debug.GetPerformanceStats()

-- Client-side monitoring
Bridge.Debug.GetClientStats()
```

## Next Steps

1. **Explore Modules**: Review available modules and their APIs
2. **Check Examples**: Look at practical usage examples
3. **Customize**: Adapt modules to your server's needs
4. **Join Community**: Connect with other developers

## Useful Links

- [Module Documentation](../Modules/)
- [API Reference](../Libraries/)
- [Configuration Guide](./configuration.md)
- [Examples](../Examples/)
- [Troubleshooting Guide](./troubleshooting.md)

