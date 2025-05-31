---
layout: default
title: "AddAccountMoney"
parent: Functions
grand_parent: Server
great_grand_parent: "📊 Managment"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/managment/server/functions/AddAccountMoney/
---

# AddAccountMoney
{: .no_toc }

Server
{: .label .label-green }

Add money to a business account.

## Syntax

```lua
function Managment.AddAccountMoney(accountName, amount, reason)
```

## Parameters

- `accountName` (string) - The name of the business account
- `amount` (number) - The amount to add to the account
- `reason` (string, optional) - The reason for the transaction

## Returns

**boolean**  
True if the transaction was successful, false otherwise

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Add money to a business account
local success = Bridge.Managment.AddAccountMoney("restaurant_burgershot", 5000, "Daily sales")

if success then
    print("Successfully added $5000 to the account")
else
    print("Failed to add money to the account")
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
- Reason parameter helps with transaction logging
- Automatically detects the installed banking system
- Some banking systems may have transaction limits
