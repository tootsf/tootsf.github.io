@echo off
REM Module Creation Utility for Community Bridge Documentation
REM Usage: create-module.bat <module_id> <module_name> [icon] [description]

if "%~2"=="" (
    echo Usage: create-module.bat ^<module_id^> ^<module_name^> [icon] [description]
    echo Example: create-module.bat banking Banking 🏦 "Banking and economy functions"
    exit /b 1
)

python tools\create-module.py %*
pause
