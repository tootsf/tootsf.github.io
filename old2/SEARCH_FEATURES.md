# Enhanced Search Features Documentation

## Overview
The documentation site now includes powerful search capabilities that can find content across all pages, including deep searching within JSON API documentation files.

## Search Capabilities

### 1. Basic Page Search
- **Page Titles**: Search for page names like "Getting Started", "Banking", etc.
- **Page Paths**: Search within file paths and structure

### 2. JSON API Function Search
The search engine can find functions within JSON documentation files:

#### Function Names
Search for specific function names like:
- `GetBalance` - finds the banking function
- `WithdrawMoney` - finds the withdrawal function
- `GetItemCount` - finds inventory functions
- `AddItem` - finds item management functions

#### Function Descriptions
Search within function descriptions:
- "bank balance" - finds functions related to banking
- "withdraw money" - finds withdrawal-related functions
- "inventory" - finds all inventory-related functions

#### Parameters
Search for function parameters:
- "amount" - finds functions that take amount parameters
- "playerId" - finds functions that work with player IDs

#### Syntax Patterns
Search for syntax patterns:
- "Bridge.Banking" - finds all banking functions
- "GetVehicle" - finds vehicle-related functions

### 3. Markdown Content Search
- Searches within markdown file content
- Finds matches in headings, paragraphs, and code blocks

## Search Result Types

The search results show different types of matches with icons:

- 📋 **Function**: Direct function name match
- 📄 **Description**: Match found in function description
- 🔧 **Parameter**: Match found in function parameters
- ⚡ **Syntax**: Match found in function syntax
- 📦 **Module**: Match found in module/page name
- 📖 **Module Description**: Match found in module description
- 📝 **Content**: Match found in markdown content

## Search Scoring

Results are ranked by relevance:
1. **Exact matches** (score: 100) - exact title matches
2. **Function names** (score: 80 exact, 30 partial)
3. **Title matches** (score: 50)
4. **Module names** (score: 25)
5. **Descriptions** (score: 20)
6. **Parameters** (score: 15)
7. **Content matches** (score: 15)
8. **Syntax matches** (score: 10)
9. **Path matches** (score: 10)

## Keyboard Navigation

### Search Input
- **Type**: Start typing to search (minimum 2 characters)
- **↓ Arrow**: Navigate down through results
- **↑ Arrow**: Navigate up through results
- **Enter**: Select highlighted result
- **Escape**: Close search results

### Result Navigation
- **Click**: Select any result
- **Auto-scroll**: Automatically scrolls to function when found
- **Highlighting**: Selected functions are temporarily highlighted

## Usage Examples

### Finding Banking Functions
```
Search: "GetBalance"
Result: Shows Banking page with GetBalance function highlighted
```

### Finding Inventory Operations
```
Search: "inventory"
Results: Shows all inventory-related pages and functions
```

### Finding Functions by Parameter
```
Search: "amount"
Results: Shows all functions that take 'amount' as a parameter
```

### Finding by Description
```
Search: "withdraw money"
Results: Shows functions related to money withdrawal
```

## Technical Implementation

### Search Index
The search builds a comprehensive index including:
- Page metadata (title, path, type)
- JSON function data (names, descriptions, parameters, syntax)
- Markdown content excerpts

### Performance
- **Asynchronous**: Search runs without blocking UI
- **Cached**: JSON content is fetched once per search session
- **Throttled**: Results update as you type
- **Limited**: Shows top 10 most relevant results

### Error Handling
- Graceful fallback if JSON files can't be loaded
- Console warnings for debugging
- Non-blocking errors don't affect other functionality

## GitHub Pages Compatibility

The search functionality is fully compatible with GitHub Pages:
- No server-side dependencies
- Pure client-side JavaScript
- Relative paths for all resources
- Works with Jekyll processing
- Automatic structure updates via GitHub Actions

## Customization

### Adding New Search Types
To add support for new content types, modify the `performAdvancedSearch` function in `assets/js/app.js`.

### Adjusting Search Scoring
Modify the score values in the search algorithm to change result ranking.

### Styling Search Results
Customize the appearance by editing the `.search-result` CSS classes in `assets/css/styles.css`.