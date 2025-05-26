---
layout: default
title: Locales
parent: Modules
grand_parent: Community Bridge
nav_order: 12
has_children: true
permalink: /community_bridge/modules/locales/
---

# Locales Module
{: .no_toc }

The Locales module provides a comprehensive internationalization system for FiveM resources. It automatically detects language settings from various sources and provides a unified interface for loading and formatting localized text.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

The Locales module offers:

- **Multi-Source Detection**: Automatically detects language from convars and configs
- **JSON-Based Locales**: Uses standard JSON files for translation storage
- **Nested Keys**: Support for dot notation to access nested translation objects
- **Variable Substitution**: String formatting with variable replacement
- **Fallback System**: Graceful fallback to keys when translations are missing
- **Resource-Specific**: Loads locales specific to each resource

---

## 📚 Language Detection Priority

The module checks language settings in the following order:

1. **Direct Convar**: `lang` convar
2. **Bridge Config**: `BridgeSharedConfig.Lang` (if not set to "auto")
3. **OX Locale**: `ox:locale` convar
4. **QBX Locale**: `qb_locale` convar  
5. **txAdmin Locale**: `txAdmin-locale` convar
6. **ESX Locale**: `esx:locale` convar
7. **Default**: Falls back to "en" (English)

## Available Functions

### Shared Functions
- `Language.Locale()` - Load and format localized text

## File Structure

```
your-resource/
├── locales/
│   ├── en.json        # English translations
│   ├── es.json        # Spanish translations
│   ├── fr.json        # French translations
│   └── de.json        # German translations
└── fxmanifest.lua
```

## Usage Example

### Basic Translation

```lua
-- Load simple translation
local welcomeText = Language.Locale('welcome')
-- Returns: "Welcome to our server!"

-- Load with variables
local playerMessage = Language.Locale('player.joined', playerName, playerLevel)
-- Returns: "Player John has joined the server at level 5!"
```

### JSON Locale File Example

```json
{
  "welcome": "Welcome to our server!",
  "player": {
    "joined": "Player %s has joined the server at level %d!",
    "left": "Player %s has left the server",
    "balance": "Your balance is $%d"
  },
  "shop": {
    "purchase": {
      "success": "Successfully purchased %s for $%d",
      "failed": "Insufficient funds to purchase %s"
    }
  }
}
```

## Features

- **Automatic Resource Detection**: Loads locales from the calling resource
- **Nested Object Support**: Access translations using dot notation
- **Variable Formatting**: Standard Lua string formatting with multiple variables
- **Error Handling**: Returns original key if translation not found
- **Performance**: Efficient JSON parsing and caching
