---
title: Locales Module
sidebar_position: 13
---

# Locales Module

The Locales module in `community_bridge` provides a unified API for handling translations and localization across resources.

## Shared Functions

### Locale
```lua
Language.Locale(key, ...)
```
Retrieves a localized string from the resource's language files. Supports dot notation for nested keys and variable replacement.
- `key` (string): Dot-notated path to the locale string (e.g., "notifications.welcome")
- `...` (any): Optional variables for string formatting
- **Returns:** (string) Localized and formatted string

**Example:**
```lua
local msg = Language.Locale("notifications.greeting", "Player123")
-- If locales/en.json contains: { "notifications": { "greeting": "Hello, %s!" } }
-- msg == "Hello, Player123!"
```
