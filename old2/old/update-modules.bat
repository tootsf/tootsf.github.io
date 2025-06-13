@echo off
title Community Bridge - Update Module Configuration

echo.
echo ====================================================
echo  Community Bridge Documentation - Module Updater
echo ====================================================
echo.

cd /d "%~dp0"
cd tools

echo 🔧 Scanning for modules and updating configuration...
python build-static-config.py

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ Configuration updated successfully!
    echo.
    echo 📝 Next steps:
    echo    1. Review changes in module-config.js
    echo    2. Commit changes: git add . ^&^& git commit -m "Update modules"
    echo    3. Push to GitHub: git push origin main
    echo.
) else (
    echo.
    echo ❌ Update failed! Check the error messages above.
    echo.
)

pause
