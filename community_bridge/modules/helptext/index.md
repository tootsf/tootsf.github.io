---
layout: default
title: "❓ Helptext"
parent: Modules
grand_parent: Community Bridge
nav_order: 8
has_children: true
permalink: /community_bridge/modules/helptext/
---

# Helptext Module
{: .no_toc }

The helptext module provides contextual help and instruction display functionality for players.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Available Functions

### Client-side
- [`ShowHelpText(message, position)`](client/ShowHelpText.md) - Display help text on screen
- [`HideHelpText()`](client/HideHelpText.md) - Hide currently displayed help text

### Server-side
- [`ShowHelpText(src, message, position)`](server/ShowHelpText.md) - Show help text to specific player
- [`HideHelpText(src)`](server/HideHelpText.md) - Hide help text for specific player

---

## 📚 Supported Systems

This module integrates with various helptext/textui systems:
- Default framework implementation
- ox_lib textui
- okokTextUI
- cd_drawtextui
- jg-textui
- lab-HintUI

The system automatically detects and uses the appropriate textui resource based on what's available on your server.
