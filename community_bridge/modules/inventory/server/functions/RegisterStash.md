---
layout: default
title: "RegisterStash"
parent: Inventory Functions
grand_parent: Server
great_grand_parent: 🎒 Inventory
nav_order: 1
---

# RegisterStash
## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Registers a stash with the inventory system. Must be called before using OpenStash.

## Syntax

```lua
Inventory.RegisterStash(id, label, slots, weight, owner, groups, coords)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | number\|string | The unique stash identifier |
| `label` | string | The display name of the stash |
| `slots` | number | Number of inventory slots |
| `weight` | number | Maximum weight capacity |
| `owner` | string | The owner identifier (optional) |
| `groups` | table | Allowed groups/jobs (optional) |
| `coords` | table | Stash coordinates (optional) |

## Returns

| Type | Description |
|------|-------------|
| boolean | True if successful, false otherwise |

## Example

```lua
-- Register a personal stash
local success = Inventory.RegisterStash("player_stash_123", "Personal Stash", 50, 100000, "ABC123")

-- Register a job stash with group restrictions
local jobStash = Inventory.RegisterStash(
    "police_evidence", 
    "Evidence Locker", 
    100, 
    500000, 
    nil, 
    {"police", "sheriff"}
)
```

---

## Notes

- With ox_inventory: Creates a persistent stash that can be accessed across server restarts
- With default inventory: Returns false and an error message as stashes are not supported
- If a stash with the same ID already exists, returns true without creating a duplicate

---