# SQL 🗄️

<!--META
nav: true
toc: true
description: The SQL library provides simplified database operations with automatic table creation, upsert functionality, and common CRUD operations. It works with oxmysql and handles common database patterns used in FiveM development.
-->

The SQL library provides simplified database operations with automatic table creation, upsert functionality, and common CRUD operations. It works with oxmysql and handles common database patterns used in FiveM development.

## Overview

The SQL provides functionality for FiveM resources.

## Server Functions

### Create

<!--TOC: Create-->

**Context:** 🖲️ Server

Creates a table with the specified columns if it doesn't already exist. Uses CREATE TABLE IF NOT EXISTS syntax.

**Syntax:** `SQL.Create(tableName, columns)`

**Parameters:**
- `tableName` (string) - Name of the table to create
- `columns` (table) - Array of column definitions with 'name' and 'type' properties

**Returns:** None

**Example:**
```lua
local columns = {
    { name = "id", type = "INT AUTO_INCREMENT PRIMARY KEY" },
    { name = "identifier", type = "VARCHAR(50) UNIQUE" },
    { name = "name", type = "VARCHAR(100)" },
    { name = "money", type = "INT DEFAULT 0" }
}

SQL.Create("players", columns)
print("Players table created successfully")
```

### InsertOrUpdate

<!--TOC: InsertOrUpdate-->

**Context:** 🖲️ Server

Inserts a new record or updates an existing one if a duplicate key is found. Uses INSERT ... ON DUPLICATE KEY UPDATE syntax.

**Syntax:** `SQL.InsertOrUpdate(tableName, data)`

**Parameters:**
- `tableName` (string) - Name of the table to insert/update
- `data` (table) - Key-value pairs representing column names and values

**Returns:** None

**Example:**
```lua
local playerData = {
    identifier = "steam:110000103fa6fc1",
    name = "John Doe",
    money = 5000
}

SQL.InsertOrUpdate("players", playerData)
print("Player data saved successfully")

-- Update existing player
playerData.money = 7500
SQL.InsertOrUpdate("players", playerData)
print("Player money updated")
```

### Get

<!--TOC: Get-->

**Context:** 🖲️ Server

Retrieves records from a table based on a WHERE condition.

**Syntax:** `SQL.Get(tableName, where)`

**Parameters:**
- `tableName` (string) - Name of the table to query
- `where` (string) - WHERE clause condition (without the WHERE keyword)

**Returns:**
- (table) - Array of records matching the condition

**Example:**
```lua
-- Get specific player
local result = SQL.Get("players", "identifier = 'steam:110000103fa6fc1'")
if #result > 0 then
    local player = result[1]
    print("Player name: " .. player.name)
    print("Player money: " .. player.money)
end

-- Get players with money > 1000
local richPlayers = SQL.Get("players", "money > 1000")
print("Found " .. #richPlayers .. " rich players")
```

### GetAll

<!--TOC: GetAll-->

**Context:** 🖲️ Server

Retrieves all records from a table without any filtering.

**Syntax:** `SQL.GetAll(tableName)`

**Parameters:**
- `tableName` (string) - Name of the table to query

**Returns:**
- (table) - Array of all records in the table

**Example:**
```lua
local allPlayers = SQL.GetAll("players")
print("Total players in database: " .. #allPlayers)

for i, player in ipairs(allPlayers) do
    print(string.format("%d. %s - $%d", i, player.name, player.money))
end
```

### Delete

<!--TOC: Delete-->

**Context:** 🖲️ Server

Deletes records from a table based on a WHERE condition.

**Syntax:** `SQL.Delete(tableName, where)`

**Parameters:**
- `tableName` (string) - Name of the table to delete from
- `where` (string) - WHERE clause condition (without the WHERE keyword)

**Returns:** None

**Example:**
```lua
-- Delete specific player
SQL.Delete("players", "identifier = 'steam:110000103fa6fc1'")
print("Player deleted from database")

-- Delete inactive players (example condition)
SQL.Delete("players", "last_login < DATE_SUB(NOW(), INTERVAL 30 DAY)")
print("Inactive players cleaned up")
```

