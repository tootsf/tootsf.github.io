---
layout: default
title: Server Functions
parent: Input
grand_parent: Modules
great_grand_parent: Community Bridge
nav_order: 2
permalink: /community_bridge/modules/input/server/
---

# Input Module - Server Functions
{: .no_toc }

Server-side functions for managing input requests and validation.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Input Request Functions

### `exports.community_bridge:RequestInput(playerId, config, callback)`

Requests input from a specific player.

**Parameters:**
- `playerId` (number): Target player's server ID
- `config` (table): Input configuration (same as client ShowInput)
- `callback` (function): Callback function when input is received

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Request player name from client
exports.community_bridge:RequestInput(playerId, {
    title = "Character Name",
    subtitle = "Enter your character name",
    placeholder = "John Doe",
    maxLength = 50,
    required = true
}, function(input)
    if input then
        -- Process the name
        SetPlayerName(playerId, input)
        exports.community_bridge:SendNotify(playerId, "Name updated!", "success")
    else
        exports.community_bridge:SendNotify(playerId, "Name change cancelled", "info")
    end
end)
```

### `exports.community_bridge:RequestInputForm(playerId, config, callback)`

Requests form input from a specific player.

**Parameters:**
- `playerId` (number): Target player's server ID
- `config` (table): Form configuration
- `callback` (function): Callback function when form is submitted

**Returns:**
- `boolean`: Success status

**Example:**
```lua
-- Request business registration form
RegisterNetEvent('business:requestRegistration', function()
    local playerId = source
    
    exports.community_bridge:RequestInputForm(playerId, {
        title = "Business Registration",
        subtitle = "Register your new business",
        fields = {
            {
                name = "name",
                label = "Business Name",
                type = "text",
                required = true,
                maxLength = 50
            },
            {
                name = "type",
                label = "Business Type",
                type = "select",
                required = true,
                options = {
                    {value = "shop", label = "Retail Shop"},
                    {value = "restaurant", label = "Restaurant"},
                    {value = "garage", label = "Auto Garage"},
                    {value = "other", label = "Other"}
                }
            },
            {
                name = "description",
                label = "Description",
                type = "textarea",
                maxLength = 200
            }
        }
    }, function(formData)
        if formData then
            -- Process business registration
            CreateBusiness(playerId, formData)
        end
    end)
end)

function CreateBusiness(playerId, data)
    -- Validate player has required money
    local cost = Config.BusinessRegistrationCost
    if exports.community_bridge:GetMoney(playerId, 'bank') >= cost then
        exports.community_bridge:RemoveMoney(playerId, 'bank', cost)
        
        -- Insert business into database
        local businessId = MySQL.insert.await('INSERT INTO businesses (owner, name, type, description) VALUES (?, ?, ?, ?)', {
            exports.community_bridge:GetIdentifier(playerId),
            data.name,
            data.type,
            data.description or ''
        })
        
        exports.community_bridge:SendNotify(playerId, "Business registered successfully!", "success")
    else
        exports.community_bridge:SendNotify(playerId, "Insufficient funds for registration", "error")
    end
end
```

## Input Validation Functions

### `exports.community_bridge:ValidateServerInput(input, rules)`

Server-side input validation with comprehensive rules.

**Parameters:**
- `input` (any): Input value to validate
- `rules` (table): Validation rules

**Returns:**
- `boolean`: True if valid
- `string`: Error message if invalid

**Example:**
```lua
-- Server-side validation for character creation
RegisterNetEvent('character:create', function(characterData)
    local playerId = source
    
    -- Validate first name
    local valid, error = exports.community_bridge:ValidateServerInput(characterData.firstname, {
        required = true,
        type = "string",
        minLength = 2,
        maxLength = 20,
        pattern = "^[a-zA-Z]+$"
    })
    
    if not valid then
        exports.community_bridge:SendNotify(playerId, "Invalid first name: " .. error, "error")
        return
    end
    
    -- Validate age
    valid, error = exports.community_bridge:ValidateServerInput(characterData.age, {
        required = true,
        type = "number",
        min = 18,
        max = 100
    })
    
    if not valid then
        exports.community_bridge:SendNotify(playerId, "Invalid age: " .. error, "error")
        return
    end
    
    -- All validation passed, create character
    CreateCharacter(playerId, characterData)
end)
```

### `exports.community_bridge:SetServerValidationRule(name, rule)`

Registers custom server-side validation rules.

**Parameters:**
- `name` (string): Rule name
- `rule` (function): Validation function

**Example:**
```lua
-- Custom validation for unique usernames
exports.community_bridge:SetServerValidationRule("uniqueUsername", function(username)
    local result = MySQL.scalar.await('SELECT COUNT(*) FROM users WHERE username = ?', {username})
    if result > 0 then
        return false, "Username already exists"
    end
    return true
end)

