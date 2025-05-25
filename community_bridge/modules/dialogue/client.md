# Dialogue Client

The dialogue client module provides an interactive dialogue system with automatic camera management and NUI interface.

## Functions

### Open(name, dialogue, characterOptions, dialogueOptions, onSelected)

Opens a dialogue with the player, showing text and interactive options.

**Parameters:**
- `name` (string): Unique identifier for the dialogue
- `dialogue` (string): The dialogue text to display
- `characterOptions` (number|table): Entity ID or table with camera configuration
- `dialogueOptions` (table): Array of dialogue options for the player
- `onSelected` (function): Optional callback function when option is selected

**Returns:**
- `string`: The ID of the selected option (when used with Citizen.Await)

**Character Options (when table):**
```lua
{
    entity = number,           -- Entity ID to focus camera on
    offset = vector3(x,y,z),   -- Camera position offset (default: vector3(0,0,0))
    rotationOffset = vector3(x,y,z) -- Camera rotation offset (default: vector3(0,0,0))
}
```

**Dialogue Options Format:**
```lua
{
    {
        id = "option1",        -- Unique identifier for this option
        label = "Option Text"  -- Text displayed to the player
    },
    -- ... more options
}
```

**Example:**
```lua
-- Simple dialogue with entity ID
local selectedOption = Dialogue.Open(
    "shopkeeper",
    "Welcome to my shop! What can I do for you?",
    npcEntity,
    {
        {id = "buy", label = "I want to buy something"},
        {id = "sell", label = "I want to sell items"},
        {id = "leave", label = "Nothing, goodbye"}
    }
)

-- Advanced dialogue with camera configuration
local characterData = {
    entity = npcEntity,
    offset = vector3(0, 0, 0.2),
    rotationOffset = vector3(-5, 0, 15)
}

Dialogue.Open(
    "merchant",
    "Ah, a customer! I have rare items for sale.",
    characterData,
    {
        {id = "browse", label = "Show me what you have"},
        {id = "info", label = "Tell me about your wares"},
        {id = "exit", label = "Maybe later"}
    },
    function(selectedId)
        if selectedId == "browse" then
            -- Open shop menu
            print("Opening shop...")
        elseif selectedId == "info" then
            -- Show more dialogue
            print("Merchant tells you about items...")
        end
    end
)
```

### Close(name)

Closes an active dialogue and manages camera cleanup.

**Parameters:**
- `name` (string): The name/identifier of the dialogue to close

**Example:**
```lua
Dialogue.Close("shopkeeper")
```

## Camera Management

The dialogue system automatically manages camera positioning:

- **Automatic Positioning**: Camera positions itself in front of the specified entity
- **Smooth Transitions**: When switching between dialogues, cameras transition smoothly
- **Smart Cleanup**: Cameras are only destroyed when no new dialogue opens immediately
- **Heading-Based Offset**: Camera position calculated based on entity's heading

## NUI Callbacks

The module automatically handles NUI callbacks for option selection:

```lua
-- Automatically registered callback
RegisterNuiCallback("dialogue:SelectOption", function(data)
    -- data.name - dialogue name
    -- data.id - selected option id
end)
```

## Promise Support

Dialogues can be used with promises for sequential dialogue chains:

```lua
CreateThread(function()
    local choice1 = Dialogue.Open("npc1", "Hello there!", npcEntity, {
        {id = "greet", label = "Hello!"},
        {id = "ignore", label = "..."}
    })
    
    if choice1 == "greet" then
        local choice2 = Dialogue.Open("npc1", "Nice to meet you!", npcEntity, {
            {id = "likewise", label = "Likewise!"},
            {id = "bye", label = "Goodbye"}
        })
        
        if choice2 == "likewise" then
            print("Friendship established!")
        end
    end
end)
```

## Debug Command

When debug mode is enabled (`BridgeSharedConfig.DebugLevel >= 1`):

### /dialogue

Creates a test NPC and opens a sample dialogue to test the system.

```lua
-- Creates test NPC and shows example dialogue
-- Only available when debug level >= 1
```

## Camera Controls

- **Automatic Focus**: Camera automatically focuses on the specified entity
- **Offset Support**: Customize camera position with offset vectors
- **Rotation Control**: Adjust camera angle with rotation offsets
- **Transition Management**: Smooth transitions between different dialogues

## Best Practices

1. **Unique Names**: Always use unique dialogue names to avoid conflicts
2. **Entity Validation**: Ensure entities exist before creating dialogues
3. **Option IDs**: Use descriptive option IDs for easier management
4. **Cleanup**: The system handles cleanup automatically, but manual Close() can be used if needed
5. **Threading**: Use CreateThread for sequential dialogue chains

## Note

This module is marked as incomplete in the source code. The core functionality works but some advanced features may be missing or subject to change.
