---
layout: default
title: "RemoveAccountMoney"
parent: Functions
grand_parent: Server
great_grand_parent: "📊 Managment"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/managment/server/functions/RemoveAccountMoney/
---

# RemoveAccountMoney
{: .no_toc }

Server
{: .label .label-green }

Remove money from a business account.

## Syntax

```lua
function Managment.RemoveAccountMoney(accountName, amount, reason)
```

## Parameters

- `accountName` (string) - The name of the business account
- `amount` (number) - The amount to remove from the account
- `reason` (string, optional) - The reason for the transaction

## Returns

**boolean**  
True if the transaction was successful, false otherwise

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Remove money from a business account
local success = Bridge.Managment.RemoveAccountMoney("restaurant_burgershot", 2500, "Equipment purchase")

if success then
    print("Successfully removed $2500 from the account")
else
    print("Failed to remove money from the account (insufficient funds?)")
end
```

## Supported Banking Systems

This function works with:
- qb-banking
- Renewed-Banking
- okokBanking
- fd_banking
- Default fallback system

## Notes

- Amount must be a positive number
- Will fail if account has insufficient funds
- Reason parameter helps with transaction logging
- Automatically detects the installed banking system
- Returns false if the account doesn't exist
