@echo off
echo Building documentation structure...
python build/generate-structure.py

echo Starting local server...
echo Documentation will be available at: http://localhost:8000
python -m http.server 8000
