---
layout: default
title: Progressbar
parent: Modules
grand_parent: Community Bridge
nav_order: 17
has_children: true
permalink: /community_bridge/modules/progressbar/
---

# Progressbar Module
{: .no_toc }

Complete progressbar system for displaying progress indicators, loading bars, and timed actions.
{: .fs-6 .fw-300 }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Overview

The Progressbar module provides a comprehensive system for creating and managing progress indicators in FiveM. It supports various styles, animations, and interactive features to enhance user experience during timed operations.

### Key Features

- **Multiple Progress Types**: Linear bars, circular progress, and custom shapes
- **Interactive Progress**: Cancelable actions with key bindings
- **Animation System**: Smooth transitions and visual effects
- **Customizable Styling**: Colors, sizes, positions, and themes
- **Sound Integration**: Audio feedback for progress events
- **Multi-Progress**: Multiple simultaneous progress bars
- **Skill Checks**: Integration with mini-games and skill tests

---

## Progress Types

### Linear Progress
Traditional horizontal or vertical progress bars with customizable styling.

### Circular Progress
Radial progress indicators with smooth animations and percentage display.

### Custom Progress
Unique progress shapes and designs with flexible configuration options.

### Interactive Progress
Progress bars that can be canceled or modified by player input.

---

## Core Components

### Progress Display
- Visual progress representation
- Percentage and time remaining display
- Custom labels and descriptions
- Animation effects and transitions

### User Interaction
- Cancelable progress actions
- Key binding integration
- Mouse interaction support
- Progress modification controls

### Event System
- Progress start/complete events
- Cancellation handling
- Error and failure events
- Custom callback integration

---

## Integration Features

### Framework Compatibility
Works seamlessly with all supported frameworks for consistent user experience.

### Notification System
Integrates with the notification module for progress-related messages.

### Sound System
Audio feedback for progress events and user interactions.

### Menu Integration
Progress bars can be embedded in menus and UI components.

---

## Common Use Cases

### Loading Operations
- Resource loading indicators
- Data fetching progress
- File transfer status
- Installation progress

### Timed Actions
- Crafting and cooking timers
- Skill-based activities
- Mini-game progress
- Action cooldowns

### Interactive Tasks
- Lock picking progress
- Hacking sequences
- Repair operations
- Collection activities

---

## Quick Start

```lua
-- Basic progress bar
Bridge.Progressbar.StartProgress({
    name = 'loading_data',
    duration = 5000,
    label = 'Loading player data...',
    useWhileDead = false,
    canCancel = true,
    disableControls = {
        disableMovement = true,
        disableCarMovement = true,
        disableMouse = false,
        disableCombat = true
    }
}, function(cancelled)
    if not cancelled then
        print('Data loaded successfully!')
    else
        print('Loading cancelled')
    end
end)
```

---

## Advanced Features

### Custom Styling
Create unique progress bar designs with custom CSS and animations.

### Multi-Progress
Display multiple progress bars simultaneously for complex operations.

### Skill Integration
Combine progress bars with skill checks and mini-games.

### Performance Optimization
Efficient rendering and resource management for smooth performance.

---

## Navigation

- [Client Functions](./client) - Client-side progress bar management
- [Server Functions](./server) - Server-side progress coordination
- [Shared Functions](./shared) - Shared utilities and configurations

Explore each section to learn about specific functionalities and implementation details.
