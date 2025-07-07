// Community Bridge Markdown Documentation System - V2
class CommunityBridgeDocumentation {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        this.allModules = {};
        this.searchIndex = [];
        this.isLoading = false;
        this.currentModule = null;
        this.currentModuleName = null;

        this.init();
    }

    async init() {
        console.log('🚀 Initializing Documentation System...');
        try {
            this.setupTheme();
            this.setupEventListeners();
            await this.loadModuleStructure();
            this.renderNavigation();
            this.setupRouter();
            await this.handleInitialPageLoad();
            console.log('✅ Initialization complete!');
        } catch (error) {
            console.error('❌ Initialization failed:', error);
            this.showError('Failed to initialize the documentation site. Check the console for details.');
        }
    }

    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.textContent = this.currentTheme === 'dark' ? '☀️ Light' : '🌙 Dark';
        }
    }

    setupEventListeners() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('focus', (e) => this.handleSearch(e.target.value)); // Show results on focus
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.search-container')) {
                    this.hideSearchResults();
                }
            });
        }

        const mobileNavToggle = document.getElementById('mobile-nav-toggle');
        const sidebar = document.getElementById('sidebar');
        if (mobileNavToggle && sidebar) {
            mobileNavToggle.addEventListener('click', () => {
                sidebar.classList.toggle('open');
            });
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', this.currentTheme);
        this.setupTheme();
    }

    async loadModuleStructure() {
        this.setLoading(true);
        try {
            console.log('🗺️ Loading module structure...');
            // In a real-world scenario, a Node.js script would generate this `structure.json` before deployment.
            // We will create a mock structure for now, and you can replace it with a generated file later.
            this.allModules = await this.discoverStructureDynamically('./assets/pages');
            await this.buildSearchIndex();
        } catch (error) {
            console.error('❌ Error loading module structure:', error);
            this.showError('Could not load the documentation structure.');
        } finally {
            this.setLoading(false);
        }
    }

    async discoverStructureDynamically(basePath) {
        console.log("🚀 Starting dynamic discovery...");
        const structure = {};

        // Define categories and their icons
        const categories = [
            { name: "Community Bridge", icon: "🌉" },
            { name: "Examples", icon: "💡" },
            { name: "Getting Started", icon: "🚀" }
        ];

        // Helper function to check if a file exists
        const fileExists = async (path) => {
            try {
                const response = await fetch(path, { method: 'HEAD' });
                return response.ok;
            } catch (e) {
                return false;
            }
        };

        // Helper function to discover content in a folder
        const discoverFolder = async (folderPath, knownItems) => {
            const items = {};
            for (const item of knownItems) {
                const mdPath = `${folderPath}/${item}/${item}.md`;
                const overviewPath = `${folderPath}/${item}/overview.md`;
                const indexPath = `${folderPath}/${item}/index.md`;

                if (await fileExists(mdPath)) {
                    items[item] = { path: mdPath, type: 'markdown', name: item };
                } else if (await fileExists(overviewPath)) {
                    items[item] = { path: overviewPath, type: 'markdown', name: item };
                } else if (await fileExists(indexPath)) {
                    items[item] = { path: indexPath, type: 'markdown', name: item };
                }
            }
            return items;
        };

        for (const category of categories) {
            const categoryPath = `${basePath}/${category.name}`;
            const categoryItems = {};

            // Discover top-level markdown files
            const topLevelFiles = ["overview", "getting-started", "index", "basic-usage", "advanced"];
            for (const file of topLevelFiles) {
                const filePath = `${categoryPath}/${file}.md`;
                if (await fileExists(filePath)) {
                    categoryItems[file] = { path: filePath, type: 'markdown', name: file };
                }
            }

            // Discover subfolders like "Libraries" and "Modules"
            const subFolders = {
                "Libraries": { icon: "📚", items: [ "Anim", "Batch", "Cache", "Callback", "Cutscenes", "DUI", "Entities", "Generators", "Ids", "Logs", "Markers", "Math", "Particles", "Placers", "Point", "Points", "Raycast", "Scaleform", "Shells", "SQL", "StateBags", "Table", "Utility" ] },
                "Modules": { icon: "📦", items: [ "Banking", "Clothing", "Dialogue", "Dispatch", "Doorlock", "Framework", "Fuel", "HelpText", "Housing", "Input", "Inventory", "Locales", "Managment", "Math", "Menu", "Notify", "Phone", "ProgressBar", "Shops", "Skills", "Target", "VehicleKey", "Version", "Weather" ] }
            };

            for (const folderName in subFolders) {
                const folderConfig = subFolders[folderName];
                const discoveredItems = await discoverFolder(`${categoryPath}/${folderName}`, folderConfig.items);
                if (Object.keys(discoveredItems).length > 0) {
                    categoryItems[folderName] = {
                        path: `${categoryPath}/${folderName}`,
                        type: 'folder',
                        icon: folderConfig.icon,
                        items: discoveredItems,
                        name: folderName
                    };
                }
            }

            structure[category.name] = {
                path: categoryPath,
                type: 'category',
                icon: category.icon,
                items: categoryItems,
                name: category.name
            };
        }
        console.log("✅ Dynamic discovery complete!", structure);
        return structure;
    }

    renderNavigation() {
        const navMenu = document.getElementById('nav-menu');
        if (!navMenu) return;
        navMenu.innerHTML = this.buildNavHtml(this.allModules);
        this.setupNavEventListeners();
    }

    buildNavHtml(items, pathPrefix = '') {
        let html = '';
        for (const key in items) {
            const item = items[key];
            const currentPath = pathPrefix ? `${pathPrefix}/${key}` : key;
            const safeId = currentPath.replace(/[^a-zA-Z0-9]/g, '-');

            if (item.type === 'category' || item.type === 'folder') {
                html += `
                    <div class="nav-group" data-path="${currentPath}">
                        <div class="nav-group-header" data-path="${currentPath}">
                            <span class="nav-arrow">▶</span>
                            <span class="nav-icon">${item.icon || '📁'}</span>
                            <span class="nav-title">${this.formatTitle(item.name || key)}</span>
                        </div>
                        <div class="nav-group-content" id="nav-content-${safeId}">
                            ${this.buildNavHtml(item.items, currentPath)}
                        </div>
                    </div>
                `;
            } else if (item.type === 'markdown') {
                html += `
                    <a class="nav-item" href="#${item.path.replace('.md', '')}" data-path="${item.path}">
                        <span class="nav-icon">📄</span>
                        <span class="nav-title">${this.formatTitle(item.name || key)}</span>
                    </a>
                `;
            }
        }
        return html;
    }

    setupNavEventListeners() {
        document.querySelectorAll('.nav-group-header').forEach(header => {
            header.addEventListener('click', (e) => {
                const group = e.currentTarget.parentElement;
                group.classList.toggle('open');
                const arrow = e.currentTarget.querySelector('.nav-arrow');
                arrow.textContent = group.classList.contains('open') ? '▼' : '▶';
            });
        });
    }

    setupRouter() {
        window.addEventListener('hashchange', () => this.handleRouteChange());
    }

    async handleInitialPageLoad() {
        await this.handleRouteChange();
        const path = window.location.hash.slice(1) || 'Community Bridge/overview';
        this.expandNavToPath(path + '.md');
    }

    async handleRouteChange() {
        let path = window.location.hash.slice(1);
        if (!path) {
            path = 'Community Bridge/overview'; // Default page
            window.location.hash = path;
            return;
        }

        let functionToScrollTo = null;
        if (path.includes('#')) {
            [path, functionToScrollTo] = path.split('#');
        }

        const item = this.findItemByPath(path + '.md');
        if (!item) {
            this.showError(`Page not found for path: ${path}`);
            return;
        }

        await this.loadContent(path, functionToScrollTo);
    }

    async loadContent(path, functionToScrollTo = null) {
        this.setLoading(true);
        this.hideSearchResults();
        document.getElementById('toc-container').style.display = 'none';

        try {
            const response = await fetch(`./assets/pages/${path}.md`);
            if (!response.ok) throw new Error(`File not found: ${path}.md`);
            const markdown = await response.text();

            this.currentModule = this.findItemByPath(path + '.md');
            this.currentModuleName = path.split('/').pop();

            this.renderPage(markdown);

            if (functionToScrollTo) {
                setTimeout(() => this.scrollToElement(functionToScrollTo), 100);
            } else {
                document.querySelector('.main-content').scrollTop = 0;
            }

            this.updateActiveNav(path + '.md');

        } catch (error) {
            console.error(`❌ Error loading content for ${path}:`, error);
            this.showError(`Failed to load content for "${path}".`);
        } finally {
            this.setLoading(false);
        }
    }

    renderPage(markdown) {
        const contentArea = document.getElementById('content-area');
        const functions = this.parseFunctionsFromMarkdown(markdown);
        const contentHtml = this.renderMarkdown(markdown);
        const functionsHtml = this.renderFunctions(functions);

        contentArea.innerHTML = contentHtml + functionsHtml;
        this.updateTableOfContents(functions);
        this.setupCopyButtons();
        this.applySyntaxHighlighting();
    }

    parseFunctionsFromMarkdown(markdown) {
        const functions = [];
        const regex = /<--FNC\s*([\s\S]*?)\s*FNC-->/g;
        let match;
        while ((match = regex.exec(markdown)) !== null) {
            try {
                // This is a simple parser. A more robust solution would use a proper library.
                const funcData = JSON.parse(match[1]);
                functions.push(funcData);
            } catch (e) {
                console.error("Failed to parse function JSON:", e, match[1]);
            }
        }
        return functions;
    }

    renderMarkdown(markdown) {
        const cleanMarkdown = markdown.replace(/<--FNC\s*[\s\S]*?\s*FNC-->/g, '');
        // Basic markdown conversion
        let html = cleanMarkdown
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*([\s\S]+?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/```lua\n([\s\S]*?)```/g, '<div class="code-block-container"><button class="copy-code-btn">Copy</button><pre><code class="language-lua">$1</code></pre></div>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
            .split('\n').map(p => p.trim() ? `<p>${p}</p>` : '').join('');
        return html;
    }

    renderFunctions(functions) {
        if (functions.length === 0) return '';
        return '<h2 id="functions-header">Functions</h2>' + functions.map(func => this.renderFunction(func)).join('');
    }

    renderFunction(func) {
        const anchor = this.generateAnchor(func.name, func.side, this.currentModuleName);
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

        const example = func.example ? `<div class="code-block-container"><button class="copy-code-btn">Copy</button><pre><code class="language-lua">${func.example.join('\n')}</code></pre></div>` : '<p>No example provided.</p>';

        return `
            <div class="function-card" id="${anchor}">
                <div class="function-header">
                    <span class="function-name">${func.name}</span>
                    <div class="function-meta">
                        <span class="function-side ${func.side}">${func.side}</span>
                        <button class="copy-link-btn" title="Copy Link" data-anchor="${anchor}">🔗</button>
                    </div>
                </div>
                <div class="function-body">
                    <p class="function-description">${func.description}</p>
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

    updateTableOfContents(functions) {
        const tocContainer = document.getElementById('toc-container');
        const tocContent = document.getElementById('toc-content');
        if (!tocContent || functions.length === 0) {
            tocContainer.style.display = 'none';
            return;
        }

        tocContent.innerHTML = '<ul>' + functions.map(func => {
            const anchor = this.generateAnchor(func.name, func.side, this.currentModuleName);
            return `<li><a href="#${window.location.hash.split('#')[0]}#${anchor}" class="toc-link">${func.name}</a></li>`;
        }).join('') + '</ul>';

        tocContainer.style.display = 'block';
        this.addTocClickHandlers(tocContent);
    }

    addTocClickHandlers(container) {
        container.querySelectorAll('a.toc-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const anchorId = e.currentTarget.getAttribute('href').split('#')[2];
                this.scrollToElement(anchorId);
            });
        });
    }

    async buildSearchIndex() {
        this.searchIndex = [];
        const paths = this.getAllMarkdownPaths(this.allModules);

        for (const path of paths) {
            try {
                const response = await fetch(`./assets/pages/${path}`);
                if (!response.ok) continue;
                const markdown = await response.text();
                const functions = this.parseFunctionsFromMarkdown(markdown);
                const moduleName = path.split('/').pop().replace('.md', '');
                const item = this.findItemByPath(path);

                this.searchIndex.push({
                    type: 'Module',
                    name: this.formatTitle(item.name || moduleName),
                    path: path.replace('.md', ''),
                    text: `module documentation page`
                });

                functions.forEach(func => {
                    this.searchIndex.push({
                        type: 'Function',
                        name: func.name,
                        path: path.replace('.md', ''),
                        anchor: this.generateAnchor(func.name, func.side, moduleName),
                        text: `${func.side} side. ${func.description}`
                    });
                });
            } catch (e) {
                console.warn(`Could not build search index for ${path}:`, e);
            }
        }
        console.log(`📚 Search index built with ${this.searchIndex.length} items.`);
    }

    handleSearch(query) {
        const searchResults = document.querySelector('.search-results');
        if (!query || query.trim().length < 2) {
            searchResults.style.display = 'none';
            return;
        }

        const results = this.searchIndex.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.text.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length > 0) {
            searchResults.innerHTML = results.map(r => `
                <a href="#${r.path}${r.anchor ? '#' + r.anchor : ''}" class="search-result-item">
                    <div class="result-type">${r.type}</div>
                    <div class="result-name">${r.name}</div>
                    <div class="result-text">${r.text}</div>
                </a>
            `).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="search-no-results">No results found</div>';
            searchResults.style.display = 'block';
        }
    }

    hideSearchResults() {
        const searchResults = document.querySelector('.search-results');
        if (searchResults) {
            searchResults.style.display = 'none';
        }
    }

    setLoading(isLoading) {
        this.isLoading = isLoading;
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.style.display = isLoading ? 'flex' : 'none';
        }
    }

    showError(message) {
        const contentArea = document.getElementById('content-area');
        contentArea.innerHTML = `<div class="error-message"><h2>❌ Error</h2><p>${message}</p></div>`;
    }

    formatTitle(title) {
        return title.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    generateAnchor(name, side, module) {
        return `${name}-${side}-${module}`.toLowerCase();
    }

    scrollToElement(id) {
        const element = document.getElementById(id);
        if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
            element.classList.add('highlight');
            setTimeout(() => element.classList.remove('highlight'), 2000);
        }
    }

    setupCopyButtons() {
        document.querySelectorAll('.copy-link-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const pagePath = window.location.hash.split('#')[1];
                const anchor = e.currentTarget.dataset.anchor;
                const url = `${window.location.origin}${window.location.pathname}#${pagePath}#${anchor}`;
                navigator.clipboard.writeText(url).then(() => {
                    e.currentTarget.textContent = '✅';
                    setTimeout(() => e.currentTarget.textContent = '🔗', 2000);
                });
            });
        });
        document.querySelectorAll('.copy-code-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const code = e.currentTarget.nextElementSibling.textContent;
                navigator.clipboard.writeText(code).then(() => {
                    e.currentTarget.textContent = 'Copied!';
                    setTimeout(() => e.currentTarget.textContent = 'Copy', 2000);
                });
            });
        });
    }

    applySyntaxHighlighting() {
        // This is a placeholder. For real highlighting, integrate a library like Prism.js or highlight.js
        document.querySelectorAll('code.language-lua').forEach(block => {
            const keywords = ['local', 'function', 'end', 'if', 'then', 'else', 'for', 'while', 'do', 'return', 'true', 'false', 'nil'];
            let html = block.innerHTML;
            keywords.forEach(k => {
                const regex = new RegExp(`\\b${k}\\b`, 'g');
                html = html.replace(regex, `<span class="keyword">${k}</span>`);
            });
            block.innerHTML = html;
        });
    }

    findItemByPath(path, items = this.allModules) {
        for (const key in items) {
            const item = items[key];
            if (item.path === path) return item;
            if (item.items) {
                const found = this.findItemByPath(path, item.items);
                if (found) return found;
            }
        }
        return null;
    }

    getAllMarkdownPaths(items = this.allModules) {
        let paths = [];
        for (const key in items) {
            const item = items[key];
            if (item.type === 'markdown') {
                paths.push(item.path);
            } else if (item.items) {
                paths = paths.concat(this.getAllMarkdownPaths(item.items));
            }
        }
        return paths;
    }

    updateActiveNav(path) {
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.path === path);
        });
    }

    expandNavToPath(path) {
        const navItem = document.querySelector(`.nav-item[data-path="${path}"]`);
        if (navItem) {
            let current = navItem.parentElement;
            while (current && current.classList.contains('nav-group-content')) {
                const group = current.parentElement;
                if (group && group.classList.contains('nav-group')) {
                    group.classList.add('open');
                    const arrow = group.querySelector('.nav-arrow');
                    if(arrow) arrow.textContent = '▼';
                }
                current = group.parentElement;
            }
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new CommunityBridgeDocumentation();
});
