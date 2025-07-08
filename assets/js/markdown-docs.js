// Community Bridge Documentation Site - Markdown Enhanced Version (Clean)
class CommunityBridgeDocumentation {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.currentModule = null;
        this.allModules = {};
        this.searchIndex = [];
        this.isLoading = false;
        this.currentModuleToc = null;
        this.currentModuleName = null;

        this.init();
    }

    async init() {
        console.log('🚀 Initializing Community Bridge Documentation...');

        try {
            this.setupTheme();
            this.setupBasicEventListeners();
            await this.loadModuleStructure();
            this.setupRouter();
            this.loadInitialContent();
            console.log('✅ Initialization complete!');
        } catch (error) {
            console.error('❌ Initialization failed:', error);
            this.showError('Failed to initialize documentation site');
        }
    }

    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = this.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        }
    }

    setupBasicEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        this.setupSearchInput();
    }

    setupSearchInput() {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            const newSearchInput = searchInput.cloneNode(true);
            searchInput.parentNode.replaceChild(newSearchInput, searchInput);

            newSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim();
                if (query.length > 0) {
                    this.handleSearch(query);
                } else {
                    this.hideSearchResults();
                }
            });

            newSearchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hideSearchResults();
                    e.target.blur();
                }
            });

            console.log('🔍 Search input configured');
        } else {
            console.warn('⚠️ Search input not found');
        }
    }

    setupNavigationEvents() {
        console.log('🎯 Setting up navigation click handlers...');

        const sectionHeaders = document.querySelectorAll('.nav-section-header');
        console.log('📂 Found section headers:', sectionHeaders.length);

        sectionHeaders.forEach((header) => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                const section = header.closest('.nav-section');
                if (section) {
                    section.classList.toggle('collapsed');
                    section.classList.toggle('expanded');
                    const arrow = header.querySelector('.nav-arrow');
                    if (arrow) {
                        arrow.textContent = section.classList.contains('expanded') ? '▼' : '▶';
                    }
                }
            });
        });

        const subsectionHeaders = document.querySelectorAll('.nav-subsection-header');
        console.log('📦 Found subsection headers:', subsectionHeaders.length);

        subsectionHeaders.forEach((header) => {
            header.addEventListener('click', (e) => {
                e.preventDefault();
                const subsection = header.closest('.nav-subsection');
                if (subsection) {
                    subsection.classList.toggle('collapsed');
                    subsection.classList.toggle('expanded');
                    const arrow = header.querySelector('.nav-arrow');
                    if (arrow) {
                        arrow.textContent = subsection.classList.contains('expanded') ? '▼' : '▶';
                    }
                }
            });
        });

        const navItems = document.querySelectorAll('.nav-item');
        console.log('🔗 Found nav items:', navItems.length);

        navItems.forEach((navItem) => {
            navItem.addEventListener('click', (e) => {
                e.preventDefault();
                const path = navItem.getAttribute('data-path');
                const type = navItem.getAttribute('data-type');

                if (path) {
                    console.log('📄 Nav item clicked:', path, type);
                    this.navigateToPath(path);
                }
            });
        });

        console.log('✅ Navigation events attached successfully');
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);

        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = this.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        }
    }

    async loadModuleStructure() {
        console.log('📋 Starting loadModuleStructure...');
        this.setLoading(true);

        try {
            console.log('🔍 Starting discoverPagesStructure...');
            const structure = await this.discoverPagesStructure();

            this.allModules = structure;
            console.log('📋 Module structure loaded:', this.allModules);

            this.renderNavigation();
            await this.buildSearchIndex();

            console.log('✅ Module structure loaded successfully');
        } catch (error) {
            console.error('❌ Error loading module structure:', error);
            this.showError('Failed to load documentation structure');
        } finally {
            this.setLoading(false);
        }
    }

    async discoverPagesStructure() {
        console.log('🔍 Starting discoverPagesStructure...');
        const structure = {};

        try {
            // Create Community Bridge structure
            structure['Community Bridge'] = {
                icon: '🌉',
                items: {},
                type: 'section'
            };

            // Add top-level Community Bridge files
            const topLevelFiles = ['overview', 'getting-started'];
            for (const fileName of topLevelFiles) {
                try {
                    const response = await fetch(`./assets/pages/Community Bridge/${fileName}.md`);
                    if (response.ok) {
                        structure['Community Bridge'].items[fileName] = {
                            path: `Community Bridge/${fileName}`,
                            type: 'markdown',
                            name: this.formatTitle(fileName)
                        };
                        console.log(`✅ Found top-level file: ${fileName}.md`);
                    }
                } catch (e) {
                    // File doesn't exist, continue
                }
            }

            // Discover Libraries and Modules
            await this.discoverSubsection(structure, 'Libraries', '📚');
            await this.discoverSubsection(structure, 'Modules', '📦');

        } catch (error) {
            console.error('❌ Error in discoverPagesStructure:', error);
        }

        return structure;
    }

    async discoverSubsection(structure, folderName, folderIcon) {
        console.log(`🔍 Discovering ${folderName} content...`);

        const folderItems = {};
        const knownModules = {
            'Libraries': ['Anim', 'Batch', 'Cache', 'Callback', 'Cutscenes', 'DUI', 'Entities', 'Generators', 'Ids', 'Logs', 'Markers', 'Math', 'Particles', 'Placers', 'Point', 'Points', 'Raycast', 'Scaleform', 'Shells', 'SQL', 'StateBags', 'Table', 'Utility'],
            'Modules': ['Banking', 'Clothing', 'Dialogue', 'Dispatch', 'Doorlock', 'Framework', 'Fuel', 'HelpText', 'Housing', 'Input', 'Inventory', 'Locales', 'Managment', 'Math', 'Menu', 'Notify', 'Phone', 'ProgressBar', 'Shops', 'Skills', 'Target', 'VehicleKey', 'Version', 'Weather']
        };

        if (knownModules[folderName]) {
            for (const moduleName of knownModules[folderName]) {
                try {
                    // Try the main pattern: Libraries/Anim/anim.md
                    const mainPath = `./assets/pages/Community Bridge/${folderName}/${moduleName}/${moduleName.toLowerCase()}.md`;
                    const response = await fetch(mainPath);
                    if (response.ok) {
                        folderItems[moduleName] = {
                            path: `Community Bridge/${folderName}/${moduleName}/${moduleName.toLowerCase()}`,
                            type: 'markdown',
                            name: moduleName
                        };
                        console.log(`✅ Found module: ${folderName}/${moduleName}/${moduleName.toLowerCase()}.md`);
                    }
                } catch (e) {
                    // File doesn't exist, continue
                }
            }
        }

        if (Object.keys(folderItems).length > 0) {
            structure['Community Bridge'].items[folderName] = {
                icon: folderIcon,
                items: folderItems,
                type: 'subsection',
                name: folderName
            };
            console.log(`✅ Added ${folderName} subsection with ${Object.keys(folderItems).length} items`);
        }
    }

    renderNavigation() {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) {
            console.error('❌ Navigation menu element not found');
            return;
        }

        let html = '';

        for (const [categoryName, categoryData] of Object.entries(this.allModules)) {
            html += `
                <div class="nav-section expanded" data-category="${categoryName}">
                    <div class="nav-section-header" data-category="${categoryName}">
                        <span class="nav-icon">${categoryData.icon || '📁'}</span>
                        <span class="nav-title">${categoryName}</span>
                        <span class="nav-arrow">▼</span>
                    </div>
                    <div class="nav-section-content">
                        ${this.renderNavItems(categoryData.items || {})}
                    </div>
                </div>
            `;
        }

        navMenu.innerHTML = html;

        // IMPORTANT: Set up navigation events AFTER rendering
        this.setupNavigationEvents();

        console.log('🎨 Navigation rendered successfully');
    }

    renderNavItems(items) {
        let html = '';

        for (const [itemName, itemData] of Object.entries(items)) {
            if (itemData.type === 'subsection' && itemData.items) {
                html += `
                    <div class="nav-subsection collapsed" data-subsection="${itemName}">
                        <div class="nav-subsection-header" data-subsection="${itemName}">
                            <span class="nav-icon">${itemData.icon || '📁'}</span>
                            <span class="nav-title">${itemName}</span>
                            <span class="nav-arrow">▶</span>
                        </div>
                        <div class="nav-subsection-content">
                            ${this.renderNavItems(itemData.items)}
                        </div>
                    </div>
                `;
            } else if (itemData.type === 'markdown') {
                html += `
                    <div class="nav-item" data-path="${itemData.path}" data-type="markdown">
                        <span class="nav-icon">📄</span>
                        <span class="nav-title">${itemData.name || this.formatTitle(itemName)}</span>
                    </div>
                `;
            }
        }

        return html;
    }

    setupRouter() {
        window.addEventListener('hashchange', () => this.handleRouteChange());
    }

    handleRouteChange() {
        const hash = window.location.hash.slice(1);
        if (hash) {
            this.navigateToPath(hash);
        }
    }

    async navigateToPath(path) {
        console.log('🎯 Navigating to:', path);
        const item = this.findNavigationItem(path);
        if (item) {
            await this.loadContent(path, item.type, item);
        } else {
            console.warn('⚠️ Could not find navigation item for path:', path);
            this.showError(`Page not found: ${path}`);
        }
    }

    findNavigationItem(targetPath) {
        const searchItems = (items) => {
            for (const [key, item] of Object.entries(items)) {
                const itemPath = item.path ? item.path.replace('.md', '') : '';
                if (itemPath === targetPath) {
                    return item;
                } else if (item.items) {
                    const found = searchItems(item.items);
                    if (found) return found;
                }
            }
            return null;
        };

        for (const [category, categoryData] of Object.entries(this.allModules)) {
            const found = searchItems(categoryData.items || {});
            if (found) return found;
        }
        return null;
    }

    async loadContent(path, type, item) {
        this.setLoading(true);

        try {
            console.log(`📄 Loading content for: ${path}`);

            // Try to load markdown content
            const markdownContent = await this.loadMarkdownContent(path);

            // Set current module info
            this.currentModule = item;
            this.currentModuleName = path.split('/').pop();

            // Render the content
            this.renderMarkdownContent(markdownContent, path);

            console.log(`✅ Content loaded successfully for: ${path}`);
        } catch (error) {
            console.error(`❌ Error loading content for ${path}:`, error);
            this.showError(`Failed to load content for: ${path}`);
        } finally {
            this.setLoading(false);
        }
    }

    async loadMarkdownContent(path) {
        try {
            console.log(`📄 Loading markdown content: ${path}`);
            const response = await fetch(`./assets/pages/${path}.md`);

            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.status}`);
            }

            const content = await response.text();

            return {
                content: content,
                meta: this.parseMarkdownMeta(content)
            };
        } catch (error) {
            console.error(`❌ Error loading markdown content for ${path}:`, error);
            throw error;
        }
    }

    parseMarkdownMeta(content) {
        const meta = {};
        const metaMatch = content.match(/<!--META\s*([\s\S]*?)\s*-->/);
        if (metaMatch) {
            const metaContent = metaMatch[1];
            const lines = metaContent.split('\n');

            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed.includes(':')) {
                    const [key, ...valueParts] = trimmed.split(':');
                    const value = valueParts.join(':').trim();

                    if (value === 'true' || value === 'false') {
                        meta[key.trim()] = value === 'true';
                    } else {
                        meta[key.trim()] = value;
                    }
                }
            }
        }

        return meta;
    }

    renderMarkdownContent(markdownData, modulePath) {
        const contentArea = document.getElementById('content-area');
        if (!contentArea) return;

        // Parse functions from markdown
        const functions = this.parseFunctionsFromMarkdown(markdownData.content);

        // Convert markdown to HTML (basic conversion)
        let html = this.convertMarkdownToHTML(markdownData.content);

        // Add functions section if functions exist
        if (functions.length > 0) {
            html += '<h2 id="functions-section">Functions</h2>';
            html += functions.map(func => this.renderFunction(func, func.side, this.currentModuleName)).join('');
        }

        // Set content
        contentArea.innerHTML = html;

        // Trigger syntax highlighting with highlight.js
        setTimeout(() => {
            if (typeof hljs !== 'undefined') {
                // Find all code blocks and highlight them
                const codeBlocks = contentArea.querySelectorAll('pre code');
                codeBlocks.forEach(block => {
                    hljs.highlightElement(block);
                });
            }
        }, 50);

        // Update current module info
        this.currentModule = markdownData;
        this.currentModuleName = modulePath.split('/').pop();

        // Generate and render TOC if needed
        this.updateTableOfContents(functions);

        // Setup syntax highlighting
        this.applySyntaxHighlighting();

        // Setup copy buttons
        this.setupCopyLinkButtons();
    }

    parseFunctionsFromMarkdown(markdown) {
        console.log('🔧 Parsing functions from markdown...');
        console.log('📄 Markdown content length:', markdown.length);

        const functions = [];

        // Parse markdown function documentation using headers and structured content
        // Look for function patterns like:
        // ## FunctionName (Client/Server/Shared)
        // ### Description
        // ### Syntax
        // ### Parameters
        // ### Returns
        // ### Example

        const sections = this.splitMarkdownBySections(markdown);

        for (const section of sections) {
            const func = this.parseMarkdownFunctionSection(section);
            if (func) {
                functions.push(func);
            }
        }

        console.log(`✅ Successfully parsed functions: ${functions.length}`);
        return functions;
    }

    splitMarkdownBySections(markdown) {
        // Split markdown by ## headers (function definitions)
        const sections = [];
        const lines = markdown.split('\n');
        let currentSection = [];

        for (const line of lines) {
            if (line.match(/^##\s+\w+.*\((Client|Server|Shared)\)/i)) {
                if (currentSection.length > 0) {
                    sections.push(currentSection.join('\n'));
                }
                currentSection = [line];
            } else {
                currentSection.push(line);
            }
        }

        if (currentSection.length > 0) {
            sections.push(currentSection.join('\n'));
        }

        return sections;
    }

    parseMarkdownFunctionSection(section) {
        const lines = section.split('\n');
        const headerLine = lines[0];

        // Parse function header: ## FunctionName (Client/Server/Shared)
        const headerMatch = headerLine.match(/^##\s+(\w+).*\((Client|Server|Shared)\)/i);
        if (!headerMatch) {
            return null;
        }

        const name = headerMatch[1];
        const side = headerMatch[2].toLowerCase();

        const func = {
            name: name,
            side: side,
            description: '',
            syntax: '',
            parameters: [],
            returns: [],
            example: ''
        };

        let currentSection = 'description';
        let currentContent = [];

        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];

            if (line.match(/^###\s+Description/i)) {
                currentSection = 'description';
                currentContent = [];
            } else if (line.match(/^###\s+Syntax/i)) {
                if (currentContent.length > 0) {
                    func.description = currentContent.join('\n').trim();
                }
                currentSection = 'syntax';
                currentContent = [];
            } else if (line.match(/^###\s+Parameters/i)) {
                if (currentContent.length > 0 && currentSection === 'syntax') {
                    func.syntax = this.extractCodeFromContent(currentContent.join('\n'));
                }
                currentSection = 'parameters';
                currentContent = [];
            } else if (line.match(/^###\s+Returns/i)) {
                if (currentContent.length > 0 && currentSection === 'parameters') {
                    func.parameters = this.parseParametersFromMarkdown(currentContent.join('\n'));
                }
                currentSection = 'returns';
                currentContent = [];
            } else if (line.match(/^###\s+Example/i)) {
                if (currentContent.length > 0 && currentSection === 'returns') {
                    func.returns = this.parseReturnsFromMarkdown(currentContent.join('\n'));
                } else if (currentContent.length > 0 && currentSection === 'parameters') {
                    func.parameters = this.parseParametersFromMarkdown(currentContent.join('\n'));
                }
                currentSection = 'example';
                currentContent = [];
            } else if (line.trim() !== '') {
                currentContent.push(line);
            }
        }

        // Handle the last section
        if (currentContent.length > 0) {
            switch (currentSection) {
                case 'description':
                    func.description = currentContent.join('\n').trim();
                    break;
                case 'syntax':
                    func.syntax = this.extractCodeFromContent(currentContent.join('\n'));
                    break;
                case 'parameters':
                    func.parameters = this.parseParametersFromMarkdown(currentContent.join('\n'));
                    break;
                case 'returns':
                    func.returns = this.parseReturnsFromMarkdown(currentContent.join('\n'));
                    break;
                case 'example':
                    func.example = this.extractCodeFromContent(currentContent.join('\n'));
                    break;
            }
        }

        return func;
    }

    extractCodeFromContent(content) {
        // Extract code from markdown code blocks
        const codeBlockMatch = content.match(/```(?:lua|javascript|js)?\s*([\s\S]*?)\s*```/);
        if (codeBlockMatch) {
            return codeBlockMatch[1].trim();
        }

        // Extract code from inline code
        const inlineCodeMatch = content.match(/`([^`]+)`/);
        if (inlineCodeMatch) {
            return inlineCodeMatch[1];
        }

        // Return plain text if no code blocks found
        return content.trim();
    }

    parseParametersFromMarkdown(content) {
        const parameters = [];

        // Look for list items with parameter information
        // Format: - **paramName** (type): description
        const paramRegex = /[-*]\s*\*\*(\w+)\*\*\s*\(([^)]+)\):\s*(.+)/gi;
        let match;

        while ((match = paramRegex.exec(content)) !== null) {
            parameters.push({
                name: match[1],
                type: match[2].trim(),
                description: match[3].trim()
            });
        }

        // Alternative format: - paramName (type) - description
        if (parameters.length === 0) {
            const altParamRegex = /[-*]\s*(\w+)\s*\(([^)]+)\)\s*[-–—]\s*(.+)/gi;
            while ((match = altParamRegex.exec(content)) !== null) {
                parameters.push({
                    name: match[1],
                    type: match[2].trim(),
                    description: match[3].trim()
                });
            }
        }

        return parameters;
    }

    parseReturnsFromMarkdown(content) {
        const returns = [];

        // Look for return type information
        // Format: - (type): description
        const returnRegex = /[-*]\s*\(([^)]+)\):\s*(.+)/gi;
        let match;

        while ((match = returnRegex.exec(content)) !== null) {
            returns.push({
                type: match[1].trim(),
                description: match[2].trim()
            });
        }

        // Alternative format: Returns type - description
        if (returns.length === 0) {
            const altReturnRegex = /Returns?\s+(\w+)\s*[-–—]\s*(.+)/gi;
            while ((match = altReturnRegex.exec(content)) !== null) {
                returns.push({
                    type: match[1],
                    description: match[2].trim()
                });
            }
        }

        return returns;
    }

    convertMarkdownToHTML(markdown) {
        // Remove function sections before rendering regular markdown content
        // Function sections will be rendered separately as cards
        let cleanMarkdown = markdown;

        // Remove function sections (## FunctionName (Side) ... until next non-function ## or end)
        // Split by lines and filter out function sections
        const lines = markdown.split('\n');
        const cleanLines = [];
        let inFunctionSection = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Check if this line starts a function section
            if (line.match(/^##\s+\w+.*\((Client|Server|Shared)\)/i)) {
                inFunctionSection = true;
                continue;
            }

            // Check if this line starts a non-function section (like ## Overview)
            if (line.match(/^##\s+/) && !line.match(/\((Client|Server|Shared)\)/i)) {
                inFunctionSection = false;
                cleanLines.push(line);
                continue;
            }

            // If we're not in a function section, keep the line
            if (!inFunctionSection) {
                cleanLines.push(line);
            }
        }

        cleanMarkdown = cleanLines.join('\n');

        // Also remove any standalone old format headers that might have been missed
        cleanMarkdown = cleanMarkdown.replace(/^## (Client|Server|Shared) Functions\s*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^### \w+\s*$/gm, '');  // Remove standalone ### headers outside functions

        // More aggressive cleaning of leftover content
        cleanMarkdown = cleanMarkdown.replace(/^Context:.*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^Syntax:.*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^Parameters:.*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^Returns:.*$/gm, '');
        cleanMarkdown = cleanMarkdown.replace(/^Example:.*$/gm, '');

        // Remove META comments
        let html = cleanMarkdown.replace(/<!--META[\s\S]*?-->/g, '');

        // Remove TOC comments
        html = html.replace(/<!--TOC:[\s\S]*?-->/g, '');

        // Convert headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Convert code blocks
        html = html.replace(/```lua\n([\s\S]*?)\n```/g, '<div class="code-block-container"><button class="copy-button">Copy</button><pre><code class="lua">$1</code></pre></div>');
        html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<div class="code-block-container"><button class="copy-button">Copy</button><pre><code class="$1">$2</code></pre></div>');

        // Convert inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Convert bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        // Convert unordered lists
        html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
        html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

        // Convert paragraphs
        html = html.split('\n\n').map(p => {
            p = p.trim();
            if (!p) return '';
            if (p.startsWith('<h') || p.startsWith('<div') || p.startsWith('<ul') || p.startsWith('<pre')) {
                return p;
            }
            return `<p>${p}</p>`;
        }).join('');

        // Clean up
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>\s*<h/g, '<h');
        html = html.replace(/<\/h([1-6])>\s*<\/p>/g, '</h$1>');
        html = html.replace(/<p>\s*<div/g, '<div');
        html = html.replace(/<\/div>\s*<\/p>/g, '</div>');
        html = html.replace(/<p>\s*<ul/g, '<ul');
        html = html.replace(/<\/ul>\s*<\/p>/g, '</ul>');

        return html;
    }

    renderFunction(func, side, moduleName = 'unknown') {
        const anchor = this.generateAnchor(func.name, side, moduleName);

        const parameters = func.parameters?.map(p => `
            <li>
                <code>${p.name}</code>
                <span class="param-type">(${p.type})</span>
                ${p.optional ? '<span class="param-optional">optional</span>' : ''}
                - <span class="param-desc">${p.description}</span>
            </li>`).join('') || '<li>None</li>';

        const returns = func.returns?.map(r => `
            <li>
                <span class="param-type">(${r.type})</span>
                - <span class="param-desc">${r.description}</span>
            </li>`).join('') || '<li>None</li>';

        const example = func.example ?
            `<div class="code-block-container">
                <button class="copy-button">Copy</button>
                <pre><code class="lua">${Array.isArray(func.example) ? func.example.join('\n') : func.example}</code></pre>
            </div>` : '<p>No example provided.</p>';

        return `
            <div class="function-card" id="${anchor}">
                <div class="function-header">
                    <span class="function-name">${func.name}</span>
                    <div class="function-meta">
                        <span class="function-side ${side}">${side}</span>
                        <button class="copy-link-btn" title="Copy Link" data-anchor="${anchor}">🔗</button>
                    </div>
                </div>
                <div class="function-body">
                    <p class="function-description">${func.description || 'No description provided.'}</p>
                    <h4>Parameters</h4>
                    <ul class="param-list">${parameters}</ul>
                    <h4>Returns</h4>
                    <ul class="param-list">${returns}</ul>
                    <h4>Example</h4>
                    ${example}
                </div>
            </div>
        `;
    }

    generateAnchor(name, side, module) {
        return `${name}-${side}-${module}`.toLowerCase().replace(/[^a-z0-9-]/g, '');
    }

    updateTableOfContents(functions = []) {
        const tocContainer = document.getElementById('toc-container');
        const tocContent = document.getElementById('toc-content');

        if (!tocContainer || !tocContent) return;

        if (functions.length === 0) {
            tocContainer.style.display = 'none';
            return;
        }

        // Generate TOC from functions
        const tocHtml = functions.map(func => {
            const anchor = this.generateAnchor(func.name, func.side, this.currentModuleName);
            return `<li><a href="#${anchor}" class="toc-link">${func.name}</a></li>`;
        }).join('');

        tocContent.innerHTML = `<ul class="toc-list">${tocHtml}</ul>`;
        tocContainer.style.display = 'block';

        // Add click handlers
        this.addTocClickHandlers(tocContainer);
    }

    addTocClickHandlers(tocContainer) {
        tocContainer.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const anchorId = link.getAttribute('href').substring(1);
                const element = document.getElementById(anchorId);
                if (element) {
                    this.scrollToElement(element);
                }
            });
        });
    }

    scrollToElement(element) {
        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 60;
        const additionalOffset = 20;
        const totalOffset = headerHeight + additionalOffset;

        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - totalOffset;

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });

        console.log(`📍 Scrolled to element with ${totalOffset}px offset`);
    }

    async buildSearchIndex() {
        this.searchIndex = [];

        const addToIndex = (item, path, category) => {
            if (item.type === 'markdown') {
                this.searchIndex.push({
                    name: item.name || path.split('/').pop(),
                    path: path,
                    category: category,
                    type: 'module',
                    description: item.meta?.description || ''
                });
            } else if (item.type === 'subsection' && item.items) {
                Object.keys(item.items).forEach(key => {
                    addToIndex(item.items[key], `${path}/${key}`, category);
                });
            }
        };

        Object.keys(this.allModules).forEach(category => {
            const categoryData = this.allModules[category];
            if (categoryData.items) {
                Object.keys(categoryData.items).forEach(key => {
                    addToIndex(categoryData.items[key], `${category}/${key}`, category);
                });
            }
        });

        console.log('🔍 Search index built:', this.searchIndex.length, 'items');
    }

    handleSearch(query) {
        if (!query.trim()) {
            this.hideSearchResults();
            return;
        }

        const results = this.searchIndex.filter(item => {
            const searchText = `${item.name} ${item.description}`.toLowerCase();
            return searchText.includes(query.toLowerCase());
        });

        this.showSearchResults(results, query);
    }

    showSearchResults(results, searchTerm) {
        const searchResults = document.querySelector('.search-results');
        if (!searchResults) return;

        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="search-results-container">
                    <h3>No results found for "${searchTerm}"</h3>
                    <p>Try a different search term or browse the navigation.</p>
                </div>
            `;
        } else {
            const resultsHtml = results.map(result => `
                <div class="search-result-item" onclick="window.app.navigateToPath('${result.path}')">
                    <h4>${result.name}</h4>
                    <p class="result-path">${result.category} → ${result.path}</p>
                    <p class="result-description">${result.description}</p>
                </div>
            `).join('');

            searchResults.innerHTML = `
                <div class="search-results-container">
                    <h3>Search Results for "${searchTerm}" (${results.length})</h3>
                    ${resultsHtml}
                </div>
            `;
        }

        searchResults.style.display = 'block';
    }

    hideSearchResults() {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }

    applySyntaxHighlighting() {
        document.querySelectorAll('code.language-lua').forEach(codeElement => {
            this.applyLuaSyntaxHighlighting(codeElement);
        });
    }

    applyLuaSyntaxHighlighting(codeElement) {
        let content = codeElement.textContent;

        const keywords = ['local', 'function', 'end', 'if', 'then', 'else', 'elseif', 'for', 'while', 'do', 'repeat', 'until', 'return', 'break', 'true', 'false', 'nil'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
            content = content.replace(regex, `<span class="keyword">$1</span>`);
        });

        content = content.replace(/"([^"]*?)"/g, '<span class="string">"$1"</span>');
        content = content.replace(/'([^']*?)'/g, '<span class="string">\'$1\'</span>');
        content = content.replace(/--.*$/gm, '<span class="comment">$&</span>');
        content = content.replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');

        codeElement.innerHTML = content;
    }

    setupCopyLinkButtons() {
        document.querySelectorAll('.copy-link-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const anchor = e.currentTarget.getAttribute('data-anchor');
                const url = `${window.location.origin}${window.location.pathname}#${anchor}`;

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url).then(() => {
                        e.currentTarget.textContent = '✅';
                        setTimeout(() => e.currentTarget.textContent = '🔗', 2000);
                    });
                }
            });
        });

        document.querySelectorAll('.copy-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const codeElement = e.currentTarget.nextElementSibling.querySelector('code');
                const code = codeElement.textContent;

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(code).then(() => {
                        e.currentTarget.textContent = 'Copied!';
                        setTimeout(() => e.currentTarget.textContent = 'Copy', 2000);
                    });
                }
            });
        });
    }

    loadInitialContent() {
        const defaultPath = 'Community Bridge/overview';
        this.navigateToPath(defaultPath);
    }

    formatTitle(title) {
        return title.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    setLoading(loading) {
        this.isLoading = loading;
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = loading ? 'block' : 'none';
        }
    }

    showError(message) {
        const contentArea = document.getElementById('content-area');
        if (contentArea) {
            contentArea.innerHTML = `
                <div class="error-message">
                    <h2>❌ Error</h2>
                    <p>${message}</p>
                </div>
            `;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CommunityBridgeDocumentation();
});
