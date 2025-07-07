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
            // Clear any existing event listeners by cloning the element
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

            newSearchInput.addEventListener('focus', (e) => {
                if (e.target.value.trim()) {
                    this.handleSearch(e.target.value.trim());
                }
            });

            newSearchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.hideSearchResults();
                    e.target.blur();
                } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateSearchResults(e.key === 'ArrowDown' ? 1 : -1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.selectCurrentSearchResult();
                }
            });

            // Hide search results when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideSearchResults();
                }
            });

            console.log('🔍 Search input configured with enhanced functionality');
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
                    const isExpanded = section.classList.contains('expanded');
                    section.classList.toggle('collapsed', isExpanded);
                    section.classList.toggle('expanded', !isExpanded);
                    const arrow = header.querySelector('.nav-arrow');
                    if (arrow) {
                        arrow.textContent = isExpanded ? '▶' : '▼';
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
                    const isExpanded = subsection.classList.contains('expanded');
                    subsection.classList.toggle('collapsed', isExpanded);
                    subsection.classList.toggle('expanded', !isExpanded);
                    const arrow = header.querySelector('.nav-arrow');
                    if (arrow) {
                        arrow.textContent = isExpanded ? '▶' : '▼';
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

                    // Remove active class from all nav items
                    document.querySelectorAll('.nav-item').forEach(item => {
                        item.classList.remove('active');
                    });

                    // Add active class to clicked item
                    navItem.classList.add('active');

                    // Navigate to the content
                    this.navigateToPath(path);

                    // Update URL hash
                    window.location.hash = path;
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

            // Add known top-level files first
            const topLevelFiles = [
                { file: 'overview', name: 'Overview' },
                { file: 'getting-started', name: 'Getting Started' }
            ];

            for (const { file, name } of topLevelFiles) {
                try {
                    const response = await fetch(`./assets/pages/Community Bridge/${file}.md`);
                    if (response.ok) {
                        structure['Community Bridge'].items[file] = {
                            path: `Community Bridge/${file}`,
                            type: 'markdown',
                            name: name
                        };
                        console.log(`✅ Found top-level file: ${file}.md`);
                    }
                } catch (e) {
                    console.log(`⚠️ Top-level file not found: ${file}.md`);
                }
            }

            // Discover Libraries and Modules with more robust checking
            await this.discoverSubsection(structure, 'Libraries', '📚');
            await this.discoverSubsection(structure, 'Modules', '📦');

            // Add Examples as top-level if it exists
            try {
                const examplesResponse = await fetch('./assets/pages/Examples/basic-usage.md');
                if (examplesResponse.ok) {
                    structure['Examples'] = {
                        icon: '💡',
                        items: {
                            'basic-usage': {
                                path: 'Examples/basic-usage',
                                type: 'markdown',
                                name: 'Basic Usage'
                            }
                        },
                        type: 'section'
                    };
                    console.log('✅ Found Examples section');
                }
            } catch (e) {
                console.log('📝 Examples not found, skipping');
            }

        } catch (error) {
            console.error('❌ Error in discoverPagesStructure:', error);
        }

        console.log('🔍 Final structure:', structure);
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
            let foundCount = 0;
            for (const moduleName of knownModules[folderName]) {
                try {
                    // Try the main pattern: Libraries/Anim/anim.md
                    const mainPath = `./assets/pages/Community Bridge/${folderName}/${moduleName}/${moduleName.toLowerCase()}.md`;
                    const response = await fetch(mainPath, { method: 'HEAD' });
                    if (response.ok) {
                        folderItems[moduleName] = {
                            path: `Community Bridge/${folderName}/${moduleName}/${moduleName.toLowerCase()}`,
                            type: 'markdown',
                            name: moduleName
                        };
                        foundCount++;
                        console.log(`✅ Found module: ${folderName}/${moduleName}/${moduleName.toLowerCase()}.md`);
                    }
                } catch (e) {
                    // File doesn't exist, continue silently
                }
            }
            console.log(`📊 Found ${foundCount} modules in ${folderName}`);
        }

        if (Object.keys(folderItems).length > 0) {
            structure['Community Bridge'].items[folderName] = {
                icon: folderIcon,
                items: folderItems,
                type: 'subsection',
                name: folderName
            };
            console.log(`✅ Added ${folderName} subsection with ${Object.keys(folderItems).length} items`);
        } else {
            console.log(`⚠️ No items found for ${folderName}`);
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
        console.log('🔍 Looking for navigation item:', targetPath);

        const searchItems = (items, currentPath = '') => {
            for (const [key, item] of Object.entries(items)) {
                // Check exact path match
                if (item.path === targetPath) {
                    console.log('✅ Found exact path match:', item.path);
                    return item;
                }

                // Also check without .md extension
                const itemPathWithoutExt = item.path ? item.path.replace('.md', '') : '';
                if (itemPathWithoutExt === targetPath) {
                    console.log('✅ Found path match (no ext):', itemPathWithoutExt);
                    return item;
                }

                // Recursively search subsections
                if (item.items) {
                    const found = searchItems(item.items, `${currentPath}/${key}`);
                    if (found) return found;
                }
            }
            return null;
        };

        for (const [category, categoryData] of Object.entries(this.allModules)) {
            console.log(`🔍 Searching category: ${category}`);
            const found = searchItems(categoryData.items || {}, category);
            if (found) {
                console.log('✅ Found item in category:', category);
                return found;
            }
        }

        console.log('❌ Navigation item not found for:', targetPath);
        console.log('🔍 Available paths:');
        this.logAllPaths();
        return null;
    }

    logAllPaths() {
        const logItems = (items, indent = '') => {
            for (const [key, item] of Object.entries(items)) {
                if (item.path) {
                    console.log(`${indent}📄 ${item.path}`);
                }
                if (item.items) {
                    console.log(`${indent}📁 ${key}/`);
                    logItems(item.items, indent + '  ');
                }
            }
        };

        for (const [category, categoryData] of Object.entries(this.allModules)) {
            console.log(`📁 ${category}/`);
            logItems(categoryData.items || {}, '  ');
        }
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

    loadInitialContent() {
        // Try to load the first available content
        for (const [category, categoryData] of Object.entries(this.allModules)) {
            if (categoryData.items) {
                for (const [key, item] of Object.entries(categoryData.items)) {
                    if (item.type === 'markdown' && item.path) {
                        console.log('🎯 Loading initial content:', item.path);
                        this.navigateToPath(item.path);
                        return;
                    } else if (item.items) {
                        // Check subsections
                        for (const [subKey, subItem] of Object.entries(item.items)) {
                            if (subItem.type === 'markdown' && subItem.path) {
                                console.log('🎯 Loading initial content from subsection:', subItem.path);
                                this.navigateToPath(subItem.path);
                                return;
                            }
                        }
                    }
                }
            }
        }

        // Fallback - try to load overview
        console.log('🎯 Fallback: trying to load overview');
        this.navigateToPath('Community Bridge/overview');
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
        const functions = [];
        const regex = /<--FNC\s*([\s\S]*?)\s*FNC-->/g;
        let match;
        while ((match = regex.exec(markdown)) !== null) {
            try {
                const funcData = JSON.parse(match[1]);
                functions.push(funcData);
            } catch (e) {
                console.error("Failed to parse function JSON:", e, match[1]);
            }
        }
        return functions;
    }

    convertMarkdownToHTML(markdown) {
        // Remove function blocks before rendering markdown
        const cleanMarkdown = markdown.replace(/<--FNC\s*[\s\S]*?\s*FNC-->/g, '');

        // Remove META comments
        let html = cleanMarkdown.replace(/<!--META[\s\S]*?-->/g, '');

        // Remove TOC comments
        html = html.replace(/<!--TOC:[\s\S]*?-->/g, '');

        // Convert headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

        // Convert code blocks
        html = html.replace(/```lua\n([\s\S]*?)\n```/g, '<div class="code-block-container"><button class="copy-code-btn">Copy</button><pre><code class="language-lua">$1</code></pre></div>');
        html = html.replace(/```(\w+)?\n([\s\S]*?)\n```/g, '<div class="code-block-container"><button class="copy-code-btn">Copy</button><pre><code class="language-$1">$2</code></pre></div>');

        // Convert inline code
        html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

        // Convert bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Convert italic
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Convert links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');

        // Convert paragraphs
        html = html.split('\n\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('');

        // Clean up
        html = html.replace(/<p><\/p>/g, '');
        html = html.replace(/<p>\s*<h/g, '<h');
        html = html.replace(/<\/h([1-6])>\s*<\/p>/g, '</h$1>');

        return html;
    }

    renderFunction(func, side, moduleName = 'unknown') {
        const anchor = this.generateAnchor(func.name, side, moduleName);

        const parameters = func.parameters?.map(p => `
            <li class="param-item">
                <code class="param-name">${p.name}</code>
                <span class="param-type">${p.type}</span>
                ${p.optional ? '<span class="param-optional">optional</span>' : ''}
                <span class="param-desc">${p.description}</span>
            </li>`).join('') || '<li class="param-item">None</li>';

        const returns = func.returns?.map(r => `
            <li class="param-item">
                <span class="param-type">${r.type}</span>
                <span class="param-desc">${r.description}</span>
            </li>`).join('') || '<li class="param-item">None</li>';

        const example = func.example ?
            `<div class="code-block-container">
                <button class="copy-code-btn" onclick="window.app.copyCode(this)">Copy</button>
                <pre><code class="language-lua">${Array.isArray(func.example) ? func.example.join('\n') : func.example}</code></pre>
            </div>` : '<p class="no-example">No example provided.</p>';

        return `
            <div class="function-card" id="${anchor}">
                <div class="function-header">
                    <div class="function-name-section">
                        <span class="function-name">${func.name}</span>
                        <span class="function-side ${side.toLowerCase()}">${side.toUpperCase()}</span>
                    </div>
                    <div class="function-actions">
                        <button class="copy-link-btn" title="Copy Link" data-anchor="${anchor}">
                            <span class="copy-icon">🔗</span>
                        </button>
                    </div>
                </div>
                <div class="function-body">
                    <p class="function-description">${func.description || 'No description provided.'}</p>
                    
                    <div class="function-section">
                        <h4 class="section-title">Parameters</h4>
                        <ul class="param-list">${parameters}</ul>
                    </div>
                    
                    <div class="function-section">
                        <h4 class="section-title">Returns</h4>
                        <ul class="param-list">${returns}</ul>
                    </div>
                    
                    <div class="function-section">
                        <h4 class="section-title">Example</h4>
                        ${example}
                    </div>
                </div>
            </div>
        `;
    }

    generateAnchor(name, side, module) {
        return `${name}-${side}-${module}`.toLowerCase().replace(/[^a-z0-9-]/g, '');
    }    updateTableOfContents(functions = []) {
        const tocContainer = document.getElementById('toc-container');
        const tocContent = document.getElementById('toc-content');
        
        if (!tocContainer || !tocContent) return;

        if (functions.length === 0) {
            tocContainer.style.display = 'none';
            return;
        }

        // Generate TOC from functions with better organization
        const clientFunctions = functions.filter(f => f.side === 'client');
        const serverFunctions = functions.filter(f => f.side === 'server');
        const sharedFunctions = functions.filter(f => f.side === 'shared');

        let tocHtml = '';

        if (clientFunctions.length > 0) {
            tocHtml += `
                <div class="toc-section">
                    <h4 class="toc-section-title">Client Functions</h4>
                    <ul class="toc-list">
                        ${clientFunctions.map(func => {
                            const anchor = this.generateAnchor(func.name, func.side, this.currentModuleName);
                            return `<li><a href="#${anchor}" class="toc-link" data-anchor="${anchor}">${func.name}</a></li>`;
                        }).join('')}
                    </ul>
                </div>
            `;
        }

        if (serverFunctions.length > 0) {
            tocHtml += `
                <div class="toc-section">
                    <h4 class="toc-section-title">Server Functions</h4>
                    <ul class="toc-list">
                        ${serverFunctions.map(func => {
                            const anchor = this.generateAnchor(func.name, func.side, this.currentModuleName);
                            return `<li><a href="#${anchor}" class="toc-link" data-anchor="${anchor}">${func.name}</a></li>`;
                        }).join('')}
                    </ul>
                </div>
            `;
        }

        if (sharedFunctions.length > 0) {
            tocHtml += `
                <div class="toc-section">
                    <h4 class="toc-section-title">Shared Functions</h4>
                    <ul class="toc-list">
                        ${sharedFunctions.map(func => {
                            const anchor = this.generateAnchor(func.name, func.side, this.currentModuleName);
                            return `<li><a href="#${anchor}" class="toc-link" data-anchor="${anchor}">${func.name}</a></li>`;
                        }).join('')}
                    </ul>
                </div>
            `;
        }

        tocContent.innerHTML = tocHtml;
        tocContainer.style.display = 'block';

        // Add click handlers and scroll spy
        this.addTocClickHandlers(tocContainer);
        this.setupScrollSpy();
    }

    addTocClickHandlers(tocContainer) {
        tocContainer.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const anchorId = link.getAttribute('href').substring(1);
                const element = document.getElementById(anchorId);
                if (element) {
                    this.scrollToElement(element);
                    
                    // Update URL hash
                    window.location.hash = anchorId;
                    
                    // Update active state
                    this.updateTocActiveState(anchorId);
                }
            });
        });
    }

    setupScrollSpy() {
        // Remove existing scroll listener
        if (this.scrollSpyHandler) {
            window.removeEventListener('scroll', this.scrollSpyHandler);
        }

        this.scrollSpyHandler = () => {
            const functionCards = document.querySelectorAll('.function-card');
            const header = document.querySelector('.header');
            const headerHeight = header ? header.offsetHeight : 70;
            const scrollPosition = window.scrollY + headerHeight + 100;

            let activeAnchor = null;

            functionCards.forEach(card => {
                const cardTop = card.offsetTop;
                const cardBottom = cardTop + card.offsetHeight;

                if (scrollPosition >= cardTop && scrollPosition <= cardBottom) {
                    activeAnchor = card.id;
                }
            });

            if (activeAnchor) {
                this.updateTocActiveState(activeAnchor);
            }
        };

        window.addEventListener('scroll', this.scrollSpyHandler, { passive: true });
    }

    updateTocActiveState(anchorId) {
        // Remove active class from all TOC links
        document.querySelectorAll('.toc-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current link
        const activeLink = document.querySelector(`.toc-link[data-anchor="${anchorId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
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
            const searchText = `${item.name} ${item.description} ${item.category}`.toLowerCase();
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
                    <h3>No results found for "${this.highlightMatch(searchTerm, searchTerm)}"</h3>
                    <p>Try a different search term or browse the navigation.</p>
                </div>
            `;
        } else {
            const resultsHtml = results.map((result, index) => `
                <div class="search-result-item ${index === 0 ? 'highlighted' : ''}" 
                     data-path="${result.path}" 
                     data-index="${index}">
                    <h4>${this.highlightMatch(result.name, searchTerm)}</h4>
                    <p class="result-path">${result.category} → ${result.path}</p>
                    <p class="result-description">${this.highlightMatch(result.description || '', searchTerm)}</p>
                </div>
            `).join('');

            searchResults.innerHTML = `
                <div class="search-results-container">
                    <h3>Search Results for "${this.highlightMatch(searchTerm, searchTerm)}" (${results.length})</h3>
                    <div class="search-results-list">
                        ${resultsHtml}
                    </div>
                </div>
            `;

            // Add click handlers to search results
            searchResults.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    const path = item.getAttribute('data-path');
                    if (path) {
                        this.navigateToPath(path);
                        this.hideSearchResults();
                        document.getElementById('search-input').blur();
                    }
                });
            });
        }

        searchResults.style.display = 'block';
        this.currentSearchResults = results;
        this.currentSearchIndex = 0;
    }

    highlightMatch(text, searchTerm) {
        if (!text || !searchTerm) return text || '';
        
        const regex = new RegExp(`(${this.escapeRegex(searchTerm)})`, 'gi');
        return text.replace(regex, '<mark>$1</mark>');
    }

    escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    navigateSearchResults(direction) {
        if (!this.currentSearchResults || this.currentSearchResults.length === 0) return;

        // Remove current highlight
        const currentHighlighted = document.querySelector('.search-result-item.highlighted');
        if (currentHighlighted) {
            currentHighlighted.classList.remove('highlighted');
        }

        // Update index
        this.currentSearchIndex += direction;
        if (this.currentSearchIndex < 0) {
            this.currentSearchIndex = this.currentSearchResults.length - 1;
        } else if (this.currentSearchIndex >= this.currentSearchResults.length) {
            this.currentSearchIndex = 0;
        }

        // Highlight new item
        const newHighlighted = document.querySelector(`[data-index="${this.currentSearchIndex}"]`);
        if (newHighlighted) {
            newHighlighted.classList.add('highlighted');
            newHighlighted.scrollIntoView({ block: 'nearest' });
        }
    }

    selectCurrentSearchResult() {
        if (!this.currentSearchResults || this.currentSearchResults.length === 0) return;

        const currentResult = this.currentSearchResults[this.currentSearchIndex];
        if (currentResult) {
            this.navigateToPath(currentResult.path);
            this.hideSearchResults();
            document.getElementById('search-input').blur();
        }
    }

    hideSearchResults() {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
        this.currentSearchResults = null;
        this.currentSearchIndex = 0;
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
    }    setupCopyLinkButtons() {
        document.querySelectorAll('.copy-link-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const anchor = e.currentTarget.getAttribute('data-anchor');
                const url = `${window.location.origin}${window.location.pathname}#${anchor}`;
                
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(url).then(() => {
                        const icon = e.currentTarget.querySelector('.copy-icon');
                        if (icon) {
                            const originalText = icon.textContent;
                            icon.textContent = '✅';
                            setTimeout(() => icon.textContent = originalText, 2000);
                        }
                    });
                }
            });
        });

        document.querySelectorAll('.copy-code-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.copyCode(e.currentTarget);
            });
        });
    }

    copyCode(button) {
        const codeElement = button.nextElementSibling?.querySelector('code');
        if (!codeElement) return;

        const code = codeElement.textContent;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code).then(() => {
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.classList.add('copied');
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = code;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            
            try {
                document.execCommand('copy');
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                setTimeout(() => button.textContent = originalText, 2000);
            } catch (err) {
                console.error('Fallback: Failed to copy', err);
            }
            
            document.body.removeChild(textArea);
        }
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
