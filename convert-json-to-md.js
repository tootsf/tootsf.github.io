#!/usr/bin/env node

// JSON to Markdown Conversion Script for Community Bridge Documentation
const fs = require('fs');
const path = require('path');

class JsonToMarkdownConverter {
    constructor() {
        this.processedFiles = [];
        this.errors = [];
    }

    async convertAll() {
        console.log('🚀 Starting JSON to Markdown conversion...');

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

                if (fs.existsSync(jsonFile)) {
                    await this.convertJsonToMarkdown(jsonFile, itemPath, item.name);
                }
            }
        }
    }

    async convertJsonToMarkdown(jsonFilePath, outputDir, moduleName) {
        try {
            console.log(`📄 Converting: ${moduleName}`);

            const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
            const moduleData = JSON.parse(jsonContent);

            const markdown = this.generateMarkdown(moduleData, moduleName);
            const outputPath = path.join(outputDir, `${moduleName.toLowerCase()}.md`);

            fs.writeFileSync(outputPath, markdown, 'utf8');
            this.processedFiles.push(outputPath);

            console.log(`✅ Created: ${outputPath}`);

        } catch (error) {
            console.error(`❌ Error converting ${moduleName}:`, error.message);
            this.errors.push({ file: jsonFilePath, error: error.message });
        }
    }

    generateMarkdown(moduleData, moduleName) {
        const icon = moduleData.icon || '📦';
        const description = moduleData.description || '';

        let markdown = `# ${moduleData.name || moduleName} ${icon}\n\n`;

        // Add META block
        markdown += `<!--META\n`;
        markdown += `nav: true\n`;
        markdown += `toc: true\n`;
        markdown += `description: ${description}\n`;
        markdown += `-->\n\n`;

        // Add description
        if (description) {
            markdown += `${description}\n\n`;
        }

        // Add overview section
        markdown += `## Overview\n\n`;
        markdown += `The ${moduleData.name || moduleName} provides functionality for FiveM resources.\n\n`;

        // Add client functions
        if (moduleData.clientFunctions && moduleData.clientFunctions.length > 0) {
            markdown += `## Client Functions\n\n`;

            for (const func of moduleData.clientFunctions) {
                markdown += this.generateFunctionMarkdown(func, 'client');
            }
        }

        // Add server functions
        if (moduleData.serverFunctions && moduleData.serverFunctions.length > 0) {
            markdown += `## Server Functions\n\n`;

            for (const func of moduleData.serverFunctions) {
                markdown += this.generateFunctionMarkdown(func, 'server');
            }
        }

        // Add shared functions
        if (moduleData.sharedFunctions && moduleData.sharedFunctions.length > 0) {
            markdown += `## Shared Functions\n\n`;

            for (const func of moduleData.sharedFunctions) {
                markdown += this.generateFunctionMarkdown(func, 'shared');
            }
        }

        // Add usage examples if available
        if (moduleData.examples && moduleData.examples.length > 0) {
            markdown += `## Usage Examples\n\n`;

            for (const example of moduleData.examples) {
                markdown += `### ${example.title}\n\n`;
                if (example.description) {
                    markdown += `${example.description}\n\n`;
                }
                markdown += `\`\`\`lua\n${example.code}\n\`\`\`\n\n`;
            }
        }

        return markdown;
    }

    generateFunctionMarkdown(func, context) {
        let markdown = `### ${func.name}\n\n`;

        // Add TOC marker
        markdown += `<!--TOC: ${func.name}-->\n\n`;

        // Add context badge
        const contextBadge = context === 'client' ? '🖥️ Client' :
                           context === 'server' ? '🖲️ Server' :
                           '🔄 Shared';
        markdown += `**Context:** ${contextBadge}\n\n`;

        // Add description
        if (func.description) {
            markdown += `${func.description}\n\n`;
        }

        // Add syntax
        if (func.syntax) {
            markdown += `**Syntax:** \`${func.syntax}\`\n\n`;
        }

        // Add parameters
        if (func.parameters && func.parameters.length > 0) {
            markdown += `**Parameters:**\n`;
            for (const param of func.parameters) {
                markdown += `- \`${param.name}\` (${param.type})`;
                if (param.description) {
                    markdown += ` - ${param.description}`;
                }
                markdown += `\n`;
            }
            markdown += `\n`;
        } else {
            markdown += `**Parameters:** None\n\n`;
        }

        // Add returns
        if (func.returns && func.returns.length > 0) {
            markdown += `**Returns:**\n`;
            for (const ret of func.returns) {
                markdown += `- (${ret.type})`;
                if (ret.description) {
                    markdown += ` - ${ret.description}`;
                }
                markdown += `\n`;
            }
            markdown += `\n`;
        } else {
            markdown += `**Returns:** None\n\n`;
        }

        // Add example
        if (func.example) {
            markdown += `**Example:**\n`;
            markdown += `\`\`\`lua\n${func.example}\n\`\`\`\n\n`;
        }

        return markdown;
    }

    printSummary() {
        console.log('\n📊 Conversion Summary:');
        console.log(`✅ Successfully converted: ${this.processedFiles.length} files`);

        if (this.errors.length > 0) {
            console.log(`❌ Errors encountered: ${this.errors.length}`);
            this.errors.forEach(error => {
                console.log(`   - ${error.file}: ${error.error}`);
            });
        }

        console.log('\n📁 Generated files:');
        this.processedFiles.forEach(file => {
            console.log(`   - ${file}`);
        });

        console.log('\n🎉 Conversion complete!');
    }
}

// Run the converter
const converter = new JsonToMarkdownConverter();
converter.convertAll().catch(error => {
    console.error('❌ Conversion failed:', error);
    process.exit(1);
});
