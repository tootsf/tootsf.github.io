---
layout: default
title: "GetAccountMoney"
parent: Functions
grand_parent: Server
great_grand_parent: "📊 Managment"
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/managment/server/functions/GetAccountMoney/
---

# GetAccountMoney
{: .no_toc }

Server
{: .label .label-green }

Retrieve account balance information for a business account.

## Syntax

```lua
function Managment.GetAccountMoney(accountName)
```

## Parameters

- `accountName` (string) - The name of the business account

## Returns

**number**  
The current balance of the account

## Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get the balance of a business account
local balance = Bridge.Managment.GetAccountMoney("restaurant_burgershot")
print("Current balance: $" .. balance)
```

## Supported Banking Systems

This function works with:
- qb-banking
- Renewed-Banking
- okokBanking
- fd_banking
- Default fallback system

## Notes

- Returns 0 if the account doesn't exist
- Account names are case-sensitive
- Automatically detects the installed banking system
