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
                    // CSS ::after pseudo-element handles arrow rotation automatically
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
                    // CSS ::after pseudo-element handles arrow rotation automatically
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
            'Libraries': ['Anim', 'Batch', 'Cache', 'Callback', 'Cutscenes', 'DUI', 'Entities', 'Generators', 'Ids', 'Logs', 'Markers', 'Math', 'Particles', 'Placers', 'Point', 'Points', 'Raycast', 'Scaleform', 'Shells', 'SQL', 'StateBags', 'Table', 'Utility', 'Test'],
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
                    } else {
                        // Try alternative pattern for special cases like Test/test.md
                        const altPath = `./assets/pages/Community Bridge/${folderName}/${moduleName}/test.md`;
                        const altResponse = await fetch(altPath, { method: 'HEAD' });
                        if (altResponse.ok) {
                            folderItems[moduleName] = {
                                path: `Community Bridge/${folderName}/${moduleName}/test`,
                                type: 'markdown',
                                name: moduleName
                            };
                            foundCount++;
                            console.log(`✅ Found module (alt): ${folderName}/${moduleName}/test.md`);
                        }
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
                    </div>
                    <div class="nav-items">
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
                        </div>
                        <div class="nav-items">
                            ${this.renderNavItems(itemData.items)}
                        </div>
                    </div>
                `;
            } else if (itemData.type === 'markdown') {
                html += `
                    <div class="nav-item" data-path="${itemData.path}" data-type="markdown">
                        <span class="nav-icon">📄</span>
                        <span class="nav-title">${itemData.name || itemName}</span>
                    </div>
                `;
            }
        }

        return html;
    }

    setupRouter() {
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

            // Add cache-busting parameter to force fresh content
            const cacheBuster = Date.now();
            const response = await fetch(`./assets/pages/${path}.md?v=${cacheBuster}`);

            if (!response.ok) {
                throw new Error(`Failed to load ${path}: ${response.status}`);
            }

            const content = await response.text();
            console.log(`📄 Loaded markdown content (${content.length} chars) with cache buster: ${cacheBuster}`);

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
    }    renderMarkdownContent(markdownData, modulePath) {
        const contentArea = document.getElementById('content-area');
        if (!contentArea) return;

        console.log('📝 Rendering markdown content for:', modulePath);

        // Parse functions from markdown
        const functions = this.parseFunctionsFromMarkdown(markdownData.content);
        console.log('🔧 Parsed functions:', functions);

        // Create clean markdown content WITHOUT function sections for base HTML
        let cleanMarkdown = markdownData.content;

        if (functions.length > 0) {
            // Remove function sections from markdown to avoid duplication
            cleanMarkdown = this.removeFunctionSections(markdownData.content);
            console.log('🧹 Removed function sections, clean markdown length:', cleanMarkdown.length);
        }

        // Convert clean markdown to HTML (without function sections)
        let html = this.convertMarkdownToHTML(cleanMarkdown);
        console.log('📄 Base HTML length:', html.length);

        // Add functions sections organized like app-fixed.js
        if (functions.length > 0) {
            const clientFunctions = functions.filter(f => f.side === 'client');
            const serverFunctions = functions.filter(f => f.side === 'server');
            const sharedFunctions = functions.filter(f => f.side === 'shared');

            const moduleName = modulePath.split('/').pop();
            console.log('🏷️ Module name:', moduleName);
            console.log('🖥️ Client functions:', clientFunctions.length);
            console.log('🖧 Server functions:', serverFunctions.length);
            console.log('🔄 Shared functions:', sharedFunctions.length);

            if (clientFunctions.length > 0) {
                html += '<h2 id="client-functions">Client Functions</h2>';
                clientFunctions.forEach(func => {
                    console.log('🔧 Rendering client function:', func.name);
                    html += this.renderFunction(func, 'client', moduleName);
                });
            }

            if (serverFunctions.length > 0) {
                html += '<h2 id="server-functions">Server Functions</h2>';
                serverFunctions.forEach(func => {
                    console.log('🔧 Rendering server function:', func.name);
                    html += this.renderFunction(func, 'server', moduleName);
                });
            }

            if (sharedFunctions.length > 0) {
                html += '<h2 id="shared-functions">Shared Functions</h2>';
                sharedFunctions.forEach(func => {
                    console.log('🔧 Rendering shared function:', func.name);
                    html += this.renderFunction(func, 'shared', moduleName);
                });
            }
        } else {
            console.log('⚠️ No functions found in markdown');
        }

        console.log('📄 Final HTML length:', html.length);

        // Set content
        contentArea.innerHTML = html;

        // Update current module info
        this.currentModule = markdownData;
        this.currentModuleName = modulePath.split('/').pop();

        // Generate and render TOC if needed
        console.log('📋 Updating TOC...');
        this.updateTableOfContents(functions);

        // Skip post-processing syntax highlighting since we do it during rendering
        console.log('🎨 Syntax highlighting already applied during rendering...');

        // Setup copy buttons
        console.log('📋 Setting up copy buttons...');
        this.setupCopyLinkButtons();

        console.log('✅ Markdown content rendering complete');
    }

    parseFunctionsFromMarkdown(markdown) {
        console.log('🔧 Parsing functions from markdown...');
        console.log('📄 Markdown content length:', markdown.length);
        console.log('📄 First 500 chars of markdown:', markdown.substring(0, 500));

        const functions = [];

        // Parse human-readable format FIRST
        console.log('🔧 Parsing human-readable markdown format...');

        // Split markdown into lines for easier processing
        const lines = markdown.split('\n');
        let currentSection = null;
        let currentSectionContent = [];
        let sectionMap = {};

        // First pass: collect all sections
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Check if this is a function section header
            const sectionMatch = line.match(/^## (Client|Server|Shared) Functions\s*$/);
            if (sectionMatch) {
                // Save previous section if exists
                if (currentSection && currentSectionContent.length > 0) {
                    sectionMap[currentSection] = currentSectionContent.join('\n');
                }

                // Start new section
                currentSection = sectionMatch[1].toLowerCase();
                currentSectionContent = [];
                console.log(`📋 Found ${currentSection} functions section`);
            } else if (currentSection) {
                // Check if we hit another ## section (not functions)
                if (line.startsWith('## ') && !line.includes('Functions')) {
                    // End current section
                    if (currentSectionContent.length > 0) {
                        sectionMap[currentSection] = currentSectionContent.join('\n');
                    }
                    currentSection = null;
                    currentSectionContent = [];
                } else {
                    // Add line to current section
                    currentSectionContent.push(line);
                }
            }
        }

        // Save final section
        if (currentSection && currentSectionContent.length > 0) {
            sectionMap[currentSection] = currentSectionContent.join('\n');
        }

        // Second pass: parse functions from each section
        for (const [sectionType, sectionContent] of Object.entries(sectionMap)) {
            console.log(`📄 Section content length: ${sectionContent.length}`);
            console.log(`📄 First 200 chars of section:`, sectionContent.substring(0, 200));

            // Split by ### headers to find functions
            const sectionLines = sectionContent.split('\n');
            let currentFunction = null;
            let currentFunctionContent = [];
            let functionCount = 0;

            for (let i = 0; i < sectionLines.length; i++) {
                const line = sectionLines[i];

                // Check if this line is a function header (### FunctionName)
                if (line.startsWith('### ')) {
                    // If we have a previous function, process it
                    if (currentFunction) {
                        functionCount++;
                        console.log(`🔧 Found function ${functionCount}: ${currentFunction}`);
                        console.log(`📄 Function content length: ${currentFunctionContent.join('\n').length}`);

                        try {
                            const func = this.parseReadableFunction(currentFunction, currentFunctionContent.join('\n'), sectionType);
                            if (func) {
                                console.log(`✅ Parsed readable function: ${func.name} (${func.side})`);
                                functions.push(func);
                            }
                        } catch (e) {
                            console.error(`❌ Failed to parse function ${currentFunction}:`, e);
                        }
                    }

                    // Start new function
                    currentFunction = line.substring(4).trim(); // Remove '### '
                    currentFunctionContent = [];
                } else if (currentFunction) {
                    // Add line to current function content
                    currentFunctionContent.push(line);
                }
            }

            // Process the last function
            if (currentFunction) {
                functionCount++;
                console.log(`🔧 Found function ${functionCount}: ${currentFunction}`);
                console.log(`📄 Function content length: ${currentFunctionContent.join('\n').length}`);

                try {
                    const func = this.parseReadableFunction(currentFunction, currentFunctionContent.join('\n'), sectionType);
                    if (func) {
                        console.log(`✅ Parsed readable function: ${func.name} (${func.side})`);
                        functions.push(func);
                    }
                } catch (e) {
                    console.error(`❌ Failed to parse function ${currentFunction}:`, e);
                }
            }

            console.log(`📊 Found ${functionCount} functions in ${sectionType} section`);
        }

        // If no readable functions found, try the old <--FNC format for backwards compatibility
        if (functions.length === 0) {
            console.log('🔧 No readable functions found, trying old FNC format...');
            const oldFormatRegex = /<--FNC\s*([\s\S]*?)\s*FNC-->/g;
            let match;
            while ((match = oldFormatRegex.exec(markdown)) !== null) {
                try {
                    const funcData = JSON.parse(match[1]);
                    console.log(`✅ Parsed old format function: ${funcData.name} (${funcData.side})`);
                    functions.push(funcData);
                } catch (e) {
                    console.error("❌ Failed to parse old format function JSON:", e);
                }
            }
        }

        console.log(`🔧 Total functions found: ${functions.length}`);
        return functions;
    }

    parseReadableFunction(name, content, side) {
        console.log(`🔧 Parsing function: ${name}`);
        console.log(`📄 Function content:`, content.substring(0, 300));

        const func = {
            name: name,
            side: side,
            description: '',
            syntax: '',
            parameters: [],
            returns: [],
            example: ''
        };

        // Extract description
        const descMatch = content.match(/\*\*Description:\*\*\s*([^\n]+)/);
        if (descMatch) {
            func.description = descMatch[1].trim();
            console.log(`✅ Found description: ${func.description}`);
        } else {
            console.log(`❌ No description found in content`);
        }

        // Extract syntax
        const syntaxMatch = content.match(/\*\*Syntax:\*\*\s*`([^`]+)`/);
        if (syntaxMatch) {
            func.syntax = syntaxMatch[1].trim();
            console.log(`✅ Found syntax: ${func.syntax}`);
        } else {
            console.log(`❌ No syntax found in content`);
        }

        // Extract parameters
        const paramSection = content.match(/\*\*Parameters:\*\*([\s\S]*?)(?=\*\*Returns:\*\*|\*\*Example:\*\*|$)/);
        if (paramSection) {
            const paramText = paramSection[1];
            console.log(`📋 Parameter section found:`, paramText.substring(0, 200));
            if (paramText.includes('None')) {
                func.parameters = [];
            } else {
                // Parse parameter lines like "- `amount` (number) - Amount to withdraw"
                const paramMatches = paramText.matchAll(/- `([^`]+)` \(([^)]+)\) - ([^\n]+)/g);
                for (const paramMatch of paramMatches) {
                    func.parameters.push({
                        name: paramMatch[1],
                        type: paramMatch[2],
                        description: paramMatch[3]
                    });
                    console.log(`✅ Found parameter: ${paramMatch[1]} (${paramMatch[2]})`);
                }
            }
        } else {
            console.log(`❌ No parameters section found`);
        }

        // Extract returns
        const returnSection = content.match(/\*\*Returns:\*\*([\s\S]*?)(?=\*\*Example:\*\*|$)/);
        if (returnSection) {
            const returnText = returnSection[1];
            console.log(`📋 Returns section found:`, returnText.substring(0, 200));
            if (returnText.includes('None')) {
                func.returns = [];
            } else {
                // Parse return lines like "- `number` - The player's current bank balance"
                const returnMatches = returnText.matchAll(/- `([^`]+)` - ([^\n]+)/g);
                for (const returnMatch of returnMatches) {
                    func.returns.push({
                        type: returnMatch[1],
                        description: returnMatch[2]
                    });
                    console.log(`✅ Found return: ${returnMatch[1]}`);
                }
            }
        } else {
            console.log(`❌ No returns section found`);
        }

        // Extract example
        const exampleMatch = content.match(/\*\*Example:\*\*\s*```(?:lua)?\n([\s\S]*?)```/);
        if (exampleMatch) {
            func.example = exampleMatch[1].trim();
            console.log(`✅ Found example: ${func.example.substring(0, 50)}...`);
        } else {
            console.log(`❌ No example found`);
        }

        console.log(`🔧 Final parsed function:`, func);
        return func;
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
        const sideClass = side === 'client' ? 'client' : side === 'server' ? 'server' : 'shared';
        const sideIcon = side === 'client' ? '🖥️' : side === 'server' ? '🖧' : '🔄';

        // Create comprehensive unique anchor ID: functionname-side-module (same as app-fixed.js)
        const cleanFunctionName = func.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        const cleanModuleName = moduleName.toLowerCase().replace(/[^a-z0-9]/g, '');
        const anchorId = `${cleanFunctionName}-${side}-${cleanModuleName}`;

        console.log(`🔗 Creating anchor: ${anchorId} for function ${func.name} (${side}) in ${moduleName}`);

        // Pre-apply syntax highlighting to code content
        const syntaxCode = this.applySyntaxHighlightingToText(func.syntax || func.name + '()');
        const exampleCode = func.example ? this.applySyntaxHighlightingToText(Array.isArray(func.example) ? func.example.join('\n') : func.example) : '';

        let parametersHtml = '';
        if (func.parameters && func.parameters.length > 0) {
            parametersHtml = `
                <div class="function-parameters">
                    <h4>Parameters:</h4>
                    <ul>
                        ${func.parameters.map(param => `
                            <li><code>${param.name}</code> (${param.type}) - ${param.description || ''}</li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        let returnsHtml = '';
        if (func.returns && func.returns.length > 0) {
            returnsHtml = `
                <div class="function-returns">
                    <h4>Returns:</h4>
                    <ul>
                        ${func.returns.map(ret => `
                            <li>(${ret.type}) - ${ret.description || ''}</li>
                        `).join('')}
                    </ul>
                </div>
            `;
        }

        return `
            <div class="function-card" id="${anchorId}">
                <div class="function-header">
                    <h3>${func.name}</h3>
                    <div class="function-badges">
                        <span class="badge ${sideClass}">${sideIcon} ${side}</span>
                        <button class="copy-link-btn" title="Copy direct link to this function" data-anchor="${anchorId}">🔗</button>
                    </div>
                </div>
                <p>${func.description || 'No description available.'}</p>
                <div class="function-syntax">
                    <h4>Syntax:</h4>
                    <div class="code-block-container">
                        <pre class="code-block language-lua"><code class="language-lua">${syntaxCode}</code></pre>
                        <button class="copy-button" title="Copy code">📋</button>
                    </div>
                </div>
                ${parametersHtml}
                ${returnsHtml}
                ${func.example ? `
                    <div class="function-example">
                        <h4>Example:</h4>
                        <div class="code-block-container">
                            <pre class="code-block language-lua"><code class="language-lua">${exampleCode}</code></pre>
                            <button class="copy-button" title="Copy code">📋</button>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    generateAnchor(name, side, module) {
        return `${name}-${side}-${module}`.toLowerCase().replace(/[^a-z0-9-]/g, '');
    }    updateTableOfContents(functions = []) {
        console.log('📋 Updating table of contents...');
        const tocContainer = document.getElementById('toc-container');
        const tocContent = document.getElementById('toc-content');

        if (!tocContainer || !tocContent) {
            console.warn('⚠️ TOC container or content not found');
            return;
        }

        if (functions.length === 0) {
            console.log('📋 No functions, hiding TOC');
            tocContainer.style.display = 'none';
            return;
        }

        console.log('📋 Building TOC for', functions.length, 'functions');

        // Create TOC structure similar to app-fixed.js
        const clientFunctions = functions.filter(f => f.side === 'client');
        const serverFunctions = functions.filter(f => f.side === 'server');
        const sharedFunctions = functions.filter(f => f.side === 'shared');

        const moduleName = this.currentModuleName || 'unknown';

        let tocItems = [];

        if (clientFunctions.length > 0) {
            const clientItems = clientFunctions.map(func => {
                const cleanFunctionName = func.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                const cleanModuleName = moduleName.toLowerCase().replace(/[^a-z0-9]/g, '');
                const anchor = `#${cleanFunctionName}-client-${cleanModuleName}`;
                return {
                    title: func.name,
                    anchor: anchor
                };
            });

            tocItems.push({
                title: 'Client Functions',
                anchor: '#client-functions',
                children: clientItems
            });
        }

        if (serverFunctions.length > 0) {
            const serverItems = serverFunctions.map(func => {
                const cleanFunctionName = func.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                const cleanModuleName = moduleName.toLowerCase().replace(/[^a-z0-9]/g, '');
                const anchor = `#${cleanFunctionName}-server-${cleanModuleName}`;
                return {
                    title: func.name,
                    anchor: anchor
                };
            });

            tocItems.push({
                title: 'Server Functions',
                anchor: '#server-functions',
                children: serverItems
            });
        }

        if (sharedFunctions.length > 0) {
            const sharedItems = sharedFunctions.map(func => {
                const cleanFunctionName = func.name.toLowerCase().replace(/[^a-z0-9]/g, '');
                const cleanModuleName = moduleName.toLowerCase().replace(/[^a-z0-9]/g, '');
                const anchor = `#${cleanFunctionName}-shared-${cleanModuleName}`;
                return {
                    title: func.name,
                    anchor: anchor
                };
            });

            tocItems.push({
                title: 'Shared Functions',
                anchor: '#shared-functions',
                children: sharedItems
            });
        }

        console.log('📋 TOC items structure:', tocItems);

        // Render TOC using the same structure as app-fixed.js
        this.renderTocFromData({ items: tocItems }, tocContent);
        tocContainer.style.display = 'block';

        console.log('📋 TOC should now be visible');
    }

    renderTocFromData(tocData, tocContent) {
        console.log('📋 Rendering TOC from data structure');

        let tocHtml = '';
        const moduleName = this.currentModuleName || 'unknown';

        const renderTocItems = (items, level = 0, parentType = null) => {
            return items.map(item => {
                const indent = level * 1;
                const icon = level === 0 ? '' :
                           item.title.includes('Functions') ? '' : '⚡ ';

                // Determine the correct anchor based on context
                let anchor = item.anchor;

                // If this is a function under Client Functions, Server Functions, or Shared Functions
                if (level > 0 && parentType && !item.title.includes('Functions')) {
                    const side = parentType.includes('Client') ? 'client' :
                                parentType.includes('Server') ? 'server' :
                                parentType.includes('Shared') ? 'shared' : 'client';
                    const cleanFunctionName = item.title.toLowerCase().replace(/[^a-z0-9]/g, '');
                    const cleanModuleName = moduleName.toLowerCase().replace(/[^a-z0-9]/g, '');
                    anchor = `#${cleanFunctionName}-${side}-${cleanModuleName}`;
                    console.log(`🔗 Generated TOC anchor: ${anchor} for ${item.title} (${side})`);
                }

                let html = `
                    <li class="toc-item toc-level-${level + 1}" style="margin-left: ${indent}rem;">
                        <a href="${anchor}" class="toc-link">
                            ${icon}${item.title}
                        </a>
                    </li>
                `;

                // Render children if they exist, passing parent type for context
                if (item.children && item.children.length > 0) {
                    const currentParentType = item.title.includes('Functions') ? item.title : parentType;
                    html += renderTocItems(item.children, level + 1, currentParentType);
                }

                return html;
            }).join('');
        };

        tocHtml = `<ul class="toc-list">${renderTocItems(tocData.items)}</ul>`;
        tocContent.innerHTML = tocHtml;

        // Add click handlers for smooth scrolling
        this.addTocClickHandlers(document.getElementById('toc-container'));

        console.log(`✅ TOC updated with ${tocData.items.length} main items`);
    }

    addTocClickHandlers(tocContainer) {
        tocContainer.querySelectorAll('.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    const anchorId = href.substring(1);
                    const element = document.getElementById(anchorId);
                    if (element) {
                        this.scrollToElement(element);

                        // Update URL hash without triggering navigation
                        history.replaceState(null, null, href);

                        // Update active state
                        this.updateTocActiveState(anchorId);
                    } else {
                        console.warn('⚠️ TOC target element not found:', anchorId);
                    }
                } else {
                    console.warn('⚠️ Invalid TOC link href:', href);
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
        if (!element) return;

        const header = document.querySelector('.header');
        const headerHeight = header ? header.offsetHeight : 70;
        const elementPosition = element.offsetTop;
        const offsetPosition = elementPosition - headerHeight - 20;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
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
        // Apply syntax highlighting to all code blocks
        document.querySelectorAll('code.language-lua, .function-example code, .function-syntax code').forEach(codeElement => {
            this.applyLuaSyntaxHighlighting(codeElement);
        });
    }

    applyLuaSyntaxHighlighting(codeElement) {
        // Prevent double-processing
        if (codeElement.classList.contains('highlighted')) {
            return;
        }
        codeElement.classList.add('highlighted');

        let content = codeElement.textContent;

        // Lua keywords
        const keywords = ['local', 'function', 'end', 'if', 'then', 'else', 'elseif', 'for', 'while', 'do', 'repeat', 'until', 'return', 'break', 'true', 'false', 'nil', 'and', 'or', 'not', 'in'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
            content = content.replace(regex, `<span class="keyword">$1</span>`);
        });

        // String literals
        content = content.replace(/"([^"]*?)"/g, '<span class="string">"$1"</span>');
        content = content.replace(/'([^']*?)'/g, '<span class="string">\'$1\'</span>');

        // Comments
        content = content.replace(/--.*$/gm, '<span class="comment">$&</span>');

        // Numbers
        content = content.replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');

        // Function calls (word followed by parentheses)
        content = content.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="function">$1</span>');

        // Operators
        content = content.replace(/(\+|\-|\*|\/|%|==|~=|<=|>=|<|>|=)/g, '<span class="operator">$1</span>');

        codeElement.innerHTML = content;
    }    applySyntaxHighlightingToText(content) {
        // Apply syntax highlighting and return HTML string
        let html = content;

        // Lua keywords
        const keywords = ['local', 'function', 'end', 'if', 'then', 'else', 'elseif', 'for', 'while', 'do', 'repeat', 'until', 'return', 'break', 'true', 'false', 'nil', 'and', 'or', 'not', 'in'];
        keywords.forEach(keyword => {
            const regex = new RegExp(`\\b(${keyword})\\b`, 'g');
            html = html.replace(regex, `<span class="keyword">$1</span>`);
        });

        // String literals
        html = html.replace(/"([^"]*?)"/g, '<span class="string">"$1"</span>');
        html = html.replace(/'([^']*?)'/g, '<span class="string">\'$1\'</span>');

        // Comments
        html = html.replace(/--.*$/gm, '<span class="comment">$&</span>');

        // Numbers
        html = html.replace(/\b\d+\.?\d*\b/g, '<span class="number">$&</span>');

        // Function calls (word followed by parentheses)
        html = html.replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*(?=\()/g, '<span class="function">$1</span>');

        // Operators
        html = html.replace(/(\+|\-|\*|\/|%|==|~=|<=|>=|<|>|=)/g, '<span class="operator">$1</span>');

        return html;
    }

    setupCopyLinkButtons() {
        // Setup copy link buttons (same as app-fixed.js)
        const copyLinkButtons = document.querySelectorAll('.copy-link-btn');
        copyLinkButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const anchor = button.getAttribute('data-anchor');
                const url = `${window.location.origin}${window.location.pathname}#${anchor}`;

                navigator.clipboard.writeText(url).then(() => {
                    const originalText = button.textContent;
                    button.textContent = '✅';
                    button.style.color = 'var(--accent-color)';

                    setTimeout(() => {
                        button.textContent = originalText;
                        button.style.color = '';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy link:', err);
                    button.textContent = '❌';
                    setTimeout(() => {
                        button.textContent = '🔗';
                    }, 2000);
                });
            });
        });
    }

    copyCode(button) {
        const codeBlock = button.parentNode.querySelector('code');
        const text = codeBlock.textContent;

        navigator.clipboard.writeText(text).then(() => {
            const originalText = button.textContent;
            button.textContent = '✅';
            button.style.color = 'var(--accent-color)';

            setTimeout(() => {
                button.textContent = originalText;
                button.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy code:', err);
            button.textContent = '❌';
            setTimeout(() => {
                button.textContent = '📋';
            }, 2000);
        });
    }

    applySyntaxHighlighting() {
        // Apply Lua syntax highlighting to code blocks
        const codeBlocks = document.querySelectorAll('.code-block code');
        codeBlocks.forEach(block => {
            this.applyLuaSyntaxHighlighting(block);
        });

        // Set up copy button event listeners
        const copyButtons = document.querySelectorAll('.copy-button');
        copyButtons.forEach(button => {
            button.addEventListener('click', () => this.copyCode(button));
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

    removeFunctionSections(markdown) {
        // Remove function sections to avoid duplication
        const lines = markdown.split('\n');
        let filteredLines = [];
        let inFunctionSection = false;

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];

            // Check if this is a function section header
            if (line.match(/^## (Client|Server|Shared) Functions\s*$/)) {
                inFunctionSection = true;
                continue; // Skip the section header
            }

            // Check if we hit another ## section (not functions)
            if (line.startsWith('## ') && !line.includes('Functions')) {
                inFunctionSection = false;
            }

            // Only add lines that are not in function sections
            if (!inFunctionSection) {
                filteredLines.push(line);
            }
        }

        return filteredLines.join('\n');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CommunityBridgeDocumentation();
});
