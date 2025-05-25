---
layout: default
title: Server
parent: Phone
grand_parent: Modules
nav_order: 1
---

# Server Functions
{: .no_toc }

Server-side functions for phone integration and email management.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Phone.GetPlayerPhone

Retrieves the phone number or phone information for a specific player.

### Syntax

```lua
Phone.GetPlayerPhone(src)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | `number` | Server ID of the player |

### Returns

| Type | Description |
|------|-------------|
| `number` or `boolean` | Player's phone number, or `false` if no phone or not bridged |

### Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = 1
local phoneNumber = Bridge.Phone.GetPlayerPhone(playerId)

if phoneNumber then
    print("Player " .. playerId .. " has phone: " .. phoneNumber)
else
    print("Player has no phone or phone system not available")
end
```

### Integration Behavior

- **qs-smartphone**: Returns phone number from `qs-base:GetPlayerPhone`
- **Default**: Returns `false` with error message when no phone system is bridged

---

## Phone.SendEmail

Sends an email to a player through the integrated phone system.

### Syntax

```lua
Phone.SendEmail(src, email, title, message)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | `number` | Server ID of the recipient player |
| `email` | `string` | Sender email address |
| `title` | `string` | Email subject/title |
| `message` | `string` | Email message content |

### Returns

| Type | Description |
|------|-------------|
| `boolean` | `true` if email sent successfully, `false` if failed or not bridged |

### Example

```lua
local Bridge = exports['community_bridge']:Bridge()

local playerId = 1
local success = Bridge.Phone.SendEmail(
    playerId,
    "admin@myserver.com",
    "Server Maintenance",
    "The server will be restarting in 10 minutes for maintenance."
)

if success then
    print("Email sent successfully")
else
    print("Failed to send email - phone system may not be available")
end
```

### Integration Behavior

- **qs-smartphone**: Triggers client event `community_bridge:Server:genericEmail` with email data
- **Default**: Returns `false` with error message when no phone system is bridged

### Email Data Structure

When using supported phone systems, the email is formatted as:

```lua
{
    sender = email,      -- Sender email address
    subject = title,     -- Email subject
    message = message,   -- Email content
    button = {}         -- Additional button data (empty by default)
}
```

## Error Handling

When no phone system is detected or bridged:

- Functions return `false` to indicate failure
- Error messages are logged using `Print.Error()` 
- Applications should check return values and handle gracefully

### Example Error Handling

```lua
local Bridge = exports['community_bridge']:Bridge()

local phoneNumber = Bridge.Phone.GetPlayerPhone(playerId)
if not phoneNumber then
    -- Handle case where player has no phone
    Notify.SendNotify(playerId, "Phone system unavailable", "error", 5000)
    return
end

local emailSent = Bridge.Phone.SendEmail(playerId, "server@game.com", "Welcome", "Welcome to the server!")
if not emailSent then
    -- Handle email failure
    print("Could not send welcome email to player " .. playerId)
end
```

## Integration Notes

- The module automatically detects available phone resources
- Each phone system integration checks `GetResourceState()` before loading
- Fallback to default implementation ensures consistent API
- Server functions are available regardless of phone system status
