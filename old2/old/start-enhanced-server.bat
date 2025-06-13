@echo off
echo.
echo ========================================
echo  Enhanced Module Builder Server
echo ========================================
echo.
echo Starting server for Module Builder...
echo This works alongside VS Code Live Server
echo.
echo Instructions:
echo 1. Start VS Code Live Server (Ctrl+Shift+P, "Live Server: Open")
echo 2. This server handles file saving operations
echo 3. Open: http://127.0.0.1:5500/tools/module-builder-enhanced.html
echo.
echo Press Ctrl+C to stop the server
echo.
python enhanced-server.py
pause
