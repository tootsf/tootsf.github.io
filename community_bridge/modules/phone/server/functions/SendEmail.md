---
layout: default
title: "SendEmail"
parent: Functions
grand_parent: Server
great_grand_parent: "📱 Phone"
great_great_grand_parent: Modules
nav_order: 2
permalink: /community_bridge/modules/phone/server/functions/SendEmail/
---

# SendEmail
{: .no_toc }

Server
{: .label .label-green }

Send an email to a player through the integrated phone system from the server-side.

## Syntax

```lua
function Phone.SendEmail(src, email, title, message)
```

## Parameters

- `src` (number) - The target player's server ID
- `email` (string) - The sender email address
- `title` (string) - The email subject/title  
- `message` (string) - The email body/content

## Returns

**boolean**  
True if the email was sent successfully, false otherwise

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Send a server notification via email
local success = Bridge.Phone.SendEmail(
    source,
    "admin@server.com",
    "Server Maintenance Notice",
    "The server will undergo maintenance in 30 minutes. Please finish your current activities."
)

if success then
    print("Maintenance notification sent to player " .. source)
else
    print("Failed to send email to player " .. source)
end

-- Send welcome email to new player
RegisterNetEvent('community_bridge:Server:OnPlayerLoaded', function()
    local src = source
    Wait(5000) -- Wait a bit for phone to load
    
    Bridge.Phone.SendEmail(
        src,
        "welcome@server.com", 
        "Welcome to Our Server!",
        "Thank you for joining! Check out /help for available commands."
    )
end)
```

## Supported Phone Systems

This function works with:
- qs-smartphone
- gksphone  
- lb-phone
- okokPhone

## Notes

- The email will appear in the player's phone email app
- Email format and appearance may vary between different phone systems
- Returns false if the player doesn't have a phone or if no phone system is bridged
- Consider adding a small delay when sending emails to newly connected players
