// Enhanced Module Builder with Integrated Markdown + Function Editing
// Complete system for editing both markdown documentation and JSON functions

// Global state
let currentModule = null;
let modules = [];
let functionCounter = 0;
let activeTab = 'module-builder';
let markdownContent = '';
let currentMarkdownFile = null;
let originalHtmlContent = null;

// Integrated editing variables
let currentModuleId = null;
let currentModuleData = null;

// DOM Check function
function checkDOMElements() {
    const elements = {
        'json-list': document.getElementById('json-list'),
        'status-indicator': document.getElementById('status-indicator'),
        'toast': document.getElementById('toast'),
        'create-new-btn': document.getElementById('create-new-btn'),
        'refresh-modules-btn': document.getElementById('refresh-modules-btn'),
        'theme-toggle': document.getElementById('theme-toggle')
    };

    console.log('🔍 DOM Element Check:');
    for (const [id, element] of Object.entries(elements)) {
        console.log(`  ${id}: ${element ? '✅ Found' : '❌ Missing'}`);
    }

    return elements;
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Module Builder initializing...');

    try {
        // Check DOM elements first
        const elements = checkDOMElements();

        if (!elements['json-list']) {
            console.error('❌ Critical: json-list element not found!');
            showToast('Critical error: Module list container not found', 'error');
            return;
        }

        initializeApp();
        setupEventListeners();
        setupTabs();

        // Load modules after a short delay
        setTimeout(loadModules, 500);

    } catch (error) {
        console.error('❌ Initialization failed:', error);
        showToast(`Initialization failed: ${error.message}`, 'error');
    }
});

// Application initialization
function initializeApp() {
    console.log('🔧 Initializing app...');

    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (themeToggle) {
        themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    }

    updateStatus('Module Builder ready');
    console.log('✅ App initialized');
}

// Setup tab navigation
function setupTabs() {
    console.log('🏷️ Setting up tabs...');

    const tabs = document.querySelectorAll('.tab-nav button');
    console.log(`Found ${tabs.length} tab buttons`);

    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            console.log(`Tab clicked: ${tabId}`);
            switchTab(tabId);
        });
        console.log(`✅ Tab ${index + 1} listener added`);
    });
}

