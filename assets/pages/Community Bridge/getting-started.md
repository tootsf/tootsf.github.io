# 🚀 Getting Started with Community Bridge

> **Welcome to Community Bridge!** A comprehensive FiveM framework designed to simplify server development with modular functionality and seamless framework integration.

---

## 📋 Prerequisites

Before diving in, make sure you have:

| Requirement | Description |
|-------------|-------------|
| 🖥️ **FiveM Server** | A working FiveM server instance |
| 📝 **Lua Knowledge** | Basic understanding of Lua scripting |
| 🔧 **Framework** | ESX, QBCore, or custom framework |
| 🗄️ **Database** | MySQL database access (recommended) |

> ⚠️ **Note**: While MySQL is recommended, Community Bridge can work with other database systems with proper configuration.

---

## 📦 Installation


1. 📥 **Download** the latest release from the repository
2. 📂 **Extract** the archive to your FiveM resources folder
3. 📝 **Rename** the folder to `community_bridge` if needed

```bash
# Example directory structure
resources/
├── [essential]/
├── [framework]/
└── community_bridge/  # 👈 Your Community Bridge installation
```


Community Bridge requires a MySQL database for data persistence:

```sql
-- 🗄️ Create the database (if not exists)
CREATE DATABASE IF NOT EXISTS community_bridge;

-- ✨ The resource will automatically create required tables
-- on first startup - no manual table creation needed!
```

> 💡 **Pro Tip**: Community Bridge uses an intelligent database migration system that automatically handles table creation and updates.


#### 🖥️ Server Configuration (`server.cfg`)

Add Community Bridge to your server configuration:

```cfg
# 🚀 Add Community Bridge to your resources
ensure community_bridge

# ⚠️ Important: Start order matters!
# Make sure it starts after your framework
ensure [framework]  # ESX, QBCore, etc.
ensure community_bridge
```

#### ⚙️ Resource Configuration

Configure Community Bridge in the `settings/` folder:

| File | Purpose | Description |
|------|---------|-------------|
| `serverConfig.lua` | 🖥️ Server Settings | Database, security, performance |
| `clientConfig.lua` | 🎮 Client Settings | UI preferences, keybinds |
| `sharedConfig.lua` | 🔄 Shared Settings | Modules, locales, common config |


> 🔌 **Framework Bridge**: Community Bridge automatically detects and integrates with popular frameworks.

#### 🔷 ESX Integration

```lua
-- In serverConfig.lua
Config.Framework = 'esx'
Config.ESX = {
    ResourceName = 'es_extended',  -- Your ESX resource name
    GetSharedObject = 'esx:getSharedObject'
}
```

#### 🔶 QBCore Integration

```lua
-- In serverConfig.lua
Config.Framework = 'qbcore'
Config.QBCore = {
    ResourceName = 'qb-core'  -- Your QBCore resource name
}
```

#### 🔧 Custom Framework

```lua
-- In serverConfig.lua
Config.Framework = 'custom'
-- 🛠️ Implement your framework bridge functions
-- See documentation for custom framework integration
```

---

## 🧩 Module Configuration


In `sharedConfig.lua`, configure which modules to use:

```lua
Config.Modules = {
    -- 💬 Communication & UI
    helptext = true,     -- ✅ Enable HelpText module
    notify = true,       -- ✅ Enable Notify module
    menu = false,        -- ❌ Disable Menu module
    progressbar = true,  -- ✅ Enable Progressbar module

    -- 🎯 Interaction & Targeting
    target = true,       -- ✅ Enable Target module
    input = true,        -- ✅ Enable Input module

    -- 🎮 Game Systems
    inventory = false,   -- ❌ Disable Inventory module
    skills = true,       -- ✅ Enable Skills module
    weather = true,      -- ✅ Enable Weather module

    -- 🏠 Advanced Features
    housing = false,     -- ❌ Disable Housing module
    fuel = true,         -- ✅ Enable Fuel module
    dispatch = false,    -- ❌ Disable Dispatch module
}
```

> 💡 **Performance Tip**: Only enable modules you actually use to optimize server performance!


Each module has its own configuration file in `modules/moduleName/config.lua`:

```lua
-- 📝 Example: modules/helptext/config.lua
Config.HelpText = {
    DefaultPosition = 'center',      -- 📍 Default position on screen
    FadeTime = 500,                  -- ⏱️ Fade animation duration (ms)
    MaxDisplayTime = 5000,           -- ⏰ Maximum display time (ms)
    Keybind = 'E',                   -- ⌨️ Default interaction key
    Styling = {
        backgroundColor = 'rgba(0,0,0,0.8)',
        textColor = '#ffffff',
        fontSize = '16px'
    }
}
```

> 🎨 **Customization**: Each module offers extensive styling and behavior customization options.

---

## 💻 Basic Usage Examples


```lua
-- 🎮 Client-side usage
Bridge.HelpText.ShowHelpText('Press E to interact', 'center')

-- 🎨 With custom styling
Bridge.HelpText.ShowHelpText('Custom message', 'top', {
    backgroundColor = '#1a1a1a',
    textColor = '#00ff88',
    borderColor = '#00ff88'
})

-- 👻 Hide help text
Bridge.HelpText.HideHelpText()
```


