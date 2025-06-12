// Community Bridge Documentation Editor
// Handles both documentation (.md) and function metadata (.json) editing

class DocumentationEditor {
    constructor() {
        this.currentModule = null;
        this.currentDocumentation = null;
        this.currentFunctions = null;
        this.unsavedChanges = false;
        this.init();
    }

    async init() {
        await this.loadModules();
        this.setupEventListeners();
        this.initializeEditor();
        console.log('📖 Documentation Editor initialized');
    }    async loadModules() {
        try {
            // Try to load modules dynamically from server scan
            const scanResponse = await fetch('/api/scan-modules');
            if (scanResponse.ok) {
                const config = await scanResponse.json();
                this.populateModuleSelector(config.modules);
                console.log(`📦 Loaded ${config.modules.length} modules dynamically`);
                return;
            }
        } catch (error) {
            console.warn('Dynamic module loading failed, falling back to static config:', error);
        }

        try {
            // Fallback to static module configuration
            const configResponse = await fetch('/assets/js/module-config.js');
            const configText = await configResponse.text();

            // Extract MODULES_CONFIG from the file
            const configMatch = configText.match(/const MODULES_CONFIG = ({[\s\S]*?});/);
            if (configMatch) {
                const config = eval(`(${configMatch[1]})`);
                this.populateModuleSelector(config.modules);
                console.log(`📦 Loaded ${config.modules.length} modules from static config`);
            }
        } catch (error) {
            console.error('Failed to load modules:', error);
            this.showError('Failed to load module configuration');
        }
    }

    populateModuleSelector(modules) {
        const selector = document.getElementById('module-select');
        selector.innerHTML = '<option value="">Choose a module...</option>';

        modules.forEach(module => {
            const option = document.createElement('option');
            option.value = module.id;
            option.textContent = `${module.icon} ${module.name}`;
            option.dataset.hasJson = module.hasJson;
            option.dataset.hasDocs = module.hasDocs;
            selector.appendChild(option);
        });
    }