// Switch between tabs
function switchTab(tabId) {
    console.log(`🔄 Switching to tab: ${tabId}`);
    activeTab = tabId;

    // Update tab buttons
    document.querySelectorAll('.tab-nav button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    const activeContent = document.getElementById(tabId);
    if (activeContent) {
        activeContent.classList.add('active');
    }

    // Initialize specific tab functionality
    if (tabId === 'page-editor') {
        initializePageEditor();
    } else if (tabId === 'navigation-editor') {
        initializeNavigationEditor();
    } else if (tabId === 'module-builder') {
        initializeModuleBuilder();
    }

    // Update status
    const statusMessages = {
        'module-builder': 'Ready to create or edit JSON modules',
        'navigation-editor': 'Configure site navigation',
        'page-editor': 'Edit markdown documentation with integrated functions'
    };
    updateStatus(statusMessages[tabId] || 'Ready');

    // If a module is currently selected, load it for the new tab
    if (currentModule) {
        loadModule(currentModule);
    }

    console.log(`✅ Switched to tab: ${tabId}`);
}

// ========================================
// INTEGRATED MARKDOWN + FUNCTION EDITOR
// ========================================

// Initialize page editor with integrated functionality
function initializePageEditor() {
    console.log('🏷️ Initializing page editor...');

    // Remove file selector dropdown - we'll use sidebar instead
    removeFileSelector();

    // Setup markdown preview update
    const markdownInput = document.getElementById('markdown-input');
    if (markdownInput) {
        markdownInput.addEventListener('input', updateMarkdownPreview);
    }

    // If a module is already selected, load it for page editor
    if (currentModule) {
        loadModuleForPageEditor(currentModule);
    }

    console.log('✅ Page editor initialized');
}

// Remove file selector and show instruction
function removeFileSelector() {
    const selector = document.getElementById('markdown-file-selector');
    if (selector) {
        selector.style.display = 'none';
    }

    // Show instruction instead
    const fileControls = document.querySelector('.file-controls');
    if (fileControls) {
        let instruction = fileControls.querySelector('.sidebar-instruction');
        if (!instruction) {
            instruction = document.createElement('div');
            instruction.className = 'sidebar-instruction';
            instruction.innerHTML = `
                <p style="color: var(--text-secondary); font-style: italic; margin: 0;">
                    📋 Select a module from the sidebar to edit its documentation and functions
                </p>
            `;
            fileControls.appendChild(instruction);
        }
    }
}

// Load markdown files for the page editor with integrated function editing
async function loadMarkdownFiles() {
    const selector = document.getElementById('markdown-file-selector');
    if (!selector) return;

    try {
        // Clear existing options
        selector.innerHTML = '<option value="">Select a file to edit...</option>';

        // Module markdown files with integrated function editing
        const moduleFiles = [
            'target', 'vehiclekey', 'skills', 'shops', 'progressbar',
            'notify', 'management', 'inventory'
        ];

        // Add section header for modules with integrated function editing
        const moduleHeader = document.createElement('optgroup');
        moduleHeader.label = '📦 Module Documentation (Markdown + Functions)';
        selector.appendChild(moduleHeader);

        moduleFiles.forEach(moduleId => {
            const option = document.createElement('option');
            option.value = `community_bridge/modules/${moduleId}/index.md`;
            option.textContent = `${moduleId.charAt(0).toUpperCase() + moduleId.slice(1)} Module`;
            option.setAttribute('data-module-id', moduleId);
            option.setAttribute('data-file-type', 'module');
            moduleHeader.appendChild(option);
        });

        // Static markdown files
        const staticHeader = document.createElement('optgroup');
        staticHeader.label = '📄 Static Pages';
        selector.appendChild(staticHeader);

        const staticFiles = [
            { path: 'community_bridge/index.md', label: 'Main Documentation' },
            { path: 'community_bridge/examples/index.md', label: 'Examples Overview' },
        ];

        staticFiles.forEach(file => {
            const option = document.createElement('option');
            option.value = file.path;
            option.textContent = file.label;
            option.setAttribute('data-file-type', 'markdown');
            staticHeader.appendChild(option);
        });

        // Add event listener for file selection
        selector.addEventListener('change', handleFileSelection);

    } catch (error) {
        console.error('Error loading markdown files:', error);
        showToast('Failed to load markdown files', 'error');
    }
}

// Handle file selection for integrated editing
async function handleFileSelection(event) {
    const selector = event.target;
    const filePath = selector.value;
    const option = selector.selectedOptions[0];

    if (!filePath) return;

    const fileType = option.getAttribute('data-file-type');
    const moduleId = option.getAttribute('data-module-id');

    currentMarkdownFile = filePath;
    currentModuleId = moduleId;

    try {
        updateStatus('Loading file...');

        if (fileType === 'module') {
            await loadModuleForIntegratedEditing(moduleId, filePath);
        } else {
            await loadStaticMarkdownFile(filePath);
        }

    } catch (error) {
        console.error('Error loading file:', error);
        showToast(`Failed to load: ${filePath}`, 'error');
    }
}

// Load module for integrated editing (markdown + functions)
async function loadModuleForIntegratedEditing(moduleId, markdownPath) {
    try {
        console.log(`Loading module for integrated editing: ${moduleId}`);

        // Load JSON data
        const jsonResponse = await fetch(`/assets/data/${moduleId}.json`);
        if (jsonResponse.ok) {
            currentModuleData = await jsonResponse.json();
            console.log('JSON data loaded:', currentModuleData);
        } else {
            // Create empty JSON structure if file doesn't exist
            currentModuleData = {
                name: moduleId.charAt(0).toUpperCase() + moduleId.slice(1),
                icon: '🔧',
                description: `${moduleId} module description`,
                clientFunctions: [],
                serverFunctions: []
            };
            console.log('Created empty JSON structure');
        }

        // Load markdown content
        const markdownResponse = await fetch(`/${markdownPath}`);
        if (markdownResponse.ok) {
            markdownContent = await markdownResponse.text();
        } else {
            // Create default markdown content
            markdownContent = createDefaultMarkdownContent(moduleId, currentModuleData);
        }

        // Populate the editor
        const markdownInput = document.getElementById('markdown-input');
        if (markdownInput) {
            markdownInput.value = markdownContent;
            updateMarkdownPreview();
        }

        // Show function editing controls
        showFunctionEditingControls();

        // Update save button to handle both markdown and JSON
        updateSaveButtonForIntegratedMode();

        updateStatus(`Loaded: ${moduleId} (Markdown + Functions)`);
        showToast(`Loaded ${moduleId} for integrated editing`, 'success');

    } catch (error) {
        console.error('Error in integrated loading:', error);
        showToast('Failed to load for integrated editing', 'error');
    }
}

// Load static markdown file
async function loadStaticMarkdownFile(filePath) {
    try {
        const response = await fetch(`/${filePath}`);
        if (response.ok) {
            markdownContent = await response.text();
        } else {
            markdownContent = `# ${filePath}\n\nNew markdown file.`;
        }

        const markdownInput = document.getElementById('markdown-input');
        if (markdownInput) {
            markdownInput.value = markdownContent;
            updateMarkdownPreview();
        }

        // Hide function editing controls
        hideFunctionEditingControls();

        // Update save button for markdown only
        updateSaveButtonForMarkdownMode();

        updateStatus(`Loaded: ${filePath}`);
        showToast(`Loaded ${filePath}`, 'success');

    } catch (error) {
        console.error('Error loading static markdown:', error);
        showToast('Failed to load markdown file', 'error');
    }
}

// Create default markdown content for a module
function createDefaultMarkdownContent(moduleId, moduleData) {
    const moduleName = moduleData.name || moduleId.charAt(0).toUpperCase() + moduleId.slice(1);

    return `# ${moduleName} Module

${moduleData.description || `The ${moduleName} module provides functionality for ${moduleId}-related operations.`}

## Overview

This module allows developers to [describe main functionality here].

## Key Features

- **Feature 1**: Description
- **Feature 2**: Description
- **Feature 3**: Description

## Getting Started

To use the ${moduleName} module in your script:

\`\`\`lua
-- Ensure the Community Bridge resource is started
exports['community_bridge']:ensureLoaded()

-- Example usage
Bridge.${moduleName}.ExampleFunction()
\`\`\`

## Function Reference

The functions below are dynamically loaded from the JSON configuration and integrated into this documentation.

<!-- FUNCTIONS_PLACEHOLDER -->

## Best Practices

- Add best practices here
- Include performance tips
- Mention common pitfalls to avoid

## Examples

### Basic Example
\`\`\`lua
-- Add example code here
\`\`\`

## Troubleshooting

### Common Issues

**Issue 1**: Solution description

**Issue 2**: Solution description
`;
}

// Show function editing controls
function showFunctionEditingControls() {
    console.log('🎛️ Showing function editing controls...');

    // Check if function controls already exist
    let functionControls = document.getElementById('function-editing-controls');

    if (!functionControls) {
        // Create compact function editing controls
        functionControls = document.createElement('div');
        functionControls.id = 'function-editing-controls';
        functionControls.className = 'function-editing-controls compact';

        functionControls.innerHTML = `
            <div class="function-controls-header">
                <h4>⚙️ Functions</h4>
                <button onclick="toggleFunctionManager()" class="toggle-functions-btn" title="Show/Hide Function List">📋</button>
            </div>

            <div class="function-quick-actions">
                <button onclick="addNewFunction('client')" class="quick-add-btn client" title="Add Client Function">👨‍💻+</button>
                <button onclick="addNewFunction('server')" class="quick-add-btn server" title="Add Server Function">🖥️+</button>
                <button onclick="openFunctionManagerModal()" class="manage-functions-btn" title="Manage All Functions">📋 Manage</button>
            </div>

            <div id="function-summary" class="function-summary">
                <!-- Function summary will be populated here -->
            </div>
        `;

        // Insert into the dedicated function management container
        const functionContainer = document.getElementById('function-management-container');
        if (functionContainer) {
            // Clear the no-module message
            functionContainer.innerHTML = '';
            functionContainer.appendChild(functionControls);
        } else {
            // Fallback: Insert after markdown input area (old behavior)
            const markdownInput = document.getElementById('markdown-input');
            if (markdownInput && markdownInput.parentNode) {
                markdownInput.parentNode.insertBefore(functionControls, markdownInput.nextSibling);
            }
        }
    }

    // Update function summary
    updateFunctionSummary();

    // Show the controls
    functionControls.style.display = 'block';

    console.log('✅ Function editing controls shown');
}

// Update function summary (compact view)
function updateFunctionSummary() {
    const summary = document.getElementById('function-summary');
    if (!summary || !currentModuleData) return;

    const clientCount = currentModuleData.clientFunctions ? currentModuleData.clientFunctions.length : 0;
    const serverCount = currentModuleData.serverFunctions ? currentModuleData.serverFunctions.length : 0;

    summary.innerHTML = `
        <div class="function-counts">
            <span class="count-item">👨‍💻 ${clientCount} client</span>
            <span class="count-item">🖥️ ${serverCount} server</span>
        </div>
    `;
}

// Open function manager modal
function openFunctionManagerModal() {
    if (!currentModuleData) {
        showToast('No module selected', 'error');
        return;
    }

    const modalHTML = `
        <div id="function-manager-modal" class="modal-overlay">
            <div class="modal-content function-manager-modal">
                <div class="modal-header">
                    <h3>📋 Function Manager - ${currentModuleData.name}</h3>
                    <button onclick="closeFunctionManagerModal()" class="modal-close">×</button>
                </div>

                <div class="modal-body">
                    <div class="function-manager-actions">
                        <button onclick="addNewFunction('client')" class="add-function-btn client">
                            ➕ Add Client Function
                        </button>
                        <button onclick="addNewFunction('server')" class="add-function-btn server">
                            ➕ Add Server Function
                        </button>
                        <button onclick="previewFunctionsInMarkdown()" class="preview-functions-btn">
                            👀 Preview in Markdown
                        </button>
                    </div>

                    <div id="function-manager-list" class="function-manager-list">
                        <!-- Function list will be populated here -->
                    </div>
                </div>

                <div class="modal-footer">
                    <button onclick="closeFunctionManagerModal()" class="done-btn">Done</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    updateFunctionManagerList();
}

// Update function manager list
function updateFunctionManagerList() {
    const list = document.getElementById('function-manager-list');
    if (!list || !currentModuleData) return;

    let html = '';

    // Client functions
    if (currentModuleData.clientFunctions && currentModuleData.clientFunctions.length > 0) {
        html += '<div class="function-section"><h4>👨‍💻 Client Functions</h4>';
        currentModuleData.clientFunctions.forEach((func, index) => {
            html += `
                <div class="function-list-item">
                    <div class="function-info">
                        <strong>${func.name || 'Unnamed Function'}</strong>
                        <p>${func.description || 'No description'}</p>
                        ${func.parameters && func.parameters.length > 0 ? `<small>Parameters: ${func.parameters.length}</small>` : ''}
                    </div>
                    <div class="function-actions">
                        <button onclick="editFunction('client', ${index})" class="edit-btn" title="Edit">✏️</button>
                        <button onclick="deleteFunction('client', ${index})" class="delete-btn" title="Delete">🗑️</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }

    // Server functions
    if (currentModuleData.serverFunctions && currentModuleData.serverFunctions.length > 0) {
        html += '<div class="function-section"><h4>🖥️ Server Functions</h4>';
        currentModuleData.serverFunctions.forEach((func, index) => {
            html += `
                <div class="function-list-item">
                    <div class="function-info">
                        <strong>${func.name || 'Unnamed Function'}</strong>
                        <p>${func.description || 'No description'}</p>
                        ${func.parameters && func.parameters.length > 0 ? `<small>Parameters: ${func.parameters.length}</small>` : ''}
                    </div>
                    <div class="function-actions">
                        <button onclick="editFunction('server', ${index})" class="edit-btn" title="Edit">✏️</button>
                        <button onclick="deleteFunction('server', ${index})" class="delete-btn" title="Delete">🗑️</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }

    if (html === '') {
        html = '<div class="no-functions"><p>📝 No functions defined yet. Use the buttons above to add some.</p></div>';
    }

    list.innerHTML = html;
}

// Close function manager modal
function closeFunctionManagerModal() {
    const modal = document.getElementById('function-manager-modal');
    if (modal) modal.remove();
    updateFunctionSummary(); // Update the compact summary
}

// Hide function editing controls
function hideFunctionEditingControls() {
    console.log('🙈 Hiding function editing controls...');

    const functionControls = document.getElementById('function-editing-controls');
    if (functionControls) {
        functionControls.style.display = 'none';
    }

    // Reset the function management container to show the no-module message
    const functionContainer = document.getElementById('function-management-container');
    if (functionContainer && !functionContainer.querySelector('.no-module-message')) {
        functionContainer.innerHTML = `
            <div class="no-module-message">
                <p>📋 Select a module from the sidebar to manage its functions</p>
            </div>
        `;
    }

    console.log('✅ Function editing controls hidden');
}

// Load module for Page Editor tab
async function loadModuleForPageEditor(module) {
    try {
        // Set current module data for function editing
        currentModuleData = module.data || {
            name: module.name || module.id,
            icon: module.icon || '🔧',
            description: `${module.name || module.id} module description`,
            clientFunctions: [],
            serverFunctions: []
        };

        // Load markdown content
        const markdownPath = `community_bridge/modules/${module.id}/index.md`;
        try {
            const markdownResponse = await fetch(`/${markdownPath}`);
            if (markdownResponse.ok) {
                markdownContent = await markdownResponse.text();
            } else {
                // Create default markdown content
                markdownContent = createDefaultMarkdownContent(module.id, currentModuleData);
            }
        } catch (error) {
            console.warn('Could not load markdown, creating default:', error);
            markdownContent = createDefaultMarkdownContent(module.id, currentModuleData);
        }

        // Populate the editor
        const markdownInput = document.getElementById('markdown-input');
        if (markdownInput) {
            markdownInput.value = markdownContent;
            updateMarkdownPreview();
        }

        // Show function editing controls
        showFunctionEditingControls();

        // Update save button for integrated mode
        updateSaveButtonForIntegratedMode();

        // Remove the dropdown selector
        removeFileSelector();

        updateStatus(`Loaded: ${module.name} (Markdown + Functions)`);
        showToast(`Loaded ${module.name} for integrated editing`, 'success');

    } catch (error) {
        console.error('Error loading for page editor:', error);
        showToast('Failed to load for page editor', 'error');
    }
}

// Load module for Navigation Editor tab
function loadModuleForNavigationEditor(module) {
    updateStatus(`Navigation: ${module.name}`);
    showToast(`Navigation editor for ${module.name}`, 'info');

    // TODO: Implement navigation editor functionality
    // For now, just show that it's selected
}

// Populate form with module data
function populateForm(data) {
    console.log('📝 Populating form with data...');

    try {
        const modName = document.getElementById('mod-name');
        const modIcon = document.getElementById('mod-icon');
        const modDesc = document.getElementById('mod-desc');

        if (modName) modName.value = data.name || '';
        if (modIcon) modIcon.value = data.icon || '';
        if (modDesc) modDesc.value = data.description || '';

        console.log('✅ Form populated');

    } catch (error) {
        console.error('❌ Form population failed:', error);
    }
}

// Create new module
function createNewModule() {
    console.log('🆕 Creating new module...');

    const moduleName = prompt('Enter the name for your new module (without .json extension):');
    if (!moduleName) {
        console.log('Module creation cancelled');
        return;
    }

    const filename = `${moduleName.toLowerCase().replace(/\s+/g, '-')}.json`;
    console.log(`Creating module: ${filename}`);

    // Check if module already exists
    const existingModule = modules.find(m => m.filename === filename);
    if (existingModule) {
        if (confirm(`Module ${filename} already exists. Do you want to edit it instead?`)) {
            loadModule(existingModule);
            return;
        } else {
            return;
        }
    }

    // Create new module
    const newModule = {
        filename: filename,
        data: {
            name: moduleName,
            icon: '🔧',
            description: `${moduleName} module description`,
            clientFunctions: [],
            serverFunctions: []
        },
        isLocal: true,
        isEmpty: false,
        isNew: true
    };

    modules.push(newModule);
    renderModules();
    loadModule(newModule);

    showToast(`Created: ${filename}`, 'success');
    updateStatus(`New module: ${filename}`);
}

// Refresh modules
async function refreshModules() {
    console.log('🔄 Refreshing modules...');
    showToast('Refreshing modules...', 'info');
    updateStatus('Refreshing...');

    try {
        await loadModules();
        showToast('Modules refreshed', 'success');
    } catch (error) {
        console.error('❌ Refresh failed:', error);
        showToast('Refresh failed', 'error');
    }
}

// Generate JSON
function generateJSON(event) {
    console.log('📄 Generating JSON...');

    if (event) event.preventDefault();

    if (!currentModule) {
        showToast('No module selected', 'error');
        return;
    }

    try {
        const moduleData = collectFormData();
        const jsonString = JSON.stringify(moduleData, null, 2);

        const output = document.getElementById('json-output');
        if (output) {
            output.textContent = jsonString;
        }

        const outputDiv = document.getElementById('output');
        if (outputDiv) {
            outputDiv.style.display = 'block';
        }

        showToast('JSON generated successfully!', 'success');
        updateStatus('JSON generated - ready to save');

    } catch (error) {
        console.error('❌ JSON generation failed:', error);
        showToast('Failed to generate JSON', 'error');
    }
}

// Collect form data
function collectFormData() {
    const modName = document.getElementById('mod-name');
    const modIcon = document.getElementById('mod-icon');
    const modDesc = document.getElementById('mod-desc');

    return {
        name: modName?.value || 'Unnamed Module',
        icon: modIcon?.value || '🔧',
        description: modDesc?.value || 'Module description',
        clientFunctions: [],
        serverFunctions: []
    };
}

// Save module
async function saveModule() {
    console.log('💾 Saving module...');

    if (!currentModule) {
        showToast('No module selected to save', 'error');
        return;
    }

    try {
        const moduleData = collectFormData();
        const jsonString = JSON.stringify(moduleData, null, 2);

        // Try to save to server
        const saved = await saveToServer(jsonString, currentModule.filename);

        if (saved) {
            currentModule.data = moduleData;
            currentModule.isEmpty = false;

            showToast(`${currentModule.filename} saved!`, 'success');
            updateStatus(`Saved: ${currentModule.filename}`);
            renderModules();
        } else {
            // Fallback to download
            downloadFile(jsonString, currentModule.filename);
        }

    } catch (error) {
        console.error('❌ Save failed:', error);
        showToast('Save failed', 'error');
    }
}

// Save to server
async function saveToServer(content, filename) {
    const serverPorts = [8082, 8081, 8080];

    for (const port of serverPorts) {
        try {
            const response = await fetch(`http://localhost:${port}/assets/data/${filename}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: content
            });

            if (response.ok) {
                console.log(`✅ Saved to server on port ${port}`);
                return true;
            }
        } catch (error) {
            console.log(`❌ Server ${port} unavailable`);
        }
    }

    return false;
}

