// Central module configuration
// This file defines all modules and is used by the navigation, module loader, and module builder
const MODULES_CONFIG = {
    // Available modules with their display information
    modules: [
        { id: 'inventory', name: '📦 Inventory', icon: '🎒', order: 1, hasJson: true, hasDocs: true },
        { id: 'management', name: 'Management', icon: '👥', order: 2, hasJson: true, hasDocs: false },
        { id: 'notify', name: 'Notify', icon: '📢', order: 3, hasJson: true, hasDocs: false },
        { id: 'progressbar', name: 'ProgressBar', icon: '📏', order: 4, hasJson: true, hasDocs: false },
        { id: 'shops', name: 'Shops', icon: '🛒', order: 5, hasJson: true, hasDocs: false },
        { id: 'skills', name: 'Skills', icon: '📊', order: 6, hasJson: true, hasDocs: false },
        { id: 'target', name: 'Target', icon: '🎯', order: 7, hasJson: true, hasDocs: true },
        { id: 'vehiclekey', name: 'Vehicle Key', icon: '🔑', order: 10, hasJson: true, hasDocs: false },
    ],

    // Site configuration
    site: {
        title: 'Community Bridge Documentation',
        description: 'Unified FiveM Framework Integration',
        baseUrl: '/'
    },

    // Navigation structure
    navigation: [
        {
            title: 'Overview',
            url: '/index.html',
            icon: '🏠',
            type: 'page'
        },
        {
            title: 'Getting Started',
            url: '/pages/getting-started.html',
            icon: '🚀',
            type: 'page'
        },
        {
            title: 'Community Bridge',
            url: '#',
            icon: '🌉',
            type: 'category',
            children: [
                {
                    title: 'Modules',
                    url: '#',
                    icon: '📦',
                    type: 'modules-list' // Special type that will be populated with modules
                },
                {
                    title: 'Examples',
                    url: '/community_bridge/examples/',
                    icon: '📋',
                    type: 'page'
                }
            ]
        },
        {
            title: 'Contributing',
            url: '/pages/contributing.html',
            icon: '🤝',
            type: 'page'
        }
    ]
};

// Helper functions
const ModulesAPI = {
    // Get all modules
    getAll() {
        return MODULES_CONFIG.modules.sort((a, b) => a.order - b.order);
    },

    // Get modules with JSON files
    getWithJson() {
        return MODULES_CONFIG.modules.filter(m => m.hasJson).sort((a, b) => a.order - b.order);
    },

    // Get modules with documentation
    getWithDocs() {
        return MODULES_CONFIG.modules.filter(m => m.hasDocs).sort((a, b) => a.order - b.order);
    },

    // Get module by ID
    getById(id) {
        return MODULES_CONFIG.modules.find(m => m.id === id);
    },

    // Add new module
    add(module) {
        const maxOrder = Math.max(...MODULES_CONFIG.modules.map(m => m.order));
        module.order = maxOrder + 1;
        MODULES_CONFIG.modules.push(module);
        return module;
    },

    // Update module
    update(id, updates) {
        const index = MODULES_CONFIG.modules.findIndex(m => m.id === id);
        if (index !== -1) {
            MODULES_CONFIG.modules[index] = { ...MODULES_CONFIG.modules[index], ...updates };
            return MODULES_CONFIG.modules[index];
        }
        return null;
    },

    // Remove module
    remove(id) {
        const index = MODULES_CONFIG.modules.findIndex(m => m.id === id);
        if (index !== -1) {
            return MODULES_CONFIG.modules.splice(index, 1)[0];
        }
        return null;
    },

    // Reorder modules
    reorder(newOrder) {
        newOrder.forEach((id, index) => {
            const module = MODULES_CONFIG.modules.find(m => m.id === id);
            if (module) {
                module.order = index + 1;
            }
        });
        return MODULES_CONFIG.modules.sort((a, b) => a.order - b.order);
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MODULES_CONFIG, ModulesAPI };
}
