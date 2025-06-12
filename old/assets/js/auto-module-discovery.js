// Auto-discovery modules
// Automatically detects modules based on JSON files in assets/data/

class AutoModuleDiscovery {
    constructor() {
        this.modules = [];
        this.loaded = false;
    }    // Discover modules by loading from registry file
    async discoverModules(forceRefresh = false) {
        console.log('🔍 Auto-discovery: Starting module discovery...');
        console.log('🔍 Auto-discovery: Loaded flag:', this.loaded);
        console.log('🔍 Auto-discovery: Cached modules count:', this.modules.length);
        console.log('🔍 Auto-discovery: Force refresh:', forceRefresh);

        if (this.loaded && !forceRefresh) {
            console.log('🔍 Auto-discovery: Using cached modules:', this.modules);
            return this.modules;
        }

        // Load module list from registry file
        let potentialModules = [];
        try {
            const registryResponse = await fetch('assets/data/module-registry.json');
            if (registryResponse.ok) {
                const registry = await registryResponse.json();
                potentialModules = registry.modules || [];
                console.log('📋 Loaded modules from registry:', potentialModules);
            } else {
                console.warn('⚠️ Module registry not found, using fallback list');
                // Fallback to hardcoded list if registry fails
                potentialModules = [
                    'inventory', 'management', 'notify', 'progressbar',
                    'shops', 'skills', 'target', 'vehiclekey',
                    'banking', 'banking_copy', 'testmodule'
                ];
            }
        } catch (error) {
            console.warn('⚠️ Failed to load module registry:', error);
            // Fallback to hardcoded list
            potentialModules = [
                'inventory', 'management', 'notify', 'progressbar',
                'shops', 'skills', 'target', 'vehiclekey',
                'banking', 'banking_copy', 'testmodule'
            ];
        }

        const discoveredModules = [];

        // Try to load each potential module
        for (const moduleId of potentialModules) {
            try {
                console.log(`🔍 Trying to load module: ${moduleId}`);
                const response = await fetch(`assets/data/${moduleId}.json`);
                if (response.ok) {
                    const moduleData = await response.json();
                    console.log(`✅ Found module: ${moduleId}`, moduleData);

                    // Extract module info from JSON
                    const module = {
                        id: moduleId,
                        name: moduleData.name || this.capitalize(moduleId),
                        icon: moduleData.icon || '📦',
                        title: moduleData.name || this.capitalize(moduleId),
                        description: moduleData.description || `${moduleData.name || this.capitalize(moduleId)} module`,
                                                hasClientFunctions: moduleData.clientFunctions && moduleData.clientFunctions.length > 0,
                        hasServerFunctions: moduleData.serverFunctions && moduleData.serverFunctions.length > 0
                    };

                    discoveredModules.push(module);
                    console.log(`📦 Discovered module: ${module.name}`, module);
                }
            } catch (error) {
                // Module doesn't exist, continue silently
                console.log(`❌ Module ${moduleId} not found or invalid`);
            }
        }

        // Sort modules alphabetically by name
        discoveredModules.sort((a, b) => a.name.localeCompare(b.name));

        this.modules = discoveredModules;
        this.loaded = true;

        console.log(`🎯 Auto-discovery complete: Found ${this.modules.length} modules`);
        return this.modules;
    }

    // Get all discovered modules
    async getAll(forceRefresh = false) {
        return await this.discoverModules(forceRefresh);
    }

    // Get modules with their JSON data loaded
    async getWithJson() {
        const modules = await this.discoverModules();
        const modulesWithData = [];

        for (const module of modules) {
            try {
                const response = await fetch(`assets/data/${module.id}.json`);
                if (response.ok) {
                    const jsonData = await response.json();
                    modulesWithData.push({
                        ...module,
                        jsonData
                    });
                }
            } catch (error) {
                console.warn(`Failed to load JSON for module ${module.id}:`, error);
            }
        }

        return modulesWithData;
    }

    // Helper function to capitalize module names
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    // Check if a specific module exists
    async hasModule(moduleId) {
        const modules = await this.discoverModules();
        return modules.some(module => module.id === moduleId);
    }

    // Reset cache to force fresh discovery
    reset() {
        console.log('🔄 Auto-discovery: Resetting cache');
        this.modules = [];
        this.loaded = false;
    }
}

// Create global instance
window.AutoModuleDiscovery = new AutoModuleDiscovery();

// Force fresh discovery on each page load to avoid caching issues
document.addEventListener('DOMContentLoaded', function() {
    // Reset cache when page loads to ensure fresh discovery
    if (window.AutoModuleDiscovery) {
        window.AutoModuleDiscovery.reset();
        console.log('🔄 Auto-discovery: Cache reset on page load');
    }
});
