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

    // Generate module navigation
    modules.forEach(module => {
        // Create module nav item
        const moduleItem = document.createElement('li');
        moduleItem.classList.add('has-children');
        // Active state based on URL parameters or pathname
        const urlParams = new URLSearchParams(window.location.search);
        const currentModule = urlParams.get('module');
        if (currentModule === module.name || window.location.pathname.includes(`/modules/${module.name}/`)) {
            moduleItem.classList.add('active');
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
        mainNav.appendChild(moduleItem);
    });

    // Toggle nested menus
    document.querySelectorAll('.sidebar .has-children').forEach(item => {
        const link = item.querySelector('a');

        link.addEventListener('click', function(e) {
            if (!e.target.parentElement.classList.contains('nested')) {
                e.preventDefault();
                item.classList.toggle('active');
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
