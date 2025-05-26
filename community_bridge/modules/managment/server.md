---
layout: default
title: Server
parent: "⚙️ Managment"
grand_parent: Modules
nav_order: 1
---

# Server Functions

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Practical Usage Examples

---

## 📚 Automated Salary System

```lua
local Bridge = exports['community_bridge']:Bridge()
-- Example salary system code using Bridge pattern
```

---

## 📚 Business Revenue Distribution

```lua
-- Distribute business profits
function DistributeBusinessProfits(businessName, totalRevenue)
    local Bridge = exports['community_bridge']:Bridge()
    local governmentTax = math.floor(totalRevenue * 0.15) -- 15% tax
    local businessProfit = totalRevenue - governmentTax
    
    -- Add profit to business account
    local success = Bridge.Managment.AddAccountMoney(businessName, businessProfit, "Daily revenue")
    
    if success then
        -- Add tax to government account
        Bridge.Managment.AddAccountMoney("government", governmentTax, "Business tax from " .. businessName)
        
        print("Business " .. businessName .. " earned $" .. businessProfit .. " (tax: $" .. governmentTax .. ")")
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
local Bridge = exports['community_bridge']:Bridge()

local accountData = Bridge.Managment.GetAccountMoney("police")
if not accountData or not accountData.money then
    print("Banking system not available or account not found")
    return
end

local success = Bridge.Managment.AddAccountMoney("police", 1000, "Test transaction")
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
