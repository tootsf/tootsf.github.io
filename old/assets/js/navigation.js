// This script generates the navigation structure for the documentation
document.addEventListener('DOMContentLoaded', async function() {
    console.log('🧭 Navigation: DOMContentLoaded fired');
    console.log('🧭 Navigation: AutoModuleDiscovery available:', !!window.AutoModuleDiscovery);

    // Load modules using auto-discovery
    let modules = [];
    try {
        // Check if AutoModuleDiscovery is available
        if (!window.AutoModuleDiscovery) {
            throw new Error('AutoModuleDiscovery not available');
        }        // Use auto-discovery to find all modules
        console.log('🧭 Navigation: Calling AutoModuleDiscovery.getAll(true)...');
        modules = await AutoModuleDiscovery.getAll(true); // Force fresh discovery
        console.log(`🧭 Navigation: Auto-discovery successful! Found ${modules.length} modules:`, modules);

        if (modules.length === 0) {
            throw new Error('Auto-discovery returned no modules');
        }
    } catch (error) {
        console.warn('🧭 Navigation: Failed to auto-discover modules:', error);
          // Fallback to static list if auto-discovery failed - INCLUDING ALL MODULES
        modules = [
            { id: 'banking', name: 'banking', icon: '🏦', title: 'Banking' },
            { id: 'inventory', name: 'inventory', icon: '🎒', title: 'Inventory' },
            { id: 'management', name: 'management', icon: '👥', title: 'Management' },
            { id: 'notify', name: 'notify', icon: '📢', title: 'Notify' },
            { id: 'progressbar', name: 'progressbar', icon: '📏', title: 'ProgressBar' },
            { id: 'shops', name: 'shops', icon: '🛒', title: 'Shops' },
            { id: 'skills', name: 'skills', icon: '📊', title: 'Skills' },
            { id: 'target', name: 'target', icon: '🎯', title: 'Target' },
            { id: 'testmodule', name: 'testmodule', icon: '🧪', title: 'TestModule' },
            { id: 'vehiclekey', name: 'vehiclekey', icon: '🔑', title: 'Vehicle Key' }
        ];
        console.log('🧭 Navigation: Using updated fallback static module list with all current modules');
    }

    const mainNav = document.getElementById('main-nav');
    if (!mainNav) return;

    // Remove any previously generated module navigation (cleanup duplicates)
    // Keep only the first two static items (Overview, Getting Started)
    while (mainNav.children.length > 2) {
        mainNav.removeChild(mainNav.lastElementChild);
    }    // Create Community Bridge parent category
    const bridgeCategory = document.createElement('li');
    bridgeCategory.classList.add('has-children');

    // Create parent link
    const bridgeCategoryLink = document.createElement('a');
    bridgeCategoryLink.href = '#';
    bridgeCategoryLink.textContent = '🌉 Community Bridge';
    bridgeCategory.appendChild(bridgeCategoryLink);

    // Create nested modules list
    const modulesList = document.createElement('ul');
    modulesList.classList.add('nested');

    // Check if we're on a module page to expand the category
    const urlParams = new URLSearchParams(window.location.search);
    const currentModule = urlParams.get('module');

    // Always show the Community Bridge section as active since it contains all modules
    bridgeCategory.classList.add('active');    // Generate module navigation
    modules.forEach(module => {
        console.log(`📋 Creating navigation for module:`, module);

        // Create module nav item
        const moduleItem = document.createElement('li');
        moduleItem.classList.add('has-children');

        // Active state based on URL parameters or pathname
        if (currentModule === module.id || currentModule === module.name || window.location.pathname.includes(`/modules/${module.id}/`)) {
            moduleItem.classList.add('active');
        }

        // Create module link
        const moduleLink = document.createElement('a');
        moduleLink.href = `module.html?module=${module.id}`;
        moduleLink.textContent = `${module.icon} ${module.title || module.name}`;

        // Create nested function types
        const nestedList = document.createElement('ul');
        nestedList.classList.add('nested');
          // Client functions link
        const clientItem = document.createElement('li');
        const clientLink = document.createElement('a');
        clientLink.href = `module.html?module=${module.id}#client-functions`;
        clientLink.textContent = 'Client Functions';
        clientItem.appendChild(clientLink);
        nestedList.appendChild(clientItem);

        // Server functions link
        const serverItem = document.createElement('li');
        const serverLink = document.createElement('a');
        serverLink.href = `module.html?module=${module.id}#server-functions`;
        serverLink.textContent = 'Server Functions';
        serverItem.appendChild(serverLink);
        nestedList.appendChild(serverItem);

        // Assemble module nav item
        moduleItem.appendChild(moduleLink);
        moduleItem.appendChild(nestedList);
        modulesList.appendChild(moduleItem);
    });    // Append modules list to bridge category
    bridgeCategory.appendChild(modulesList);
    mainNav.appendChild(bridgeCategory);

    console.log(`🧭 Navigation: Added Community Bridge section with ${modules.length} modules`);
    console.log(`🧭 Navigation: Bridge category classes:`, bridgeCategory.className);
    console.log(`🧭 Navigation: Modules list element:`, modulesList);
    console.log(`🧭 Navigation: Modules list children count:`, modulesList.children.length);

    // Toggle nested menus
    document.querySelectorAll('.sidebar .has-children').forEach(item => {
        const link = item.querySelector('a');

        link.addEventListener('click', function(e) {
            if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
                e.preventDefault();
                item.classList.toggle('active');
            } else if (e.target === link && !e.target.parentElement.classList.contains('nested')) {
                if (link.getAttribute('href').includes('#')) {
                    item.classList.toggle('active');
                }
            }
        });

        // Show nested menu for active items
        if (item.classList.contains('active')) {
            const nestedMenu = item.querySelector('.nested');
            if (nestedMenu) {
                nestedMenu.style.display = 'block';
            }
        }
    });
});
