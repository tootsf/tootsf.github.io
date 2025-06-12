# Community Bridge Documentation Site

This repository contains the documentation site for Community Bridge, a versatile API layer for FiveM scripts that provides a unified interface for commonly used functions across different resources and frameworks.

## Documentation Structure

The documentation uses a unified approach with dynamic content loading:

1. All module documentation is stored in JSON files in `/assets/data/`
2. A single `module.html` template loads content based on URL parameters (e.g., `module.html?module=target`)
3. The main `index.html` file provides an overview and links to all modules

## Features

- **Auto-Discovery**: Modules are automatically detected from JSON files in `/assets/data/`
- **Dynamic Content Loading**: Content is loaded from JSON files based on URL parameters
- **Responsive Design**: Works on mobile and desktop devices with a collapsible sidebar
- **Table of Contents**: Automatically generated for each page
- **Syntax Highlighting**: Code blocks are highlighted for better readability
- **Dark Mode Support**: Automatically switches based on system preferences
- **Print-Friendly**: Optimized for printing documentation
- **Live Search**: Search across all modules and functions

## Auto-Discovery System

The documentation system automatically discovers modules by scanning for JSON files in the `/assets/data/` directory. When you add a new JSON file, it will automatically appear in the navigation and be searchable.

### Adding a New Module

#### Method 1: Using the utility script
```bash
# Create a new module using the utility
python tools/create-module.py banking Banking 🏦 "Banking and economy functions"

# Or use the batch file on Windows
create-module.bat banking Banking 🏦 "Banking and economy functions"
```

#### Method 2: Manual creation
1. Create a new JSON file in `/assets/data/` (e.g., `banking.json`)
2. Follow the JSON structure shown below
3. The module will automatically appear in navigation and search

### JSON Structure

Each module JSON file should have the following structure:

## Setting Up

1. Clone this repository
2. Choose one of the two documentation approaches
3. Create the necessary directory structure
4. Add your documentation content

### Recommended Directory Structure for JSON Approach

```
community-bridge-docs/
├── assets/
│   ├── css/
│   │   └── styles.css
│   ├── data/
│   │   ├── target.json
│   │   ├── vehiclekey.json
│   │   └── ... (other module JSON files)
│   └── js/
│       ├── json-doc-renderer.js
│       ├── navigation.js
│       └── toc.js
├── pages/
│   ├── getting-started.html
│   ├── contributing.html
│   └── modules/
│       ├── target/
│       │   └── index.html
│       ├── vehiclekey/
│       │   └── index.html
│       └── ... (other module pages)
└── index.html
```

### Required Libraries

- highlight.js - For code syntax highlighting
- No additional libraries needed for the JSON approach
- marked.js - Only needed if using the Markdown parser approach

## Adding a New Module

1. Create a JSON file for your module in `/assets/data/`
2. Create a module directory in `/pages/modules/[module-name]/`
3. Copy `module-template.html` to `/pages/modules/[module-name]/index.html`
4. The navigation and content will be generated automatically

## Converting from the Old Documentation

Use the provided `md2json.js` tool to convert the old Markdown documentation to the JSON format:

```bash
node tools/md2json.js c:/path/to/old/docs/modules/target
```

Then copy the output JSON file to the `/assets/data/` directory.