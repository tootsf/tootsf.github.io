---
layout: default
title: Shared
parent: Locales
grand_parent: Modules
nav_order: 1
---

# Shared Functions
{: .no_toc }

Shared functions for internationalization and localized text management.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Language.Locale

Loads and formats localized text from JSON locale files with support for nested keys and variable substitution.

### Syntax

```lua
Language.Locale(str, ...)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `str` | `string` | Locale key, supports dot notation for nested objects |
| `...` | `any` | Optional variables for string formatting |

### Returns

| Type | Description |
|------|-------------|
| `string` | Formatted localized text, or original key if not found |

### Basic Usage

```lua
-- Simple key lookup
local message = Language.Locale('welcome')
-- Returns: "Welcome to our server!"

-- Key not found - returns original key
local missing = Language.Locale('nonexistent.key')
-- Returns: "nonexistent.key"
```

### Nested Key Access

```lua
-- Access nested objects using dot notation
local joinMessage = Language.Locale('player.joined')
-- Returns: "Player has joined the server"

local purchaseSuccess = Language.Locale('shop.purchase.success')
-- Returns: "Successfully purchased item"
```

### Variable Substitution

```lua
-- Single variable
local greeting = Language.Locale('player.welcome', playerName)
-- With locale: "Welcome %s!" -> "Welcome John!"

-- Multiple variables
local transaction = Language.Locale('shop.purchase.success', itemName, price)
-- With locale: "Purchased %s for $%d" -> "Purchased Bread for $15"

-- Mixed variable types
local stats = Language.Locale('player.stats', playerName, level, experience, money)
-- With locale: "%s is level %d with %d XP and $%d" 
-- -> "John is level 25 with 1500 XP and $5000"
```

## Locale File Format

### JSON Structure

```json
{
  "simple_key": "Simple translation text",
  "nested": {
    "key": "Nested translation text",
    "deeper": {
      "key": "Deeply nested translation"
    }
  },
  "with_variables": "Hello %s, you have %d credits",
  "multiple_formats": "Player: %s | Level: %d | Money: $%.2f | Status: %s"
}
```

### Variable Formatting

The module uses Lua's `string.format()` for variable substitution:

| Format | Type | Example |
|--------|------|---------|
| `%s` | String | `"Hello %s"` with `"John"` → `"Hello John"` |
| `%d` | Integer | `"Level %d"` with `25` → `"Level 25"` |
| `%f` | Float | `"Price %f"` with `19.99` → `"Price 19.990000"` |
| `%.2f` | Float (2 decimals) | `"Price $%.2f"` with `19.99` → `"Price $19.99"` |

## Language Detection

### Automatic Detection Order

1. **Direct Language Convar**
   ```
   set lang "es"
   ```

2. **Bridge Configuration**
   ```lua
   BridgeSharedConfig = {
       Lang = "fr" -- Not "auto"
   }
   ```

3. **Framework-Specific Convars**
   ```
   set ox:locale "de"
   set qb_locale "es"
   set txAdmin-locale "fr"
   set esx:locale "it"
   ```

4. **Default Fallback**
   ```lua
   -- Falls back to "en" if no language detected
   ```

### Current Language Access

```lua
-- Access the detected language
print("Current language: " .. Lang)
-- Outputs: "Current language: en"
```

## Practical Examples

### Multi-Language Notifications

```lua
-- notify.lua
function SendNotification(playerId, key, ...)
    local message = Language.Locale(key, ...)
    TriggerClientEvent('showNotification', playerId, message)
end

-- Usage
SendNotification(playerId, 'money.received', amount)
SendNotification(playerId, 'player.welcome', playerName)
```

### Shop System Integration

```lua
-- shop.lua
function ProcessPurchase(playerId, item, price)
    local playerMoney = GetPlayerMoney(playerId)
    
    if playerMoney >= price then
        RemovePlayerMoney(playerId, price)
        GivePlayerItem(playerId, item)
        
        local message = Language.Locale('shop.purchase.success', item, price)
        SendNotification(playerId, message)
    else
        local message = Language.Locale('shop.purchase.failed', item)
        SendNotification(playerId, message)
    end
end
```

### Dynamic UI Text

```lua
-- ui.lua
function UpdatePlayerHUD(playerId)
    local playerData = GetPlayerData(playerId)
    
    local ui = {
        health = Language.Locale('ui.health', playerData.health),
        armor = Language.Locale('ui.armor', playerData.armor),
        money = Language.Locale('ui.money', playerData.money),
        job = Language.Locale('ui.job', playerData.job.label, playerData.job.grade)
    }
    
    TriggerClientEvent('updateHUD', playerId, ui)
end
```

## Error Handling

### Missing Translation Keys

```lua
-- If translation doesn't exist, returns the key
local missing = Language.Locale('some.missing.key')
-- Returns: "some.missing.key"

-- Check for missing translations
if missing == 'some.missing.key' then
    print("Translation missing for: some.missing.key")
end
```

### Invalid Nested Paths

```lua
-- Attempting to access property of non-object
local invalid = Language.Locale('simple_key.nested.access')
-- Logs warning and returns original key
```

### Variable Mismatch

```lua
-- More variables than format specifiers
local result = Language.Locale('simple.text', var1, var2, var3)
-- Extra variables are ignored

-- Fewer variables than specifiers
local result = Language.Locale('needs.two.vars', onlyOneVar)
-- May cause formatting errors - provide all required variables
```

## Best Practices

1. **Consistent Key Structure**: Use consistent naming conventions for keys
2. **Logical Grouping**: Group related translations under nested objects
3. **Complete Translations**: Ensure all locale files have the same keys
4. **Variable Documentation**: Document expected variables for complex translations
5. **Fallback Handling**: Always provide English (en) as fallback language
