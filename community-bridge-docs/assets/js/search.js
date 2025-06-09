// Simple client-side search across loaded JSON module data
const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
let modulesData = {};

// Load all module JSONs once
['vehiclekey','target','skills','shops','progressbar','notify','management','inventory'].forEach(id => {
    fetch(`assets/data/${id}.json`)
        .then(res => res.json())
        .then(data => modulesData[id] = data)
        .catch(() => {});
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