-- Usage in validation
local valid, error = exports.community_bridge:ValidateServerInput(username, {
    required = true,
    custom = "uniqueUsername"
})
```

## Input Form Templates

### `exports.community_bridge:RequestPasswordChange(playerId, callback)`

Requests password change form from player.

**Parameters:**
- `playerId` (number): Player's server ID
- `callback` (function): Callback with password data

**Example:**
```lua
RegisterNetEvent('account:requestPasswordChange', function()
    local playerId = source
    
    exports.community_bridge:RequestPasswordChange(playerId, function(passwordData)
        if passwordData then
            -- Verify current password
            local currentHash = GetPlayerPassword(playerId)
            if VerifyPassword(passwordData.current, currentHash) then
                -- Update password
                local newHash = HashPassword(passwordData.new)
                SetPlayerPassword(playerId, newHash)
                exports.community_bridge:SendNotify(playerId, "Password updated successfully", "success")
            else
                exports.community_bridge:SendNotify(playerId, "Current password is incorrect", "error")
            end
        end
    end)
end)
```

### `exports.community_bridge:RequestContactForm(playerId, currentData, callback)`

Requests contact information form.

**Parameters:**
- `playerId` (number): Player's server ID
- `currentData` (table, optional): Current contact data
- `callback` (function): Callback with updated contact data

**Example:**
```lua
RegisterNetEvent('profile:editContact', function()
    local playerId = source
    local currentContact = GetPlayerContact(playerId)
    
    exports.community_bridge:RequestContactForm(playerId, currentContact, function(newContact)
        if newContact then
            UpdatePlayerContact(playerId, newContact)
            exports.community_bridge:SendNotify(playerId, "Contact information updated", "success")
        end
    end)
end)
```

## Admin Input Functions

### `exports.community_bridge:RequestAdminInput(playerId, config, callback)`

Special admin input with elevated permissions and logging.

**Parameters:**
- `playerId` (number): Admin player's server ID
- `config` (table): Input configuration
- `callback` (function): Callback function

**Example:**
```lua
-- Admin command for setting player money
RegisterCommand('setmoney', function(source, args)
    local playerId = source
    
    if not exports.community_bridge:HasPermission(playerId, 'admin.money') then
        exports.community_bridge:SendNotify(playerId, "Access denied", "error")
        return
    end
    
    exports.community_bridge:RequestAdminInput(playerId, {
        title = "Set Player Money",
        subtitle = "Admin Command",
        fields = {
            {
                name = "targetId",
                label = "Target Player ID",
                type = "number",
                required = true,
                min = 1
            },
            {
                name = "amount",
                label = "Amount",
                type = "number",
                required = true,
                min = 0
            },
            {
                name = "account",
                label = "Account Type",
                type = "select",
                required = true,
                options = {
                    {value = "cash", label = "Cash"},
                    {value = "bank", label = "Bank"}
                }
            },
            {
                name = "reason",
                label = "Reason",
                type = "textarea",
                required = true,
                maxLength = 200
            }
        }
    }, function(adminData)
        if adminData then
            -- Validate target player exists
            if GetPlayerName(adminData.targetId) then
                -- Set money
                exports.community_bridge:SetMoney(adminData.targetId, adminData.account, adminData.amount)
                
                -- Log admin action
                LogAdminAction(playerId, 'setmoney', {
                    target = adminData.targetId,
                    amount = adminData.amount,
                    account = adminData.account,
                    reason = adminData.reason
                })
                
                exports.community_bridge:SendNotify(playerId, "Money set successfully", "success")
                exports.community_bridge:SendNotify(adminData.targetId, "Your " .. adminData.account .. " has been updated", "info")
            else
                exports.community_bridge:SendNotify(playerId, "Invalid player ID", "error")
            end
        end
    end)
end)
```

## Input Session Management

### `exports.community_bridge:CreateInputSession(playerId, sessionData)`

Creates a persistent input session for multi-step processes.

**Parameters:**
- `playerId` (number): Player's server ID
- `sessionData` (table): Session configuration

**Returns:**
- `string`: Session ID

**Example:**
```lua
-- Multi-step vehicle purchase process
RegisterNetEvent('dealership:startPurchase', function(vehicleModel)
    local playerId = source
    
    -- Create input session
    local sessionId = exports.community_bridge:CreateInputSession(playerId, {
        type = "vehicle_purchase",
        data = {model = vehicleModel},
        steps = {"financing", "customization", "confirmation"},
        timeout = 300000 -- 5 minutes
    })
    
    -- Start first step
    StartFinancingStep(playerId, sessionId, vehicleModel)
end)

