---
layout: default
title: Dialogue
parent: Modules
grand_parent: Community Bridge
nav_order: 6
has_children: true
permalink: /community_bridge/modules/dialogue/
---

# Dialogue Module
{: .no_toc }

The dialogue module provides an interactive dialogue system with camera management and NUI interface.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Available Functions

### Client-side
- [`Open(name, dialogue, characterOptions, dialogueOptions, onSelected)`](client.md#open) - Open a dialogue with options
- [`Close(name)`](client.md#close) - Close an active dialogue

### Server-side
No server-side functions available.

---

## 📚 Features

- Interactive dialogue system with multiple choice options
- Automatic camera positioning based on NPC/entity
- Smooth camera transitions between dialogues
- Promise-based dialogue completion
- Configurable character positioning and camera angles

---

## 📚 Commands

- `/dialogue` - Debug command to test dialogue system (only available in debug mode)

---

## 📚 Note

This module is marked as incomplete in the source code. It provides a functional dialogue system but may be missing some advanced features.