// Download file fallback
function downloadFile(content, filename) {
    const blob = new Blob([content], {
        type: filename.endsWith('.md') ? 'text/markdown' : 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    if (confirm(`File will be downloaded as ${filename}. Copy it to the appropriate folder to use it.`)) {
        a.click();
        URL.revokeObjectURL(url);
        showToast(`${filename} downloaded`, 'success');
    }
}

// Theme toggle
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }

    console.log(`🎨 Theme changed to: ${newTheme}`);
    showToast(`${newTheme} theme activated`, 'success');
}

// Utility functions
function updateStatus(message) {
    const statusIndicator = document.getElementById('status-indicator');
    if (statusIndicator) {
        statusIndicator.textContent = message;
        statusIndicator.title = message;
    }
    console.log(`📊 Status: ${message}`);
}

function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    if (!toast) {
        console.log(`🔔 Toast: ${message} (${type})`);
        return;
    }

    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);

    console.log(`🔔 Toast: ${message} (${type})`);
}

// ========================================
// ORIGINAL MODULE BUILDER FUNCTIONS
// ========================================

// Event listeners setup
function setupEventListeners() {
    console.log('🔗 Setting up event listeners...');

    try {
        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
            console.log('✅ Theme toggle listener added');
        }

        // Create new button
        const createNewBtn = document.getElementById('create-new-btn');
        if (createNewBtn) {
            createNewBtn.addEventListener('click', createNewModule);
            console.log('✅ Create new button listener added');
        }

        // Refresh button
        const refreshBtn = document.getElementById('refresh-modules-btn');
        if (refreshBtn) {
            refreshBtn.addEventListener('click', refreshModules);
            console.log('✅ Refresh button listener added');
        }

        // Module form (if exists)
        const moduleForm = document.getElementById('module-form');
        if (moduleForm) {
            moduleForm.addEventListener('submit', (e) => {
                e.preventDefault();
                generateJSON();
            });
            console.log('✅ Module form listener added');
        }

        // Save button (if exists)
        const saveBtn = document.getElementById('save-json-btn');
        if (saveBtn) {
            saveBtn.addEventListener('click', saveModule);
            console.log('✅ Save button listener added');
        }

        console.log('✅ Event listeners setup complete');

    } catch (error) {
        console.error('❌ Event listener setup failed:', error);
        showToast('Event setup failed', 'error');
    }
}

