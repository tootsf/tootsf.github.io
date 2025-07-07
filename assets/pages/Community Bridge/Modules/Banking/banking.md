# Banking 🏦

<!--META
nav: true
toc: true
description: Banking and economy functions for managing player finances and transactions.
-->

Banking and economy functions for managing player finances and transactions.

## Overview

The Banking module provides functionality for FiveM resources to manage player finances and transactions.

## Client Functions

### GetBalance

**Description:** Gets the player's current bank balance

**Syntax:** `Bridge.Banking.GetBalance()`

**Parameters:** None

**Returns:**
- `number` - The player's current bank balance

**Example:**
```lua
local balance = Bridge.Banking.GetBalance()
print("Current balance: $" .. balance)
```

### WithdrawMoney

**Description:** Withdraws money from the player's bank account

**Syntax:** `Bridge.Banking.WithdrawMoney(amount)`

**Parameters:**
- `amount` (number) - Amount to withdraw

**Returns:**
- `boolean` - Returns true if withdrawal was successful

**Example:**
```lua
local success = Bridge.Banking.WithdrawMoney(500)
if success then
    print("Successfully withdrew $500")
else
    print("Insufficient funds")
end
```

## Server Functions

### TransferMoney

**Description:** Transfers money between player accounts

**Syntax:** `Bridge.Banking.TransferMoney(fromPlayer, toPlayer, amount)`

**Parameters:**
- `fromPlayer` (number) - Source player ID
- `toPlayer` (number) - Target player ID  
- `amount` (number) - Amount to transfer

**Returns:**
- `boolean` - Returns true if transfer was successful

**Example:**
```lua
local success = Bridge.Banking.TransferMoney(source, targetPlayer, 1000)
if success then
    print("Transfer completed successfully")
else
    print("Transfer failed")
end
```