```lua
-- 🎮 Client-side notifications
Bridge.Notify.Success('✅ Operation completed successfully!')
Bridge.Notify.Error('❌ Something went wrong!')
Bridge.Notify.Info('ℹ️ Information message')
Bridge.Notify.Warning('⚠️ Warning message')

-- 🖥️ Server-side notifications
Bridge.Notify.Player(playerId, 'success', '🎉 Welcome to the server!')
Bridge.Notify.All('info', '📢 Server announcement!')
```


```lua
-- 🎯 Add target to entity
Bridge.Target.AddEntity(entity, {
    {
        label = '🔧 Interact',
        icon = 'fas fa-hand',
        action = function()
            -- 🎬 Handle interaction
            print('Entity interaction triggered!')
        end,
        canInteract = function()
            return true -- 🔍 Custom condition
        end,
        distance = 2.0  -- 📏 Interaction distance
    }
})

-- 🗺️ Add target to zone
Bridge.Target.AddZone('unique_zone_id', {
    coords = vector3(100.0, 200.0, 30.0),
    size = vector3(4.0, 4.0, 2.0),
    rotation = 45.0,
    options = {
        {
            label = '🏠 Zone Interaction',
            icon = 'fas fa-door-open',
            action = function()
                -- 🎬 Handle zone interaction
                print('Zone interaction triggered!')
            end
        }
    }
})
```

---

## ⚡ Advanced Configuration


```lua
-- In serverConfig.lua
Config.Performance = {
    CacheTimeout = 300,              -- 🕐 Cache timeout in seconds
    MaxConcurrentQueries = 10,       -- 🗄️ Max simultaneous database queries
    DebugMode = false,               -- 🐛 Enable debug logging
    OptimizeNetworking = true,       -- 📡 Optimize network calls
    UpdateInterval = 1000,           -- ⏱️ Update interval (ms)
    MaxEntityDistance = 500.0        -- 📏 Maximum entity processing distance
}
```


```lua
-- In serverConfig.lua
Config.Security = {
    EnableAntiCheat = true,          -- 🛡️ Enable built-in anti-cheat
    MaxRequestsPerSecond = 10,       -- 🚦 Rate limiting
    BanDuration = 86400,             -- ⏰ Ban duration (24 hours)
    LogSuspiciousActivity = true,    -- 📝 Log suspicious activities
    EncryptNetworkEvents = true,     -- 🔐 Encrypt network communications
    ValidateClientData = true        -- ✅ Validate all client-sent data
}
```


```lua
-- In sharedConfig.lua
Config.Locale = 'en' -- 🌐 Available: en, es, fr, de, it, pt, ru, zh, ja, ko, etc.

-- 📝 Custom locale additions
Config.CustomLocales = {
    en = {
        welcome_message = '🎉 Welcome to our server!',
        goodbye_message = '👋 Thanks for playing!'
    },
    es = {
        welcome_message = '🎉 ¡Bienvenido a nuestro servidor!',
        goodbye_message = '👋 ¡Gracias por jugar!'
    }
}
```

---

## 🔧 Troubleshooting


#### 🚫 Module Not Loading
| Issue | Solution |
|-------|----------|
| Module not responding | 1. ✅ Check console for error messages |
|                      | 2. 🔍 Verify module is enabled in configuration |
|                      | 3. 📋 Ensure proper resource start order |
|                      | 4. 🗂️ Check file permissions |

#### 🗄️ Database Connection Issues
| Issue | Solution |
|-------|----------|
| Cannot connect to DB | 1. 🔑 Verify database credentials |
|                      | 2. 🖥️ Check database server status |
|                      | 3. 🔐 Ensure proper table permissions |
|                      | 4. ⚙️ Review connection configuration |

#### 🔌 Framework Integration Problems
| Issue | Solution |
|-------|----------|
| Framework bridge failing | 1. 📝 Verify framework resource name |
|                         | 2. 🔄 Check framework version compatibility |
|                         | 3. ⚙️ Review bridge configuration |
|                         | 4. 🧪 Test with minimal configuration |


Enable debug mode for detailed logging:

```lua
-- In serverConfig.lua
Config.Debug = true

-- 📊 View logs in console or server log files
-- Logs include: database queries, network events, module loading
```


Monitor resource performance:

```lua
-- 🖥️ Server-side monitoring
local stats = Bridge.Debug.GetPerformanceStats()
print('Memory Usage:', stats.memory)
print('Database Queries:', stats.dbQueries)

-- 🎮 Client-side monitoring
local clientStats = Bridge.Debug.GetClientStats()
print('FPS Impact:', clientStats.fpsImpact)
print('Render Time:', clientStats.renderTime)
```

---

## 🎯 Next Steps


1. **🧩 Explore Modules**: Review available modules and their APIs
2. **📖 Check Examples**: Look at practical usage examples
3. **🎨 Customize**: Adapt modules to your server's needs
4. **👥 Join Community**: Connect with other developers


| Resource | Description |
|----------|-------------|
| [📁 Module Documentation](../Modules/) | Detailed API reference for all modules |
| [📚 Library Reference](../Libraries/) | Core library functions and utilities |
| [⚙️ Configuration Guide](./configuration.md) | Advanced configuration options |
| [💡 Examples](../Examples/) | Real-world usage examples |
| [🔧 Troubleshooting Guide](./troubleshooting.md) | Common issues and solutions |

> 🚀 **Ready to build something amazing?** Start with the [Module Documentation](../Modules/) to see what's possible!