    setupEventListeners() {
        // Module selection
        document.getElementById('module-select').addEventListener('change', (e) => {
            if (e.target.value) {
                this.loadModule(e.target.value);
            }
        });

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Content editing
        document.getElementById('markdown-editor').addEventListener('input', () => {
            this.markUnsaved();
            this.updatePreview();
            this.updateTOC();
        });        // Form fields
        ['page-title', 'nav-order', 'permalink', 'has-children', 'layout'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => this.markUnsaved());
                if (element.type === 'checkbox') {
                    element.addEventListener('change', () => this.markUnsaved());
                }
            }
        });

        // Buttons
        document.getElementById('save-all').addEventListener('click', () => this.saveAll());
        document.getElementById('publish-github').addEventListener('click', () => this.publishToGitHub());
        document.getElementById('manage-functions').addEventListener('click', () => this.openFunctionManager());
        document.getElementById('toc-editor').addEventListener('click', () => this.openTOCEditor());
        document.getElementById('toc-refresh').addEventListener('click', () => this.updateTOC());
        document.getElementById('preview-toggle').addEventListener('click', () => this.switchTab('preview'));

        // Modal controls
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.target.closest('.modal-overlay').style.display = 'none';
            });
        });

        // Function manager
        document.getElementById('add-client-function').addEventListener('click', () => this.addFunction('client'));
        document.getElementById('add-server-function').addEventListener('click', () => this.addFunction('server'));
        document.getElementById('generate-docs').addEventListener('click', () => this.generateFunctionDocs());

        // TOC editor
        document.getElementById('auto-generate-toc').addEventListener('click', () => this.autoGenerateTOC());
        document.getElementById('add-custom-link').addEventListener('click', () => this.addCustomTOCLink());
        document.getElementById('save-toc').addEventListener('click', () => this.saveTOC());

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => this.toggleTheme());

        // Create new module
        document.getElementById('create-new-module').addEventListener('click', () => this.createNewModule());

        // Auto-save
        setInterval(() => {
            if (this.unsavedChanges && this.currentModule) {
                this.autoSave();
            }
        }, 30000); // Auto-save every 30 seconds
    }

    async loadModule(moduleId) {
        try {
            this.currentModule = moduleId;

            // Update UI
            this.updateModuleInfo(moduleId);
            this.updateStatus('loading');

            // Load documentation file
            await this.loadDocumentation(moduleId);

            // Load function metadata
            await this.loadFunctions(moduleId);

            // Update displays
            this.populateForm();
            this.updatePreview();
            this.updateTOC();
            this.updateFunctionCounts();
            this.updateStatus('loaded');

            console.log(`📄 Loaded module: ${moduleId}`);

        } catch (error) {
            console.error('Failed to load module:', error);
            this.showError(`Failed to load module: ${moduleId}`);
            this.updateStatus('error');
        }
    }    async loadDocumentation(moduleId) {
        try {
            // Try different possible locations for documentation files
            const possiblePaths = [
                `/../community_bridge/modules/${moduleId}/index.md`,  // Parent folder
                `/community_bridge/modules/${moduleId}/index.md`,     // Local folder
                `/assets/data/community_bridge/modules/${moduleId}/index.md`, // Assets folder
                `/modules/${moduleId}/index.md`                        // Direct modules folder
            ];

            let response = null;
            let successPath = null;

            for (const path of possiblePaths) {
                try {
                    response = await fetch(path);
                    if (response.ok) {
                        successPath = path;
                        break;
                    }
                } catch (e) {
                    continue; // Try next path
                }
            }

            if (response && response.ok) {
                const content = await response.text();
                this.currentDocumentation = this.parseMarkdownFile(content);
                document.getElementById('docs-status').className = 'status-indicator success';
                document.getElementById('docs-status').textContent = '●';
                console.log(`📄 Loaded documentation for ${moduleId} from ${successPath}`);
            } else {
                // Create new documentation
                this.currentDocumentation = this.createEmptyDocumentation(moduleId);
                document.getElementById('docs-status').className = 'status-indicator warning';
                document.getElementById('docs-status').textContent = '●';
                console.log(`📝 Created new documentation for ${moduleId} (no existing file found)`);
            }
        } catch (error) {
            console.error('Error loading documentation:', error);
            this.currentDocumentation = this.createEmptyDocumentation(moduleId);
            document.getElementById('docs-status').className = 'status-indicator error';
            document.getElementById('docs-status').textContent = '●';
        }
    }

    async loadFunctions(moduleId) {
        try {
            const response = await fetch(`/assets/data/${moduleId}.json`);

            if (response.ok) {
                this.currentFunctions = await response.json();
                document.getElementById('functions-status').className = 'status-indicator success';
                document.getElementById('functions-status').textContent = '●';
            } else {
                // Create new function metadata
                this.currentFunctions = this.createEmptyFunctions(moduleId);
                document.getElementById('functions-status').className = 'status-indicator warning';
                document.getElementById('functions-status').textContent = '●';
            }
        } catch (error) {
            console.error('Error loading functions:', error);
            this.currentFunctions = this.createEmptyFunctions(moduleId);
            document.getElementById('functions-status').className = 'status-indicator error';
            document.getElementById('functions-status').textContent = '●';
        }
    }

    parseMarkdownFile(content) {
        const lines = content.split('\n');
        let frontmatterEnd = -1;
        let frontmatter = {};

        // Parse frontmatter
        if (lines[0] === '---') {
            for (let i = 1; i < lines.length; i++) {
                if (lines[i] === '---') {
                    frontmatterEnd = i;
                    break;
                }
                const line = lines[i].trim();
                if (line && !line.startsWith('#')) {
                    const [key, ...valueParts] = line.split(':');
                    if (key && valueParts.length > 0) {
                        let value = valueParts.join(':').trim();

                        // Handle quoted strings
                        if ((value.startsWith('"') && value.endsWith('"')) ||
                            (value.startsWith("'") && value.endsWith("'"))) {
                            value = value.slice(1, -1);
                        }

                        // Handle booleans and numbers
                        if (value === 'true') value = true;
                        else if (value === 'false') value = false;
                        else if (!isNaN(value) && value !== '') value = Number(value);

                        frontmatter[key.trim()] = value;
                    }
                }
            }
        }

        // Get content after frontmatter
        const contentStart = frontmatterEnd > -1 ? frontmatterEnd + 1 : 0;
        const markdownContent = lines.slice(contentStart).join('\n').trim();

        return {
            frontmatter,
            content: markdownContent
        };
    }    createEmptyDocumentation(moduleId) {
        const moduleName = moduleId.charAt(0).toUpperCase() + moduleId.slice(1);

        return {
            frontmatter: {
                layout: 'default',
                title: `📦 ${moduleName}`,
                parent: 'Modules',
                grand_parent: 'Community Bridge',
                nav_order: 1,
                has_children: true,
                permalink: `/community_bridge/modules/${moduleId}/`
            },
            content: `# ${moduleName} Module
{: .no_toc }

Brief description of the ${moduleName} module.

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

The ${moduleName} module provides...

---

## 🚀 Getting Started

To use the ${moduleName} module...

---

## 📖 Functions

### Client Functions

Documentation for client-side functions...

### Server Functions

Documentation for server-side functions...`
        };
    }

    createEmptyFunctions(moduleId) {
        const moduleName = moduleId.charAt(0).toUpperCase() + moduleId.slice(1);

        return {
            name: moduleName,
            icon: '📦',
            description: `${moduleName} module description`,
            clientFunctions: [],
            serverFunctions: []
        };
    }    populateForm() {
        if (!this.currentDocumentation) return;

        const { frontmatter } = this.currentDocumentation;

        document.getElementById('page-title').value = frontmatter.title || '';
        document.getElementById('nav-order').value = frontmatter.nav_order || '';
        document.getElementById('permalink').value = frontmatter.permalink || '';
        document.getElementById('has-children').checked = frontmatter.has_children || false;
        document.getElementById('layout').value = frontmatter.layout || 'default';
        document.getElementById('markdown-editor').value = this.currentDocumentation.content || '';
    }

    updateModuleInfo(moduleId) {
        const option = document.querySelector(`option[value="${moduleId}"]`);
        if (option) {
            document.getElementById('module-title').textContent = option.textContent;
            document.getElementById('module-description').textContent =
                `Editing documentation and functions for the ${option.textContent.replace(/[📦🔑🎒👥📢📏🛒📊🎯♿👕💬🚨🔒🏗️⛽❓🏠⌨️🌐📋🔢📱📞🗝️🏷️🌤️]/g, '').trim()} module`;
        }
    }

    updateFunctionCounts() {
        if (!this.currentFunctions) return;

        const clientCount = this.currentFunctions.clientFunctions?.length || 0;
        const serverCount = this.currentFunctions.serverFunctions?.length || 0;

        document.getElementById('client-count').textContent = clientCount;
        document.getElementById('server-count').textContent = serverCount;
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

        // Update tab content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${tabName}-tab`).classList.add('active');

        // Update preview if switching to preview tab
        if (tabName === 'preview') {
            this.updatePreview();
        }
    }

    updatePreview() {
        const content = document.getElementById('markdown-editor').value;
        const preview = document.getElementById('markdown-preview');

        if (content) {
            // Simple markdown to HTML conversion (you can enhance this with a proper markdown parser)
            const html = this.parseMarkdown(content);
            preview.innerHTML = html;
        } else {
            preview.innerHTML = '<p>Preview will appear here when you start editing...</p>';
        }
    }

    parseMarkdown(markdown) {
        // Basic markdown parsing (replace with a proper parser like marked.js for production)
        let html = markdown
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/!\[([^\]]*)\]\(([^\)]*)\)/gim, '<img alt="$1" src="$2" />')
            .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2">$1</a>')
            .replace(/\n$/gim, '<br />')
            .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
            .replace(/`([^`]*)`/gim, '<code>$1</code>');

        return html.split('\n').map(line => {
            if (line.trim() === '') return '';
            if (line.startsWith('<h') || line.startsWith('<blockquote') ||
                line.startsWith('<pre') || line.startsWith('<img')) {
                return line;
            }
            return `<p>${line}</p>`;
        }).join('\n');
    }

    updateTOC() {
        const content = document.getElementById('markdown-editor').value;
        const tocContent = document.getElementById('toc-content');

        if (!content) {
            tocContent.innerHTML = '<p>TOC will be generated from your content...</p>';
            return;
        }

        const headings = this.extractHeadings(content);

        if (headings.length === 0) {
            tocContent.innerHTML = '<p>No headings found. Add headings to generate TOC.</p>';
            return;
        }

        const tocHTML = headings.map((heading, index) => `
            <div class="toc-item level-${heading.level}" data-line="${heading.line}">
                <span>${heading.text}</span>
                <div class="toc-actions">
                    <button class="toc-action-btn" onclick="documentationEditor.scrollToHeading(${heading.line})">👁️</button>
                    <button class="toc-action-btn" onclick="documentationEditor.editHeading(${index})">✏️</button>
                    <button class="toc-action-btn" onclick="documentationEditor.moveHeading(${index}, 'up')">↑</button>
                    <button class="toc-action-btn" onclick="documentationEditor.moveHeading(${index}, 'down')">↓</button>
                </div>
            </div>
        `).join('');

        tocContent.innerHTML = tocHTML;
    }

    extractHeadings(content) {
        const lines = content.split('\n');
        const headings = [];

        lines.forEach((line, index) => {
            const match = line.match(/^(#{1,6})\s+(.+)$/);
            if (match) {
                headings.push({
                    level: match[1].length,
                    text: match[2].trim(),
                    line: index,
                    raw: line
                });
            }
        });

        return headings;
    }

    markUnsaved() {
        this.unsavedChanges = true;
        document.title = '• Documentation Editor - Unsaved Changes';
    }

    updateStatus(status) {
        const indicators = document.querySelectorAll('.status-indicator');
        indicators.forEach(indicator => {
            indicator.className = `status-indicator ${status}`;
        });
    }

    async saveAll() {
        if (!this.currentModule) {
            this.showError('No module selected');
            return;
        }

        try {
            this.updateStatus('loading');

            // Collect form data
            const documentation = this.collectDocumentationData();
            const functions = this.currentFunctions;

            // Save documentation
            await this.saveDocumentation(this.currentModule, documentation);

            // Save functions
            await this.saveFunctions(this.currentModule, functions);

            this.unsavedChanges = false;
            document.title = 'Documentation Editor';
            this.updateStatus('success');
            this.showSuccess('All changes saved successfully!');

        } catch (error) {
            console.error('Save failed:', error);
            this.showError('Failed to save changes');
            this.updateStatus('error');
        }
    }    collectDocumentationData() {
        const frontmatter = {
            layout: document.getElementById('layout').value || 'default',
            title: document.getElementById('page-title').value,
            parent: 'Modules',
            grand_parent: 'Community Bridge',
            nav_order: parseInt(document.getElementById('nav-order').value) || 1,
            has_children: document.getElementById('has-children').checked,
            permalink: document.getElementById('permalink').value
        };

        const content = document.getElementById('markdown-editor').value;

        return { frontmatter, content };
    }async saveDocumentation(moduleId, documentation) {
        const { frontmatter, content } = documentation;

        // Build frontmatter string
        const frontmatterString = Object.entries(frontmatter)
            .map(([key, value]) => {
                if (typeof value === 'string' && (value.includes(' ') || value.includes(':') || value.includes('/') || value.includes('"'))) {
                    return `${key}: "${value.replace(/"/g, '\\"')}"`;
                }
                return `${key}: ${value}`;
            })
            .join('\n');

        const fullContent = `---\n${frontmatterString}\n---\n\n${content}`;

        // Try to save to the best available location
        const savePaths = [
            `/../community_bridge/modules/${moduleId}/index.md`,  // Parent folder (preferred)
            `/community_bridge/modules/${moduleId}/index.md`,     // Local folder
            `/assets/data/community_bridge/modules/${moduleId}/index.md` // Assets folder fallback
        ];

        let saved = false;
        let lastError = null;

        for (const path of savePaths) {
            try {
                const response = await fetch(path, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'text/plain' },
                    body: fullContent
                });

                if (response.ok) {
                    console.log(`💾 Saved documentation for ${moduleId} to ${path}`);
                    saved = true;
                    break;
                } else {
                    lastError = `HTTP ${response.status}: ${response.statusText}`;
                }
            } catch (error) {
                lastError = error.message;
                continue;
            }
        }

        if (!saved) {
            throw new Error(`Failed to save documentation: ${lastError}`);
        }
    }

    async saveFunctions(moduleId, functions) {
        const response = await fetch(`/assets/data/${moduleId}.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(functions, null, 2)
        });

        if (!response.ok) {
            throw new Error(`Failed to save functions: ${response.statusText}`);
        }
    }

    async autoSave() {
        if (this.currentModule && this.unsavedChanges) {
            try {
                await this.saveAll();
                console.log('📁 Auto-saved');
            } catch (error) {
                console.error('Auto-save failed:', error);
            }
        }
    }

    openFunctionManager() {
        document.getElementById('function-manager-modal').style.display = 'flex';
        this.populateFunctionsList();
    }

    populateFunctionsList() {
        const list = document.getElementById('functions-list');
        if (!this.currentFunctions) {
            list.innerHTML = '<p>No function data available</p>';
            return;
        }

        let html = '';

        // Client functions
        if (this.currentFunctions.clientFunctions && this.currentFunctions.clientFunctions.length > 0) {
            html += '<h4>👨‍💻 Client Functions</h4>';
            this.currentFunctions.clientFunctions.forEach((func, index) => {
                html += this.createFunctionItem(func, 'client', index);
            });
        }

        // Server functions
        if (this.currentFunctions.serverFunctions && this.currentFunctions.serverFunctions.length > 0) {
            html += '<h4>🖥️ Server Functions</h4>';
            this.currentFunctions.serverFunctions.forEach((func, index) => {
                html += this.createFunctionItem(func, 'server', index);
            });
        }

        if (html === '') {
            html = '<p>No functions defined. Use the buttons above to add some.</p>';
        }

        list.innerHTML = html;
    }

    createFunctionItem(func, type, index) {
        return `
            <div class="function-item">
                <div class="function-info">
                    <h4>${func.name || 'Unnamed Function'}</h4>
                    <p>${func.description || 'No description'}</p>
                </div>
                <div class="function-actions-btns">
                    <button class="btn-sm btn-edit" onclick="documentationEditor.editFunction('${type}', ${index})">✏️ Edit</button>
                    <button class="btn-sm btn-delete" onclick="documentationEditor.deleteFunction('${type}', ${index})">🗑️ Delete</button>
                </div>
            </div>
        `;
    }

    openTOCEditor() {
        document.getElementById('toc-editor-modal').style.display = 'flex';
        this.populateTOCEditor();
    }

    populateTOCEditor() {
        const content = document.getElementById('markdown-editor').value;
        const headings = this.extractHeadings(content);
        const tocItems = document.getElementById('toc-items');

        if (headings.length === 0) {
            tocItems.innerHTML = '<p>No headings found. Add headings to your content first.</p>';
            return;
        }

        const html = headings.map((heading, index) => `
            <div class="toc-editor-item">
                <div class="toc-item-info">
                    <input type="text" value="${heading.text}" data-index="${index}" class="toc-text-input">
                </div>
                <div class="toc-item-actions">
                    <button class="btn-sm" onclick="documentationEditor.moveTOCItem(${index}, 'up')">↑</button>
                    <button class="btn-sm" onclick="documentationEditor.moveTOCItem(${index}, 'down')">↓</button>
                    <button class="btn-sm btn-delete" onclick="documentationEditor.deleteTOCItem(${index})">×</button>
                </div>
            </div>
        `).join('');

        tocItems.innerHTML = html;
    }

    showSuccess(message) {
        // Simple toast notification
        const toast = document.createElement('div');
        toast.className = 'toast success';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3000);
    }

    showError(message) {
        const toast = document.createElement('div');
        toast.className = 'toast error';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--danger-color);
            color: white;
            padding: 1rem;
            border-radius: 0.5rem;
            z-index: 10001;
            animation: slideIn 0.3s ease;
        `;
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 5000);
    }

    initializeEditor() {
        // Set default theme
        if (localStorage.getItem('theme') === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            document.getElementById('theme-toggle').textContent = '☀️';
        }
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        document.documentElement.setAttribute('data-theme', newTheme);
        document.getElementById('theme-toggle').textContent = newTheme === 'dark' ? '☀️' : '🌙';
        localStorage.setItem('theme', newTheme);
    }

    async publishToGitHub() {
        // This would integrate with GitHub API
        this.showSuccess('GitHub integration coming soon!');
    }    // Function management methods
    addFunction(type) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="width: 600px;">
                <div class="modal-header">
                    <h3>Add ${type.charAt(0).toUpperCase() + type.slice(1)} Function</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="func-name">Function Name:</label>
                        <input type="text" id="func-name" placeholder="e.g., GiveKeys">
                        <small>The name of the function as it appears in the API</small>
                    </div>
                    <div class="form-group">
                        <label for="func-description">Description:</label>
                        <textarea id="func-description" rows="3" placeholder="Brief description of what this function does"></textarea>
                        <small>A clear description of the function's purpose</small>
                    </div>
                    <div class="form-group">
                        <label for="func-syntax">Syntax:</label>
                        <input type="text" id="func-syntax" placeholder="Bridge.${this.currentModule ? this.currentModule.charAt(0).toUpperCase() + this.currentModule.slice(1) : 'ModuleName'}.FunctionName(param1, param2)">
                        <small>How to call this function in code</small>
                    </div>
                    <div class="form-group">
                        <label for="func-example">Example Code:</label>
                        <textarea id="func-example" rows="6" placeholder="-- Example usage of this function\nlocal Bridge = exports['community_bridge']:Bridge()\nlocal result = Bridge.${this.currentModule ? this.currentModule.charAt(0).toUpperCase() + this.currentModule.slice(1) : 'ModuleName'}.FunctionName(value1, value2)"></textarea>
                        <small>Working example showing how to use the function</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="save-function" class="save-btn">Save Function</button>
                    <button class="modal-close cancel-btn">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event handlers
        modal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });

        modal.querySelector('#save-function').addEventListener('click', () => {
            const newFunction = {
                name: modal.querySelector('#func-name').value,
                description: modal.querySelector('#func-description').value,
                syntax: modal.querySelector('#func-syntax').value,
                parameters: [],
                returns: [],
                example: modal.querySelector('#func-example').value,
                behavior: []
            };

            if (newFunction.name && newFunction.description) {
                if (type === 'client') {
                    this.currentFunctions.clientFunctions.push(newFunction);
                } else {
                    this.currentFunctions.serverFunctions.push(newFunction);
                }

                this.updateFunctionCounts();
                this.populateFunctionsList();
                this.markUnsaved();
                this.showSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} function "${newFunction.name}" added successfully!`);
                document.body.removeChild(modal);
            } else {
                this.showError('Please fill in at least the function name and description');
            }
        });

        // Focus first input
        setTimeout(() => modal.querySelector('#func-name').focus(), 100);
    }
    editFunction(type, index) {
        const functions = type === 'client' ? this.currentFunctions.clientFunctions : this.currentFunctions.serverFunctions;
        const func = functions[index];

        if (!func) {
            this.showError('Function not found');
            return;
        }

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="width: 600px;">
                <div class="modal-header">
                    <h3>Edit ${type.charAt(0).toUpperCase() + type.slice(1)} Function</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="edit-func-name">Function Name:</label>
                        <input type="text" id="edit-func-name" value="${func.name || ''}" placeholder="e.g., GiveKeys">
                        <small>The name of the function as it appears in the API</small>
                    </div>
                    <div class="form-group">
                        <label for="edit-func-description">Description:</label>
                        <textarea id="edit-func-description" rows="3" placeholder="Brief description of what this function does">${func.description || ''}</textarea>
                        <small>A clear description of the function's purpose</small>
                    </div>
                    <div class="form-group">
                        <label for="edit-func-syntax">Syntax:</label>
                        <input type="text" id="edit-func-syntax" value="${func.syntax || ''}" placeholder="Bridge.ModuleName.FunctionName(param1, param2)">
                        <small>How to call this function in code</small>
                    </div>
                    <div class="form-group">
                        <label for="edit-func-example">Example Code:</label>
                        <textarea id="edit-func-example" rows="6" placeholder="-- Example usage of this function">${func.example || ''}</textarea>
                        <small>Working example showing how to use the function</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="update-function" class="save-btn">Update Function</button>
                    <button class="modal-close cancel-btn">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event handlers
        modal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });

        modal.querySelector('#update-function').addEventListener('click', () => {
            const updatedFunction = {
                ...func,
                name: modal.querySelector('#edit-func-name').value,
                description: modal.querySelector('#edit-func-description').value,
                syntax: modal.querySelector('#edit-func-syntax').value,
                example: modal.querySelector('#edit-func-example').value
            };

            if (updatedFunction.name && updatedFunction.description) {
                functions[index] = updatedFunction;
                this.populateFunctionsList();
                this.markUnsaved();
                this.showSuccess(`Function "${updatedFunction.name}" updated successfully!`);
                document.body.removeChild(modal);
            } else {
                this.showError('Please fill in at least the function name and description');
            }
        });

        // Focus first input
        setTimeout(() => modal.querySelector('#edit-func-name').focus(), 100);
    }
    deleteFunction(type, index) {
        if (!confirm(`Are you sure you want to delete this ${type} function?`)) {
            return;
        }

        if (type === 'client') {
            this.currentFunctions.clientFunctions.splice(index, 1);
        } else {
            this.currentFunctions.serverFunctions.splice(index, 1);
        }

        this.updateFunctionCounts();
        this.populateFunctionsList();
        this.markUnsaved();
        this.showSuccess(`${type.charAt(0).toUpperCase() + type.slice(1)} function deleted successfully!`);
    }
    generateFunctionDocs() {
        if (!this.currentFunctions || (!this.currentFunctions.clientFunctions?.length && !this.currentFunctions.serverFunctions?.length)) {
            this.showError('No functions defined to generate documentation from');
            return;
        }

        let generatedDocs = '';

        // Client Functions Section
        if (this.currentFunctions.clientFunctions?.length > 0) {
            generatedDocs += '\n## 👨‍💻 Client Functions\n\n';
            this.currentFunctions.clientFunctions.forEach(func => {
                generatedDocs += this.generateFunctionDocSection(func);
            });
        }

        // Server Functions Section
        if (this.currentFunctions.serverFunctions?.length > 0) {
            generatedDocs += '\n## 🖥️ Server Functions\n\n';
            this.currentFunctions.serverFunctions.forEach(func => {
                generatedDocs += this.generateFunctionDocSection(func);
            });
        }

        // Append to current content
        const currentContent = document.getElementById('markdown-editor').value;
        const newContent = currentContent + '\n' + generatedDocs;
        document.getElementById('markdown-editor').value = newContent;

        this.markUnsaved();
        this.updatePreview();
        this.updateTOC();
        this.showSuccess('Function documentation generated and appended to content!');
    }

    generateFunctionDocSection(func) {
        let section = `### ${func.name}\n\n`;

        if (func.description) {
            section += `${func.description}\n\n`;
        }

        if (func.syntax) {
            section += `**Syntax:**\n\`\`\`lua\n${func.syntax}\n\`\`\`\n\n`;
        }

        if (func.parameters && func.parameters.length > 0) {
            section += '**Parameters:**\n';
            func.parameters.forEach(param => {
                section += `- \`${param.name}\` (${param.type}): ${param.description}\n`;
            });
            section += '\n';
        }

        if (func.returns && func.returns.length > 0) {
            section += '**Returns:**\n';
            func.returns.forEach(ret => {
                section += `- ${ret.type}: ${ret.description}\n`;
            });
            section += '\n';
        }

        if (func.example) {
            section += `**Example:**\n\`\`\`lua\n${func.example}\n\`\`\`\n\n`;
        }

        if (func.behavior && func.behavior.length > 0) {
            section += '**System-Specific Behavior:**\n';
            func.behavior.forEach(behavior => {
                section += `- **${behavior.system}**: ${behavior.description}\n`;
            });
            section += '\n';
        }

        section += '---\n\n';
        return section;
    }
    autoGenerateTOC() { this.updateTOC(); this.showSuccess('TOC auto-generated!'); }
    addCustomTOCLink() { this.showSuccess('Custom TOC links - Feature coming soon!'); }
    saveTOC() { this.showSuccess('TOC saved!'); document.getElementById('toc-editor-modal').style.display = 'none'; }
    createNewModule() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content" style="width: 500px;">
                <div class="modal-header">
                    <h3>Create New Module</h3>
                    <button class="modal-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="new-module-id">Module ID:</label>
                        <input type="text" id="new-module-id" placeholder="e.g., vehiclekey">
                        <small>Lowercase, no spaces, used for filenames and URLs</small>
                    </div>
                    <div class="form-group">
                        <label for="new-module-name">Module Name:</label>
                        <input type="text" id="new-module-name" placeholder="e.g., Vehicle Key">
                        <small>Display name for the module</small>
                    </div>
                    <div class="form-group">
                        <label for="new-module-icon">Icon:</label>
                        <input type="text" id="new-module-icon" placeholder="🔑">
                        <small>Emoji or icon to represent the module</small>
                    </div>
                    <div class="form-group">
                        <label for="new-module-description">Description:</label>
                        <textarea id="new-module-description" rows="3" placeholder="Brief description of what this module does"></textarea>
                        <small>Short description of the module's purpose</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button id="create-module" class="save-btn">Create Module</button>
                    <button class="modal-close cancel-btn">Cancel</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Event handlers
        modal.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                document.body.removeChild(modal);
            });
        });

        // Auto-fill name from ID
        modal.querySelector('#new-module-id').addEventListener('input', (e) => {
            const id = e.target.value;
            const nameField = modal.querySelector('#new-module-name');
            if (!nameField.value) {
                nameField.value = id.charAt(0).toUpperCase() + id.slice(1).replace(/([A-Z])/g, ' $1');
            }
        });

        modal.querySelector('#create-module').addEventListener('click', async () => {
            const moduleId = modal.querySelector('#new-module-id').value.toLowerCase().trim();
            const moduleName = modal.querySelector('#new-module-name').value.trim();
            const moduleIcon = modal.querySelector('#new-module-icon').value.trim();
            const moduleDescription = modal.querySelector('#new-module-description').value.trim();

            if (!moduleId || !moduleName) {
                this.showError('Please fill in at least the Module ID and Name');
                return;
            }

            // Validate ID format
            if (!/^[a-z0-9]+$/.test(moduleId)) {
                this.showError('Module ID must be lowercase letters and numbers only');
                return;
            }

            try {
                // Create new module structure
                const newFunctions = {
                    name: moduleName,
                    icon: moduleIcon || '📦',
                    description: moduleDescription || `${moduleName} module description`,
                    clientFunctions: [],
                    serverFunctions: []
                };

                const newDocumentation = {
                    frontmatter: {
                        layout: 'default',
                        title: `${moduleIcon || '📦'} ${moduleName}`,
                        parent: 'Modules',
                        grand_parent: 'Community Bridge',
                        nav_order: 10,
                        has_children: true,
                        permalink: `/community_bridge/modules/${moduleId}/`
                    },
                    content: `# ${moduleName} Module
{: .no_toc }

${moduleDescription || `Brief description of the ${moduleName} module.`}

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## 📚 Overview

The ${moduleName} module provides...

---

## 🚀 Getting Started

To use the ${moduleName} module...

---

## 📖 Functions

### Client Functions

Documentation for client-side functions...

### Server Functions

Documentation for server-side functions...`
                };
                  // Save the new module files
                await this.saveFunctions(moduleId, newFunctions);
                await this.saveDocumentation(moduleId, newDocumentation);

                // Refresh the module list to include the new module
                await this.loadModules();

                // Select the new module in the dropdown
                const selector = document.getElementById('module-select');
                selector.value = moduleId;

                // Load the new module
                await this.loadModule(moduleId);

                this.showSuccess(`Module "${moduleName}" created successfully and is now loaded!`);
                document.body.removeChild(modal);

            } catch (error) {
                console.error('Failed to create module:', error);
                this.showError('Failed to create module. Check console for details.');
            }
        });

        // Focus first input
        setTimeout(() => modal.querySelector('#new-module-id').focus(), 100);
    }
    scrollToHeading(line) {
        const editor = document.getElementById('markdown-editor');
        const lines = editor.value.split('\n');

        // Calculate character position for the line
        let charPosition = 0;
        for (let i = 0; i < line && i < lines.length; i++) {
            charPosition += lines[i].length + 1; // +1 for newline
        }

        // Set cursor position and scroll to it
        editor.focus();
        editor.setSelectionRange(charPosition, charPosition + (lines[line]?.length || 0));

        // Scroll to make the line visible
        const lineHeight = 20; // Approximate line height
        const scrollTop = line * lineHeight;
        editor.scrollTop = Math.max(0, scrollTop - editor.clientHeight / 2);

        this.showSuccess(`Jumped to line ${line + 1}`);
    }
    editHeading(index) { this.showSuccess('Edit heading - Feature coming soon!'); }
    moveHeading(index, direction) { this.showSuccess('Move heading - Feature coming soon!'); }
    moveTOCItem(index, direction) { this.showSuccess('Move TOC item - Feature coming soon!'); }
    deleteTOCItem(index) { this.showSuccess('Delete TOC item - Feature coming soon!'); }
}

// Initialize when DOM is loaded
let documentationEditor;
document.addEventListener('DOMContentLoaded', () => {
    documentationEditor = new DocumentationEditor();
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);
