# Banking 🏦

<!--META
nav: true
toc: true
description: Banking and economy functions for managing player finances and transactions.
-->

Banking and economy functions for managing player finances and transactions.

## Overview

The Banking module provides comprehensive financial management functions for handling player money, bank accounts, and transactions in FiveM.

## GetBalance (Client)

### Description
Gets the player's current bank balance

### Syntax
```lua
Bridge.Banking.GetBalance()
```

### Returns
- (number): The player's current bank balance

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local balance = Bridge.Bridge.Banking.GetBalance()
```

## WithdrawMoney (Client)

### Description
Withdraws money from the player's bank account

### Syntax
```lua
Bridge.Banking.WithdrawMoney(amount)
```

### Parameters
- **amount** (number): Amount to withdraw

### Returns
- (boolean): Returns true if withdrawal was successful

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local success = Bridge.Bridge.Banking.WithdrawMoney(500)
```

## TransferMoney (Server)

### Description
Transfers money between player accounts

### Syntax
```lua
Bridge.Banking.TransferMoney(fromPlayer, toPlayer, amount)
```

### Parameters
- **fromPlayer** (number): Source player ID
- **toPlayer** (number): Target player ID
- **amount** (number): Amount to transfer

### Returns
- (boolean): Returns true if transfer was successful

### Example
```lua
local Bridge = exports["community_bridge"]:Bridge()

local success = Bridge.Bridge.Banking.TransferMoney(1, 2, 1000)
```

