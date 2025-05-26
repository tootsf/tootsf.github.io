---
layout: default
title: Server Functions
parent: Menu
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 2
has_children: true
permalink: /community_bridge/modules/menu/server/
---

# Menu Module - Server Functions
{: .no_toc }

The menu module in community_bridge does not provide any server-side functions.

## Table of Contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Available Functions

**None** - The menu module only provides client-side functionality.

All menu operations are handled client-side using the `Bridge.Menu.Open()` function. 

## Manual Event Triggering

For server-to-client menu triggers, use standard FiveM events:

```lua
-- Server-side: Trigger a menu on a specific client
TriggerClientEvent('your_script:openMenu', playerId, menuData)
```

```lua
-- Client-side: Handle the menu trigger
RegisterNetEvent('your_script:openMenu', function(menuData)
    local Bridge = exports['community_bridge']:Bridge()
    Bridge.Menu.Open(menuData)
end)
```

---

## Related Documentation

- [Menu Client Functions](../client/) - Client-side menu functions
