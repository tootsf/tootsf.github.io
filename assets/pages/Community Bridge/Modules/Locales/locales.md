# Locales 🌍

<!--META
nav: true
toc: true
description: Multi-language localization system that automatically detects server language settings and provides translation functions. Supports nested JSON structures and variable interpolation for comprehensive internationalization support.
-->

Multi-language localization system that automatically detects server language settings and provides translation functions. Supports nested JSON structures and variable interpolation for comprehensive internationalization support.

## Overview

The Locales provides functionality for FiveM resources.

## Client Functions

### Current Language

<!--TOC: Current Language-->

**Context:** 🖥️ Client

Function Current Language

**Syntax:** `Lang`

**Parameters:** None

**Returns:**
- (string) - The current language code

**Example:**
```lua
print('Current language:', Lang) -- Output: 'en', 'fr', 'es', etc.
```

### Locale

<!--TOC: Locale-->

**Context:** 🖥️ Client

Function Locale

**Syntax:** `Bridge.Language.Locale(key, ...args)`

**Parameters:**
- `key` (string) - The locale key using dot notation for nested objects
- `unknown` (unknown) - ...args (any) - Optional arguments for string formatting

**Returns:**
- (string) - The localized text or the key if not found

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local text = Bridge.Language.Locale('ui.welcome_message')
print('Localized text:', text)
```

### Locale (with formatting)

<!--TOC: Locale (with formatting)-->

**Context:** 🖥️ Client

Function Locale (with formatting)

**Syntax:** `Bridge.Language.Locale(key, arg1, arg2, ...)`

**Parameters:**
- `key` (string) - The locale key
- `unknown` (unknown) - arg1, arg2, ... (any) - Arguments for string.format() interpolation

**Returns:**
- (string) - The formatted localized text

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
-- In en.json: "welcome": "Welcome %s, you have %d coins"
local message = Bridge.Language.Locale('welcome', playerName, coinCount)
print(message) -- Output: Welcome John, you have 150 coins
```

## Server Functions

### Current Language

<!--TOC: Current Language-->

**Context:** 🖲️ Server

Function Current Language

**Syntax:** `Lang`

**Parameters:** None

**Returns:**
- (string) - The current language code

**Example:**
```lua
print('Server language:', Lang)
-- Use in conditional logic
if Lang == 'es' then
    -- Spanish-specific server logic
end
```

### Locale

<!--TOC: Locale-->

**Context:** 🖲️ Server

Function Locale

**Syntax:** `Bridge.Language.Locale(key, ...args)`

**Parameters:**
- `key` (string) - The locale key using dot notation for nested objects
- `unknown` (unknown) - ...args (any) - Optional arguments for string formatting

**Returns:**
- (string) - The localized text or the key if not found

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
local errorMsg = Bridge.Language.Locale('errors.insufficient_funds')
print('Error message:', errorMsg)
```

### Locale (with formatting)

<!--TOC: Locale (with formatting)-->

**Context:** 🖲️ Server

Function Locale (with formatting)

**Syntax:** `Bridge.Language.Locale(key, arg1, arg2, ...)`

**Parameters:**
- `key` (string) - The locale key
- `unknown` (unknown) - arg1, arg2, ... (any) - Arguments for string.format() interpolation

**Returns:**
- (string) - The formatted localized text

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()
-- In en.json: "player_joined": "Player %s joined the server with ID %d"
local message = Bridge.Language.Locale('player_joined', playerName, playerId)
TriggerClientEvent('chat:addMessage', -1, {args = {message}})
```

## Usage Examples

### Basic Locale Setup

Setting up locales in your resource

```lua
-- Create locales/en.json in your resource
{
  "ui": {
    "welcome": "Welcome to the server!",
    "goodbye": "See you later!"
  },
  "errors": {
    "not_found": "Item not found",
    "insufficient_funds": "You don't have enough money"
  }
}

-- In your script
local Bridge = exports['community_bridge']:Bridge()
local welcomeText = Bridge.Language.Locale('ui.welcome')
local errorText = Bridge.Language.Locale('errors.not_found')
```

### Formatted Locales

Using string formatting in locales

```lua
-- In locales/en.json
{
  "player": {
    "money_received": "You received $%d from %s",
    "level_up": "Congratulations! You reached level %d"
  }
}

-- In your script
local Bridge = exports['community_bridge']:Bridge()
local moneyMsg = Bridge.Language.Locale('player.money_received', 500, 'John')
local levelMsg = Bridge.Language.Locale('player.level_up', newLevel)

Bridge.Notify.SendNotify(moneyMsg, 'success')
Bridge.Notify.SendNotify(levelMsg, 'info')
```

### Multi-Language Support

Supporting multiple languages

```lua
-- locales/en.json
{
  "shop": {
    "buy_item": "Purchase %s for $%d?",
    "sold_item": "You sold %s for $%d"
  }
}

-- locales/es.json
{
  "shop": {
    "buy_item": "¿Comprar %s por $%d?",
    "sold_item": "Vendiste %s por $%d"
  }
}

-- In your script (works with any language)
local Bridge = exports['community_bridge']:Bridge()
local buyPrompt = Bridge.Language.Locale('shop.buy_item', itemName, price)
local soldMessage = Bridge.Language.Locale('shop.sold_item', itemName, sellPrice)
```

