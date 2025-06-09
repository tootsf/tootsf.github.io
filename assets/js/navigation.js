// This script generates the navigation structure for the documentation
document.addEventListener('DOMContentLoaded', function() {
    // Define all modules with their icons
    const modules = [
        { name: 'vehiclekey', icon: '🔑', title: 'Vehicle Key' },
        { name: 'target', icon: '🎯', title: 'Target' },
        { name: 'skills', icon: '📊', title: 'Skills' },
        { name: 'shops', icon: '🛒', title: 'Shops' },
        { name: 'progressbar', icon: '📏', title: 'ProgressBar' },
        { name: 'notify', icon: '📢', title: 'Notify' },
        { name: 'management', icon: '👥', title: 'Management' },
        { name: 'inventory', icon: '🎒', title: 'Inventory' }
    ];

    const mainNav = document.getElementById('main-nav');
    if (!mainNav) return;

    // Create Community Bridge parent category
    const bridgeCategory = document.createElement('li');
    bridgeCategory.classList.add('has-children');
    bridgeCategory.classList.add('active'); // MODIFIED: Force active for testing
    // bridgeCategory.style.border = "2px solid blue"; // REMOVED: Debug style

    // Create parent link
    const bridgeCategoryLink = document.createElement('a');
    bridgeCategoryLink.href = '#';
    bridgeCategoryLink.textContent = '🌉 Community Bridge';
    bridgeCategory.appendChild(bridgeCategoryLink);

    // Create nested modules list
    const modulesList = document.createElement('ul');
    modulesList.classList.add('nested');
    // modulesList.style.border = "2px solid red"; // REMOVED: Debug style

    // Check if we're on a module page to expand the category
    const urlParams = new URLSearchParams(window.location.search);
    const currentModule = urlParams.get('module');
    if (currentModule) {
        bridgeCategory.classList.add('active');
    }

    // Generate module navigation
    modules.forEach(module => {
        // Create module nav item
        const moduleItem = document.createElement('li');
        moduleItem.classList.add('has-children');

        // Active state based on URL parameters or pathname
        if (currentModule === module.name || window.location.pathname.includes(`/modules/${module.name}/`)) {
            moduleItem.classList.add('active');
            // bridgeCategory.classList.add('active'); // MODIFIED: Parent is already forced active for this test
        }

        // Create module link
        const moduleLink = document.createElement('a');
        moduleLink.href = `module.html?module=${module.name}`;
        moduleLink.textContent = `${module.icon} ${module.title}`;

        // Create nested function types
        const nestedList = document.createElement('ul');
        nestedList.classList.add('nested');
          // Client functions link
        const clientItem = document.createElement('li');
        const clientLink = document.createElement('a');
        clientLink.href = `module.html?module=${module.name}#client-functions`;
        clientLink.textContent = 'Client Functions';
        clientItem.appendChild(clientLink);
        nestedList.appendChild(clientItem);

        // Server functions link
        const serverItem = document.createElement('li');
        const serverLink = document.createElement('a');
        serverLink.href = `module.html?module=${module.name}#server-functions`;
        serverLink.textContent = 'Server Functions';
        serverItem.appendChild(serverLink);
        nestedList.appendChild(serverItem);

        // Assemble module nav item
        moduleItem.appendChild(moduleLink);
        moduleItem.appendChild(nestedList);
        modulesList.appendChild(moduleItem);
    });

    // Append modules list to bridge category
    bridgeCategory.appendChild(modulesList);
    mainNav.appendChild(bridgeCategory);

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
