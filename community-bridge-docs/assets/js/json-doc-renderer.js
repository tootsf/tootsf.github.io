// Script to render documentation from JSON data
document.addEventListener('DOMContentLoaded', function() {
    const contentArea = document.getElementById('content-area');
    if (!contentArea) return;

    // Get module and function from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const module = urlParams.get('module');
    const funcName = urlParams.get('func');

    if (module) {
        // Load module documentation
        fetch(`/assets/data/${module}.json`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load module data: ${response.status}`);
                }
                return response.json();
            })
            .then(moduleData => {
                if (funcName) {
                    // Render specific function
                    renderFunction(moduleData, funcName, contentArea);
                } else {
                    // Render module overview
                    renderModule(moduleData, contentArea);
                }
                // Update table of contents
                updateTOC();
            })
            .catch(error => {
                contentArea.innerHTML = `
                    <div class="error-message">
                        <h3>Error Loading Documentation</h3>
                        <p>${error.message}</p>
                    </div>
                `;
            });
    } else {
        // Load index/overview
        contentArea.innerHTML = `<p>Please select a module from the navigation.</p>`;
    }
});

function renderModule(moduleData, container) {
    // Create module header
    let html = `
        <h1 id="${moduleData.name.toLowerCase()}-module">${moduleData.icon} ${moduleData.name} Module</h1>
        <p>${moduleData.description}</p>
    `;

    // Client functions section
    if (moduleData.clientFunctions && moduleData.clientFunctions.length > 0) {
        html += `<h2 id="client-functions">Client Functions</h2>`;
        moduleData.clientFunctions.forEach(func => {
            html += renderFunctionSummary(func, moduleData.name);
        });
    } else {
        html += `<h2 id="client-functions">Client Functions</h2>
                <p>No client-side functions are currently documented for this module.</p>`;
    }

    // Server functions section
    if (moduleData.serverFunctions && moduleData.serverFunctions.length > 0) {
        html += `<h2 id="server-functions">Server Functions</h2>`;
        moduleData.serverFunctions.forEach(func => {
            html += renderFunctionSummary(func, moduleData.name);
        });
    } else {
        html += `<h2 id="server-functions">Server Functions</h2>
                <p>No server-side functions are currently documented for this module.</p>`;
    }

    container.innerHTML = html;
}

function renderFunctionSummary(func, moduleName) {
    return `
    <div class="function-section">
        <h3 id="${func.name.toLowerCase()}">${func.name}</h3>
        <div class="function-description">
            <p>${func.description}</p>
        </div>

        <h4>Syntax:</h4>
        <pre><code class="language-lua">${func.syntax}</code></pre>

        <h4>Parameters:</h4>
        <ul>
            ${renderParameters(func.parameters)}
        </ul>

        ${func.returns ? `<h4>Returns:</h4>
        <ul>
            ${renderReturns(func.returns)}
        </ul>` : ''}

        <h4>Example:</h4>
        <pre><code class="language-lua">${func.example}</code></pre>

        ${func.behavior ? `<h4>System-Specific Behavior:</h4>
        <ul>
            ${renderBehavior(func.behavior)}
        </ul>` : ''}
    </div>`;
}

function renderParameters(params) {
    if (!params || params.length === 0) {
        return '<li>None</li>';
    }

    return params.map(param => {
        let html = `<li><code>${param.name}</code> (<code>${param.type}</code>)`;

        if (param.optional) {
            html += ' (optional)';
        }

        html += `: ${param.description}`;

        if (param.properties) {
            html += `<ul>
                ${param.properties.map(prop =>
                    `<li><code>${prop.name}</code> (<code>${prop.type}</code>)${prop.optional ? ' (optional)' : ''}: ${prop.description}</li>`
                ).join('')}
            </ul>`;
        }

        html += '</li>';
        return html;
    }).join('');
}

function renderReturns(returns) {
    if (typeof returns === 'string') {
        return `<li>${returns}</li>`;
    }

    return returns.map(ret =>
        `<li><code>${ret.type}</code>: ${ret.description}</li>`
    ).join('');
}

function renderBehavior(behaviors) {
    return behaviors.map(behavior =>
        `<li><strong>${behavior.system}</strong>: ${behavior.description}</li>`
    ).join('');
}

function renderFunction(moduleData, funcName, container) {
    // Find the function in client or server functions
    const func = moduleData.clientFunctions.find(f => f.name.toLowerCase() === funcName.toLowerCase()) ||
                moduleData.serverFunctions.find(f => f.name.toLowerCase() === funcName.toLowerCase());

    if (!func) {
        container.innerHTML = `<p>Function "${funcName}" not found in module "${moduleData.name}".</p>`;
        return;
    }

    container.innerHTML = `
        <h1 id="${func.name.toLowerCase()}">${func.name}</h1>
        <p><a href="?module=${moduleData.name}">Back to ${moduleData.name} Module</a></p>
        <div class="function-section">
            <div class="function-description">
                <p>${func.description}</p>
            </div>

            <h2>Syntax:</h2>
            <pre><code class="language-lua">${func.syntax}</code></pre>

            <h2>Parameters:</h2>
            <ul>
                ${renderParameters(func.parameters)}
            </ul>

            ${func.returns ? `<h2>Returns:</h2>
            <ul>
                ${renderReturns(func.returns)}
            </ul>` : ''}

            <h2>Example:</h2>
            <pre><code class="language-lua">${func.example}</code></pre>

            ${func.behavior ? `<h2>System-Specific Behavior:</h2>
            <ul>
                ${renderBehavior(func.behavior)}
            </ul>` : ''}
        </div>
    `;
}

function updateTOC() {
    const tocContainer = document.getElementById("toc");
    const headings = document.querySelectorAll(".main-content h1, .main-content h2, .main-content h3");

    if (tocContainer && headings.length > 0) {
        // Clear existing TOC
        const existingList = tocContainer.querySelector("ul");
        if (existingList) {
            existingList.remove();
        }

        const tocList = document.createElement("ul");

        headings.forEach(heading => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            const headingId = heading.id || heading.textContent.toLowerCase().replace(/\s+/g, '-');

            heading.id = headingId;
            link.href = `#${headingId}`;
            link.textContent = heading.textContent;

            // Add appropriate indentation based on heading level
            if (heading.tagName === "H2") {
                listItem.style.marginLeft = "10px";
            } else if (heading.tagName === "H3") {
                listItem.style.marginLeft = "20px";
            }

            listItem.appendChild(link);
            tocList.appendChild(listItem);
        });

        tocContainer.appendChild(tocList);
    }
}