// Load modules from server using module config
async function loadModules() {
    try {
        console.log('🔄 Starting module loading...');
        updateStatus('Loading modules...');

        // Use the module config if available
        if (typeof ModulesAPI !== 'undefined') {
            modules = ModulesAPI.getWithJson().map(module => ({
                id: module.id,
                name: module.name,
                icon: module.icon,
                filename: `${module.id}.json`,
                data: null,
                isLocal: true,
                isEmpty: true,
                url: `/assets/data/${module.id}.json`
            }));

            // Try to load actual JSON data for each module
            for (const module of modules) {
                try {
                    const response = await fetch(module.url);
                    if (response.ok) {
                        module.data = await response.json();
                        module.isEmpty = false;
                        console.log(`✅ Loaded ${module.filename}: ${module.data.name || 'Unknown'}`);
                    }
                } catch (error) {
                    console.warn(`⚠️ Could not load ${module.filename}:`, error);
                }
            }
        } else {
            // Fallback to direct loading
            await loadKnownModulesSimple();
        }

        renderModules();

        const successCount = modules.filter(m => !m.isEmpty).length;
        updateStatus(`Loaded ${successCount}/${modules.length} modules`);
        console.log(`🎉 Module loading complete: ${successCount}/${modules.length} successful`);

        if (successCount > 0) {
            showToast(`Successfully loaded ${successCount} modules`, 'success');
        } else {
            showToast('Modules loaded as templates', 'info');
        }

    } catch (error) {
        console.error('❌ Module loading failed:', error);
        updateStatus('Module loading failed');
        showToast('Could not load modules. Using templates...', 'warning');
        await createEmptyModuleTemplates();
    }
}

// Simple and reliable module loading
async function loadKnownModulesSimple() {
    const knownModules = [
        'inventory.json',
        'management.json',
        'notify.json',
        'progressbar.json',
        'shops.json',
        'skills.json',
        'target.json',
        'vehiclekey.json'
    ];

    modules = [];
    const baseUrl = `${window.location.origin}/assets/data/`;

    console.log(`🔄 Loading modules from: ${baseUrl}`);
    updateStatus(`Loading from: ${baseUrl}`);

    for (const filename of knownModules) {
        const url = baseUrl + filename;
        console.log(`📦 Fetching: ${filename}`);

        try {
            const response = await fetch(url);

            if (response.ok) {
                const data = await response.json();
                console.log(`✅ Loaded ${filename}: ${data.name || 'Unknown'}`);

                modules.push({
                    name: data.name || filename.replace('.json', ''),
                    filename: filename,
                    data: data,
                    isLocal: true,
                    url: url
                });
            } else {
                console.warn(`⚠️ HTTP ${response.status} for ${filename}`);
                modules.push({
                    name: filename.replace('.json', ''),
                    filename: filename,
                    data: null,
                    isLocal: true,
                    isEmpty: true,
                    url: url
                });
            }
        } catch (error) {
            console.error(`❌ Error loading ${filename}:`, error);
            modules.push({
                name: filename.replace('.json', ''),
                filename: filename,
                data: null,
                isLocal: true,
                isEmpty: true,
                url: url
            });
        }
    }

    renderModules();

    const successCount = modules.filter(m => !m.isEmpty).length;
    updateStatus(`Loaded ${successCount}/${modules.length} modules`);
    console.log(`🎉 Module loading complete: ${successCount}/${modules.length} successful`);

    if (successCount > 0) {
        showToast(`Successfully loaded ${successCount} modules`, 'success');
    } else {
        showToast('No modules loaded - using templates', 'warning');
    }
}

// Create empty module templates
async function createEmptyModuleTemplates() {
    console.log('📝 Creating empty module templates...');

    const knownModules = [
        'inventory.json',
        'management.json',
        'notify.json',
        'progressbar.json',
        'shops.json',
        'skills.json',
        'target.json',
        'vehiclekey.json'
    ];

    modules = [];

    for (const filename of knownModules) {
        modules.push({
            name: filename.replace('.json', ''),
            filename: filename,
            data: null,
            isLocal: true,
            isEmpty: true,
            url: `../assets/data/${filename}`
        });
    }

    renderModules();
    updateStatus(`Created ${modules.length} empty templates`);
    console.log('✅ Created empty module templates');
}

// Render modules in sidebar
function renderModules() {
    console.log('🎨 Rendering modules...');

    const modulesList = document.getElementById('json-list');
    if (!modulesList) {
        console.error('❌ Cannot render: json-list element missing');
        return;
    }

    modulesList.innerHTML = '';
    console.log(`📋 Rendering ${modules.length} modules`);

    modules.forEach((module, index) => {
        try {
            const li = document.createElement('li');
            const button = document.createElement('button');

            // Use proper module display name
            const displayName = module.data?.name || module.name || module.filename.replace('.json', '');
            const moduleIcon = module.data?.icon || module.icon || '📦';

            button.innerHTML = `${moduleIcon} ${displayName}`;

            if (module.isEmpty) {
                const indicator = document.createElement('span');
                indicator.textContent = ' (template)';
                indicator.style.fontStyle = 'italic';
                indicator.style.opacity = '0.7';
                indicator.style.fontSize = '0.8rem';
                button.appendChild(indicator);
            }

            // Add status indicator
            if (module.isLocal) {
                const indicator = document.createElement('span');
                indicator.textContent = '📁';
                indicator.style.marginLeft = '0.5rem';
                indicator.title = 'Local file';
                indicator.style.opacity = '0.6';
                button.appendChild(indicator);
            }

            // Click handler
            button.addEventListener('click', () => {
                console.log(`Module clicked: ${module.filename}`);

                // Update active state
                document.querySelectorAll('#json-list button').forEach(btn => {
                    btn.classList.remove('active');
                });
                button.classList.add('active');

                // Load module for current tab
                loadModule(module);
            });

            li.appendChild(button);
            modulesList.appendChild(li);

            console.log(`✅ Rendered: ${module.filename}`);

        } catch (error) {
            console.error(`❌ Error rendering module ${index}:`, error);
        }
    });

    if (modules.length === 0) {
        const li = document.createElement('li');
        li.innerHTML = '<span style="color: var(--text-secondary); font-style: italic;">No modules found</span>';
        modulesList.appendChild(li);
        console.log('📋 Rendered empty state');
    }

    console.log(`✅ Rendered ${modules.length} modules successfully`);
}

