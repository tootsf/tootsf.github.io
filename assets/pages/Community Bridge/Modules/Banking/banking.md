# Banking 🏦

<!--META
nav: true
toc: true
description: Banking and economy functions for managing player finances and transactions.
-->

Banking and economy functions for managing player finances and transactions.

## Overview

The Banking provides functionality for FiveM resources.

## Client Functions

### GetBalance

<!--TOC: GetBalance-->

**Context:** 🖥️ Client

Gets the player's current bank balance

**Syntax:** `Bridge.Banking.GetBalance()`

**Parameters:** None

**Returns:**
- (number) - The player's current bank balance

**Example:**
```lua
local balance = Bridge.Banking.GetBalance()
```

### WithdrawMoney

<!--TOC: WithdrawMoney-->

**Context:** 🖥️ Client

Withdraws money from the player's bank account

**Syntax:** `Bridge.Banking.WithdrawMoney(amount)`

**Parameters:**
- `amount` (number) - Amount to withdraw

**Returns:**
- (boolean) - Returns true if withdrawal was successful

**Example:**
```lua
local success = Bridge.Banking.WithdrawMoney(500)
```

## Server Functions

### TransferMoney

<!--TOC: TransferMoney-->

**Context:** 🖲️ Server

Transfers money between player accounts

**Syntax:** `Bridge.Banking.TransferMoney(fromPlayer, toPlayer, amount)`

**Parameters:**
- `fromPlayer` (number) - Source player ID
- `toPlayer` (number) - Target player ID
- `amount` (number) - Amount to transfer

**Returns:**
- (boolean) - Returns true if transfer was successful

**Example:**
```lua
local success = Bridge.Banking.TransferMoney(1, 2, 1000)
```

