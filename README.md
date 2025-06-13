# Community Bridge Documentation Site

A modern, dynamic documentation site for the Community Bridge FiveM framework. This site automatically discovers and documents modules and library functions with a beautiful, user-friendly interface.

## ✨ Features

- 🏗️ **Automatic Discovery**: Dynamically loads module and library data from source files
- 🔍 **Advanced Search**: Search across modules, functions, and documentation with keyboard navigation
- 🌓 **Dark/Light Theme**: Toggle between themes with persistent preferences
- 📱 **Mobile Responsive**: Optimized for all screen sizes
- 🗂️ **Dynamic Navigation**: Collapsible navigation with category organization
- 📋 **Table of Contents**: Automatic TOC generation with smooth scrolling and scroll spy
- 🔗 **Deep Linking**: Direct links to specific functions and sections
- ⌨️ **Keyboard Shortcuts**: Full keyboard navigation support
- 📄 **Export Options**: Export documentation as PDF, HTML, Markdown, or JSON
- 📋 **Copy Code**: One-click code copying with syntax highlighting
- ⚡ **Fast Performance**: Optimized loading, caching, and lazy loading
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- 🧩 **Expandable**: Easy to add new modules and documentation
- 🔄 **Auto-Regeneration**: Development server with file watching (optional)

## 🚀 Quick Start

### Option 1: Standard Setup

1. **Generate Documentation Data**:
   ```bash
   # Windows
   generate-docs.bat
   ```

2. **Start the Server**:
   ```bash
   # Windows
   start-server.bat
   ```

3. **Open Browser**: Navigate to `http://localhost:8080`

### Option 2: Development Setup (with Auto-Regeneration)

1. **Start Development Server**:
   ```bash
   # Windows (includes auto-regeneration)
   start-dev-server.bat
   ```

2. **Automatic Updates**: The server will automatically regenerate documentation when source files change

### Option 3: Direct File Access

Simply open `index.html` in your browser. The site will work with fallback data if no generated files are found.

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + K` | Focus search |
| `?` | Show keyboard shortcuts |
| `↑` `↓` | Navigate search results |
| `Enter` | Select search result |
| `Esc` | Close dialogs |
| `Ctrl + Shift + T` | Toggle theme |

## 📁 Project Structure

```
tootsf.github.io/
├── index.html                 # Main HTML file
├── config.json               # Configuration file
├── assets/
│   ├── css/
│   │   └── styles.css        # Main stylesheet with dark/light themes
│   ├── js/
│   │   └── app.js           # Main JavaScript application
│   ├── data/                # Generated documentation data
│   │   ├── modules.json     # Module definitions and functions
│   │   ├── libraries.json   # Library definitions and functions
│   │   ├── structure.json   # Complete structure data
│   │   └── navigation.json  # Navigation structure
│   └── pages/               # Markdown documentation pages
│       ├── Community Bridge/
│       │   ├── overview.md
│       │   └── getting-started.md
│       └── Examples/
│           ├── basic-usage.md
│           └── advanced.md
├── tools/
│   └── scan_community_bridge.py  # Documentation generator
├── server.py                 # Basic HTTP server
├── dev-server.py             # Development server with file watching
├── generate-docs.bat         # Documentation generation script
├── start-server.bat          # Server startup script
├── start-dev-server.bat      # Development server startup script
└── README.md                 # This file
```

## Configuration

### Path Configuration

Update the Community Bridge path in `generate-docs.bat`:

```batch
set BRIDGE_PATH="C:\path\to\your\community_bridge"
```

### Theme Configuration

The site defaults to dark theme. Users can toggle between themes, and the preference is saved locally.

### Module Detection

The documentation generator automatically detects:

- **Module files**: `client.lua`, `server.lua`, `shared.lua`, `config.lua`
- **Library files**: Utility functions in the `lib/` directory
- **Function definitions**: Lua function patterns and exports
- **Documentation comments**: Comment blocks above functions

## Adding Documentation

### Markdown Pages

Add markdown files to `assets/pages/` following this structure:

```
assets/pages/
├── Category Name/
│   ├── page-name.md
│   └── another-page.md
└── Another Category/
    └── documentation.md
```

### Module Documentation

The generator automatically creates documentation from:

1. **Function signatures** in Lua files
2. **Comment blocks** above functions:
   ```lua
   -- This function shows a help text message
   -- @param message string The message to display
   -- @param position string Position on screen
   function ShowHelpText(message, position)
       -- Function implementation
   end
   ```

3. **Configuration options** in config files

### Custom Content

You can also manually create JSON files in `assets/data/` to override or supplement the generated documentation.

## Customization

### Styling

Modify `assets/css/styles.css` to customize:

- Color schemes and themes
- Layout and spacing
- Typography and fonts
- Component styling

### Functionality

Extend `assets/js/app.js` to add:

- New content types
- Additional search features
- Custom navigation behavior
- Integration with external systems

### Navigation Structure

The navigation is automatically generated but can be customized by modifying the `generateNavigationData()` function in the scanner script.

## Development

### Prerequisites

- Python 3.6+ (for documentation generation and dev server)
- Modern web browser
- Access to the Community Bridge source files

### Local Development

1. **Clone or download** this repository
2. **Configure paths** in the batch files
3. **Generate documentation** data (optional)
4. **Start the server** for development
5. **Make changes** and refresh the browser

### Adding New Features

The codebase is modular and well-documented. Key areas for extension:

- **Content Loaders**: Add support for new file types
- **Search Engine**: Enhance search capabilities
- **UI Components**: Add new interface elements
- **Export Features**: Add PDF/print capabilities

## Browser Support

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Performance

The site is optimized for performance:

- **Lazy Loading**: Content loads on demand
- **Efficient Search**: Indexed search with minimal overhead
- **Caching**: Browser caching for static assets
- **Minimal Dependencies**: Pure JavaScript, no heavy frameworks

## Deployment

### GitHub Pages

1. Push to your GitHub repository
2. Enable GitHub Pages in repository settings
3. Set source to main branch
4. Your site will be available at `https://username.github.io/repository-name`

### Custom Hosting

1. Upload all files to your web server
2. Ensure proper MIME types for `.json` files
3. Configure CORS headers if needed
4. Access via your domain

## API Reference

### JavaScript API

The main application class `CommunityBridgeDocumentation` provides:

```javascript
// Navigate to a specific path
app.navigateToPath('modules/helptext#showhelptext');

// Load content programmatically
await app.loadContent('path', 'type');

// Update theme
app.toggleTheme();

// Perform search
app.handleSearch('search query');
```

### Data Format

Generated JSON files follow this structure:

```json
{
  "moduleName": {
    "name": "ModuleName",
    "type": "module",
    "description": "Module description",
    "hasClient": true,
    "hasServer": true,
    "functions": {
      "client": [...],
      "server": [...]
    }
  }
}
```

## Troubleshooting

### Common Issues

1. **Python not found**: Install Python 3.6+ and add to PATH
2. **Community Bridge path not found**: Update the path in batch files
3. **CORS issues**: Use the included server script instead of file:// URLs
4. **Missing data**: Run the documentation generator first

### Debug Mode

Enable debug logging by setting:

```javascript
console.log('Debug mode enabled');
```

### Error Reporting

Check the browser console for detailed error messages and stack traces.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source. Please respect the licenses of any dependencies.

## Support

For support and questions:

- Check the documentation
- Review existing issues
- Create a new issue with details
- Join the community discussions

---

**Built with ❤️ for the FiveM Community**
