# Banking 🏦

<!--META
nav: true
toc: true
description: Banking and economy functions for managing player finances and transactions.
-->

Banking and economy functions for managing player finances and transactions.

## Overview

The Banking module provides functionality for FiveM resources to manage player finances and transactions.

<--FNC
{
  "name": "GetBalance",
  "side": "client",
  "description": "Gets the player's current bank balance",
  "syntax": "Bridge.Banking.GetBalance()",
  "parameters": [],
  "returns": [
    { "type": "number", "description": "The player's current bank balance" }
  ],
  "example": "local balance = Bridge.Banking.GetBalance()\nprint(\"Current balance: $\" .. balance)"
}
FNC-->

<--FNC
{
  "name": "WithdrawMoney",
  "side": "client",
  "description": "Withdraws money from the player's bank account",
  "syntax": "Bridge.Banking.WithdrawMoney(amount)",
  "parameters": [
    { "name": "amount", "type": "number", "description": "Amount to withdraw" }
  ],
  "returns": [
    { "type": "boolean", "description": "Returns true if withdrawal was successful" }
  ],
  "example": "local success = Bridge.Banking.WithdrawMoney(500)\nif success then\n    print(\"Successfully withdrew $500\")\nelse\n    print(\"Insufficient funds\")\nend"
}
FNC-->

<--FNC
{
  "name": "TransferMoney",
  "side": "server",
  "description": "Transfers money between player accounts",
  "syntax": "Bridge.Banking.TransferMoney(fromPlayer, toPlayer, amount)",
  "parameters": [
    { "name": "fromPlayer", "type": "number", "description": "Source player ID" },
    { "name": "toPlayer", "type": "number", "description": "Target player ID" },
    { "name": "amount", "type": "number", "description": "Amount to transfer" }
  ],
  "returns": [
    { "type": "boolean", "description": "Returns true if transfer was successful" }
  ],
  "example": "local success = Bridge.Banking.TransferMoney(source, targetPlayer, 1000)\nif success then\n    print(\"Transfer completed successfully\")\nelse\n    print(\"Transfer failed\")\nend"
}
FNC-->

