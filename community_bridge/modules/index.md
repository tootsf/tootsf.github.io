---
layout: default
title: Modules
parent: Community Bridge
nav_order: 2
has_children: true
permalink: /community_bridge/modules/
---

# Modules
{: .no_toc }

Community Bridge is organized into specialized modules, each handling specific aspects of FiveM server functionality. Below you'll find all available modules categorized by their primary function.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Core Framework

These modules provide essential framework integration and player management functionality.

- **[Framework](framework/)** - Player data, money, jobs, and core framework features
- **[Management](management/)** - Administrative functions and server management tools

## User Interface

Modules for creating interactive user experiences and notifications.

- **[Notify](notify/)** - Notification systems and alerts
- **[Menu](menu/)** - Interactive menu creation and management
- **[Input](input/)** - User input collection and validation
- **[Dialogue](dialogue/)** - Conversation and dialogue systems
- **[Help Text](helptext/)** - Contextual help and instruction display
- **[Progress Bar](progressbar/)** - Visual progress indicators

## Game Systems

Specialized modules for specific game mechanics and systems.

- **[Inventory](inventory/)** - Item management and inventory operations
- **[Vehicle](vehicle/)** - Vehicle management, ownership, and operations
- **[Target](target/)** - Targeting system integration
- **[Shops](shops/)** - Commerce and trading systems
- **[Housing](housing/)** - Property and housing management
- **[Vehicle Key](vehiclekey/)** - Vehicle access and key management
- **[Door Lock](doorlock/)** - Building and area access control
- **[Fuel](fuel/)** - Vehicle fuel management
- **[Clothing](clothing/)** - Character appearance and clothing systems

## Utility & Support

Helper modules for common development tasks and system integration.

- **[Callback](callback/)** - Client-server communication and promise-based callbacks
- **[Blip](blip/)** - Map marker and navigation system
- **[Locales](locales/)** - Internationalization and language support
- **[Math](math/)** - Mathematical operations and calculations
- **[Phone](phone/)** - Communication and phone system integration
- **[Version](version/)** - Version checking and update management
- **[Accessibility](accessibility/)** - Accessibility features and compliance

## Character & Progression
{: .label .label-blue }

Advanced character development and skill systems.

- **[Skills](skills/)** - Character progression and skill systems
  - [Client Functions](skills/client.md) - Skill interfaces and progression tracking
  - [Server Functions](skills/server.md) - XP management and skill validation  
  - [Shared Functions](skills/shared.md) - Skill calculations and utilities

## Environmental Systems
{: .label .label-purple }

Weather and environmental control systems.

- **[Weather](weather/)** - Dynamic weather and environmental effects
  - [Client Functions](weather/client.md) - Weather effects and synchronization
  - [Server Functions](weather/server.md) - Weather management and scheduling
  - [Shared Functions](weather/shared.md) - Weather utilities and configurations

## Emergency Services
{: .label .label-red }

Emergency dispatch and communication systems.

- **[Dispatch](dispatch/)** - Emergency services dispatch and coordination
  - [Client Functions](dispatch/client.md) - Dispatch interface and call management
  - [Server Functions](dispatch/server.md) - Call coordination and automation
  - [Shared Functions](dispatch/shared.md) - Dispatch utilities and configurations

---

## Module Structure

Each module typically contains:

- **Client Functions** - Functions that run on the client-side
- **Server Functions** - Functions that run on the server-side  
- **Shared Functions** - Functions available on both client and server
- **Events** - Custom events triggered by the module
- **Configuration** - Module-specific configuration options
- **Examples** - Practical usage examples and best practices
