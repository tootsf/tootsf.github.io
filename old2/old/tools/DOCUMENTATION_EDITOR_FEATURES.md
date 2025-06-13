# Community Bridge Documentation Editor - Features & Improvements

## 📖 Overview
The Documentation Editor is a comprehensive tool for editing Community Bridge documentation and function metadata. It provides a unified interface for managing both markdown documentation files and JSON function definitions.

## 🚀 Key Features

### 📁 File Management
- **Flexible File Loading**: Automatically searches multiple possible paths for documentation files
- **Smart Path Detection**: Works with different folder structures (parent, local, assets)
- **Auto-save**: Saves changes every 30 seconds to prevent data loss
- **Status Indicators**: Real-time status for documentation and function files

### ✏️ Documentation Editing
- **Frontmatter Editor**: User-friendly form for editing custom frontmatter (not actual Jekyll)
- **Markdown Editor**: Full-featured markdown editing with live preview
- **TOC Generation**: Automatic table of contents generation from headings
- **Syntax Highlighting**: Code highlighting in preview mode

### 🔧 Function Management
- **Add Functions**: Create new client or server functions with guided modal
- **Edit Functions**: Modify existing function definitions
- **Delete Functions**: Remove functions with confirmation
- **Function Counts**: Live display of client/server function counts

### 🎨 User Interface
- **Three-Panel Layout**: Sidebar (modules), main content (editing), TOC panel
- **Tab System**: Switch between Settings, Content, and Preview
- **Dark/Light Theme**: Toggle between themes with localStorage persistence
- **Responsive Design**: Mobile-friendly with collapsible panels

### 🛠️ Advanced Features
- **Generate Documentation**: Auto-generate markdown from JSON function definitions
- **Create New Modules**: Wizard for creating new modules with proper structure
- **Smart Navigation**: Jump to headings in editor from TOC
- **Module Selector**: Dropdown with all available modules

## 📝 File Structure Understanding

### Documentation Files
- Location: `/community_bridge/modules/[module]/index.md`
- Format: Custom frontmatter + markdown content (Jekyll-like but not actual Jekyll)
- Fields: layout, title, parent, grand_parent, nav_order, has_children, permalink

### Function Metadata
- Location: `/assets/data/[module].json`
- Structure: Module info + clientFunctions + serverFunctions arrays
- Function properties: name, description, syntax, parameters, returns, example, behavior

## 🔄 Workflow

1. **Select Module**: Choose from dropdown or create new module
2. **Edit Settings**: Configure frontmatter properties in Settings tab
3. **Edit Content**: Write documentation in markdown format
4. **Manage Functions**: Add/edit/delete function definitions
5. **Preview**: See rendered output in Preview tab
6. **Generate Docs**: Auto-generate function documentation from JSON
7. **Save**: Manual save or automatic every 30 seconds

## 🎯 Integration Points

### Server Integration
- Uses enhanced-server.py for file operations
- PUT requests for saving markdown and JSON files
- Error handling for server communication

### Live Server Compatibility
- Works alongside Live Server for development
- Auto-reload functionality when files change
- Port management (8082 for editor, 5500 for Live Server)

## 🔧 Technical Implementation

### Key Classes & Methods
```javascript
class DocumentationEditor {
    // Core functionality
    loadModule(moduleId)
    saveAll()

    // File operations
    loadDocumentation(moduleId)
    saveDocumentation(moduleId, documentation)
    loadFunctions(moduleId)
    saveFunctions(moduleId, functions)

    // Function management
    addFunction(type)
    editFunction(type, index)
    deleteFunction(type, index)
    generateFunctionDocs()

    // Module management
    createNewModule()

    // UI helpers
    updatePreview()
    updateTOC()
    scrollToHeading(line)
}
```

### Error Handling
- Graceful fallbacks for missing files
- User-friendly error messages
- Console logging for debugging
- Status indicators for file states

### Form Validation
- Required field checking
- Module ID format validation
- Function definition validation
- Confirmation dialogs for destructive actions

## 🎨 Styling Features

### CSS Variables
- Consistent color scheme with CSS custom properties
- Dark/light theme support
- Responsive breakpoints

### Components
- Modal system with animations
- Toast notifications
- Form styling with help text
- Button states and hover effects

## 🚀 Future Enhancements

### Planned Features
- GitHub integration for direct publishing
- Advanced parameter/return type editors
- Bulk import/export functionality
- Module templates
- Real-time collaboration
- Version history

### Possible Improvements
- Better markdown parser (marked.js)
- Drag-and-drop file uploads
- Image asset management
- Search functionality within editor
- Auto-completion for function syntax

## 📋 Usage Notes

### Best Practices
1. Always use the module selector to switch between modules
2. Save frequently or rely on auto-save
3. Use the Generate Docs feature after adding functions
4. Check status indicators for file health
5. Test preview before final save

### Troubleshooting
- If files don't load, check server is running on port 8082
- If auto-save fails, use manual save button
- Check browser console for detailed error messages
- Ensure proper file permissions for target directories

### File Paths
The editor supports multiple possible locations for documentation files:
- `/../community_bridge/modules/[module]/index.md` (preferred)
- `/community_bridge/modules/[module]/index.md`
- `/assets/data/community_bridge/modules/[module]/index.md`
- `/modules/[module]/index.md`

Function JSON files are always saved to `/assets/data/[module].json`

## 📊 Status Indicators

- **Green (●)**: File loaded successfully
- **Yellow (●)**: File created (new/empty)
- **Red (●)**: Error loading file
- **Loading**: File operation in progress

## 🎯 Integration with Community Bridge System

The Documentation Editor is designed to work seamlessly with the Community Bridge documentation system:

1. **Module Configuration**: Reads from `/assets/js/module-config.js`
2. **JSON Rendering**: Compatible with `/assets/js/json-doc-renderer.js`
3. **Navigation**: Integrates with `/assets/js/navigation.js`
4. **Search**: Works with `/assets/js/search.js`

This ensures that documentation created in the editor will properly display in the main documentation site.
