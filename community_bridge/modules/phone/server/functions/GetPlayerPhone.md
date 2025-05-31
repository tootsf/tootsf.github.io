---
layout: default
title: "GetPlayerPhone"
parent: Functions
grand_parent: Server
great_grand_parent: "📱 Phone"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/phone/server/functions/GetPlayerPhone/
---

# GetPlayerPhone
{: .no_toc }

Server
{: .label .label-green }

Retrieve a player's phone number from the integrated phone system.

## Syntax

```lua
function Phone.GetPlayerPhone(src)
```

## Parameters

- `src` (number) - The player's server ID

## Returns

**number|boolean**  
Player's phone number if found, false if not found or no phone system bridged

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get player's phone number
local phoneNumber = Bridge.Phone.GetPlayerPhone(source)

if phoneNumber then
    print("Player " .. source .. " has phone number: " .. phoneNumber)
    -- You can now use this phone number for other operations
else
    print("Could not retrieve phone number for player " .. source)
end
```

## Supported Phone Systems

This function works with:
- qs-smartphone
- gksphone  
- lb-phone
- okokPhone

## Notes

- Returns false if the player doesn't have a phone or if no phone system is bridged
- Phone number format may vary depending on the phone system used
- This is useful for systems that need to know a player's phone number for notifications or communication
