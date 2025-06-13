# Community Bridge Documentation Website

This is the official documentation website for Community Bridge, a comprehensive compatibility layer for FiveM frameworks.

## Features

- **Dynamic Content Loading**: Automatically loads module data and TOC from the pages folder
- **Modern UI**: Clean, responsive design with modern styling
- **Dark/Light Theme**: Toggle between themes with dark mode as default
- **Smart Search**: Search through modules, functions, and documentation
- **Navigation**: Left sidebar with hierarchical navigation structure
- **Table of Contents**: Right sidebar showing page structure
- **Markdown Support**: Displays markdown files when available, falls back to JSON function data
- **Mobile Responsive**: Works well on all device sizes

## Structure

```
/
├── index.html              # Main application entry point
├── assets/
│   ├── css/
│   │   └── styles.css      # All styles with theme support
│   └── js/
│       └── app.js          # Main application logic
├── pages/                  # Documentation data
│   ├── Community Bridge/   # Main category
│   │   ├── index.md        # Category overview (markdown)
│   │   ├── toc.json        # Table of contents for category
│   │   └── [Module]/       # Individual modules
│   │       ├── [module].md # Module documentation (if available)
│   │       ├── [module].json # Function definitions
│   │       └── toc.json    # Module table of contents
│   ├── Getting Started/
│   └── Examples/
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages deployment
```

## Data Format

### Category Structure
Each category in the `pages` folder should have:
- `index.md` - Main category documentation (optional)
- `toc.json` - Table of contents defining subcategories

### TOC JSON Format
```json
[
  {
    "type": "folder",
    "name": "ModuleName",
    "title": "Display Title",
    "icon": "📄",
    "description": "Module description"
  }
]
```

### Function JSON Format
```json
{
  "name": "ModuleName",
  "icon": "📄",
  "description": "Module description",
  "clientFunctions": [
    {
      "name": "FunctionName",
      "description": "Function description",
      "syntax": "Bridge.Module.Function(param1, param2)",
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
      "example": "local result = Bridge.Module.Function('test', 123)"
    }
  ],
  "serverFunctions": [...]
}
```

## Development

1. Clone the repository
2. Ensure your content is in the `pages` folder following the structure above
3. Open `index.html` in a web browser or serve with a local HTTP server
4. For development: `python -m http.server 8000`

## Deployment

The site automatically deploys to GitHub Pages when changes are pushed to the main branch.

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES6+ support required
- JavaScript enabled

## Dependencies

- [Marked.js](https://marked.js.org/) - Markdown parsing
- [Prism.js](https://prismjs.com/) - Syntax highlighting
- [Font Awesome](https://fontawesome.com/) - Icons

All dependencies are loaded via CDN for simplicity.
