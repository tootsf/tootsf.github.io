class DocumentationSite {    constructor() {
        this.currentPage = null;
        this.pages = new Map();
        this.searchIndex = [];
        this.init();
    }    async init() {
        this.setupEventListeners();
        this.setupTheme();
        await this.loadNavigation();
        this.handleInitialRoute();
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Add keyboard navigation for search results
        searchInput.addEventListener('keydown', (e) => {
            const resultsContainer = document.querySelector('.search-results');
            if (!resultsContainer || resultsContainer.style.display === 'none') return;

            const results = resultsContainer.querySelectorAll('.search-result');
            if (results.length === 0) return;

            let activeIndex = Array.from(results).findIndex(r => r.classList.contains('active'));

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                activeIndex = activeIndex < results.length - 1 ? activeIndex + 1 : 0;
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                activeIndex = activeIndex > 0 ? activeIndex - 1 : results.length - 1;
            } else if (e.key === 'Enter' && activeIndex >= 0) {
                e.preventDefault();
                results[activeIndex].click();
                return;
            } else if (e.key === 'Escape') {
                this.hideSearchResults();
                return;
            } else {
                return; // Don't update active state for other keys
            }

            // Update active state
            results.forEach((result, index) => {
                result.classList.toggle('active', index === activeIndex);
            });
        });

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        themeToggle.addEventListener('click', () => this.toggleTheme());

        // Handle browser back/forward
        window.addEventListener('popstate', () => this.handleRoute());
    }

    setupTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeIcon(savedTheme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateThemeIcon(newTheme);
    }

    updateThemeIcon(theme) {
        const icon = document.querySelector('.theme-icon');
        icon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }    async loadNavigation() {
        try {
            // Load from generated structure file
            const response = await fetch('assets/pages-structure.json');
            if (response.ok) {
                const structure = await response.json();
                this.buildNavigation(structure);
                return;
            }
        } catch (error) {
            console.error('Error loading pages structure:', error);
        }

        // Fallback to manual structure
        this.scanAssetsFolder();
    }

    async generateStructureFromAssets() {
        // In a real implementation, this would scan the assets/pages folder
        // For now, we'll use the predefined structure with auto-discovery potential
        await this.scanAssetsFolder();
    }async scanAssetsFolder() {
        // Define the new folder-based structure
        const structure = {
            "Getting Started": {
                "type": "markdown",
                "path": "assets/pages/Getting Started/index.md",
                "icon": "🚀"
            },
            "Community Bridge": {
                "type": "folder",
                "path": "assets/pages/Community Bridge",
                "icon": "🌉",
                "children": {
                    "Overview": {
                        "type": "markdown",
                        "path": "assets/pages/Community Bridge/index.md",
                        "icon": "📖"
                    },
                    "Banking": {
                        "type": "json",
                        "path": "assets/pages/Community Bridge/Banking/banking.json",
                        "icon": "🏦",
                        "tocPath": "assets/pages/Community Bridge/Banking/toc.json"
                    }
                }
            }
        };

        this.buildNavigation(structure);
    }    buildNavigation(structure) {
        const navigation = document.getElementById('navigation');
        navigation.innerHTML = ''; // Clear existing navigation
        this.searchIndex = []; // Clear search index

        Object.entries(structure).forEach(([name, config]) => {
            const section = document.createElement('div');
            section.className = 'nav-section';

            if (config.children && Object.keys(config.children).length > 1) {
                // Has real children (not just Overview), make it collapsible
                const title = document.createElement('div');
                title.className = 'nav-title collapsible';
                title.innerHTML = `
                    <span class="nav-title-text">${config.icon || '📁'} ${name}</span>
                    <span class="nav-collapse-icon">▼</span>
                `;

                // Make the title text clickable for loading the main page
                const titleText = title.querySelector('.nav-title-text');
                titleText.style.cursor = 'pointer';
                titleText.addEventListener('click', (e) => {
                    e.stopPropagation();
                    // Remove active class from all nav elements
                    document.querySelectorAll('.nav-title').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

                    // Add active class to this title
                    title.classList.add('active');

                    // Load the main page (Overview)
                    const overviewConfig = config.children.Overview;
                    if (overviewConfig) {
                        this.loadPage(name, overviewConfig);
                    }
                });

                // Add click handler for collapse/expand (only on the icon)
                const collapseIcon = title.querySelector('.nav-collapse-icon');
                collapseIcon.addEventListener('click', (e) => {
                    e.stopPropagation();
                    title.classList.toggle('collapsed');
                    const list = title.nextElementSibling;
                    if (list) {
                        list.classList.toggle('collapsed');
                    }
                });

                section.appendChild(title);

                const list = document.createElement('ul');
                list.className = 'nav-list';

                Object.entries(config.children).forEach(([childName, childConfig]) => {
                    // Skip Overview as it's handled by the main title
                    if (childName === 'Overview') return;

                    const item = document.createElement('li');
                    item.className = 'nav-item';

                    const link = document.createElement('a');
                    link.href = '#';
                    link.className = 'nav-link';
                    link.innerHTML = `${childConfig.icon || '📄'} ${childName}`;
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.loadPage(childName, childConfig);
                    });

                    item.appendChild(link);
                    list.appendChild(item);

                    // Add to search index
                    this.searchIndex.push({
                        title: childName,
                        fullTitle: `${name} > ${childName}`,
                        path: childConfig.path,
                        type: childConfig.type,
                        config: childConfig
                    });
                });

                section.appendChild(list);

                // Add main page to search index
                if (config.children.Overview) {
                    this.searchIndex.push({
                        title: name,
                        fullTitle: name,
                        path: config.children.Overview.path,
                        type: config.children.Overview.type,
                        config: config.children.Overview
                    });
                }
            } else {
                // Single page or only has Overview - make it directly clickable
                const title = document.createElement('div');
                title.className = 'nav-title nav-title-clickable';
                title.innerHTML = `${config.icon || '📄'} ${name}`;
                title.style.cursor = 'pointer';

                // Determine which config to use
                let pageConfig = config;
                if (config.children && config.children.Overview) {
                    pageConfig = config.children.Overview;
                }

                // Make the title itself clickable
                title.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Remove active class from all nav elements
                    document.querySelectorAll('.nav-title').forEach(t => t.classList.remove('active'));
                    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));

                    // Add active class to this title
                    title.classList.add('active');

                    this.loadPage(name, pageConfig);
                });

                section.appendChild(title);

                // Add to search index
                this.searchIndex.push({
                    title: name,
                    fullTitle: name,
                    path: pageConfig.path,
                    type: pageConfig.type,
                    config: pageConfig
                });
            }

            navigation.appendChild(section);
        });
    }async loadPage(name, config) {
        try {
            console.log('Loading page:', name, 'with config:', config);
            // Update active navigation - clear all active states
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
            });
            document.querySelectorAll('.nav-title').forEach(title => {
                title.classList.remove('active');
            });

            // Find and activate the correct nav element
            const navLinks = document.querySelectorAll('.nav-link');
            const navTitles = document.querySelectorAll('.nav-title');

            // Check nav links first (for children)
            let found = false;
            navLinks.forEach(link => {
                if (link.textContent.includes(name)) {
                    link.classList.add('active');
                    found = true;
                }
            });

            // If not found in nav links, check nav titles (for single pages)
            if (!found) {
                navTitles.forEach(title => {
                    if (title.textContent.includes(name)) {
                        title.classList.add('active');
                    }
                });
            }

            const content = document.getElementById('main-content');
            content.innerHTML = '<div class="loading">Loading...</div>';

            if (config.type === 'json') {
                await this.loadJsonPage(name, config, content);
            } else if (config.type === 'markdown') {
                await this.loadMarkdownPage(name, config, content);
            } else {
                await this.loadHtmlPage(name, config, content);
            }            // Update URL
            const url = new URL(window.location);
            url.searchParams.set('page', name);
            window.history.pushState({page: name}, '', url);

            this.currentPage = name;
            // TOC will be generated by the individual page loaders (if needed)

        } catch (error) {
            console.error('Error loading page:', error);
            document.getElementById('main-content').innerHTML =
                '<div class="error">Error loading page. Please try again.</div>';
        }
    }    async loadJsonPage(name, config, content) {
        console.log('Loading JSON page:', name, 'from:', config.path);
        const response = await fetch(config.path);
        if (!response.ok) {
            throw new Error(`Failed to load ${config.path}: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('JSON loaded:', data);        const html = this.generateJsonPageHTML(name, data);
        content.innerHTML = html;

        // Apply syntax highlighting after a short delay
        setTimeout(() => this.applySyntaxHighlighting(), 100);

        // Load custom TOC if available, otherwise generate auto TOC
        if (config.tocPath) {
            await this.loadCustomTOC(config.tocPath);
        } else {
            this.generateTOC();
        }
    }async loadMarkdownPage(name, config, content) {
        console.log('Loading markdown page:', name, 'from:', config.path);
        const response = await fetch(config.path);
        if (!response.ok) {
            throw new Error(`Failed to load ${config.path}: ${response.status} ${response.statusText}`);
        }
        const markdown = await response.text();
        console.log('Markdown loaded, length:', markdown.length);

        const html = marked.parse(markdown);
        content.innerHTML = `
            <div class="markdown-content">
                <h1>${name}</h1>
                ${html}
            </div>
        `;        // Try to load custom TOC for markdown pages
        if (config.tocPath) {
            await this.loadCustomTOC(config.tocPath);
        } else {
            await this.tryLoadMarkdownTOC(config.path);
        }
    }

    async loadHtmlPage(name, config, content) {
        const response = await fetch(config.path);
        const html = await response.text();

        // Extract body content if it's a full HTML page
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const body = doc.body;

        content.innerHTML = body ? body.innerHTML : html;
    }

    generateJsonPageHTML(name, data) {
        const { icon = '📄', description = '', clientFunctions = [], serverFunctions = [] } = data;

        let html = `
            <div class="module-header">
                <div class="module-icon">${icon}</div>
                <h1 class="module-title">${name}</h1>
                <p class="module-description">${description}</p>
            </div>
        `;

        if (clientFunctions.length > 0) {
            html += `
                <section class="functions-section">
                    <h2 id="client-functions">Client Functions</h2>
                    ${clientFunctions.map(func => this.generateFunctionHTML(func, 'client')).join('')}
                </section>
            `;
        }

        if (serverFunctions.length > 0) {
            html += `
                <section class="functions-section">
                    <h2 id="server-functions">Server Functions</h2>
                    ${serverFunctions.map(func => this.generateFunctionHTML(func, 'server')).join('')}
                </section>
            `;
        }

        return html;
    }

    generateFunctionHTML(func, type) {
        const { name, description, syntax, parameters = [], returns = [], example } = func;

        return `
            <div class="function-card" id="function-${name.toLowerCase()}">
                <div class="function-header">
                    <h3 class="function-name">${name}</h3>
                    <span class="function-type">${type}</span>
                </div>

                <p class="function-description">${description}</p>

                <div class="function-section">
                    <h4>Syntax</h4>
                    <div class="function-syntax">${syntax}</div>
                </div>

                ${parameters.length > 0 ? `
                    <div class="function-section">
                        <h4>Parameters</h4>
                        <ul class="param-list">
                            ${parameters.map(param => `
                                <li class="param-item">
                                    <div class="param-name">${param.name} <span class="param-type">(${param.type})</span></div>
                                    <div class="param-description">${param.description}</div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}

                ${returns.length > 0 ? `
                    <div class="function-section">
                        <h4>Returns</h4>
                        <ul class="return-list">
                            ${returns.map(ret => `
                                <li class="return-item">
                                    <div class="return-type">${ret.type}</div>
                                    <div class="return-description">${ret.description}</div>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                ` : ''}                ${example ? `
                    <div class="function-section">
                        <h4>Example</h4>
                        <pre class="function-example"><code>${example.replace(/\\n/g, '\n').replace(/\\t/g, '    ')}</code></pre>
                    </div>
                ` : ''}
            </div>
        `;
    }    async loadCustomTOC(tocPath) {
        try {
            const response = await fetch(tocPath);
            const tocData = await response.json();
            this.generateCustomTOC(tocData);
        } catch (error) {
            console.error('Error loading custom TOC:', error);
            this.generateTOC(); // Fallback to auto-generated TOC
        }
    }

    async tryLoadMarkdownTOC(markdownPath) {
        try {
            // Convert markdown path to toc.json path
            // e.g., "assets/pages/Getting Started/index.md" -> "assets/pages/Getting Started/toc.json"
            const tocPath = markdownPath.replace('/index.md', '/toc.json');

            const response = await fetch(tocPath);
            if (response.ok) {
                const tocData = await response.json();
                this.generateCustomTOC(tocData);
                console.log('Loaded custom TOC from:', tocPath);
            } else {
                // No custom TOC found, use auto-generated
                this.generateTOC();
            }
        } catch (error) {
            console.log('No custom TOC found, using auto-generated');
            this.generateTOC();
        }
    }    generateCustomTOC(tocData) {
        const tocSidebar = document.getElementById('toc-sidebar');
        const tocList = document.getElementById('toc-list');

        tocSidebar.classList.add('show');
        tocList.innerHTML = '';

        // Create the title
        const title = document.createElement('h3');
        title.textContent = tocData.title || 'On this page';
        title.className = 'toc-title';
        tocList.appendChild(title);

        // Create the items container
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'toc-items-container';
        tocList.appendChild(itemsContainer);

        this.renderTOCItems(tocData.items, itemsContainer);
    }    renderTOCItems(items, container, level = 0) {
        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `toc-item toc-level-${level}`;

            const link = document.createElement('a');
            link.href = item.anchor || '#';
            link.className = 'toc-link';
            link.textContent = item.title;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(item.anchor);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });

                    // Update active state
                    document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                    link.classList.add('active');
                }
            });

            itemElement.appendChild(link);
            container.appendChild(itemElement);

            // Render children if they exist
            if (item.children && item.children.length > 0) {
                const childContainer = document.createElement('div');
                childContainer.className = 'toc-children';
                itemElement.appendChild(childContainer);
                this.renderTOCItems(item.children, childContainer, level + 1);
            }
        });
    }    generateTOC() {
        const tocSidebar = document.getElementById('toc-sidebar');
        const tocList = document.getElementById('toc-list');

        // Find all headings in the content
        const headings = document.querySelectorAll('#main-content h1, #main-content h2, #main-content h3, #main-content h4');

        if (headings.length === 0) {
            tocSidebar.classList.remove('show');
            return;
        }

        tocSidebar.classList.add('show');
        tocList.innerHTML = '';

        // Create the title
        const title = document.createElement('h3');
        title.textContent = 'On this page';
        title.className = 'toc-title';
        tocList.appendChild(title);

        // Create the items container
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'toc-items-container';
        tocList.appendChild(itemsContainer);

        headings.forEach(heading => {
            if (!heading.id) {
                heading.id = heading.textContent.toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '');
            }

            const level = parseInt(heading.tagName.charAt(1)) - 1; // h1=0, h2=1, h3=2, h4=3
            const item = document.createElement('div');
            item.className = `toc-item toc-level-${Math.min(level, 3)}`; // Max 3 levels

            const link = document.createElement('a');
            link.href = `#${heading.id}`;
            link.className = 'toc-link';
            link.textContent = heading.textContent;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });

                // Update active state
                document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });

            item.appendChild(link);
            itemsContainer.appendChild(item);
        });

        // Update active TOC item on scroll
        this.updateActiveTOCItem();
    }

    updateActiveTOCItem() {
        const headings = document.querySelectorAll('#main-content h1, #main-content h2, #main-content h3');
        const tocLinks = document.querySelectorAll('.toc-link');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    tocLinks.forEach(link => link.classList.remove('active'));
                    const activeLink = document.querySelector(`.toc-link[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, { threshold: 0.5 });

        headings.forEach(heading => observer.observe(heading));
    }    async handleSearch(query) {
        if (query.length < 2) {
            this.hideSearchResults();
            return;
        }

        const results = await this.performAdvancedSearch(query);
        this.showSearchResults(results);
    }

    async performAdvancedSearch(query) {
        const lowerQuery = query.toLowerCase();
        const searchResults = [];

        for (const item of this.searchIndex) {
            let score = 0;
            let matchDetails = [];

            // Basic title/path matching
            if (item.title.toLowerCase().includes(lowerQuery)) {
                score += item.title.toLowerCase() === lowerQuery ? 100 : 50;
                matchDetails.push({ type: 'title', text: item.title });
            }

            if (item.path.toLowerCase().includes(lowerQuery)) {
                score += 10;
            }            // For JSON files, search within the content
            if (item.type === 'json') {
                try {
                    const response = await fetch(item.path);
                    const jsonData = await response.json();

                    // Search through clientFunctions and serverFunctions
                    const functionArrays = [
                        ...(jsonData.clientFunctions || []),
                        ...(jsonData.serverFunctions || [])
                    ];

                    const functionMatches = [];

                    for (const funcData of functionArrays) {
                        let funcScore = 0;
                        let funcMatchDetails = [];

                        if (funcData.name && funcData.name.toLowerCase().includes(lowerQuery)) {
                            funcScore += funcData.name.toLowerCase() === lowerQuery ? 80 : 30;
                            funcMatchDetails.push({
                                type: 'function',
                                text: funcData.name,
                                description: funcData.description || ''
                            });
                        }

                        // Search in description
                        if (funcData.description && funcData.description.toLowerCase().includes(lowerQuery)) {
                            funcScore += 20;
                            funcMatchDetails.push({
                                type: 'description',
                                text: funcData.description,
                                function: funcData.name
                            });
                        }

                        // Search in parameters
                        if (funcData.parameters) {
                            for (const param of funcData.parameters) {
                                if (param.name && param.name.toLowerCase().includes(lowerQuery)) {
                                    funcScore += 15;
                                    funcMatchDetails.push({
                                        type: 'parameter',
                                        text: param.name,
                                        function: funcData.name
                                    });
                                }
                            }
                        }

                        // Search in syntax
                        if (funcData.syntax && funcData.syntax.toLowerCase().includes(lowerQuery)) {
                            funcScore += 10;
                            funcMatchDetails.push({
                                type: 'syntax',
                                text: funcData.syntax,
                                function: funcData.name
                            });
                        }

                        // If this function has matches, add it as a separate result
                        if (funcScore > 0) {
                            functionMatches.push({
                                ...item,
                                score: funcScore,
                                matchDetails: funcMatchDetails,
                                bestMatch: funcMatchDetails[0],
                                functionName: funcData.name,
                                displayTitle: `${item.title} - ${funcData.name}`
                            });
                        }
                    }

                    // Add all function matches
                    searchResults.push(...functionMatches);

                    // Search in module name and description (only add if no function matches or if score is high)
                    if (jsonData.name && jsonData.name.toLowerCase().includes(lowerQuery)) {
                        score += 25;
                        matchDetails.push({
                            type: 'module',
                            text: jsonData.name,
                            description: jsonData.description || ''
                        });
                    }

                    if (jsonData.description && jsonData.description.toLowerCase().includes(lowerQuery)) {
                        score += 15;
                        matchDetails.push({
                            type: 'module_description',
                            text: jsonData.description
                        });
                    }

                    // Only add page-level match if there are no function matches or if it's a strong page match
                    if (functionMatches.length === 0 && score > 0) {
                        searchResults.push({
                            ...item,
                            score: score,
                            matchDetails: matchDetails,
                            bestMatch: matchDetails[0] || { type: 'title', text: item.title }
                        });
                    }

                } catch (error) {
                    console.warn('Error searching JSON content:', error);
                    // Fallback to basic matching
                    if (score > 0) {
                        searchResults.push({
                            ...item,
                            score: score,
                            matchDetails: matchDetails,
                            bestMatch: matchDetails[0] || { type: 'title', text: item.title }
                        });
                    }
                }
            } else {
                // For markdown files, search basic content
                if (item.type === 'markdown') {
                    try {
                        const response = await fetch(item.path);
                        const content = await response.text();
                        if (content.toLowerCase().includes(lowerQuery)) {
                            score += 15;
                            matchDetails.push({ type: 'content', text: 'Content match' });
                        }
                    } catch (error) {
                        console.warn('Error searching markdown content:', error);
                    }
                }

                // Add page-level result for non-JSON files
                if (score > 0) {
                    searchResults.push({
                        ...item,
                        score: score,
                        matchDetails: matchDetails,
                        bestMatch: matchDetails[0] || { type: 'title', text: item.title }
                    });
                }
            }
        }

        // Sort by score (highest first)
        return searchResults.sort((a, b) => b.score - a.score);
    }    showSearchResults(results) {
        let resultsContainer = document.querySelector('.search-results');
        if (!resultsContainer) {
            resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            document.querySelector('.search-input').parentNode.style.position = 'relative';
            document.querySelector('.search-input').parentNode.appendChild(resultsContainer);
        }

        if (results.length === 0) {
            resultsContainer.innerHTML = '<div class="search-result">No results found</div>';
        } else {            resultsContainer.innerHTML = results.slice(0, 10).map(result => {
                let matchInfo = '';
                let displayTitle = result.displayTitle || result.title;

                if (result.bestMatch.type === 'function') {
                    matchInfo = `<div class="search-result-match">📋 Function: ${result.bestMatch.text}</div>`;
                } else if (result.bestMatch.type === 'description') {
                    matchInfo = `<div class="search-result-match">📄 In: ${result.bestMatch.function}</div>`;
                } else if (result.bestMatch.type === 'parameter') {
                    matchInfo = `<div class="search-result-match">🔧 Parameter in: ${result.bestMatch.function}</div>`;
                } else if (result.bestMatch.type === 'syntax') {
                    matchInfo = `<div class="search-result-match">⚡ Syntax match in: ${result.bestMatch.function}</div>`;
                } else if (result.bestMatch.type === 'module') {
                    matchInfo = `<div class="search-result-match">📦 Module: ${result.bestMatch.text}</div>`;
                } else if (result.bestMatch.type === 'module_description') {
                    matchInfo = `<div class="search-result-match">📖 Module description</div>`;
                } else if (result.bestMatch.type === 'content') {
                    matchInfo = `<div class="search-result-match">📝 Content match</div>`;
                }

                return `
                    <div class="search-result" data-page="${result.title}" data-anchor="${result.functionName || (result.bestMatch.type === 'function' ? result.bestMatch.text : '')}">
                        <div class="search-result-title">${displayTitle}</div>
                        ${matchInfo}
                        <div class="search-result-path">${result.fullTitle || result.path}</div>
                    </div>
                `;
            }).join('');

            // Add click handlers
            resultsContainer.querySelectorAll('.search-result').forEach(result => {
                result.addEventListener('click', () => {
                    const pageName = result.dataset.page;
                    const anchor = result.dataset.anchor;
                    const pageConfig = this.searchIndex.find(item => item.title === pageName);
                    if (pageConfig) {                        this.loadPage(pageName, pageConfig.config).then(() => {
                            // If there's an anchor (function name), scroll to it
                            if (anchor) {
                                setTimeout(() => {
                                    const element = document.getElementById(`function-${anchor.toLowerCase()}`);
                                    if (element) {
                                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                        element.style.backgroundColor = 'var(--accent-color-light)';
                                        element.style.border = '2px solid var(--accent-color)';
                                        element.style.borderRadius = '0.5rem';
                                        setTimeout(() => {
                                            element.style.backgroundColor = '';
                                            element.style.border = '';
                                            element.style.borderRadius = '';
                                        }, 3000);
                                    }
                                }, 500);
                            }
                        });
                        this.hideSearchResults();
                        document.getElementById('search').value = '';
                    }
                });
            });
        }

        resultsContainer.style.display = 'block';
    }

    hideSearchResults() {
        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }    handleInitialRoute() {
        console.log('handleInitialRoute called, search index length:', this.searchIndex.length);

        const urlParams = new URLSearchParams(window.location.search);
        const page = urlParams.get('page');
        const searchQuery = urlParams.get('search');        // Handle search query in URL
        if (searchQuery) {
            console.log('Search query from URL:', searchQuery);
            document.getElementById('search').value = searchQuery;
            this.handleSearch(searchQuery);
            return;
        }

        if (page) {
            console.log('Looking for page:', page);
            const pageConfig = this.searchIndex.find(item => item.title === page);
            if (pageConfig) {
                console.log('Found page config:', pageConfig);
                this.loadPage(page, pageConfig.config);
                return;
            } else {
                console.log('Page not found in search index');
            }
        }

        // Load first page by default
        if (this.searchIndex.length > 0) {
            const firstPage = this.searchIndex[0];
            console.log('Loading first page:', firstPage.title);
            this.loadPage(firstPage.title, firstPage.config);
        } else {
            console.log('No pages in search index to load');
            // Show welcome message if no pages available
            document.getElementById('main-content').innerHTML = `
                <div class="welcome-section">
                    <h1>Welcome to the Documentation</h1>
                    <p>No pages are currently available. Please check your configuration.</p>
                </div>
            `;
        }
    }

    handleRoute() {
        this.handleInitialRoute();
    }    applySyntaxHighlighting() {
        // Find all code elements in example sections and apply Lua syntax highlighting
        const codeElements = document.querySelectorAll('.function-example code');

        codeElements.forEach(codeElement => {
            const code = codeElement.textContent;
            if (code && code.trim()) {
                // Apply Lua syntax highlighting using CSS classes
                let highlighted = code
                    // Handle strings first (to avoid highlighting inside strings)
                    .replace(/(["'])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="lua-string">$1$2$1</span>')
                    // Comments
                    .replace(/--.*$/gm, '<span class="lua-comment">$&</span>')
                    // Keywords
                    .replace(/\b(local|function|return|if|then|else|elseif|end|for|while|do|break|repeat|until|nil|true|false|and|or|not|in)\b/g, '<span class="lua-keyword">$1</span>')
                    // Numbers
                    .replace(/\b(\d+(?:\.\d+)?)\b/g, '<span class="lua-number">$1</span>')
                    // Bridge API highlighting
                    .replace(/\b(exports)\b/g, '<span class="lua-exports">$1</span>')
                    .replace(/\b(Bridge)\b/g, '<span class="lua-bridge">$1</span>')
                    // Function calls
                    .replace(/(\w+)(\()/g, '<span class="lua-method">$1</span>$2')
                    // Variables (assignments)
                    .replace(/\b([a-zA-Z_][a-zA-Z0-9_]*)\s*=/g, '<span class="lua-variable">$1</span> =')
                    // Operators
                    .replace(/(\+|\-|\*|\/|%|\^|==|~=|<=|>=|<|>|=)/g, '<span class="lua-operator">$1</span>');

                codeElement.innerHTML = highlighted;
            }
        });
    }
}

// Initialize the documentation site
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, creating DocumentationSite...');
    try {
        new DocumentationSite();
    } catch (error) {
        console.error('Error creating DocumentationSite:', error);
    }
});

// Close search results when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header-nav')) {
        const resultsContainer = document.querySelector('.search-results');
        if (resultsContainer) {
            resultsContainer.style.display = 'none';
        }
    }
});