function StartFinancingStep(playerId, sessionId, vehicleModel)
    local vehiclePrice = GetVehiclePrice(vehicleModel)
    
    exports.community_bridge:RequestInputForm(playerId, {
        title = "Vehicle Financing",
        subtitle = "Choose payment method",
        fields = {
            {
                name = "paymentType",
                label = "Payment Method",
                type = "select",
                required = true,
                options = {
                    {value = "cash", label = "Cash Payment"},
                    {value = "finance", label = "Financing"}
                }
            },
            {
                name = "downPayment",
                label = "Down Payment",
                type = "number",
                min = vehiclePrice * 0.1,
                max = vehiclePrice,
                default = vehiclePrice * 0.2,
                showIf = {paymentType = "finance"}
            }
        }
    }, function(financingData)
        if financingData then
            -- Update session and continue to next step
            exports.community_bridge:UpdateInputSession(sessionId, {
                financing = financingData
            })
            StartCustomizationStep(playerId, sessionId, vehicleModel)
        else
            exports.community_bridge:CancelInputSession(sessionId)
        end
    end)
end
```

### `exports.community_bridge:UpdateInputSession(sessionId, data)`

Updates session data.

**Parameters:**
- `sessionId` (string): Session identifier
- `data` (table): Data to add to session

### `exports.community_bridge:GetInputSession(sessionId)`

Retrieves session data.

**Parameters:**
- `sessionId` (string): Session identifier

**Returns:**
- `table|nil`: Session data or nil if not found

### `exports.community_bridge:CancelInputSession(sessionId)`

Cancels an input session.

**Parameters:**
- `sessionId` (string): Session identifier

## Event Handlers

### Server Events

```lua
-- Input received from client
RegisterNetEvent('community_bridge:inputReceived', function(inputId, data)
    local playerId = source
    HandleInputResponse(playerId, inputId, data)
end)

-- Input cancelled by client
RegisterNetEvent('community_bridge:inputCancelled', function(inputId)
    local playerId = source
    print(GetPlayerName(playerId), "cancelled input:", inputId)
end)

-- Input validation failed
RegisterNetEvent('community_bridge:inputValidationFailed', function(inputId, errors)
    local playerId = source
    LogValidationFailure(playerId, inputId, errors)
end)
```

## Utility Functions

### `exports.community_bridge:GetActiveInputs(playerId)`

Gets list of active inputs for a player.

**Parameters:**
- `playerId` (number): Player's server ID

**Returns:**
- `table`: Array of active input IDs

### `exports.community_bridge:CancelPlayerInputs(playerId)`

Cancels all active inputs for a player.

**Parameters:**
- `playerId` (number): Player's server ID

**Example:**
```lua
-- Cancel inputs when player disconnects
AddEventHandler('playerDropped', function()
    local playerId = source
    exports.community_bridge:CancelPlayerInputs(playerId)
end)
```

## Best Practices

### Security Considerations

1. **Server validation** - Always validate on server side
2. **Permission checks** - Verify player permissions
3. **Rate limiting** - Prevent input spam
4. **Data sanitization** - Clean input data
5. **Audit logging** - Log important input actions

### Performance Guidelines

1. **Session cleanup** - Clean up expired sessions
2. **Timeout handling** - Set appropriate timeouts
3. **Efficient validation** - Optimize validation rules
4. **Batch processing** - Process multiple inputs efficiently

### Error Handling

```lua
-- Safe input request with error handling
local function SafeRequestInput(playerId, config, callback)
    local success, result = pcall(function()
        return exports.community_bridge:RequestInput(playerId, config, callback)
    end)
    
    if not success then
        print("Input request error:", result)
        exports.community_bridge:SendNotify(playerId, "Input system error", "error")
        return false
    end
    
    return result
end
```
