@echo off
title Community Bridge Documentation Editor
color 0F

echo.
echo ========================================
echo  Community Bridge Documentation Editor
echo ========================================
echo.
echo Starting integrated development environment...
echo.

REM Check if Python is available
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.7+ and try again
    pause
    exit /b 1
)

REM Check if Live Server extension is available (VS Code)
echo Checking for VS Code Live Server...
tasklist /FI "IMAGENAME eq Code.exe" 2>NUL | find /I /N "Code.exe">NUL
if %errorlevel% neq 0 (
    echo.
    echo WARNING: VS Code is not running
    echo For the best experience:
    echo 1. Open this folder in VS Code
    echo 2. Install Live Server extension
    echo 3. Start Live Server (Ctrl+Shift+P -> "Live Server: Open")
    echo.
)

echo Starting documentation editor server...
echo.
echo ========================================
echo  Server Information
echo ========================================
echo  Documentation Editor: http://localhost:8082/tools/documentation-editor.html
echo  Module Builder: http://localhost:8082/tools/module-builder-enhanced.html
echo  Working Directory: %cd%
echo.
echo  Integration Notes:
echo  - This server handles file saving for documentation
echo  - Use Live Server (port 5500) for live preview
echo  - Access via: http://127.0.0.1:5500/tools/documentation-editor.html
echo.
echo  Features:
echo  - Edit Jekyll documentation files
echo  - Manage function metadata (JSON)
echo  - Real-time preview and TOC generation
echo  - Auto-save functionality
echo ========================================
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the Python server
python enhanced-server.py

REM If we get here, the server stopped
echo.
echo ========================================
echo Server stopped. Press any key to exit.
pause >nul
