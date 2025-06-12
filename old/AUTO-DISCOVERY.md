# Auto-Discovery System Documentation

## Overview

The Community Bridge documentation site now features an **automatic module discovery system** that eliminates the need to manually update navigation or module lists when adding new modules.

## How It Works

### 1. **Auto-Discovery Engine** (`auto-module-discovery.js`)
- Scans for potential module JSON files in `/assets/data/`
- Tries common module names (inventory, banking, etc.)
- Automatically extracts module metadata (name, icon, description)
- Builds a dynamic module list

### 2. **Integration Points**
- **Navigation** (`navigation.js`): Builds sidebar navigation from discovered modules
- **Module Loader** (`module-loader.js`): Loads individual module documentation
- **Search** (`search.js`): Indexes all discovered modules for search functionality

### 3. **Fallback System**
If auto-discovery fails, the system falls back to a static list of known modules to ensure the site always works.

## Adding a New Module

### Method 1: Use the Creation Utility
```bash
# Create using Python script
python tools/create-module.py banking Banking 🏦 "Banking and economy functions"

# Or use the Windows batch file
create-module.bat banking Banking 🏦 "Banking and economy functions"
```

### Method 2: Manual Creation
1. Create a JSON file in `/assets/data/` (e.g., `banking.json`)
2. Follow the required JSON structure
3. Refresh the documentation site - your module appears automatically!

## Required JSON Structure

```json
{
  "name": "Banking",
  "icon": "🏦",
  "description": "Banking and economy functions",
  "clientFunctions": [
    {
      "name": "FunctionName",
      "description": "What the function does",
      "syntax": "Bridge.Banking.FunctionName(param1)",
      "parameters": [
        {
          "name": "param1",
          "type": "string",
          "description": "Parameter description"
        }
      ],
      "returns": [
        {
          "type": "boolean",
          "description": "Return value description"
        }
      ],
      "example": "local result = Bridge.Banking.FunctionName('test')"
    }
  ],
  "serverFunctions": [
    // Same structure as clientFunctions
  ]
}
```

## Benefits

✅ **Zero Configuration**: No need to edit navigation or loader files
✅ **Automatic Updates**: New modules appear immediately
✅ **Consistent Structure**: Enforced JSON schema
✅ **Search Integration**: New modules automatically searchable
✅ **Error Resilient**: Graceful fallbacks if files are missing

## Technical Details

### Module Detection
The system attempts to load these common module names:
- inventory, management, notify, progressbar
- shops, skills, target, vehiclekey
- banking, jobs, housing, vehicles, weapons
- crafting, gangs, police, medical, racing

### Performance
- Modules are discovered once per page load
- Failed requests are handled silently
- Results are cached during the session

### Browser Console Logs
You can see the auto-discovery in action by checking the browser console:
```
📦 Discovered module: Banking
📦 Discovered module: Target
🎯 Auto-discovery complete: Found 10 modules
🧭 Navigation: Using 10 auto-discovered modules
```

## Troubleshooting

**Module not appearing?**
1. Check the JSON file is valid (use a JSON validator)
2. Ensure the file is in `/assets/data/`
3. Check browser console for errors
4. Verify the JSON has required fields: `name`, `icon`, `description`

**Search not working for new module?**
1. The search indexes modules on page load
2. Refresh the page after adding a new module
3. Check that clientFunctions/serverFunctions arrays exist
