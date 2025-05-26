---
layout: default
title: Managment
parent: Modules
grand_parent: Community Bridge
nav_order: 13
has_children: true
permalink: /community_bridge/modules/managment/
---

# Managment Module
{: .no_toc }

The Managment module provides a unified interface for managing business and organization accounts across different banking systems. It offers standardized functions for account balance operations, supporting multiple popular banking resources through a bridge system.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

## 📚 Overview

The Managment module offers:

- **Multi-Banking Support**: Compatible with various banking resources
- **Account Management**: Get, add, and remove money from business accounts
- **Automatic Detection**: Automatically detects installed banking systems
- **Transaction Logging**: Support for transaction reasons and logging
- **Fallback Handling**: Graceful fallback when no banking system is detected

---

## 📚 Supported Banking Resources

- **qb-banking**: QBCore banking system
- **Renewed-Banking**: Renewed Scripts banking
- **okokBanking**: OKOK Banking system
- **fd_banking**: FD Banking system
- **Default**: Fallback implementation when no banking system is detected

---

## 📚 Available Functions

### Server Functions
- `Managment.GetAccountMoney()` - Retrieve account balance information
- `Managment.AddAccountMoney()` - Add money to a business account
- `Managment.RemoveAccountMoney()` - Remove money from a business account

---

## 📚 Module Structure

```
managment/
├── _default/           # Fallback implementation
├── qb-banking/        # QBCore banking integration
├── Renewed-Banking/   # Renewed Scripts integration
├── okokBanking/       # OKOK Banking integration
└── fd_banking/        # FD Banking integration
```

---

## 📚 Bridge System

The module uses a bridge system that:
1. Checks for installed banking resources using `GetResourceState()`
2. Loads appropriate integration files for detected systems
3. Falls back to default implementation if no system is found
4. Provides consistent API calls regardless of underlying banking system

---

## 📚 Usage Example

```lua
local Bridge = exports['community_bridge']:Bridge()

-- Get account information
local accountData = Bridge.Managment.GetAccountMoney("police_department")

-- Add money to account
local success = Bridge.Managment.AddAccountMoney("police_department", 5000, "Equipment purchase")

-- Remove money from account
local success = Bridge.Managment.RemoveAccountMoney("police_department", 1500, "Monthly expenses")
```

---

## 📚 Account Types

Different banking systems may support various account types:
- **Job Accounts**: Police, EMS, Government departments
- **Gang Accounts**: Criminal organization funds
- **Business Accounts**: Player-owned business accounts
- **Society Accounts**: General organization accounts

---

## 📚 Integration Benefits

- **Code Portability**: Same code works across different servers with different banking systems
- **Easy Migration**: Switch between banking systems without changing management scripts
- **Automatic Detection**: No manual configuration needed
- **Transaction Tracking**: Consistent reason logging across all systems
