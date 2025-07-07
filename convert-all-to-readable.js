#!/usr/bin/env node

// Convert ALL JSON modules to human-readable markdown format
const fs = require('fs');
const path = require('path');

class BulkMarkdownConverter {
    constructor() {
        this.processedFiles = [];
        this.errors = [];
    }

    async convertAll() {
        console.log('🚀 Starting bulk conversion to human-readable format...');

        const basePath = './assets/pages/Community Bridge';

        // Convert Libraries
        await this.convertCategory(path.join(basePath, 'Libraries'), 'Libraries');

        // Convert Modules
        await this.convertCategory(path.join(basePath, 'Modules'), 'Modules');

        this.printSummary();
    }

    async convertCategory(categoryPath, categoryName) {
        console.log(`\n📁 Processing ${categoryName}...`);

        if (!fs.existsSync(categoryPath)) {
            console.log(`⚠️ Category path not found: ${categoryPath}`);
            return;
        }

        const items = fs.readdirSync(categoryPath, { withFileTypes: true });

        for (const item of items) {
            if (item.isDirectory()) {
                const itemPath = path.join(categoryPath, item.name);
                const jsonFile = path.join(itemPath, `${item.name.toLowerCase()}.json`);
                const mdFile = path.join(itemPath, `${item.name.toLowerCase()}.md`);

                // Skip if .md already exists or no .json exists
                if (fs.existsSync(mdFile)) {
                    console.log(`✅ ${item.name}: Already has .md file, skipping`);
                    continue;
                }

                if (!fs.existsSync(jsonFile)) {
                    console.log(`⚠️ ${item.name}: No .json file found, skipping`);
                    continue;
                }

                await this.convertJsonToReadableMarkdown(jsonFile, itemPath, item.name);
            }
        }
    }

    async convertJsonToReadableMarkdown(jsonFilePath, outputDir, moduleName) {
        try {
            console.log(`📄 Converting: ${moduleName}`);

            const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
            const moduleData = JSON.parse(jsonContent);

            const markdown = this.generateReadableMarkdown(moduleData, moduleName);
            const outputPath = path.join(outputDir, `${moduleName.toLowerCase()}.md`);

            fs.writeFileSync(outputPath, markdown, 'utf8');
            console.log(`✅ Created: ${outputPath}`);

            this.processedFiles.push(outputPath);
        } catch (error) {
            console.error(`❌ Error converting ${moduleName}:`, error.message);
            this.errors.push({ module: moduleName, error: error.message });
        }
    }

    generateReadableMarkdown(moduleData, moduleName) {
        const icon = moduleData.icon || '📦';
        const description = moduleData.description || `${moduleData.name || moduleName} functionality for FiveM resources.`;

        let markdown = `# ${moduleData.name || moduleName} ${icon}\n\n`;

        // Add description
        if (description) {
            markdown += `${description}\n\n`;
        }

        // Add overview section
        markdown += `## Overview\n\n`;
        markdown += `The ${moduleData.name || moduleName} provides comprehensive functionality for FiveM resources.\n\n`;

        // Add client functions
        if (moduleData.clientFunctions && moduleData.clientFunctions.length > 0) {
            markdown += `## Client Functions\n\n`;
            for (const func of moduleData.clientFunctions) {
                markdown += this.generateReadableFunctionMarkdown(func);
            }
        }

        // Add server functions
        if (moduleData.serverFunctions && moduleData.serverFunctions.length > 0) {
            markdown += `## Server Functions\n\n`;
            for (const func of moduleData.serverFunctions) {
                markdown += this.generateReadableFunctionMarkdown(func);
            }
        }

        // Add shared functions
        if (moduleData.sharedFunctions && moduleData.sharedFunctions.length > 0) {
            markdown += `## Shared Functions\n\n`;
            for (const func of moduleData.sharedFunctions) {
                markdown += this.generateReadableFunctionMarkdown(func);
            }
        }

        return markdown;
    }

    generateReadableFunctionMarkdown(func) {
        let markdown = `### ${func.name}\n\n`;

        // Add description
        if (func.description) {
            markdown += `**Description:** ${func.description}\n\n`;
        }

        // Add syntax
        if (func.syntax) {
            markdown += `**Syntax:** \`${func.syntax}\`\n\n`;
        }

        // Add parameters
        if (func.parameters && func.parameters.length > 0) {
            markdown += `**Parameters:**\n`;
            for (const param of func.parameters) {
                markdown += `- \`${param.name}\` (${param.type}) - ${param.description || 'No description'}\n`;
            }
            markdown += `\n`;
        } else {
            markdown += `**Parameters:** None\n\n`;
        }

        // Add returns
        if (func.returns && func.returns.length > 0) {
            markdown += `**Returns:**\n`;
            for (const ret of func.returns) {
                markdown += `- \`${ret.type}\` - ${ret.description || 'No description'}\n`;
            }
            markdown += `\n`;
        } else {
            markdown += `**Returns:** None\n\n`;
        }

        // Add example
        if (func.example) {
            const exampleCode = Array.isArray(func.example) ? func.example.join('\n') : func.example;
            markdown += `**Example:**\n\`\`\`lua\n${exampleCode}\n\`\`\`\n\n`;
        }

        return markdown;
    }

    printSummary() {
        console.log('\n📊 Conversion Summary:');
        console.log(`✅ Successfully converted: ${this.processedFiles.length} modules`);

        if (this.errors.length > 0) {
            console.log(`❌ Failed conversions: ${this.errors.length}`);
            this.errors.forEach(error => {
                console.log(`   - ${error.module}: ${error.error}`);
            });
        }

        console.log('\n📁 Generated readable markdown files:');
        this.processedFiles.forEach(file => {
            console.log(`   ✅ ${path.basename(file)}`);
        });

        console.log('\n🎉 Bulk conversion complete!');
        console.log('💡 All modules now use human-readable markdown format');
    }
}

// Run the converter
const converter = new BulkMarkdownConverter();
converter.convertAll().catch(error => {
    console.error('❌ Bulk conversion failed:', error);
    process.exit(1);
});
