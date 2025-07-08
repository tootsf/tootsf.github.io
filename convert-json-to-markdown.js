const fs = require('fs');
const path = require('path');

// Recursively find all JSON files in the modules directory
function findJsonFiles(dir, jsonFiles = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            findJsonFiles(fullPath, jsonFiles);
        } else if (file.endsWith('.json') && file !== 'toc.json') {
            jsonFiles.push(fullPath);
        }
    }

    return jsonFiles;
}

// Convert parameter array to markdown format
function formatParameters(parameters) {
    if (!parameters || parameters.length === 0) {
        return '';
    }

    return parameters.map(param => {
        const optional = param.optional ? ' (optional)' : '';
        return `- **${param.name}** (${param.type}): ${param.description}${optional}`;
    }).join('\n');
}

// Convert returns array to markdown format
function formatReturns(returns) {
    if (!returns || returns.length === 0) {
        return '';
    }

    return returns.map(ret => {
        return `- (${ret.type}): ${ret.description}`;
    }).join('\n');
}

// Format function example with proper code blocks
function formatExample(example) {
    if (!example) {
        return 'No example provided.';
    }

    return `\`\`\`lua\n${example}\n\`\`\``;
}

// Convert a single function to markdown format
function convertFunctionToMarkdown(func, side) {
    const sideLabel = side.charAt(0).toUpperCase() + side.slice(1);

    let markdown = `## ${func.name} (${sideLabel})\n\n`;

    // Description
    markdown += `### Description\n${func.description}\n\n`;

    // Syntax
    if (func.syntax) {
        markdown += `### Syntax\n\`\`\`lua\n${func.syntax}\n\`\`\`\n\n`;
    }

    // Parameters
    if (func.parameters && func.parameters.length > 0) {
        markdown += `### Parameters\n${formatParameters(func.parameters)}\n\n`;
    }

    // Returns
    if (func.returns && func.returns.length > 0) {
        markdown += `### Returns\n${formatReturns(func.returns)}\n\n`;
    }

    // Example
    markdown += `### Example\n${formatExample(func.example)}\n\n`;

    return markdown;
}

// Convert JSON file to markdown
function convertJsonToMarkdown(jsonPath) {
    try {
        const jsonContent = fs.readFileSync(jsonPath, 'utf8');
        const data = JSON.parse(jsonContent);

        const moduleName = data.name || 'Unknown';
        const icon = data.icon || '📄';
        const description = data.description || 'No description provided.';

        // Start markdown content
        let markdown = `# ${moduleName} ${icon}\n\n`;

        // META comment
        markdown += `<!--META\nnav: true\ntoc: true\ndescription: ${description}\n-->\n\n`;

        // Description
        markdown += `${description}\n\n`;

        // Overview
        markdown += `## Overview\n\nThe ${moduleName} provides functionality for FiveM resources.\n\n`;

        // Process client functions
        if (data.clientFunctions && data.clientFunctions.length > 0) {
            for (const func of data.clientFunctions) {
                markdown += convertFunctionToMarkdown(func, 'Client');
            }
        }

        // Process server functions
        if (data.serverFunctions && data.serverFunctions.length > 0) {
            for (const func of data.serverFunctions) {
                markdown += convertFunctionToMarkdown(func, 'Server');
            }
        }

        // Process shared functions
        if (data.sharedFunctions && data.sharedFunctions.length > 0) {
            for (const func of data.sharedFunctions) {
                markdown += convertFunctionToMarkdown(func, 'Shared');
            }
        }

        return markdown;

    } catch (error) {
        console.error(`Error processing ${jsonPath}:`, error.message);
        return null;
    }
}

// Main conversion function
function convertAllJsonFiles() {
    const modulesDir = path.join(__dirname, 'assets', 'pages', 'Community Bridge', 'Modules');
    const librariesDir = path.join(__dirname, 'assets', 'pages', 'Community Bridge', 'Libraries');

    console.log('🔍 Finding JSON files...');

    const moduleJsonFiles = findJsonFiles(modulesDir);
    const libraryJsonFiles = findJsonFiles(librariesDir);
    const allJsonFiles = [...moduleJsonFiles, ...libraryJsonFiles];

    console.log(`Found ${allJsonFiles.length} JSON files to convert:`);

    let convertedCount = 0;
    let skippedCount = 0;

    for (const jsonPath of allJsonFiles) {
        console.log(`\n📄 Processing: ${path.relative(__dirname, jsonPath)}`);

        const markdown = convertJsonToMarkdown(jsonPath);

        if (markdown) {
            // Generate output path (replace .json with .md)
            const markdownPath = jsonPath.replace(/\.json$/, '.md');

            // Check if markdown file already exists
            if (fs.existsSync(markdownPath)) {
                console.log(`⚠️  Markdown file already exists: ${path.relative(__dirname, markdownPath)}`);
                console.log('   Backing up existing file...');

                // Create backup
                const backupPath = markdownPath.replace(/\.md$/, '.md.backup');
                fs.copyFileSync(markdownPath, backupPath);
                console.log(`   Backup created: ${path.relative(__dirname, backupPath)}`);
            }

            // Write the markdown file
            fs.writeFileSync(markdownPath, markdown, 'utf8');
            console.log(`✅ Converted: ${path.relative(__dirname, markdownPath)}`);
            convertedCount++;
        } else {
            console.log(`❌ Skipped: Failed to convert`);
            skippedCount++;
        }
    }

    console.log(`\n🎉 Conversion complete!`);
    console.log(`   ✅ Converted: ${convertedCount} files`);
    console.log(`   ❌ Skipped: ${skippedCount} files`);

    if (convertedCount > 0) {
        console.log(`\n💡 Next steps:`);
        console.log(`   1. Review the generated .md files`);
        console.log(`   2. Remove the .json files if the .md files look correct`);
        console.log(`   3. Remove the .backup files if you're satisfied with the conversion`);
    }
}

// Run the conversion
if (require.main === module) {
    convertAllJsonFiles();
}

module.exports = { convertAllJsonFiles, convertJsonToMarkdown };
