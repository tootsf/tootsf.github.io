#!/usr/bin/env python3
"""
Enhanced Module Builder Server for Live Server Integration
This script works alongside VS Code Live Server to enable file saving functionality.

Usage:
1. Start VS Code Live Server (usually runs on port 5500)
2. Run this script: python enhanced-server.py
3. This server runs on port 8082 and handles file saves
4. Live Server handles the web serving and auto-reload

Features:
- File saving support for JSON, Markdown, and JavaScript files
- CORS enabled for cross-origin requests
- Works with existing Live Server setup
- Automatic file validation
"""

import http.server
import socketserver
import json
import os
import urllib.parse
from pathlib import Path
import mimetypes

class EnhancedModuleBuilderHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)

    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_PUT(self):
        """Handle file saves from the Module Builder"""
        try:
            # Parse the path
            path = urllib.parse.unquote(self.path[1:])  # Remove leading /
            file_path = Path(path)
              # Security check - ensure we're only writing to allowed directories
            allowed_dirs = [
                'assets/data/', 'assets/js/', 'pages/', 'tools/',
                '../community_bridge/', 'community_bridge/',
                '../tootsf.github.io.old/community_bridge/',
                'tootsf.github.io.old/community_bridge/'
            ]
            if not any(str(file_path).replace('\\', '/').startswith(allowed_dir) for allowed_dir in allowed_dirs):
                self.send_response(403)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {'error': f'Access denied to this directory: {file_path}'}
                self.wfile.write(json.dumps(response).encode())
                return

            # Get content length
            content_length = int(self.headers.get('Content-Length', 0))
            if content_length == 0:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                response = {'error': 'No content provided'}
                self.wfile.write(json.dumps(response).encode())
                return

            # Read the content
            content = self.rfile.read(content_length)

            # Validate content based on file type
            file_ext = file_path.suffix.lower()

            if file_ext == '.json':
                try:
                    # Validate JSON
                    json.loads(content.decode('utf-8'))
                except json.JSONDecodeError as e:
                    self.send_response(400)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    response = {'error': f'Invalid JSON: {str(e)}'}
                    self.wfile.write(json.dumps(response).encode())
                    return

            # Create directory if it doesn't exist
            file_path.parent.mkdir(parents=True, exist_ok=True)

            # Write the file
            with open(file_path, 'wb') as f:
                f.write(content)            # Success response
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()

            response = {
                'success': True,
                'message': f'File {file_path.name} saved successfully',
                'path': str(file_path),
                'size': len(content)
            }
            self.wfile.write(json.dumps(response).encode())

            print(f"SAVED: {file_path} ({len(content)} bytes)")

        except Exception as e:
            print(f"ERROR saving file: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {'error': f'Server error: {str(e)}'}
            self.wfile.write(json.dumps(response).encode())

    def do_GET(self):
        """Handle file reads and directory listings"""
        # Special endpoint for module scanning
        if self.path == '/api/scan-modules':
            self.handle_module_scan()
            return

        if self.path.endswith('/'):
            # Directory listing for module discovery
            try:
                directory = urllib.parse.unquote(self.path[1:])
                if directory == '':
                    directory = '.'

                dir_path = Path(directory)
                if not dir_path.exists() or not dir_path.is_dir():
                    self.send_response(404)
                    self.end_headers()
                    return

                # Generate directory listing
                files = []
                for item in dir_path.iterdir():
                    if item.is_file():
                        files.append(f'<a href="{item.name}">{item.name}</a>')

                html_content = f"""
                <!DOCTYPE html>
                <html>
                <head><title>Directory: {directory}</title></head>
                <body>
                <h1>Directory listing for {directory}</h1>
                <ul>
                {''.join(f'<li>{file}</li>' for file in files)}
                </ul>
                </body>
                </html>
                """

                self.send_response(200)
                self.send_header('Content-Type', 'text/html')
                self.end_headers()
                self.wfile.write(html_content.encode())

            except Exception as e:
                print(f"ERROR reading directory: {e}")
                self.send_response(500)
                self.end_headers()
        else:
            # Regular file serving
            super().do_GET()

    def handle_module_scan(self):
        """Scan for available modules and return configuration"""
        try:
            modules = []

            # Scan assets/data for JSON files
            json_modules = set()
            assets_data_path = Path('assets/data')
            if assets_data_path.exists():
                for json_file in assets_data_path.glob('*.json'):
                    if json_file.name != 'modules.json':  # Skip meta files
                        module_id = json_file.stem
                        json_modules.add(module_id)

                        # Try to read the JSON to get module info
                        try:
                            with open(json_file, 'r', encoding='utf-8') as f:
                                module_data = json.load(f)
                                modules.append({
                                    'id': module_id,
                                    'name': module_data.get('name', module_id.title()),
                                    'icon': module_data.get('icon', '📦'),
                                    'hasJson': True,
                                    'hasDocs': False,  # Will be updated below
                                    'order': len(modules) + 1
                                })
                        except:
                            # Fallback for malformed JSON
                            modules.append({
                                'id': module_id,
                                'name': module_id.title(),
                                'icon': '📦',
                                'hasJson': True,
                                'hasDocs': False,
                                'order': len(modules) + 1
                            })

            # Scan community_bridge/modules for documentation
            docs_modules = set()
            community_bridge_path = Path('community_bridge/modules')
            if community_bridge_path.exists():
                for module_dir in community_bridge_path.iterdir():
                    if module_dir.is_dir() and (module_dir / 'index.md').exists():
                        module_id = module_dir.name
                        docs_modules.add(module_id)

                        # Find existing module or create new one
                        existing_module = next((m for m in modules if m['id'] == module_id), None)
                        if existing_module:
                            existing_module['hasDocs'] = True
                        else:
                            # Try to read frontmatter for module info
                            try:
                                with open(module_dir / 'index.md', 'r', encoding='utf-8') as f:
                                    content = f.read()
                                    # Extract title from frontmatter
                                    name = module_id.title()
                                    icon = '📄'
                                    if content.startswith('---'):
                                        lines = content.split('\n')
                                        for line in lines[1:]:
                                            if line.strip() == '---':
                                                break
                                            if line.startswith('title:'):
                                                title_part = line.split(':', 1)[1].strip().strip('"\'')
                                                # Extract emoji and name
                                                if len(title_part) > 0 and ord(title_part[0]) > 127:  # Emoji check
                                                    icon = title_part[0]
                                                    name = title_part[1:].strip()
                                                else:
                                                    name = title_part
                                                break

                                modules.append({
                                    'id': module_id,
                                    'name': name,
                                    'icon': icon,
                                    'hasJson': module_id in json_modules,
                                    'hasDocs': True,
                                    'order': len(modules) + 1
                                })
                            except:
                                modules.append({
                                    'id': module_id,
                                    'name': module_id.title(),
                                    'icon': '📄',
                                    'hasJson': module_id in json_modules,
                                    'hasDocs': True,
                                    'order': len(modules) + 1
                                })

            # Sort modules by order
            modules.sort(key=lambda x: x['order'])

            # Generate module configuration
            config = {
                'modules': modules,
                'site': {
                    'title': 'Community Bridge Documentation',
                    'description': 'Unified FiveM Framework Integration',
                    'baseUrl': '/'
                },
                'lastUpdated': __import__('datetime').datetime.now().isoformat()
            }

            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(config, indent=2).encode())

            print(f"SCANNED: Found {len(modules)} modules")

        except Exception as e:
            print(f"ERROR scanning modules: {e}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            response = {'error': f'Module scan error: {str(e)}'}
            self.wfile.write(json.dumps(response).encode())

    def log_message(self, format, *args):
        """Custom logging"""
        if self.command == 'PUT':
            print(f"SAVE {self.command} {args[0]} - {args[1]}")
        elif self.command == 'GET' and not self.path.endswith(('.css', '.js', '.ico')):
            print(f"GET {self.command} {args[0]} - {args[1]}")

def main():
    PORT = 8082

    print("Enhanced Module Builder Server")
    print("=" * 50)
    print(f"Server URL: http://localhost:{PORT}")
    print(f"Working Directory: {os.getcwd()}")
    print(f"Module Builder: http://localhost:{PORT}/tools/module-builder-enhanced.html")
    print()
    print("Integration with Live Server:")
    print("   - Live Server (port 5500): Handles web serving & auto-reload")
    print("   - This Server (port 8082): Handles file saving operations")
    print()
    print("Supported operations:")
    print("   - Save JSON modules to assets/data/")
    print("   - Save Markdown files to community_bridge/")
    print("   - Save Navigation config to assets/js/")
    print("   - Automatic file validation")
    print()
    print("Press Ctrl+C to stop the server")
    print("=" * 50)

    try:
        with socketserver.TCPServer(("", PORT), EnhancedModuleBuilderHandler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except OSError as e:
        if e.errno == 10048:  # Address already in use
            print(f"ERROR: Port {PORT} is already in use. Please:")
            print("   1. Stop any existing server on this port")
            print("   2. Try a different port")
            print("   3. Or use the download method in Module Builder")
        else:
            print(f"ERROR: Server error: {e}")

if __name__ == "__main__":
    main()
