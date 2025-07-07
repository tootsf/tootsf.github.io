# Managment 🏢

<!--META
nav: true
toc: true
description: The Management module provides functions for handling business and organization account management. It bridges various banking and management systems for business operations.
-->

The Management module provides functions for handling business and organization account management. It bridges various banking and management systems for business operations.

## Overview

The Managment provides functionality for FiveM resources.

## Server Functions

### AddAccountMoney

<!--TOC: AddAccountMoney-->

**Context:** 🖲️ Server

Adds money to a specified business account with a reason for the transaction.

**Syntax:** `Bridge.Managment.AddAccountMoney(account, amount, reason)`

**Parameters:**
- `account` (string) - The account identifier/name
- `amount` (number) - Amount of money to add
- `reason` (string) - Reason for the transaction

**Returns:**
- (boolean) - True if money was added successfully

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local success = Bridge.Managment.AddAccountMoney("mechanic_shop", 5000, "Vehicle repair payment")
if success then
    print("Payment added to mechanic shop account")
else
    print("Failed to add payment")
end
```

### GetAccountMoney

<!--TOC: GetAccountMoney-->

**Context:** 🖲️ Server

Retrieves the account details and balance for a specified business account.

**Syntax:** `Bridge.Managment.GetAccountMoney(account)`

**Parameters:**
- `account` (string) - The account identifier/name

**Returns:**
- (table) - Account details including balance information

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local accountData = Bridge.Managment.GetAccountMoney("mechanic_shop")
if accountData.balance then
    print("Account balance: $" .. accountData.balance)
end
```

### GetManagmentName

<!--TOC: GetManagmentName-->

**Context:** 🖲️ Server

Returns the name of the currently active management system.

**Syntax:** `Bridge.Managment.GetManagmentName()`

**Parameters:** None

**Returns:**
- (string) - Name of the management system in use

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local systemName = Bridge.Managment.GetManagmentName()
print("Using management system: " .. systemName)
```

### RemoveAccountMoney

<!--TOC: RemoveAccountMoney-->

**Context:** 🖲️ Server

Removes money from a specified business account with a reason for the transaction.

**Syntax:** `Bridge.Managment.RemoveAccountMoney(account, amount, reason)`

**Parameters:**
- `account` (string) - The account identifier/name
- `amount` (number) - Amount of money to remove
- `reason` (string) - Reason for the transaction

**Returns:**
- (boolean) - True if money was removed successfully

**Example:**
```lua
local Bridge = exports['community_bridge']:Bridge()

local success = Bridge.Managment.RemoveAccountMoney("mechanic_shop", 2000, "Equipment purchase")
if success then
    print("Money deducted from mechanic shop account")
else
    print("Failed to deduct money")
end
```