// Load a module for all tabs
function loadModule(module) {
    console.log(`📖 Loading module: ${module.filename}`);
    currentModule = module;
    currentModuleId = module.id;

    updateStatus(`Loading: ${module.filename}`);

    // Handle different tabs
    if (activeTab === 'module-builder') {
        loadModuleForBuilder(module);
    } else if (activeTab === 'page-editor') {
        loadModuleForPageEditor(module);
    } else if (activeTab === 'navigation-editor') {
        loadModuleForNavigationEditor(module);
    }
}

// Load module for Module Builder tab
function loadModuleForBuilder(module) {
    if (module.isEmpty || !module.data) {
        showToast(`Template loaded: ${module.filename}. Add functions and save.`, 'info');
        updateStatus(`Template: ${module.filename} - Add your data and save`);

        // Create empty form data
        const emptyData = {
            name: module.name || module.id,
            icon: module.icon || '🔧',
            description: `${module.name || module.id} module description`,
            clientFunctions: [],
            serverFunctions: []
        };
        populateForm(emptyData);
    } else {
        showToast(`Loaded: ${module.data.name}`, 'success');
        updateStatus(`Editing: ${module.data.name}`);
        populateForm(module.data);
    }
}

// Update save button for integrated mode (markdown + functions)
function updateSaveButtonForIntegratedMode() {
    const saveBtn = document.getElementById('save-markdown-btn');
    if (saveBtn) {
        saveBtn.textContent = '💾 Save Documentation + Functions';
        saveBtn.onclick = () => saveIntegratedModule();
        saveBtn.style.background = 'var(--primary-color)';
        saveBtn.style.color = 'white';
    }
}

// Update save button for markdown-only mode
function updateSaveButtonForMarkdownMode() {
    const saveBtn = document.getElementById('save-markdown-btn');
    if (saveBtn) {
        saveBtn.textContent = '💾 Save Markdown';
        saveBtn.onclick = () => saveMarkdownFile();
        saveBtn.style.background = 'var(--secondary-color)';
        saveBtn.style.color = 'white';
    }
}

// Initialize module builder tab
function initializeModuleBuilder() {
    console.log('🔧 Initializing module builder...');

    // Module builder is already initialized in the existing code
    // Just update status
    updateStatus('Module Builder ready - select a module to edit or create new');

    console.log('✅ Module builder initialized');
}

// Initialize navigation editor tab
function initializeNavigationEditor() {
    console.log('🧭 Initializing navigation editor...');

    // TODO: Implement full navigation editor functionality
    // For now, show a placeholder

    const navigationContent = document.querySelector('#navigation-editor .nav-content');
    if (navigationContent) {
        navigationContent.innerHTML = `
            <div class="navigation-placeholder">
                <h3>🚧 Navigation Editor</h3>
                <p>This feature is coming soon!</p>
                <p>The Navigation Editor will allow you to:</p>
                <ul>
                    <li>Reorder modules in the sidebar</li>
                    <li>Configure module groupings</li>
                    <li>Set up custom navigation sections</li>
                    <li>Manage module visibility</li>
                </ul>
                <p><em>Currently selected module: ${currentModule ? currentModule.name : 'None'}</em></p>
            </div>
        `;
    }

    console.log('✅ Navigation editor initialized');
}

// ========================================
// FUNCTION MANAGEMENT IMPLEMENTATIONS
// ========================================

// Add new function to current module
function addNewFunction(type) {
    console.log(`➕ Adding new ${type} function...`);

    if (!currentModuleData) {
        showToast('No module selected for function editing', 'error');
        return;
    }

    // Create new function with minimal data
    const newFunction = {
        name: '',
        description: '',
        syntax: '',
        parameters: [],
        returns: null,
        example: '',
        behavior: []
    };

    if (type === 'client') {
        currentModuleData.clientFunctions = currentModuleData.clientFunctions || [];
        currentModuleData.clientFunctions.push(newFunction);
        openFunctionEditor(type, currentModuleData.clientFunctions.length - 1);
    } else {
        currentModuleData.serverFunctions = currentModuleData.serverFunctions || [];
        currentModuleData.serverFunctions.push(newFunction);
        openFunctionEditor(type, currentModuleData.serverFunctions.length - 1);
    }
}

// Open function editor modal
function openFunctionEditor(type, index) {
    console.log(`🎛️ Opening function editor for ${type} function ${index}...`);

    if (!currentModuleData) return;

    const functions = type === 'client' ? currentModuleData.clientFunctions : currentModuleData.serverFunctions;
    const func = functions[index];

    if (!func) return;

    // Create modal HTML
    const modalHTML = `
        <div id="function-editor-modal" class="modal-overlay">
            <div class="modal-content function-editor-modal">
                <div class="modal-header">
                    <h3>✏️ Edit ${type.charAt(0).toUpperCase() + type.slice(1)} Function</h3>
                    <button onclick="closeFunctionEditor()" class="modal-close">×</button>
                </div>

                <div class="modal-body">
                    <div class="form-group">
                        <label for="func-name">Function Name:</label>
                        <input type="text" id="func-name" value="${func.name}" placeholder="e.g., GetPlayerData">
                    </div>

                    <div class="form-group">
                        <label for="func-description">Description:</label>
                        <textarea id="func-description" placeholder="Brief description of what this function does">${func.description}</textarea>
                    </div>

                    <div class="form-group">
                        <label for="func-syntax">Syntax:</label>
                        <input type="text" id="func-syntax" value="${func.syntax}" placeholder="e.g., Bridge.Module.FunctionName(param1, param2)">
                    </div>

                    <div class="form-group">
                        <label>Parameters:</label>
                        <div id="parameters-container">
                            ${func.parameters.map((param, i) => createParameterHTML(param, i)).join('')}
                        </div>
                        <button type="button" onclick="addParameter()" class="add-param-btn">+ Add Parameter</button>
                    </div>

                    <div class="form-group">
                        <label for="func-returns">Returns:</label>
                        <input type="text" id="func-returns" value="${func.returns || ''}" placeholder="e.g., string, boolean, table">
                    </div>

                    <div class="form-group">
                        <label for="func-example">Example:</label>
                        <textarea id="func-example" placeholder="Code example showing how to use this function">${func.example}</textarea>
                    </div>
                </div>

                <div class="modal-footer">
                    <button onclick="saveFunctionData('${type}', ${index})" class="save-btn">💾 Save Function</button>
                    <button onclick="closeFunctionEditor()" class="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    `;

    // Add modal to page
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Focus on name field
    setTimeout(() => {
        document.getElementById('func-name').focus();
    }, 100);
}

// Create parameter HTML
function createParameterHTML(param, index) {
    return `
        <div class="parameter-item" data-index="${index}">
            <div class="param-row">
                <input type="text" placeholder="Parameter name" value="${param.name || ''}" class="param-name">
                <input type="text" placeholder="Type (e.g., string, number)" value="${param.type || ''}" class="param-type">
                <button onclick="removeParameter(${index})" class="remove-param-btn">×</button>
            </div>
            <textarea placeholder="Parameter description" class="param-description">${param.description || ''}</textarea>
        </div>
    `;
}

// Add parameter
function addParameter() {
    const container = document.getElementById('parameters-container');
    const index = container.children.length;
    container.insertAdjacentHTML('beforeend', createParameterHTML({}, index));
}

// Remove parameter
function removeParameter(index) {
    const paramItem = document.querySelector(`.parameter-item[data-index="${index}"]`);
    if (paramItem) paramItem.remove();

    // Reindex remaining parameters
    document.querySelectorAll('.parameter-item').forEach((item, i) => {
        item.setAttribute('data-index', i);
        const removeBtn = item.querySelector('.remove-param-btn');
        removeBtn.setAttribute('onclick', `removeParameter(${i})`);
    });
}

