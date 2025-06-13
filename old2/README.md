# Simple Documentation Site

A clean, modern documentation site similar to "Just the Docs" that automatically generates navigation from your folder structure.

## Features

- 📁 **Folder-based Navigation**: Create pages by adding folders to `assets/pages/`
- 📝 **Markdown Support**: Use `index.md` files for markdown content
- 🔧 **JSON Functions**: Define API functions in JSON format
- 📑 **Custom TOC**: Use `toc.json` files for custom table of contents
- 🔍 **Search**: Full-text search across all documentation
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive**: Works on desktop and mobile devices

## Quick Start

### 1. Adding a New Page

Create a new folder in `assets/pages/` and add an `index.md` file:

```
assets/pages/
  My New Section/
    index.md
```

The folder name becomes the navigation title.

### 2. Adding Subsections

Create subfolders with their own content:

```
assets/pages/
  My New Section/
    index.md
    Subsection 1/
      index.md
    Subsection 2/
      functions.json
      toc.json
```

### 3. JSON Function Documentation

Create JSON files to document API functions:

```json
{
  "name": "My Module",
  "icon": "🔧",
  "description": "Description of your module",
  "clientFunctions": [
    {
      "name": "MyFunction",
      "description": "What this function does",
      "syntax": "MyModule.MyFunction(param1, param2)",
      "parameters": [
        {
          "name": "param1",
          "type": "string",
          "description": "First parameter"
        }
      ],
      "returns": [
        {
          "type": "boolean",
          "description": "Success status"
        }
      ],
      "example": "local result = MyModule.MyFunction('test', 123)"
    }
  ],
  "serverFunctions": []
}
```

### 4. Custom Table of Contents

Create a `toc.json` file for custom navigation:

```json
{
  "title": "My Module",
  "items": [
    {
      "title": "Overview",
      "anchor": "#overview"
    },
    {
      "title": "Functions",
      "anchor": "#functions",
      "children": [
        {
          "title": "MyFunction",
          "anchor": "#function-myfunction"
        }
      ]
    }
  ]
}
```

## File Structure

```
assets/pages/
  Getting Started/           # Section folder
    index.md                # Markdown content
  Community Bridge/         # Section with subsections
    index.md               # Overview page
    Banking/               # Subsection
      banking.json         # Function definitions
      toc.json            # Custom TOC
    Inventory/
      inventory.json
```

## Building and Running

### Option 1: Automatic (Recommended)

```bash
# Windows (Command Prompt)
start-docs.bat

# Windows (PowerShell)
./start-docs.ps1
```

### Option 2: Manual

```bash
# Generate structure from folders
python build/generate-structure.py

# Start local server
python -m http.server 8000
```

Visit `http://localhost:8000` to view your documentation.

## Folder Icons

The system automatically assigns icons based on folder names:

- Banking: 🏦
- Inventory: 📦
- Management: ⚙️
- Notifications: 🔔
- Shops: 🛒
- Target/Targeting: 🎯
- Vehicle/Keys: 🔑
- Getting Started: 🚀
- Bridge: 🌉
- Examples: 💡
- API: 🔌

## Customization

### Themes

The site includes light and dark themes. Users can toggle between them using the theme button in the header.

### Styling

Modify `assets/css/styles.css` to customize:

- Colors and fonts
- Layout and spacing
- Component styles

### Search

Search automatically indexes:
- Page titles
- File paths
- Content (when implemented)

## Tips

1. **Folder Names**: Use descriptive names as they become navigation labels
2. **Icons**: Choose names that match the auto-icon system or add custom icons in the structure
3. **Organization**: Group related content in the same section
4. **TOC**: Use custom TOC files for complex pages with many sections
5. **Updates**: Re-run the build script after adding new folders or files

## Advanced Usage

### Custom Structure

Instead of auto-generation, you can manually edit `assets/pages-structure.json`:

```json
{
  "Section Name": {
    "type": "folder",
    "icon": "📚",
    "children": {
      "Page Name": {
        "type": "markdown",
        "path": "assets/pages/Section/page.md",
        "icon": "📄"
      }
    }
  }
}
```

### Multiple JSON Files

If a folder contains multiple JSON files (excluding `toc.json`), the first one found will be used. Organize related functions in the same JSON file for better navigation.

### Markdown Features

The system supports full Markdown including:
- Headers (auto-generate TOC)
- Code blocks (syntax highlighting with Prism)
- Links, images, tables
- HTML when needed

## Troubleshooting

**Navigation not updating**: Re-run the build script
**Icons not showing**: Check folder naming or add custom icons
**Search not working**: Verify the structure file is generated correctly
**Styles not loading**: Check file paths and server setup
