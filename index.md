---
title: Home
layout: home
nav_order: 1
description: "Community Bridge Documentation - Unified FiveM Framework API"
permalink: /
---

# Community Bridge Documentation

Welcome to the comprehensive documentation for Community Bridge, a powerful FiveM resource that provides a unified API for interacting with various frameworks and systems.

[Get started now](community_bridge/){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 } [View on GitHub](https://github.com/tootsf/community_bridge){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## What is Community Bridge?

Community Bridge is a comprehensive abstraction layer that allows FiveM developers to write framework-agnostic code. Whether your server runs ESX, QBCore, or custom frameworks, Community Bridge provides consistent APIs that work seamlessly across different configurations.

## Key Features

- **🔧 Framework Agnostic** - Works with ESX, QBCore, and custom frameworks
- **📦 Modular Design** - Use only the modules you need
- **🎯 Consistent API** - Same function calls across different systems  
- **📚 Extensive Documentation** - Comprehensive guides and examples
- **🚀 Active Development** - Regular updates and community support

## Quick Example

```lua
-- Server-side: Works the same regardless of framework
local playerId = source
local playerMoney = Framework.GetMoney(playerId)

if playerMoney >= 500 then
    Framework.RemoveMoney(playerId, 500)
    Inventory.AddItem(playerId, "water", 5)
    Notify.SendNotify(playerId, "Purchased 5 water bottles!", "success")
else
    Notify.SendNotify(playerId, "Insufficient funds!", "error")
end
```

## Getting Started

1. **[Installation Guide](community_bridge/)** - Set up Community Bridge on your server
2. **[Module Overview](community_bridge/modules/)** - Explore available modules
3. **[Framework Setup](community_bridge/modules/framework/)** - Configure your framework integration
4. **[Examples & Tutorials](community_bridge/examples/)** - Learn with practical examples

---

## Support & Community

- 📖 **Documentation** - Comprehensive guides for all modules
- 🐛 **Issues** - [Report bugs on GitHub](https://github.com/tootsf/community_bridge/issues)
- 💬 **Discord** - Join our community for support and discussions
- 📝 **Contributing** - Help improve Community Bridge