// Save function data
function saveFunctionData(type, index) {
    console.log(`💾 Saving function data for ${type} function ${index}...`);

    if (!currentModuleData) {
        showToast('No module data available', 'error');
        return;
    }

    const functions = type === 'client' ? currentModuleData.clientFunctions : currentModuleData.serverFunctions;
    const func = functions[index];

    if (!func) {
        showToast('Function not found', 'error');
        return;
    }

    // Collect form data with error checking
    const nameInput = document.getElementById('func-name');
    const descInput = document.getElementById('func-description');
    const syntaxInput = document.getElementById('func-syntax');
    const returnsInput = document.getElementById('func-returns');
    const exampleInput = document.getElementById('func-example');

    if (!nameInput || !descInput || !syntaxInput || !exampleInput) {
        showToast('Form fields not found', 'error');
        return;
    }

    func.name = nameInput.value.trim();
    func.description = descInput.value.trim();
    func.syntax = syntaxInput.value.trim();
    func.returns = returnsInput ? returnsInput.value.trim() || null : null;
    func.example = exampleInput.value.trim();

    // Collect parameters
    func.parameters = [];
    const parameterItems = document.querySelectorAll('.parameter-item');
    parameterItems.forEach(item => {
        const nameField = item.querySelector('.param-name');
        const typeField = item.querySelector('.param-type');
        const descField = item.querySelector('.param-description');

        if (nameField && nameField.value.trim()) {
            func.parameters.push({
                name: nameField.value.trim(),
                type: typeField ? typeField.value.trim() : '',
                description: descField ? descField.value.trim() : ''
            });
        }
    });

    // Validate required fields
    if (!func.name) {
        showToast('Function name is required', 'error');
        if (nameInput) nameInput.focus();
        return;
    }

    console.log('✅ Function data saved:', func);
    closeFunctionEditor();
    updateFunctionSummary();

    // Update the function manager if it's open
    const managerList = document.getElementById('function-manager-list');
    if (managerList) {
        updateFunctionManagerList();
    }

    showToast(`Function "${func.name}" saved successfully`, 'success');
}

// Edit existing function
function editFunction(type, index) {
    console.log(`✏️ Editing ${type} function at index ${index}...`);
    openFunctionEditor(type, index);
}

// Delete function
function deleteFunction(type, index) {
    console.log(`🗑️ Deleting ${type} function at index ${index}...`);

    if (!currentModuleData) return;

    const functions = type === 'client' ? currentModuleData.clientFunctions : currentModuleData.serverFunctions;
    const func = functions[index];

    if (!func) return;

    if (confirm(`Delete function "${func.name || 'Unnamed Function'}"?`)) {
        functions.splice(index, 1);

        // Update function manager list if it's open
        const managerList = document.getElementById('function-manager-list');
        if (managerList) {
            updateFunctionManagerList();
        }

        // Update function summary
        updateFunctionSummary();

        showToast(`Deleted function: ${func.name || 'Unnamed Function'}`, 'success');
    }
}

