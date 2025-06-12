// Simple client-side search across loaded JSON module data
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
let modulesData = {};

// Dynamic module loading for search
async function loadModulesForSearch() {
    try {
        let modules = [];

        // Try to get module list from auto-discovery
        if (typeof AutoModuleDiscovery !== 'undefined') {
            try {
                modules = await AutoModuleDiscovery.getAll();
                console.log(`🔍 Search: Loading ${modules.length} auto-discovered modules for search`);
            } catch (error) {
                console.warn('Failed to load modules from auto-discovery for search:', error);
            }
        }

        // Fallback to static list
        if (modules.length === 0) {
            modules = [
                { id: 'vehiclekey', name: 'Vehicle Key' },
                { id: 'target', name: 'Target' },
                { id: 'skills', name: 'Skills' },
                { id: 'shops', name: 'Shops' },
                { id: 'progressbar', name: 'ProgressBar' },
                { id: 'notify', name: 'Notify' },
                { id: 'management', name: 'Management' },
                { id: 'inventory', name: 'Inventory' }
            ];
        }

        // Load all module JSONs
        modules.forEach(module => {
            fetch(`assets/data/${module.id}.json`)
                .then(res => res.json())
                .then(data => modulesData[module.id] = data)
                .catch(() => {
                    console.warn(`Failed to load search data for module: ${module.id}`);
                });
        });

        console.log(`🔍 Search: Loading data for ${modules.length} modules`);
    } catch (error) {
        console.error('Error loading modules for search:', error);
    }
}

// Initialize search when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadModulesForSearch();
});

function performSearch(query) {
    const results = [];
    Object.values(modulesData).forEach(module => {
        module.clientFunctions.forEach(func => {
            if (func.name.toLowerCase().includes(query) || func.description.toLowerCase().includes(query)) {
                results.push({module: module, func: func, type: 'client'});
            }
        });
        module.serverFunctions.forEach(func => {
            if (func.name.toLowerCase().includes(query) || func.description.toLowerCase().includes(query)) {
                results.push({module: module, func: func, type: 'server'});
            }
        });
    });
    return results;
}

searchInput.addEventListener('input', () => {
    const q = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = '';
    if (q.length < 2) return;
    const matches = performSearch(q);
    matches.slice(0, 10).forEach(match => {
        const a = document.createElement('a');
        a.href = `module.html?module=${match.module.name.toLowerCase()}&func=${match.func.name}&type=${match.type}`;
        a.textContent = `${match.module.icon} ${match.module.name}: ${match.func.name}`;
        a.classList.add('search-result-item');
        searchResults.appendChild(a);
    });
});
