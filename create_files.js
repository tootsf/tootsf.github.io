const fs = require('fs');
const path = require('path');

console.log('🚀 Creating individual function files...');

const baseDir = __dirname;
const modulesDir = path.join(baseDir, 'community_bridge', 'modules');

function extractFunctionsFromFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');

    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\s*\n(.*?)\n---\s*\n(.*)$/s);
    if (!frontmatterMatch) return { functions: [], grandParent: '', parentTitle: '' };

    const frontmatter = frontmatterMatch[1];
    const mainContent = frontmatterMatch[2];

    // Parse frontmatter
    let grandParent = '';
    let parentTitle = '';

    frontmatter.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('grand_parent:')) {
            grandParent = trimmed.replace(/^grand_parent:\s*"?([^"]*)"?$/, '$1');
        }
        if (trimmed.startsWith('parent:')) {
            parentTitle = trimmed.replace(/^parent:\s*"?([^"]*)"?$/, '$1');
        }
    });

    // Find functions
    const functionPattern = /## 🔹 ([^\n]+)(.*?)(?=## 🔹 |$)/gs;
    const functions = [];
    let match;

    while ((match = functionPattern.exec(mainContent)) !== null) {
        functions.push({
            name: match[1].trim(),
            content: match[2].trim()
        });
    }

    return { functions, grandParent, parentTitle };
}

function createIndividualFiles() {
    const modules = fs.readdirSync(modulesDir).filter(item =>
        fs.statSync(path.join(modulesDir, item)).isDirectory()
    );

    let totalCreated = 0;

    modules.forEach(module => {
        console.log(`\n📁 Processing module: ${module}`);

        ['client', 'server', 'shared'].forEach(side => {
            const functionsFile = path.join(modulesDir, module, side, 'functions.md');

            if (!fs.existsSync(functionsFile)) return;

            console.log(`   📖 Processing ${side}/functions.md`);

            try {
                const { functions, grandParent, parentTitle } = extractFunctionsFromFile(functionsFile);

                if (functions.length === 0) {
                    console.log(`   ⏭️  No functions found`);
                    return;
                }

                console.log(`   🔍 Found ${functions.length} functions`);

                // Create functions directory
                const functionsDir = path.join(modulesDir, module, side, 'functions');
                fs.mkdirSync(functionsDir, { recursive: true });

                // Create individual function files
                functions.forEach(func => {
                    const safeName = func.name.replace(/[<>:"/\\|?*]/g, '');
                    const filePath = path.join(functionsDir, `${safeName}.md`);

                    const frontmatter = `---
layout: default
title: "${func.name}"
parent: Functions
grand_parent: ${parentTitle}
great_grand_parent: ${grandParent}
great_great_grand_parent: Modules
nav_order: 1
permalink: /community_bridge/modules/${module}/${side}/functions/${safeName}/
---

`;

                    const header = `# ${func.name}\n{: .no_toc }\n\n`;
                    const cleanContent = func.content.replace(new RegExp(`^# ${func.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n.*?\\n\\n`, 's'), '');

                    const fullContent = frontmatter + header + cleanContent;

                    fs.writeFileSync(filePath, fullContent, 'utf8');
                    totalCreated++;
                });

                console.log(`   ✅ Created ${functions.length} function files`);

                // Update container page
                const containerContent = `---
layout: default
title: Functions
parent: ${parentTitle}
grand_parent: ${grandParent}
great_grand_parent: Modules
has_children: true
nav_order: 1
permalink: /community_bridge/modules/${module}/${side}/functions/
---

# ${side.charAt(0).toUpperCase() + side.slice(1)} Functions
{: .no_toc }

${side.charAt(0).toUpperCase() + side.slice(1)}-side functions for the ${module} module.

## Available Functions

${functions.map(func => {
    const safeName = func.name.replace(/[<>:"/\\|?*]/g, '');
    return `- [${func.name}](${safeName})`;
}).join('\n')}
`;

                fs.writeFileSync(functionsFile, containerContent, 'utf8');
                console.log(`   📝 Updated container page`);

            } catch (error) {
                console.log(`   ❌ Error: ${error.message}`);
            }
        });
    });

    console.log(`\n🎉 Created ${totalCreated} individual function files!`);
}

createIndividualFiles();