// Update function list display
function updateFunctionList() {
    console.log('📝 Updating function list...');

    const functionList = document.getElementById('function-list');
    if (!functionList || !currentModuleData) return;

    let html = '';

    // Client functions
    if (currentModuleData.clientFunctions && currentModuleData.clientFunctions.length > 0) {
        html += '<div class="function-section"><h4>👨‍💻 Client Functions</h4>';
        currentModuleData.clientFunctions.forEach((func, index) => {
            html += `
                <div class="function-list-item">
                    <div class="function-info">
                        <strong>${func.name}</strong>
                        <p>${func.description}</p>
                    </div>
                    <div class="function-actions">
                        <button onclick="editFunction('client', ${index})" class="edit-btn">✏️</button>
                        <button onclick="deleteFunction('client', ${index})" class="delete-btn">🗑️</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }

    // Server functions
    if (currentModuleData.serverFunctions && currentModuleData.serverFunctions.length > 0) {
        html += '<div class="function-section"><h4>🖥️ Server Functions</h4>';
        currentModuleData.serverFunctions.forEach((func, index) => {
            html += `
                <div class="function-list-item">
                    <div class="function-info">
                        <strong>${func.name}</strong>
                        <p>${func.description}</p>
                    </div>
                    <div class="function-actions">
                        <button onclick="editFunction('server', ${index})" class="edit-btn">✏️</button>
                        <button onclick="deleteFunction('server', ${index})" class="delete-btn">🗑️</button>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }

    if (html === '') {
        html = '<p style="color: var(--text-secondary); font-style: italic;">No functions defined yet. Add some using the buttons above.</p>';
    }

    functionList.innerHTML = html;
}

// Preview functions in markdown
function previewFunctionsInMarkdown() {
    console.log('👀 Previewing functions in markdown...');

    if (!currentModuleData) {
        showToast('No module data available for preview', 'error');
        return;
    }

    // Generate function documentation
    let functionDocs = '\n## Function Reference\n\n';

    if (currentModuleData.clientFunctions && currentModuleData.clientFunctions.length > 0) {
        functionDocs += '### Client Functions\n\n';
        currentModuleData.clientFunctions.forEach(func => {
            functionDocs += `#### ${func.name}\n\n${func.description}\n\n**Syntax:**\n\`\`\`lua\n${func.syntax}\n\`\`\`\n\n`;
            if (func.example) {
                functionDocs += `**Example:**\n\`\`\`lua\n${func.example}\n\`\`\`\n\n`;
            }
        });
    }

    if (currentModuleData.serverFunctions && currentModuleData.serverFunctions.length > 0) {
        functionDocs += '### Server Functions\n\n';
        currentModuleData.serverFunctions.forEach(func => {
            functionDocs += `#### ${func.name}\n\n${func.description}\n\n**Syntax:**\n\`\`\`lua\n${func.syntax}\n\`\`\`\n\n`;
            if (func.example) {
                functionDocs += `**Example:**\n\`\`\`lua\n${func.example}\n\`\`\`\n\n`;
            }
        });
    }

    // Insert into markdown at placeholder or append
    const markdownInput = document.getElementById('markdown-input');
    if (markdownInput) {
        let content = markdownInput.value;
        if (content.includes('<!-- FUNCTIONS_PLACEHOLDER -->')) {
            content = content.replace('<!-- FUNCTIONS_PLACEHOLDER -->', functionDocs);
        } else {
            content += functionDocs;
        }
        markdownInput.value = content;
        updateMarkdownPreview();
    }

    showToast('Function documentation inserted into markdown', 'success');
}

// Save integrated module (both markdown and JSON)
async function saveIntegratedModule() {
    console.log('💾 Saving integrated module (markdown + JSON)...');

    if (!currentModule || !currentModuleData) {
        showToast('No module data to save', 'error');
        return;
    }

    try {
        // Save JSON data
        const jsonString = JSON.stringify(currentModuleData, null, 2);
        const jsonSaved = await saveToServer(jsonString, currentModule.filename);

        // Save markdown content
        const markdownInput = document.getElementById('markdown-input');
        const markdownContent = markdownInput ? markdownInput.value : '';
        const markdownPath = `community_bridge/modules/${currentModule.id}/index.md`;
        const markdownSaved = await saveToServer(markdownContent, markdownPath);

        if (jsonSaved && markdownSaved) {
            showToast('Successfully saved both JSON and Markdown files', 'success');
            updateStatus('Saved: JSON + Markdown');
        } else if (jsonSaved) {
            showToast('JSON saved, Markdown download required', 'warning');
            downloadFile(markdownContent, `${currentModule.id}-index.md`);
        } else if (markdownSaved) {
            showToast('Markdown saved, JSON download required', 'warning');
            downloadFile(jsonString, currentModule.filename);
        } else {
            showToast('Server unavailable - downloading both files', 'info');
            downloadFile(jsonString, currentModule.filename);
            downloadFile(markdownContent, `${currentModule.id}-index.md`);
        }

    } catch (error) {
        console.error('Save error:', error);
        showToast('Save failed', 'error');
    }
}

// Save markdown file only
async function saveMarkdownFile() {
    console.log('💾 Saving markdown file...');

    const markdownInput = document.getElementById('markdown-input');
    if (!markdownInput || !currentMarkdownFile) {
        showToast('No markdown content to save', 'error');
        return;
    }

    try {
        const content = markdownInput.value;
        const saved = await saveToServer(content, currentMarkdownFile);

        if (saved) {
            showToast('Markdown file saved successfully', 'success');
        } else {
            downloadFile(content, currentMarkdownFile.split('/').pop());
        }

    } catch (error) {
        console.error('Markdown save error:', error);
        showToast('Markdown save failed', 'error');
    }
}

// Update markdown preview
function updateMarkdownPreview() {
    const markdownInput = document.getElementById('markdown-input');
    const preview = document.getElementById('markdown-preview');
    const tocPreview = document.getElementById('toc-preview');

    if (!markdownInput || !preview) return;

    const content = markdownInput.value;

    // Simple markdown to HTML conversion (basic)
    let html = content
        .replace(/^# (.*$)/gim, '<h1 id="heading-$1">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 id="heading-$1">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 id="heading-$1">$1</h3>')
        .replace(/^#### (.*$)/gim, '<h4 id="heading-$1">$1</h4>')
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
        .replace(/\*(.*)\*/gim, '<em>$1</em>')
        .replace(/`([^`]*)`/gim, '<code>$1</code>')
        .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
        .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')
        .replace(/\n/gim, '<br>');

    preview.innerHTML = html;

    // Generate Table of Contents
    if (tocPreview) {
        generateTableOfContents(content);
    }
}

// Generate Table of Contents
function generateTableOfContents(content) {
    const tocPreview = document.getElementById('toc-preview');
    if (!tocPreview) return;

    // Extract headings from markdown
    const headings = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        const match = line.match(/^(#{1,4})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const text = match[2].trim();
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

            headings.push({
                level,
                text,
                id,
                lineNumber: index + 1
            });
        }
    });

    if (headings.length === 0) {
        tocPreview.innerHTML = `
            <div class="toc-empty">
                <p>📝 No headings found</p>
                <button onclick="openTocEditor()" class="edit-toc-btn">✏️ Customize TOC</button>
            </div>
        `;
        return;
    }

    // Generate TOC HTML
    let tocHtml = '<div class="toc-header">';
    tocHtml += '<button onclick="openTocEditor()" class="edit-toc-btn" title="Customize Table of Contents">✏️</button>';
    tocHtml += '</div>';
    tocHtml += '<ul class="toc-list">';

    headings.forEach((heading, index) => {
        const indent = 'toc-level-' + heading.level;
        tocHtml += `
            <li class="${indent}">
                <a href="#heading-${heading.id}" class="toc-link" data-line="${heading.lineNumber}">
                    ${heading.text}
                </a>
                <div class="toc-actions">
                    <button onclick="moveTocItem(${index}, 'up')" class="toc-move-btn" title="Move Up">↑</button>
                    <button onclick="moveTocItem(${index}, 'down')" class="toc-move-btn" title="Move Down">↓</button>
                </div>
            </li>
        `;
    });

    tocHtml += '</ul>';
    tocPreview.innerHTML = tocHtml;
}

// Open TOC Editor Modal
function openTocEditor() {
    const modalHTML = `
        <div id="toc-editor-modal" class="modal-overlay">
            <div class="modal-content toc-editor-modal">
                <div class="modal-header">
                    <h3>📋 Table of Contents Editor</h3>
                    <button onclick="closeTocEditor()" class="modal-close">×</button>
                </div>

                <div class="modal-body">
                    <div class="toc-editor-info">
                        <p>💡 The TOC is automatically generated from markdown headings. You can:</p>
                        <ul>
                            <li>Reorder items using the arrow buttons</li>
                            <li>Add custom links to external pages</li>
                            <li>Hide specific headings from the TOC</li>
                        </ul>
                    </div>

                    <div class="toc-editor-actions">
                        <button onclick="addCustomTocItem()" class="add-toc-btn">+ Add Custom Link</button>
                        <button onclick="refreshToc()" class="refresh-toc-btn">🔄 Refresh TOC</button>
                    </div>

                    <div id="toc-editor-list" class="toc-editor-list">
                        <!-- TOC items will be populated here -->
                    </div>
                </div>

                <div class="modal-footer">
                    <button onclick="saveTocChanges()" class="save-btn">💾 Save Changes</button>
                    <button onclick="closeTocEditor()" class="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    populateTocEditor();
}

// Populate TOC Editor
function populateTocEditor() {
    const tocEditorList = document.getElementById('toc-editor-list');
    if (!tocEditorList) return;

    const markdownInput = document.getElementById('markdown-input');
    if (!markdownInput) return;

    const content = markdownInput.value;
    const lines = content.split('\n');

    let html = '<div class="toc-editor-items">';
    let headingIndex = 0;

    lines.forEach((line, lineIndex) => {
        const match = line.match(/^(#{1,4})\s+(.+)$/);
        if (match) {
            const level = match[1].length;
            const text = match[2].trim();
            const indent = 'level-' + level;

            html += `
                <div class="toc-editor-item ${indent}" data-line="${lineIndex}" data-heading-index="${headingIndex}">
                    <div class="toc-item-content">
                        <span class="toc-level-indicator">${'#'.repeat(level)}</span>
                        <input type="text" class="toc-text-input" value="${text}" data-original="${text}">
                        <input type="url" class="toc-url-input" placeholder="Custom URL (optional)">
                    </div>
                    <div class="toc-item-actions">
                        <button onclick="moveTocEditorItem(${headingIndex}, 'up')" class="move-btn" title="Move Up">↑</button>
                        <button onclick="moveTocEditorItem(${headingIndex}, 'down')" class="move-btn" title="Move Down">↓</button>
                        <button onclick="removeTocItem(${lineIndex})" class="remove-btn" title="Remove">×</button>
                    </div>
                </div>
            `;
            headingIndex++;
        }
    });

    if (headingIndex === 0) {
        html += '<div class="no-headings"><p>📝 No headings found in markdown. Add headings (# ## ### ####) to build a table of contents.</p></div>';
    }

    html += '</div>';
    tocEditorList.innerHTML = html;
}

// Move TOC item
function moveTocItem(index, direction) {
    console.log(`Moving TOC item ${index} ${direction}`);

    const markdownInput = document.getElementById('markdown-input');
    if (!markdownInput) return;

    const content = markdownInput.value;
    const lines = content.split('\n');

    // Find all heading lines
    const headingLines = [];
    lines.forEach((line, lineIndex) => {
        if (line.match(/^#{1,4}\s+/)) {
            headingLines.push({ content: line, lineIndex });
        }
    });

    if (index < 0 || index >= headingLines.length) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= headingLines.length) {
        showToast(`Cannot move ${direction} - already at ${direction === 'up' ? 'top' : 'bottom'}`, 'info');
        return;
    }

    // Swap the headings
    const currentHeading = headingLines[index];
    const targetHeading = headingLines[targetIndex];

    // Update the lines array
    lines[currentHeading.lineIndex] = targetHeading.content;
    lines[targetHeading.lineIndex] = currentHeading.content;

    // Update markdown
    markdownInput.value = lines.join('\n');
    updateMarkdownPreview();

    showToast(`Moved heading ${direction}`, 'success');
}

// Save TOC changes
function saveTocChanges() {
    const tocEditorItems = document.querySelectorAll('.toc-editor-item');
    const markdownInput = document.getElementById('markdown-input');

    if (!markdownInput) return;

    let content = markdownInput.value;
    const lines = content.split('\n');
    let hasChanges = false;

    // Update heading text from TOC editor
    tocEditorItems.forEach(item => {
        const lineIndex = parseInt(item.getAttribute('data-line'));
        const textInput = item.querySelector('.toc-text-input');
        const originalText = textInput.getAttribute('data-original');
        const newText = textInput.value.trim();

        if (newText !== originalText && lineIndex < lines.length) {
            const line = lines[lineIndex];
            const match = line.match(/^(#{1,4})\s+(.+)$/);
            if (match) {
                lines[lineIndex] = match[1] + ' ' + newText;
                hasChanges = true;
            }
        }
    });

    if (hasChanges) {
        markdownInput.value = lines.join('\n');
        updateMarkdownPreview();
        showToast('TOC changes saved successfully', 'success');
    } else {
        showToast('No changes to save', 'info');
    }

    closeTocEditor();
}

// Move TOC editor item
function moveTocEditorItem(headingIndex, direction) {
    console.log(`Moving TOC editor item ${headingIndex} ${direction}`);

    // Call the existing moveTocItem function
    moveTocItem(headingIndex, direction);

    // Refresh the TOC editor after the move
    setTimeout(() => {
        populateTocEditor();
    }, 100);
}

// Remove TOC item
function removeTocItem(lineIndex) {
    if (!confirm('Remove this heading from the markdown?')) return;

    const markdownInput = document.getElementById('markdown-input');
    if (!markdownInput) return;

    const lines = markdownInput.value.split('\n');

    if (lineIndex >= 0 && lineIndex < lines.length) {
        const removedHeading = lines[lineIndex];
        lines.splice(lineIndex, 1);

        markdownInput.value = lines.join('\n');
        updateMarkdownPreview();
        populateTocEditor(); // Refresh the TOC editor

        showToast('Heading removed from markdown', 'success');
    }
}

// Add custom TOC item
function addCustomTocItem() {
    const customText = prompt('Enter heading text:');
    if (!customText) return;

    const level = prompt('Enter heading level (1-4):', '2');
    const levelNum = parseInt(level);

    if (isNaN(levelNum) || levelNum < 1 || levelNum > 4) {
        showToast('Invalid heading level. Please use 1-4.', 'error');
        return;
    }

    const markdownInput = document.getElementById('markdown-input');
    if (!markdownInput) return;

    const headingMarkdown = '#'.repeat(levelNum) + ' ' + customText + '\n\n';
    markdownInput.value += headingMarkdown;

    updateMarkdownPreview();
    populateTocEditor(); // Refresh the TOC editor
      showToast('Custom heading added', 'success');
}

// Close TOC Editor
function closeTocEditor() {
    const modal = document.getElementById('toc-editor-modal');
    if (modal) modal.remove();
}

// Refresh TOC
function refreshToc() {
    updateMarkdownPreview();

    // If TOC editor is open, refresh it too
    const tocEditorList = document.getElementById('toc-editor-list');
    if (tocEditorList) {
        populateTocEditor();
    }

    showToast('Table of Contents refreshed', 'success');
}

// Toggle function manager (for compact view)
function toggleFunctionManager() {
    openFunctionManagerModal();
}

// Add new function (creates empty function and opens editor)
function addNewFunction(type) {
    console.log(`➕ Adding new ${type} function...`);

    if (!currentModuleData) {
        showToast('No module data available', 'error');
        return;
    }

    // Create empty function structure
    const newFunction = {
        name: '',
        description: '',
        syntax: '',
        parameters: [],
        returns: null,
        example: ''
    };

    // Add to appropriate array
    const functions = type === 'client' ? currentModuleData.clientFunctions : currentModuleData.serverFunctions;
    functions.push(newFunction);

    const newIndex = functions.length - 1;

    // Close function manager modal if it's open
    closeFunctionManagerModal();

    // Open editor for the new function
    openFunctionEditor(type, newIndex);

    showToast(`New ${type} function created`, 'success');
}

// Preview functions in markdown
function previewFunctionsInMarkdown() {
    console.log('👀 Previewing functions in markdown...');

    if (!currentModuleData) {
        showToast('No module data available', 'error');
        return;
    }

    // Generate markdown for all functions
    let functionsMarkdown = '\n## Functions\n\n';

    // Client functions
    if (currentModuleData.clientFunctions && currentModuleData.clientFunctions.length > 0) {
        functionsMarkdown += '### Client Functions\n\n';
        currentModuleData.clientFunctions.forEach(func => {
            functionsMarkdown += generateFunctionMarkdown(func, 'client');
        });
    }

    // Server functions
    if (currentModuleData.serverFunctions && currentModuleData.serverFunctions.length > 0) {
        functionsMarkdown += '### Server Functions\n\n';
        currentModuleData.serverFunctions.forEach(func => {
            functionsMarkdown += generateFunctionMarkdown(func, 'server');
        });
    }

    // Insert or update functions section in markdown
    const markdownInput = document.getElementById('markdown-input');
    if (markdownInput) {
        let content = markdownInput.value;

        // Remove existing functions section if it exists
        content = content.replace(/\n## Functions\n[\s\S]*?(?=\n## |$)/g, '');

        // Add new functions section at the end
        markdownInput.value = content + functionsMarkdown;

        // Update preview
        updateMarkdownPreview();

        showToast('Functions inserted into markdown', 'success');
    }

    // Close the function manager modal
    closeFunctionManagerModal();
}

// Generate markdown for a single function
function generateFunctionMarkdown(func, type) {
    let markdown = `#### ${func.name || 'Unnamed Function'}\n\n`;

    if (func.description) {
        markdown += `${func.description}\n\n`;
    }

    if (func.syntax) {
        markdown += `**Syntax:**\n\`\`\`lua\n${func.syntax}\n\`\`\`\n\n`;
    }

    if (func.parameters && func.parameters.length > 0) {
        markdown += '**Parameters:**\n';
        func.parameters.forEach(param => {
            markdown += `- \`${param.name}\` (${param.type || 'any'}): ${param.description || 'No description'}\n`;
        });
        markdown += '\n';
    }

    if (func.returns) {
        markdown += `**Returns:** ${func.returns}\n\n`;
    }

    if (func.example) {
        markdown += `**Example:**\n\`\`\`lua\n${func.example}\n\`\`\`\n\n`;
    }

    markdown += '---\n\n';
    return markdown;
}

// Close function editor
function closeFunctionEditor() {
    console.log('🔒 Closing function editor...');
    const modal = document.getElementById('function-editor-modal');
    if (modal) {
        modal.remove();
        console.log('✅ Function editor closed');
    }
}

// Make sure all functions are globally available (fix for modal buttons)
window.openFunctionEditor = openFunctionEditor;
window.closeFunctionEditor = closeFunctionEditor;
window.saveFunctionData = saveFunctionData;
window.addParameter = addParameter;
window.removeParameter = removeParameter;
window.openFunctionManagerModal = openFunctionManagerModal;
window.closeFunctionManagerModal = closeFunctionManagerModal;
window.toggleFunctionManager = toggleFunctionManager;
window.openTocEditor = openTocEditor;
window.closeTocEditor = closeTocEditor;
window.addCustomTocItem = addCustomTocItem;
window.saveTocChanges = saveTocChanges;
window.refreshToc = refreshToc;
window.moveTocItem = moveTocItem;
window.moveTocEditorItem = moveTocEditorItem;
window.removeTocItem = removeTocItem;
window.addNewFunction = addNewFunction;
window.editFunction = editFunction;
window.deleteFunction = deleteFunction;
window.previewFunctionsInMarkdown = previewFunctionsInMarkdown;

// Make original functions globally available
window.switchTab = switchTab;
window.createNewModule = createNewModule;
window.refreshModules = refreshModules;
window.toggleTheme = toggleTheme;
window.generateJSON = generateJSON;
window.saveModule = saveModule;
window.deleteFunction = deleteFunction;
window.previewFunctionsInMarkdown = previewFunctionsInMarkdown;
window.saveIntegratedModule = saveIntegratedModule;
window.saveMarkdownFile = saveMarkdownFile;

// Debug functions for testing
window.debugModal = function() {
    console.log('Testing modal functions...');
    console.log('closeFunctionEditor:', typeof window.closeFunctionEditor);
    console.log('saveFunctionData:', typeof window.saveFunctionData);
    console.log('closeTocEditor:', typeof window.closeTocEditor);
};

console.log('✅ Enhanced Module Builder with Integrated Editing loaded successfully');
console.log('🔧 All modal functions are now globally available');

// Call debug function to verify
setTimeout(() => {
    window.debugModal();
}, 1000);
