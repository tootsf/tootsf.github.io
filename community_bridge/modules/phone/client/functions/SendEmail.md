---
layout: default
title: "SendEmail"
parent: Functions
grand_parent: Client
great_grand_parent: "📱 Phone"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/phone/client/functions/SendEmail/
---

# SendEmail
{: .no_toc }

Client
{: .label .label-blue }

Send an email through the integrated phone system from the client-side.

## Syntax

```lua
function Phone.SendEmail(email, title, message)
```

## Parameters

- `email` (string) - The sender email address
- `title` (string) - The email subject/title
- `message` (string) - The email body/content

## Returns

**boolean**  
True if the email was sent successfully, false otherwise

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Send an email notification
local success = Bridge.Phone.SendEmail(
    "system@server.com",
    "Welcome to the Server!",
    "Thank you for joining our community. Please read the rules and have fun!"
)

if success then
    print("Email sent successfully")
else
    print("Failed to send email")
end
```

## Supported Phone Systems

This function works with:
- qs-smartphone
- gksphone  
- lb-phone
- okokPhone

## Notes

- The email will be sent to the player's phone using the integrated phone system
- Behavior may vary slightly between different phone systems
- Returns false if no phone system is bridged
