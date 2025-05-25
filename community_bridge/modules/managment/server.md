---
layout: default
title: Server
parent: Managment
grand_parent: Modules
nav_order: 1
---

# Server Functions
{: .no_toc }

Server-side functions for business and organization account management across multiple banking systems.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Managment.GetAccountMoney

Retrieves account balance and information for a specified business or organization account.

### Syntax

```lua
Managment.GetAccountMoney(account)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `account` | `string` | Account identifier (e.g., "police", "ambulance", "mechanic") |

### Returns

| Type | Description |
|------|-------------|
| `table` | Account data including balance and details, empty table if not supported |

### Example

```lua
local policeAccount = Managment.GetAccountMoney("police")

if policeAccount and policeAccount.money then
    print("Police department balance: $" .. policeAccount.money)
    print("Account name: " .. policeAccount.name)
else
    print("Could not retrieve police account information")
end
```

### Return Data Structure

Depending on the banking system, the returned table may contain:

```lua
{
    money = 15000,           -- Account balance
    name = "Police Department", -- Account display name
    type = "job",            -- Account type
    -- Additional system-specific fields
}
```

### Integration Behavior

- **qb-banking**: Returns full account object with balance and metadata
- **Renewed-Banking**: Returns account information from society system
- **okokBanking**: Returns OKOK-specific account structure
- **Default**: Returns empty table with error message

---

## Managment.AddAccountMoney

Adds money to a specified business or organization account with transaction logging.

### Syntax

```lua
Managment.AddAccountMoney(account, amount, reason)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `account` | `string` | Account identifier to add money to |
| `amount` | `number` | Amount of money to add (positive number) |
| `reason` | `string` | Reason for the transaction (for logging) |

### Returns

| Type | Description |
|------|-------------|
| `boolean` | `true` if money added successfully, `false` if failed or not supported |

### Example

```lua
-- Add money to police department
local success = Managment.AddAccountMoney("police", 5000, "Evidence room funding")

if success then
    print("Successfully added $5000 to police account")
else
    print("Failed to add money to police account")
end

-- Add money from government budget
local govBudget = Managment.AddAccountMoney("ambulance", 10000, "Monthly government allocation")
```

### Common Account Types

```lua
-- Job accounts
Managment.AddAccountMoney("police", 5000, "Equipment purchase")
Managment.AddAccountMoney("ambulance", 3000, "Medical supplies")
Managment.AddAccountMoney("mechanic", 2500, "Tool upgrade")

-- Business accounts
Managment.AddAccountMoney("import_business", 15000, "Car sales profit")
Managment.AddAccountMoney("vanilla_unicorn", 8000, "Daily revenue")

-- Gang accounts (if supported)
Managment.AddAccountMoney("ballas", 10000, "Territory earnings")
```

---

## Managment.RemoveAccountMoney

Removes money from a specified business or organization account with transaction logging.

### Syntax

```lua
Managment.RemoveAccountMoney(account, amount, reason)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `account` | `string` | Account identifier to remove money from |
| `amount` | `number` | Amount of money to remove (positive number) |
| `reason` | `string` | Reason for the transaction (for logging) |

### Returns

| Type | Description |
|------|-------------|
| `boolean` | `true` if money removed successfully, `false` if failed, insufficient funds, or not supported |

### Example

```lua
-- Remove money for expenses
local success = Managment.RemoveAccountMoney("police", 1500, "Monthly vehicle maintenance")

if success then
    print("Successfully deducted $1500 from police account")
else
    print("Failed to remove money - insufficient funds or error")
end

-- Check balance before large expense
local accountData = Managment.GetAccountMoney("ambulance")
if accountData.money >= 5000 then
    local success = Managment.RemoveAccountMoney("ambulance", 5000, "New ambulance purchase")
    if success then
        print("Ambulance purchased successfully")
    end
else
    print("Insufficient funds for ambulance purchase")
end
```

## Practical Usage Examples

### Automated Salary System

```lua
-- Pay salaries to all online job members
function PayJobSalaries()
    local jobs = {"police", "ambulance", "mechanic", "taxi"}
    
    for _, jobName in pairs(jobs) do
        local onlineCount = GetOnlineJobCount(jobName)
        local totalSalary = onlineCount * 500 -- $500 per person
        
        if totalSalary > 0 then
            local accountData = Managment.GetAccountMoney(jobName)
            
            if accountData.money >= totalSalary then
                local success = Managment.RemoveAccountMoney(jobName, totalSalary, "Weekly salary payment")
                if success then
                    TriggerEvent('payroll:distributeSalaries', jobName, 500)
                    print("Paid salaries for " .. jobName .. ": $" .. totalSalary)
                end
            else
                print("Insufficient funds for " .. jobName .. " salaries")
            end
        end
    end
end
```

### Business Revenue Distribution

```lua
-- Distribute business profits
function DistributeBusinessProfits(businessName, totalRevenue)
    local governmentTax = math.floor(totalRevenue * 0.15) -- 15% tax
    local businessProfit = totalRevenue - governmentTax
    
    -- Add profit to business account
    local success = Managment.AddAccountMoney(businessName, businessProfit, "Daily revenue")
    
    if success then
        -- Add tax to government account
        Managment.AddAccountMoney("government", governmentTax, "Business tax from " .. businessName)
        
        print("Business " .. businessName .. " earned $" .. businessProfit .. " (tax: $" .. governmentTax .. ")")
    end
end
```

### Equipment Purchase System

```lua
-- Purchase equipment for job
function PurchaseJobEquipment(playerId, jobName, itemName, cost)
    local accountData = Managment.GetAccountMoney(jobName)
    
    if not accountData or accountData.money < cost then
        TriggerClientEvent('showNotification', playerId, 'Insufficient job funds', 'error')
        return false
    end
    
    local success = Managment.RemoveAccountMoney(jobName, cost, "Equipment purchase: " .. itemName)
    
    if success then
        -- Give item to player
        exports['inventory']:AddItem(playerId, itemName, 1)
        TriggerClientEvent('showNotification', playerId, 'Equipment purchased successfully', 'success')
        
        -- Log the purchase
        TriggerEvent('logs:jobExpense', jobName, playerId, itemName, cost)
        return true
    else
        TriggerClientEvent('showNotification', playerId, 'Purchase failed', 'error')
        return false
    end
end
```

## Error Handling

When no banking system is detected or operations fail:

- Functions return `false` or empty tables to indicate failure
- Error messages are logged to console
- Applications should check return values and handle gracefully

### Example Error Handling

```lua
local accountData = Managment.GetAccountMoney("police")
if not accountData or not accountData.money then
    print("Banking system not available or account not found")
    return
end

local success = Managment.AddAccountMoney("police", 1000, "Test transaction")
if not success then
    print("Failed to add money - banking system may not be available")
    -- Handle fallback logic
end
```

## Integration Notes

- Each banking system integration checks `GetResourceState()` before loading
- Account identifiers may vary between systems (some use job names, others use specific IDs)
- Transaction reasons are logged by supported systems for audit trails
- Default implementation provides error messages when no banking system is bridged
- Some systems may have additional features not exposed through this bridge
