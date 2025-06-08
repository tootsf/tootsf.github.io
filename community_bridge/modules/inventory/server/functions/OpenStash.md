---
layout: default
title: "OpenStash"
parent: Functions
grand_parent: Server
great_grand_parent: 🎒 Inventory
nav_order: 1
---

# OpenStash
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Description

Opens the specified stash for the player. Implementation varies depending on the inventory system being used.

## Syntax

```lua
Inventory.OpenStash(src, id, label, slots, weight, owner, groups, coords)
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `src` | number | The source (player server id) |
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
| nil | This function does not return a value |

## Example

```lua
-- Open a personal stash for player
Inventory.OpenStash(1, "player_stash_123", "Personal Stash", 50, 100000)

-- Open a job-specific stash
Inventory.OpenStash(1, "police_evidence", "Evidence Locker", 100, 500000, nil, {"police"})
```

---

## Notes

- With ox_inventory: Stash must be registered first using RegisterStash
- With default inventory: Returns an error message as stashes are not supported
- The stash ID should be unique across the server

---