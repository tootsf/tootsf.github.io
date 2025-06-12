# Table of Contents (TOC) Control Guide

You can now fully control the "On this page" section in the right panel by creating `toc.json` files in your pages folders.

## How It Works

The system automatically looks for `toc.json` files in the same folder as your pages:

1. **For markdown pages**: Place `toc.json` next to your `index.md` file
2. **For JSON API pages**: Place `toc.json` next to your `.json` file
3. **If no `toc.json` is found**: The system auto-generates TOC from headings

## TOC.json Format

```json
{
  "title": "Custom Title for TOC Section",
  "items": [
    {
      "title": "Section 1",
      "anchor": "#section-1"
    },
    {
      "title": "Section 2",
      "anchor": "#section-2",
      "children": [
        {
          "title": "Subsection 2.1",
          "anchor": "#subsection-21"
        },
        {
          "title": "Subsection 2.2",
          "anchor": "#subsection-22"
        }
      ]
    },
    {
      "title": "Section 3",
      "anchor": "#section-3"
    }
  ]
}
```

## Examples

### Basic TOC (assets/pages/Getting Started/toc.json)
```json
{
  "title": "Getting Started Guide",
  "items": [
    {
      "title": "Installation",
      "anchor": "#installation"
    },
    {
      "title": "Basic Setup",
      "anchor": "#basic-setup"
    },
    {
      "title": "Next Steps",
      "anchor": "#next-steps"
    }
  ]
}
```

### Nested TOC (assets/pages/Examples/toc.json)
```json
{
  "title": "Examples & Patterns",
  "items": [
    {
      "title": "Banking Examples",
      "anchor": "#banking-examples",
      "children": [
        {
          "title": "Check Balance",
          "anchor": "#check-player-balance"
        },
        {
          "title": "Transfer Money",
          "anchor": "#transfer-money-between-players"
        }
      ]
    },
    {
      "title": "Inventory Examples",
      "anchor": "#inventory-examples",
      "children": [
        {
          "title": "Give Item",
          "anchor": "#give-item-to-player"
        },
        {
          "title": "Check Count",
          "anchor": "#check-item-count"
        }
      ]
    }
  ]
}
```

## Folder Structure

```
assets/pages/
  Getting Started/
    index.md
    toc.json              ← Controls TOC for Getting Started page

  Community Bridge/
    index.md
    toc.json              ← Controls TOC for Community Bridge overview
    Banking/
      banking.json
      toc.json            ← Controls TOC for Banking API page
    Inventory/
      inventory.json
      (no toc.json)       ← Will auto-generate TOC from functions

  Examples/
    index.md
    toc.json              ← Controls TOC for Examples page
```

## Features

- **Nested levels**: Support up to 3-4 levels of nesting
- **Custom titles**: Override the default "On this page" title
- **Smooth scrolling**: Clicking TOC items smoothly scrolls to anchors
- **Active highlighting**: Current section is highlighted as you scroll
- **Auto-fallback**: If no toc.json exists, TOC is generated from headings

## Tips

1. **Anchor format**: Use `#heading-text-with-dashes` format for anchors
2. **Match your headings**: Ensure anchors match the actual IDs in your content
3. **Test locally**: Use the development server to verify TOC links work
4. **Keep it simple**: Don't nest too deeply - 2-3 levels max for readability

## Regenerating Structure

After adding/modifying toc.json files, regenerate the pages structure:

```bash
# Windows
python build/generate-structure.py

# Or use the development scripts
start-docs.bat        # Command Prompt
./start-docs.ps1      # PowerShell
```

This will automatically detect and include your toc.json files in the navigation configuration.
