@echo off
echo 🚀 Creating individual function files...

cd /d "c:\Devons_Stuff\Fivem\business stuff\documentation-site\tootsf.github.io"

echo Running Python script...
python create_individual_files.py
if %ERRORLEVEL% neq 0 (
    echo Python script failed with error level %ERRORLEVEL%
) else (
    echo Python script completed successfully
)

echo.
echo ✅ Batch file completed
pause
